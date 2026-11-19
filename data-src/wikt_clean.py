import json, re
d = json.load(open('/home/claude/build/wikt.json'))
POS = {'noun': 'n', 'adj': 'adj', 'verb': 'v', 'name': 'name', 'adv': 'adv', 'num': 'num', 'pron': 'pron', 'intj': 'intj', 'conj': 'conj', 'postp': 'postp', 'det': 'det'}
skip_name = re.compile(r'village|rural|district|\bayil\b|region of|a river in|a lake in|a mountain|surname|given name|male given|female given', re.I)
def clean(t):
    t = re.sub(r'\s*\((?:[A-Z][a-z]+ [a-z]+(?: [a-z]+)?|genus [^)]*|family [^)]*)\)', '', t)  # scientific names
    t = re.sub(r'\s+', ' ', t).strip(' ;,.')
    return t
out = {}
for e in d:
    if e['pos'] not in POS: continue
    gl = [clean(s[1]) for s in e['senses'] if s[0] == e['pos']]
    gl = [g for g in gl if g and not g.lower().startswith(('alternative form', 'alternative spelling', 'obsolete', 'romanization'))]
    if not gl: continue
    if e['pos'] == 'name' and skip_name.search(' '.join(gl)): continue
    if any(x in gl[0].lower() for x in ('letter of the kyrgyz alphabet',)): continue
    s = ''
    for g in gl:
        g = re.sub(r'^\((?:transitive|intransitive)\)\s*', '', g)
        nxt = (s + '; ' + g) if s else g
        if len(nxt) > 90 and s: break
        s = nxt
    if len(s) > 110: s = s[:107].rsplit(' ', 1)[0] + '…'
    w = e['w'].strip()
    if w in out: out[w][1] = out[w][1] + '; ' + s if len(out[w][1]) < 60 else out[w][1]; continue
    out[w] = [POS[e['pos']], s]
json.dump(out, open('/home/claude/build/wikt_clean.json', 'w'), ensure_ascii=False)
import collections; print(len(out), collections.Counter(v[0] for v in out.values()))
for k in list(out)[:5] + ['асман', 'иштөө', 'топ', 'Иран', 'жейрен']: print(k, out.get(k))
