/* Kyrgyz words that came from Arabic (most arrived through Persian, Chagatai and Islam).
   key: Kyrgyz stem (lowercase). A key ending in "=" only matches the whole word.
   ar: Arabic source, tr: transliteration, mean: what the Arabic word means,
   hint: a memory hook (optional), group: theme for the reference page.
   Only well-established borrowings are listed. */
window.ARABIC = {
  // Everyday & greetings
  'салам': { ar: 'سلام', tr: 'salām', mean: 'peace', hint: 'Peace → “hi!”', group: 'Greetings & everyday' },
  'саламат': { ar: 'سلامة', tr: 'salāma', mean: 'safety, wellbeing', hint: 'Саламатсызбы = “are you in salāma?”', group: 'Greetings & everyday' },
  'ассалоому': { ar: 'السلام عليكم', tr: 'as-salāmu ʿalaykum', mean: 'peace be upon you', hint: 'The same greeting, Kyrgyz pronunciation', group: 'Greetings & everyday' },
  'рахмат': { ar: 'رحمة', tr: 'raḥma', mean: 'mercy', hint: '“Mercy (on you)” became “thank you”', group: 'Greetings & everyday' },
  'макул': { ar: 'معقول', tr: 'maʿqūl', mean: 'reasonable', hint: '“That’s reasonable” → “OK, deal!”', group: 'Greetings & everyday' },
  'албетте': { ar: 'البتة', tr: 'al-battata', mean: 'definitely, absolutely', hint: 'Kept its meaning: “of course”', group: 'Greetings & everyday' },
  'мүмкүн': { ar: 'ممكن', tr: 'mumkin', mean: 'possible', hint: 'Identical meaning', group: 'Greetings & everyday' },
  'мисал': { ar: 'مثال', tr: 'mithāl', mean: 'example', hint: 'Мисалы = مثلاً', group: 'Greetings & everyday' },
  'адам': { ar: 'آدم', tr: 'ādam', mean: 'Adam', hint: 'A person = a child of Adam (بني آدم)', group: 'Greetings & everyday' },
  'дүйнө': { ar: 'دنيا', tr: 'dunyā', mean: 'the world', hint: 'Vowel harmony turned dunyā into дүйнө', group: 'Greetings & everyday' },
  'зат': { ar: 'ذات', tr: 'dhāt', mean: 'essence, self', hint: '“Essence” → a thing', group: 'Greetings & everyday' },
  'жооп': { ar: 'جواب', tr: 'jawāb', mean: 'answer', hint: 'j-w-b → жооп', group: 'Greetings & everyday' },
  'ажат': { ar: 'حاجة', tr: 'ḥāja', mean: 'need', hint: 'Ажаткана = “the house of need” — the toilet!', group: 'Greetings & everyday' },

  // Time
  'саат': { ar: 'ساعة', tr: 'sāʿa', mean: 'hour, clock', hint: 'Same word, same meaning', group: 'Time' },
  'убакыт': { ar: 'وقت', tr: 'waqt', mean: 'time', hint: 'w → у-б, and a vowel breaks up “qt”', group: 'Time' },
  'убакт': { ar: 'وقت', tr: 'waqt', mean: 'time', hint: 'убакыт loses a vowel before endings: убактым', group: 'Time', hidden: true },
  'азыр': { ar: 'حاضر', tr: 'ḥāḍir', mean: 'present, ready', hint: '“Present” → “now”', group: 'Time' },
  'дайым': { ar: 'دائم', tr: 'dāʾim', mean: 'lasting, constant', hint: 'Ар дайым = always (دائماً)', group: 'Time' },
  'жума': { ar: 'جمعة', tr: 'jumʿa', mean: 'Friday', hint: 'Friday — and in Kyrgyz also “week”', group: 'Time' },
  'акыркы': { ar: 'آخر', tr: 'ākhir', mean: 'last', hint: 'آخر + Kyrgyz -кы', group: 'Time' },
  'акырында': { ar: 'آخر', tr: 'ākhir', mean: 'end', hint: '“At its end” → finally', group: 'Time', hidden: true },

  // School, mind, knowledge
  'китеп': { ar: 'كتاب', tr: 'kitāb', mean: 'book', hint: 'k-t-b — the root of writing', group: 'School & knowledge' },
  'мектеп': { ar: 'مكتب', tr: 'maktab', mean: 'office, desk (place of writing)', hint: 'Same k-t-b root — in Kyrgyz it means school', group: 'School & knowledge' },
  'мугалим': { ar: 'معلّم', tr: 'muʿallim', mean: 'teacher', hint: 'The ع became г', group: 'School & knowledge' },
  'сабак': { ar: 'سبق', tr: 'sabaq', mean: '(in Persian/Urdu) lesson', hint: 'From the root س-ب-ق', group: 'School & knowledge' },
  'акыл': { ar: 'عقل', tr: 'ʿaql', mean: 'mind, reason', hint: 'Акылдуу = عاقل, clever', group: 'School & knowledge' },
  'маалымат': { ar: 'معلومات', tr: 'maʿlūmāt', mean: 'information', hint: 'Same meaning, from ع-ل-م', group: 'School & knowledge' },
  'маалымда': { ar: 'معلوم', tr: 'maʿlūm', mean: 'known', hint: '“Make known” → inform', group: 'School & knowledge', hidden: true },
  'маани': { ar: 'معنى', tr: 'maʿnā', mean: 'meaning', group: 'School & knowledge' },
  'илим': { ar: 'علم', tr: 'ʿilm', mean: 'knowledge, science', hint: 'Careful: билим (knowledge) is Turkic and not related!', group: 'School & knowledge' },
  'тарых': { ar: 'تاريخ', tr: 'tārīkh', mean: 'history', group: 'School & knowledge' },
  'адабият': { ar: 'أدبيات', tr: 'adabiyyāt', mean: 'literature', group: 'School & knowledge' },
  'сүрөт': { ar: 'صورة', tr: 'ṣūra', mean: 'picture, image', hint: 'Vowel harmony: ṣūra → сүрөт', group: 'School & knowledge' },

  // Qualities & feelings
  'сабыр': { ar: 'صبر', tr: 'ṣabr', mean: 'patience', hint: 'Сабырдуу = صبور', group: 'Qualities & feelings' },
  'сапат': { ar: 'صفة', tr: 'ṣifa', mean: 'attribute, quality', group: 'Qualities & feelings' },
  'даам': { ar: 'طعم', tr: 'ṭaʿm', mean: 'taste', hint: 'Даамдуу = tasty', group: 'Qualities & feelings' },
  'ыраазы': { ar: 'راضي', tr: 'rāḍī', mean: 'satisfied, content', hint: 'Kyrgyz adds ы before a starting р', group: 'Qualities & feelings' },
  'урмат': { ar: 'حرمة', tr: 'ḥurma', mean: 'respect, sanctity', hint: 'Урматтуу = respected, dear (in letters)', group: 'Qualities & feelings' },
  'намыс': { ar: 'ناموس', tr: 'nāmūs', mean: 'honour', group: 'Qualities & feelings' },
  'кыял': { ar: 'خيال', tr: 'khayāl', mean: 'imagination', hint: 'خ → к', group: 'Qualities & feelings' },
  'тагдыр': { ar: 'تقدير', tr: 'taqdīr', mean: 'destiny, decree', group: 'Qualities & feelings' },

  // Society & news
  'өкмөт': { ar: 'حكومة', tr: 'ḥukūma', mean: 'government', hint: 'ح disappears, harmony makes it өкмөт', group: 'Society & news' },
  'мамлекет': { ar: 'مملكة', tr: 'mamlaka', mean: 'kingdom', hint: '“Kingdom” → state', group: 'Society & news' },
  'кызмат': { ar: 'خدمة', tr: 'khidma', mean: 'service', hint: 'Пресс-кызмат = press service', group: 'Society & news' },
  'кабыл': { ar: 'قبول', tr: 'qabūl', mean: 'acceptance', hint: 'Кабыл ал- = accept (“take acceptance”)', group: 'Society & news' },
  'маселе': { ar: 'مسألة', tr: 'masʾala', mean: 'issue, question', group: 'Society & news' },
  'маданият': { ar: 'مدنية', tr: 'madaniyya', mean: 'civilisation', hint: '→ culture', group: 'Society & news' },
  'маданий': { ar: 'مدني', tr: 'madanī', mean: 'civil, urban', hint: '→ cultural', group: 'Society & news', hidden: true },
  'мурас': { ar: 'ميراث', tr: 'mīrāth', mean: 'inheritance', hint: '→ heritage', group: 'Society & news' },
  'кабар': { ar: 'خبر', tr: 'khabar', mean: 'news', group: 'Society & news' },
  'саясат': { ar: 'سياسة', tr: 'siyāsa', mean: 'politics', group: 'Society & news' },
  'себеп': { ar: 'سبب', tr: 'sabab', mean: 'reason, cause', group: 'Society & news' },
  'натыйжа': { ar: 'نتيجة', tr: 'natīja', mean: 'result', group: 'Society & news' },
  'шарт': { ar: 'شرط', tr: 'sharṭ', mean: 'condition', group: 'Society & news' },
  'укук': { ar: 'حقوق', tr: 'ḥuqūq', mean: 'rights', group: 'Society & news' },
  'акыйкат': { ar: 'حقيقة', tr: 'ḥaqīqa', mean: 'truth', group: 'Society & news' },
  'максат': { ar: 'مقصد', tr: 'maqṣad', mean: 'aim, purpose', group: 'Society & news' },
  'кесип': { ar: 'كسب', tr: 'kasb', mean: 'earning, gain', hint: '→ profession', group: 'Society & news' },
  'калк': { ar: 'خلق', tr: 'khalq', mean: 'creation, people', hint: '→ population, the people', group: 'Society & news' },
  'аскер': { ar: 'عسكر', tr: 'ʿaskar', mean: 'army', hint: '→ soldier', group: 'Society & news' },
  'мекен': { ar: 'مكان', tr: 'makān', mean: 'place', hint: '“The place” → homeland', group: 'Society & news' },
  'аалам': { ar: 'عالم', tr: 'ʿālam', mean: 'world, universe', group: 'Society & news' },
  'табият': { ar: 'طبيعة', tr: 'ṭabīʿa', mean: 'nature', group: 'Society & news' },
  'тарбия': { ar: 'تربية', tr: 'tarbiya', mean: 'upbringing', group: 'Society & news' },

  // Shop & food
  'дүкөн': { ar: 'دكان', tr: 'dukkān', mean: 'shop', hint: 'Vowel harmony made dukkān → дүкөн', group: 'Shop & food' },
  'эсеп': { ar: 'حساب', tr: 'ḥisāb', mean: 'account, bill', hint: 'Эсепти алып келиңизчи = the ḥisāb, please', group: 'Shop & food' },
  'шекер': { ar: 'سكّر', tr: 'sukkar', mean: 'sugar', hint: 'A cousin via Persian shakar', group: 'Shop & food' },
  'лимон': { ar: 'ليمون', tr: 'laymūn', mean: 'lemon', group: 'Shop & food' },
  'кофе': { ar: 'قهوة', tr: 'qahwa', mean: 'coffee', hint: 'Went from Arabic to Europe, then via Russian to Kyrgyz', group: 'Shop & food' },
  'арак=': { ar: 'عرق', tr: 'ʿaraq', mean: 'arak (a spirit)', hint: 'In Kyrgyz: vodka, any strong spirit', group: 'Shop & food' },

  // Faith & tradition
  'бата': { ar: 'فاتحة', tr: 'fātiḥa', mean: 'al-Fātiḥa', hint: 'The opening prayer → a blessing (lesson 6.4)', group: 'Faith & tradition' },
  'береке': { ar: 'بركة', tr: 'baraka', mean: 'blessing, abundance', hint: 'Береке берсин! = may there be baraka', group: 'Faith & tradition' },
  'оомийин': { ar: 'آمين', tr: 'āmīn', mean: 'amen', group: 'Faith & tradition' },
  'айт=': { pageOnly: true, ar: 'عيد', tr: 'ʿīd', mean: 'festival, Eid', hint: 'Орозо айт = Eid al-Fitr, Курман айт = Eid al-Adha (قربان)', group: 'Faith & tradition' },
  'курман': { ar: 'قربان', tr: 'qurbān', mean: 'sacrifice', group: 'Faith & tradition' },
  'мечит': { ar: 'مسجد', tr: 'masjid', mean: 'mosque', group: 'Faith & tradition' },
  'ажы=': { ar: 'حاجّ', tr: 'ḥājj', mean: 'pilgrim', hint: 'Someone who has done the Hajj', group: 'Faith & tradition' },
  'дин=': { ar: 'دين', tr: 'dīn', mean: 'religion', group: 'Faith & tradition' },
  'аба=': { ar: 'هواء', tr: 'hawāʾ', mean: 'air', hint: 'Аба ырайы = the weather (the air’s look)', group: 'Greetings & everyday' }
};

/* How Arabic sounds changed on the way into Kyrgyz — learn these and you can spot words nobody listed. */
window.ARABIC_RULES = [
  ['ع ح ء usually disappear (or leave a long vowel)', 'عقل ʿaql → [[акыл]]; حساب ḥisāb → [[эсеп]]; معلومات → [[маалымат]]'],
  ['…but sometimes ع becomes г', 'معلّم muʿallim → [[мугалим]]'],
  ['ق and خ become к', 'قبول qabūl → [[кабыл]]; خدمة khidma → [[кызмат]]; خبر → [[кабар]]'],
  ['ف becomes п or б', 'صفة ṣifa → [[сапат]]; فاتحة fātiḥa → [[бата]]'],
  ['ص ض ط ظ ذ become plain с, з, т, д', 'صبر ṣabr → [[сабыр]]; حاضر ḥāḍir → [[азыр]]; ذات dhāt → [[зат]]'],
  ['ة at the end becomes -т or -е', 'رحمة raḥma → [[рахмат]]; حكومة → [[өкмөт]]; مسألة → [[маселе]]'],
  ['Two consonants together get a vowel between them', 'عقل ʿaql → [[акыл]]; صبر ṣabr → [[сабыр]]; وقت waqt → [[убакыт]]'],
  ['Vowel harmony reshapes the vowels', 'دنيا dunyā → [[дүйнө]]; دكان dukkān → [[дүкөн]]; صورة ṣūra → [[сүрөт]]'],
  ['A word can’t start with р, so Kyrgyz adds ы', 'راضي rāḍī → [[ыраазы]]']
];

/* Same or similar sound, different meaning — don’t get tricked. */
window.ARABIC_FALSE_FRIENDS = [
  ['мектеп', 'مكتب', 'In Arabic an office or desk; in Kyrgyz a school.'],
  ['рахмат', 'رحمة', 'In Arabic “mercy”; in Kyrgyz the everyday “thank you”.'],
  ['сыр', 'سرّ', 'Two Kyrgyz words: сыр “secret” (from Arabic) and сыр “cheese” (from Russian). Context tells you which.'],
  ['куран', 'قرآن', 'Куран is the Quran — but in the month names Жалган куран and Чын куран it is a Turkic word for a roe deer.'],
  ['арак', 'عرق', 'In Kyrgyz it means vodka or any strong spirit, not specifically arak.'],
  ['жума', 'جمعة', 'Friday — and in Kyrgyz also simply “a week”.'],
  ['билим', 'علم', 'Looks like ʿilm, but билим (knowledge) is Turkic, from бил- “know”. Илим is the Arabic one.']
];
