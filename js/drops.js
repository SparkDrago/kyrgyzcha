/* ==========================================================================
   Word drops — Drops-style picture vocabulary
   Short timed sessions · pictures instead of translations · swipe away words
   you know · picture pick, word pick, listening, letter blocks, pair matching.
   Learned words go into the shared spaced-repetition deck (store.d.srs).
   ========================================================================== */
(window.KG_PLUGINS = window.KG_PLUGINS || []).push(function (A) {
  'use strict';
  const D = window.DROPS;
  if (!D) return;
  const { store, $, $$, esc, tl, shuffle } = A;
  const KG = window.KG;
  const INTERVALS = [0, 1, 3, 7, 16, 35, 90];
  const LENGTHS = [3, 5, 10];
  const SPELL_RE = /^[а-яёөүң]{2,10}$/;

  ['drops', 'drop'].forEach((k) => { if (!A.NAV_GROUPS.review.includes(k)) A.NAV_GROUPS.review.push(k); });

  /* ------------------------------- Words ---------------------------------- */
  const EXTRA = new Map(D.extra.map((x) => [x[0], { k: x[0], en: x[1], pic: x[2], extra: true }]));
  let WORDS = null;
  function words() {
    if (WORDS) return WORDS;
    const course = new Map();
    A.allVocab().forEach((v) => { if (!course.has(v.k)) course.set(v.k, v.en); });
    WORDS = new Map();
    D.topics.forEach((t) => t.words.forEach((k) => {
      if (WORDS.has(k)) { WORDS.get(k).topics.push(t.id); return; }
      const ex = EXTRA.get(k);
      const en = ex ? ex.en : (course.get(k) || '');
      if (!en) return;
      WORDS.set(k, { k, en: en.replace(/\s+—\s.*$/, ''), pic: ex ? ex.pic : (D.pics[k] || ''), extra: !!ex, topics: [t.id] });
    }));
    return WORDS;
  }
  const topicWords = (t) => t.words.map((k) => words().get(k)).filter(Boolean);
  const topicById = (id) => D.topics.find((t) => t.id === id);

  // Words learned only through drops join the main review deck (flashcards, smart review).
  const prevExtra = A.HOOKS.extraVocab;
  const DROP_LESSON = { id: 'drops', num: '💧', title: 'Word drops', stage: { n: 'drops' } };
  A.HOOKS.extraVocab = () => (prevExtra ? prevExtra() : []).concat(
    D.extra.filter((x) => store.d.srs[x[0]]).map((x) => ({ k: x[0], en: x[1], mine: true, drop: true, lesson: DROP_LESSON })));

  /* --------------------------- Memory (SRS) ------------------------------- */
  const srs = (k) => store.d.srs[k];
  function grade(k, ok) {
    const s = store.d.srs[k] || { box: 0, due: 0 };
    if (ok) { s.box = Math.min(6, (s.box || 0) + 1); s.due = Date.now() + INTERVALS[s.box] * 864e5 - 36e5; }
    else { s.box = 1; s.due = Date.now() + 10 * 60e3; }
    s.t = Date.now(); store.d.srs[k] = s;
  }
  function markKnown(k) { store.d.srs[k] = { box: 5, due: Date.now() + INTERVALS[5] * 864e5, t: Date.now() }; }
  const isDue = (w) => { const s = srs(w.k); return s && s.due <= Date.now(); };
  function progress(list) {
    let seen = 0, strong = 0, due = 0;
    list.forEach((w) => { const s = srs(w.k); if (!s) return; seen++; if (s.box >= 3) strong++; if (s.due <= Date.now()) due++; });
    return { seen, strong, due, total: list.length };
  }
  const strengthOf = (w) => { const s = srs(w.k); return !s ? 0 : s.box <= 2 ? 1 : s.box <= 4 ? 2 : 3; };

  /* ------------------------------ Pictures -------------------------------- */
  function pic(w, cls) {
    const p = w.pic || '';
    if (p.startsWith('c:')) return `<span class="pic pic-sw ${cls || ''}" style="--sw:${esc(p.slice(2))}" role="img" aria-label="${esc(w.en)}"></span>`;
    if (p.startsWith('n:')) return `<span class="pic pic-num ${cls || ''}" role="img" aria-label="${esc(w.en)}">${esc(p.slice(2))}</span>`;
    if (p) return `<span class="pic pic-emo ${cls || ''}" role="img" aria-label="${esc(w.en)}">${p}</span>`;
    return `<span class="pic pic-txt ${cls || ''}">${esc(w.en)}</span>`;
  }

  /* ------------------------- Sound and haptics ---------------------------- */
  let actx = null;
  const soundOn = () => (store.d.settings || {}).dropsSound !== false;
  function blip(ok) {
    if (navigator.vibrate) { try { navigator.vibrate(ok ? 12 : [30, 40, 30]); } catch (e) { /* ignore */ } }
    if (!soundOn()) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime;
      (ok ? [660, 990] : [233, 175]).forEach((f, i) => {
        const o = actx.createOscillator(), g = actx.createGain(), s = t + i * 0.08;
        o.type = ok ? 'sine' : 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, s); g.gain.exponentialRampToValueAtTime(0.16, s + 0.012); g.gain.exponentialRampToValueAtTime(0.0001, s + 0.13);
        o.connect(g); g.connect(actx.destination); o.start(s); o.stop(s + 0.15);
      });
    } catch (e) { /* audio not available */ }
  }
  const say = (k) => A.say(k);

  /* ------------------------------ Settings -------------------------------- */
  const minutes = () => { const m = (store.d.settings || {}).dropsMin; return LENGTHS.includes(m) ? m : 5; };
  const setSetting = (k, v) => { store.d.settings = Object.assign({}, store.d.settings, { [k]: v }); store.save(); };
  const lengthPicker = () => `<div class="seg drop-len" role="group" aria-label="Session length">${LENGTHS.map((m) => `<button type="button" data-min="${m}" aria-pressed="${m === minutes()}">${m} min</button>`).join('')}</div>`;
  function bindLength(root) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest('[data-min]'); if (!b) return;
      setSetting('dropsMin', +b.dataset.min);
      $$('[data-min]', root).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
    });
  }

  /* --------------------------------- Hub ---------------------------------- */
  const unfinished = (t) => { const p = progress(topicWords(t)); return p.seen < p.total; };
  function nextTopic() {
    const last = topicById((store.d.settings || {}).dropsLast);
    return (last && unfinished(last) ? last : D.topics.find(unfinished)) || D.topics[0];
  }
  function quickPlan() {
    const all = [...words().values()];
    const due = all.filter(isDue).length, t = nextTopic();
    return { due, t, fresh: topicWords(t).filter((w) => !srs(w.k)).length };
  }

  A.ROUTES.drops = function hub() {
    const main = A.main(), q = quickPlan(), all = [...words().values()], p = progress(all);
    const st = store.d.stats || {};
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>Word drops</h1><div class="kgt">Тамчы</div>
      <p>A few minutes, a handful of words, pictures instead of translations. Your brain remembers images faster than lists, and short daily sessions stick better than long ones.</p></div></header>
      <div class="wrap drops-hub">
        <div class="drops-today">
          <div class="dt-main">
            <span class="dt-lab">Today’s drop</span>
            <b class="dt-title">${q.due ? `${q.due} word${q.due > 1 ? 's' : ''} to refresh, then new words` : `${esc(q.t.name)}`}</b>
            <span class="dt-sub">${q.due ? `New words come from <b>${esc(q.t.name)}</b>.` : `${q.fresh} new word${q.fresh === 1 ? '' : 's'} waiting in this topic.`}</span>
            <div class="dt-row">${lengthPicker()}<button class="btn btn-gold dt-go" data-start="quick">Start</button></div>
          </div>
          <dl class="dt-stats">
            <div><dt>Words learned</dt><dd>${p.seen}<small> / ${p.total}</small></dd></div>
            <div><dt>Strong</dt><dd>${p.strong}</dd></div>
            <div><dt>Minutes spent</dt><dd>${Math.round(st.dropsMin || 0)}</dd></div>
          </dl>
        </div>
        <h2 class="drops-h">Topics</h2>
        <div class="topic-grid">${D.topics.map((t) => { const tp = progress(topicWords(t)); return `
          <a class="topic" href="#drops-${t.id}" style="--tc:${t.color}">
            <span class="topic-icon" aria-hidden="true">${t.icon}</span>
            <span class="topic-name">${esc(t.name)}</span><span class="topic-kg" lang="ky">${esc(t.kg)}</span>
            <span class="topic-bar" aria-hidden="true"><i style="width:${(tp.seen / tp.total) * 100}%"></i></span>
            <span class="topic-meta">${tp.seen === tp.total ? 'All learned' : `${tp.seen} of ${tp.total} words`}${tp.due ? ` · <b>${tp.due} to refresh</b>` : ''}</span>
          </a>`; }).join('')}</div>
        <section class="drops-how">
          <h2 class="drops-h">How a drop works</h2>
          <ul>
            <li><b>Meet the word.</b> A picture, the Kyrgyz word and its sound. Already know it? Swipe it up (or press ↑) and it’s never asked.</li>
            <li><b>Play with it.</b> Tap the right picture, pick the word, listen, then build it from letter blocks. Every few words, match pairs.</li>
            <li><b>Beat the clock.</b> When time runs out you finish the current word. Words you learn come back in Smart review just before you’d forget them.</li>
          </ul>
        </section>
      </div>`;
    bindLength(main);
    main.addEventListener('click', (e) => { const s = e.target.closest('[data-start]'); if (s) start({ mode: s.dataset.start }); });
  };
  A.TITLES.drops = 'Word drops';

  /* ------------------------------ Topic page ------------------------------ */
  A.PREFIXES.push(['drops-', (id) => {
    const t = topicById(id), main = A.main();
    if (!t) { location.hash = '#drops'; return; }
    const list = topicWords(t), tp = progress(list), complete = tp.seen === tp.total;
    document.title = 'Кыргызча — ' + t.name;
    const dots = (n) => `<span class="str s${n}" aria-label="${['new', 'learning', 'good', 'strong'][n]}"><i></i><i></i><i></i></span>`;
    main.innerHTML = `<header class="topic-head" style="--tc:${t.color}"><div class="wrap">
        <div class="crumbs"><a href="#drops">Word drops</a></div>
        <div class="th-row"><span class="th-icon" aria-hidden="true">${t.icon}</span><div><h1>${esc(t.name)}</h1><div class="kgt" lang="ky">${esc(t.kg)}</div></div></div>
        <div class="th-progress"><span class="topic-bar"><i style="width:${(tp.seen / tp.total) * 100}%"></i></span><span>${tp.seen} of ${tp.total} learned · ${tp.strong} strong${tp.due ? ` · ${tp.due} to refresh` : ''}</span></div>
        <div class="dt-row">${lengthPicker()}<button class="btn btn-gold" data-start="topic">${complete ? (tp.due ? 'Refresh this topic' : 'Practise again') : tp.seen ? 'Continue' : 'Start this topic'}</button></div>
      </div></header>
      <div class="wrap"><ul class="wordlist">${list.map((w) => `<li><button type="button" class="wl-say" data-say="${esc(w.k)}" aria-label="Listen to ${esc(w.k)}">${pic(w, 'sm')}</button>
        <div class="wl-text"><span class="wl-kg" lang="ky">${esc(w.k)}</span>${tl(w.k)}<span class="wl-en">${esc(w.en)}</span></div>${dots(strengthOf(w))}</li>`).join('')}</ul></div>`;
    bindLength(main);
    main.addEventListener('click', (e) => { if (e.target.closest('[data-start]')) start({ mode: 'topic', topic: t.id }); });
  }]);

  /* ------------------------------- Session -------------------------------- */
  let PENDING = null;
  function start(opts) { if (opts.topic) setSetting('dropsLast', opts.topic); PENDING = opts; if (location.hash === '#drop') A.route(); else location.hash = '#drop'; }

  function buildPool(opts) {
    const all = [...words().values()];
    let topic = opts.topic ? topicById(opts.topic) : null, cands;
    if (opts.mode === 'topic' && topic) cands = topicWords(topic);
    else { topic = nextTopic(); cands = all.filter(isDue).concat(topicWords(topic)); }
    const uniq = [...new Map(cands.map((w) => [w.k, w])).values()];
    const reviews = uniq.filter(isDue).sort((a, b) => srs(a.k).box - srs(b.k).box).slice(0, 10);
    const fresh = uniq.filter((w) => !srs(w.k));
    let practice = [];
    if (!reviews.length && !fresh.length) practice = shuffle(uniq.slice()).sort((a, b) => srs(a.k).box - srs(b.k).box).slice(0, 8);
    return { topic, reviews: reviews.concat(practice), fresh, cands: uniq };
  }

  A.ROUTES.drop = function session() {
    const main = A.main();
    if (!PENDING) { location.replace('#drops'); return; }
    const opts = PENDING; PENDING = null;
    const pool = buildPool(opts);
    const color = (opts.mode === 'topic' && pool.topic) ? pool.topic.color : '#1f2a5c';
    const S = {
      step: 0, active: [], reviews: pool.reviews.slice(), fresh: pool.fresh.slice(), mastered: [], known: [], seen: [],
      right: 0, wrong: 0, xp: 0, sinceP: 0, last: null, timeUp: false, ended: false,
      total: minutes() * 60e3, left: minutes() * 60e3, lastTick: Date.now(), busy: false
    };
    const distractPool = pool.cands.length >= 6 ? pool.cands : [...words().values()];

    main.innerHTML = `<section class="drop-stage" style="--tc:${color}">
      <div class="drop-top">
        <button type="button" class="drop-icon drop-x" aria-label="End session">✕</button>
        <div class="drop-timer" role="progressbar" aria-label="Time left" aria-valuemin="0" aria-valuemax="100"><i></i></div>
        <span class="drop-count" aria-live="polite"></span>
        <button type="button" class="drop-icon drop-snd" aria-label="Sound effects" aria-pressed="${soundOn()}">${soundOn() ? '🔊' : '🔈'}</button>
      </div>
      <div class="drop-body"></div>
    </section>`;
    const body = $('.drop-body', main), bar = $('.drop-timer i', main), barWrap = $('.drop-timer', main), count = $('.drop-count', main);
    const setCount = () => { count.textContent = `${S.mastered.length + S.known.length} word${S.mastered.length + S.known.length === 1 ? '' : 's'}`; };
    setCount();

    // Timer (pauses while the tab is hidden)
    const timer = setInterval(() => {
      if (!main.isConnected) { clearInterval(timer); return; }
      const now = Date.now(), dt = now - S.lastTick; S.lastTick = now;
      if (document.visibilityState !== 'visible' || S.ended) return;
      S.left = Math.max(0, S.left - dt);
      const pct = (S.left / S.total) * 100;
      bar.style.width = pct + '%'; barWrap.setAttribute('aria-valuenow', String(Math.round(pct)));
      if (!S.left && !S.timeUp) { S.timeUp = true; barWrap.classList.add('up'); count.textContent = 'Last one!'; }
    }, 200);

    const spent = () => (S.total - S.left) / 60e3;
    const pickWord = (w) => { if (!S.seen.includes(w)) S.seen.push(w); };
    function distractors(w, n, needPic) {
      const ok = (x) => x.k !== w.k && x.en !== w.en && (!needPic || (x.pic && x.pic !== w.pic));
      let c = shuffle(distractPool.filter(ok));
      if (c.length < n) c = c.concat(shuffle([...words().values()].filter((x) => ok(x) && !c.includes(x))));
      const out = [];
      for (const x of c) { if (out.length >= n) break; if (!needPic || !out.some((o) => o.pic === x.pic)) out.push(x); }
      return out;
    }

    /* ---- scheduler ---- */
    function next() {
      if (S.ended) return;
      if (S.timeUp) return finish('time');
      const pairable = S.seen.filter((w) => w.pic);
      if (S.sinceP >= 6 && pairable.length >= 4) { S.sinceP = 0; return pairs(pairable); }
      const ready = S.active.filter((i) => i.next <= S.step && i !== S.last);
      if (S.active.length < 3 || (!ready.length && S.active.length < 5)) {
        if (S.reviews.length) { const it = { w: S.reviews.shift(), lv: 1, next: 0, miss: false, review: true }; S.active.push(it); return exercise(it); }
        if (S.fresh.length) return intro(S.fresh.shift());
      }
      const cand = (ready.length ? ready : S.active.filter((i) => i !== S.last)).sort((a, b) => a.next - b.next)[0] || S.active[0];
      if (cand) return exercise(cand);
      return finish('done');
    }
    function exercise(it) {
      S.last = it; pickWord(it.w);
      const w = it.w, canListen = KG.speech.available();
      if (it.lv <= 0) return pickPic(it, 2);
      if (it.lv === 1) return canListen && Math.random() < 0.4 ? listen(it) : pickKg(it);
      if (SPELL_RE.test(w.k)) return spell(it);
      return Math.random() < 0.5 || !canListen ? pickPic(it, 4) : listen(it);
    }
    function answered(it, ok) {
      S.step++; S.sinceP++;
      if (ok) {
        S.right++; S.xp++; store.addXP(1, 'drops'); it.lv++; it.next = S.step + 2;
        if (it.lv >= 3) {
          S.active = S.active.filter((x) => x !== it);
          grade(it.w.k, !it.miss); store.save();
          S.mastered.push(it); S.xp += 2; store.addXP(2, 'drops'); setCount();
        }
      } else { S.wrong++; it.miss = true; it.lv = Math.max(0, it.lv - 1); it.next = S.step + 1; }
    }

    /* ---- feedback helpers ---- */
    let onEnter = null;
    function success(after) { blip(true); S.busy = true; setTimeout(() => { S.busy = false; after(); }, 750); }
    function failure(w) {
      blip(false); say(w.k);
      const fb = document.createElement('div'); fb.className = 'drop-fb'; fb.setAttribute('role', 'status');
      fb.innerHTML = `${pic(w, 'xs')}<div><b lang="ky">${esc(w.k)}</b> ${tl(w.k)}<span>${esc(w.en)}</span></div><button type="button" class="btn btn-ink">Continue</button>`;
      body.appendChild(fb);
      const go = () => { onEnter = null; next(); };
      $('button', fb).addEventListener('click', go); $('button', fb).focus({ preventScroll: true }); onEnter = go;
    }
    const toTop = () => { if (window.scrollY > 0) window.scrollTo({ top: 0, behavior: 'instant' }); };
    const render = (html, cls) => { body.innerHTML = `<div class="drop-card ${cls || ''}">${html}</div>`; onEnter = null; toTop(); return $('.drop-card', body); };
    const optsHtml = (list, mode) => `<div class="dopts n${list.length}">${list.map((o, i) => `<button type="button" class="dopt ${mode}" data-i="${i}"><span class="key" aria-hidden="true">${i + 1}</span>${mode === 'kg' ? `<span class="dopt-kg" lang="ky">${esc(o.k)}</span>${tl(o.k)}` : `${pic(o, 'md')}<span class="dopt-en">${esc(o.en)}</span>`}</button>`).join('')}</div>`;
    function bindOpts(card, list, it, onRight) {
      card.addEventListener('click', (e) => {
        const b = e.target.closest('.dopt'); if (!b || S.busy || card.dataset.done) return;
        card.dataset.done = '1';
        const o = list[+b.dataset.i], ok = o.k === it.w.k;
        $$('.dopt', card).forEach((x) => { x.disabled = true; if (list[+x.dataset.i].k === it.w.k) x.classList.add('right'); });
        if (!ok) b.classList.add('wrong');
        answered(it, ok);
        if (ok) { if (onRight) onRight(); success(next); } else failure(it.w);
      });
    }

    /* ---- 1. meet the word ---- */
    function intro(w) {
      pickWord(w);
      const card = render(`<span class="drop-tag">New word</span>
        <div class="intro-pic">${pic(w, 'xl')}</div>
        <div class="intro-kg" lang="ky">${esc(w.k)}</div>${tl(w.k)}
        <div class="intro-en">${esc(w.en)}</div>${A.arHint(w.k)}
        <button type="button" class="drop-say" data-say="${esc(w.k)}" aria-label="Listen again">${A.ICON_SAY}</button>
        <div class="intro-actions"><button type="button" class="btn btn-line know">I know this <span aria-hidden="true">↑</span></button><button type="button" class="btn btn-ink got">Got it</button></div>
        <p class="intro-hint">Swipe the card up if you already know it.</p>`, 'intro');
      say(w.k);
      const know = () => {
        if (card.dataset.done) return; card.dataset.done = '1';
        markKnown(w.k); store.save(); S.known.push(w); setCount(); card.classList.add('fly'); S.step++;
        setTimeout(next, 280);
      };
      const got = () => {
        if (card.dataset.done) return; card.dataset.done = '1';
        S.active.push({ w, lv: 0, next: S.step + 1, miss: false }); S.step++; next();
      };
      $('.know', card).addEventListener('click', know);
      $('.got', card).addEventListener('click', got);
      onEnter = got; S.onUp = know;
      let y0 = null;
      card.addEventListener('pointerdown', (e) => { if (!e.target.closest('button')) { y0 = e.clientY; card.setPointerCapture(e.pointerId); } });
      card.addEventListener('pointermove', (e) => { if (y0 != null) { const dy = Math.min(0, e.clientY - y0); card.style.transform = `translateY(${dy}px)`; card.style.opacity = String(1 + dy / 400); } });
      const end = (e) => { if (y0 == null) return; const dy = e.clientY - y0; y0 = null; card.style.transform = ''; card.style.opacity = ''; if (dy < -80) know(); };
      card.addEventListener('pointerup', end); card.addEventListener('pointercancel', end);
    }

    /* ---- 2. see the word, tap its picture ---- */
    function pickPic(it, n) {
      const list = shuffle([it.w].concat(distractors(it.w, n - 1, true)));
      const card = render(`<span class="drop-tag">Tap the picture</span>
        <div class="prompt-kg" lang="ky">${esc(it.w.k)}</div>${tl(it.w.k)}
        <button type="button" class="drop-say" data-say="${esc(it.w.k)}" aria-label="Listen">${A.ICON_SAY}</button>
        ${optsHtml(list, 'pic')}`);
      say(it.w.k); bindOpts(card, list, it);
    }
    /* ---- 3. see the picture, pick the word ---- */
    function pickKg(it) {
      const list = shuffle([it.w].concat(distractors(it.w, 2, false)));
      const card = render(`<span class="drop-tag">Which word is it?</span>
        <div class="prompt-pic">${pic(it.w, 'lg')}</div><div class="prompt-en">${esc(it.w.en)}</div>
        ${optsHtml(list, 'kg')}`);
      bindOpts(card, list, it, () => say(it.w.k));
    }
    /* ---- 4. hear it, tap the picture ---- */
    function listen(it) {
      const list = shuffle([it.w].concat(distractors(it.w, 3, true)));
      const card = render(`<span class="drop-tag">What did you hear?</span>
        <button type="button" class="listen-big" data-say="${esc(it.w.k)}" aria-label="Play the word again">${A.ICON_SAY}</button>
        ${optsHtml(list, 'pic')}`);
      setTimeout(() => say(it.w.k), 150);
      bindOpts(card, list, it, () => { const r = document.createElement('div'); r.className = 'reveal'; r.innerHTML = `<span lang="ky">${esc(it.w.k)}</span>`; card.insertBefore(r, $('.dopts', card)); });
    }
    /* ---- 5. build it from letter blocks ---- */
    function chunksOf(word) {
      const ch = [...word];
      if (ch.length <= 5) return ch;
      const out = []; let i = 0;
      while (i < ch.length) { const left = ch.length - i, n = left === 3 ? 3 : Math.min(2, left); out.push(ch.slice(i, i + n).join('')); i += n; }
      return out;
    }
    function spell(it) {
      const w = it.w, parts = chunksOf(w.k);
      let order = shuffle(parts.map((p, i) => ({ p, i })));
      if (parts.length > 1 && order.every((o, i) => o.i === i)) order = order.slice(1).concat(order[0]);
      const card = render(`<span class="drop-tag">Build the word</span>
        <div class="prompt-pic">${pic(w, 'lg')}</div><div class="prompt-en">${esc(w.en)}</div>
        <div class="spell-slot" aria-live="polite" aria-label="Your answer"></div>
        <div class="spell-pool">${order.map((o, j) => `<button type="button" class="dchunk" data-j="${j}" lang="ky">${esc(o.p)}</button>`).join('')}</div>
        <button type="button" class="linkish spell-skip">I don’t know</button>`, 'spell');
      const slot = $('.spell-slot', card), poolEl = $('.spell-pool', card);
      const check = () => {
        const got = $$('.dchunk', slot).map((b) => b.textContent).join('');
        if ($$('.dchunk', slot).length < parts.length || card.dataset.done) return;
        card.dataset.done = '1'; $$('.dchunk', card).forEach((b) => { b.disabled = true; });
        const ok = got === w.k; slot.classList.add(ok ? 'right' : 'wrong'); answered(it, ok);
        if (ok) { say(w.k); success(next); } else failure(w);
      };
      card.addEventListener('click', (e) => {
        const b = e.target.closest('.dchunk'); if (!b || card.dataset.done) return;
        (b.parentElement === poolEl ? slot : poolEl).appendChild(b); check();
      });
      $('.spell-skip', card).addEventListener('click', () => { if (card.dataset.done) return; card.dataset.done = '1'; answered(it, false); failure(w); });
      S.keys = (e) => { // type letters to pick blocks
        const ch = e.key && e.key.length === 1 ? e.key.toLowerCase() : '';
        if (!ch) return false;
        const want = KG.latinToCyr ? [ch, KG.latinToCyr(ch)] : [ch];
        const b = $$('.dchunk', poolEl).find((x) => want.some((c) => x.textContent.startsWith(c)));
        if (b) { b.click(); return true; } return false;
      };
    }
    /* ---- 6. match pairs ---- */
    function pairs(seen) {
      const uniq = []; shuffle(seen.slice()).forEach((w) => { if (uniq.length < 5 && !uniq.some((u) => u.pic === w.pic)) uniq.push(w); });
      const set = uniq.slice(0, Math.min(5, uniq.length));
      if (set.length < 3) return next();
      const L = shuffle(set.slice()), R = shuffle(set.slice());
      const card = render(`<span class="drop-tag">Match the pairs</span>
        <div class="pairs"><div class="pcol">${L.map((w) => `<button type="button" class="pcell kg" data-k="${esc(w.k)}" lang="ky">${esc(w.k)}</button>`).join('')}</div>
        <div class="pcol">${R.map((w) => `<button type="button" class="pcell pc" data-k="${esc(w.k)}" aria-label="${esc(w.en)}">${pic(w, 'md')}</button>`).join('')}</div></div>`, 'pairs-card');
      let sel = null, left = set.length, missed = false;
      card.addEventListener('click', (e) => {
        const b = e.target.closest('.pcell'); if (!b || b.disabled) return;
        if (!sel || sel === b) { $$('.pcell.sel', card).forEach((x) => x.classList.remove('sel')); sel = sel === b ? null : b; if (sel) sel.classList.add('sel'); if (sel && sel.classList.contains('kg')) say(sel.dataset.k); return; }
        if (sel.classList.contains('kg') === b.classList.contains('kg')) { sel.classList.remove('sel'); sel = b; b.classList.add('sel'); if (b.classList.contains('kg')) say(b.dataset.k); return; }
        const a = sel; sel = null; a.classList.remove('sel');
        if (a.dataset.k === b.dataset.k) {
          [a, b].forEach((x) => { x.classList.add('matched'); x.disabled = true; });
          blip(true); say(a.dataset.k); left--;
          if (!left) { S.step++; S.xp += 2; store.addXP(2, 'drops'); if (!missed) S.right++; setTimeout(next, 650); }
        } else {
          missed = true; S.wrong++; blip(false);
          [a, b].forEach((x) => { x.classList.add('nope'); setTimeout(() => x.classList.remove('nope'), 420); });
          [a.dataset.k, b.dataset.k].forEach((k) => { const it = S.active.find((i) => i.w.k === k); if (it) it.miss = true; });
        }
      });
    }

    /* ---- summary ---- */
    function finish(why) {
      if (S.ended) return; S.ended = true; clearInterval(timer);
      // words still in progress count as seen, not mastered
      S.active.forEach((it) => { if (!srs(it.w.k)) { store.d.srs[it.w.k] = { box: 1, due: Date.now() + 10 * 60e3, t: Date.now() }; } });
      const st = store.d.stats = Object.assign({}, store.d.stats);
      st.dropsMin = (st.dropsMin || 0) + spent(); st.dropsSessions = (st.dropsSessions || 0) + 1;
      store.save();
      const tries = S.right + S.wrong, acc = tries ? Math.round((S.right / tries) * 100) : 100;
      const learned = S.mastered.filter((i) => !i.review), refreshed = S.mastered.filter((i) => i.review);
      const row = (w, tag) => `<li>${pic(w, 'xs')}<span lang="ky">${esc(w.k)}</span><span class="en">${esc(w.en)}</span>${tag ? `<span class="tag">${tag}</span>` : ''}</li>`;
      body.innerHTML = `<div class="drop-card summary">
        <span class="drop-tag">${why === 'done' ? 'Nothing left for now' : why === 'time' ? 'Time’s up' : 'Session ended'}</span>
        <h2>${S.mastered.length + S.known.length ? 'Жакшы! Nice work.' : 'Good start.'}</h2>
        <dl class="sum-stats"><div><dt>Learned</dt><dd>${learned.length}</dd></div><div><dt>Refreshed</dt><dd>${refreshed.length}</dd></div><div><dt>Accuracy</dt><dd>${acc}%</dd></div><div><dt>XP</dt><dd>+${S.xp}</dd></div></dl>
        ${S.mastered.length || S.known.length ? `<ul class="sum-words">${learned.map((i) => row(i.w, i.miss ? 'tricky' : '')).join('')}${refreshed.map((i) => row(i.w, 'refreshed')).join('')}${S.known.map((w) => row(w, 'known')).join('')}</ul>` : '<p class="sum-note">No word made it all the way yet. They’ll be waiting next time.</p>'}
        <p class="sum-note">${learned.length ? 'These words are now in Smart review and will come back just before you’d forget them.' : ''}</p>
        <div class="sum-actions"><button type="button" class="btn btn-ink again">Another ${minutes()} minutes</button><a class="btn btn-line" href="${opts.topic ? '#drops-' + esc(opts.topic) : '#drops'}">Done</a></div>
      </div>`;
      $('.again', body).addEventListener('click', () => start(opts));
      $('.again', body).focus({ preventScroll: true });
      onEnter = () => start(opts);
      count.textContent = ''; bar.style.width = '0%'; toTop();
    }

    /* ---- controls ---- */
    $('.drop-x', main).addEventListener('click', () => { if (S.ended) location.hash = opts.topic ? '#drops-' + opts.topic : '#drops'; else finish('quit'); });
    $('.drop-snd', main).addEventListener('click', (e) => {
      const on = !soundOn(); setSetting('dropsSound', on);
      e.currentTarget.setAttribute('aria-pressed', String(on)); e.currentTarget.textContent = on ? '🔊' : '🔈';
    });
    document.onkeydown = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === 'Escape') { $('.drop-x', main).click(); return; }
      if (e.key === 'Enter' && onEnter) { if (document.activeElement && document.activeElement.tagName === 'BUTTON' && !document.activeElement.closest('.drop-fb, .summary')) return; e.preventDefault(); onEnter(); return; }
      if (e.key === 'ArrowUp' && S.onUp && $('.drop-card.intro', body)) { e.preventDefault(); S.onUp(); return; }
      if (/^[1-5]$/.test(e.key)) { const b = $(`.dopt[data-i="${+e.key - 1}"]`, body); if (b && !b.disabled) { b.click(); return; } }
      if ($('.drop-card.spell', body) && S.keys && S.keys(e)) return;
      if (e.key === 'Backspace' && $('.drop-card.spell', body)) { const s = $$('.spell-slot .dchunk', body).pop(); if (s && !s.disabled) s.click(); return; }
      if (e.key === ' ' || e.key.toLowerCase() === 'r') { const s = $('.drop-say, .listen-big', body); if (s && document.activeElement.tagName !== 'BUTTON') { e.preventDefault(); s.click(); } }
    };

    if (!S.reviews.length && !S.fresh.length) { body.innerHTML = '<div class="drop-card"><p>Nothing to practise here yet.</p></div>'; return; }
    next();
  };
  A.TITLES.drop = 'Word drop';

  /* ----------------------- Entry points elsewhere ------------------------- */
  A.dropsPlan = quickPlan;
});
