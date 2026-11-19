/* ==========================================================================
   KG — the Kyrgyz engine
   Vowel harmony, consonant assimilation, noun & verb suffixes,
   transliteration, text-to-speech fallback chain and answer checking.
   Rule-based: it covers the regular system that 95% of words follow.
   ========================================================================== */
(function () {
  'use strict';

  const VOWELS = 'аеёиоөуүыэюя';
  const VOICELESS = 'кпстфхцчшщ';
  const isVowel = (c) => VOWELS.includes(c);
  const isVoiceless = (c) => VOICELESS.includes(c);

  // Normalize the "sound" of a vowel letter for harmony purposes
  const VOWEL_SOUND = { 'я': 'а', 'ю': 'у', 'ё': 'о', 'э': 'е' };
  function lastVowel(word) {
    const w = word.toLowerCase();
    for (let i = w.length - 1; i >= 0; i--) {
      const c = w[i];
      if (isVowel(c)) return VOWEL_SOUND[c] || c;
    }
    return 'а';
  }
  // Last real sound (ignoring soft/hard signs)
  function lastSound(word) {
    const w = word.toLowerCase().replace(/[ьъ]+$/, '');
    return w[w.length - 1] || 'а';
  }

  /* The two harmony "families".
     LOW suffix vowel (A):  after а ы у → а | о → о | е и → е | ө ү → ө
     HIGH suffix vowel (I): after а ы → ы | о у → у | е и → и | ө ү → ү  */
  const LOW = { 'а': 'а', 'ы': 'а', 'у': 'а', 'о': 'о', 'е': 'е', 'и': 'е', 'ө': 'ө', 'ү': 'ө' };
  const HIGH = { 'а': 'ы', 'ы': 'ы', 'о': 'у', 'у': 'у', 'е': 'и', 'и': 'и', 'ө': 'ү', 'ү': 'ү' };
  const lowOf = (v) => LOW[v] || 'а';
  const highOf = (v) => HIGH[v] || 'ы';

  const FAMILY_NAME = {
    'а': 'back & flat (а, ы)', 'ы': 'back & flat (а, ы)', 'у': 'back & round (у)', 'о': 'back & round (о)',
    'е': 'front & flat (е, и)', 'и': 'front & flat (е, и)', 'ө': 'front & round (ө, ү)', 'ү': 'front & round (ө, ү)'
  };

  /* Template mini-language for suffixes:
       A  = low harmonic vowel     I = high harmonic vowel
       D  = д after vowel/voiced, т after voiceless  (locative/ablative/past)
       G  = г after vowel/voiced, к after voiceless  (dative, -гы, -ган)
       N  = н after vowel, д after voiced consonant, т after voiceless (genitive/accusative)
       L  = л after vowel/й/р, д after other voiced, т after voiceless (plural)
       B  = б after vowel/voiced, п after voiceless (negation -ба, question -бы, биз)
     Everything else is literal. Each placeholder is resolved against the
     word built so far, so harmony flows through long chains. */
  function attach(base, template) {
    let out = base;
    for (const ch of template) {
      const ls = lastSound(out);
      switch (ch) {
        case 'A': out += lowOf(lastVowel(out)); break;
        case 'I': out += highOf(lastVowel(out)); break;
        case 'D': out += isVoiceless(ls) ? 'т' : 'д'; break;
        case 'G': out += isVoiceless(ls) ? 'к' : 'г'; break;
        case 'B': out += isVoiceless(ls) ? 'п' : 'б'; break;
        case 'N': out += isVowel(ls) ? 'н' : (isVoiceless(ls) ? 'т' : 'д'); break;
        case 'L': out += (isVowel(ls) || ls === 'й' || ls === 'р') ? 'л' : (isVoiceless(ls) ? 'т' : 'д'); break;
        default: out += ch;
      }
    }
    return out;
  }

  // Final п → б, к → г when a vowel-initial suffix follows (китеп → китеби).
  // Only after a vowel (банк stays банк). Exceptions exist; we flag them.
  function soften(stem) {
    const w = stem;
    const n = w.length;
    if (n < 2) return w;
    const last = w[n - 1], prev = w[n - 2].toLowerCase();
    if (!isVowel(prev)) return w;
    if (last === 'п') return w.slice(0, -1) + 'б';
    if (last === 'к') return w.slice(0, -1) + 'г';
    return w;
  }
  // Spelling: й + vowel merges into a single iotated letter in some cases
  function yot(word) {
    return word.replace(/йу/g, 'ю').replace(/йа/g, 'я').replace(/йо/g, 'ё');
  }

  /* ---------------------------- NOUNS ---------------------------------- */
  const IRREGULAR_PLURAL = { 'бала': 'балдар' };

  const POSS = {
    // person: [after vowel, after consonant]
    '1sg': ['м', 'Iм'], '2sg': ['ң', 'Iң'], '2sgp': ['ңIз', 'IңIз'], '3': ['сI', 'I'],
    '1pl': ['бIз', 'IбIз'], '2pl': ['ңAр', 'IңAр'], '2plp': ['ңIздAр', 'IңIздAр']
  };
  const POSS_LABEL = {
    '1sg': 'my', '2sg': 'your (friendly)', '2sgp': 'your (polite)', '3': 'his / her / its / their',
    '1pl': 'our', '2pl': 'your (you all)', '2plp': 'your (you all, polite)'
  };
  const CASES = {
    nom: { t: '', name: 'Nominative', q: 'who? what?', en: '(the basic form)' },
    gen: { t: 'NIн', name: 'Genitive', q: 'whose? of what?', en: "’s / of" },
    dat: { t: 'GA', name: 'Dative', q: 'to where? to whom?', en: 'to / for' },
    acc: { t: 'NI', name: 'Accusative', q: 'whom? what? (that specific one)', en: 'the (object)' },
    loc: { t: 'DA', name: 'Locative', q: 'where? at whom?', en: 'in / at / on' },
    abl: { t: 'DAн', name: 'Ablative', q: 'from where? from whom?', en: 'from / than' }
  };
  // After a 3rd-person possessive an extra "н" appears before cases
  const CASES_AFTER_P3 = { gen: 'нIн', acc: 'н', dat: 'нA', loc: 'ндA', abl: 'нAн' };

  function pushPart(parts, w, nw) {
    // handles й + vowel merging into ю/я/ё at a boundary (ой + ум → оюм)
    const merged = yot(nw);
    if (merged.length < nw.length && w.endsWith('й')) {
      parts[parts.length - 1] = parts[parts.length - 1].slice(0, -1);
      parts.push(merged.slice(w.length - 1));
    } else parts.push(merged.slice(w.length));
    return merged;
  }
  function decline(noun, opts) {
    opts = opts || {};
    const steps = [];
    let w = noun.trim();
    const parts = [w];

    if (opts.plural) {
      let nw;
      if (IRREGULAR_PLURAL[w.toLowerCase()]) { nw = IRREGULAR_PLURAL[w.toLowerCase()]; steps.push({ add: nw.slice(w.length - 1), why: '“бала” is special: its plural is “балдар”. Just memorise it.' }); }
      else {
        nw = attach(w, 'LAр');
        steps.push({ add: nw.slice(w.length), why: explainL(w) + ' ' + explainA(w) });
      }
      w = pushPart(parts, w, nw);
    }
    if (opts.poss) {
      const pair = POSS[opts.poss];
      const ls = lastSound(w);
      let nw;
      if (isVowel(ls)) nw = attach(w, pair[0]);
      else { const s = soften(w); nw = attach(s, pair[1]); if (s !== w) { steps.push({ add: '', why: `The final “${w.slice(-1)}” softens to “${s.slice(-1)}” because a vowel follows (like китеп → китеби).` }); parts[parts.length - 1] = parts[parts.length - 1].slice(0, -1) + s.slice(-1); w = s; } }
      steps.push({ add: nw.slice(w.length), why: `“${POSS_LABEL[opts.poss]}” ending. ` + (isVowel(ls) ? 'The word ends in a vowel, so the short form is used.' : 'The word ends in a consonant, so a linking vowel is added.') + ' ' + explainI(w) });
      w = pushPart(parts, w, nw);
    }
    if (opts.case && opts.case !== 'nom') {
      let t = CASES[opts.case].t, why = '';
      if (opts.poss === '3' && CASES_AFTER_P3[opts.case]) { t = CASES_AFTER_P3[opts.case]; why = 'After “his/her/its” (-сы/-ы) Kyrgyz slips in an extra “н” before the case ending. '; }
      else if (opts.case === 'dat' && (opts.poss === '1sg' || opts.poss === '2sg')) { t = 'A'; why = 'After “my” (-м) and “your” (-ң) the dative is just a vowel: атам → атама “to my father”. '; }
      const nw = attach(w, t);
      steps.push({ add: nw.slice(w.length), why: why + caseWhy(opts.case, w, t) });
      w = pushPart(parts, w, nw);
    }
    return { word: w, parts, steps };
  }

  function explainA(w) {
    const v = lastVowel(w);
    return `Last vowel “${v}” is ${FAMILY_NAME[v]}, so the suffix vowel is “${lowOf(v)}”.`;
  }
  function explainI(w) {
    const v = lastVowel(w);
    return `Last vowel “${v}” → narrow suffix vowel “${highOf(v)}”.`;
  }
  function explainL(w) {
    const ls = lastSound(w);
    if (isVowel(ls) || ls === 'й' || ls === 'р') return `Ends in “${ls}” (a vowel, й or р) → plural starts with л.`;
    if (isVoiceless(ls)) return `Ends in a voiceless “${ls}” (a whispery sound) → plural starts with т.`;
    return `Ends in a voiced “${ls}” (a buzzing sound) → plural starts with д.`;
  }
  function caseWhy(c, w, t) {
    const ls = lastSound(w);
    const kind = isVowel(ls) ? 'a vowel' : isVoiceless(ls) ? `the voiceless (whispery) “${ls}”` : `the voiced (buzzing) “${ls}”`;
    const v = lastVowel(w);
    const harm = t.includes('A') ? `Vowel: “${lowOf(v)}” (wide family).` : t.includes('I') ? `Vowel: “${highOf(v)}” (narrow family).` : '';
    return `${CASES[c].name} = “${CASES[c].en}”. The word ends in ${kind}. ${harm}`.trim();
  }

  // "To be" predicate endings:  Мен студентмин = I am a student
  const PRED = {
    'мен': 'мIн', 'сен': 'сIң', 'сиз': 'сIз', 'ал': '', 'биз': 'BIз', 'силер': 'сIңAр', 'сиздер': 'сIздAр', 'алар': ''
  };
  function predicate(word, person) {
    return attach(word.trim(), PRED[person]);
  }
  function question(word) { return attach(word.trim(), 'BI'); }

  /* ---------------------------- VERBS ---------------------------------- */
  const PERSONS = ['мен', 'сен', 'сиз', 'ал', 'биз', 'силер', 'сиздер', 'алар'];
  const PERSON_EN = { 'мен': 'I', 'сен': 'you (friend)', 'сиз': 'you (polite)', 'ал': 'he/she/it', 'биз': 'we', 'силер': 'you all', 'сиздер': 'you all (polite)', 'алар': 'they' };
  // Full personal endings (present, future, "to be")
  const END_FULL = { 'мен': 'м', 'сен': 'сIң', 'сиз': 'сIз', 'ал': 'т', 'биз': 'бIз', 'силер': 'сIңAр', 'сиздер': 'сIздAр' };
  // Short endings (past -ды, conditional -са)
  const END_SHORT = { 'мен': 'м', 'сен': 'ң', 'сиз': 'ңIз', 'ал': '', 'биз': 'к', 'силер': 'ңAр', 'сиздер': 'ңIздAр' };

  function vstem(v) { return v.trim().toLowerCase().replace(/[-–—!]+$/, ''); }
  function endsVowel(s) { return isVowel(lastSound(s)); }
  function plural3(stem) { return endsVowel(stem) ? attach(stem, 'ш') : attach(soften(stem), 'Iш'); }

  const TENSES = {
    present: { name: 'Present–future', en: 'I do / I will do', ex: 'барам — I go / I will go' },
    presentNeg: { name: 'Present–future, negative', en: "I don't / I won't", ex: 'барбайм — I don’t go' },
    past: { name: 'Past (I saw it happen)', en: 'I did', ex: 'бардым — I went' },
    pastNeg: { name: 'Past, negative', en: "I didn't", ex: 'барбадым — I didn’t go' },
    progressive: { name: 'Right now (-ып жатат)', en: 'I am doing', ex: 'окуп жатам — I am reading' },
    cond: { name: 'If… (-са)', en: 'if I do', ex: 'барсам — if I go' },
    want: { name: 'Want to (-гы келет)', en: 'I want to', ex: 'баргым келет — I want to go' },
    can: { name: 'Can (-а алат)', en: 'I can', ex: 'бара алам — I can go' },
    imperative: { name: 'Commands & let’s', en: 'go! / let’s go', ex: 'бар! барыңыз! баралы!' }
  };

  function conjugate(verb, tense) {
    const s = vstem(verb);
    const V = endsVowel(s);
    const soft = V ? s : soften(s);
    const rows = [];
    const add = (p, form) => rows.push({ p, en: PERSON_EN[p] || p, form: yot(form) });
    switch (tense) {
      case 'present': {
        const base = V ? s + 'й' : attach(soft, 'A');
        PERSONS.forEach((p) => {
          if (p === 'алар') return add(p, V ? attach(attach(s, 'ш'), 'Aт') : attach(attach(soft, 'Iш'), 'Aт'));
          add(p, yot(attach(base, END_FULL[p])));
        });
        break;
      }
      case 'presentNeg': {
        const base = attach(s, 'BA') + 'й';
        PERSONS.forEach((p) => {
          if (p === 'алар') return add(p, attach(plural3(s), 'BA') + 'йт');
          add(p, attach(base, END_FULL[p]));
        });
        break;
      }
      case 'past': {
        const base = attach(s, 'DI');
        PERSONS.forEach((p) => {
          if (p === 'алар') return add(p, attach(plural3(s), 'DI'));
          add(p, attach(base, END_SHORT[p]));
        });
        break;
      }
      case 'pastNeg': {
        const base = attach(attach(s, 'BA'), 'DI');
        PERSONS.forEach((p) => {
          if (p === 'алар') return add(p, attach(attach(plural3(s), 'BA'), 'DI'));
          add(p, attach(base, END_SHORT[p]));
        });
        break;
      }
      case 'progressive': {
        const cv = V ? s + 'п' : attach(soft, 'Iп');
        const jat = conjugate('жат', 'present');
        jat.rows.forEach((r) => add(r.p, cv + ' ' + r.form));
        break;
      }
      case 'cond': {
        const base = attach(s, 'сA');
        PERSONS.forEach((p) => {
          if (p === 'алар') return add(p, attach(plural3(s), 'сA'));
          add(p, attach(base, END_SHORT[p]));
        });
        break;
      }
      case 'want': {
        const base = attach(s, 'GI');
        const P = { 'мен': 'м', 'сен': 'ң', 'сиз': 'ңIз', 'ал': 'сI', 'биз': 'бIз', 'силер': 'ңAр', 'сиздер': 'ңIздAр', 'алар': 'сI' };
        PERSONS.forEach((p) => add(p, attach(base, P[p]) + ' келет'));
        break;
      }
      case 'can': {
        const cv = V ? s + 'й' : attach(soft, 'A');
        const al = conjugate('ал', 'present');
        al.rows.forEach((r) => add(r.p, cv + ' ' + r.form));
        break;
      }
      case 'imperative': {
        rows.push({ p: 'сен', en: 'you (friend): do it!', form: s });
        rows.push({ p: 'сиз', en: 'you (polite): please do it', form: V ? attach(s, 'ңIз') : attach(soft, 'IңIз') });
        rows.push({ p: 'силер', en: 'you all: do it!', form: attach(s, 'GIлA') });
        rows.push({ p: 'мен', en: 'let me…', form: yot(V ? attach(s, 'йIн') : attach(soft, 'AйIн')) });
        rows.push({ p: 'биз', en: 'let’s…', form: V ? attach(s, 'йлI') : attach(soft, 'AлI') });
        rows.push({ p: 'ал', en: 'let him/her…', form: attach(s, 'сIн') });
        break;
      }
    }
    rows.forEach((r) => { r.form = yot(r.form); });
    return { stem: s, tense, rows };
  }

  function participle(verb) { return attach(vstem(verb), 'GAн'); }
  function converb(verb) { const s = vstem(verb); return yot(endsVowel(s) ? s + 'п' : attach(soften(s), 'Iп')); }

  /* --------------------------- NUMBERS --------------------------------- */
  const ONES = ['', 'бир', 'эки', 'үч', 'төрт', 'беш', 'алты', 'жети', 'сегиз', 'тогуз'];
  const TENS = ['', 'он', 'жыйырма', 'отуз', 'кырк', 'элүү', 'алтымыш', 'жетимиш', 'сексен', 'токсон'];
  function under1000(n) {
    const out = [];
    const h = Math.floor(n / 100), t = Math.floor((n % 100) / 10), o = n % 10;
    if (h) out.push(h === 1 ? 'жүз' : ONES[h] + ' жүз');
    if (t) out.push(TENS[t]);
    if (o) out.push(ONES[o]);
    return out.join(' ');
  }
  function number(n) {
    n = Math.floor(Math.abs(n));
    if (n === 0) return 'нөл';
    const parts = [];
    const mil = Math.floor(n / 1e6), th = Math.floor((n % 1e6) / 1000), rest = n % 1000;
    if (mil) parts.push((mil === 1 ? 'бир' : under1000(mil)) + ' миллион');
    if (th) parts.push(th === 1 ? 'миң' : under1000(th) + ' миң');
    if (rest) parts.push(under1000(rest));
    return parts.join(' ');
  }
  function ordinal(n) {
    const w = number(n);
    return endsVowel(w) ? attach(w, 'нчI') : attach(w, 'IнчI');
  }

  /* ------------------------ TRANSLITERATION ---------------------------- */
  const LAT = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'yo', 'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'y',
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'ң': 'ng', 'о': 'o', 'ө': 'ö', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't',
    'у': 'u', 'ү': 'ü', 'ф': 'f', 'х': 'kh', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'shch', 'ъ': '', 'ы': 'ı',
    'ь': '', 'э': 'e', 'ю': 'yu', 'я': 'ya'
  };
  function translit(text) {
    let out = '';
    const s = String(text);
    for (let i = 0; i < s.length; i++) {
      const ch = s[i], lo = ch.toLowerCase();
      let r = LAT[lo];
      if (r === undefined) { out += ch; continue; }
      if (lo === 'е') { const prev = (s[i - 1] || ' ').toLowerCase(); if (!/[а-яёөүң]/.test(prev) || isVowel(prev)) r = 'ye'; }
      if (ch !== lo && r) r = r[0].toUpperCase() + r.slice(1);
      out += r;
    }
    return out;
  }
  // Orthography a Turkish voice reads closest to Kyrgyz
  const TR = Object.assign({}, LAT, { 'ж': 'c', 'ң': 'n', 'ч': 'ç', 'ш': 'ş', 'щ': 'şç', 'х': 'h', 'й': 'y', 'ү': 'ü', 'ө': 'ö', 'ы': 'ı' });
  function toTurkishSpelling(text) {
    let out = '';
    for (const ch of String(text)) {
      const lo = ch.toLowerCase();
      const r = TR[lo];
      out += r === undefined ? ch : r;
    }
    return out;
  }

  // Latin typing → Cyrillic (for people without a Kyrgyz keyboard)
  const TYPE_MAP = [
    ['shch', 'щ'], ['ch', 'ч'], ['sh', 'ш'], ['ng', 'ң'], ['yo', 'ё'], ['yu', 'ю'], ['ya', 'я'], ['kh', 'х'],
    ['oe', 'ө'], ['ue', 'ү'], ["o'", 'ө'], ["u'", 'ү'], ['ö', 'ө'], ['ü', 'ү'], ['ı', 'ы'], ['ñ', 'ң'], ['ç', 'ч'], ['ş', 'ш'],
    ['a', 'а'], ['b', 'б'], ['v', 'в'], ['g', 'г'], ['d', 'д'], ['e', 'е'], ['j', 'ж'], ['c', 'ж'], ['z', 'з'], ['i', 'и'],
    ['k', 'к'], ['q', 'к'], ['l', 'л'], ['m', 'м'], ['n', 'н'], ['o', 'о'], ['p', 'п'], ['r', 'р'], ['s', 'с'], ['t', 'т'],
    ['u', 'у'], ['f', 'ф'], ['h', 'х'], ['x', 'х'], ['w', 'в']
  ];
  function latinToCyr(text) {
    const s = String(text);
    let out = '';
    let i = 0;
    while (i < s.length) {
      const lower = s.slice(i).toLowerCase();
      const ch = s[i];
      const upper = ch !== ch.toLowerCase();
      if (lower[0] === 'y') {
        // y between/after vowels = й, otherwise ы  (Kyrgyz → Kyrgyz, üy → үй)
        const prevC = out[out.length - 1] ? out[out.length - 1].toLowerCase() : '';
        if (/^y[aouöü]/.test(lower) && (lower[1] === 'a' || lower[1] === 'o' || lower[1] === 'u')) {
          // handled by digraphs ya/yo/yu below
        } else {
          const r = isVowel(prevC) ? 'й' : 'ы';
          out += upper ? r.toUpperCase() : r; i++; continue;
        }
      }
      let hit = false;
      for (const [lat, cyr] of TYPE_MAP) {
        if (lower.startsWith(lat)) { out += upper ? cyr.toUpperCase() : cyr; i += lat.length; hit = true; break; }
      }
      if (!hit) { out += ch; i++; }
    }
    return out;
  }

  /* -------------------------- CHECKING --------------------------------- */
  function norm(s) {
    return String(s).toLowerCase().replace(/ё/g, 'е').replace(/[.,!?;:"«»“”„'’()\-–—…]/g, ' ').replace(/\s+/g, ' ').trim();
  }
  const LOOSE = { 'ы': 'и', 'й': 'и', 'ө': 'о', 'ү': 'у', 'ң': 'н', 'э': 'е', 'ъ': '', 'ь': '' };
  function loose(s) { return norm(s).split('').map((c) => (LOOSE[c] !== undefined ? LOOSE[c] : c)).join(''); }
  function hasCyr(s) { return /[а-яёөүң]/i.test(s); }
  // Returns 'right' | 'almost' | 'wrong'
  function check(input, answers) {
    const list = Array.isArray(answers) ? answers : [answers];
    let given = input;
    if (!hasCyr(input) && /[a-z]/i.test(input)) given = latinToCyr(input);
    const g = norm(given);
    if (!g) return 'wrong';
    if (list.some((a) => norm(a) === g)) return 'right';
    if (list.some((a) => hasCyr(a) ? loose(a) === loose(g) : false)) return 'almost';
    if (list.some((a) => !hasCyr(a) && norm(a) === norm(input))) return 'right';
    return 'wrong';
  }

  /* ----------------------------- SPEECH -------------------------------- */
  const speech = {
    voice: null, mode: 'none', rate: 0.85, ready: false,
    init() {
      if (!('speechSynthesis' in window)) { this.ready = true; return; }
      const pick = () => {
        const vs = window.speechSynthesis.getVoices();
        const find = (re) => vs.find((v) => re.test(v.lang));
        let v;
        if ((v = find(/^ky/i))) { this.voice = v; this.mode = 'ky'; }
        else if ((v = find(/^kk/i))) { this.voice = v; this.mode = 'kk'; }
        else if ((v = find(/^tr/i))) { this.voice = v; this.mode = 'tr'; }
        else if ((v = find(/^ru/i))) { this.voice = v; this.mode = 'ru'; }
        else { this.voice = null; this.mode = 'none'; }
        this.ready = true;
        document.dispatchEvent(new CustomEvent('kg-voice', { detail: this.mode }));
      };
      pick();
      window.speechSynthesis.onvoiceschanged = pick;
    },
    available() { return 'speechSynthesis' in window && this.mode !== 'none'; },
    label() {
      return { ky: 'Kyrgyz voice', kk: 'Kazakh voice (very close to Kyrgyz)', tr: 'Turkish voice reading a Kyrgyz-style spelling (approximate)', ru: 'Russian voice (rough — Ө, Ү, Ң will be off)', none: 'No suitable voice on this device' }[this.mode];
    },
    say(text, rate) {
      if (!this.available()) return false;
      const clean = String(text).replace(/\|/g, '').replace(/[[\]]/g, '');
      const u = new SpeechSynthesisUtterance(this.mode === 'tr' ? toTurkishSpelling(clean) : clean);
      u.voice = this.voice; u.lang = this.voice.lang; u.rate = rate || this.rate;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(u);
      return true;
    }
  };

  window.KG = {
    VOWELS, isVowel, isVoiceless, lastVowel, lastSound, lowOf, highOf, FAMILY_NAME, attach, soften,
    decline, CASES, POSS_LABEL, predicate, question, PERSONS, PERSON_EN, TENSES, conjugate, participle, converb,
    number, ordinal, translit, toTurkishSpelling, latinToCyr, norm, check, speech
  };
})();
