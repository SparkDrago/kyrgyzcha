/* Graded readers — A1 to B2. Every sentence has a translation; tap to reveal. */
window.READERS = [
  {
    id: 'family', level: 'A1', kg: 'Менин үй-бүлөм', title: 'My family', about: 'Aigul introduces her family. Uses “to be” endings, possessives and бар.',
    paras: [
      [['Саламатсыздарбы! Менин атым Айгүл.', 'Hello everyone! My name is Aigul.'], ['Мен он сегиз жаштамын.', 'I’m eighteen years old.'], ['Мен Бишкекте жашайм. Мен студентмин.', 'I live in Bishkek. I’m a student.']],
      [['Менин үй-бүлөм чоң эмес.', 'My family isn’t big.'], ['Менин атам, апам жана бир иним бар.', 'I have a father, a mother and a younger brother.'], ['Атамдын аты Бакыт. Ал айдоочу.', 'My father’s name is Bakyt. He’s a driver.'], ['Апамдын аты Гүлнара. Ал мугалим.', 'My mother’s name is Gulnara. She’s a teacher.'], ['Иним Азамат. Ал он жашта. Ал окуучу.', 'My little brother is Azamat. He’s ten. He’s a pupil.']],
      [['Биздин бир итибиз бар. Анын аты Алабай.', 'We have a dog. Its name is Alabai.'], ['Менин чоң атам жана чоң апам Нарында жашашат.', 'My grandfather and grandmother live in Naryn.'], ['Жайында биз Нарынга барабыз.', 'In summer we go to Naryn.'], ['Мен үй-бүлөмдү абдан жакшы көрөм.', 'I love my family very much.']]
    ],
    glossary: [['үй-бүлө', 'family'], ['жаштамын', 'I am … years old'], ['айдоочу', 'driver'], ['окуучу', 'pupil'], ['чоң ата / чоң апа', 'grandfather / grandmother'], ['жайында', 'in summer']],
    quiz: [
      { t: 'mc', q: 'How old is Aigul?', o: ['18', '10', '8', '80'], why: '[[он сегиз]] = 18.' },
      { t: 'mc', q: 'What does her father do?', o: ['He’s a driver.', 'He’s a teacher.', 'He’s a student.', 'He’s a doctor.'], why: '[[Ал айдоочу.]]' },
      { t: 'mc', q: 'Where do her grandparents live?', o: ['In Naryn', 'In Bishkek', 'In Osh', 'With Aigul'], why: '[[Нарында жашашат.]]' }
    ]
  },
  {
    id: 'bazaar', level: 'A1', kg: 'Базарда', title: 'At the bazaar', about: 'Tom goes shopping at Osh Bazaar. Numbers, prices and polite requests.',
    paras: [
      [['Бүгүн жекшемби.', 'Today is Sunday.'], ['Том Ош базарына барат.', 'Tom goes to Osh Bazaar.'], ['Базар абдан чоң. Ал жерде көп адам бар.', 'The bazaar is very big. There are lots of people there.']],
      [['Том алма, нан жана сүт сатып алгысы келет.', 'Tom wants to buy apples, bread and milk.'], ['Ал сатуучудан сурайт: «Алма канча турат?»', 'He asks the seller: “How much are the apples?”'], ['«Бир килосу сексен сом», — дейт сатуучу.', '“Eighty som a kilo,” says the seller.'], ['«Эки кило бериңизчи», — дейт Том.', '“Two kilos, please,” says Tom.']],
      [['Анан ал нан жана сүт алат.', 'Then he buys bread and milk.'], ['Нан жыйырма беш сом, сүт алтымыш сом.', 'Bread is twenty-five som, milk is sixty som.'], ['Том баары болуп эки жүз кырк беш сом төлөйт.', 'Tom pays two hundred and forty-five som in total.'], ['Сатуучу жылмайып: «Кыргызча жакшы сүйлөйт экенсиз!» — дейт.', 'The seller smiles: “You speak Kyrgyz well!”'], ['Том кубанып: «Рахмат!» — дейт.', 'Tom, delighted, says: “Thank you!”']]
    ],
    glossary: [['сатуучу', 'seller'], ['кило', 'kilo'], ['бериңизчи', 'please give'], ['баары болуп', 'in total'], ['төлө-', 'pay'], ['жылмай-', 'smile'], ['кубан-', 'be glad']],
    quiz: [
      { t: 'mc', q: 'What day is it?', o: ['Sunday', 'Saturday', 'Friday', 'Monday'], why: '[[жекшемби]] = Sunday.' },
      { t: 'mc', q: 'How much does a kilo of apples cost?', o: ['80 som', '18 som', '60 som', '245 som'], why: '[[сексен сом]].' },
      { t: 'mc', q: 'What does the seller say about Tom?', o: ['He speaks Kyrgyz well.', 'He pays too little.', 'He is a tourist.', 'He should come back tomorrow.'], why: '[[Кыргызча жакшы сүйлөйт экенсиз!]]' }
    ]
  },
  {
    id: 'bishkek-day', level: 'A2', kg: 'Бишкекте бир күн', title: 'A day in Bishkek', about: 'A visitor tells the story of yesterday. Past tense, -ып chains, time words.',
    paras: [
      [['Кечээ мен эрте турдум.', 'Yesterday I got up early.'], ['Эртең мененки тамакты ичип, шаарга чыктым.', 'I had breakfast and went out into the city.'], ['Адегенде Ала-Тоо аянтына бардым.', 'First I went to Ala-Too Square.'], ['Аянтта Манастын чоң эстелиги турат.', 'On the square stands a big statue of Manas.'], ['Мен ал жерде көп сүрөт тарттым.', 'I took lots of photos there.']],
      [['Анан Панфилов паркында сейилдедим.', 'Then I walked in Panfilov Park.'], ['Түштө кичинекей кафеде лагман жедим.', 'At noon I ate lagman in a small café.'], ['Абдан даамдуу экен!', 'It was delicious!'], ['Түштөн кийин Ош базарына бардым.', 'In the afternoon I went to Osh Bazaar.'], ['Ал жерден апама белек сатып алдым — кооз шырдак.', 'There I bought a present for my mum — a beautiful shyrdak.']],
      [['Кечинде досум Азамат менен жолуктук.', 'In the evening I met my friend Azamat.'], ['Биз чайканада отуруп, көп сүйлөштүк.', 'We sat in a teahouse and talked for a long time.'], ['Үйгө кеч келдим, бирок абдан бактылуу элем.', 'I got home late, but I was very happy.']]
    ],
    glossary: [['эрте', 'early'], ['аянт', 'square'], ['эстелик', 'monument, statue'], ['сейилде-', 'go for a walk'], ['кооз', 'beautiful (things)'], ['шырдак', 'felt carpet'], ['чайкана', 'teahouse'], ['кеч', 'late']],
    quiz: [
      { t: 'mc', q: 'What stands on Ala-Too Square?', o: ['A statue of Manas', 'A big bazaar', 'A teahouse', 'A yurt'], why: '[[Манастын чоң эстелиги]].' },
      { t: 'mc', q: 'What did the narrator buy for their mother?', o: ['A shyrdak', 'Lagman', 'A kalpak', 'Flowers'], why: '[[кооз шырдак]].' },
      { t: 'mc', q: 'How did the narrator feel at the end of the day?', o: ['Very happy', 'Tired and sad', 'Hungry', 'Lost'], why: '[[абдан бактылуу элем]].' }
    ]
  },
  {
    id: 'fox-crow', level: 'A2', kg: 'Түлкү менен карга', title: 'The fox and the crow', about: 'Aesop’s fable, retold in simple Kyrgyz. Past tense, wanting, quotes with деп.',
    paras: [
      [['Бир күнү карга бир кесим сыр таап алды.', 'One day a crow found a piece of cheese.'], ['Ал дарактын башына конуп, сырды жегиси келди.', 'It landed at the top of a tree and wanted to eat the cheese.'], ['Ошол убакта жанынан бир түлкү өтүп бара жаткан.', 'Just then a fox was passing by.'], ['Түлкү сырды көрүп, аны алгысы келди.', 'The fox saw the cheese and wanted to get it.']],
      [['«Кандай сулуу куш! — деди түлкү. — Сенин үнүң да сулуу болсо керек.»', '“What a beautiful bird!” said the fox. “Your voice must be beautiful too.”'], ['«Бир ырдап берчи!»', '“Sing something for me!”'], ['Карга мактоого ишенип, оозун ачып, «Каар!» деп кыйкырды.', 'The crow believed the flattery, opened its beak and cried “Caw!”'], ['Сыр жерге түшүп кетти.', 'The cheese fell to the ground.'], ['Түлкү сырды алып, качып кетти.', 'The fox grabbed the cheese and ran away.']],
      [['Мактоого ишенбе!', 'Don’t trust flattery!']]
    ],
    glossary: [['карга', 'crow'], ['түлкү', 'fox'], ['кесим', 'piece, slice'], ['сыр', 'cheese'], ['кон-', 'land, perch'], ['үн', 'voice'], ['ырда-', 'sing'], ['мактоо', 'praise, flattery'], ['кыйкыр-', 'shout, cry'], ['кач-', 'run away']],
    quiz: [
      { t: 'mc', q: 'What did the crow find?', o: ['Cheese', 'Bread', 'Meat', 'A fox'], why: '[[бир кесим сыр]].' },
      { t: 'mc', q: 'What did the fox ask the crow to do?', o: ['Sing', 'Fly away', 'Share the cheese', 'Come down'], why: '[[Бир ырдап берчи!]]' },
      { t: 'mc', q: 'What is the lesson?', o: ['Don’t trust flattery.', 'Always share food.', 'Foxes are kind.', 'Singing is beautiful.'], why: '[[Мактоого ишенбе!]]' }
    ]
  },
  {
    id: 'issyk-kul', level: 'B1', kg: 'Ысык-Көлгө саякат', title: 'A trip to Issyk-Kul', about: 'A summer holiday at the great lake. -ган, -ыптыр/экен, used-to past, longer sentences.',
    paras: [
      [['Былтыр жайында биз үй-бүлөбүз менен Ысык-Көлгө барып келдик.', 'Last summer we went to Issyk-Kul with our family.'], ['Ысык-Көл — дүйнөдөгү эң чоң тоо көлдөрүнүн бири.', 'Issyk-Kul is one of the largest mountain lakes in the world.'], ['Анын аты «ысык көл» дегенди билдирет, анткени кышында да тоңбойт.', 'Its name means “hot lake”, because it doesn’t freeze even in winter.']],
      [['Бишкектен Чолпон-Атага чейин машина менен төрт саатча жол жүрдүк.', 'We drove for about four hours from Bishkek to Cholpon-Ata.'], ['Жолдо Боом капчыгайынан өттүк — ал жер абдан кооз.', 'On the way we passed through the Boom Gorge — it’s a very beautiful place.'], ['Чолпон-Атада биз көлдүн жээгиндеги кичинекей мейманканада жашадык.', 'In Cholpon-Ata we stayed in a small hotel on the lake shore.'], ['Күн сайын эртең менен сууга түшүп, түштөн кийин жээкте эс алдык.', 'Every morning we swam, and in the afternoons we relaxed on the shore.'], ['Суу абдан таза, бирок бир аз муздак болчу.', 'The water was very clean, but a bit cold.']],
      [['Бир күнү биз Рух Ордо маданий борборуна бардык.', 'One day we went to the Ruh Ordo cultural centre.'], ['Ошондой эле байыркы таш сүрөттөрдү көрдүк — алар миңдеген жылдар мурун тартылган экен.', 'We also saw ancient rock drawings — they were made thousands of years ago, it turns out.'], ['Кечинде көлдүн үстүнөн күн батканын карап отурдук.', 'In the evenings we sat watching the sun set over the lake.'], ['Тоолордун ак кар баскан чокулары сууда чагылышып турду.', 'The snow-capped peaks of the mountains were reflected in the water.']],
      [['Мен Ысык-Көлдү эч качан унутпайм.', 'I will never forget Issyk-Kul.'], ['Келерки жайда кайра баргым келет.', 'I want to go back next summer.']]
    ],
    glossary: [['тоң-', 'freeze'], ['капчыгай', 'gorge, canyon'], ['жээк', 'shore'], ['сууга түш-', 'swim, bathe'], ['муздак', 'cold (to touch)'], ['байыркы', 'ancient'], ['таш сүрөт', 'rock drawing, petroglyph'], ['күн бат-', 'the sun sets'], ['чоку', 'peak'], ['чагылыш-', 'be reflected'], ['келерки', 'next, coming']],
    quiz: [
      { t: 'mc', q: 'Why is the lake called “hot lake”?', o: ['It doesn’t freeze in winter.', 'The water is boiling.', 'It’s in a desert.', 'There are hot springs only.'], why: '[[кышында да тоңбойт]].' },
      { t: 'mc', q: 'How long was the drive from Bishkek?', o: ['About four hours', 'About one hour', 'Two days', 'Fourteen hours'], why: '[[төрт саатча]].' },
      { t: 'mc', q: 'What did they see that was thousands of years old?', o: ['Rock drawings', 'A hotel', 'The gorge', 'A yurt'], why: '[[байыркы таш сүрөттөр]].' },
      { t: 'mc', q: 'What does the narrator want?', o: ['To go back next summer', 'To live in Cholpon-Ata', 'To never travel again', 'To swim in winter'], why: '[[Келерки жайда кайра баргым келет.]]' }
    ]
  },
  {
    id: 'yurt', level: 'B1', kg: 'Боз үй', title: 'The yurt', about: 'How the nomads’ moving home works and what it means today. Passives, -уу, “considered”.',
    paras: [
      [['Боз үй — кыргыздардын салттуу үйү.', 'The yurt is the traditional home of the Kyrgyz.'], ['Көчмөн элдер жайында малын жайлоого айдап барышкан.', 'Nomadic people used to drive their livestock to summer pastures.'], ['Ошондуктан аларга оңой жыйналып, оңой тигиле турган үй керек болгон.', 'So they needed a home that could be easily packed up and easily put up.'], ['Боз үйдү бир-эки саатта тигип, атка жүктөп кетсе болот.', 'A yurt can be put up in an hour or two, and loaded onto a horse.']],
      [['Анын негизги бөлүктөрү — кереге, уук жана түндүк.', 'Its main parts are the lattice walls, the roof poles and the crown.'], ['Сыртынан боз үй кийиз менен жабылат.', 'From the outside the yurt is covered with felt.'], ['Боз үйдүн ичи да өзүнчө эрежелер менен уюштурулат.', 'The inside of the yurt is also arranged by its own rules.'], ['Эшиктин каршысындагы орун — төр. Ал жерге эң урматтуу конок отурат.', 'The place opposite the door is the tör. The most respected guest sits there.'], ['Түндүк үй-бүлөнүн символу болуп эсептелет; ал атадан балага өтөт.', 'The tündük is considered the symbol of the family; it passes from father to son.']],
      [['Бүгүн көпчүлүк кыргыздар шаарда же айылда жашашат, бирок боз үй дагы эле жашап келет.', 'Today most Kyrgyz live in towns or villages, but the yurt lives on.'], ['Аны тойлордо, жайлоодо жана туристтер үчүн тигишет.', 'People put yurts up for celebrations, on summer pastures and for tourists.'], ['Кыргыз желегиндеги түндүк элдин тамырын эске салат.', 'The tündük on the Kyrgyz flag reminds the people of their roots.']]
    ],
    glossary: [['салттуу', 'traditional'], ['көчмөн', 'nomad, nomadic'], ['жайлоо', 'summer pasture'], ['айда-', 'drive (animals)'], ['жыйна-', 'gather, pack up'], ['тик-', 'put up (a yurt); sew'], ['жүктө-', 'load'], ['кийиз', 'felt'], ['эреже', 'rule'], ['эсептел-', 'be considered'], ['тамыр', 'root'], ['эске сал-', 'remind']],
    quiz: [
      { t: 'mc', q: 'Why did nomads need a yurt?', o: ['It was easy to pack up and move.', 'It was the biggest house possible.', 'It was made of stone.', 'It was only for guests.'], why: '[[оңой жыйналып, оңой тигиле турган үй]].' },
      { t: 'mc', q: 'Who sits in the tör?', o: ['The most respected guest', 'The youngest child', 'The cook', 'Anyone who arrives first'], why: '[[эң урматтуу конок]].' },
      { t: 'mc', q: 'What is the tündük considered to be?', o: ['The symbol of the family', 'A cooking pot', 'The door', 'A felt carpet'], why: '[[үй-бүлөнүн символу]].' }
    ]
  },
  {
    id: 'city-village', level: 'B2', kg: 'Шаар менен айыл', title: 'City and village', about: 'An opinion piece on migration to the capital. Argument words, nominalisation, “must not forget that…”.',
    paras: [
      [['Акыркы жылдары миңдеген жаштар айылдан Бишкекке көчүп келишти.', 'In recent years, thousands of young people have moved from villages to Bishkek.'], ['Алардын көбү иш, билим жана жакшы жашоо издеп келишет.', 'Most of them come looking for work, education and a better life.']],
      [['Бир жагынан, шаарда мүмкүнчүлүктөр көп: университеттер, компаниялар, ооруканалар.', 'On the one hand, the city offers many opportunities: universities, companies, hospitals.'], ['Экинчи жагынан, шаардагы жашоо кымбат, ал эми батир табуу оңой эмес.', 'On the other hand, life in the city is expensive, and finding a flat isn’t easy.'], ['Айылда болсо абасы таза, адамдар бири-бирин жакшы билишет.', 'In the village, by contrast, the air is clean and people know each other well.'], ['Бирок жумуш аз, ошондуктан көптөгөн үй-бүлөлөр акча табыш үчүн чет өлкөгө кетүүгө аргасыз болушат.', 'But jobs are scarce, so many families are forced to go abroad to earn money.']],
      [['Менимче, маселенин чечими — айылдарда жаңы жумуш орундарын түзүү.', 'In my opinion, the solution to the problem is creating new jobs in the villages.'], ['Мисалы, туризм, интернет аркылуу иштөө жана айыл чарбасын өнүктүрүү жаштарды айылда кармап калышы мүмкүн.', 'For example, tourism, remote work over the internet and developing agriculture could keep young people in the villages.'], ['Кыргызстандын келечеги шаарда гана эмес, айылда да экенин унутпашыбыз керек.', 'We must not forget that Kyrgyzstan’s future lies not only in the city, but in the village too.']]
    ],
    glossary: [['акыркы жылдары', 'in recent years'], ['көч-', 'move (home), migrate'], ['мүмкүнчүлүк', 'opportunity'], ['бир жагынан / экинчи жагынан', 'on the one hand / on the other'], ['батир', 'flat, apartment'], ['аба', 'air'], ['аргасыз', 'forced, having no choice'], ['маселе', 'problem, issue'], ['жумуш орду', 'job (workplace)'], ['түз-', 'create, form'], ['айыл чарба', 'agriculture'], ['өнүктүр-', 'develop'], ['келечек', 'future']],
    quiz: [
      { t: 'mc', q: 'Why do young people move to Bishkek?', o: ['For work, education and a better life', 'Because villages are closed', 'To study tourism only', 'Because the air is cleaner'], why: '[[иш, билим жана жакшы жашоо издеп]].' },
      { t: 'mc', q: 'What is one problem of city life mentioned?', o: ['It’s expensive and flats are hard to find.', 'There are no hospitals.', 'People know each other too well.', 'There is no internet.'], why: '[[жашоо кымбат, батир табуу оңой эмес]].' },
      { t: 'mc', q: 'What solution does the author propose?', o: ['Creating new jobs in villages', 'Moving everyone to Bishkek', 'Going abroad', 'Building more universities'], why: '[[жаңы жумуш орундарын түзүү]].' },
      { t: 'mc', q: 'What does [[аргасыз]] mean?', o: ['forced, without choice', 'happy', 'free of charge', 'abroad'], why: 'арга (way out) + сыз (without).' }
    ]
  },
  {
    id: 'manas', level: 'B2', kg: 'Манас эпосу', title: 'The epic of Manas', about: 'An introduction to the national epic, in formal written Kyrgyz.',
    paras: [
      [['«Манас» — кыргыз элинин эң белгилүү баатырдык эпосу.', '“Manas” is the most famous heroic epic of the Kyrgyz people.'], ['Эпос үч бөлүктөн турат: «Манас», «Семетей» жана «Сейтек».', 'The epic consists of three parts: “Manas”, “Semetei” and “Seitek”.']],
      [['Биринчи бөлүгүндө Манас баатыр чачырап кеткен кыргыз урууларын бириктирип, элин душмандардан коргойт.', 'In the first part, the hero Manas unites the scattered Kyrgyz tribes and defends his people from their enemies.'], ['Анын жанында акылман аялы Каныкей, кеңешчиси Бакай жана кырк чоросу бар.', 'At his side are his wise wife Kanykei, his counsellor Bakai and his forty companions.'], ['Экинчи бөлүгү Манастын уулу Семетейдин, үчүнчүсү небереси Сейтектин тагдыры жөнүндө баяндайт.', 'The second part tells the fate of Manas’s son Semetei, and the third that of his grandson Seitek.']],
      [['Эпос кылымдар бою оозеки түрдө сакталып, манасчылар аркылуу муундан муунга өткөн.', 'For centuries the epic was preserved orally, passed from generation to generation by the manaschy.'], ['Белгилүү манасчылар Сагынбай Орозбак уулу менен Саякбай Каралаевдин айткан варианттары жазылып алынган.', 'The versions recited by the famous manaschy Sagynbai Orozbak uulu and Sayakbai Karalaev were written down.'], ['Саякбай Каралаевдин варианты жарым миллионго жакын саптан турат деп айтылат.', 'Sayakbai Karalaev’s version is said to run to nearly half a million lines.']],
      [['Бүгүн «Манас» кыргыздар үчүн жөн гана поэма эмес — ал элдин тарыхы, философиясы жана ар-намысы.', 'Today, for the Kyrgyz, “Manas” is not just a poem — it is the people’s history, philosophy and honour.'], ['2013-жылы ЮНЕСКО кыргыз эпосторунун үчилтигин адамзаттын материалдык эмес маданий мурасынын тизмесине киргизген.', 'In 2013, UNESCO added the trilogy of Kyrgyz epics to its list of the Intangible Cultural Heritage of Humanity.']]
    ],
    glossary: [['баатырдык', 'heroic'], ['чачыра-', 'scatter'], ['уруу', 'tribe, clan'], ['бириктир-', 'unite'], ['душман', 'enemy'], ['корго-', 'defend, protect'], ['акылман', 'wise'], ['кеңешчи', 'adviser'], ['чоро', 'companion-in-arms'], ['небере', 'grandchild'], ['тагдыр', 'fate'], ['баянда-', 'narrate'], ['оозеки', 'oral'], ['муун', 'generation'], ['сап', 'line (of verse)'], ['ар-намыс', 'honour, dignity'], ['үчилтик', 'trilogy'], ['мурас', 'heritage']],
    quiz: [
      { t: 'mc', q: 'How many parts does the epic have?', o: ['Three', 'Forty', 'One', 'Seven'], why: '[[үч бөлүктөн турат]].' },
      { t: 'mc', q: 'Who is Semetei?', o: ['Manas’s son', 'Manas’s wife', 'Manas’s enemy', 'A manaschy'], why: '[[Манастын уулу Семетей]].' },
      { t: 'mc', q: 'How was the epic passed down for centuries?', o: ['Orally, by manaschy', 'In printed books', 'On stone tablets', 'In songs on the radio'], why: '[[оозеки түрдө… манасчылар аркылуу]].' },
      { t: 'mc', q: 'What happened in 2013?', o: ['UNESCO listed the epic trilogy as intangible heritage.', 'The epic was first written down.', 'A film about Manas was made.', 'The epic was translated into English.'], why: 'The trilogy was added to UNESCO’s list.' }
    ]
  }
];
