/* ==========================================================================
   Dictionary — search every Kyrgyz word the app knows
   Course vocabulary · Word drops · lexicon (Wiktionary, Peace Corps manual, course lists)
   Type Kyrgyz, Latin letters or English. Inflected words are traced back to their stem.
   ========================================================================== */
(window.KG_PLUGINS = window.KG_PLUGINS || []).push(function (A) {
  'use strict';
  const { store, $, $$, esc, tl, toast } = A;
  const KG = window.KG;
  if (!A.NAV_GROUPS.tools.includes('dictionary')) A.NAV_GROUPS.tools.push('dictionary');
  const POS = { n: 'noun', v: 'verb', adj: 'adjective', adv: 'adverb', num: 'number', pron: 'pronoun', name: 'name', phr: 'phrase', conj: 'conjunction', post: 'postposition', intj: 'interjection', det: 'determiner' };
  const SRC = { wk: 'Wiktionary', pc: 'Peace Corps', kc: 'Кыргызча', drops: 'Word drops' };
  const ABC = 'А Б В Г Д Е Ё Ж З И Й К Л М Н Ң О Ө П Р С Т У Ү Ф Х Ц Ч Ш Щ Ы Э Ю Я'.split(' ');
  const lc = (s) => String(s).toLowerCase();
  const keyOf = (s) => lc(s).replace(/[.!?,«»"]/g, '').replace(/-$/, '').trim();

  /* ------------------------------ Index ----------------------------------- */
  let INDEX = null;
  function index() {
    if (INDEX) return INDEX;
    const map = new Map();
    const put = (w, en, pos, src, lesson) => {
      const k = keyOf(w); if (!k) return;
      let e = map.get(k);
      if (!e) { e = { w: String(w).replace(/[.!?]$/, ''), k, en: [], pos: pos || '', src: [], lesson: null }; map.set(k, e); }
      String(en).split(/\s*;\s*/).forEach((g) => { g = g.trim(); if (g && !e.en.some((x) => lc(x) === lc(g))) e.en.push(g); });
      if (src && !e.src.includes(src)) e.src.push(src);
      if (!e.pos && pos) e.pos = pos;
      if (lesson && !e.lesson) e.lesson = lesson;
    };
    A.allVocab().forEach((v) => { if (!v.mine) put(v.k, v.en, /-$/.test(v.k) ? 'v' : (/[.!?]$/.test(v.k) || v.k.split(' ').length > 2) ? 'phr' : '', 'course', v.lesson); });
    ((window.DROPS && window.DROPS.extra) || []).forEach((x) => put(x[0], x[1], '', 'drops'));
    ((window.LEXICON && window.LEXICON.rows) || []).forEach((r) => r[3].split(',').forEach((s, i) => put(r[0], i ? '' : r[1], r[2], s)));
    INDEX = [...map.values()].sort((a, b) => a.k.localeCompare(b.k, 'ky'));
    INDEX.forEach((e) => { e.enl = lc(e.en.join(' ; ')); });
    return INDEX;
  }
  A.dictionaryIndex = index;

  /* ------------------------------ Search ---------------------------------- */
  function search(q) {
    q = q.trim(); if (!q) return { rows: [], how: '' };
    const all = index(), cyr = /[а-яёөүң]/i.test(q);
    const kq = keyOf(cyr ? q : (KG.latinToCyr ? KG.latinToCyr(q.toLowerCase()) : q));
    const eq = lc(q);
    const score = new Map();
    const bump = (e, s) => { if ((score.get(e) || 0) < s) score.set(e, s); };
    all.forEach((e) => {
      if (kq.length) {
        if (e.k === kq) bump(e, 100); else if (e.k.startsWith(kq)) bump(e, 80 - Math.min(30, e.k.length - kq.length));
        else if (kq.length >= 3 && e.k.includes(kq)) bump(e, 40);
      }
      if (!cyr && eq.length >= 2) {
        const words = e.enl.split(/[^a-z']+/);
        if (e.en.some((g) => lc(g) === eq || lc(g) === 'to ' + eq)) bump(e, 95);
        else if (words.includes(eq)) bump(e, 70);
        else if (eq.length >= 4 && e.enl.includes(eq)) bump(e, 35);
      }
    });
    let rows = [...score.entries()].sort((a, b) => b[1] - a[1] || a[0].k.length - b[0].k.length).map((x) => x[0]);
    let how = '';
    if (cyr && !rows.some((e) => e.k === kq) && A.analyze) {
      const an = A.analyze(kq).slice(0, 1);
      const byKey = new Map(all.map((e) => [e.k, e]));
      const stems = an.map((a) => ({ a, e: byKey.get(a.stem) || [...byKey.values()].find((x) => A.verbStems && x.pos === 'v' && A.verbStems(x.w).includes(a.stem)) })).filter((x) => x.e);
      if (stems.length) {
        how = `<b lang="ky">${esc(kq)}</b> looks like ${stems.map((x) => { const viaStem = x.e.k !== x.a.stem; return `<b lang="ky">${esc(viaStem ? x.a.stem + '-' : x.e.w)}</b>${x.a.rest ? ` + <span class="m m1">-${esc(x.a.rest)}</span>` : ''}${viaStem ? ` (dictionary form <span lang="ky">${esc(x.e.w)}</span>)` : ''}`; }).join(' or ')}: “${esc(stems[0].e.en[0])}”.`;
        rows = stems.map((x) => x.e).concat(rows.filter((e) => !stems.some((x) => x.e === e)));
      }
    }
    return { rows: rows.slice(0, 80), how, total: rows.length };
  }

  /* ------------------------------ Rendering ------------------------------- */
  const inDeck = (e) => { const s = store.d.srs[e.w] || store.d.srs[e.k]; const w = (store.d.words || {})[e.k]; return !!s || (w && w.s >= 1); };
  function row(e) {
    const srcs = e.src.map((s) => s === 'course' && e.lesson ? `<a class="dsrc course" href="#lesson-${esc(e.lesson.id)}">Lesson ${esc(e.lesson.num)}</a>` : `<span class="dsrc ${esc(s)}">${esc(SRC[s] || s)}</span>`).join('');
    return `<li class="dict-row">
      <button type="button" class="say-btn" data-say="${esc(e.w)}" aria-label="Listen to ${esc(e.w)}">${A.ICON_SAY}</button>
      <div class="dict-main"><div class="dict-head"><span class="dict-kg" lang="ky">${esc(e.w)}</span>${tl(e.w)}${e.pos ? `<span class="dict-pos">${esc(POS[e.pos] || e.pos)}</span>` : ''}</div>
        <div class="dict-en">${esc(e.en.join('; '))}</div><div class="dict-srcs">${srcs}</div></div>
      <button type="button" class="dict-add" data-add="${esc(e.k)}" ${inDeck(e) ? 'disabled' : ''}>${inDeck(e) ? 'In review' : '+ Learn'}</button>
    </li>`;
  }
  function wordOfDay() {
    const pool = index().filter((e) => (e.src.includes('wk') || e.src.includes('pc')) && e.pos === 'n' && e.en[0] && e.en[0].length < 40 && /^[а-яөүң]{3,9}$/.test(e.w) && !/[фцщъьэё]|ия$|изм$|ист$|ция$/.test(e.w));
    if (!pool.length) return null;
    const d = new Date(); const n = (d.getFullYear() * 400 + d.getMonth() * 31 + d.getDate()) % pool.length;
    return pool[n];
  }

  A.ROUTES.dictionary = function dictionary() {
    const main = A.main(), all = index();
    const counts = { wk: 0, pc: 0, course: 0, drops: 0 };
    all.forEach((e) => e.src.forEach((s) => { if (s in counts) counts[s]++; }));
    const wod = wordOfDay();
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>Dictionary</h1><div class="kgt">Сөздүк</div>
      <p>${all.length.toLocaleString()} Kyrgyz words and phrases. Type Kyrgyz, Latin letters or English. Type a word with endings, like <span lang="ky">китептеримден</span>, and it finds the stem.</p></div></header>
      <div class="wrap dict">
        <div class="dict-search"><label for="dq" class="sr-only">Search the dictionary</label>
          <input id="dq" class="input" type="search" autocomplete="off" spellcheck="false" placeholder="Search: үй, uy, house…" lang="ky">
          <div class="dict-abc" role="group" aria-label="Browse by letter">${ABC.map((l) => `<button type="button" data-l="${l}">${l}</button>`).join('')}</div></div>
        <div class="dict-out" aria-live="polite"></div>
        ${wod ? `<aside class="dict-wod"><span class="lab">Word of the day</span><span class="dict-kg" lang="ky">${esc(wod.w)}</span>${tl(wod.w)}<span class="dict-en">${esc(wod.en.join('; '))}</span><button type="button" class="say-btn" data-say="${esc(wod.w)}" aria-label="Listen">${A.ICON_SAY}</button></aside>` : ''}
        <p class="dict-credits">Sources: course lessons (${counts.course.toLocaleString()}), Word drops (${counts.drops.toLocaleString()}),
          <a href="https://en.wiktionary.org/wiki/Category:Kyrgyz_lemmas" target="_blank" rel="noopener">English Wiktionary</a> (${counts.wk.toLocaleString()}, CC BY-SA 3.0, via kaikki.org),
          and the Peace Corps Kyrgyzstan <i>Kyrgyz Language Manual</i>, Bishkek 1997 (${counts.pc.toLocaleString()}). Spot a mistake? Add your own meaning in the reader.</p>
      </div>`;
    const out = $('.dict-out', main), q = $('#dq', main);
    let letter = '', shown = 0, list = [];
    const drawList = (rows, head, more) => {
      out.innerHTML = `${head || ''}${rows.length ? `<ul class="dict-list">${rows.map(row).join('')}</ul>` : '<p class="dict-empty">No match. Try fewer letters, the dictionary form (stem), or an English word.</p>'}${more ? '<button type="button" class="btn btn-line dict-more">Show more</button>' : ''}`;
    };
    const run = () => {
      const v = q.value; letter = '';
      $$('.dict-abc button', main).forEach((b) => b.setAttribute('aria-pressed', 'false'));
      if (!v.trim()) { out.innerHTML = '<p class="dict-hint">Start typing, or pick a letter.</p>'; return; }
      const r = search(v);
      drawList(r.rows, `${r.how ? `<p class="dict-how">${r.how}</p>` : ''}<p class="dict-count">${r.total ? `${r.total > 80 ? 'Top 80 of ' : ''}${r.total} result${r.total === 1 ? '' : 's'}` : ''}</p>`);
    };
    let t = null;
    q.addEventListener('input', () => { clearTimeout(t); t = setTimeout(run, 120); });
    main.addEventListener('click', (e) => {
      const l = e.target.closest('[data-l]');
      if (l) {
        clearTimeout(t); letter = l.dataset.l; q.value = ''; shown = 100;
        $$('.dict-abc button', main).forEach((b) => b.setAttribute('aria-pressed', String(b === l)));
        list = all.filter((x) => x.k.startsWith(lc(letter)));
        drawList(list.slice(0, shown), `<p class="dict-count">${list.length.toLocaleString()} words starting with <b lang="ky">${esc(letter)}</b></p>`, list.length > shown);
        return;
      }
      if (e.target.closest('.dict-more')) { shown += 150; drawList(list.slice(0, shown), `<p class="dict-count">${list.length.toLocaleString()} words starting with <b lang="ky">${esc(letter)}</b></p>`, list.length > shown); return; }
      const add = e.target.closest('[data-add]');
      if (add && !add.disabled) {
        const en = all.find((x) => x.k === add.dataset.add);
        const W = store.d.words || (store.d.words = {});
        W[add.dataset.add] = Object.assign(W[add.dataset.add] || {}, { s: 1, t: Date.now(), m: en ? en.en.join('; ') : '' });
        store.save(); add.disabled = true; add.textContent = 'In review';
        toast(`“${en ? en.w : add.dataset.add}” added to your review deck.`);
      }
    });
    out.innerHTML = '<p class="dict-hint">Start typing, or pick a letter.</p>';
    const pre = sessionStorage.getItem('kg-dict-q'); if (pre) { q.value = pre; sessionStorage.removeItem('kg-dict-q'); run(); }
    q.focus({ preventScroll: true });
  };
  A.TITLES.dictionary = 'Dictionary';
});
