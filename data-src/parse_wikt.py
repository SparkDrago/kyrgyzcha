import re, json, html, collections
src = '/tmp/dl/wd/Kyrgyz-English Wiktionary dictionary.tsv'
CYR = re.compile(r'^[А-Яа-яЁёӨөҮүҢң\- ]+$')
out = []
pos_c = collections.Counter()
for line in open(src, encoding='utf-8'):
    line = line.rstrip('\n')
    if '\t' not in line: continue
    head, body = line.split('\t', 1)
    forms = head.split('|')
    word = forms[0]
    if not CYR.match(word): continue
    # body may hold several POS blocks: <i>noun</i><br><ol>...</ol>
    blocks = re.findall(r'<i>([^<]+)</i><br><ol>(.*?)</ol>', body)
    senses = []
    for pos, ol in blocks:
        items = re.findall(r'<li>(.*?)</li>', ol)
        for it in items:
            t = html.unescape(re.sub(r'<[^>]+>', '', it)).strip()
            senses.append((pos.strip(), t))
    if not senses: continue
    pos = senses[0][0]
    pos_c[pos] += 1
    cyr_forms = sorted({f for f in forms[1:] if CYR.match(f) and f != word})
    out.append({'w': word, 'pos': pos, 'senses': senses, 'forms': cyr_forms})
json.dump(out, open('/home/claude/build/wikt.json', 'w'), ensure_ascii=False)
print(len(out), pos_c.most_common(15))
import random; random.seed(3)
for e in random.sample(out, 25): print(e['w'], '|', e['pos'], '|', '; '.join(s[1] for s in e['senses'])[:110], '| forms', len(e['forms']))
