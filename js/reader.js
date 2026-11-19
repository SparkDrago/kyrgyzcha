/* ==========================================================================
   Library & interactive reader (LingQ-style)
   - Every word in a text has a status: new (blue) → learning 1–4 (yellow) → known.
   - Tap a word: dictionary meaning, ending analysis (китептеримден → китеп + -тер-им-ден),
     your own note, Arabic origin, external dictionaries.
   - Learning words go into your review deck; finishing a page marks the rest as known.
   - Import any Kyrgyz text (news, songs, posts) into your own library.
   ========================================================================== */
(window.KG_PLUGINS = window.KG_PLUGINS || []).push(function (A) {
  'use strict';
  const { store, $, $$, esc, kgSpan, sayBtn, tl, toast } = A;
  const KG = window.KG;
  const LETTERS = 'А-Яа-яЁёӨөҮүҢң';
  const TOKEN = new RegExp(`([${LETTERS}]+(?:-[${LETTERS}]+)*)`, 'g');
  const norm = (w) => String(w).toLowerCase().replace(/ё/g, 'ё').replace(/[^а-яёөүң-]/g, '').replace(/^-+|-+$/g, '');
  const STATUS = { 1: 'New-ish', 2: 'Recognised', 3: 'Familiar', 4: 'Almost known', 5: 'Known', '-1': 'Ignored' };

  /* ------------------------------ Dictionary ------------------------------ */
  const DICT = new Map();
  const addDict = (k, en, src) => {
    const key = norm(String(k).replace(/\|/g, '').replace(/-$/, ''));
    if (!key || key.includes(' ')) return;
    const list = DICT.get(key) || [];
    const clean = String(en).replace(/\[\[|\]\]/g, '').replace(/<[^>]+>/g, '');
    if (!list.some((x) => x.en === clean)) list.push({ en: clean, src });
    DICT.set(key, list);
  };
  A.LESSONS.forEach((l) => (l.blocks || []).forEach((b) => {
    if (b.t === 'vocab') b.items.forEach((v) => {
      const k = String(v[0]).replace(/[.!?]/g, '').trim();
      if (!k.includes(' ')) addDict(k, v[1], l.num);
      else k.split(/\s*[—/]\s*/).forEach((part, i, arr) => { if (!part.includes(' ') && arr.length > 1) addDict(part, String(v[1]).split(/\s*—\s*/)[i] || v[1], l.num); });
    });
  }));
  (window.READERS || []).forEach((r) => (r.glossary || []).forEach((g) => String(g[0]).split(/\s*\/\s*/).forEach((p, i, arr) => addDict(p, arr.length > 1 ? (String(g[1]).split(/\s*\/\s*/)[i] || g[1]) : g[1], 'reader'))));
  (window.READ_DRILL || []).forEach((w) => addDict(w[0], w[1], 'alphabet'));
  [['мен', 'I'], ['сен', 'you (friendly)'], ['сиз', 'you (polite)'], ['ал', 'he, she, it; that'], ['биз', 'we'], ['силер', 'you all'], ['алар', 'they'], ['бул', 'this'], ['ошол', 'that'], ['жана', 'and'], ['менен', 'with; and'], ['үчүн', 'for'], ['да', 'too, also'], ['бирок', 'but'], ['эле', 'just; was'], ['деп', 'saying (quote marker)'], ['экен', 'it turns out'], ['бол', 'be, become'], ['кыл', 'do'], ['де', 'say'], ['бер', 'give'], ['ал', 'take'], ['кел', 'come'], ['бар', 'go; there is'], ['жок', 'no; there isn’t'], ['эмес', 'not'], ['керек', 'needed'], ['абдан', 'very'], ['көп', 'many, a lot'], ['чоң', 'big'], ['жаңы', 'new'], ['жыл', 'year'], ['күн', 'day; sun'], ['адам', 'person'], ['эл', 'people, nation'], ['өлкө', 'country'], ['шаар', 'city'], ['тил', 'language'], ['иш', 'work'], ['жер', 'place, land'], ['убакыт', 'time'], ['сөз', 'word'], ['дагы', 'also; more']].forEach(([k, v]) => addDict(k, v, 'core'));
  // Bigger dictionary: Word drops picture words, then the lexicon (Wiktionary, Peace Corps manual, course lists).
  ((window.DROPS && window.DROPS.extra) || []).forEach((x) => addDict(x[0], x[1], 'Word drops'));
  const BACKV = 'аоуыяёю', VOW = 'аоуыяёюеэиөү';
  function verbStems(lemma) { // Wiktionary lists verbs as verbal nouns: иштөө → иште-, сыйлоо → сыйла-, салуу → сал-
    const b = lemma.toLowerCase(), base = b.slice(0, -2), end = b.slice(-2), out = new Set();
    let lastV = ''; for (const ch of base) if (VOW.includes(ch)) lastV = ch;
    const back = BACKV.includes(lastV);
    if (end === 'уу' || end === 'үү') { out.add(base); out.add(b.slice(0, -1)); }
    else { (back ? ['а', 'о'] : ['е', 'ө']).forEach((v) => out.add(base + v)); out.add(b.slice(0, -1)); }
    return [...out].filter((x) => x.length >= 3);
  }
  const LEX_LABEL = { wk: 'Wiktionary', pc: 'Peace Corps manual', kc: 'Кыргызча' };
  ((window.LEXICON && window.LEXICON.rows) || []).forEach(([w, en, pos, src]) => {
    const label = LEX_LABEL[String(src).split(',')[0]] || 'dictionary';
    addDict(w, en, label);
    if (pos === 'v' && /(уу|үү|оо|өө)$/.test(w) && !w.includes(' ')) verbStems(w).forEach((st) => addDict(st, en, label));
  });
  A.DICT = DICT;
  A.verbStems = verbStems;

  /* ------------------------------ Lemmatizer ------------------------------ */
  // Peel endings off the right, keep only stems found in the dictionary.
  const Av = '[аеоө]', Iv = '[ыиуү]';
  const SUF = [
    `[нтд]${Iv}н`, `[гк]${Av}`, `н${Av}`, `[нтд]${Iv}`, `[дт]${Av}`, `нд${Av}`, `[дт]${Av}н`, `нд${Av}н`, `[дт]${Av}г${Iv}`, `нд${Av}г${Iv}`,
    `[лдт]${Av}р`, `${Iv}?м`, `${Iv}?ң`, `${Iv}?ң${Iv}з`, `с${Iv}`, `${Iv}`, `${Iv}?б${Iv}з`, `${Iv}?ң${Av}р`, `${Iv}?ң${Iv}зд${Av}р`, `н`,
    `м${Iv}н`, `с${Iv}ң`, `с${Iv}з`, `[бп]${Iv}з`, `с${Iv}ң${Av}р`, `с${Iv}зд${Av}р`, `[бп]${Iv}`, `ч${Av}`, `[лдт]${Iv}к`, `[лдт]${Iv}${Iv}`, `с${Iv}з`,
    `${Av}`, `й`, `т`, `[дт]${Iv}`, `к`, `${Iv}?ш`, `[бп]${Av}`, `${Iv}?п`, `[гк]${Av}н`, `${Iv}${Iv}`, `с${Av}`, `[гк]${Iv}`, `ч${Iv}`, `${Iv}?пт${Iv}р`, `м${Av}к`, `${Av}л${Iv}`, `й${Iv}н`, `[гк]${Iv}л${Av}`, `с${Iv}н`, `${Av}р`, `[бп]${Av}с`, `ч${Iv}`, `уучу`, `үүчү`
  ].map((s) => new RegExp(`^(.{2,}?)(${s})$`));
  const expandYot = (w) => w.replace(/ю/g, 'йу').replace(/я/g, 'йа').replace(/ё/g, 'йо');
  function analyze(form) {
    const w = norm(form);
    const out = [];
    if (!w) return out;
    const seen = new Set([w]); let layer = [w];
    if (expandYot(w) !== w) { seen.add(expandYot(w)); layer.push(expandYot(w)); }
    for (let depth = 0; depth < 6 && layer.length; depth++) {
      const next = [];
      layer.forEach((cand) => SUF.forEach((re) => {
        const m = cand.match(re); if (!m) return;
        [m[1], m[1].replace(/б$/, 'п'), m[1].replace(/г$/, 'к')].forEach((st) => { if (st.length >= 2 && !seen.has(st)) { seen.add(st); next.push(st); } });
      }));
      layer = next.slice(0, 400);
    }
    seen.forEach((st) => { if (st !== w && DICT.has(st)) out.push({ stem: st, en: DICT.get(st), rest: w.length > st.length ? w.slice(st.length) : '' }); });
    out.sort((a, b) => b.stem.length - a.stem.length);
    return out.slice(0, 3);
  }
  A.analyze = analyze;

  /* ------------------------------ Word status ----------------------------- */
  const W = () => store.d.words || (store.d.words = {});
  const statusOf = (k) => { const e = W()[k]; return e ? e.s : 0; };
  function setStatus(k, s, extra) {
    const e = Object.assign(W()[k] || {}, extra || {}, { s, t: Date.now() });
    W()[k] = e; store.save();
  }
  A.wordStatus = statusOf;
  const cls = (s) => (s === 0 ? 'st-new' : s >= 1 && s <= 4 ? 'st-' + s : '');
  function wordStats() {
    let known = 0, learning = 0;
    Object.values(W()).forEach((e) => { if (e.s === 5) known++; else if (e.s >= 1 && e.s <= 4) learning++; });
    return { known, learning };
  }
  A.wordStats = wordStats;

  // Learning words feed the review deck (flashcards + smart review).
  A.HOOKS.extraVocab = () => Object.entries(W()).filter(([, e]) => e.s >= 1 && e.s <= 4).map(([k, e]) => {
    const dict = DICT.get(k) || (analyze(k)[0] || {}).en;
    const en = e.m || (dict && dict[0] && dict[0].en) || '(add a meaning in the reader)';
    return { k, en, mine: true, ctx: e.c, lesson: { id: 'my-words', num: '★', title: 'My words', stage: { n: 'mine' } } };
  });

  /* -------------------------------- Texts --------------------------------- */
  const LOCAL_KEY = 'kyrgyzcha-texts';
  const localTexts = () => { try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || '[]'); } catch (e) { return []; } };
  const saveLocalTexts = (list) => { try { localStorage.setItem(LOCAL_KEY, JSON.stringify(list)); return true; } catch (e) { toast('This device is out of space for texts.'); return false; } };
  const signed = () => A.cloud && A.cloud.user;
  async function listTexts() {
    if (signed()) { try { return (await A.cloud.api('/api/texts')).texts; } catch (e) { toast(e.message); } }
    return localTexts().map((t) => ({ id: t.id, title: t.title, level: t.level, created: t.created, len: t.text.length, local: true }));
  }
  async function getText(id) {
    const loc = localTexts().find((t) => t.id === id);
    if (loc) return loc;
    if (signed()) return (await A.cloud.api('/api/texts?id=' + encodeURIComponent(id))).text;
    throw new Error('Text not found on this device. Sign in to see texts from your account.');
  }
  async function saveText(t) {
    if (signed()) return (await A.cloud.api('/api/texts', { method: 'POST', body: t })).text;
    const list = localTexts(); t.id = t.id || 'l' + Date.now().toString(36); t.created = Date.now();
    list.unshift(t); if (!saveLocalTexts(list)) throw new Error('Not saved.'); return t;
  }
  async function deleteText(id) {
    const list = localTexts(); if (list.some((t) => t.id === id)) { saveLocalTexts(list.filter((t) => t.id !== id)); return; }
    if (signed()) await A.cloud.api('/api/texts?id=' + encodeURIComponent(id), { method: 'DELETE' });
  }
  // After signing in, move texts saved on this device into the account.
  document.addEventListener('kg-auth', async () => {
    const list = localTexts(); if (!list.length) return;
    let moved = 0;
    for (const t of list) { try { await A.cloud.api('/api/texts', { method: 'POST', body: t }); moved++; } catch (e) { break; } }
    if (moved === list.length) { saveLocalTexts([]); toast(`${moved} text${moved > 1 ? 's' : ''} moved into your account library.`); }
  });

  const splitSentences = (text) => String(text).replace(/\r/g, '').split(/\n\s*\n|\n/).map((p) => p.trim()).filter(Boolean).map((p) => (p.match(/[^.!?…]+[.!?…]*[»”"]?\s*/g) || [p]).map((s) => [s.trim(), null]).filter((s) => s[0]));
  const uniqueWords = (paras) => { const set = new Set(); paras.forEach((p) => p.forEach((s) => (s[0].match(TOKEN) || []).forEach((w) => set.add(norm(w))))); set.delete(''); return set; };
  function knownPct(paras) {
    const u = uniqueWords(paras); if (!u.size) return { pct: 0, newN: 0, total: 0 };
    let known = 0, newN = 0; u.forEach((w) => { const s = statusOf(w); if (s === 5 || s === -1) known++; else if (s === 0) newN++; });
    return { pct: Math.round((known / u.size) * 100), newN, total: u.size };
  }

  /* ------------------------------- Library -------------------------------- */
  const MILESTONES = [['A1', 1500], ['A2', 4000], ['B1', 9000], ['B2', 18000], ['C1', 30000]];
  function statsPanel() {
    const s = wordStats(), st = store.d.stats || {};
    const next = MILESTONES.find((m) => s.known < m[1]) || MILESTONES[MILESTONES.length - 1];
    return `<div class="lib-stats"><div><b>${s.known.toLocaleString()}</b>known words</div><div><b>${s.learning.toLocaleString()}</b>words you’re learning</div><div><b>${(st.wordsRead || 0).toLocaleString()}</b>words read</div><div><b>${(st.pages || 0).toLocaleString()}</b>pages finished</div>
      <div class="ms"><span>Next: about ${next[1].toLocaleString()} known words ≈ reading at ${next[0]}</span><div class="bar"><i style="width:${Math.min(100, (s.known / next[1]) * 100)}%"></i></div></div></div>`;
  }
  A.libraryStats = statsPanel;

  A.ROUTES.library = async function library() {
    const main = A.main();
    const R = window.READERS || [];
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>Library</h1><div class="kgt">Китепкана</div>
      <p>Read stories and your own texts. Tap any word to look it up. <span class="w-demo st-new">Blue</span> words are new, <span class="w-demo st-1">yellow</span> ones you’re learning, plain ones you know. Finish a page and its blue words count as known.</p></div></header>
      <div class="wrap" style="padding:30px 0 80px">${statsPanel()}
      <div class="lib-head"><h2>My texts</h2><a class="btn btn-gold btn-sm" href="#import">+ Import a text</a></div><div class="my-texts"><p class="voice-note">Loading…</p></div>
      <h2 style="margin-top:34px">Graded stories</h2><div class="readers" style="padding:12px 0 0">${R.map((r) => {
        const k = knownPct(r.paras);
        return `<a class="reader-card" href="#reader-${esc(r.id)}"><span class="lvl" style="align-self:flex-start">${esc(r.level)}</span><span class="kgt">${esc(r.kg)}</span><strong>${esc(r.title)}</strong><span class="voice-note">${esc(r.about)}</span><span class="known-meter"><span class="bar"><i style="width:${k.pct}%"></i></span>${k.pct}% known · ${k.newN} new words</span></a>`;
      }).join('')}</div></div>`;
    const box = $('.my-texts', main);
    const list = await listTexts();
    if (A.main() !== main) return;
    box.innerHTML = list.length ? `<div class="readers" style="padding:0">${list.map((t) => `<div class="reader-card"><a href="#text-${esc(t.id)}" class="stretch"><span class="lvl" style="align-self:flex-start;background:var(--ok)">${esc(t.level || 'Mine')}</span><strong style="font-family:var(--f-kg);font-size:1.15rem">${esc(t.title)}</strong></a><span class="voice-note">${(t.len || 0).toLocaleString()} characters · ${new Date(t.created).toLocaleDateString()}${t.local ? ' · on this device' : ''}</span><button class="btn btn-line btn-sm" data-del="${esc(t.id)}" style="align-self:flex-start">Delete</button></div>`).join('')}</div>`
      : `<div class="empty panel"><p><b>Your library is empty.</b> Paste a news article, song lyrics or a post — anything in Kyrgyz — and read it with word lookup.</p><a class="btn btn-ink btn-sm" href="#import">Import your first text</a></div>`;
    box.addEventListener('click', async (e) => {
      const d = e.target.closest('[data-del]'); if (!d) return;
      if (!d.dataset.sure) { d.dataset.sure = '1'; d.textContent = 'Click again to delete'; return; }
      try { await deleteText(d.dataset.del); toast('Text deleted.'); A.route(); } catch (err) { toast(err.message); }
    });
  };
  A.ROUTES.readers = A.ROUTES.library;
  A.TITLES.library = 'Library';

  /* -------------------------------- Import -------------------------------- */
  const SAMPLE = 'Бишкек — Кыргызстандын борбору. Шаар Ала-Тоо тоолорунун этегинде жайгашкан. Бишкекте бир миллиондон ашык адам жашайт.\n\nЖайында шаар жашыл жана ысык болот. Кышында кар жаайт, бирок тоолор абдан кооз көрүнөт. Шаардын борборунда Ала-Тоо аянты бар.';
  A.ROUTES.import = function importPage() {
    const main = A.main();
    main.innerHTML = `<header class="page-head"><div class="wrap"><div class="crumbs"><a href="#library">Library</a></div><h1>Import a text</h1><p>Paste any Kyrgyz text: a news story from Azattyk, song lyrics, a Telegram post. It becomes a lesson with tap-to-look-up words.</p></div></header>
      <div class="narrow" style="padding:30px 0 80px"><form class="panel import-form" novalidate>
        <div class="field"><label for="im-title">Title</label><input id="im-title" type="text" maxlength="120" placeholder="e.g. Бүгүнкү жаңылыктар" style="font-family:var(--f-kg)"></div>
        <div class="field"><span class="lbl">Level (your guess)</span><div class="seg" data-seg="lvl">${['A1', 'A2', 'B1', 'B2', 'C1'].map((l, i) => `<button type="button" data-v="${l}" aria-pressed="${i === 2}">${l}</button>`).join('')}</div></div>
        <div class="field"><label for="im-src">Source link (optional)</label><input class="input" id="im-src" type="url" maxlength="300" placeholder="https://…"></div>
        <div class="field"><label for="im-text">Text</label><textarea id="im-text" rows="12" maxlength="30000" placeholder="Paste Kyrgyz text here"></textarea><div class="preview"><span class="cc">0</span> / 30,000 characters · <button type="button" class="linkish" data-sample>Try a sample text</button></div></div>
        <div class="form-msg" role="alert"></div>
        <button class="btn btn-ink" type="submit">Save to my library</button>
        ${signed() ? '' : '<p class="voice-note" style="margin-top:12px">You’re not signed in, so this text is saved on this device only. Sign in to keep it in your account.</p>'}
      </form>
      ${A.BLOCK.tip({ title: 'Respect copyright', html: 'Imported texts are private to you — use them for your own study. Don’t paste whole books; a chapter or an article at a time works best anyway.' })}</div>`;
    let level = 'B1';
    const ta = $('#im-text'), cc = $('.cc', main);
    ta.addEventListener('input', () => { cc.textContent = ta.value.length.toLocaleString(); });
    main.addEventListener('click', (e) => {
      const b = e.target.closest('[data-seg="lvl"] [data-v]'); if (b) { level = b.dataset.v; $$('[data-seg="lvl"] button', main).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); }
      if (e.target.closest('[data-sample]')) { ta.value = SAMPLE; $('#im-title').value = 'Бишкек'; cc.textContent = SAMPLE.length; }
    });
    $('.import-form', main).addEventListener('submit', async (e) => {
      e.preventDefault();
      const msg = $('.form-msg', main);
      const text = ta.value.trim();
      if (!/[а-яөүң]/i.test(text)) { msg.textContent = 'That doesn’t look like Kyrgyz (Cyrillic) text yet.'; return; }
      try { const t = await saveText({ title: $('#im-title').value.trim() || text.slice(0, 40), level, source: $('#im-src').value.trim(), text }); toast('Saved to your library.'); location.hash = '#text-' + t.id; }
      catch (err) { msg.textContent = err.message; }
    });
  };
  A.TITLES.import = 'Import a text';

  /* -------------------------------- Reader -------------------------------- */
  function tokenHTML(sentence) {
    return esc(sentence).replace(TOKEN, (w) => { const k = norm(w); return `<span class="w ${cls(statusOf(k))}" data-w="${esc(k)}" tabindex="0">${w}</span>`; });
  }
  function renderReader(doc) {
    const main = A.main();
    const hasEn = doc.paras.some((p) => p.some((s) => s[1]));
    const k = knownPct(doc.paras);
    main.innerHTML = `<header class="page-head"><div class="narrow"><div class="crumbs"><a href="#library">Library</a> › ${esc(doc.level || '')}</div>
      <h1 class="kg" style="color:#fff;font-family:var(--f-kg)">${esc(doc.kg || doc.title)}</h1><p>${doc.kg ? esc(doc.title) + ' — ' : ''}${esc(doc.about || '')}${doc.source ? ` <a href="${esc(/^https?:/.test(doc.source) ? doc.source : '#')}" style="color:var(--gold)">Source</a>` : ''}</p>
      <div class="meta-row">${hasEn ? '<button class="chip-btn" data-act="show-en" aria-pressed="false">Show all English</button>' : ''}<button class="chip-btn" data-r="listen">Read aloud</button><button class="chip-btn" data-r="smaller" aria-label="Smaller text">A−</button><button class="chip-btn" data-r="bigger" aria-label="Bigger text">A+</button><span class="known-chip">${k.pct}% known · <span class="new-n">${k.newN}</span> new</span></div></div></header>
      <div class="reader-layout"><div class="narrow story lingq" style="font-size:${store.d.settings.readSize || 1}em">${doc.paras.map((p) => `<div class="para">${p.map((s) => `<div class="sent2">${hasEn ? `<button class="sent-en-btn" aria-label="Translate sentence">EN</button>` : ''}<span class="kg-line">${tokenHTML(s[0])}</span>${s[1] ? `<span class="en">${esc(s[1])}</span>` : ''}</div>`).join('')}</div>`).join('')}
        <div class="finish panel"><p><b>Done reading?</b> <span class="fin-text"></span></p><button class="btn btn-gold" data-r="finish">Finish page</button></div>
        ${doc.glossary ? `<h2>Words to know</h2><div class="glossary">${doc.glossary.map((g) => `<div>${kgSpan(g[0])} — ${esc(g[1])}${A.arHint(g[0])}</div>`).join('')}</div>` : ''}
        ${doc.quiz ? '<h2>Did you get it?</h2><div class="quiz"></div>' : ''}</div>
        <aside class="wpanel" aria-live="polite" hidden></aside></div>`;
    const story = $('.story', main), panel = $('.wpanel', main);
    const refreshCounts = () => { const kk = knownPct(doc.paras); $('.new-n', main).textContent = kk.newN; $('.fin-text', main).textContent = kk.newN ? `${kk.newN} blue word${kk.newN > 1 ? 's' : ''} will be marked as known.` : 'No new words left — nice!'; };
    const repaint = (key) => { $$(`.w[data-w="${CSS.escape(key)}"]`, story).forEach((el) => { el.className = 'w ' + cls(statusOf(key)) + (el.classList.contains('sel') ? ' sel' : ''); }); refreshCounts(); };
    refreshCounts();
    let current = null;
    function open(el) {
      $$('.w.sel', story).forEach((x) => x.classList.remove('sel'));
      el.classList.add('sel');
      const key = el.dataset.w; current = { key, el };
      const sentence = el.closest('.sent2').querySelector('.kg-line').textContent.trim();
      const e = W()[key] || {};
      const exact = DICT.get(key);
      const an = exact ? [] : analyze(key);
      const s = statusOf(key);
      panel.hidden = false;
      panel.innerHTML = `<button class="wp-close" aria-label="Close">×</button>
        <div class="wp-word"><span class="kg">${esc(el.textContent)}</span> ${sayBtn(el.textContent)}</div>${tl(key)}
        <div class="wp-mean">${exact ? exact.map((x) => `<div>${esc(x.en)} <small class="wp-src">${esc(/^[0-9]/.test(x.src) ? 'Lesson ' + x.src : x.src)}</small></div>`).join('') : an.length ? an.map((x) => `<div class="an"><span class="kg">${esc(x.stem)}</span>${x.rest ? `<span class="m m1">-${esc(x.rest)}</span>` : ''} — ${esc(x.en[0].en)}</div>`).join('') + '<div class="voice-note">Best guess from the endings. Check it in context.</div>' : '<div class="voice-note">Not in the built-in dictionary yet. Try the links below and add your own meaning.</div>'}</div>
        ${A.arHint(key)}
        <label class="lbl" for="wp-note">Your meaning</label><textarea id="wp-note" rows="2" placeholder="Type a meaning or a note">${esc(e.m || '')}</textarea>
        <div class="wp-status" role="group" aria-label="How well do you know it?">${[1, 2, 3, 4].map((n) => `<button data-s="${n}" aria-pressed="${s === n}" title="${STATUS[n]}">${n}</button>`).join('')}<button data-s="5" class="known" aria-pressed="${s === 5}">✓ Known</button><button data-s="-1" class="ign" aria-pressed="${s === -1}" title="Names, numbers, words you don’t want to count">Ignore</button></div>
        <p class="voice-note">${s >= 1 && s <= 4 ? 'This word is in your review deck.' : 'Choose 1–4 to add it to your review deck.'} Keys: 1–4, K = known, X = ignore.</p>
        <div class="wp-links"><a href="https://en.wiktionary.org/wiki/${encodeURIComponent(an[0] ? an[0].stem : key)}#Kyrgyz">Wiktionary</a><a href="https://glosbe.com/ky/en/${encodeURIComponent(key)}">Glosbe</a><a href="https://translate.google.com/?sl=ky&tl=en&text=${encodeURIComponent(sentence)}">Translate sentence</a></div>`;
      const note = $('#wp-note', panel);
      note.addEventListener('change', () => { const st = statusOf(key) || 1; setStatus(key, st > 0 ? st : 1, { m: note.value.trim(), c: sentence.slice(0, 200) }); repaint(key); });
      panel.dataset.sentence = sentence;
      if (window.innerWidth <= 900) { document.body.classList.add('wp-open'); const r = el.getBoundingClientRect(); if (r.top > window.innerHeight * 0.36 || r.top < 70) window.scrollBy({ top: r.top - window.innerHeight * 0.2, behavior: 'smooth' }); }
    }
    function choose(n) {
      if (!current) return;
      setStatus(current.key, n, { c: (panel.dataset.sentence || '').slice(0, 200) });
      repaint(current.key);
      if (n === 5 || n === -1) { const words = $$('.w', story); const i = words.indexOf(current.el); const nx = words.slice(i + 1).find((x) => x.classList.contains('st-new') || /st-[1-4]/.test(x.className)); if (nx) { open(nx); nx.scrollIntoView({ block: 'nearest', behavior: 'smooth' }); return; } }
      open(current.el);
    }
    main.addEventListener('click', (ev) => {
      const w = ev.target.closest('.w'); if (w) { open(w); return; }
      const sb = ev.target.closest('[data-s]'); if (sb) { choose(Number(sb.dataset.s)); return; }
      if (ev.target.closest('.wp-close')) { panel.hidden = true; document.body.classList.remove('wp-open'); $$('.w.sel', story).forEach((x) => x.classList.remove('sel')); current = null; return; }
      const en = ev.target.closest('.sent-en-btn'); if (en) { en.parentElement.classList.toggle('open'); return; }
      const r = ev.target.closest('[data-r]'); if (!r) return;
      if (r.dataset.r === 'listen') A.say($$('.kg-line', story).map((x) => x.textContent).join(' '));
      if (r.dataset.r === 'smaller' || r.dataset.r === 'bigger') { const v = Math.max(0.8, Math.min(1.6, (store.d.settings.readSize || 1) + (r.dataset.r === 'bigger' ? 0.1 : -0.1))); store.d.settings.readSize = v; story.style.fontSize = v + 'em'; store.save(); }
      if (r.dataset.r === 'finish') {
        let n = 0; uniqueWords(doc.paras).forEach((wd) => { if (!statusOf(wd)) { W()[wd] = { s: 5, t: Date.now() }; n++; } });
        const tokens = doc.paras.reduce((a, p) => a + p.reduce((b, s) => b + (s[0].match(TOKEN) || []).length, 0), 0);
        const st = store.d.stats || (store.d.stats = {});
        st.wordsRead = (st.wordsRead || 0) + tokens; st.pages = (st.pages || 0) + 1;
        store.addXP(Math.min(60, 5 + tokens / 8), 'reading');
        $$('.w', story).forEach((el) => { el.className = 'w ' + cls(statusOf(el.dataset.w)); });
        refreshCounts();
        toast(`Page finished: ${tokens} words read${n ? `, ${n} new words marked as known` : ''}.`);
        r.disabled = true;
      }
    });
    main.addEventListener('keydown', (ev) => {
      if (ev.target.closest('textarea, input')) return;
      if (ev.key === 'Enter' && ev.target.classList.contains('w')) { open(ev.target); return; }
      if (!current) return;
      if ('1234'.includes(ev.key)) choose(Number(ev.key));
      else if (ev.key.toLowerCase() === 'k') choose(5);
      else if (ev.key.toLowerCase() === 'x') choose(-1);
      else if (ev.key === 'Escape') { panel.hidden = true; current = null; document.body.classList.remove('wp-open'); }
    });
    if (doc.quiz) A.mountQuiz($('.quiz', main), doc.quiz, (pct) => store.addXP(pct * 10, 'reader'));
  }

  A.PREFIXES.push(['reader-', (id) => {
    const r = (window.READERS || []).find((x) => x.id === id);
    if (!r) { A.main().innerHTML = '<div class="narrow empty"><h1>Story not found</h1><p><a href="#library">Back to the library</a></p></div>'; return; }
    renderReader(r);
  }]);
  A.PREFIXES.push(['text-', async (id) => {
    const main = A.main();
    main.innerHTML = '<div class="narrow empty"><p>Opening your text…</p></div>';
    try {
      const t = await getText(id);
      if (A.main() !== main) return;
      renderReader({ id: t.id, title: t.title, level: t.level, about: 'From your library', source: t.source, paras: splitSentences(t.text) });
    } catch (e) { main.innerHTML = `<div class="narrow empty"><h1>Couldn’t open that text</h1><p>${esc(e.message)} <a href="#library">Back to the library</a></p></div>`; }
  }]);
});
