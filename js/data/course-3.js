/* Stage 3 — Real sentences (A1+) */
window.COURSE.stages.push({
  n: 3, title: 'Real sentences', kg: 'Чыныгы сүйлөмдөр', level: 'A1+',
  blurb: 'Verbs in the present and future, saying “don’t”, and the six cases — the endings for in, to, from, of and “the”. After this stage you can build almost any simple sentence.',
  lessons: [
    {
      id: 'present', title: 'Doing things: present & future', kg: 'Мен чай ичем', minutes: 35,
      goals: ['Conjugate any verb in the present–future', 'Know the 20 most useful verbs', 'Say what you do and what you will do'],
      blocks: [
        { t: 'h', text: 'One form, two times' },
        { t: 'eli5', html: 'English has three ways to talk about now and later: “I go”, “I will go”, “I’m going to go”. Kyrgyz uses <b>one</b> form for “I go” and “I will go”. Words like [[эртең]] (tomorrow) or [[күн сайын]] (every day) tell you which.' },
        { t: 'compare', en: 'I drink tea. / I will drink tea.', kg: 'Мен чай ич|е|м.', gloss: 'I tea drink-(now/later)-I' },
        { t: 'compare', en: 'We’ll go to Bishkek tomorrow.', kg: 'Биз эртең Бишкекке бар|а|быз.', gloss: 'we tomorrow Bishkek-to go-(later)-we' },
        { t: 'h', text: 'How to build it' },
        { t: 'p', html: 'Every verb starts from its <b>stem</b> — the shortest form, which is also the friendly command: [[бар!]] (go!), [[оку!]] (read!). Dictionaries list verbs with [[-уу/-үү]]: [[баруу]], [[окуу]]. Take that off to find the stem.' },
        { t: 'list', items: ['Stem ends in a consonant → add the wide vowel [[а / е / о / ө]], then the person ending: [[бар|а|м]], [[кел|е|м]], [[көр|ө|м]].', 'Stem ends in a vowel → add [[й]], then the person ending: [[оку|й|м]], [[иште|й|м]].', '“They” adds [[-ыш-]] before the ending and uses [[-т]]: [[бар|ыш|а|т]], [[оку|ш|а|т]].'] },
        { t: 'table', cols: ['', 'бар- (go)', 'кел- (come)', 'оку- (read)', 'иште- (work)'], rows: [
          ['мен', '[[бар|а|м]]', '[[кел|е|м]]', '[[оку|й|м]]', '[[иште|й|м]]'], ['сен', '[[бар|а|сың]]', '[[кел|е|сиң]]', '[[оку|й|суң]]', '[[иште|й|сиң]]'], ['сиз', '[[бар|а|сыз]]', '[[кел|е|сиз]]', '[[оку|й|суз]]', '[[иште|й|сиз]]'], ['ал', '[[бар|а|т]]', '[[кел|е|т]]', '[[оку|й|т]]', '[[иште|й|т]]'],
          ['биз', '[[бар|а|быз]]', '[[кел|е|биз]]', '[[оку|й|буз]]', '[[иште|й|биз]]'], ['силер', '[[бар|а|сыңар]]', '[[кел|е|сиңер]]', '[[оку|й|суңар]]', '[[иште|й|сиңер]]'], ['сиздер', '[[бар|а|сыздар]]', '[[кел|е|сиздер]]', '[[оку|й|суздар]]', '[[иште|й|сиздер]]'], ['алар', '[[бар|ыш|а|т]]', '[[кел|иш|е|т]]', '[[оку|ш|а|т]]', '[[иште|ш|е|т]]']] },
        { t: 'tip', title: 'Same endings as “to be”', html: 'Look: [[-сың]], [[-сыз]], [[-быз]], [[-сыңар]] — they’re the “to be” endings from lesson 2.2. Only “I” ([[-м]]) and “he/she” ([[-т]]) are new. You already know most of this table.' },
        { t: 'tip', title: 'Long and short endings', html: 'In books, news and careful speech you’ll see the <b>full</b> endings: [[барамын]] (I go), [[окуймун]], [[жазамын]]. In everyday speech the end gets clipped: [[барам]], [[окуйм]], [[жазам]]. Both are correct — this course teaches the short spoken forms, so don’t be surprised by the long ones in a textbook.' },
        { t: 'tip', title: '“Does he…?” loses its т', html: 'When you add the question ending to a “he / she / they” verb, the final [[-т]] drops: [[барат]] → [[бара|бы?]] (is he going?), [[келет]] → [[келе|би?]], [[иштейт]] → [[иштей|би?]]. Never “баратпы”.' },
        { t: 'warn', title: 'п → б, к → г again', html: 'If the stem ends in [[п]] or [[к]], it softens before the vowel: [[тап]] (find) → [[таб|а|м]], [[чык]] (go out) → [[чыг|а|м]], [[ук]] (hear) → [[уг|а|м]].' },
        { t: 'h', text: '20 verbs to know by heart' },
        { t: 'vocab', items: [['бар-', 'go'], ['кел-', 'come'], ['же-', 'eat', 'vowel stem: [[жейм]], [[жейсиң]], [[жейт]]'], ['ич-', 'drink'], ['оку-', 'read; study'], ['жаз-', 'write'], ['сүйлө-', 'speak'], ['түшүн-', 'understand'], ['бил-', 'know'], ['иште-', 'work'], ['жаша-', 'live'], ['көр-', 'see'], ['ук-', 'hear', 'soft: [[угам]]'], ['ал-', 'take; get'], ['бер-', 'give'], ['сатып ал-', 'buy', '“sell-take” — you take by paying'], ['укта-', 'sleep'], ['тур-', 'stand; get up; live (somewhere)'], ['үйрөн-', 'learn'], ['жакшы көр-', 'like, love', '“see as good”']] },
        { t: 'ex', items: [['Сиз кыргызча сүйлө|й|сүз|бү?', 'Do you speak Kyrgyz?'], ['Мен бир аз сүйлө|й|мүн.', 'I speak a little.', 'бир аз = a little'], ['Биз Бишкекте жаша|й|быз.', 'We live in Bishkek.'], ['Ал эртең кел|е|т.', 'She’ll come tomorrow.'], ['Алар англисче жакшы сүйлө|ш|ө|т.', 'They speak English well.'], ['Мен кофе ич|е|м, ал чай ич|е|т.', 'I drink coffee, he drinks tea.'], ['Мен кыргыз тилин үйрөн|ө|м.', 'I’m learning Kyrgyz.']] },
        { t: 'tip', title: 'Use the machine', html: 'Open the <a href="#machine">suffix machine</a> → Verbs → Present–future and type any stem. It shows every person.' }
      ],
      quiz: [
        { t: 'mc', q: '“I come.”', o: ['[[Мен келем.]]', '[[Мен келим.]]', '[[Мен келет.]]', '[[Мен келмин.]]'], why: 'кел + е + м.' },
        { t: 'mc', q: '“She reads.”', o: ['[[Ал окуйт.]]', '[[Ал окуут.]]', '[[Ал окуйм.]]', '[[Ал окуат.]]'], why: 'Vowel stem: оку + й + т.' },
        { t: 'mc', q: '“They work.”', o: ['[[Алар иштешет.]]', '[[Алар иштейт.]]', '[[Алар иштейшет.]]', '[[Алар иштейбиз.]]'], why: 'иште + ш + е + т.' },
        { t: 'mc', q: '[[Мен эртең барам]] means…', o: ['I will go tomorrow.', 'I went yesterday.', 'I am going now.', 'I must go tomorrow.'], why: 'The present–future plus [[эртең]] = future.' },
        { t: 'mc', q: '“You (polite) know.”', o: ['[[Сиз билесиз.]]', '[[Сиз биласыз.]]', '[[Сиз билисиз.]]', '[[Сиз билет.]]'], why: 'бил + е + сиз.' },
        { t: 'mc', q: '“I hear.” (stem ук-)', o: ['[[Мен угам.]]', '[[Мен укам.]]', '[[Мен укем.]]', '[[Мен угем.]]'], why: 'к → г before a vowel.' },
        { t: 'type', q: 'Type: “We live in Bishkek.” (live = жаша-)', a: ['Биз Бишкекте жашайбыз'], why: 'жаша + й + быз.' },
        { t: 'type', q: 'Type: “I drink tea.”', a: ['Мен чай ичем', 'Чай ичем'], why: 'Object before the verb.' },
        { t: 'order', q: 'Build: “Do you (polite) speak Kyrgyz?”', a: 'Сиз кыргызча сүйлөйсүзбү', extra: ['сүйлөйм'], why: 'You Kyrgyz-ly speak-you-?' },
        { t: 'mc', q: 'What does [[сатып ал-]] mean?', o: ['buy', 'sell', 'take back', 'pay'], why: '“Sell-take”: buy.' }
      ]
    },
    {
      id: 'dont', title: 'I don’t: negative verbs', kg: 'Түшүнбөйм', minutes: 30,
      goals: ['Make any verb negative', 'Say “I don’t understand” and “I don’t know”', 'Ask “Do you…?” with verbs'],
      blocks: [
        { t: 'h', text: 'The “not” piece' },
        { t: 'eli5', html: 'To say “don’t”, Kyrgyz slips a little “not” piece right after the verb stem: [[-ба]]. Then comes [[й]] and the person. It’s like putting a “NO” sign in the middle of the train, between the engine (the verb) and the last carriage (the person).' },
        { t: 'compare', en: 'I don’t go.', kg: 'Мен бар|ба|й|м.', gloss: 'I go-not-(now)-I' },
        { t: 'compare', en: 'I don’t understand.', kg: 'Түшүн|бө|й|м.', gloss: 'understand-not-(now)-I', note: 'The most useful sentence for any learner. Say it with a smile.' },
        { t: 'table', cols: ['After…', 'not-piece', 'Examples'], rows: [['a vowel or voiced consonant', '[[-ба / -бе / -бо / -бө]]', '[[бар|ба|й|м]], [[кел|бе|й|м]], [[оку|ба|й|м]], [[сүйлө|бө|й|м]]'], ['a voiceless consonant (к п с т ч ш)', '[[-па / -пе / -по / -пө]]', '[[ич|пе|й|м]], [[кет|пе|й|м]], [[тап|па|й|м]]']] },
        { t: 'table', cols: ['', 'бар- (go)', 'бил- (know)', 'оку- (read)'], rows: [['мен', '[[бар|ба|й|м]]', '[[бил|бе|й|м]]', '[[оку|ба|й|м]]'], ['сен', '[[бар|ба|й|сың]]', '[[бил|бе|й|сиң]]', '[[оку|ба|й|сың]]'], ['сиз', '[[бар|ба|й|сыз]]', '[[бил|бе|й|сиз]]', '[[оку|ба|й|сыз]]'], ['ал', '[[бар|ба|й|т]]', '[[бил|бе|й|т]]', '[[оку|ба|й|т]]'], ['биз', '[[бар|ба|й|быз]]', '[[бил|бе|й|биз]]', '[[оку|ба|й|быз]]'], ['силер', '[[бар|ба|й|сыңар]]', '[[бил|бе|й|сиңер]]', '[[оку|ба|й|сыңар]]'], ['алар', '[[бар|ыш|па|й|т]]', '[[бил|иш|пе|й|т]]', '[[оку|ш|па|й|т]]']], caption: 'After the not-piece the vowel is fixed, so endings follow it: [[окубайсың]], not “окубайсуң”.' },
        { t: 'h', text: 'Asking with verbs' },
        { t: 'p', html: 'Add the question sticker [[-бы]] at the very end, as always:' },
        { t: 'ex', items: [['Түшүн|ө|сүз|бү?', 'Do you understand?'], ['Бил|е|сиз|би?', 'Do you know?'], ['Чай ич|е|сиң|би?', 'Will you drink tea? / Do you want tea?'], ['Эт же|й|сиз|би?', 'Do you eat meat?'], ['Эртең кел|е|сиз|би?', 'Will you come tomorrow?']] },
        { t: 'h', text: 'Survival phrases' },
        { t: 'vocab', items: [['Түшүнбөйм.', 'I don’t understand.'], ['Түшүнбөй жатам.', 'I’m not understanding (right now).', 'softer, very common'], ['Билбейм.', 'I don’t know.'], ['Кыргызча жакшы сүйлөбөйм.', 'I don’t speak Kyrgyz well.'], ['Жайыраак сүйлөңүзчү.', 'Please speak more slowly.'], ['Кайталап коюңузчу.', 'Please repeat that.'], ['Эт жебейм.', 'I don’t eat meat.'], ['Арак ичпейм.', 'I don’t drink vodka / alcohol.'], ['Тамеки чекпейм.', 'I don’t smoke.']] },
        { t: 'warn', title: 'Culture: refusing food', html: 'Kyrgyz hosts insist — three refusals are normal before they believe you. A polite way out: [[Рахмат, тоюп калдым]] — “Thanks, I’m full.” Hand on heart helps.' }
      ],
      quiz: [
        { t: 'mc', q: '“I don’t know.”', o: ['[[Билбейм.]]', '[[Билпейм.]]', '[[Билбайм.]]', '[[Билемэмес.]]'], why: 'бил + бе + й + м.' },
        { t: 'mc', q: '“I don’t drink.”', o: ['[[Ичпейм.]]', '[[Ичбейм.]]', '[[Ичбайм.]]', '[[Ичем жок.]]'], why: 'ч is voiceless → -пе.' },
        { t: 'mc', q: '“He doesn’t come.”', o: ['[[Ал келбейт.]]', '[[Ал келбейм.]]', '[[Ал келет эмес.]]', '[[Ал келпейт.]]'], why: 'кел + бе + й + т.' },
        { t: 'mc', q: '“Do you understand?” (polite)', o: ['[[Түшүнөсүзбү?]]', '[[Түшүнбөйсүзбү?]]', '[[Түшүнөсүз?]]', '[[Сиз түшүнөбү?]]'], why: 'түшүн + ө + сүз + бү.' },
        { t: 'mc', q: '“I don’t speak Kyrgyz well.”', o: ['[[Кыргызча жакшы сүйлөбөйм.]]', '[[Кыргызча жакшы сүйлөбайм.]]', '[[Кыргызча жакшы эмес сүйлөйм.]]', '[[Кыргызча жакшы сүйлөйм жок.]]'], why: 'сүйлө + бө + й + м.' },
        { t: 'mc', q: 'How do you ask someone to speak slowly?', o: ['[[Жайыраак сүйлөңүзчү.]]', '[[Кайталап коюңузчу.]]', '[[Түшүнбөйм.]]', '[[Билбейм.]]'], why: 'жай = slow, -ыраак = more.' },
        { t: 'type', q: 'Type: “I don’t understand.”', a: ['Түшүнбөйм', 'Мен түшүнбөйм'], why: 'түшүн + бө + й + м.' },
        { t: 'type', q: 'Type: “I don’t eat meat.”', a: ['Эт жебейм', 'Мен эт жебейм'], why: 'же + бе + й + м.' },
        { t: 'order', q: 'Build: “Will you come tomorrow?” (polite)', a: 'Эртең келесизби', extra: ['келбейм'], why: 'tomorrow come-you-?' }
      ]
    },
    {
      id: 'in-and-to', title: 'In, at, to: locative and dative', kg: 'Үйдө, үйгө', minutes: 35,
      goals: ['Say where something is: -да', 'Say where you’re going: -га', 'Say who you give things to'],
      blocks: [
        { t: 'h', text: 'Cases: little words become endings' },
        { t: 'eli5', html: 'English uses little words in front: <b>in</b> the house, <b>to</b> the house. Kyrgyz puts them at the back as endings. Kyrgyz has six of these “role” endings, called <b>cases</b>. Today: the two most common. Think of them as pins on a map: [[-да]] = “I’m standing <b>at</b> the pin”, [[-га]] = “I’m walking <b>to</b> the pin”.' },
        { t: 'h', text: 'Locative -да: in, at, on' },
        { t: 'compare', en: 'I live in Bishkek.', kg: 'Мен Бишкек|те жаша|й|м.', gloss: 'I Bishkek-in live-I' },
        { t: 'compare', en: 'The book is on the table.', kg: 'Китеп стол|до.', gloss: 'book table-on', note: 'One ending for in, at <i>and</i> on. Kyrgyz doesn’t care whether it’s inside or on top — just “there”.' },
        { t: 'table', cols: ['Word ends in…', 'Ending', 'Examples'], rows: [['a vowel or voiced consonant', '[[-да / -де / -до / -дө]]', '[[бала|да]], [[үй|дө]], [[стол|до]], [[шаар|да]]'], ['a voiceless consonant', '[[-та / -те / -то / -тө]]', '[[мектеп|те]], [[Бишкек|те]], [[Ош|то]], [[иш|те]] (at work)']] },
        { t: 'p', html: 'Add a “to be” ending to say where someone <i>is</i>:' },
        { t: 'ex', items: [['Мен үй|дө|мүн.', 'I’m at home.'], ['Сиз кайда|сыз?', 'Where are you?'], ['Ал иш|те.', 'She’s at work.'], ['Биз базар|да|быз.', 'We’re at the bazaar.'], ['Ажаткана кайда?', 'Where is the toilet?']] },
        { t: 'h', text: 'Dative -га: to, for' },
        { t: 'compare', en: 'I’m going to the bazaar.', kg: 'Мен базар|га бар|а|м.', gloss: 'I bazaar-to go-I' },
        { t: 'table', cols: ['Word ends in…', 'Ending', 'Examples'], rows: [['a vowel or voiced consonant', '[[-га / -ге / -го / -гө]]', '[[бала|га]], [[үй|гө]], [[тоо|го]], [[шаар|га]]'], ['a voiceless consonant', '[[-ка / -ке / -ко / -кө]]', '[[мектеп|ке]], [[Бишкек|ке]], [[Ош|ко]], [[иш|ке]] (to work)']] },
        { t: 'p', html: 'The dative also marks <b>who receives</b> something — English “to” or “for”:' },
        { t: 'ex', items: [['Мага суу бериңизчи.', 'Please give me water.', 'to-me water give-please'], ['Досу|ма кат жаз|а|м.', 'I’ll write a letter to my friend.'], ['Апа|ма белек сатып ал|а|м.', 'I’ll buy a present for my mum.'], ['Сага рахмат!', 'Thanks to you! / Thank you!']] },
        { t: 'warn', title: 'Pronouns are special', html: 'The pronouns have their own dative forms: [[мага]] (to me), [[сага]] (to you), [[ага]] (to him/her), [[бизге]] (to us), [[сизге]] (to you, polite), [[аларга]] (to them). And after “my/your” the dative is just a vowel: [[атам]] → [[ата|м|а]] “to my father”.' },
        { t: 'h', text: 'Where vs where to' },
        { t: 'p', html: '[[кайда]] covers both “where?” and “where to?” in speech. To be precise, “where to” can be [[кайда]] or [[кайсы жакка]].' },
        { t: 'dialog', title: 'On the phone', lines: [['Азамат', 'Алло, сен кайдасың?', 'Hello, where are you?'], ['Бермет', 'Мен иштемин. Сен кайдасың?', 'I’m at work. Where are you?'], ['Азамат', 'Мен үйдөмүн. Кечинде кафеге барабызбы?', 'I’m at home. Shall we go to a café this evening?'], ['Бермет', 'Мейли! Кайсы кафеге?', 'OK! Which café?'], ['Азамат', 'Борбордогу кафеге. Саат жетиде.', 'The café in the centre. At seven.']] },
        { t: 'vocab', items: [['стол', 'table'], ['кафе', 'café'], ['борбор', 'centre; capital city'], ['ажаткана', 'toilet'], ['мейманкана', 'hotel'], ['оорукана', 'hospital', '“sick-house”'], ['китепкана', 'library', '“book-house” — -кана = place for'], ['банк', 'bank'], ['аэропорт', 'airport'], ['белек', 'gift, present']] }
      ],
      quiz: [
        { t: 'mc', q: '“at home”', o: ['[[үйдө]]', '[[үйгө]]', '[[үйдөн]]', '[[үйдү]]'], why: 'Locative: үй + дө.' },
        { t: 'mc', q: '“to school”', o: ['[[мектепке]]', '[[мектепге]]', '[[мектепте]]', '[[мектепка]]'], why: 'п is voiceless → к; е → е.' },
        { t: 'mc', q: '“in Osh”', o: ['[[Ошто]]', '[[Ошдо]]', '[[Ошта]]', '[[Ошко]]'], why: 'ш voiceless → т; о → о.' },
        { t: 'mc', q: '“to the mountain”', o: ['[[тоого]]', '[[тоога]]', '[[тоодо]]', '[[тоодон]]'], why: 'vowel → г; о → о.' },
        { t: 'mc', q: '“Give me water, please.”', o: ['[[Мага суу бериңизчи.]]', '[[Менге суу бериңизчи.]]', '[[Мени суу бериңизчи.]]', '[[Менде суу бериңизчи.]]'], why: 'The dative of мен is мага.' },
        { t: 'mc', q: '“I’m at work.”', o: ['[[Мен иштемин.]]', '[[Мен ишкемин.]]', '[[Мен иштедемин.]]', '[[Мен ишмин.]]'], why: 'иш + те + мин.' },
        { t: 'type', q: 'Type: “I live in Bishkek.”', a: ['Мен Бишкекте жашайм', 'Бишкекте жашайм'], why: 'Бишкек + те.' },
        { t: 'type', q: 'Type: “I’m going to the bazaar.”', a: ['Мен базарга барам', 'Базарга барам'], why: 'базар + га.' },
        { t: 'order', q: 'Build: “Where is the toilet?”', a: 'Ажаткана кайда', extra: ['кайдан'], why: 'toilet where.' },
        { t: 'mc', q: 'What does [[китепкана]] mean?', o: ['library', 'bookshop', 'school', 'notebook'], why: 'китеп (book) + кана (place).' }
      ]
    },
    {
      id: 'from-and-of', title: 'From and of: ablative and genitive', kg: 'Каяктан? Кимдин?', minutes: 35,
      goals: ['Say where something comes from: -дан', 'Say whose something is: -нын + -ы', 'Make compound nouns like кыргыз тили'],
      blocks: [
        { t: 'h', text: 'Ablative -дан: from' },
        { t: 'eli5', html: 'If [[-га]] is walking <i>to</i> the pin, [[-дан]] is walking <i>away from</i> it. It’s the locative [[-да]] with an extra [[н]] — imagine the н as a little push.' },
        { t: 'compare', en: 'I’m from London. (I came from London.)', kg: 'Мен Лондон|дон кел|ди|м.', gloss: 'I London-from came-I' },
        { t: 'table', cols: ['Word ends in…', 'Ending', 'Examples'], rows: [['a vowel or voiced consonant', '[[-дан / -ден / -дон / -дөн]]', '[[бала|дан]], [[үй|дөн]], [[Лондон|дон]], [[Англия|дан]]'], ['a voiceless consonant', '[[-тан / -тен / -тон / -төн]]', '[[мектеп|тен]], [[Бишкек|тен]], [[Ош|тон]], [[иш|тен]] (from work)']] },
        { t: 'p', html: 'Kyrgyz also uses “from” where English uses other words:' },
        { t: 'ex', items: [['Мен ит|тен корк|о|м.', 'I’m afraid of dogs.', 'I dog-from fear — fear comes “from” something'], ['Саат беш|тен баштап', 'starting from five o’clock'], ['Бишкек Ош|тон чоң.', 'Bishkek is bigger than Osh.', '“Bishkek, from Osh, big” — comparison uses from'], ['Ал мен|ден сурады.', 'He asked me.', 'you ask “from” someone']] },
        { t: 'h', text: 'Genitive -нын: of, ’s' },
        { t: 'eli5', html: 'Owning in Kyrgyz is a <b>double hook</b>. The owner gets one hook: [[-нын]] (like English ’s). The thing owned gets another hook: [[-ы]] (“its”). [[Айгүл|дүн китеб|и]] = “Aigul’s book-her”. Both hooks lock together.' },
        { t: 'compare', en: 'Aigul’s book', kg: 'Айгүл|дүн китеб|и', gloss: 'Aigul-’s book-her' },
        { t: 'compare', en: 'the capital of Kyrgyzstan', kg: 'Кыргызстан|дын борбор|у', gloss: 'Kyrgyzstan-of capital-its' },
        { t: 'table', cols: ['Word ends in…', 'Ending', 'Examples'], rows: [['a vowel', '[[-нын / -нин / -нун / -нүн]]', '[[бала|нын]], [[ата|нын]], [[тоо|нун]]'], ['a voiced consonant', '[[-дын / -дин / -дун / -дүн]]', '[[Айгүл|дүн]], [[үй|дүн]], [[адам|дын]]'], ['a voiceless consonant', '[[-тын / -тин / -тун / -түн]]', '[[мектеп|тин]], [[Бишкек|тин]], [[дос|тун]]']] },
        { t: 'ex', items: [['Бул ким|дин сумка|сы?', 'Whose bag is this?'], ['Бул Азамат|тын сумка|сы.', 'This is Azamat’s bag.'], ['Досум|дун ат|ы Бакыт.', 'My friend’s name is Bakyt.'], ['Кыргызстан|дын борбор|у — Бишкек.', 'The capital of Kyrgyzstan is Bishkek.'], ['Үй|дүн эшиг|и', 'the door of the house']] },
        { t: 'h', text: 'Compound nouns: one hook only' },
        { t: 'p', html: 'When it’s a <i>kind</i> of thing rather than a specific owner, drop the first hook and keep only [[-ы]]:' },
        { t: 'ex', items: [['кыргыз тил|и', 'the Kyrgyz language', 'Kyrgyz language-its'], ['Бишкек шаар|ы', 'the city of Bishkek'], ['англис тил|и', 'the English language'], ['автобус аялдама|сы', 'bus stop', 'bus stop-its'], ['туулган күн|ү', 'birthday', 'born day-its']] },
        { t: 'tip', title: 'Ask “whose?”', html: '[[кимдин]] = whose. Answer by replacing it with a name + [[-нын]]: [[Кимдин үйү?]] → [[Айгүлдүн үйү.]] Same seat rule as always.' },
        { t: 'vocab', items: [['корк-', 'be afraid (of = -дан)'], ['сура-', 'ask (someone = -дан)'], ['сумка', 'bag'], ['эшик', 'door'], ['терезе', 'window'], ['аялдама', 'bus stop'], ['туулган күн', 'birthday'], ['англис тили', 'English (language)'], ['кимдин', 'whose'], ['баштап', 'starting (from)']] }
      ],
      quiz: [
        { t: 'mc', q: '“from the house”', o: ['[[үйдөн]]', '[[үйдөн тан]]', '[[үйгө]]', '[[үйтөн]]'], why: 'й voiced → д; ү → ө.' },
        { t: 'mc', q: '“from Bishkek”', o: ['[[Бишкектен]]', '[[Бишкекден]]', '[[Бишкектан]]', '[[Бишкекке]]'], why: 'к voiceless → т.' },
        { t: 'mc', q: '“Aigul’s book”', o: ['[[Айгүлдүн китеби]]', '[[Айгүлдүн китеп]]', '[[Айгүл китебим]]', '[[Айгүлдөн китеби]]'], why: 'Double hook: -дүн + -и.' },
        { t: 'mc', q: '“Whose bag is this?”', o: ['[[Бул кимдин сумкасы?]]', '[[Бул ким сумка?]]', '[[Бул кимден сумкасы?]]', '[[Бул кимге сумка?]]'], why: 'кимдин … -сы.' },
        { t: 'mc', q: '“I’m afraid of dogs.”', o: ['[[Мен иттен корком.]]', '[[Мен итке корком.]]', '[[Мен итти корком.]]', '[[Мен итте корком.]]'], why: 'Fear takes “from”.' },
        { t: 'mc', q: '“the Kyrgyz language”', o: ['[[кыргыз тили]]', '[[кыргыздын тил]]', '[[кыргыз тил]]', '[[кыргыздын тилдери]]'], why: 'A compound noun: only -и.' },
        { t: 'type', q: 'Type: “the capital of Kyrgyzstan” (capital = борбор)', a: ['Кыргызстандын борбору'], why: 'Кыргызстан + дын, борбор + у.' },
        { t: 'type', q: 'Type: “from school”', a: ['мектептен'], why: 'п voiceless → т.' },
        { t: 'order', q: 'Build: “Bishkek is bigger than Osh.”', a: 'Бишкек Оштон чоң', extra: ['Ошко'], why: 'Bishkek Osh-from big.' }
      ]
    },
    {
      id: 'the-object', title: '“The” for objects: the accusative', kg: 'Китепти окуйм', minutes: 30,
      goals: ['Know when the object needs -ны', 'Use pronouns as objects: мени, сени, аны', 'Say “I love you”'],
      blocks: [
        { t: 'h', text: 'A pointing finger' },
        { t: 'eli5', html: 'Kyrgyz has no word for “the”. But when you do something to a <b>specific</b> thing — <i>this</i> book, <i>my</i> friend, <i>Aigul</i> — the object gets an ending that works like pointing your finger at it: [[-ны]]. If it’s any book, books in general, no finger.' },
        { t: 'compare', en: 'I read books. / I’ll read a book.', kg: 'Мен китеп оку|й|м.', gloss: 'I book read-I', note: 'Any book — no ending.' },
        { t: 'compare', en: 'I’ll read the book. (that specific one)', kg: 'Мен китеп|ти оку|й|м.', gloss: 'I book-THE read-I' },
        { t: 'h', text: 'The ending' },
        { t: 'table', cols: ['Word ends in…', 'Ending', 'Examples'], rows: [['a vowel', '[[-ны / -ни / -ну / -нү]]', '[[бала|ны]], [[алма|ны]], [[эне|ни]], [[тоо|ну]]'], ['a voiced consonant', '[[-ды / -ди / -ду / -дү]]', '[[үй|дү]], [[Айгүл|дү]], [[кол|ду]], [[адам|ды]]'], ['a voiceless consonant', '[[-ты / -ти / -ту / -тү]]', '[[китеп|ти]], [[ат|ты]], [[дос|ту]], [[сүт|тү]]']], caption: 'Same first letters as the genitive: н / д / т. The genitive just has an extra н at the end.' },
        { t: 'h', text: 'When you must use it' },
        { t: 'list', items: ['Names of people and places: [[Айгүл|дү көр|ө|м]] (I’ll see Aigul), [[Бишкек|ти жакшы көр|ө|м]] (I love Bishkek).', 'Pronouns: always. See the table below.', 'Things with “my/your/his”: [[дос|ум|ду]] (my friend), [[китеб|иң|ди]] (your book).', 'Things with [[бул]], [[ошол]]: [[бул китеп|ти]] (this book).', 'Anything you and your listener both know about.'] },
        { t: 'table', cols: ['', 'me', 'you', 'you (pol.)', 'him/her', 'us', 'you all', 'them'], kg: [1, 2, 3, 4, 5, 6, 7], rows: [['object', 'мени', 'сени', 'сизди', 'аны', 'бизди', 'силерди', 'аларды']] },
        { t: 'ex', items: [['Мен сени сүй|ө|м.', 'I love you.', 'I you love-I'], ['Мен сизди түшүн|ө|м.', 'I understand you.'], ['Мен аны тааны|й|м.', 'I know him (I recognise him).'], ['Бул китеп|ти ал|ыңыз.', 'Take this book.'], ['Кыргыз тил|ин үйрөн|ө|м.', 'I’m learning the Kyrgyz language.', 'тили + н: after -ы the object ending is just -н'], ['Ата|сын жакшы көр|ө|т.', 'She loves her father.']] },
        { t: 'warn', title: 'After “his/her” it’s just -н', html: 'When a noun already has the [[-ы/-сы]] “his/her/its” ending, the object ending shrinks to [[-н]]: [[ата|сы|н]] (his father, as object), [[кыргыз тил|и|н]].' },
        { t: 'tip', title: 'Two verbs for “know”', html: '[[бил-]] = know a fact ([[Билем]] — I know). [[тааны-]] = know a person, recognise ([[Мен аны тааныйм]] — I know him). Like French <i>savoir</i> vs <i>connaître</i>.' },
        { t: 'vocab', items: [['сүй-', 'love (romantic, deep)'], ['тааны-', 'know (a person), recognise'], ['изде-', 'look for, search'], ['күт-', 'wait (for = accusative)', '[[Сизди күтөм]] — I’ll wait for you'], ['жолук-', 'meet (with = менен)'], ['чакыр-', 'invite, call'], ['жардам бер-', 'help (someone = dative)', '[[Мага жардам бериңизчи]] — please help me'], ['тап-', 'find']] }
      ],
      quiz: [
        { t: 'mc', q: '“I’ll read this book.”', o: ['[[Мен бул китепти окуйм.]]', '[[Мен бул китеп окуйм.]]', '[[Мен бул китепке окуйм.]]', '[[Мен бул китепте окуйм.]]'], why: 'Specific (this) → -ти.' },
        { t: 'mc', q: '“I love you.” (friendly)', o: ['[[Мен сени сүйөм.]]', '[[Мен сен сүйөм.]]', '[[Мен сага сүйөм.]]', '[[Мен сенин сүйөм.]]'], why: 'Pronoun object: сени.' },
        { t: 'mc', q: '“I see Aigul.”', o: ['[[Мен Айгүлдү көрөм.]]', '[[Мен Айгүл көрөм.]]', '[[Мен Айгүлгө көрөм.]]', '[[Мен Айгүлдүн көрөм.]]'], why: 'Names always take the object ending.' },
        { t: 'mc', q: '“I drink tea.” (tea in general)', o: ['[[Мен чай ичем.]]', '[[Мен чайды ичем.]]', '[[Мен чайга ичем.]]', '[[Мен чайда ичем.]]'], why: 'General object → no ending.' },
        { t: 'mc', q: '“I’m learning the Kyrgyz language.”', o: ['[[Кыргыз тилин үйрөнөм.]]', '[[Кыргыз тилини үйрөнөм.]]', '[[Кыргыз тилди үйрөнөм.]]', '[[Кыргыз тили үйрөнөм.]]'], why: 'After -и the object ending is just -н.' },
        { t: 'mc', q: '“I’ll wait for you.” (polite)', o: ['[[Сизди күтөм.]]', '[[Сизге күтөм.]]', '[[Сизден күтөм.]]', '[[Сиз күтөм.]]'], why: 'күт- takes the accusative.' },
        { t: 'type', q: 'Type the object form of [[дос]] (friend): “the friend”', a: ['досту'], why: 'с voiceless → т; о → у.' },
        { t: 'type', q: 'Type: “I understand you.” (polite)', a: ['Мен сизди түшүнөм', 'Сизди түшүнөм'], why: 'сизди + түшүнөм.' },
        { t: 'order', q: 'Build: “Please help me.”', a: 'Мага жардам бериңизчи', extra: ['мени'], why: 'жардам бер- takes the dative: мага.' }
      ]
    },
    {
      id: 'word-order', title: 'Building longer sentences', kg: 'Сүйлөм түзүү', minutes: 30,
      goals: ['Order who, when, where, what, verb', 'Link with and, with, or, but, because', 'Put the important word just before the verb'],
      blocks: [
        { t: 'h', text: 'The Kyrgyz sentence template' },
        { t: 'eli5', html: 'Think of a Kyrgyz sentence as a row of chairs, with the verb sitting in the last chair like a teacher at the front of the class. Everyone else sits in front of it, usually in this order:' },
        { t: 'table', cols: ['Who', 'When', 'Where', 'With whom / how', 'What', 'VERB'], rows: [['[[Мен]]', '[[эртең]]', '[[Бишкекте]]', '[[досум менен]]', '[[кино]]', '[[көрөм]]']], caption: '“I’ll watch a film with my friend in Bishkek tomorrow.” English almost reverses it.' },
        { t: 'compare', en: 'I’ll watch a film with my friend in Bishkek tomorrow.', kg: 'Мен эртең Бишкек|те дос|ум менен кино көр|ө|м.', gloss: 'I tomorrow Bishkek-in friend-my with film watch-I' },
        { t: 'h', text: 'The spotlight seat' },
        { t: 'p', html: 'The chair right before the verb is the <b>spotlight</b>. Whatever sits there is the new or important information. Move a word there to stress it — no need for English tricks like “It was <i>Aigul</i> who…”.' },
        { t: 'ex', items: [['Мен эртең Ошко бар|а|м.', 'I’m going to Osh tomorrow. (where? — Osh)'], ['Мен Ошко эртең бар|а|м.', 'I’m going to Osh tomorrow. (when? — tomorrow)'], ['Китепти ким окуйт?', 'Who will read the book?', 'question words love the spotlight']] },
        { t: 'h', text: 'Glue words' },
        { t: 'table', cols: ['Kyrgyz', 'English', 'Example'], kg: [0], rows: [['жана', 'and', '[[Мен жана досум]] — me and my friend'], ['менен', 'with; and (between nouns)', '[[чай менен нан]] — tea and bread'], ['же', 'or', '[[чай же кофе]] — tea or coffee'], ['бирок', 'but', '[[Кымбат, бирок жакшы.]] — Expensive, but good.'], ['анткени', 'because', '[[Барбайм, анткени убактым жок.]] — I won’t go because I have no time.'], ['ошондуктан', 'so, that’s why', '[[Ачкамын, ошондуктан тамак жейм.]]'], ['анан', 'then, and then', '[[Мен иштейм, анан үйгө барам.]]'], ['да / дагы', 'too, also', '[[Мен да барам.]] — I’ll go too.']] },
        { t: 'table', cols: ['Pattern', 'Meaning', 'Example'], rows: [['[[да … да]]', 'both … and', '[[Ал англисче да, кыргызча да сүйлөйт.]] — She speaks both English and Kyrgyz.'], ['[[да … да]] + negative verb', 'neither … nor', '[[Мен эт да, балык да жебейм.]] — I eat neither meat nor fish.'], ['[[же … же]]', 'either … or', '[[Же бүгүн, же эртең келем.]] — I’ll come either today or tomorrow.']] },
        { t: 'warn', title: '“And” between nouns', html: 'Kyrgyz often uses [[менен]] (with) where English says “and”: [[Айгүл менен Азамат]] = Aigul and Azamat. [[жана]] works too and sounds more formal.' },
        { t: 'h', text: 'Adjectives first, never changing' },
        { t: 'p', html: 'Adjectives go before the noun and never change — no plural, no case: [[чоң үй]] (big house), [[чоң үй|лөр]] (big houses), [[чоң үй|дө]] (in the big house). Only the last word in the group takes endings.' },
        { t: 'ex', items: [['Мен жаңы телефон сатып ал|а|м.', 'I’ll buy a new phone.'], ['Биз чоң үй|дө жаша|й|быз.', 'We live in a big house.'], ['Ал жакшы мугалим.', 'She’s a good teacher.'], ['Кымбат, бирок абдан даамдуу.', 'Expensive, but very tasty.']] },
        { t: 'vocab', items: [['жана', 'and'], ['менен', 'with'], ['же', 'or'], ['бирок', 'but'], ['анткени', 'because'], ['ошондуктан', 'so, therefore'], ['анан', 'then'], ['да', 'too, also'], ['кино', 'film, cinema'], ['тамак', 'food, meal'], ['абдан', 'very'], ['даамдуу', 'tasty']] }
      ],
      quiz: [
        { t: 'mc', q: 'Where does the verb go?', o: ['Last', 'Second', 'First', 'After the subject'], why: 'The teacher sits in the last chair.' },
        { t: 'mc', q: 'Which order is most natural?', o: ['[[Мен эртең Ошко барам.]]', '[[Мен барам эртең Ошко.]]', '[[Барам мен Ошко эртең.]]', '[[Ошко барам мен эртең.]]'], why: 'Who – when – where – verb.' },
        { t: 'mc', q: '“tea and bread”', o: ['[[чай менен нан]]', '[[чай бирок нан]]', '[[чай же нан]]', '[[чайдан нан]]'], why: '[[менен]] joins nouns.' },
        { t: 'mc', q: 'Which word means “but”?', o: ['[[бирок]]', '[[анткени]]', '[[анан]]', '[[же]]'], why: 'бирок = but.' },
        { t: 'mc', q: '“in the big houses”', o: ['[[чоң үйлөрдө]]', '[[чоңдор үйлөрдө]]', '[[чоңдо үйлөрдө]]', '[[үйлөрдө чоң]]'], why: 'Adjectives never change; only the noun takes endings.' },
        { t: 'mc', q: 'In [[Мен Ошко эртең барам]], which word is stressed as new information?', o: ['[[эртең]] (tomorrow)', '[[Ошко]] (to Osh)', '[[мен]] (I)', 'None'], why: 'The spotlight is right before the verb.' },
        { t: 'order', q: 'Build: “I’ll watch a film with my friend tomorrow.”', a: 'Мен эртең досум менен кино көрөм', why: 'who – when – with whom – what – verb.' },
        { t: 'order', q: 'Build: “I won’t go because I have no time.”', a: 'Барбайм анткени убактым жок', why: 'Clause, анткени, reason.' },
        { t: 'type', q: 'Type: “I’ll go too.” (too = да)', a: ['Мен да барам'], why: '[[да]] follows the word it adds to.' }
      ]
    },
    {
      id: 'time', title: 'Days, months and telling time', kg: 'Саат канча?', minutes: 35,
      goals: ['Name days, months and seasons', 'Ask and tell the time', 'Say when things happen'],
      blocks: [
        { t: 'h', text: 'The week' },
        { t: 'vocab', items: [['дүйшөмбү', 'Monday'], ['шейшемби', 'Tuesday'], ['шаршемби', 'Wednesday'], ['бейшемби', 'Thursday'], ['жума', 'Friday', 'also means “week”'], ['ишемби', 'Saturday'], ['жекшемби', 'Sunday'], ['апта', 'week']] },
        { t: 'tip', title: 'A pattern in the names', html: 'Monday to Thursday come from Persian numbers 2–5 + “шемби”: [[дүйшөмбү]] (2), [[шейшемби]] (3), [[шаршемби]] (4), [[бейшемби]] (5). [[ишемби]] is Persian “shanbe” (Saturday) itself, and [[жекшемби]] is “one + шемби”. Friday, [[жума]], is the Muslim day of gathering.' },
        { t: 'p', html: '“On Monday” = locative: [[дүйшөмбү|дө]], [[жума|да]], [[жекшемби|де]].' },
        { t: 'h', text: 'Today, tomorrow, yesterday' },
        { t: 'vocab', items: [['бүгүн', 'today'], ['эртең', 'tomorrow'], ['кечээ', 'yesterday'], ['бүрсүгүнү', 'the day after tomorrow'], ['азыр', 'now'], ['эртең менен', 'in the morning', 'also “tomorrow morning” — context decides'], ['түштө', 'at noon'], ['түштөн кийин', 'in the afternoon'], ['кечинде', 'in the evening'], ['түнү', 'at night'], ['күн сайын', 'every day'], ['ар дайым', 'always']] },
        { t: 'h', text: 'Months' },
        { t: 'p', html: 'Kyrgyz has its own traditional month names, used on official calendars and in the media. In everyday speech, especially in cities, many people use the Russian names ([[январь]], [[февраль]]…). Learn to recognise both.' },
        { t: 'table', cols: ['Kyrgyz', 'Month', 'Meaning'], kg: [0], rows: [['Үчтүн айы', 'January', 'month of the three (stars)'], ['Бирдин айы', 'February', 'month of the one'], ['Жалган куран', 'March', '“false” young roe deer'], ['Чын куран', 'April', '“true” young roe deer'], ['Бугу', 'May', 'deer'], ['Кулжа', 'June', 'wild ram'], ['Теке', 'July', 'mountain goat'], ['Баш оона', 'August', 'beginning of autumn'], ['Аяк оона', 'September', 'end of …'], ['Тогуздун айы', 'October', 'month of the nine'], ['Жетинин айы', 'November', 'month of the seven'], ['Бештин айы', 'December', 'month of the five']], caption: 'Names come from nomadic life: animals and the stars of the Pleiades. Meanings are approximate.' },
        { t: 'h', text: 'Seasons' },
        { t: 'vocab', items: [['жаз', 'spring', '“in spring”: [[жазында]]'], ['жай', 'summer', '[[жайында]]'], ['күз', 'autumn', '[[күзүндө]]'], ['кыш', 'winter', '[[кышында]]']] },
        { t: 'h', text: 'What time is it?' },
        { t: 'compare', en: 'What time is it?', kg: 'Саат канча?', gloss: 'hour how.much' },
        { t: 'compare', en: 'It’s three o’clock.', kg: 'Саат үч.', gloss: 'hour three' },
        { t: 'ex', items: [['Саат үч жарым.', '3:30', '“three and a half”'], ['Саат бештен он мүнөт өттү.', '5:10', '“from five ten minutes passed”'], ['Саат алтыга он беш мүнөт калды.', '5:45', '“to six fifteen minutes remain”'], ['Саат он экиде', 'at twelve o’clock', 'locative = at']] },
        { t: 'eli5', html: 'Telling time is a little story. Minutes <b>after</b>: they’ve walked away “from” the hour → [[бештен … өттү]] (from five … passed). Minutes <b>before</b>: they still have to walk “to” the hour → [[алтыга … калды]] (to six … remain).' },
        { t: 'ex', title: 'Quarters, morning and evening', items: [['Саат төрттөн чейрек өттү.', '4:15', '“from four a quarter passed” — [[чейрек]] = quarter'], ['Саат бешке чейрек калды.', '4:45', '“to five a quarter remains”'], ['эртең мененки саат жетиде', 'at 7 a.m.', 'Kyrgyz says “morning” or “evening” instead of a.m. / p.m.'], ['кечки саат жетиде', 'at 7 p.m.']] },
        { t: 'h', text: 'Dates and years' },
        { t: 'p', html: 'Dates and years are read as <b>ordinal</b> numbers (“the 31st”), written with a hyphen: [[31-август]] is read [[отуз биринчи август]]. Add [[-да]] for “on”, and use [[жылы]] (“in the year of”) for years:' },
        { t: 'ex', items: [['31-августта', 'on 31 August', 'отуз биринчи августта'], ['1991-жылы', 'in 1991', 'миң тогуз жүз токсон биринчи жылы'], ['Мен 1995-жылы туулгам.', 'I was born in 1995.'], ['Бүгүн айдын нечеси?', 'What’s the date today?', '“today, the month’s how-many-th?”'], ['Бүгүн 19-ноябрь.', 'Today is 19 November.', 'он тогузунчу ноябрь']] },
        { t: 'dialog', title: 'Making plans', lines: [['Бермет', 'Сен ишембиде бошсуңбу?', 'Are you free on Saturday?'], ['Tom', 'Ооба, бошмун. Эмне?', 'Yes, I’m free. Why?'], ['Бермет', 'Биз тоого барабыз. Сен да келесиңби?', 'We’re going to the mountains. Will you come too?'], ['Tom', 'Албетте! Саат канчада?', 'Of course! At what time?'], ['Бермет', 'Эртең менен саат сегизде.', 'At eight in the morning.']] },
        { t: 'vocab', items: [['саат', 'hour; clock; o’clock'], ['мүнөт', 'minute'], ['жарым', 'half'], ['өттү', 'passed'], ['калды', 'remained'], ['жыл', 'year'], ['ай', 'month; moon'], ['албетте', 'of course'], ['Саат канчада?', 'At what time?']] }
      ],
      quiz: [
        { t: 'mc', q: 'What day is [[жума]]?', o: ['Friday', 'Monday', 'Sunday', 'Thursday'], why: 'жума = Friday (and “week”).' },
        { t: 'mc', q: '“on Monday”', o: ['[[дүйшөмбүдө]]', '[[дүйшөмбүгө]]', '[[дүйшөмбүдөн]]', '[[дүйшөмбү]]'], why: 'Locative = on/at for time.' },
        { t: 'mc', q: 'What does [[кечээ]] mean?', o: ['yesterday', 'evening', 'tomorrow', 'late'], why: 'кечээ = yesterday.' },
        { t: 'mc', q: '[[Саат төрт жарым]] is…', o: ['4:30', '4:15', '3:30', '4:45'], why: 'four and a half.' },
        { t: 'mc', q: '[[Саат экиден беш мүнөт өттү]] is…', o: ['2:05', '1:55', '2:50', '5:02'], why: 'From two, five minutes passed.' },
        { t: 'mc', q: 'How do you ask the time?', o: ['[[Саат канча?]]', '[[Канча саат?]]', '[[Саат кайда?]]', '[[Убакыт ким?]]'], why: 'hour how-much.' },
        { t: 'mc', q: '“in winter”', o: ['[[кышында]]', '[[кыштын]]', '[[кышка]]', '[[кыштан]]'], why: 'Seasons use the possessive + locative: кыш-ын-да.' },
        { t: 'type', q: 'Type: “today”', a: ['бүгүн'], why: 'бүгүн.' },
        { t: 'type', q: 'Type: “at eight o’clock” (eight = сегиз)', a: ['саат сегизде'], why: 'сегиз + де.' },
        { t: 'order', q: 'Build: “Are you free on Saturday?” (friendly)', a: 'Сен ишембиде бошсуңбу', why: 'you Saturday-on free-are.you-?' }
      ]
    }
  ]
});
