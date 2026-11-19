/* ==========================================================================
   Кыргызча — app
   Hash-routed single page app. No build step, no dependencies.
   Routes: #home #course #lesson-<id> #alphabet #machine #cards #readers
           #reader-<id> #cheatsheet #plan #about-audio
   ========================================================================== */
(function () {
  'use strict';
  const KG = window.KG;
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const shuffle = (a) => { const b = a.slice(); for (let i = b.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [b[i], b[j]] = [b[j], b[i]]; } return b; };
  const hasCyr = (s) => /[а-яёөүң]/i.test(s);
  let main = $('#main');
  const HOOKS = {};

  /* ------------------------------ Storage ------------------------------ */
  const KEY = 'kyrgyzcha-v1';
  const store = {
    d: { done: {}, srs: {}, tl: true, ar: false, streak: { last: '', count: 0 }, reviews: 0, xp: {}, words: {}, plan: null, certs: {}, placement: null, mistakes: [], stats: {}, settings: {}, mod: 0 },
    load() { try { const x = JSON.parse(localStorage.getItem(KEY) || 'null'); if (x) Object.assign(this.d, x); } catch (e) { /* storage blocked */ } },
    save(quiet) {
      if (!quiet) this.d.mod = Date.now();
      try { localStorage.setItem(KEY, JSON.stringify(this.d)); } catch (e) { /* ignore */ }
      if (!quiet) document.dispatchEvent(new CustomEvent('kg-save'));
    },
    today() { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); },
    addXP(n, why) {
      n = Math.max(0, Math.round(n)); if (!n) return;
      const t = this.today(); this.d.xp[t] = (this.d.xp[t] || 0) + n;
      this.tick(); this.save();
      document.dispatchEvent(new CustomEvent('kg-xp', { detail: { n, why } }));
    },
    tick() {
      const today = this.today();
      const yd = new Date(Date.now() - 864e5);
      const y = yd.getFullYear() + '-' + String(yd.getMonth() + 1).padStart(2, '0') + '-' + String(yd.getDate()).padStart(2, '0');
      const s = this.d.streak;
      if (s.last === today) return;
      s.count = s.last === y ? s.count + 1 : 1; s.last = today; this.save();
    }
  };
  store.load();

  /* ------------------------------ Course ------------------------------- */
  const COURSE = window.COURSE || { stages: [] };
  COURSE.stages.sort((a, b) => a.n - b.n);
  const LESSONS = [];
  COURSE.stages.forEach((st) => st.lessons.forEach((l, i) => { l.stage = st; l.num = st.n + '.' + (i + 1); LESSONS.push(l); }));
  const byId = (id) => LESSONS.find((l) => l.id === id);
  const isDone = (id) => (store.d.done[id] || 0) >= 0.8;

  /* ---------------------------- Rich text ------------------------------ */
  const ICON_SAY = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>';
  const plain = (s) => String(s).replace(/\|/g, '');
  function chips(s) {
    return String(s).split(/(\s+)/).map((word) => {
      if (!word.includes('|')) return esc(word);
      const m = word.match(/^(.*?)([.,!?…:;»”"]*)$/);
      return m[1].split('|').map((p, i) => `<span class="m m${i === 0 ? 0 : ((i - 1) % 4) + 1}">${esc(p)}</span>`).join('') + esc(m[2]);
    }).join('');
  }
  const kgSpan = (s) => `<span class="kg" data-say="${esc(plain(s))}">${chips(s)}</span>`;
  const sayBtn = (s) => `<button class="say-btn" data-say="${esc(plain(s))}" aria-label="Listen to ${esc(plain(s))}">${ICON_SAY}</button>`;
  const tl = (s) => `<span class="tl">${esc(KG.translit(plain(s)))}</span>`;
  function rich(html) {
    if (html == null) return '';
    return String(html).replace(/\[\[(.+?)\]\]/g, (m, t) => kgSpan(t));
  }
  /* Arabic origin hints */
  const AR = window.ARABIC || {};
  const AR_KEYS = Object.keys(AR).filter((k) => !AR[k].pageOnly).sort((a, b) => b.length - a.length);
  function arMatch(phrase) {
    const out = [], seen = new Set();
    plain(phrase).toLowerCase().split(/[\s\-–—.,!?«»“”()…:;\/]+/).forEach((tok) => {
      if (tok.length < 3) return;
      for (const k of AR_KEYS) {
        const exact = k.endsWith('='), kk = exact ? k.slice(0, -1) : k;
        if (exact ? tok === kk : tok.startsWith(kk)) { const e = AR[k]; if (!seen.has(e.ar)) { seen.add(e.ar); out.push(e); } break; }
      }
    });
    return out;
  }
  function arHint(phrase) {
    return arMatch(phrase).map((e) => `<span class="ar-hint"><span class="badge" aria-hidden="true">ع</span>From Arabic <span class="ar" lang="ar" dir="rtl">${esc(e.ar)}</span> ${esc(e.tr)} “${esc(e.mean)}”${e.hint ? ` <i>— ${esc(e.hint)}</i>` : ''}</span>`).join('');
  }
  const arWrap = (html) => String(html).replace(/([\u0600-\u06FF][\u0600-\u06FF\u064B-\u065F\s«»:،؟/()]*[\u0600-\u06FF؟»]|[\u0600-\u06FF])/g, '<span class="ar-in" lang="ar" dir="rtl">$1</span>');
  const ARC = window.ARABIC_COMPARE || {}, ARL = window.ARABIC_LOGIC || {};
  const para = (html) => { const h = rich(html); return /^\s*</.test(h) ? h : `<p>${h}</p>`; };

  /* ----------------------------- Blocks -------------------------------- */
  const BLOCK = {
    p: (b) => para(b.html),
    eli5: (b) => `<div class="eli5"><div class="tag">★ Like you’re five</div>${para(b.html)}</div>`,
    tip: (b) => `<div class="tip"><div class="tag">${rich(esc(b.title || 'Tip'))}</div>${para(b.html)}</div>`,
    warn: (b) => `<div class="warn"><div class="tag">${rich(esc(b.title || 'Watch out'))}</div>${para(b.html)}</div>`,
    list: (b) => `<${b.ordered ? 'ol' : 'ul'}>${b.items.map((i) => `<li>${rich(i)}</li>`).join('')}</${b.ordered ? 'ol' : 'ul'}>`,
    compare: (b) => `<div class="compare"><div class="cols">
        <div class="col"><div class="lang">English</div><div class="en-s">${rich(b.en)}</div>${ARC[b.kg] ? `<div class="ar-row"><div class="lang">Arabic</div><span lang="ar" dir="rtl">${esc(ARC[b.kg].ar)}</span></div>` : ''}</div>
        <div class="col"><div class="lang">Kyrgyz</div><div class="kg-s">${kgSpan(b.kg)} ${sayBtn(b.kg)}<br>${tl(b.kg)}</div></div></div>
        ${b.gloss || b.note || ARC[b.kg] ? `<div class="foot">${b.gloss ? `<b>Word by word:</b> ${esc(b.gloss)}` : ''}${b.gloss && b.note ? '<br>' : ''}${b.note ? rich(b.note) : ''}${ARC[b.kg] && ARC[b.kg].note ? `<div class="ar-note"><span class="badge" aria-hidden="true">ع</span><b>Arabic vs Kyrgyz:</b> ${arWrap(rich(esc(ARC[b.kg].note)))}</div>` : ''}</div>` : ''}</div>`,
    table: (b) => {
      const kc = b.kg || [];
      const cell = (c, i) => (kc.includes(i) && c && !String(c).includes('[[') && hasCyr(c)) ? kgSpan(c) : rich(c);
      return `<div class="tbl-wrap"><table>${b.caption ? `<caption>${rich(b.caption)}</caption>` : ''}<thead><tr>${b.cols.map((c) => `<th scope="col">${rich(c)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c, i) => `<td>${cell(c, i)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    },
    vocab: (b) => `${b.title ? `<h3>${esc(b.title)}</h3>` : ''}<ul class="vocab">${b.items.map((v) => `<li>${sayBtn(v[0])}<div>${kgSpan(v[0])}<br>${tl(v[0])}</div><div class="en">${rich(v[1])}${v[2] ? `<span class="note">${rich(v[2])}</span>` : ''}${arHint(v[0])}</div></li>`).join('')}</ul>`,
    ex: (b) => `${b.title ? `<h3>${esc(b.title)}</h3>` : ''}<ul class="examples">${b.items.map((x) => `<li>${sayBtn(x[0])}<div>${kgSpan(x[0])}<br>${tl(x[0])}<span class="en">${rich(x[1])}</span>${x[2] ? `<span class="gloss">${rich(esc(x[2]))}</span>` : ''}${plain(x[0]).split(/\s+/).length <= 3 ? arHint(x[0]) : ''}</div></li>`).join('')}</ul>`,
    dialog: (b) => `<div class="dialog">${b.title ? `<h4>${esc(b.title)}</h4>` : ''}${b.lines.map((l, i) => {
      const side = l[0] === (b.lines[0][0]) ? 'a' : 'b';
      return `<div class="line ${side}"><div class="who" title="${esc(l[0])}">${esc(l[0].slice(0, 2))}</div><div class="bubble">${kgSpan(l[1])} ${sayBtn(l[1])}<br>${tl(l[1])}<span class="en">${rich(l[2])}</span></div></div>`;
    }).join('')}</div>`,
    letters: (b) => `<div class="letters">${b.items.map((ch) => letterCard(ch)).join('')}</div>`,
    widget: (b) => WIDGETS[b.name] ? `<div class="widget" data-widget="${esc(b.name)}"></div>` : ''
  };

  function letterCard(ch) {
    const L = (window.ALPHABET || []).find((x) => x.l === ch);
    if (!L) return '';
    return `<button class="letter ${L.g === 'special' ? 'special' : ''} ${L.g === 'trap' ? 'trap' : ''}" data-say="${esc(L.w)}" aria-label="Letter ${esc(L.l)}, sounds like ${esc(L.s)}. Example ${esc(L.w)}">
      <span class="big">${esc(L.l)}<small>${esc(L.l.toLowerCase())}</small></span>
      <span class="snd">${esc(L.s)}</span><span class="hint">${esc(L.h)}</span>
      <span class="exw">${esc(L.w)} <span class="tl">${esc(L.m)}</span></span></button>`;
  }

  /* ---------------------------- Widgets -------------------------------- */
  const WIDGETS = {
    harmony(el) {
      el.innerHTML = `<div class="panel"><div class="field"><label for="hw">Type any Kyrgyz word (or pick one)</label>
        <input id="hw" type="text" value="китеп" autocomplete="off" spellcheck="false"></div>
        <div class="seg" style="margin-bottom:12px">${['үй', 'бала', 'кол', 'көл', 'тоо', 'уул', 'ит', 'Бишкек'].map((w) => `<button data-w="${w}">${w}</button>`).join('')}</div>
        <div class="out"></div></div>`;
      const inp = $('#hw', el), out = $('.out', el);
      const draw = () => {
        const w = KG.latinToCyr(inp.value.trim()) || 'китеп';
        const v = KG.lastVowel(w);
        const row = (lab, o) => `<tr><td>${lab}</td><td>${kgSpan(o.parts.join('|'))}</td></tr>`;
        out.innerHTML = `<p>Last vowel: <b class="kg">${esc(v)}</b> → family <b>${esc(KG.FAMILY_NAME[v])}</b>. Wide suffix vowel: <b class="kg">${KG.lowOf(v)}</b>, narrow suffix vowel: <b class="kg">${KG.highOf(v)}</b>.</p>
          <div class="tbl-wrap"><table><tbody>
          ${row('plural', KG.decline(w, { plural: true }))}${row('in / at', KG.decline(w, { case: 'loc' }))}${row('to', KG.decline(w, { case: 'dat' }))}${row('from', KG.decline(w, { case: 'abl' }))}${row('my', KG.decline(w, { poss: '1sg' }))}${row('of (whose)', KG.decline(w, { case: 'gen' }))}
          </tbody></table></div>`;
      };
      inp.addEventListener('input', draw);
      el.addEventListener('click', (e) => { const b = e.target.closest('[data-w]'); if (b) { inp.value = b.dataset.w; draw(); } });
      draw();
    },
    numbers(el) {
      el.innerHTML = `<div class="panel"><div class="field"><label for="nw">Type a number</label><input id="nw" type="text" inputmode="numeric" value="1991" style="font-family:var(--f-ui)"></div><div class="out"></div>
        <div class="quiz-actions"><button class="btn btn-line btn-sm" data-r>Random number</button></div></div>`;
      const inp = $('#nw', el), out = $('.out', el);
      const draw = () => {
        const n = parseInt(inp.value.replace(/\D/g, ''), 10);
        if (isNaN(n)) { out.innerHTML = '<p class="voice-note">Type digits, like 25 or 1991.</p>'; return; }
        const w = KG.number(Math.min(n, 999999999));
        out.innerHTML = `<p style="font-size:1.4rem">${kgSpan(w)} ${sayBtn(w)}<br>${tl(w)}</p>${n > 0 && n < 1000 ? `<p class="voice-note">Ordinal (${n}th): ${kgSpan(KG.ordinal(n))}</p>` : ''}`;
      };
      inp.addEventListener('input', draw);
      el.addEventListener('click', (e) => { if (e.target.closest('[data-r]')) { inp.value = [7, 15, 23, 48, 99, 120, 365, 1000, 2026, 450, 81][Math.floor(Math.random() * 11)] + Math.floor(Math.random() * 3); draw(); } });
      draw();
    },
    readdrill(el) {
      const words = (window.READ_DRILL || []);
      let i = 0;
      const draw = (show) => {
        const w = words[i % words.length];
        el.innerHTML = `<div class="panel" style="text-align:center"><p class="voice-note">Read it out loud first. Then check.</p>
          <p style="font-family:var(--f-kg);font-size:2.6rem;font-weight:600;margin:0">${esc(w[0])}</p>
          ${show ? `<p style="font-size:1.1rem">${tl(w[0])}<br><b>${esc(w[1])}</b> ${sayBtn(w[0])}</p>` : '<p>&nbsp;</p>'}
          <div class="quiz-actions" style="justify-content:center">${show ? '<button class="btn btn-ink btn-sm" data-n>Next word</button>' : '<button class="btn btn-gold btn-sm" data-s>Check</button>'}</div></div>`;
      };
      el.addEventListener('click', (e) => { if (e.target.closest('[data-s]')) draw(true); if (e.target.closest('[data-n]')) { i++; draw(false); } });
      i = Math.floor(Math.random() * words.length); draw(false);
    }
  };
  function mountWidgets(root) { $$('[data-widget]', root).forEach((el) => WIDGETS[el.dataset.widget](el)); }

  /* ------------------------------ Quiz --------------------------------- */
  const KBD = ['ң', 'ө', 'ү', 'ы', 'а', 'б', 'в', 'г', 'д', 'е', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ь', 'э', 'ю', 'я', 'ё'];
  function keyboard() { return `<div class="kbd" aria-label="Kyrgyz keyboard">${KBD.map((k) => `<button type="button" data-key="${k}" class="${'ңөүы'.includes(k) ? 'sp' : ''}">${k}</button>`).join('')}<button type="button" class="wide" data-key=" ">space</button><button type="button" class="wide" data-key="⌫">⌫ delete</button></div>`; }

  function mountQuiz(el, qs, onFinish) {
    let i = 0, score = 0, done = false, wrong = [];
    function view() {
      if (i >= qs.length) return finish();
      done = false;
      const q = qs[i];
      let body = '';
      if (q.t === 'mc') {
        const opts = shuffle(q.o.map((o, k) => ({ o, k })));
        body = `<div class="opts">${opts.map((x) => `<button class="opt ${hasCyr(x.o) && !/[a-z]{3,}/i.test(x.o.replace(/\[\[.*?\]\]/g, '')) ? 'kgopt' : ''}" data-k="${x.k}">${rich(x.o)}</button>`).join('')}</div>`;
      } else if (q.t === 'type') {
        body = `<input class="type-in" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" aria-label="Your answer" placeholder="Type in Kyrgyz (or Latin letters)">
          <div class="preview" aria-live="polite"></div>${keyboard()}
          <div class="quiz-actions"><button class="btn btn-ink" data-check>Check</button></div>`;
      } else if (q.t === 'order') {
        const words = q.a.replace(/[.,!?]/g, '').split(/\s+/);
        const tiles = shuffle(words.concat(q.extra || []));
        body = `<div class="tiles answer" aria-label="Your sentence"></div><div class="tiles pool">${tiles.map((w, k) => `<button class="tile" data-tile="${k}">${esc(w)}</button>`).join('')}</div>
          <div class="quiz-actions"><button class="btn btn-ink" data-check>Check</button><button class="btn btn-line" data-clear>Clear</button></div>`;
      }
      el.innerHTML = `<div class="quiz-top"><span class="count">Question ${i + 1} of ${qs.length}</span><div class="bar" style="flex:1;max-width:240px"><i style="width:${(i / qs.length) * 100}%"></i></div></div>
        <div class="q">${rich(q.q)}${q.say ? ' ' + sayBtn(q.say) : ''}</div>${body}<div class="fb"></div>`;
      const inp = $('.type-in', el);
      if (inp) {
        inp.focus({ preventScroll: true });
        inp.addEventListener('input', () => { const v = inp.value; $('.preview', el).textContent = (!hasCyr(v) && /[a-z]/i.test(v)) ? 'Reads as: ' + KG.latinToCyr(v) : ''; });
        inp.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); done ? next() : checkType(); } });
      }
    }
    function feedback(kind, html) {
      const msg = { right: 'Correct!', wrong: 'Not quite.', almost: 'Almost!' }[kind];
      $('.fb', el).innerHTML = `<div class="feedback ${kind}" role="status"><b>${msg}</b> ${html || ''}</div><div class="quiz-actions"><button class="btn btn-gold" data-next>${i + 1 < qs.length ? 'Next question' : 'See my score'}</button></div>`;
      done = true;
      const nb = $('[data-next]', el); if (nb) nb.focus({ preventScroll: true });
    }
    function mark(ok) { if (ok) score++; else wrong.push(qs[i]); if (onFinish.onAnswer) onFinish.onAnswer(qs[i], ok); }
    function checkType() {
      const q = qs[i], inp = $('.type-in', el);
      const r = KG.check(inp.value, q.a);
      mark(r === 'right');
      const ans = `Answer: ${kgSpan(q.a[0])} ${sayBtn(q.a[0])}`;
      feedback(r, (r === 'right' ? '' : ans + (r === 'almost' ? ' — check the special letters (ө ү ң ы) and spelling.' : '')) + (q.why ? `<br>${rich(q.why)}` : ''));
      inp.disabled = true;
    }
    function next() { i++; view(); }
    function finish() {
      const pct = qs.length ? score / qs.length : 1;
      const pass = pct >= 0.8;
      el.innerHTML = `<div style="text-align:center"><div class="score-big">${Math.round(pct * 100)}%</div>
        <p>${score} of ${qs.length} right. ${pass ? (onFinish.passText || 'Lesson complete — great work. Its words are now in your flashcards.') : (onFinish.failText || 'You need 80% to complete the lesson. Read the tricky part again, then retry — that’s how it sticks.')}</p>
        ${wrong.length ? `<div style="text-align:left;margin:14px 0"><h4>Review these</h4><ul>${wrong.map((q) => `<li>${rich(q.q)}${q.why ? `<br><span class="voice-note">${rich(q.why)}</span>` : ''}</li>`).join('')}</ul></div>` : ''}
        <div class="quiz-actions" style="justify-content:center"><button class="btn btn-line" data-retry>Try again</button>${onFinish.nextHref ? `<a class="btn btn-ink" href="${onFinish.nextHref}">Next lesson</a>` : ''}</div></div>`;
      onFinish(pct, wrong);
    }
    el.addEventListener('click', (e) => {
      const t = e.target;
      if (t.closest('[data-next]')) return next();
      if (t.closest('[data-retry]')) { i = 0; score = 0; wrong = []; return view(); }
      const q = qs[i];
      if (!q) return;
      const opt = t.closest('.opt');
      if (opt && !done && q.t === 'mc') {
        const ok = opt.dataset.k === '0';
        mark(ok);
        $$('.opt', el).forEach((b) => { b.disabled = true; if (b.dataset.k === '0') b.classList.add('right'); });
        if (!ok) opt.classList.add('wrong');
        return feedback(ok ? 'right' : 'wrong', q.why ? rich(q.why) : '');
      }
      const key = t.closest('[data-key]');
      if (key && !done) {
        const inp = $('.type-in', el); const k = key.dataset.key;
        inp.value = k === '⌫' ? inp.value.slice(0, -1) : inp.value + k; inp.focus(); inp.dispatchEvent(new Event('input'));
        return;
      }
      const tile = t.closest('.tile');
      if (tile && !done) {
        const ans = $('.tiles.answer', el), pool = $('.tiles.pool', el);
        (tile.parentElement === pool ? ans : pool).appendChild(tile);
        return;
      }
      if (t.closest('[data-clear]') && !done) { const pool = $('.tiles.pool', el); $$('.tiles.answer .tile', el).forEach((x) => pool.appendChild(x)); return; }
      if (t.closest('[data-check]') && !done) {
        if (q.t === 'type') return checkType();
        if (q.t === 'order') {
          const built = $$('.tiles.answer .tile', el).map((x) => x.textContent).join(' ');
          const ok = KG.norm(built) === KG.norm(q.a);
          mark(ok);
          return feedback(ok ? 'right' : 'wrong', (ok ? '' : `Answer: ${kgSpan(q.a)} `) + sayBtn(q.a) + (q.why ? `<br>${rich(q.why)}` : ''));
        }
      }
    });
    view();
  }

  /* ------------------------------ Views -------------------------------- */
  const stageMark = (n, color) => `<div class="stage-mark"><svg viewBox="0 0 88 88" aria-hidden="true"><path d="M44 4c8 0 10 9 18 11s14-3 18 4-3 12-1 20 9 11 5 18-12 4-18 9-6 14-14 16-12-6-20-6-14 9-20 3 0-13-4-20-12-9-10-17 11-8 13-16S12 8 20 6s16 4 24-2z" fill="${color}"/><circle cx="44" cy="44" r="27" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.6" stroke-dasharray="4 4"/></svg><span>${n}</span></div>`;
  const STAGE_COLORS = ['#6e4b00', '#b8232f', '#1f2a5c', '#2c3a78', '#1e7a4c', '#7a1a24', '#141b3d'];

  function stageProgress(st) { const d = st.lessons.filter((l) => isDone(l.id)).length; return { d, t: st.lessons.length, pct: st.lessons.length ? d / st.lessons.length : 0 }; }
  function nextLesson() { return LESSONS.find((l) => !isDone(l.id)) || LESSONS[LESSONS.length - 1]; }
  function allVocab() {
    const out = [], seen = new Set();
    LESSONS.forEach((l) => (l.blocks || []).forEach((b) => { if (b.t === 'vocab') b.items.forEach((v) => { const k = plain(v[0]); if (!seen.has(k)) { seen.add(k); out.push({ k, en: v[1].replace(/\[\[|\]\]/g, ''), lesson: l }); } }); }));
    if (HOOKS.extraVocab) HOOKS.extraVocab().forEach((x) => { if (!seen.has(x.k)) { seen.add(x.k); out.push(x); } });
    return out;
  }

  const CHAINS = [
    { name: 'A noun', pieces: [['үй', 'house'], ['лөр', '-s'], ['үбүз', 'our'], ['дө', 'in']], en: [[0], [0, 1], [2, 0, 1], [3, 2, 0, 1]],
      notes: ['Start with the meaning: [[үй]] = house. Every Kyrgyz word starts with its core idea.', 'Snap on [[лөр]] and it becomes plural. Its “ө” copies the “ү” in [[үй]] — that copying is vowel harmony.', 'Add [[үбүз]] = “our”. English puts “our” in front. Kyrgyz puts it at the end.', 'Add [[дө]] = “in”. One word, “in our houses”. Read the endings backwards and you get the English order.'] },
    { name: 'A verb', pieces: [['кел', 'come'], ['бе', 'not'], ['ди', 'did'], ['ңиз', 'you'], ['би', '?']], en: [[0], [1, 0], [2, 1, 0], [3, 2, 1, 0], [2, 3, 1, 0, 4]],
      notes: ['[[кел]] = come. On its own it’s also a command: “Come!”', '[[бе]] = not. [[келбе]] means “Don’t come!”', '[[ди]] puts it in the past: [[келбеди]] = “(he) didn’t come.”', '[[ңиз]] = you (polite): [[келбедиңиз]] = “you didn’t come.”', '[[би]] is a question mark you can say out loud: [[келбедиңизби?]] = “Didn’t you come?”'] }
  ];

  function home() {
    const nx = nextLesson();
    const started = Object.keys(store.d.done).length > 0;
    const vocabN = allVocab().length;
    main.innerHTML = `
    <section class="hero"><div class="wrap hero-grid">
      <div>
        <h1>Learn Kyrgyz from zero. Even if you can’t read one letter yet.</h1>
        <p class="lede">A complete path for English speakers: the Cyrillic alphabet, the sounds, and every grammar idea up to B2 — explained like you’re five, always side by side with how English does it.</p>
        <div class="cta-row">
          <a class="btn btn-gold" href="#lesson-${esc(nx.id)}">${started ? 'Continue: ' + esc(nx.title) : 'Start lesson 1'}</a>
          <a class="btn btn-ghost" href="#course">See the whole course</a>
        </div>
        <div class="hero-stats"><div><b>${COURSE.stages.length} stages</b>alphabet → B2</div><div><b>${LESSONS.length} lessons</b>with practice tests</div><div><b>${vocabN}+ words</b>in spaced flashcards</div>${store.d.streak.count ? `<div><b>${store.d.streak.count} day${store.d.streak.count === 1 ? '' : 's'}</b>your streak</div>` : ''}</div>
      </div>
      <div class="builder" aria-live="polite">
        <div class="builder-top"><strong style="font-family:var(--f-display);font-size:.9rem">Kyrgyz is built like Lego</strong>
          <div class="tabs seg">${CHAINS.map((c, i) => `<button data-chain="${i}" aria-pressed="${i === 0}">${c.name}</button>`).join('')}</div></div>
        <div class="builder-word"></div>
        <div class="builder-en"></div>
        <div class="builder-note"></div>
        <div class="builder-ctrl"><button class="btn btn-ink btn-sm" data-add>Add a piece</button><button class="btn btn-line btn-sm" data-reset>Start over</button><button class="btn btn-line btn-sm" data-sayword>${ICON_SAY.replace('<svg', '<svg width="16" height="16"')} Listen</button></div>
      </div>
    </div></section>

    <section class="section"><div class="wrap">
      <div class="section-head"><h2>Six ideas that make Kyrgyz click</h2><p>Kyrgyz isn’t harder than English — it just keeps its logic in different places. Learn these six and every lesson after will feel familiar. Colours show which word matches which.</p></div>
      <div class="ideas">
        ${idea(1, 'The verb waits until the end', 'English says who does what to what. Kyrgyz says who, then what, and saves the action for last — like a drumroll.', [['I', 1], ['eat', 3], ['bread', 2]], [['Мен', 1], ['нан', 2], ['жейм', 3]])}
        ${idea(2, 'Little words become endings', 'Where English adds separate little words (in, my, from, not), Kyrgyz snaps endings onto the word, in a fixed order.', [['in', 3], ['my', 2], ['house', 1]], [['үй', 1], ['үм', 2], ['дө', 3]], true)}
        ${idea(3, 'Endings change colour to match', 'An ending copies the “colour” of the last vowel in the word. That’s why “-s” can be лар, лер, лор, лөр, тар, дар… It’s one ending in many outfits.', [['horses', 1], ['hands', 2], ['books', 3], ['houses', 4]], [['ат|тар', 1], ['кол|дор', 2], ['китеп|тер', 3], ['үй|лөр', 4]])}
        ${idea(4, '“I have” means “mine exists”', 'Kyrgyz has no verb “to have”. You say your thing exists (бар) or doesn’t exist (жок).', [['I', 1], ['have', 3], ['a', 0], ['dog', 2]], [['Менин', 1], ['ит|им', 2], ['бар', 3]])}
        ${idea(5, 'Describing comes first, always', 'English puts “that I read yesterday” after the book. Kyrgyz puts every description before the noun, so the noun is the last thing you hear.', [['the book', 1], ['that', 0], ['I', 3], ['read', 4], ['yesterday', 2]], [['кечээ', 2], ['мен', 3], ['окуган', 4], ['китеп', 1]])}
        ${idea(6, 'Fewer things to memorise', 'No “the” or “a”. No he/she — [[ал]] is both. No masculine or feminine words. Almost no irregular verbs. To ask a question, just add [[-бы]] to the end.', [['Are', 3], ['you', 1], ['a student', 2], ['?', 4]], [['Сен', 1], ['студент|сиң|би', 2]])}
      </div>
    </div></section>

    <section class="section" style="padding-top:0"><div class="wrap">
      <div class="section-head"><h2>The path from zero to B2</h2><p>Seven stages, in order. Each lesson ends with a short test; score 80% and it’s marked complete. Spend 30–60 minutes a day and you’ll reach B1 in about 6–8 months and B2 in about a year.</p></div>
      ${roadmap(true)}
    </div></section>

    <section class="section" style="padding-top:0"><div class="wrap">
      <div class="section-head"><h2>Tools you’ll use every day</h2></div>
      <div class="tools">
        <a class="tool big" href="#machine"><span class="glyph">үй<span style="color:#fff">лөр</span></span><h3>Suffix machine</h3><p>Type any word and watch the right ending snap on, with a plain-English reason for every letter. Nouns, cases, “to be” and nine verb forms.</p></a>
        <a class="tool" href="#alphabet"><span class="glyph">Ө Ү Ң</span><h3>Alphabet</h3><p>All 36 letters with sounds, examples and a reading drill.</p></a>
        <a class="tool" href="#review"><span class="glyph">↻</span><h3>Review</h3><p>Smart review, flashcards and speaking practice. Words come back just before you’d forget them.</p></a>
        <a class="tool" href="#library"><span class="glyph">Аңгеме</span><h3>Library</h3><p>Stories from A1 to B2 and your own texts. Tap any word; track the words you know.</p></a>
        <a class="tool" href="#cheatsheet"><span class="glyph">±</span><h3>Cheat sheet</h3><p>Every ending on one page.</p></a>
      </div>
      <a class="ar-band" href="#arabic"><div><h3 style="margin:0 0 4px">Speak Arabic? You already know hundreds of Kyrgyz words.</h3><span>See the full list, the sound-change rules and the false friends.</span></div><span class="ar-big" lang="ar" dir="rtl">كتاب ← китеп</span></a>
    </div></section>`;
    const dash = HOOKS.dashboard && HOOKS.dashboard();
    if (dash) { $('.hero', main).outerHTML = dash.html; if (dash.mount) dash.mount(main); } else builder();
  }

  function idea(n, title, text, en, kg, chainKg) {
    const row = (arr, cls) => `<div class="row ${cls}">${arr.map((w) => `<span class="w c${w[1]}">${cls === 'kgrow' ? chips(w[0]) : esc(w[0])}</span>`).join('')}</div>`;
    return `<article class="idea"><h3><span class="n">${n}</span>${esc(title)}</h3><p>${rich(text)}</p>
      <div class="mirror"><span class="lab">English</span>${row(en, '')}<span class="lab">Kyrgyz</span>${chainKg ? `<div class="row kgrow"><span class="w c0" style="font-family:var(--f-kg)">${kg.map((w) => `<span class="m${w[1] === 1 ? '0' : w[1] - 1}">${esc(w[0])}</span>`).join('')}</span></div>` : row(kg, 'kgrow')}</div></article>`;
  }

  function builder() {
    const box = $('.builder'); if (!box) return;
    let c = 0, step = 0, timer = null;
    const word = $('.builder-word', box), en = $('.builder-en', box), note = $('.builder-note', box);
    const draw = () => {
      const ch = CHAINS[c];
      const pcs = ch.pieces.slice(0, step);
      word.innerHTML = pcs.map((p, i) => `<span class="m m${i}" style="animation-delay:0s">${esc(p[0])}</span>`).join('') || '<span style="color:var(--line)">…</span>';
      en.innerHTML = step ? ch.en[step - 1].map((i) => `<span class="m m${i}" ${i === 0 ? 'style="background:var(--mist)"' : ''}>${esc(ch.pieces[i][1])}</span>`).join('') : '';
      note.innerHTML = step ? rich(ch.notes[step - 1]) : 'Press “Add a piece”.';
      $('[data-add]', box).disabled = step >= ch.pieces.length;
      $$('[data-chain]', box).forEach((b) => b.setAttribute('aria-pressed', String(+b.dataset.chain === c)));
    };
    const auto = () => {
      clearInterval(timer);
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { step = CHAINS[c].pieces.length; draw(); return; }
      step = 1; draw();
      timer = setInterval(() => { if (step >= CHAINS[c].pieces.length) return clearInterval(timer); step++; draw(); }, 1700);
    };
    box.addEventListener('click', (e) => {
      if (e.target.closest('[data-add]')) { clearInterval(timer); step = Math.min(step + 1, CHAINS[c].pieces.length); draw(); }
      if (e.target.closest('[data-reset]')) { clearInterval(timer); step = 0; draw(); }
      if (e.target.closest('[data-sayword]')) say(CHAINS[c].pieces.slice(0, step).map((p) => p[0]).join(''));
      const t = e.target.closest('[data-chain]'); if (t) { c = +t.dataset.chain; auto(); }
    });
    auto();
  }

  function roadmap(compact) {
    return `<div class="road">${COURSE.stages.map((st, si) => {
      const p = stageProgress(st);
      return `<div class="stage">${stageMark(st.n, STAGE_COLORS[si % STAGE_COLORS.length])}<div class="stage-body">
        <header><h3>${esc(st.title)} <span class="kg" style="font-weight:500;color:var(--muted);font-size:.85em">· ${esc(st.kg)}</span></h3><span class="lvl">${esc(st.level)}</span></header>
        <p class="blurb">${rich(st.blurb)}</p>
        <div class="bar" aria-label="${p.d} of ${p.t} lessons complete"><i style="width:${p.pct * 100}%"></i></div>
        <ol class="lesson-list">${st.lessons.map((l) => `<li class="${isDone(l.id) ? 'done' : ''}"><a href="#lesson-${esc(l.id)}"><span class="num">${esc(l.num)}</span><span class="t">${esc(l.title)}${l.kg && !compact ? `<small>${esc(l.kg)}</small>` : ''}</span></a></li>`).join('')}</ol>
      </div></div>`;
    }).join('')}</div>`;
  }

  function course() {
    const done = LESSONS.filter((l) => isDone(l.id)).length;
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>The course</h1><div class="kgt">Курс</div>
      <p>${LESSONS.length} lessons across ${COURSE.stages.length} stages. You’ve completed ${done}. Do them in order — every lesson leans on the ones before it. Already read Cyrillic? Do the Stage 1 tests quickly and move on.</p></div></header>
      <div class="wrap" style="padding:40px 0 80px">${HOOKS.courseTop ? HOOKS.courseTop() : ''}${roadmap(false)}
      <div class="tip" style="margin-top:20px"><div class="tag">Reset progress</div><p>Progress lives in this browser only. <button class="btn btn-line btn-sm" data-act="reset">Erase my progress</button></p></div></div>`;
  }

  function lesson(id) {
    const L = byId(id);
    if (!L) return notFound();
    const idx = LESSONS.indexOf(L), prev = LESSONS[idx - 1], next = LESSONS[idx + 1];
    const sections = []; let cur = null;
    (L.blocks || []).forEach((b) => {
      if (b.t === 'h') { cur = { title: b.text, id: 's' + sections.length, blocks: [] }; sections.push(cur); return; }
      if (!cur) { cur = { title: 'Start here', id: 's0', blocks: [] }; sections.push(cur); }
      cur.blocks.push(b);
    });
    const score = store.d.done[id];
    main.innerHTML = `<header class="page-head"><div class="wrap">
      <div class="crumbs"><a href="#course">Course</a> › Stage ${L.stage.n}: ${esc(L.stage.title)}</div>
      <h1>${esc(L.num)} ${esc(L.title)}</h1>${L.kg ? `<div class="kgt">${esc(L.kg)}</div>` : ''}
      ${L.goals ? `<ul class="goals">${L.goals.map((g) => `<li>${esc(g)}</li>`).join('')}</ul>` : ''}
      <div class="meta-row"><span class="lvl" style="background:var(--gold);color:var(--indigo-ink)">${esc(L.stage.level)}</span><span style="color:#cfd6ee;font-size:.9rem">${L.minutes || 25} minutes</span>${score != null ? `<span class="pill ${score >= .8 ? 'ok' : ''}">${score >= .8 ? 'Completed' : 'Best'} · ${Math.round(score * 100)}%</span>` : ''}</div>
    </div></header>
    <div class="wrap lesson-grid">
      <aside class="toc"><h4>In this lesson</h4><ol>${sections.map((s) => `<li><a href="#lesson-${esc(id)}" data-jump="${s.id}">${esc(s.title.replace(/\[\[|\]\]/g, ''))}</a></li>`).join('')}<li><a href="#lesson-${esc(id)}" data-jump="practice">Practice test</a></li></ol>
      <p class="voice-note">Tap any <span class="kg" style="border-bottom:1.5px dotted">Kyrgyz word</span> to hear it.</p></aside>
      <article class="lesson-body">
        ${ARL[id] ? `<aside class="ar-logic"><div class="tag"><span class="badge" aria-hidden="true">ع</span>Arabic vs Kyrgyz</div><p>${arWrap(rich(ARL[id]))}</p></aside>` : ''}
        ${sections.map((s) => `<section id="${s.id}"><h2>${rich(esc(s.title))}</h2>${s.blocks.map((b) => (BLOCK[b.t] ? BLOCK[b.t](b) : '')).join('')}</section>`).join('')}
        <section id="practice"><h2>Practice test</h2><p>${(L.quiz || []).length} questions. Score 80% to complete the lesson.</p><div class="quiz"></div></section>
        <nav class="lesson-nav" aria-label="Lesson navigation">${prev ? `<a href="#lesson-${esc(prev.id)}"><small>Previous</small>${esc(prev.num)} ${esc(prev.title)}</a>` : ''}${next ? `<a class="next" href="#lesson-${esc(next.id)}"><small>Next</small>${esc(next.num)} ${esc(next.title)}</a>` : ''}</nav>
      </article></div>`;
    mountWidgets(main);
    const qel = $('.quiz', main);
    if (L.quiz && L.quiz.length) {
      const cb = (pct, wrong) => { const was = store.d.done[id] || 0; store.d.done[id] = Math.max(was, pct); store.addXP(was >= 0.8 ? 3 : 5 + pct * 20, 'lesson'); if (HOOKS.onQuizDone) HOOKS.onQuizDone(L, pct, wrong); };
      cb.nextHref = next ? '#lesson-' + next.id : '';
      mountQuiz(qel, L.quiz, cb);
    } else qel.innerHTML = '<p>No test for this lesson. <button class="btn btn-ink btn-sm" data-act="markdone" data-id="' + esc(id) + '">Mark as done</button></p>';
  }

  function alphabet() {
    const A = window.ALPHABET || [];
    const groups = [
      ['friend', 'Same as English', 'These look and sound almost exactly like English letters. Free points!'],
      ['trap', 'Look-alikes that lie', 'They look English, but they make a different sound. This is where everyone trips at first.'],
      ['new', 'New shapes, familiar sounds', 'You already know these sounds — they just wear new clothes.'],
      ['special', 'The Kyrgyz superstars', 'Four letters that make Kyrgyz sound like Kyrgyz. Three of them don’t exist in Russian.'],
      ['loan', 'Letters for borrowed words', 'Used almost only in words from Russian (like фильм, цирк). You can recognise them and move on.']
    ];
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>The alphabet</h1><div class="kgt">Алфавит · 36 тамга</div>
      <p>Kyrgyz uses the Cyrillic alphabet: the 33 Russian letters plus three of its own — Ң, Ө and Ү. Kyrgyz is spelled the way it sounds, so once you know the letters, you can read any word out loud. Tap a letter to hear its example word.</p></div></header>
      <div class="wrap" style="padding:40px 0 80px">
      ${groups.map((g) => `<section style="margin-bottom:36px"><h2>${esc(g[1])}</h2><p style="color:var(--muted)">${esc(g[2])}</p><div class="letters">${A.filter((x) => x.g === g[0]).map((x) => letterCard(x.l)).join('')}</div></section>`).join('')}
      <section class="cols-2"><div><h2>Long vowels</h2><p>A doubled vowel is simply held longer. It changes the meaning, so don’t rush it:</p>
        ${BLOCK.ex({ items: [['сат', 'sell!'], ['саат', 'hour, clock'], ['тоо', 'mountain'], ['суу', 'water'], ['төө', 'camel'], ['кечээ', 'yesterday']] })}</div>
        <div><h2>Reading drill</h2><p>Real words, random order. Say each one out loud before you check.</p><div data-widget="readdrill"></div></div></section>
      </div>`;
    mountWidgets(main);
  }

  /* ----------------------------- Machine ------------------------------- */
  const NOUN_EN = { 'китеп': 'book', 'үй': 'house', 'бала': 'child', 'ата': 'father', 'апа': 'mother', 'мектеп': 'school', 'шаар': 'city', 'дос': 'friend', 'тоо': 'mountain', 'көл': 'lake', 'кол': 'hand', 'ат': 'horse', 'ит': 'dog', 'кыз': 'girl', 'уул': 'son', 'суу': 'water', 'нан': 'bread', 'машина': 'car', 'иш': 'job', 'жол': 'road', 'бут': 'foot', 'көз': 'eye', 'тил': 'language', 'эл': 'people', 'жер': 'land', 'дүкөн': 'shop', 'бөлмө': 'room', 'эне': 'mother', 'студент': 'student', 'мугалим': 'teacher', 'Бишкек': 'Bishkek', 'кошуна': 'neighbour', 'аял': 'woman', 'адам': 'person', 'сөз': 'word', 'күн': 'day', 'ай': 'month', 'жыл': 'year', 'дарак': 'tree', 'гүл': 'flower', 'эшик': 'door', 'терезе': 'window', 'досум': 'my friend', 'кийим': 'clothing', 'ой': 'thought' };
  const VERB_EN = { 'бар': 'go', 'кел': 'come', 'оку': 'read / study', 'жаз': 'write', 'иште': 'work', 'көр': 'see', 'ич': 'drink', 'же': 'eat', 'ал': 'take', 'бер': 'give', 'сүйлө': 'speak', 'бил': 'know', 'түшүн': 'understand', 'ойно': 'play', 'тап': 'find', 'ук': 'hear', 'айт': 'say', 'сура': 'ask', 'жаша': 'live', 'укта': 'sleep', 'кет': 'leave', 'отур': 'sit', 'тур': 'stand / get up', 'ач': 'open', 'жап': 'close', 'үйрөн': 'learn', 'сат': 'sell', 'күт': 'wait', 'кара': 'look', 'жаса': 'make / do', 'чык': 'go out', 'кир': 'enter', 'жүр': 'walk', 'сүй': 'love', 'кой': 'put' };
  const PLURAL_EN = { child: 'children', person: 'people', foot: 'feet', woman: 'women', city: 'cities', 'my friend': 'my friends', people: 'peoples' };
  const POSS_EN = { '1sg': 'my', '2sg': 'your', '2sgp': 'your', '3': 'his/her', '1pl': 'our', '2pl': 'your', '2plp': 'your' };
  const CASE_EN = { nom: '', gen: 'of', dat: 'to', acc: '(the) … as object', loc: 'in/at', abl: 'from' };
  function enPhrase(w, o) {
    const base = NOUN_EN[w] || NOUN_EN[w.toLowerCase()] || `“${w}”`;
    let n = o.plural ? (PLURAL_EN[base] || (base.startsWith('“') ? base + 's' : base + 's')) : base;
    if (o.poss) n = POSS_EN[o.poss] + ' ' + n;
    if (o.case === 'acc') return n + ' (as the object: “I see ___”)';
    if (o.case && o.case !== 'nom') n = CASE_EN[o.case] + ' ' + n;
    return n;
  }

  function machine() {
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>Suffix machine</h1><div class="kgt">Мүчө машинасы</div>
      <p>Pick a word, choose the pieces, and the machine builds the Kyrgyz form — then tells you, step by step, why each letter is what it is. Type in Cyrillic or Latin letters.</p></div></header>
      <div class="wrap"><div class="seg" role="tablist" style="padding-top:28px">${[['nouns', 'Nouns'], ['verbs', 'Verbs'], ['tobe', '“To be”'], ['numbers', 'Numbers']].map((t, i) => `<button role="tab" data-tab="${t[0]}" aria-pressed="${i === 0}">${t[1]}</button>`).join('')}</div><div id="mach"></div></div>`;
    const mach = $('#mach');
    const tabs = { nouns: machNouns, verbs: machVerbs, tobe: machToBe, numbers: (el) => { el.innerHTML = '<div style="padding:28px 0 80px;max-width:640px"><div data-widget="numbers"></div></div>'; mountWidgets(el); } };
    main.addEventListener('click', (e) => { const t = e.target.closest('[data-tab]'); if (!t) return; $$('[data-tab]').forEach((b) => b.setAttribute('aria-pressed', String(b === t))); tabs[t.dataset.tab](mach); });
    machNouns(mach);
  }

  function segBtns(name, list, cur) { return `<div class="seg" data-seg="${name}">${list.map((x) => `<button data-v="${x[0]}" aria-pressed="${String(x[0] === cur)}">${esc(x[1])}</button>`).join('')}</div>`; }

  function machNouns(el) {
    const st = { w: 'китеп', plural: '', poss: '', case: 'abl' };
    el.innerHTML = `<div class="machine"><div class="panel">
      <div class="field"><label for="mw">Noun</label><input id="mw" type="text" value="${st.w}" autocomplete="off" spellcheck="false"><div class="preview"></div></div>
      <div class="seg" style="margin:-6px 0 16px">${['үй', 'бала', 'тоо', 'кол', 'көз', 'ит', 'уул', 'Бишкек'].map((w) => `<button data-pick="${w}">${w}</button>`).join('')}</div>
      <div class="field"><span class="lbl">More than one?</span>${segBtns('plural', [['', 'One'], ['1', 'Many (plural)']], st.plural)}</div>
      <div class="field"><span class="lbl">Whose?</span>${segBtns('poss', [['', 'nobody'], ['1sg', 'my'], ['2sg', 'your'], ['2sgp', 'your (polite)'], ['3', 'his/her'], ['1pl', 'our'], ['2pl', 'your (all)'], ['2plp', 'your (all, polite)']], st.poss)}</div>
      <div class="field"><span class="lbl">Role in the sentence (case)</span>${segBtns('case', [['nom', 'basic'], ['gen', 'of / ’s'], ['dat', 'to'], ['acc', 'object'], ['loc', 'in / at'], ['abl', 'from']], st.case)}</div>
      </div><div class="panel" aria-live="polite"><div class="res"></div></div></div>`;
    const inp = $('#mw', el), res = $('.res', el);
    const draw = () => {
      const raw = inp.value.trim();
      const w = hasCyr(raw) ? raw : KG.latinToCyr(raw);
      $('.preview', el).textContent = raw && !hasCyr(raw) ? 'Reads as: ' + w : '';
      if (!w) { res.innerHTML = '<p class="empty">Type a noun to begin.</p>'; return; }
      const o = { plural: !!st.plural, poss: st.poss || null, case: st.case };
      const r = KG.decline(w, o);
      const all = ['nom', 'gen', 'dat', 'acc', 'loc', 'abl'].map((c) => [c, KG.decline(w, Object.assign({}, o, { case: c }))]);
      res.innerHTML = `<div class="result-word">${kgSpan(r.parts.join('|'))} ${sayBtn(r.word)}</div>${tl(r.word)}
        <p style="font-size:1.15rem;margin-top:8px"><b>${esc(enPhrase(w, o))}</b></p>
        <ol class="steps"><li>Start with the stem: ${kgSpan(w)} — last vowel <b class="kg">${esc(KG.lastVowel(w))}</b> (${esc(KG.FAMILY_NAME[KG.lastVowel(w)])}).</li>${r.steps.map((s) => `<li>${s.add ? `Add ${kgSpan(s.add)}. ` : ''}${rich(s.why)}</li>`).join('')}</ol>
        <h3 style="margin-top:24px">All six cases with these settings</h3>
        <div class="tbl-wrap"><table class="conj"><tbody>${all.map(([c, x]) => `<tr><td>${KG.CASES[c].name} — <i>${esc(KG.CASES[c].q)}</i></td><td>${kgSpan(x.parts.join('|'))} ${sayBtn(x.word)}</td></tr>`).join('')}</tbody></table></div>
        <p class="voice-note">The machine follows the regular rules. A few words bend them: some drop a vowel (мурун → мурду “his nose”), and some short words don’t soften п/к. Lessons point these out.</p>`;
    };
    inp.addEventListener('input', draw);
    el.addEventListener('click', (e) => {
      const p = e.target.closest('[data-pick]'); if (p) { inp.value = p.dataset.pick; draw(); return; }
      const b = e.target.closest('[data-seg] [data-v]'); if (!b) return;
      const seg = b.parentElement.dataset.seg; st[seg] = b.dataset.v;
      $$('button', b.parentElement).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); draw();
    });
    draw();
  }

  function machVerbs(el) {
    const st = { v: 'бар', t: 'present' };
    el.innerHTML = `<div class="machine"><div class="panel">
      <div class="field"><label for="vw">Verb (the command form, e.g. бар, кел, оку, иште)</label><input id="vw" type="text" value="бар" autocomplete="off" spellcheck="false"><div class="preview"></div></div>
      <div class="seg" style="margin:-6px 0 16px">${['кел', 'оку', 'иште', 'көр', 'ич', 'жаз', 'сүйлө', 'тап'].map((w) => `<button data-pick="${w}">${w}</button>`).join('')}</div>
      <div class="field"><span class="lbl">Form</span>${segBtns('t', Object.keys(KG.TENSES).map((k) => [k, KG.TENSES[k].name]), st.t)}</div>
      </div><div class="panel" aria-live="polite"><div class="res"></div></div></div>`;
    const inp = $('#vw', el), res = $('.res', el);
    const draw = () => {
      const raw = inp.value.trim();
      const v = hasCyr(raw) ? raw.toLowerCase() : KG.latinToCyr(raw).toLowerCase();
      $('.preview', el).textContent = raw && !hasCyr(raw) ? 'Reads as: ' + v : '';
      if (!v) { res.innerHTML = '<p class="empty">Type a verb.</p>'; return; }
      const T = KG.TENSES[st.t];
      const c = KG.conjugate(v, st.t);
      const meaning = VERB_EN[v] ? `“${VERB_EN[v]}”` : '';
      const motion = ['бар', 'кел', 'кет', 'жүр', 'чык', 'кир'].includes(v) && st.t === 'progressive';
      res.innerHTML = `<h3>${kgSpan(v)} ${meaning} — ${esc(T.name)}</h3><p class="voice-note">Meaning pattern: ${esc(T.en)}. Example: ${rich(T.ex.replace(/^(\S+)/, '[[$1]]'))}</p>
        <div class="tbl-wrap"><table class="conj"><tbody>${c.rows.map((r) => `<tr><td><span class="kg">${esc(r.p)}</span> — ${esc(r.en)}</td><td>${kgSpan(r.form)} ${sayBtn((st.t === 'imperative' ? '' : r.p + ' ') + r.form)}<br>${tl(r.form)}</td></tr>`).join('')}</tbody></table></div>
        ${motion ? `<div class="tip"><div class="tag">Going and coming</div><p>With motion verbs Kyrgyz usually says “right now” with -а instead of -ып: ${kgSpan('бара жатам')} “I’m on my way”, ${kgSpan('келе жатам')} “I’m coming”.</p></div>` : ''}
        <p class="voice-note">Also useful: participle “who/which ${esc(VERB_EN[v] || v)}-ed” → ${kgSpan(KG.participle(v))}; linking form “having ${esc(VERB_EN[v] || v)}-ed, and then” → ${kgSpan(KG.converb(v))}.</p>`;
    };
    inp.addEventListener('input', draw);
    el.addEventListener('click', (e) => {
      const p = e.target.closest('[data-pick]'); if (p) { inp.value = p.dataset.pick; draw(); return; }
      const b = e.target.closest('[data-seg] [data-v]'); if (!b) return;
      st.t = b.dataset.v; $$('button', b.parentElement).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); draw();
    });
    draw();
  }

  function machToBe(el) {
    el.innerHTML = `<div class="machine"><div class="panel"><div class="field"><label for="bw">A noun or adjective</label><input id="bw" type="text" value="студент" autocomplete="off" spellcheck="false"><div class="preview"></div></div>
      <div class="seg">${['мугалим', 'жакшы', 'кыргыз', 'үйдө', 'чарчаган', 'бактылуу', 'дарыгер', 'америкалык'].map((w) => `<button data-pick="${w}">${w}</button>`).join('')}</div>
      <p class="voice-note" style="margin-top:16px">Kyrgyz has no separate word for “am / is / are”. The ending does the job — and “he/she/they” get no ending at all.</p></div>
      <div class="panel" aria-live="polite"><div class="res"></div></div></div>`;
    const inp = $('#bw', el), res = $('.res', el);
    const draw = () => {
      const raw = inp.value.trim();
      const w = hasCyr(raw) ? raw : KG.latinToCyr(raw);
      $('.preview', el).textContent = raw && !hasCyr(raw) ? 'Reads as: ' + w : '';
      if (!w) { res.innerHTML = '<p class="empty">Type a word.</p>'; return; }
      res.innerHTML = `<div class="tbl-wrap"><table class="conj"><thead><tr><th>Who</th><th>is</th><th>is not</th><th>is …?</th></tr></thead><tbody>${KG.PERSONS.map((p) => {
        const pos = KG.predicate(w, p), neg = 'эмес' === '' ? '' : w + ' ' + KG.predicate('эмес', p), q = KG.question(pos);
        return `<tr><td><span class="kg">${p}</span><br><span class="voice-note">${esc(KG.PERSON_EN[p])}</span></td><td>${kgSpan(p + ' ' + pos)} ${sayBtn(p + ' ' + pos)}</td><td>${kgSpan(p + ' ' + neg)}</td><td>${kgSpan(p + ' ' + q + '?')}</td></tr>`;
      }).join('')}</tbody></table></div>
      <p class="voice-note">“Not” for nouns and adjectives is ${kgSpan('эмес')}, and the person ending moves onto it. “They” can also take ${kgSpan('-лар')}: ${kgSpan('алар студенттер')}.</p>`;
    };
    inp.addEventListener('input', draw);
    el.addEventListener('click', (e) => { const p = e.target.closest('[data-pick]'); if (p) { inp.value = p.dataset.pick; draw(); } });
    draw();
  }

  /* ---------------------------- Flashcards ----------------------------- */
  const INTERVALS = [0, 1, 3, 7, 16, 35, 90]; // days per box
  function cards() {
    const all = allVocab();
    const scopeKey = 'done';
    let scope = sessionStorageGet('kg-scope') || scopeKey;
    let reverse = sessionStorageGet('kg-rev') === '1';
    const pool = () => all.filter((c) => scope === 'all' || (scope === 'done' ? (c.mine || isDone(c.lesson.id)) : String(c.lesson.stage.n) === scope));
    const now = Date.now();
    const due = () => pool().filter((c) => { const s = store.d.srs[c.k]; return !s || s.due <= Date.now(); });
    let queue = [], cur = null, flipped = false;
    const build = () => {
      const d = due();
      const fresh = d.filter((c) => !store.d.srs[c.k]).slice(0, 15);
      const old = d.filter((c) => store.d.srs[c.k]);
      queue = shuffle(old).concat(fresh);
    };
    const boxes = () => { const b = [0, 0, 0, 0, 0, 0, 0]; pool().forEach((c) => { const s = store.d.srs[c.k]; if (s) b[Math.min(s.box, 6)]++; }); return b; };
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>Flashcards</h1><div class="kgt">Карточкалар</div>
      <p>Each word comes back just before you’d forget it: after 1 day, then 3, 7, 16, 35 and 90. Say the answer out loud before you flip — recall is what builds memory, recognition doesn’t.</p></div></header>
      <div class="wrap"><div style="display:flex;flex-wrap:wrap;gap:16px;align-items:center;padding-top:26px">
        <div class="seg" data-scope>${[['done', 'Finished lessons + my words'], ['all', 'All words'], ['mine', 'My words']].concat(COURSE.stages.map((s) => [String(s.n), 'Stage ' + s.n])).map((x) => `<button data-v="${x[0]}" aria-pressed="${x[0] === scope}">${esc(x[1])}</button>`).join('')}</div>
        <div class="seg"><button data-rev aria-pressed="${reverse}">English first</button></div></div>
        <div class="deck"></div></div>`;
    const deck = $('.deck');
    const draw = () => {
      if (!cur) cur = queue.shift();
      if (!cur) {
        const p = pool();
        deck.innerHTML = `<div class="card"><div class="front en" style="font-size:1.5rem">${p.length ? 'All caught up.' : 'No words here yet.'}</div><p class="from">${p.length ? `Nothing due right now in this set of ${p.length} words. Come back tomorrow, or pick “All words”.` : 'Finish a lesson’s practice test and its words appear here. Or choose “All words”.'}</p></div>
          <div class="boxes">${boxes().map((n, i) => i ? `<span>Box ${i}: ${n}</span>` : '').join('')}</div>`;
        return;
      }
      const front = reverse ? `<div class="front en">${esc(cur.en)}</div>` : `<div class="front">${esc(cur.k)}</div>${tl(cur.k)}`;
      const back = (reverse ? `<div class="front" style="font-size:2.2rem">${esc(cur.k)}</div>${tl(cur.k)}` : `<div class="back">${esc(cur.en)}</div>`) + arHint(cur.k);
      deck.innerHTML = `<div class="card">${front}${flipped ? `<hr style="width:60%;border:0;border-top:1px dashed var(--line)">${back}` : ''}
        <div>${sayBtn(cur.k)}</div><p class="from">From ${esc(cur.lesson.num)} ${esc(cur.lesson.title)} · ${queue.length} more in this session</p></div>
        <div class="grade">${flipped ? `<button class="btn btn-line" data-g="0">Again</button><button class="btn btn-line" data-g="1">Hard</button><button class="btn btn-ink" data-g="2">Good</button><button class="btn btn-gold" data-g="3">Easy</button>` : '<button class="btn btn-ink" data-flip>Show answer</button>'}</div>
        <div class="boxes">${boxes().map((n, i) => i ? `<span>Box ${i}: ${n}</span>` : '').join('')}</div>`;
      if (!reverse && !flipped) say(cur.k);
    };
    main.addEventListener('click', (e) => {
      const sc = e.target.closest('[data-scope] [data-v]');
      if (sc) { scope = sc.dataset.v; sessionStorageSet('kg-scope', scope); $$('[data-scope] button').forEach((b) => b.setAttribute('aria-pressed', String(b === sc))); build(); cur = null; flipped = false; draw(); return; }
      const rv = e.target.closest('[data-rev]');
      if (rv) { reverse = !reverse; sessionStorageSet('kg-rev', reverse ? '1' : '0'); rv.setAttribute('aria-pressed', String(reverse)); flipped = false; draw(); return; }
      if (e.target.closest('[data-flip]')) { flipped = true; draw(); if (reverse) say(cur.k); return; }
      const g = e.target.closest('[data-g]');
      if (g && cur) {
        const s = store.d.srs[cur.k] || { box: 0, due: 0 };
        const grade = +g.dataset.g;
        if (grade === 0) { s.box = 1; s.due = Date.now() + 60e3; queue.splice(Math.min(3, queue.length), 0, cur); }
        else { s.box = Math.min(6, s.box + (grade === 1 ? 0 : grade === 2 ? 1 : 2)) || 1; s.due = Date.now() + INTERVALS[s.box] * 864e5 - 36e5; }
        s.t = Date.now(); store.d.srs[cur.k] = s; store.d.reviews++; store.addXP(1, 'review');
        cur = null; flipped = false; draw();
      }
    });
    document.onkeydown = (e) => {
      if (location.hash !== '#cards' || /input|textarea/i.test(document.activeElement.tagName)) return;
      if (e.key === ' ' && !flipped && cur) { e.preventDefault(); flipped = true; draw(); }
      else if (flipped && '1234'.includes(e.key)) { const b = $(`[data-g="${+e.key - 1}"]`); if (b) b.click(); }
    };
    build(); draw();
    void now;
  }
  function sessionStorageGet(k) { try { return sessionStorage.getItem(k); } catch (e) { return null; } }
  function sessionStorageSet(k, v) { try { sessionStorage.setItem(k, v); } catch (e) { /* ignore */ } }

  /* ----------------------------- Readers ------------------------------- */
  function readers() {
    const R = window.READERS || [];
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>Graded readers</h1><div class="kgt">Окуу китепканасы</div>
      <p>Short stories that grow with you. Read a sentence, guess the meaning, then tap it to check. Reading lots of easy text is the fastest road to understanding Kyrgyz at full speed.</p></div></header>
      <div class="wrap readers">${R.map((r) => `<a class="reader-card" href="#reader-${esc(r.id)}"><span class="lvl" style="align-self:flex-start">${esc(r.level)}</span><span class="kgt">${esc(r.kg)}</span><strong>${esc(r.title)}</strong><span class="voice-note">${esc(r.about)}</span></a>`).join('')}</div>`;
  }
  function reader(id) {
    const r = (window.READERS || []).find((x) => x.id === id);
    if (!r) return notFound();
    main.innerHTML = `<header class="page-head"><div class="narrow"><div class="crumbs"><a href="#readers">Readers</a> › ${esc(r.level)}</div><h1 class="kg" style="color:#fff;font-family:var(--f-kg)">${esc(r.kg)}</h1><p>${esc(r.title)} — ${esc(r.about)}</p>
      <div class="meta-row"><button class="chip-btn" data-act="show-en" aria-pressed="false">Show all English</button><button class="chip-btn" data-act="read-all">${'Read aloud'}</button></div></div></header>
      <div class="narrow story">${r.paras.map((p) => `<div class="para">${p.map((s) => `<span class="sent" tabindex="0" role="button" aria-label="Show translation">${kgSpan(s[0])}${tl(s[0])}<span class="en">${esc(s[1])}</span></span>`).join('')}</div>`).join('')}
      ${r.glossary ? `<h2>Words to know</h2><div class="glossary">${r.glossary.map((g) => `<div>${kgSpan(g[0])} — ${esc(g[1])}${arHint(g[0])}</div>`).join('')}</div>` : ''}
      ${r.quiz ? '<h2>Did you get it?</h2><div class="quiz"></div>' : ''}</div>`;
    if (r.quiz) { const cb = (pct) => { store.addXP(pct * 10, 'reader'); }; mountQuiz($('.quiz', main), r.quiz, cb); }
  }

  /* ---------------------------- Cheat sheet ---------------------------- */
  function cheatsheet() {
    const W = ['бала', 'үй', 'китеп', 'тоо', 'көл', 'ат'];
    const caseRows = ['nom', 'gen', 'dat', 'acc', 'loc', 'abl'].map((c) => [`<b>${KG.CASES[c].name}</b><br><span class="voice-note">${esc(KG.CASES[c].en)}</span>`].concat(W.map((w) => kgSpan(KG.decline(w, { case: c }).parts.join('|')))));
    const possRows = ['1sg', '2sg', '2sgp', '3', '1pl', '2pl', '2plp'].map((p) => [esc(KG.POSS_LABEL[p])].concat(W.map((w) => kgSpan(KG.decline(w, { poss: p }).parts.join('|')))));
    const verbs = ['бар', 'кел', 'оку', 'көр'];
    const tenseTable = (t) => ({ cols: ['', ...verbs.map((v) => `[[${v}]]`)], rows: KG.PERSONS.map((p, i) => [`<span class="kg">${p}</span>`].concat(verbs.map((v) => kgSpan(KG.conjugate(v, t).rows[i].form)))) });
    const T = (o) => BLOCK.table(o);
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>Cheat sheet</h1><div class="kgt">Шпаргалка</div><p>Every ending on one page, generated by the same engine as the suffix machine. Print it, or keep it open in a tab.</p></div></header>
    <div class="wrap cheat" style="padding:30px 0 80px">
      <h2>1. Vowel harmony — the one rule behind everything</h2>
      ${T({ cols: ['Last vowel in the word', 'Wide ending vowel (A)', 'Narrow ending vowel (I)', 'Example'], rows: [['а, ы', '[[а]]', '[[ы]]', '[[ат|тар]], [[кыз|ым]]'], ['у', '[[а]]', '[[у]]', '[[уул|дар]], [[уул|ум]]'], ['о', '[[о]]', '[[у]]', '[[кол|дор]], [[кол|ум]]'], ['е, и', '[[е]]', '[[и]]', '[[китеп|тер]], [[ит|им]]'], ['ө, ү', '[[ө]]', '[[ү]]', '[[көл|дөр]], [[үй|үм]]']] })}
      <h2>2. The first sound of an ending</h2>
      ${T({ cols: ['The word ends in…', 'Plural', 'Genitive / Accusative', 'Dative', 'Locative / Ablative / Past'], rows: [['a vowel', 'л — [[бала|лар]]*', 'н — [[бала|нын]]', 'г — [[бала|га]]', 'д — [[бала|да]]'], ['й, р', 'л — [[үй|лөр]]', 'д — [[үй|дүн]]', 'г — [[үй|гө]]', 'д — [[үй|дө]]'], ['other voiced (б в г д ж з л м н ң)', 'д — [[кол|дор]]', 'д — [[кол|дун]]', 'г — [[кол|го]]', 'д — [[кол|до]]'], ['voiceless (к п с т ф х ц ч ш щ)', 'т — [[ат|тар]]', 'т — [[ат|тын]]', 'к — [[ат|ка]]', 'т — [[ат|та]]']], caption: '* [[бала]] itself is irregular: [[балдар]]. Voiceless = whispery sounds you can make without your voice box buzzing.' })}
      <h2>3. The six cases</h2>${T({ cols: ['Case'].concat(W.map((w) => `[[${w}]]`)), rows: caseRows })}
      <h2>4. Possessive — “my, your, his…”</h2>${T({ cols: ['Whose'].concat(W.map((w) => `[[${w}]]`)), rows: possRows, caption: 'After “his/her” (-ы/-сы) cases get an extra н: [[ата|сы|нын]], [[ата|сы|на]], [[ата|сы|н]], [[ата|сы|нда]], [[ата|сы|нан]]. After “my/your” the dative is just a vowel: [[ата|м|а]], [[ата|ң|а]].' })}
      <h2>5. Personal pronouns in every case</h2>
      ${T({ cols: ['', 'I', 'you', 'you (pol.)', 'he/she', 'we', 'you all', 'they'], kg: [1, 2, 3, 4, 5, 6, 7], rows: [['basic', 'мен', 'сен', 'сиз', 'ал', 'биз', 'силер', 'алар'], ['of / ’s', 'менин', 'сенин', 'сиздин', 'анын', 'биздин', 'силердин', 'алардын'], ['to', 'мага', 'сага', 'сизге', 'ага', 'бизге', 'силерге', 'аларга'], ['object', 'мени', 'сени', 'сизди', 'аны', 'бизди', 'силерди', 'аларды'], ['at', 'менде', 'сенде', 'сизде', 'анда', 'бизде', 'силерде', 'аларда'], ['from', 'менден', 'сенден', 'сизден', 'андан', 'бизден', 'силерден', 'алардан']] })}
      <h2>6. “To be” endings</h2>${T({ cols: ['Who', 'Ending', '[[студент]]', '[[жакшы]]', 'Short past/condition'], rows: KG.PERSONS.map((p) => [`<span class="kg">${p}</span> — ${esc(KG.PERSON_EN[p])}`, { 'мен': '-мын', 'сен': '-сың', 'сиз': '-сыз', 'ал': '—', 'биз': '-быз / -пыз', 'силер': '-сыңар', 'сиздер': '-сыздар', 'алар': '— (-лар)' }[p], kgSpan(KG.predicate('студент', p)), kgSpan(KG.predicate('жакшы', p)), { 'мен': '-м', 'сен': '-ң', 'сиз': '-ңыз', 'ал': '—', 'биз': '-к', 'силер': '-ңар', 'сиздер': '-ңыздар', 'алар': '—' }[p]]) })}
      <h2>7. Verb tenses</h2>
      <h3>Present–future: I do / I will do</h3>${T(tenseTable('present'))}
      <h3>Present negative: I don’t / won’t</h3>${T(tenseTable('presentNeg'))}
      <h3>Past: I did</h3>${T(tenseTable('past'))}
      <h3>Conditional: if I do</h3>${T(tenseTable('cond'))}
      <h3>More verb patterns</h3>
      ${T({ cols: ['Pattern', 'Build', 'Example', 'Meaning'], rows: [
        ['right now', 'verb-ып + жат-', '[[оку|п жат|а|м]]', 'I’m reading'], ['want', 'verb-гы + my + келет', '[[бар|гы|м кел|е|т]]', 'I want to go'], ['can', 'verb-а + ал-', '[[сүйлө|й ал|а|м]]', 'I can speak'], ['must', 'verb-ыш + my + керек', '[[бар|ыш|ым керек]]', 'I have to go'],
        ['intend', 'verb-мак + чы + ending', '[[бар|мак|чы|мын]]', 'I’m planning to go'], ['used to', 'verb-чу + ending', '[[бар|чу|мун]]', 'I used to go'], ['have done (ever)', 'verb-ган + ending', '[[бар|ган|мын]]', 'I have been (there)'], ['apparently', 'verb-ып + тыр', '[[кел|ип|тир]]', 'apparently he came'],
        ['when', 'verb-ганда', '[[кел|ген|де]]', 'when (he) came'], ['after', 'verb-гандан кийин', '[[же|ген|ден кийин]]', 'after eating'], ['because', 'verb-гандыктан', '[[ооруган|дыктан]]', 'because (he) was ill'], ['until', 'verb-гыча', '[[кел|гиче]]', 'until (he) comes'],
        ['in order to', 'verb-уу үчүн', '[[үйрөн|үү үчүн]]', 'in order to learn'], ['if only', 'verb-са экен', '[[кел|се экен]]', 'if only (he) would come'], ['even if', 'verb-са да', '[[кел|се да]]', 'even if (he) comes'], ['said that', '… деп', '[[кел|ем деп айт|ты]]', 'he said he’d come']] })}
      <h2>8. Question words</h2>
      ${T({ cols: ['Kyrgyz', 'English', 'Kyrgyz', 'English'], kg: [0, 2], rows: [['ким', 'who', 'кайда', 'where (at / to)'], ['эмне', 'what', 'кайдан', 'from where'], ['качан', 'when', 'кандай', 'how / what kind'], ['эмнеге / эмне үчүн', 'why', 'кантип', 'how (in what way)'], ['канча', 'how much / many', 'кайсы', 'which'], ['нече', 'how many (counting)', 'кимдин', 'whose']] })}
      <h2>9. Little words that glue sentences</h2>
      ${T({ cols: ['Kyrgyz', 'English', 'Kyrgyz', 'English'], kg: [0, 2], rows: [['жана', 'and', 'бирок', 'but'], ['же', 'or', 'анткени', 'because'], ['ошондуктан', 'so, therefore', 'эгер', 'if'], ['менен', 'with', 'үчүн', 'for'], ['да / дагы', 'also, too', 'гана', 'only'], ['азыр', 'now', 'дагы эле', 'still'], ['эми', 'now (then)', 'эчак', 'long ago, already'], ['мурун', 'before', 'кийин', 'after']] })}
    </div>`;
  }

  /* ---------------------------- Study plan ----------------------------- */
  function plan() {
    main.innerHTML = rich(`<header class="page-head"><div class="wrap"><h1>Your study plan</h1><div class="kgt">Окуу планы</div><p>An honest plan from zero to B2, how many hours it takes, what to do each day, and how to practise speaking and listening — the parts a website can’t do for you.</p></div></header>
    <div class="wrap" style="padding:40px 0 80px"><div class="prose">
      <h2>How long does B2 take?</h2>
      <p>The US Foreign Service Institute puts Kyrgyz in its “hard” group for English speakers — about 1,100 classroom hours to professional level. B2 is a bit below that. Realistic totals, counting lessons, flashcards, reading and listening:</p>
      ${BLOCK.table({ cols: ['Level', 'What you can do', 'Total hours', 'At 1 hour a day'], rows: [['A1', 'Read Cyrillic. Introduce yourself, numbers, shopping, simple questions.', '~100', '3–4 months'], ['A2', 'Talk about your day, past and plans. Survive taxis, bazaars, cafés, doctors.', '~250', '7–9 months'], ['B1', 'Tell stories, explain opinions, follow slow TV and simple articles.', '~500', '14–16 months'], ['B2', 'Follow normal-speed speech, read news, argue a point, sound natural.', '~800', '2+ years']], caption: 'At 2 hours a day, roughly halve the times. Immersion in Kyrgyzstan halves them again.' })}
      <h2>The daily routine (45–60 minutes)</h2>
      <ol>
        <li><b>Flashcards, 10 min.</b> Clear what’s due. Say every answer out loud before flipping.</li>
        <li><b>New lesson, 20 min.</b> Read it, tap and repeat every example, then take the test. One lesson every 2–3 days is a good pace — don’t rush the grammar stages.</li>
        <li><b>Shadowing, 10 min.</b> Play a sentence, pause, copy it with the same rhythm. Do this with the lesson dialogues, then with real audio.</li>
        <li><b>Input, 10–20 min.</b> A graded reader, a Kyrgyz song with lyrics, or a YouTube video. Understanding 70% is perfect — don’t look up every word.</li>
      </ol>
      <h2>Week by week</h2>
      <div class="week"><h3>Weeks 1–2 · Stages 0–1</h3><p>The alphabet and sounds. Goal: read any Kyrgyz word aloud, slowly, without transliteration. Turn “Latin help” off at the end of week 2.</p></div>
      <div class="week"><h3>Weeks 3–8 · Stage 2</h3><p>Survival A1: greetings, “I am”, questions, numbers, plurals, “I have”. Start the first graded reader. Learn 10 new words a day.</p></div>
      <div class="week"><h3>Weeks 9–16 · Stage 3</h3><p>Real sentences: verbs, word order, the six cases. This is the heart of Kyrgyz — use the suffix machine every day.</p></div>
      <div class="week"><h3>Months 5–8 · Stage 4 (A2)</h3><p>Past tense, “right now”, commands, want/can/must, describing things, everyday situations. Find a conversation partner now (see below).</p></div>
      <div class="week"><h3>Months 9–14 · Stage 5 (B1)</h3><p>Participles, “if”, “said that”, helper verbs, voices. Switch your phone to Kyrgyz. Read the B1 readers and watch Kyrgyz YouTube with subtitles.</p></div>
      <div class="week"><h3>Months 15–24 · Stage 6 (B2)</h3><p>Word building, formal style, idioms, news. Most of your time now goes to real input: news, podcasts, films, conversations.</p></div>
      <h2>How to get fast at understanding</h2>
      <ul>
        <li><b>Read endings from right to left.</b> The last ending tells you the role (from, to, in), the one before it whose, the one before that how many. You’ll practise this in lesson 6.7.</li>
        <li><b>Wait for the verb.</b> In Kyrgyz the main idea comes last. Train yourself to hold the words in mind until the verb lands, instead of translating word by word.</li>
        <li><b>Learn chunks, not words.</b> [[Кандайсыз?]], [[Түшүнбөй жатам]], [[Бир аз]] — whole phrases come out faster than words you assemble.</li>
        <li><b>Listen to the same audio many times.</b> Ten listens to one clip beat one listen to ten clips.</li>
      </ul>
      <h2>Speaking: what this site can’t do for you</h2>
      <p>Speaking is a skill of the mouth, so you need a person. Options, from cheapest:</p>
      <ul>
        <li>Language exchange apps (Tandem, HelloTalk) — search for Kyrgyz speakers learning English.</li>
        <li>Online tutors on italki or Preply — search “Kyrgyz”. One 30-minute session a week from Stage 3 onward makes a huge difference.</li>
        <li>Kyrgyz communities in your city (students, cafés, restaurants). People are delighted when a foreigner tries [[Саламатсызбы!]]</li>
        <li>The <a href="https://learn.kg/">learn.kg</a> course, which has teacher-run speaking and native audio, pairs well with this one.</li>
        <li><i>Kyrgyz for Beginners</i> by Elvin Allazov (Turkicum series) — a compact 10-unit textbook with dialogues and audio at turkicum.com. It writes verbs in their long forms ([[барамын]], [[жатамын]]); this course uses the short spoken ones ([[барам]], [[жатам]]). Both are correct.</li>
      </ul>
      <h2>Real Kyrgyz to listen to and read</h2>
      <ul>
        <li><a href="https://www.azattyk.org">Azattyk (Азаттык)</a> — news in Kyrgyz with articles and video. B1–B2.</li>
        <li><a href="https://ktrk.kg">KTRK</a> — the national TV and radio broadcaster.</li>
        <li><a href="https://ky.wikipedia.org">Kyrgyz Wikipedia</a> — read articles on topics you already know.</li>
        <li><a href="https://forvo.com/languages/ky/">Forvo</a> — native speakers pronouncing single words.</li>
        <li><a href="https://en.wiktionary.org/wiki/Category:Kyrgyz_language">Wiktionary</a> — word meanings and full declension tables.</li>
      </ul>
    </div></div>`);
  }

  function arabic() {
    const vocab = allVocab();
    const clean = (x) => x.toLowerCase().replace(/[.,!?…]/g, '').trim();
    const findLesson = (k) => { const w = k.replace('=', ''); return vocab.find((v) => clean(v.k) === w) || vocab.find((v) => clean(v.k).split(/[\s-]+/).some((t) => k.endsWith('=') ? t === w : t.startsWith(w))); };
    const groups = {};
    Object.keys(AR).forEach((k) => { const e = AR[k]; if (e.hidden) return; (groups[e.group] = groups[e.group] || []).push([k, e]); });
    const rows = (list) => list.map(([k, e]) => {
      const word = k.replace('=', '');
      const L = findLesson(k);
      return [`${kgSpan(word)} ${sayBtn(word)}<br>${tl(word)}`, `<span class="ar-big" lang="ar" dir="rtl">${esc(e.ar)}</span><br><span class="voice-note">${esc(e.tr)} — ${esc(e.mean)}</span>`, `${L ? esc(L.en) : esc(e.mean)}${e.hint ? `<br><span class="voice-note">${esc(e.hint)}</span>` : ''}`, L ? `<a href="#lesson-${esc(L.lesson.id)}">${esc(L.lesson.num)}</a>` : '<span class="voice-note">extra</span>'];
    });
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>For Arabic speakers</h1><div class="kgt">Араб тилинен келген сөздөр · <span lang="ar" dir="rtl" style="font-family:var(--f-ar)">كلمات عربية في القيرغيزية</span></div>
      <p>Over centuries Arabic words travelled into Kyrgyz through Islam, Persian and trade. If you speak Arabic, hundreds of Kyrgyz words are already half-familiar — you just need to learn how they changed on the way.</p>
      <div class="meta-row"><button class="chip-btn" data-act="toggle-ar" aria-pressed="${!!store.d.ar}">Arabic hints in lessons</button></div></div></header>
    <div class="wrap" style="padding:36px 0 80px">
      <div class="prose">
        ${BLOCK.eli5({ html: 'Imagine an Arabic word going on a long camel trip to the mountains. On the way it loses the throat sounds Kyrgyz doesn’t have (ع ح), swaps ق and خ for a simple к, gets extra vowels so it’s easier to say, and finally puts on Kyrgyz “vowel harmony” clothes. وقت waqt arrives as [[убакыт]], عقل ʿaql as [[акыл]], دنيا dunyā as [[дүйнө]]. Learn the changes below and you’ll recognise words nobody taught you.' })}
        ${BLOCK.tip({ title: 'How the hints work', html: 'Press <b>Arabic hints</b> (top of the page, or the button above). Then, everywhere in the course: a green <span style="font-family:var(--f-ar)">ع</span> note under every word that came from Arabic, the Arabic sentence inside every English-vs-Kyrgyz example, and an “Arabic vs Kyrgyz” box at the top of each lesson explaining how the grammar logic differs.' })}
        <h2>How the two languages think</h2>
        <p>Arabic is Semitic and Kyrgyz is Turkic, so the grammar is built differently — but you’ll find more shared ideas than you expect. With <b>Arabic hints</b> on, every lesson also gets an “Arabic vs Kyrgyz” box, and every example box shows the Arabic sentence.</p>
      </div>
      ${BLOCK.table({ cols: ['Topic', 'Arabic', 'Kyrgyz', ''], rows: (window.ARABIC_MAP || []).map((r) => [`<b>${esc(r[0])}</b>`, arWrap(esc(r[1])), rich(r[2]), `<span class="verdict ${r[3]}">${{ same: 'Same idea', mirror: 'Mirror image', easier: 'Kyrgyz is simpler', different: 'Different' }[r[3]]}</span>`]) })}
      <div class="prose"><h2 style="margin-top:1.4em">How sounds changed</h2>
      </div>
      ${BLOCK.table({ cols: ['What happens', 'Examples'], rows: (window.ARABIC_RULES || []).map((r) => [esc(r[0]), r[1].replace(/([\u0600-\u06FF][\u0600-\u06FF\s]*[\u0600-\u06FF]|[\u0600-\u06FF])/g, '<span lang="ar" dir="rtl" style="font-family:var(--f-ar);font-weight:600">$1</span>')]) })}
      <h2 style="margin-top:1.4em">The words</h2>
      <p class="voice-note">“Lesson” shows where the word appears in this course. “Extra” words aren’t in the lessons yet but are common — a free head start.</p>
      ${Object.keys(groups).map((g) => `<h3 style="margin-top:1.6em">${esc(g)}</h3>` + BLOCK.table({ cols: ['Kyrgyz', 'Arabic', 'In Kyrgyz', 'Lesson'], rows: rows(groups[g]) })).join('')}
      <h2 style="margin-top:1.4em">False friends</h2>
      <p>Same roots, different jobs. These are the ones that trip Arabic speakers up:</p>
      ${BLOCK.table({ cols: ['Kyrgyz', 'Arabic', 'Watch out'], rows: (window.ARABIC_FALSE_FRIENDS || []).map((f) => [kgSpan(f[0]), `<span class="ar-big" lang="ar" dir="rtl">${esc(f[1])}</span>`, rich(f[2])]) })}
      <div class="prose">${BLOCK.warn({ title: 'Grammar is a different story', html: 'The words came from Arabic, but the grammar is pure Turkic: no roots-and-patterns, no gender, verb at the end, endings glued on. [[китеп]] (book) takes Kyrgyz endings — [[китеп|тер|им|де]] “in my books” — never an Arabic plural like كتب.' })}</div>
    </div>`;
  }

  function aboutAudio() {
    main.innerHTML = `<header class="page-head"><div class="wrap"><h1>About the audio</h1><p>How the “listen” buttons work, and how to get the best sound.</p></div></header>
    <div class="wrap prose" style="padding:40px 0 80px">
      <p>The site has no recorded audio: it uses your device’s built-in voices. Your device is using: <b>${esc(KG.speech.label())}</b>.</p>
      <ul><li><b>Kyrgyz voice</b> — best. Some Android and Windows devices have one; check your system’s text-to-speech languages.</li>
      <li><b>Kazakh voice</b> — very close. Kazakh and Kyrgyz share most sounds and letters, including Ө, Ү and Ң.</li>
      <li><b>Turkish voice</b> — the site rewrites the word in a Turkish-style spelling so the vowels Ө, Ү and Ы come out right. Good enough to practise.</li>
      <li><b>Russian voice</b> — last resort. Ө, Ү, Ң and Ж will sound wrong.</li></ul>
      <p>To add a voice: on Windows, Settings › Time & language › Speech › Add voices (try Kazakh or Turkish). On a Mac or iPhone, Settings › Accessibility › Spoken content › Voices. On Android, Settings › Text-to-speech › Google › Install voice data.</p>
      <p>For real native pronunciation of single words, use <a href="https://forvo.com/languages/ky/">Forvo</a>. For full sentences, shadow real speakers (see the <a href="#plan">study plan</a>).</p>
      <p>Speed: <button class="btn btn-line btn-sm" data-rate="0.65">Slow</button> <button class="btn btn-line btn-sm" data-rate="0.85">Normal</button> <button class="btn btn-line btn-sm" data-rate="1">Fast</button> <button class="btn btn-ink btn-sm" data-say="Саламатсызбы! Кыргыз тилин үйрөнүп жатасызбы?">Test: “Саламатсызбы!”</button></p>
    </div>`;
  }

  function notFound() { main.innerHTML = `<div class="narrow empty"><h1>Page not found</h1><p>That page doesn’t exist. <a href="#course">Go to the course</a>.</p></div>`; }

  /* ------------------------------ Speech -------------------------------- */
  let warned = false;
  function say(text) {
    if (!text) return;
    const ok = KG.speech.say(text);
    if (!ok && !warned) { warned = true; toast('No Kyrgyz-friendly voice on this device. Read the Latin help instead — or see “About the audio”.'); }
  }
  function toast(msg) {
    const n = document.querySelectorAll('.toast').length; const t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; t.style.bottom = (22 + n * 58) + 'px'; document.body.appendChild(t);
    setTimeout(() => t.remove(), 4200);
  }

  /* ------------------------------ Router -------------------------------- */
  const ROUTES = { home, '': home, course, alphabet, machine, cards, readers, cheatsheet, plan, arabic, 'about-audio': aboutAudio };
  const PREFIXES = [['lesson-', (x) => lesson(x)], ['reader-', (x) => reader(x)]];
  const TITLES = { home: 'Learn Kyrgyz from zero to B2', course: 'The course', alphabet: 'The alphabet', machine: 'Suffix machine', cards: 'Flashcards', readers: 'Readers', cheatsheet: 'Cheat sheet', plan: 'Study plan', arabic: 'For Arabic speakers' };
  const NAV_GROUPS = { course: ['course', 'lesson', 'placement', 'goals'], library: ['library', 'reader', 'text', 'readers', 'import'], review: ['review', 'cards', 'words', 'speak'], community: ['community', 'post', 'league'], tools: ['tools', 'alphabet', 'machine', 'cheatsheet', 'plan', 'arabic', 'about', 'cert', 'certificates'], account: ['account'] };
  function route() {
    const h = decodeURIComponent(location.hash.replace(/^#/, ''));
    document.onkeydown = null;
    const fresh = main.cloneNode(false); main.replaceWith(fresh); main = fresh; // drop old listeners
    document.body.classList.remove('wp-open');
    const pre = PREFIXES.slice().reverse().find((p) => h.startsWith(p[0]));
    if (ROUTES[h]) ROUTES[h]();
    else if (pre) pre[1](h.slice(pre[0].length));
    else notFound();
    const head = h.split('-')[0] || 'home';
    const group = Object.keys(NAV_GROUPS).find((g) => NAV_GROUPS[g].includes(head));
    $$('.nav a, .acct-btn').forEach((a) => a.setAttribute('aria-current', a.getAttribute('href') === '#' + group ? 'page' : 'false'));
    $('#nav').classList.remove('open');
    window.scrollTo(0, 0);
    const L = h.startsWith('lesson-') && byId(h.slice(7));
    document.title = 'Кыргызча — ' + (L ? L.num + ' ' + L.title : TITLES[h] || 'Learn Kyrgyz');
    if (HOOKS.afterRoute) HOOKS.afterRoute(h);
  }

  /* ---------------------------- Global events --------------------------- */
  document.addEventListener('click', (e) => {
    const s = e.target.closest('[data-say]');
    if (s && !e.target.closest('.opt') && !e.target.closest('.tile')) { e.preventDefault(); say(s.dataset.say); }
    const sent = e.target.closest('.sent');
    if (sent && !e.target.closest('.say-btn')) sent.classList.toggle('open');
    const j = e.target.closest('[data-jump]');
    if (j) { e.preventDefault(); const t = document.getElementById(j.dataset.jump); if (t) t.scrollIntoView({ behavior: 'smooth' }); }
    const a = e.target.closest('[data-act]'); if (!a) return;
    const act = a.dataset.act;
    if (act === 'menu') { const n = $('#nav'); n.classList.toggle('open'); a.setAttribute('aria-expanded', String(n.classList.contains('open'))); }
    if (act === 'toggle-tl') { store.d.tl = !store.d.tl; store.save(); applyTl(); }
    if (act === 'toggle-ar') { store.d.ar = !store.d.ar; store.save(); applyAr(); toast(store.d.ar ? 'Arabic hints on: look for the green ع under vocabulary and flashcards.' : 'Arabic hints off.'); }
    if (act === 'reset') { const btn = a; if (btn.dataset.sure) { store.d.done = {}; store.d.srs = {}; store.save(); route(); toast('Progress erased.'); } else { btn.dataset.sure = '1'; btn.textContent = 'Click again to confirm'; } }
    if (act === 'markdone') { store.d.done[a.dataset.id] = 1; store.save(); route(); }
    if (act === 'show-en') { const st = $('.story'); st.classList.toggle('show-en'); a.setAttribute('aria-pressed', String(st.classList.contains('show-en'))); }
    if (act === 'read-all') { const txt = $$('.story .sent .kg').map((x) => x.dataset.say).join(' '); say(txt); }
  });
  document.addEventListener('click', (e) => { const r = e.target.closest('[data-rate]'); if (r) { KG.speech.rate = +r.dataset.rate; toast('Speech speed set.'); } });
  document.addEventListener('keydown', (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList && e.target.classList.contains('sent')) { e.preventDefault(); e.target.classList.toggle('open'); } });
  function applyAr() { document.body.classList.toggle('show-ar', !!store.d.ar); $$('[data-act="toggle-ar"]').forEach((b) => b.setAttribute('aria-pressed', String(!!store.d.ar))); }
  function applyTl() { document.body.classList.toggle('no-tl', !store.d.tl); const b = $('[data-act="toggle-tl"]'); if (b) b.setAttribute('aria-pressed', String(store.d.tl)); }
  document.addEventListener('kg-voice', () => document.body.classList.toggle('no-voice', !KG.speech.available()));

  /* ------------------------------ Plugins ------------------------------- */
  // Feature modules (cloud sync, LingQ-style reader, Busuu-style learning) register here.
  const API = {
    store, $, $$, esc, rich, chips, plain, kgSpan, sayBtn, tl, arHint, arWrap, BLOCK, mountQuiz, keyboard, shuffle, hasCyr,
    COURSE, LESSONS, byId, isDone, allVocab, nextLesson, stageProgress, toast, say, route, ROUTES, PREFIXES, TITLES, HOOKS,
    main: () => main, ICON_SAY, applyTl, applyAr, NAV_GROUPS
  };
  window.APP = API;
  (window.KG_PLUGINS || []).forEach((fn) => { try { fn(API); } catch (e) { console.error('Plugin failed', e); } });

  window.addEventListener('hashchange', route);
  KG.speech.init();
  applyTl();
  applyAr();
  route();
  if (HOOKS.boot) HOOKS.boot();
})();
