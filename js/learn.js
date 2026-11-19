/* ==========================================================================
   Learning layer (Busuu-style)
   Today dashboard · study plan & daily goal · placement test · smart review ·
   mistakes · my words · speaking practice · community writing corrections ·
   weekly league · level tests & certificates · tools hub
   ========================================================================== */
(window.KG_PLUGINS = window.KG_PLUGINS || []).push(function (A) {
  'use strict';
  const { store, $, $$, esc, rich, kgSpan, sayBtn, tl, toast, shuffle } = A;
  const KG = window.KG;
  const INTERVALS = [0, 1, 3, 7, 16, 35, 90];
  const cleanEn = (s) => String(s || '').replace(/\[\[|\]\]/g, '').replace(/<[^>]+>/g, '').trim();
  const signed = () => A.cloud && A.cloud.user;
  const page = (title, kgt, lede, crumbs) => `<header class="page-head"><div class="wrap">${crumbs ? `<div class="crumbs">${crumbs}</div>` : ''}<h1>${esc(title)}</h1>${kgt ? `<div class="kgt">${esc(kgt)}</div>` : ''}${lede ? `<p>${lede}</p>` : ''}</div></header>`;
  ['goals', 'placement', 'smart', 'mistakes', 'words', 'speak', 'community', 'post', 'league', 'tools', 'certificates', 'cert', 'certtest'].forEach((k) => {
    const g = { goals: 'course', placement: 'course', smart: 'review', mistakes: 'review', words: 'review', speak: 'review', community: 'community', post: 'community', league: 'community', tools: 'tools', certificates: 'tools', cert: 'tools', certtest: 'tools' }[k];
    if (!A.NAV_GROUPS[g].includes(k)) A.NAV_GROUPS[g].push(k);
  });

  /* ------------------------------ Shared data ----------------------------- */
  const dayKey = (d) => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  const goalXP = () => ((store.d.plan && store.d.plan.minutes) || 20) * 2;
  const todayXP = () => store.d.xp[store.today()] || 0;
  function week() {
    const out = [], now = new Date();
    const monday = new Date(now); monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    for (let i = 0; i < 7; i++) { const d = new Date(monday); d.setDate(monday.getDate() + i); out.push({ d, k: dayKey(d), xp: store.d.xp[dayKey(d)] || 0, future: d > now }); }
    return out;
  }
  function deck() {
    const now = Date.now(), all = A.allVocab().filter((v) => !v.k.includes('…'));
    const srs = store.d.srs || {};
    const due = all.filter((v) => srs[v.k] && srs[v.k].due <= now).sort((a, b) => srs[a.k].box - srs[b.k].box);
    const fresh = all.filter((v) => !srs[v.k] && (v.mine || A.isDone(v.lesson.id)));
    const strength = { weak: 0, medium: 0, strong: 0 };
    all.forEach((v) => { const s = srs[v.k]; if (!s) return; if (s.box <= 2) strength.weak++; else if (s.box <= 4) strength.medium++; else strength.strong++; });
    return { all, due, fresh, strength };
  }
  function grade(k, ok) {
    const s = store.d.srs[k] || { box: 0, due: 0 };
    if (ok) { s.box = Math.min(6, (s.box || 0) + 1); s.due = Date.now() + INTERVALS[s.box] * 864e5 - 36e5; }
    else { s.box = 1; s.due = Date.now() + 10 * 60e3; }
    s.t = Date.now(); store.d.srs[k] = s;
  }
  A.HOOKS.onQuizDone = (L, pct, wrong) => {
    const m = store.d.mistakes || (store.d.mistakes = []);
    (wrong || []).forEach((q) => { if (!m.some((x) => x.q === q.q)) m.unshift(Object.assign({ from: L.id }, q)); });
    store.d.mistakes = m.slice(0, 200); store.save();
  };

  /* ------------------------------- Dashboard ------------------------------ */
  A.HOOKS.dashboard = function () {
    const started = Object.keys(store.d.done).length || Object.keys(store.d.xp).length || signed();
    if (!started) return null;
    const nx = A.nextLesson(), dk = deck(), ws = A.wordStats ? A.wordStats() : { known: 0 };
    const g = goalXP(), t = todayXP(), pct = Math.min(1, t / g);
    const wk = week(), maxXP = Math.max(g, ...wk.map((d) => d.xp));
    const plan = store.d.plan, pl = planInfo();
    const name = signed() ? A.cloud.user.name : '';
    const R = 34, C = 2 * Math.PI * R;
    const html = `<section class="dash"><div class="wrap">
      <div class="dash-head"><div><h1>${name ? 'Салам, ' + esc(name) + '!' : 'Салам!'}</h1><p>${t >= g ? 'Daily goal done. Anything extra is a bonus.' : `${g - t} XP to reach today’s goal.`}</p></div>
        ${A.cloud && A.cloud.available && !signed() ? '<a class="btn btn-ghost btn-sm" href="#account">Sign in to sync</a>' : ''}</div>
      <div class="dash-grid">
        <div class="dcard goal"><svg viewBox="0 0 80 80" width="96" height="96" aria-hidden="true"><circle cx="40" cy="40" r="${R}" fill="none" stroke="rgba(255,255,255,.15)" stroke-width="9"/><circle cx="40" cy="40" r="${R}" fill="none" stroke="#f2b01e" stroke-width="9" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - pct)}" transform="rotate(-90 40 40)"/></svg>
          <div><b>${t} / ${g} XP</b><span>today</span><b>🔥 ${store.d.streak.count || 0}</b><span>day streak</span></div></div>
        <a class="dcard next" href="#lesson-${esc(nx.id)}"><span class="lab">Continue the course</span><b>${esc(nx.num)} ${esc(nx.title)}</b><span class="kg">${esc(nx.kg || '')}</span><span class="go">Start lesson</span></a>
        <a class="dcard" href="#smart"><span class="lab">Smart review</span><b>${dk.due.length} due</b><span>${dk.fresh.length} new words waiting · ${dk.strength.weak} weak</span><span class="go">Review now</span></a>
        <a class="dcard" href="#library"><span class="lab">Library</span><b>${ws.known.toLocaleString()} known words</b><span>Read something new today</span><span class="go">Open library</span></a>
      </div>
      <div class="dash-grid three">
        ${A.dropsPlan ? (() => { const q = A.dropsPlan(); return `<a class="dcard drops-card" href="#drops"><span class="lab">Word drops</span><b>${q.due ? q.due + ' to refresh' : esc(q.t.icon) + ' ' + esc(q.t.name)}</b><span>${q.due ? 'Then new picture words' : q.fresh + ' new picture words'}</span><span class="go">Play 5 minutes</span></a>`; })() : ''}
        <div class="dcard light"><span class="lab">This week</span><div class="wbars">${wk.map((d) => `<div class="wb ${d.future ? 'fut' : ''} ${d.xp >= g ? 'met' : ''}"><i style="height:${Math.max(4, (d.xp / maxXP) * 100)}%"></i><span>${d.d.toLocaleDateString('en', { weekday: 'narrow' })}</span></div>`).join('')}</div>
          <span class="voice-note">${wk.filter((d) => d.xp >= g).length} of ${(plan && plan.days) || 5} goal days this week</span></div>
        <div class="dcard light"><span class="lab">Your plan</span>${plan ? `<b>Reach ${esc(plan.level)} by ${esc(pl.finish)}</b><div class="bar"><i style="width:${pl.pct}%"></i></div><span class="voice-note">${pl.done} of ${pl.total} lessons · ${plan.minutes} min a day, ${plan.days} days a week</span><a href="#goals">Change plan</a>`
          : `<b>Set a goal</b><span class="voice-note">Pick a level and how much time you have — we’ll plan the weeks for you.</span><a class="btn btn-ink btn-sm" href="#goals">Set my goal</a>`}
          ${!store.d.placement && Object.keys(store.d.done).length < 3 ? '<span class="voice-note" style="margin-top:8px">Know some Kyrgyz already? <a href="#placement">Take the placement test</a></span>' : ''}</div>
      </div>
      <div class="dash-extra"></div>
    </div></section>`;
    return { html, mount: async (main) => {
      if (!signed()) return;
      const box = $('.dash-extra', main);
      try {
        const [mine, lb] = await Promise.all([A.cloud.api('/api/community?a=mine'), A.cloud.api('/api/leaderboard')]);
        if (A.main() !== main) return;
        const meRow = lb.rows.find((r) => r.me);
        box.innerHTML = `<div class="dash-grid two">${mine.unread ? `<a class="dcard light" href="#community"><span class="lab">Community</span><b>${mine.unread} new correction${mine.unread > 1 ? 's' : ''}</b><span>Someone corrected your writing</span><span class="go">See corrections</span></a>` : `<a class="dcard light" href="#community"><span class="lab">Community</span><b>Write something today</b><span>Get corrections from other learners and native speakers</span><span class="go">Open community</span></a>`}
          <a class="dcard light" href="#league"><span class="lab">Weekly league</span><b>${meRow ? '#' + meRow.rank + ' · ' + meRow.xp + ' XP' : 'Not ranked yet'}</b><span>${lb.rows.slice(0, 3).map((r) => esc(r.name) + ' ' + r.xp).join(' · ') || 'Be the first this week'}</span><span class="go">See the league</span></a></div>`;
      } catch (e) { /* offline */ }
    } };
  };

  /* ------------------------------- Study plan ----------------------------- */
  const LEVEL_STAGE = { A1: 2, 'A1+': 3, A2: 4, B1: 5, B2: 6 };
  function planInfo() {
    const p = store.d.plan; if (!p) return {};
    const target = LEVEL_STAGE[p.level] || 6;
    const ls = A.LESSONS.filter((l) => l.stage.n <= target);
    const left = ls.filter((l) => !A.isDone(l.id));
    const mins = left.reduce((a, l) => a + (l.minutes || 30) * 1.6, 0); // lesson + practice + review
    const perWeek = p.minutes * p.days;
    const weeks = perWeek ? mins / perWeek : 0;
    const finish = new Date(Date.now() + weeks * 7 * 864e5);
    return { total: ls.length, done: ls.length - left.length, pct: Math.round(((ls.length - left.length) / ls.length) * 100), weeks: Math.ceil(weeks), finish: finish.toLocaleDateString('en', { month: 'long', year: 'numeric' }) };
  }
  A.ROUTES.goals = function goals() {
    const main = A.main();
    const p = Object.assign({ level: 'A2', minutes: 20, days: 5 }, store.d.plan || {});
    main.innerHTML = page('Your study plan', 'Максат', 'Choose a goal and how much time you have. You’ll get a daily XP target and a finish date that updates as you go.') + `<div class="narrow" style="padding:30px 0 80px"><div class="panel">
      <div class="field"><span class="lbl">I want to reach</span><div class="seg" data-g="level">${Object.keys(LEVEL_STAGE).map((l) => `<button data-v="${l}" aria-pressed="${l === p.level}">${l}</button>`).join('')}</div></div>
      <div class="field"><span class="lbl">Minutes a day</span><div class="seg" data-g="minutes">${[10, 20, 30, 45, 60].map((m) => `<button data-v="${m}" aria-pressed="${m === p.minutes}">${m} min</button>`).join('')}</div></div>
      <div class="field"><span class="lbl">Days a week</span><div class="seg" data-g="days">${[3, 4, 5, 6, 7].map((d) => `<button data-v="${d}" aria-pressed="${d === p.days}">${d} days</button>`).join('')}</div></div>
      <div class="plan-out"></div><div class="quiz-actions"><button class="btn btn-gold" data-save>Save my plan</button></div></div>
      ${A.BLOCK.tip({ title: 'What the levels mean', html: '<b>A1</b>: read Cyrillic, introduce yourself, shop. <b>A2</b>: talk about your day, past and plans. <b>B1</b>: tell stories, give opinions, follow slow TV. <b>B2</b>: follow normal speech and the news. Times assume you also review and read a little each day.' })}</div>`;
    const draw = () => {
      const keep = store.d.plan; store.d.plan = p; const pl = planInfo(); store.d.plan = keep;
      $('.plan-out', main).innerHTML = `<p style="font-size:1.1rem">At <b>${p.minutes} minutes a day, ${p.days} days a week</b>, you’ll finish the ${esc(p.level)} part of the course around <b>${esc(pl.finish)}</b> (${pl.weeks} weeks). Daily goal: <b>${p.minutes * 2} XP</b>.</p><p class="voice-note">${pl.done} of ${pl.total} lessons already done.</p>`;
    };
    main.addEventListener('click', (e) => {
      const b = e.target.closest('[data-g] [data-v]');
      if (b) { const g = b.parentElement.dataset.g; p[g] = g === 'level' ? b.dataset.v : Number(b.dataset.v); $$('button', b.parentElement).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); draw(); }
      if (e.target.closest('[data-save]')) { store.d.plan = Object.assign({ start: Date.now() }, p); store.save(); toast('Plan saved. Your daily goal is ' + p.minutes * 2 + ' XP.'); location.hash = '#home'; }
    });
    draw();
  };
  A.TITLES.goals = 'Study plan';

  /* ------------------------------ Placement ------------------------------- */
  A.ROUTES.placement = function placement() {
    const main = A.main();
    main.innerHTML = page('Placement test', 'Деңгээлди аныктоо', 'About 5–10 minutes. Questions get harder stage by stage; the test stops when it finds your level. Don’t guess wildly — “I don’t know” is a fine answer.') + '<div class="narrow" style="padding:30px 0 80px"><div class="quiz pt"></div></div>';
    const box = $('.pt', main);
    const pools = {};
    A.COURSE.stages.filter((s) => s.n >= 1).forEach((s) => { pools[s.n] = shuffle(s.lessons.flatMap((l) => l.quiz.filter((q) => q.t === 'mc'))).slice(0, 4); });
    let stage = 1, i = 0, right = 0, total = 0;
    const show = () => {
      const q = pools[stage][i];
      box.innerHTML = `<div class="quiz-top"><span class="count">Stage ${stage} of 6 · question ${i + 1} of 4</span><div class="bar" style="flex:1;max-width:240px"><i style="width:${((stage - 1) * 4 + i) / 24 * 100}%"></i></div></div>
        <div class="q">${rich(q.q)}</div><div class="opts">${shuffle(q.o.map((o, k) => ({ o, k }))).map((x) => `<button class="opt" data-k="${x.k}">${rich(x.o)}</button>`).join('')}<button class="opt idk" data-k="-1">I don’t know</button></div>`;
    };
    const finish = (start) => {
      store.d.placement = { stage: start, date: Date.now() }; store.save();
      const st = A.COURSE.stages.find((s) => s.n === start) || A.COURSE.stages[1];
      box.innerHTML = `<div style="text-align:center"><div class="score-big">Stage ${start}</div><p style="font-size:1.1rem">Start with <b>${esc(st.title)}</b> (${esc(st.level)}). You answered ${right} of ${total} correctly.</p>
        ${start > 1 ? `<p class="voice-note">We can mark the earlier ${A.LESSONS.filter((l) => l.stage.n < start && l.stage.n > 0).length} lessons as completed so their words join your review deck.</p><div class="quiz-actions" style="justify-content:center"><button class="btn btn-gold" data-skip="${start}">Mark earlier stages done & start</button><a class="btn btn-line" href="#lesson-${esc(st.lessons[0].id)}">Just start there</a></div>` : `<div class="quiz-actions" style="justify-content:center"><a class="btn btn-gold" href="#lesson-${esc(A.LESSONS[0].id)}">Start from the beginning</a></div>`}</div>`;
    };
    box.addEventListener('click', (e) => {
      const sk = e.target.closest('[data-skip]');
      if (sk) { const n = Number(sk.dataset.skip); A.LESSONS.forEach((l) => { if (l.stage.n < n) store.d.done[l.id] = Math.max(store.d.done[l.id] || 0, 0.8); }); store.save(); location.hash = '#lesson-' + A.COURSE.stages.find((s) => s.n === n).lessons[0].id; return; }
      const o = e.target.closest('.opt'); if (!o || o.disabled) return;
      total++; if (o.dataset.k === '0') right++;
      $$('.opt', box).forEach((b) => { b.disabled = true; if (b.dataset.k === '0') b.classList.add('right'); });
      if (o.dataset.k !== '0') o.classList.add('wrong');
      setTimeout(() => {
        i++;
        if (i < 4) return show();
        const stageRight = right - (pools.__prev || 0); pools.__prev = right;
        if (stageRight >= 3 && stage < 6) { stage++; i = 0; return show(); }
        finish(stageRight >= 3 ? 6 : stage);
      }, 700);
    });
    show();
  };
  A.TITLES.placement = 'Placement test';
  A.HOOKS.courseTop = () => `<div class="course-top">${!store.d.placement && Object.keys(store.d.done).length < 3 ? '<a class="ct" href="#placement"><b>Know some Kyrgyz already?</b><span>Take the 5-minute placement test</span></a>' : ''}<a class="ct" href="#goals"><b>${store.d.plan ? 'Your goal: ' + esc(store.d.plan.level) : 'Set a goal'}</b><span>${store.d.plan ? 'Finish around ' + esc(planInfo().finish) : 'Get a daily target and a finish date'}</span></a><a class="ct" href="#certificates"><b>Level tests</b><span>Earn a certificate for A1, A2, B1 and B2</span></a></div>`;

  /* --------------------------------- Review ------------------------------- */
  A.ROUTES.review = function review() {
    const main = A.main(), dk = deck(), m = (store.d.mistakes || []).length;
    main.innerHTML = page('Review', 'Кайталоо', 'Little and often beats long and rare. Words come back just before you’d forget them.') + `<div class="wrap" style="padding:30px 0 80px">
      <div class="lib-stats"><div><b>${dk.due.length}</b>due now</div><div><b>${dk.strength.weak}</b>weak words</div><div><b>${dk.strength.medium}</b>medium</div><div><b>${dk.strength.strong}</b>strong</div><div><b>${m}</b>mistakes to fix</div></div>
      <div class="tools" style="margin-top:22px">
        <a class="tool big" href="#smart"><span class="glyph">↻</span><h3>Smart review</h3><p>${dk.due.length || dk.fresh.length ? `About 5 minutes. ${dk.due.length} due words, then new ones from your lessons and library.` : dk.strength.weak + dk.strength.medium + dk.strength.strong ? 'All caught up. Your words come back here when they’re due.' : 'Finish a lesson, play a word drop or mark words in the library — then your review fills up.'}</p></a>
        <a class="tool tool-drops" href="#drops"><span class="glyph">💧</span><h3>Word drops</h3><p>Five-minute picture sessions. ${A.dropsPlan ? (A.dropsPlan().due ? A.dropsPlan().due + ' words to refresh.' : 'Next topic: ' + esc(A.dropsPlan().t.name) + '.') : ''}</p></a>
        <a class="tool" href="#mistakes"><span class="glyph">✗→✓</span><h3>Fix my mistakes</h3><p>${m ? m + ' questions you got wrong in lessons.' : 'Nothing yet — mistakes from lesson tests land here.'}</p></a>
        <a class="tool" href="#cards"><span class="glyph">▭</span><h3>Flashcards</h3><p>Classic flip cards with Again / Hard / Good / Easy.</p></a>
        <a class="tool" href="#speak"><span class="glyph">🎙</span><h3>Speaking practice</h3><p>Listen, record yourself, compare.</p></a>
        <a class="tool" href="#words"><span class="glyph">Aа</span><h3>My words</h3><p>Every word you’ve met, with its strength.</p></a>
      </div></div>`;
  };
  A.TITLES.review = 'Review';

  function sessionQs(items) {
    const pool = deck().all;
    const opts = (v, field) => shuffle([v].concat(shuffle(pool.filter((x) => x.k !== v.k && cleanEn(x.en) !== cleanEn(v.en))).slice(0, 3)));
    return items.map((v) => {
      const typable = !/[\/…()]/.test(v.k) && v.k.split(/\s+/).length <= 3;
      const en = cleanEn(v.en), types = ['mean', 'rev'].concat(typable ? ['type'] : [], KG.speech.available() ? ['listen'] : []);
      const t = types[Math.floor(Math.random() * types.length)];
      if (t === 'mean') { const o = opts(v); return { t: 'mc', q: `What does [[${v.k}]] mean?`, say: v.k, o: [en].concat(o.filter((x) => x !== v).map((x) => cleanEn(x.en))), why: v.ctx ? 'Seen in: [[' + v.ctx + ']]' : '', _k: v.k }; }
      if (t === 'rev') { const o = opts(v); return { t: 'mc', q: `Which word means “${esc(en)}”?`, o: [`[[${v.k}]]`].concat(o.filter((x) => x !== v).map((x) => `[[${x.k}]]`)), _k: v.k }; }
      if (t === 'listen') { const o = opts(v); return { t: 'mc', q: 'Listen and choose the word you hear.', say: v.k, o: [`[[${v.k}]]`].concat(o.filter((x) => x !== v).map((x) => `[[${x.k}]]`)), why: `[[${v.k}]] — ${esc(en)}`, _k: v.k }; }
      return { t: 'type', q: `Type in Kyrgyz: “${esc(en)}”`, a: [v.k.replace(/[.!?]$/, '')], _k: v.k };
    });
  }
  A.ROUTES.smart = function smart() {
    const main = A.main(), dk = deck();
    let items = dk.due.slice(0, 10).concat(shuffle(dk.fresh).slice(0, Math.max(0, 12 - Math.min(10, dk.due.length))));
    if (items.length < 4) items = items.concat(shuffle(dk.all.filter((v) => v.lesson.stage && v.lesson.stage.n === 2)).slice(0, 8 - items.length));
    main.innerHTML = page('Smart review', '', `${items.length} words · type, choose and listen. Correct answers push a word further into the future.`, '<a href="#review">Review</a>') + '<div class="narrow" style="padding:30px 0 80px"><div class="quiz"></div></div>';
    const cb = () => { store.save(); };
    cb.onAnswer = (q, ok) => { grade(q._k, ok); if (ok) store.addXP(2, 'review'); else store.save(); };
    cb.passText = 'Session complete. See you at the next review!'; cb.failText = 'Session complete. The tricky words will come back soon.';
    A.mountQuiz($('.quiz', main), sessionQs(shuffle(items)), cb);
  };
  A.TITLES.smart = 'Smart review';

  A.ROUTES.mistakes = function mistakes() {
    const main = A.main(), list = (store.d.mistakes || []).slice(0, 15);
    main.innerHTML = page('Fix my mistakes', '', 'Questions you got wrong in lesson tests. Get one right and it leaves this list.', '<a href="#review">Review</a>') + `<div class="narrow" style="padding:30px 0 80px">${list.length ? '<div class="quiz"></div>' : '<div class="empty panel"><p>No mistakes saved. Take a lesson test and come back.</p><a class="btn btn-ink btn-sm" href="#course">Go to the course</a></div>'}</div>`;
    if (!list.length) return;
    const cb = () => {}; cb.onAnswer = (q, ok) => { if (ok) { store.d.mistakes = store.d.mistakes.filter((x) => x.q !== q.q); store.addXP(3, 'mistakes'); } };
    cb.passText = 'Nice — those mistakes are fixed.'; cb.failText = 'Some are still tricky. They’ll stay here until you get them right.';
    A.mountQuiz($('.quiz', main), list, cb);
  };
  A.TITLES.mistakes = 'Fix my mistakes';

  A.ROUTES.words = function words() {
    const main = A.main(), srs = store.d.srs || {};
    const all = deck().all.filter((v) => srs[v.k] || v.mine);
    let filter = 'all', q = '';
    main.innerHTML = page('My words', 'Менин сөздөрүм', `${all.length} words you’ve practised or saved. Weak words come up most often in review.`, '<a href="#review">Review</a>') + `<div class="wrap" style="padding:30px 0 80px"><div style="display:flex;flex-wrap:wrap;gap:12px;align-items:center">
      <div class="seg" data-f>${[['all', 'All'], ['weak', 'Weak'], ['medium', 'Medium'], ['strong', 'Strong'], ['mine', 'From my reading']].map((x, i) => `<button data-v="${x[0]}" aria-pressed="${i === 0}">${x[1]}</button>`).join('')}</div>
      <input class="search" type="search" placeholder="Search a word" aria-label="Search words"></div><ul class="vocab wordlist" style="margin-top:16px"></ul></div>`;
    const draw = () => {
      const rows = all.filter((v) => {
        const b = srs[v.k] ? srs[v.k].box : 0;
        if (filter === 'weak' && !(b <= 2)) return false; if (filter === 'medium' && !(b >= 3 && b <= 4)) return false; if (filter === 'strong' && !(b >= 5)) return false; if (filter === 'mine' && !v.mine) return false;
        return !q || v.k.toLowerCase().includes(q) || cleanEn(v.en).toLowerCase().includes(q);
      }).slice(0, 400);
      $('.wordlist', main).innerHTML = rows.length ? rows.map((v) => { const b = srs[v.k] ? srs[v.k].box : 0; return `<li>${sayBtn(v.k)}<div>${kgSpan(v.k)}<br>${tl(v.k)}</div><div class="en">${esc(cleanEn(v.en))}<span class="strength s${b <= 2 ? 1 : b <= 4 ? 2 : 3}" title="Box ${b}"><i></i><i></i><i></i></span></div></li>`; }).join('') : '<li class="empty" style="display:block">No words here yet.</li>';
    };
    main.addEventListener('click', (e) => { const b = e.target.closest('[data-f] [data-v]'); if (b) { filter = b.dataset.v; $$('[data-f] button', main).forEach((x) => x.setAttribute('aria-pressed', String(x === b))); draw(); } });
    $('.search', main).addEventListener('input', (e) => { q = e.target.value.trim().toLowerCase(); draw(); });
    draw();
  };
  A.TITLES.words = 'My words';

  /* -------------------------------- Speaking ------------------------------ */
  function speakItems() {
    const out = [];
    const done = A.LESSONS.filter((l) => A.isDone(l.id));
    (done.length ? done : A.LESSONS.filter((l) => l.stage.n === 2)).forEach((l) => (l.blocks || []).forEach((b) => {
      if (b.t === 'dialog') b.lines.forEach((ln) => out.push([ln[1], cleanEn(ln[2])]));
      if (b.t === 'compare') out.push([b.kg.replace(/\|/g, ''), cleanEn(b.en)]);
    }));
    return shuffle(out.filter((x) => x[0].length < 80));
  }
  A.ROUTES.speak = function speak() {
    const main = A.main(), items = speakItems();
    let i = 0, rec = null, chunks = [], url = null;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    main.innerHTML = page('Speaking practice', 'Сүйлөө', 'Listen, say it out loud, record yourself and compare. Speaking every day — even alone — trains your mouth and your ear.', '<a href="#review">Review</a>') + '<div class="narrow" style="padding:30px 0 80px"><div class="card speak-card" style="margin:auto"></div></div>';
    const card = $('.speak-card', main);
    const draw = (msg) => {
      const it = items[i % items.length];
      card.innerHTML = `<p class="from">Sentence ${i % items.length + 1} of ${items.length}</p><div class="front" style="font-size:clamp(1.4rem,4vw,2rem)">${esc(it[0])}</div>${tl(it[0])}<p>${esc(it[1])}</p>
        <div class="grade"><button class="btn btn-line" data-sp="listen">${A.ICON_SAY.replace('<svg', '<svg width="16" height="16"')} Listen</button><button class="btn btn-line" data-sp="slow">Slowly</button>
        <button class="btn ${rec ? 'btn-gold' : 'btn-ink'}" data-sp="rec">${rec ? '■ Stop' : '● Record'}</button>${url ? '<button class="btn btn-line" data-sp="play">▶ My recording</button>' : ''}${SR ? '<button class="btn btn-line" data-sp="check">Check my pronunciation</button>' : ''}</div>
        <div class="sp-msg">${msg || ''}</div><div class="grade"><button class="btn btn-gold" data-sp="next">Next sentence</button></div>`;
    };
    card.addEventListener('click', async (e) => {
      const b = e.target.closest('[data-sp]'); if (!b) return;
      const it = items[i % items.length];
      if (b.dataset.sp === 'listen') A.say(it[0]);
      if (b.dataset.sp === 'slow') KG.speech.say(it[0], 0.6);
      if (b.dataset.sp === 'next') { i++; url = null; store.addXP(2, 'speaking'); draw(); }
      if (b.dataset.sp === 'play' && url) new Audio(url).play();
      if (b.dataset.sp === 'rec') {
        if (rec) { rec.stop(); return; }
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
          rec = new MediaRecorder(stream); chunks = [];
          rec.ondataavailable = (ev) => chunks.push(ev.data);
          rec.onstop = () => { stream.getTracks().forEach((t) => t.stop()); url = URL.createObjectURL(new Blob(chunks, { type: rec.mimeType })); rec = null; draw('Recorded. Play it back and compare it with the model.'); };
          rec.start(); draw('Recording… say the sentence, then press Stop.');
          setTimeout(() => { if (rec && rec.state === 'recording') rec.stop(); }, 12000);
        } catch (err) { draw('The microphone isn’t available here. Allow microphone access in your browser, or just practise out loud.'); }
      }
      if (b.dataset.sp === 'check') {
        try {
          const r = new SR(); r.lang = 'ky-KG'; r.maxAlternatives = 3; r.interimResults = false;
          draw('Listening… say the sentence now.');
          r.onresult = (ev) => {
            const heard = Array.from(ev.results[0]).map((x) => x.transcript);
            const results = heard.map((h) => KG.check(h, [it[0]]));
            const res = results.includes('right') ? 'right' : results.includes('almost') ? 'almost' : 'wrong';
            draw(`I heard: <b class="kg">${esc(heard[0])}</b><br>${res === 'right' ? '✓ Great — that matches!' : res === 'almost' ? '≈ Very close. Check the special vowels ө ү ы.' : 'Not quite. Listen again and try once more.'}`);
            if (res !== 'wrong') store.addXP(3, 'speaking');
          };
          r.onerror = (ev) => draw(ev.error === 'language-not-supported' ? 'This browser can’t recognise Kyrgyz speech. Use Record and compare by ear instead.' : 'Couldn’t hear you (' + esc(ev.error) + '). Check the microphone and try again.');
          r.start();
        } catch (err) { draw('Speech recognition isn’t available in this browser.'); }
      }
    });
    if (!items.length) { card.innerHTML = '<p>No sentences yet.</p>'; return; }
    draw();
  };
  A.TITLES.speak = 'Speaking practice';

  /* -------------------------------- Community ----------------------------- */
  const PROMPTS = [
    ['intro', 'A1', 'Introduce yourself', 'Write 3–5 sentences: your name, where you’re from, what you do.', 'Менин атым … · Мен … келдим · Мен …мын', 'hello'],
    ['family', 'A1', 'My family', 'Who is in your family? Use “бар” and “my” endings.', 'Менин … бар · Анын аты …', 'have'],
    ['food', 'A1', 'Food and drink', 'What do you usually eat and drink? What don’t you eat?', '… ичем · … жебейм · … жакшы көрөм', 'dont'],
    ['yesterday', 'A2', 'Yesterday', 'Describe what you did yesterday, from morning to evening.', 'Эртең менен … · анан … · кечинде …', 'past'],
    ['home', 'A2', 'My room', 'Describe your room: what’s on, under, next to what?', '… үстүндө · … жанында · … бар', 'positions'],
    ['weekend', 'A2', 'Weekend plans', 'What do you want to do this weekend? What can’t you do?', '… баргым келет · … бара албайм', 'want-can-must'],
    ['bazaar', 'A2', 'At the bazaar', 'Write a short dialogue: buying something and bargaining.', 'Канча турат? · Кымбат! · Макул', 'real-life'],
    ['city', 'B1', 'My city', 'Describe your city using “the place where…” sentences.', 'мен туулган шаар · … жашаган адамдар', 'participles'],
    ['memory', 'B1', 'A childhood memory', 'Tell a short memory: what you used to do, what happened when…', '…чумун · бала кезимде · …ганда', 'when-because'],
    ['advice', 'B1', 'Advice for a new learner', 'Give a beginner three tips. Use “if” and “must”.', '…са · …ышың керек · менимче', 'if'],
    ['travel', 'B1', 'A trip in Kyrgyzstan', 'Where would you like to go in Kyrgyzstan and why?', '…гым келет, анткени … · …уу үчүн', 'said-that'],
    ['opinion', 'B2', 'City or village?', 'Where is life better? Give arguments on both sides and your view.', 'Бир жагынан … экинчи жагынан … · менимче', 'complex'],
    ['phones', 'B2', 'Children and phones', 'Should children have smartphones? Argue your opinion.', 'Канча көп …са, ошончо … · …ганына карабастан', 'natural-speech'],
    ['proverb', 'B2', 'Explain a proverb', 'Choose a Kyrgyz proverb and explain what it means to you.', 'Бул макал … дегенди билдирет', 'proverbs']
  ];
  const promptOf = (id) => PROMPTS.find((p) => p[0] === id);
  const when = (t) => { const s = (Date.now() - t) / 1000; return s < 3600 ? Math.max(1, Math.round(s / 60)) + ' min ago' : s < 86400 ? Math.round(s / 3600) + ' h ago' : new Date(t).toLocaleDateString(); };
  const who = (p) => `<span class="who-name">${esc(p.name)}</span>${p.native ? ' <span class="pill ok">Native speaker</span>' : ''}`;
  function diff(a, b) {
    const x = a.split(/(\s+)/).filter(Boolean), y = b.split(/(\s+)/).filter(Boolean);
    if (x.length * y.length > 250000) return esc(b);
    const m = x.length, n = y.length, L = Array.from({ length: m + 1 }, () => new Uint16Array(n + 1));
    for (let i = m - 1; i >= 0; i--) for (let j = n - 1; j >= 0; j--) L[i][j] = x[i] === y[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
    let i = 0, j = 0, out = '';
    while (i < m && j < n) { if (x[i] === y[j]) { out += esc(x[i]); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) { out += /\S/.test(x[i]) ? `<del>${esc(x[i])}</del>` : esc(x[i]); i++; } else { out += /\S/.test(y[j]) ? `<ins>${esc(y[j])}</ins>` : esc(y[j]); j++; } }
    while (i < m) { out += /\S/.test(x[i]) ? `<del>${esc(x[i])}</del>` : ''; i++; }
    while (j < n) { out += /\S/.test(y[j]) ? `<ins>${esc(y[j])}</ins>` : esc(y[j]); j++; }
    return out;
  }
  function needServer(main, what) {
    if (A.cloud && A.cloud.available === false) { main.innerHTML += `<div class="narrow" style="padding:30px 0 80px">${A.BLOCK.tip({ title: 'Needs the online app', html: what + ' works when the app runs on its server (for example on Vercel with the database connected). This copy is offline or a preview.' })}</div>`; return true; }
    return false;
  }
  A.ROUTES.community = async function community() {
    const main = A.main();
    main.innerHTML = page('Community', 'Коомчулук', 'Write short texts and get them corrected by other learners and native speakers. Correct others and you’ll learn twice as fast.');
    if (needServer(main, 'The community')) return;
    main.insertAdjacentHTML('beforeend', `<div class="wrap" style="padding:26px 0 80px"><div class="seg" role="tablist"><button data-ct="write" aria-pressed="true">Write</button><button data-ct="feed" aria-pressed="false">Help others</button><button data-ct="mine" aria-pressed="false">My posts <span class="unread"></span></button><a class="btn btn-line btn-sm" href="#league" style="margin-left:auto">Weekly league</a></div><div class="ctab" style="margin-top:22px"></div></div>`);
    const tab = $('.ctab', main);
    const tabs = {
      write() {
        tab.innerHTML = `<div class="prompts">${['A1', 'A2', 'B1', 'B2'].map((lv) => `<h3>${lv}</h3><div class="prompt-grid">${PROMPTS.filter((p) => p[1] === lv).map((p) => `<button class="prompt" data-p="${p[0]}"><b>${esc(p[2])}</b><span>${esc(p[3])}</span></button>`).join('')}</div>`).join('')}</div>`;
      },
      async feed() {
        tab.innerHTML = '<p class="voice-note">Loading…</p>';
        try {
          const { posts } = await A.cloud.api('/api/community?a=feed');
          tab.innerHTML = posts.length ? `<div class="posts">${posts.map((p) => { const pr = promptOf(p.prompt); return `<a class="post-card" href="#post-${esc(p.id)}"><div class="pc-top">${who(p)} <span class="lvl">${esc(p.level)}</span><span class="voice-note">${when(p.created)}</span></div><b>${esc(pr ? pr[2] : 'Free writing')}</b><p class="kg">${esc(p.text.slice(0, 220))}${p.text.length > 220 ? '…' : ''}</p><span class="voice-note">${p.nc ? p.nc + ' correction' + (p.nc > 1 ? 's' : '') : 'No corrections yet — be the first'}${p.mine ? ' · your post' : ''}</span></a>`; }).join('')}</div>` : '<div class="empty panel"><p>No posts yet. Be the first to write something!</p></div>';
        } catch (e) { tab.innerHTML = `<p class="form-msg">${esc(e.message)}</p>`; }
      },
      async mine() {
        if (!signed()) { tab.innerHTML = '<div class="empty panel"><p>Sign in to see your posts and corrections.</p><a class="btn btn-ink btn-sm" href="#account">Sign in</a></div>'; return; }
        tab.innerHTML = '<p class="voice-note">Loading…</p>';
        try {
          const { posts } = await A.cloud.api('/api/community?a=mine');
          A.cloud.api('/api/community?a=seen', { method: 'POST' }).catch(() => {}); $('.unread', main).textContent = '';
          tab.innerHTML = posts.length ? `<div class="posts">${posts.map((p) => `<a class="post-card" href="#post-${esc(p.id)}"><div class="pc-top"><span class="lvl">${esc(p.level)}</span><span class="voice-note">${when(p.created)}</span></div><p class="kg">${esc(p.text.slice(0, 220))}</p><b>${p.nc} correction${p.nc === 1 ? '' : 's'}</b></a>`).join('')}</div>` : '<div class="empty panel"><p>You haven’t posted yet. Pick a topic in “Write”.</p></div>';
        } catch (e) { tab.innerHTML = `<p class="form-msg">${esc(e.message)}</p>`; }
      }
    };
    main.addEventListener('click', (e) => {
      const t = e.target.closest('[data-ct]'); if (t) { $$('[data-ct]', main).forEach((x) => x.setAttribute('aria-pressed', String(x === t))); tabs[t.dataset.ct](); return; }
      const p = e.target.closest('[data-p]'); if (p) writeForm(promptOf(p.dataset.p));
    });
    function writeForm(p) {
      tab.innerHTML = `<div class="narrow" style="margin:0"><button class="linkish" data-ct="write">← All topics</button><h2 style="margin-top:12px">${esc(p[2])} <span class="lvl">${esc(p[1])}</span></h2><p>${esc(p[3])}</p>
        <p class="voice-note">Useful patterns: <span class="kg">${esc(p[4])}</span> · <a href="#lesson-${esc(p[5])}">Revise the lesson</a></p>
        <textarea class="type-in write-ta" rows="7" maxlength="2000" placeholder="Жазыңыз… (write in Kyrgyz)"></textarea>${A.keyboard()}
        <div class="form-msg" role="alert"></div><div class="quiz-actions"><button class="btn btn-gold" data-post>Post for correction</button></div>
        ${signed() ? '' : '<p class="voice-note">You need to <a href="#account">sign in</a> to post.</p>'}</div>`;
      const ta = $('.write-ta', tab);
      tab.addEventListener('click', async (ev) => {
        const k = ev.target.closest('[data-key]'); if (k) { const v = k.dataset.key; ta.value = v === '⌫' ? ta.value.slice(0, -1) : ta.value + v; ta.focus(); return; }
        if (!ev.target.closest('[data-post]')) return;
        try {
          if (!signed()) throw new Error('Sign in first — then you can post.');
          const { post } = await A.cloud.api('/api/community?a=post', { method: 'POST', body: { prompt: p[0], level: p[1], text: ta.value } });
          store.addXP(10, 'writing'); toast('Posted! You’ll see corrections under “My posts”.'); location.hash = '#post-' + post.id;
        } catch (err) { $('.form-msg', tab).textContent = err.message; }
      });
    }
    tabs.write();
    if (signed()) A.cloud.api('/api/community?a=mine').then((r) => { if (r.unread) $('.unread', main).textContent = '(' + r.unread + ' new)'; }).catch(() => {});
  };
  A.TITLES.community = 'Community';

  A.PREFIXES.push(['post-', async (id) => {
    const main = A.main();
    main.innerHTML = page('Writing', '', '', '<a href="#community">Community</a>');
    if (needServer(main, 'The community')) return;
    main.insertAdjacentHTML('beforeend', '<div class="narrow post-body" style="padding:26px 0 80px"><p class="voice-note">Loading…</p></div>');
    const box = $('.post-body', main);
    try {
      const { post, corrections } = await A.cloud.api('/api/community?a=post&id=' + encodeURIComponent(id));
      const pr = promptOf(post.prompt);
      box.innerHTML = `<div class="panel"><div class="pc-top">${who(post)} <span class="lvl">${esc(post.level)}</span><span class="voice-note">${when(post.created)}</span></div><h3>${esc(pr ? pr[2] : 'Free writing')}</h3>${pr ? `<p class="voice-note">${esc(pr[3])}</p>` : ''}<p class="kg post-text">${esc(post.text).replace(/\n/g, '<br>')}</p>
        <div class="quiz-actions">${sayBtn(post.text)}${post.mine ? '<button class="btn btn-line btn-sm" data-pa="delete">Delete post</button>' : '<button class="linkish" data-pa="report">Report</button>'}</div></div>
        <h2 style="margin-top:28px">${corrections.length} correction${corrections.length === 1 ? '' : 's'}</h2>
        ${corrections.map((c) => `<div class="panel corr"><div class="pc-top">${who(c)}<span class="voice-note">${when(c.created)}</span>${c.helpful ? '<span class="pill ok">Helpful</span>' : ''}</div>${c.text && c.text !== post.text ? `<p class="kg diff">${diff(post.text, c.text).replace(/\n/g, '<br>')}</p>` : c.text ? '<p class="voice-note">No changes — looks correct!</p>' : ''}${c.comment ? `<p>${esc(c.comment)}</p>` : ''}${post.mine && !c.helpful ? `<button class="btn btn-line btn-sm" data-pa="helpful" data-c="${esc(c.id)}">Mark as helpful</button>` : ''}</div>`).join('')}
        ${post.mine ? '' : `<div class="panel"><h3>Correct this text</h3><p class="voice-note">Edit the text directly — your changes are highlighted for the writer. Be kind and explain the tricky bits.</p>
          <textarea class="type-in corr-ta" rows="6" maxlength="2000">${esc(post.text)}</textarea>
          <label class="lbl" for="corr-cm" style="margin-top:12px">Comment (optional)</label><textarea id="corr-cm" class="corr-cm" rows="2" maxlength="600" placeholder="e.g. After a number, keep the noun singular: үч китеп."></textarea>
          <div class="form-msg" role="alert"></div><div class="quiz-actions"><button class="btn btn-gold" data-pa="correct">Send correction</button></div>${signed() ? '' : '<p class="voice-note"><a href="#account">Sign in</a> to send corrections.</p>'}</div>`}`;
      box.addEventListener('click', async (e) => {
        const b = e.target.closest('[data-pa]'); if (!b) return;
        try {
          if (b.dataset.pa === 'correct') { await A.cloud.api('/api/community?a=correct', { method: 'POST', body: { id: post.id, text: $('.corr-ta', box).value, comment: $('.corr-cm', box).value } }); store.addXP(5, 'correcting'); toast('Thanks! Your correction was sent.'); A.route(); }
          if (b.dataset.pa === 'helpful') { await A.cloud.api('/api/community?a=helpful', { method: 'POST', body: { id: post.id, cid: b.dataset.c } }); A.route(); }
          if (b.dataset.pa === 'report') { await A.cloud.api('/api/community?a=report', { method: 'POST', body: { id: post.id } }); toast('Reported. Thanks for keeping the community friendly.'); }
          if (b.dataset.pa === 'delete') { if (!b.dataset.sure) { b.dataset.sure = 1; b.textContent = 'Click again to delete'; return; } await A.cloud.api('/api/community?a=delete', { method: 'POST', body: { id: post.id } }); location.hash = '#community'; }
        } catch (err) { const m = $('.form-msg', box); if (m) m.textContent = err.message; else toast(err.message); }
      });
    } catch (e) { box.innerHTML = `<p class="form-msg">${esc(e.message)}</p>`; }
  }]);

  A.ROUTES.league = async function league() {
    const main = A.main();
    main.innerHTML = page('Weekly league', 'Апталык жарыш', 'Everyone who earns XP this week, ranked. It resets every Monday. You can hide yourself in your account settings.', '<a href="#community">Community</a>');
    if (needServer(main, 'The league')) return;
    main.insertAdjacentHTML('beforeend', '<div class="narrow" style="padding:26px 0 80px"><div class="lb">Loading…</div></div>');
    try {
      const { rows, week } = await A.cloud.api('/api/leaderboard');
      $('.lb', main).innerHTML = rows.length ? `<p class="voice-note">Week ${esc(week)}</p><div class="tbl-wrap"><table><thead><tr><th>#</th><th>Learner</th><th>XP</th></tr></thead><tbody>${rows.map((r) => `<tr class="${r.me ? 'me' : ''}"><td>${r.rank}</td><td>${esc(r.name)}${r.me ? ' (you)' : ''}</td><td>${r.xp}</td></tr>`).join('')}</tbody></table></div>${signed() ? '' : '<p class="voice-note"><a href="#account">Sign in</a> to join the league.</p>'}` : '<div class="empty panel"><p>No one has earned XP this week yet. Do a lesson and claim first place!</p></div>';
    } catch (e) { $('.lb', main).innerHTML = `<p class="form-msg">${esc(e.message)}</p>`; }
  };
  A.TITLES.league = 'Weekly league';

  /* ------------------------------ Certificates ---------------------------- */
  const LEVELS = [['A1', 2], ['A1p', 3], ['A2', 4], ['B1', 5], ['B2', 6]];
  const label = (c) => c.replace('p', '+');
  A.ROUTES.certificates = function certificates() {
    const main = A.main(), certs = store.d.certs || {};
    main.innerHTML = page('Level tests & certificates', 'Сертификаттар', 'Each test has 25 questions from one stage of the course. Score 80% or more to earn a certificate you can print or share.') + `<div class="wrap" style="padding:30px 0 80px"><div class="cert-grid">${LEVELS.map(([c, n]) => {
      const st = A.COURSE.stages.find((s) => s.n === n), got = certs[c], pr = A.stageProgress(st);
      return `<div class="panel cert-tile ${got ? 'got' : ''}"><span class="lvl">${label(c)}</span><h3>${esc(st.title)}</h3><p class="voice-note">${pr.d} of ${pr.t} lessons done${got ? ` · passed with ${Math.round(got.score * 100)}%` : ''}</p><div class="quiz-actions">${got ? `<a class="btn btn-gold btn-sm" href="#cert-${c}">View certificate</a>` : ''}<a class="btn ${got ? 'btn-line' : 'btn-ink'} btn-sm" href="#certtest-${c}">${got ? 'Retake test' : 'Take the test'}</a></div></div>`;
    }).join('')}</div>
    <p class="voice-note" style="margin-top:20px">These certificates show you passed this course’s level tests. They are not an official language exam.</p></div>`;
  };
  A.TITLES.certificates = 'Certificates';
  A.PREFIXES.push(['certtest-', (c) => {
    const main = A.main(), lv = LEVELS.find((x) => x[0] === c);
    if (!lv) return A.ROUTES.certificates();
    const st = A.COURSE.stages.find((s) => s.n === lv[1]);
    const qs = shuffle(st.lessons.flatMap((l) => l.quiz)).slice(0, 25);
    main.innerHTML = page(`${label(c)} level test`, st.kg, `25 questions from “${esc(st.title)}”. No hints, no going back — take your time.`, '<a href="#certificates">Certificates</a>') + '<div class="narrow" style="padding:30px 0 80px"><div class="quiz"></div></div>';
    const cb = (pct) => {
      store.addXP(pct * 40, 'test');
      if (pct >= 0.8) {
        const prev = store.d.certs[c];
        if (!prev || pct > prev.score) store.d.certs[c] = { score: pct, date: Date.now(), name: signed() ? A.cloud.user.name : (store.d.settings.certName || '') };
        store.save();
      }
    };
    cb.passText = `You passed! <a href="#cert-${c}">View your ${label(c)} certificate</a>.`;
    cb.failText = 'Not this time — you need 80%. Review the questions below, revise the stage and try again.';
    A.mountQuiz($('.quiz', main), qs, cb);
  }]);
  A.PREFIXES.push(['cert-', (c) => {
    const main = A.main(), got = (store.d.certs || {})[c], lv = LEVELS.find((x) => x[0] === c);
    if (!got || !lv) { main.innerHTML = page('Certificate', '', 'You haven’t earned this certificate yet.', '<a href="#certificates">Certificates</a>'); return; }
    const st = A.COURSE.stages.find((s) => s.n === lv[1]);
    const name = (signed() && A.cloud.user.name) || got.name || store.d.settings.certName || '';
    const code = (c + ':' + name + ':' + got.date).split('').reduce((h, ch) => ((h * 31 + ch.charCodeAt(0)) >>> 0), 7).toString(36).toUpperCase();
    main.innerHTML = `<div class="wrap cert-page" style="padding:30px 0 80px"><div class="no-print" style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px"><a class="btn btn-line btn-sm" href="#certificates">← Certificates</a>${signed() ? '' : `<input class="cert-name" type="text" maxlength="40" placeholder="Your name on the certificate" value="${esc(name)}">`}<button class="btn btn-ink btn-sm" data-print>Print or save as PDF</button></div>
      <div class="certificate"><div class="cert-in">
        <svg viewBox="0 0 40 40" width="70" height="70" aria-hidden="true"><circle cx="20" cy="20" r="18" fill="#b8232f"/><circle cx="20" cy="20" r="10" fill="none" stroke="#f2b01e" stroke-width="2.4"/><path d="M14 11.5c2 5 2 12 0 17M20 10v20M26 11.5c-2 5-2 12 0 17M11.5 14c5 2 12 2 17 0M10 20h20M11.5 26c5-2 12-2 17 0" fill="none" stroke="#f2b01e" stroke-width="1.8"/></svg>
        <p class="c-small">Кыргызча · Kyrgyz course</p><h1>Certificate of achievement</h1><p class="c-small">This certifies that</p>
        <p class="c-name">${esc(name) || '________________'}</p>
        <p>passed the <b>${label(c)}</b> level test of the Кыргызча course</p><p class="c-stage">${esc(st.title)} · <span class="kg">${esc(st.kg)}</span></p>
        <div class="c-row"><div><b>${Math.round(got.score * 100)}%</b><span>score</span></div><div><b>${new Date(got.date).toLocaleDateString('en', { day: 'numeric', month: 'long', year: 'numeric' })}</b><span>date</span></div><div><b>${code}</b><span>certificate ID</span></div></div>
        <p class="c-note">Course completion certificate · not an official language examination</p></div></div></div>`;
    main.addEventListener('click', (e) => { if (e.target.closest('[data-print]')) { try { window.print(); } catch (err) { toast('Printing isn’t allowed here — open the deployed app to print.'); } } });
    const nm = $('.cert-name', main); if (nm) nm.addEventListener('change', () => { store.d.settings.certName = nm.value.trim(); got.name = nm.value.trim(); store.save(); A.route(); });
  }]);

  /* --------------------------------- Tools -------------------------------- */
  A.ROUTES.tools = function tools() {
    const main = A.main();
    const t = (href, glyph, title, text) => `<a class="tool" href="${href}"><span class="glyph">${glyph}</span><h3>${title}</h3><p>${text}</p></a>`;
    main.innerHTML = page('Tools', 'Куралдар', 'Everything that supports the course.') + `<div class="wrap" style="padding:30px 0 80px"><div class="tools tools-hub">
      ${t('#dictionary', 'Сөз', 'Dictionary', (A.dictionaryIndex ? A.dictionaryIndex().length.toLocaleString() + ' words' : 'Every word') + ', searchable in Kyrgyz, Latin or English.')}
      ${t('#alphabet', 'Ө Ү Ң', 'Alphabet', 'All 36 letters, sounds and a reading drill.')}
      ${t('#machine', 'үй|лөр', 'Suffix machine', 'Build any noun or verb form, with reasons.')}
      ${t('#cheatsheet', '±', 'Cheat sheet', 'Every ending on one page.')}
      ${t('#certificates', '★', 'Level tests', 'Certificates for A1 to B2.')}
      ${t('#placement', '?', 'Placement test', 'Find where to start.')}
      ${t('#goals', '◎', 'Study plan', 'Your goal, daily XP and finish date.')}
      ${t('#plan', '☰', 'How to learn', 'Hours, routines and resources.')}
      ${t('#arabic', 'ع', 'Arabic ↔ Kyrgyz', 'Loanwords and grammar logic for Arabic speakers.')}
      ${t('#about-audio', '♪', 'About the audio', 'Voices and speed.')}
    </div></div>`;
  };
  A.TITLES.tools = 'Tools';
});
