/* Stage 2 — A1 Survival Kyrgyz */
window.COURSE = window.COURSE || { stages: [] };

window.COURSE.stages.push({
  n: 2, title: 'Survival Kyrgyz', kg: 'Алгачкы кадамдар', level: 'A1',
  blurb: 'Greet people politely, say who you are, ask simple questions, count money, and talk about what you have — with “to be” endings, plurals and “my/your” endings.',
  lessons: [
    {
      id: 'hello', title: 'Hello, thank you, goodbye', kg: 'Саламатсызбы!', minutes: 25,
      goals: ['Greet people politely and casually', 'Ask “how are you?” and answer', 'Say your name and goodbye'],
      blocks: [
        { t: 'h', text: 'Two hellos' },
        { t: 'eli5', html: 'Kyrgyz has a “jeans” hello and a “suit” hello. [[Салам!]] is jeans — for friends. [[Саламатсызбы!]] is the suit — for everyone else. When in doubt, wear the suit.' },
        { t: 'compare', en: 'Hello! (polite)', kg: 'Саламат|сыз|бы!', gloss: 'healthy - you(polite) - ?', note: 'Literally “Are you healthy?” — a greeting that is really a little wish for your health. The friendly version is [[Саламатсыңбы?]].' },
        { t: 'vocab', items: [['Салам!', 'Hi! (friendly)'], ['Саламатсызбы!', 'Hello! (polite)'], ['Ассалоому алейкум!', 'Peace be upon you — traditional greeting, common between men', 'Reply: [[Алейкум ассалам!]]'], ['Кутман таң!', 'Good morning!'], ['Кутман кеч!', 'Good evening!'], ['Бейпил түн!', 'Good night!']] },
        { t: 'h', text: 'How are you?' },
        { t: 'vocab', items: [['Кандайсыз?', 'How are you? (polite)'], ['Кандайсың?', 'How are you? (friendly)'], ['Жакшымын.', 'I’m fine.', 'Literally “good-I-am”'], ['Жакшы, рахмат.', 'Good, thanks.'], ['Өзүңүз кандайсыз?', 'And you? (polite)', 'Literally “yourself how-are-you?”'], ['Жаман эмес.', 'Not bad.'], ['Сонун!', 'Great! Wonderful!'], ['Иштер кандай?', 'How are things?']] },
        { t: 'h', text: 'Magic words' },
        { t: 'vocab', items: [['Рахмат.', 'Thank you.'], ['Чоң рахмат!', 'Thank you very much!', 'Literally “big thanks”'], ['Эч нерсе эмес.', 'You’re welcome. / It’s nothing.'], ['Кечиресиз.', 'Excuse me. / Sorry. (polite)'], ['Ооба.', 'Yes.'], ['Жок.', 'No.'], ['Мейли.', 'OK. / Alright.'], ['Кош келиңиз!', 'Welcome!']] },
        { t: 'h', text: 'My name is…' },
        { t: 'compare', en: 'What is your name?', kg: 'Атыңыз ким?', gloss: 'name-your(polite) who?', note: 'Kyrgyz asks “who is your name?”, not “what”. Your name is a person, after all.' },
        { t: 'compare', en: 'My name is Anna.', kg: 'Менин атым Анна.', gloss: 'my name-my Anna', note: 'No “is”. And “my” appears twice: [[менин]] in front and [[-ым]] glued on. The front one is optional — [[Атым Анна]] is fine.' },
        { t: 'vocab', items: [['Атыңыз ким?', 'What’s your name? (polite)'], ['Атың ким?', 'What’s your name? (friendly)'], ['Менин атым …', 'My name is …'], ['Таанышканыма кубанычтамын.', 'Nice to meet you.', 'Long! Learn it as one sound: taa-nysh-ka-ny-ma ku-ba-nych-ta-myn'], ['Кайдан келдиңиз?', 'Where are you from?', 'Literally “where did you come from?”'], ['Мен Англиядан келдим.', 'I’m from England.', '[[Америкадан]] — from America, [[Австралиядан]] — from Australia']] },
        { t: 'h', text: 'Goodbye' },
        { t: 'p', html: 'Kyrgyz goodbyes depend on who is leaving — a lovely detail. The person leaving says “stay well”; the person staying says “go well”.' },
        { t: 'vocab', items: [['Жакшы калыңыз!', 'Goodbye! — said by the one leaving', '“Stay well”'], ['Жакшы барыңыз!', 'Goodbye! — said to the one leaving', '“Go well”'], ['Кош болуңуз!', 'Goodbye! (polite, anyone)'], ['Кош!', 'Bye! (friendly)'], ['Көрүшкөнчө!', 'See you!', '“Until we see each other”'], ['Эртең көрүшөбүз!', 'See you tomorrow!']] },
        { t: 'dialog', title: 'Meeting someone new', lines: [['Айгүл', 'Саламатсызбы!', 'Hello!'], ['Tom', 'Саламатсызбы! Кандайсыз?', 'Hello! How are you?'], ['Айгүл', 'Жакшы, рахмат. Өзүңүз кандайсыз?', 'Fine, thanks. And you?'], ['Tom', 'Жакшымын. Менин атым Том. Атыңыз ким?', 'I’m fine. My name is Tom. What’s your name?'], ['Айгүл', 'Менин атым Айгүл. Таанышканыма кубанычтамын!', 'My name is Aigul. Nice to meet you!'], ['Tom', 'Мен да! Жакшы калыңыз!', 'Me too! Goodbye! (I’m leaving)'], ['Айгүл', 'Жакшы барыңыз!', 'Goodbye! (go well)']] },
        { t: 'tip', title: 'Culture: handshakes and hearts', html: 'Men usually shake hands with every man in the room, often with both hands or with the left hand on the heart. Women often greet each other with a light hug or a nod. Placing your right hand on your heart while saying [[Рахмат]] shows deep thanks.' }
      ],
      quiz: [
        { t: 'mc', q: 'You walk into a shop. What do you say?', o: ['[[Саламатсызбы!]]', '[[Салам!]]', '[[Кош!]]', '[[Бейпил түн!]]'], why: 'Strangers and shop staff get the polite hello.' },
        { t: 'mc', q: 'What does [[Рахмат]] mean?', o: ['Thank you', 'Hello', 'Sorry', 'Welcome'], why: '[[Рахмат]] — thank you. [[Чоң рахмат]] — thank you very much.' },
        { t: 'mc', q: 'You are leaving a friend’s house. What do you say?', o: ['[[Жакшы калыңыз!]]', '[[Жакшы барыңыз!]]', '[[Кош келиңиз!]]', '[[Кутман таң!]]'], why: 'The one leaving says “stay well”.' },
        { t: 'mc', q: '[[Атыңыз ким?]] literally means…', o: ['“Who is your name?”', '“What is your age?”', '“Where are you from?”', '“How are you?”'], why: 'Kyrgyz uses [[ким]] (who) for names.' },
        { t: 'mc', q: 'Someone asks [[Кандайсыз?]] What is a good answer?', o: ['[[Жакшымын, рахмат.]]', '[[Кечиресиз.]]', '[[Мейли.]]', '[[Кош!]]'], why: '“I’m fine, thanks.”' },
        { t: 'mc', q: 'Which means “Excuse me / Sorry”?', o: ['[[Кечиресиз]]', '[[Кутман кеч]]', '[[Сонун]]', '[[Ооба]]'], why: 'Use it to get attention or apologise.' },
        { t: 'type', q: 'Type: “Yes.”', a: ['Ооба', 'Ооба.'], why: 'ооба — long оо.' },
        { t: 'type', q: 'Type: “My name is Tom.”', a: ['Менин атым Том', 'Атым Том'], why: '[[Менин атым Том.]] — “my name-my Tom”.' },
        { t: 'order', q: 'Build: “I’m from England.”', a: 'Мен Англиядан келдим', why: 'I England-from came. The verb goes last.' },
        { t: 'mc', q: 'What does [[Кош келиңиз!]] mean?', o: ['Welcome!', 'Goodbye!', 'Good night!', 'See you tomorrow!'], why: 'You’ll see it on signs at the airport and city entrances.' }
      ]
    },
    {
      id: 'i-am', title: 'I am, you are: no “to be” needed', kg: 'Мен студентмин', minutes: 30,
      goals: ['Use all 8 personal pronouns', 'Say what someone is: job, nationality, feeling', 'Add the “am / are” endings with harmony'],
      blocks: [
        { t: 'h', text: 'The idea' },
        { t: 'eli5', html: 'English needs a little helper word: I <b>am</b>, you <b>are</b>, she <b>is</b>. Kyrgyz doesn’t have that word. Instead, the “am / are” is a sticker you put on the end of the thing you are. [[студент]] + [[мин]] = “student-am”.' },
        { t: 'compare', en: 'I am a student.', kg: 'Мен студент|мин.', gloss: 'I student-am', note: 'No “a”, no separate “am”. Just two words.' },
        { t: 'compare', en: 'She is a teacher.', kg: 'Ал мугалим.', gloss: 'she teacher', note: 'For he / she / it, there is no ending at all. Zero. The easiest person in the language.' },
        { t: 'h', text: 'The pronouns' },
        { t: 'table', cols: ['Kyrgyz', 'English', 'Note'], kg: [0], rows: [['мен', 'I', ''], ['сен', 'you', 'one friend, child, family'], ['сиз', 'you', 'one person, polite'], ['ал', 'he / she / it', 'also “that”'], ['биз', 'we', ''], ['силер', 'you', 'a group of friends'], ['сиздер', 'you', 'a group, polite'], ['алар', 'they', '']] },
        { t: 'h', text: 'The endings' },
        { t: 'p', html: 'Each ending has a narrow blank vowel (I) that follows vowel harmony from lesson 1.7: [[ы / и / у / ү]].' },
        { t: 'table', cols: ['Who', 'Ending', 'студент', 'жакшы (good)', 'кыргыз', 'дарыгер (doctor)', 'бактылуу (happy)'], rows: [
          ['мен', '-мIн', '[[студент|мин]]', '[[жакшы|мын]]', '[[кыргыз|мын]]', '[[дарыгер|мин]]', '[[бактылуу|мун]]'],
          ['сен', '-сIң', '[[студент|сиң]]', '[[жакшы|сың]]', '[[кыргыз|сың]]', '[[дарыгер|сиң]]', '[[бактылуу|суң]]'],
          ['сиз', '-сIз', '[[студент|сиз]]', '[[жакшы|сыз]]', '[[кыргыз|сыз]]', '[[дарыгер|сиз]]', '[[бактылуу|суз]]'],
          ['ал', '—', '[[студент]]', '[[жакшы]]', '[[кыргыз]]', '[[дарыгер]]', '[[бактылуу]]'],
          ['биз', '-бIз / -пIз', '[[студент|пиз]]', '[[жакшы|быз]]', '[[кыргыз|быз]]', '[[дарыгер|биз]]', '[[бактылуу|буз]]'],
          ['силер', '-сIңAр', '[[студент|сиңер]]', '[[жакшы|сыңар]]', '[[кыргыз|сыңар]]', '[[дарыгер|сиңер]]', '[[бактылуу|суңар]]'],
          ['сиздер', '-сIздAр', '[[студент|сиздер]]', '[[жакшы|сыздар]]', '[[кыргыз|сыздар]]', '[[дарыгер|сиздер]]', '[[бактылуу|суздар]]'],
          ['алар', '— (or -лар)', '[[студент|тер]]', '[[жакшы]]', '[[кыргыз|дар]]', '[[дарыгер|лер]]', '[[бактылуу]]']], caption: '“We” uses -пыз after a voiceless sound (т, к, п, с…), -быз everywhere else.' },
        { t: 'tip', title: 'Notice the pattern', html: 'The ending sounds like the pronoun: [[мен]] → [[-мын]], [[сен]] → [[-сың]], [[сиз]] → [[-сыз]], [[биз]] → [[-быз]]. Kyrgyz basically repeats the pronoun as a sticker. That’s why you can drop the pronoun: [[Студентмин]] alone means “I’m a student”.' },
        { t: 'h', text: 'Who are you?' },
        { t: 'vocab', title: 'Jobs', items: [['мугалим', 'teacher'], ['дарыгер', 'doctor'], ['студент', 'university student'], ['окуучу', 'school pupil', 'from [[оку]] (read) + [[-уучу]] (one who does)'], ['айдоочу', 'driver'], ['сатуучу', 'shop assistant, seller'], ['инженер', 'engineer'], ['ишкер', 'businessperson'], ['жазуучу', 'writer'], ['ырчы', 'singer']] },
        { t: 'vocab', title: 'Where people are from', items: [['кыргыз', 'Kyrgyz (person)'], ['америкалык', 'American'], ['англиялык', 'English (person)'], ['канадалык', 'Canadian'], ['австралиялык', 'Australian'], ['орус', 'Russian'], ['казак', 'Kazakh'], ['немис', 'German']] },
        { t: 'tip', title: 'Make any nationality', html: 'Country + [[-лык / -лик / -лук / -лүк]] = person from there. [[Англия]] → [[англиялык]], [[Германия]] → [[германиялык]], [[Ирландия]] → [[ирландиялык]], [[Бишкек]] → [[бишкектик]] (someone from Bishkek).' },
        { t: 'vocab', title: 'How you are', items: [['жакшы', 'good, fine'], ['бактылуу', 'happy'], ['ачка', 'hungry'], ['даяр', 'ready'], ['бош', 'free (not busy)'], ['бош эмес', 'busy (“not free”)'], ['чарчаган', 'tired', 'In speech people usually say [[Чарчадым]] — “I got tired”'], ['үйлөнгөн', 'married (of a man)', 'a married woman: [[турмушка чыккан]]']] },
        { t: 'ex', items: [['Мен америкалык|мын.', 'I’m American.'], ['Сиз мугалим|сиз.', 'You are a teacher.'], ['Ал айдоочу.', 'He is a driver.'], ['Биз даяр|быз.', 'We are ready.'], ['Силер ачка|сыңар.', 'You (all) are hungry.'], ['Мен бош эмес|мин.', 'I’m busy.', 'The ending jumps onto эмес — next lesson!']] }
      ],
      quiz: [
        { t: 'mc', q: 'How do you say “I am a student”?', o: ['[[Мен студентмин.]]', '[[Мен студент.]]', '[[Мен бир студент.]]', '[[Студент мен.]]'], why: 'The ending -мин does the job of “am”.' },
        { t: 'mc', q: 'What ending goes with [[ал]] (he/she)?', o: ['None', '-мын', '-сың', '-т'], why: '[[Ал мугалим.]] — zero ending.' },
        { t: 'mc', q: 'Pick the correct form: “You (polite) are a doctor.”', o: ['[[Сиз дарыгерсиз.]]', '[[Сиз дарыгерсыз.]]', '[[Сиз дарыгермин.]]', '[[Сиз дарыгерсиң.]]'], why: 'Last vowel е → narrow и: -сиз.' },
        { t: 'mc', q: '“We are Kyrgyz.”', o: ['[[Биз кыргызбыз.]]', '[[Биз кыргызпыз.]]', '[[Биз кыргызбиз.]]', '[[Биз кыргызмын.]]'], why: 'з is voiced → -быз; last vowel ы → ы.' },
        { t: 'mc', q: '“We are students.”', o: ['[[Биз студентпиз.]]', '[[Биз студентбиз.]]', '[[Биз студентпыз.]]', '[[Биз студентмин.]]'], why: 'т is voiceless → -пиз; last vowel е → и.' },
        { t: 'mc', q: 'Which “you” fits a group of friends?', o: ['[[силер]]', '[[сиз]]', '[[сен]]', '[[сиздер]]'], why: '[[силер]] — friendly plural.' },
        { t: 'type', q: 'Type: “I am happy.” (happy = бактылуу)', a: ['Мен бактылуумун', 'Бактылуумун'], why: 'Last vowel у → narrow у: -мун.' },
        { t: 'type', q: 'Type: “She is a teacher.”', a: ['Ал мугалим'], why: 'No ending for ал.' },
        { t: 'order', q: 'Build: “You (friendly) are hungry.”', a: 'Сен ачкасың', extra: ['ачкамын'], why: 'ачка + сың.' },
        { t: 'mc', q: 'What does [[окуучу]] mean?', o: ['school pupil', 'teacher', 'reader of news', 'driver'], why: '[[оку]] (read/study) + [[-уучу]] (one who does).' }
      ]
    },
    {
      id: 'questions', title: 'This, that, and asking questions', kg: 'Бул эмне?', minutes: 30,
      goals: ['Point at things: this, that', 'Ask yes/no questions with -бы', 'Use the main question words'],
      blocks: [
        { t: 'h', text: 'This and that' },
        { t: 'vocab', items: [['бул', 'this'], ['ошол', 'that (the one we mentioned)'], ['тигил', 'that one over there'], ['ал', 'that; he / she / it'], ['бул жерде', 'here', '“in this place”'], ['тигил жакта', 'over there']] },
        { t: 'compare', en: 'What is this?', kg: 'Бул эмне?', gloss: 'this what', note: 'No “is”. Just “this what?”' },
        { t: 'compare', en: 'This is a book.', kg: 'Бул китеп.', gloss: 'this book' },
        { t: 'h', text: 'Yes/no questions: the spoken question mark' },
        { t: 'eli5', html: 'In English you shuffle words around to ask a question: “You are tired” → “<b>Are you</b> tired?” In Kyrgyz you never shuffle. You just glue a little question sticker [[-бы]] on the end — like saying a question mark out loud.' },
        { t: 'compare', en: 'Is this a book?', kg: 'Бул китеп|пи?', gloss: 'this book-?', note: 'The sticker follows harmony: [[-бы / -би / -бу / -бү]], and becomes [[-пы / -пи…]] after voiceless sounds (п, т, к, с, ч, ш).' },
        { t: 'compare', en: 'Are you a student?', kg: 'Сиз студент|сиз|би?', gloss: 'you student-you.are-?', note: 'Order of stickers: thing → person → question.' },
        { t: 'ex', items: [['Бул алма|бы?', 'Is this an apple?'], ['Ооба, бул алма.', 'Yes, this is an apple.'], ['Сен ачка|сың|бы?', 'Are you hungry?'], ['Ал мугалим|би?', 'Is she a teacher?'], ['Бул үй|бү?', 'Is this the house?'], ['Чай|бы?', 'Tea? (offering)']] },
        { t: 'h', text: 'Question words' },
        { t: 'vocab', items: [['ким', 'who'], ['эмне', 'what'], ['кайда', 'where (at / to)'], ['кайдан', 'where from'], ['качан', 'when'], ['эмнеге', 'why'], ['кантип', 'how (in what way)'], ['кандай', 'how; what kind of'], ['канча', 'how much, how many'], ['кайсы', 'which']] },
        { t: 'eli5', html: 'The question word sits in the <b>same seat</b> the answer will sit in. You don’t move it to the front like English. Ask “You are where?” and the answer is “I am <u>at home</u>.” Swap the question word for the answer — done.' },
        { t: 'compare', en: 'Where are you?', kg: 'Сен кайда|сың?', gloss: 'you where-are.you', note: 'Answer: [[Мен үй|дө|мүн.]] — “I home-at-am.” Same seat, same ending.' },
        { t: 'compare', en: 'Who is that?', kg: 'Ал ким?', gloss: 'that who' },
        { t: 'warn', title: 'Never double up', html: 'A question word already makes it a question, so <b>don’t</b> add [[-бы]] as well. [[Бул эмне?]] — correct. [[Бул эмнеби?]] — wrong.' },
        { t: 'dialog', title: 'At the market', lines: [['Tom', 'Кечиресиз, бул эмне?', 'Excuse me, what is this?'], ['Сатуучу', 'Бул курут.', 'This is kurut.'], ['Tom', 'Курут? Ал эмне?', 'Kurut? What is it?'], ['Сатуучу', 'Кургатылган сүзмө. Даамдуу!', 'Dried yoghurt cheese. Tasty!'], ['Tom', 'Бул канча?', 'How much is this?'], ['Сатуучу', 'Элүү сом.', 'Fifty som.']] }
      ],
      quiz: [
        { t: 'mc', q: 'How do you ask “What is this?”', o: ['[[Бул эмне?]]', '[[Эмне бул бы?]]', '[[Бул эмнеби?]]', '[[Эмнеби бул?]]'], why: 'this + what. No -бы with a question word.' },
        { t: 'mc', q: 'Turn [[Бул китеп]] into a question.', o: ['[[Бул китеппи?]]', '[[Бул китепби?]]', '[[Китеп бул?]]', '[[Бул китеп эмне?]]'], why: 'п is voiceless → -пи.' },
        { t: 'mc', q: 'Turn [[Ал мугалим]] into a question.', o: ['[[Ал мугалимби?]]', '[[Ал мугалимпи?]]', '[[Ал мугалимбы?]]', '[[Мугалим ал бы?]]'], why: 'м is voiced → б; last vowel и → и.' },
        { t: 'mc', q: 'What does [[кайда]] mean?', o: ['where', 'when', 'who', 'which'], why: '[[кайда]] = where; [[кайдан]] = where from.' },
        { t: 'mc', q: 'What does [[качан]] mean?', o: ['when', 'how much', 'why', 'where'], why: '[[качан]] = when.' },
        { t: 'mc', q: 'Where does the question word go?', o: ['In the seat where the answer will go', 'Always first', 'Always last', 'Anywhere'], why: '[[Сен кайдасың?]] → [[Мен үйдөмүн.]]' },
        { t: 'type', q: 'Type: “Who is that?”', a: ['Ал ким', 'Ал ким?'], why: 'that + who.' },
        { t: 'type', q: 'Type: “Is this an apple?” (apple = алма)', a: ['Бул алмабы', 'Бул алмабы?'], why: 'алма + бы.' },
        { t: 'order', q: 'Build: “Are you (polite) a student?”', a: 'Сиз студентсизби', extra: ['студентпи'], why: 'student + you-are + ?' },
        { t: 'mc', q: 'What does [[канча]] mean?', o: ['how much / how many', 'which', 'how (in what way)', 'what kind'], why: '[[Бул канча?]] = How much is this?' }
      ]
    },
    {
      id: 'not', title: 'Not! Isn’t, there isn’t', kg: 'Эмес жана жок', minutes: 25,
      goals: ['Say what something isn’t with эмес', 'Say something doesn’t exist with жок', 'Say “there is” with бар'],
      blocks: [
        { t: 'h', text: 'Two different “no”s' },
        { t: 'eli5', html: 'English uses “not” for two different jobs. Kyrgyz gives each job its own word.<br>• [[эмес]] = <b>“it’s not that thing”</b>. A cat is <i>not</i> a dog.<br>• [[жок]] = <b>“there isn’t any”</b>. There is <i>no</i> dog here.' },
        { t: 'compare', en: 'This isn’t a book.', kg: 'Бул китеп эмес.', gloss: 'this book not', note: '[[эмес]] comes after the noun or adjective.' },
        { t: 'compare', en: 'There is no bread.', kg: 'Нан жок.', gloss: 'bread none' },
        { t: 'h', text: 'эмес with people' },
        { t: 'p', html: 'When it’s “I’m not…”, the person ending moves off the noun and onto [[эмес]]:' },
        { t: 'table', cols: ['Who', 'is', 'is not'], rows: [['мен', '[[Мен мугалим|мин.]]', '[[Мен мугалим эмес|мин.]]'], ['сен', '[[Сен мугалим|сиң.]]', '[[Сен мугалим эмес|сиң.]]'], ['сиз', '[[Сиз мугалим|сиз.]]', '[[Сиз мугалим эмес|сиз.]]'], ['ал', '[[Ал мугалим.]]', '[[Ал мугалим эмес.]]'], ['биз', '[[Биз мугалим|биз.]]', '[[Биз мугалим эмес|пиз.]]'], ['силер', '[[Силер мугалим|сиңер.]]', '[[Силер мугалим эмес|сиңер.]]'], ['алар', '[[Алар мугалим|дер.]]', '[[Алар мугалим эмес.]]']] },
        { t: 'h', text: 'бар and жок: there is, there isn’t' },
        { t: 'eli5', html: '[[бар]] and [[жок]] are like a light switch: on (exists) and off (doesn’t exist). They go at the end of the sentence, where verbs go.' },
        { t: 'ex', items: [['Суу бар.', 'There is water.'], ['Суу жок.', 'There is no water.'], ['Суу бар|бы?', 'Is there any water?'], ['Бишкекте метро жок.', 'There is no metro in Bishkek.', 'Bishkek-in metro none'], ['Убакыт жок.', 'There’s no time.'], ['Көйгөй жок!', 'No problem!']] },
        { t: 'h', text: 'Answering yes and no' },
        { t: 'p', html: 'Short answers repeat the key word:' },
        { t: 'ex', items: [['Сиз студентсизби? — Ооба, студентмин.', 'Are you a student? — Yes, I am.'], ['Сиз студентсизби? — Жок, студент эмесмин.', 'Are you a student? — No, I’m not.'], ['Чай барбы? — Бар.', 'Is there tea? — There is.'], ['Чай барбы? — Жок.', 'Is there tea? — There isn’t.']] },
        { t: 'tip', title: '[[Жок]] wears two hats', html: '[[Жок]] means both “No.” (the answer) and “there isn’t”. Context makes it clear. [[Ооба]] is “yes”, but in a shop you’ll more often hear [[бар]] — “we have it”.' },
        { t: 'vocab', items: [['эмес', 'not (it isn’t that)'], ['бар', 'there is; exists'], ['жок', 'there isn’t; no'], ['убакыт', 'time'], ['акча', 'money'], ['көйгөй', 'problem'], ['метро', 'metro, subway'], ['интернет', 'internet'], ['ажаткана', 'toilet'], ['дүкөн', 'shop']] }
      ],
      quiz: [
        { t: 'mc', q: '“This isn’t tea.”', o: ['[[Бул чай эмес.]]', '[[Бул чай жок.]]', '[[Чай жок бул.]]', '[[Бул эмес чай.]]'], why: 'It’s not that thing → эмес.' },
        { t: 'mc', q: '“There is no tea.”', o: ['[[Чай жок.]]', '[[Чай эмес.]]', '[[Жок чай.]]', '[[Чай бар.]]'], why: 'It doesn’t exist → жок.' },
        { t: 'mc', q: '“I’m not a doctor.”', o: ['[[Мен дарыгер эмесмин.]]', '[[Мен дарыгермин эмес.]]', '[[Мен дарыгер жокмун.]]', '[[Мен эмес дарыгер.]]'], why: 'The ending moves onto эмес.' },
        { t: 'mc', q: 'How do you ask “Is there internet?”', o: ['[[Интернет барбы?]]', '[[Интернет эмеспи?]]', '[[Интернет жокпу бар?]]', '[[Барбы интернет?]]'], why: 'бар + бы.' },
        { t: 'mc', q: 'What does [[Көйгөй жок!]] mean?', o: ['No problem!', 'Big problem!', 'Is there a problem?', 'Not a problem of mine.'], why: 'problem + none.' },
        { t: 'type', q: 'Type: “There is water.”', a: ['Суу бар'], why: 'water + exists.' },
        { t: 'type', q: 'Type: “We are not students.”', a: ['Биз студент эмеспиз'], why: 'эмес + пиз (с is voiceless).' },
        { t: 'order', q: 'Build: “There is no metro in Bishkek.”', a: 'Бишкекте метро жок', extra: ['эмес'], why: 'Bishkek-in metro none.' },
        { t: 'mc', q: 'Which word means “money”?', o: ['[[акча]]', '[[убакыт]]', '[[дүкөн]]', '[[көйгөй]]'], why: '[[акча]] — money.' }
      ]
    },
    {
      id: 'numbers', title: 'Numbers, money and age', kg: 'Сандар', minutes: 35,
      goals: ['Count from 0 to a million', 'Ask and pay prices', 'Say your age and phone number'],
      blocks: [
        { t: 'h', text: 'One to ten' },
        { t: 'vocab', items: [['нөл', '0'], ['бир', '1'], ['эки', '2'], ['үч', '3'], ['төрт', '4'], ['беш', '5', 'Think “beshbarmak” — “five fingers”'], ['алты', '6'], ['жети', '7'], ['сегиз', '8'], ['тогуз', '9'], ['он', '10']] },
        { t: 'h', text: 'Building bigger numbers' },
        { t: 'eli5', html: 'Kyrgyz numbers are Lego too — and much more logical than English. No “eleven”, “twelve” or “-teen” weirdness. 11 is just “ten one”, 25 is “twenty five”, 1991 is “thousand nine hundred ninety one”. Learn 20 words and you can say any number.' },
        { t: 'table', cols: ['Tens', '', 'Hundreds and more', ''], kg: [0, 2], rows: [['он', '10', 'жүз', '100'], ['жыйырма', '20', 'эки жүз', '200'], ['отуз', '30', 'беш жүз', '500'], ['кырк', '40', 'миң', '1,000'], ['элүү', '50', 'эки миң', '2,000'], ['алтымыш', '60', 'он миң', '10,000'], ['жетимиш', '70', 'жүз миң', '100,000'], ['сексен', '80', 'миллион', '1,000,000'], ['токсон', '90', 'миллиард', '1,000,000,000']] },
        { t: 'ex', items: [['он бир', '11 — ten one'], ['он беш', '15 — ten five'], ['жыйырма үч', '23'], ['кырк сегиз', '48'], ['жүз элүү', '150'], ['миң тогуз жүз токсон бир', '1991 — the year Kyrgyzstan became independent'], ['эки миң жыйырма алты', '2026']] },
        { t: 'widget', name: 'numbers' },
        { t: 'h', text: 'After a number, no plural' },
        { t: 'compare', en: 'three books', kg: 'үч китеп', gloss: 'three book', note: 'The number already says “more than one”, so Kyrgyz doesn’t repeat it. Same after [[көп]] (many): [[көп адам]] = many people.' },
        { t: 'h', text: 'Money' },
        { t: 'p', html: 'The currency is the som ([[сом]]); 1 som = 100 tyiyn ([[тыйын]]).' },
        { t: 'vocab', items: [['Канча турат?', 'How much does it cost?'], ['Бул канча?', 'How much is this?'], ['Кымбат!', 'Expensive!'], ['Арзан', 'cheap'], ['Арзандатып бериңизчи.', 'Please lower the price.', 'useful at the bazaar'], ['Карта менен төлөсөм болобу?', 'Can I pay by card?', '“If I pay with a card, is it OK?”']] },
        { t: 'dialog', title: 'Buying apples', lines: [['Tom', 'Алма канча турат?', 'How much are the apples?'], ['Сатуучу', 'Бир килосу жүз жыйырма сом.', 'One kilo is 120 som.'], ['Tom', 'Кымбат! Жүз сом болобу?', 'Expensive! Is 100 som OK?'], ['Сатуучу', 'Мейли, жүз сом.', 'OK, 100 som.'], ['Tom', 'Эки кило бериңиз.', 'Give me two kilos, please.']] },
        { t: 'h', text: 'Halves, decimals and amounts' },
        { t: 'list', items: ['[[жарым]] = half, used with numbers and measures: [[жарым литр]] (half a litre), [[эки жарым кило]] (2.5 kilos), [[жарым саат]] (half an hour).', '[[жарымы]] = half <i>of</i> a thing: [[нандын жарымы]] (half of the bread), [[алманын жарымы]] (half of the apple).', 'Decimals use [[бүтүн]] (“whole”): 2.5 → [[эки бүтүн ондон беш]] — “two whole, of tens five”. You’ll hear it with prices and in the news.'] },
        { t: 'compare', en: 'a bottle of water', kg: 'бир бөтөлкө суу', gloss: 'one bottle water', note: 'No “of” at all. Amount + thing, side by side: [[бир кашык шекер]] (a spoon of sugar), [[эки чыны чай]] (two cups of tea), [[бир кило эт]] (a kilo of meat).' },
        { t: 'vocab', items: [['жарым', 'half (with numbers)'], ['жарымы', 'half of (something)'], ['бөтөлкө', 'bottle'], ['кашык', 'spoon'], ['чыны', 'cup, bowl (for tea)'], ['литр', 'litre'], ['бүтүн', 'whole; (in decimals) point']] },
        { t: 'h', text: 'Age and phone numbers' },
        { t: 'compare', en: 'How old are you?', kg: 'Сиз нече жаш|та|сыз?', gloss: 'you how.many age-at-are.you', note: 'Literally “At how many years are you?”' },
        { t: 'compare', en: 'I am 30 years old.', kg: 'Мен отуз жаш|та|мын.', gloss: 'I thirty age-at-am' },
        { t: 'p', html: 'Phone numbers are read in pairs or groups: 0555 12 34 56 → [[нөл беш жүз элүү беш, он эки, отуз төрт, элүү алты]].' },
        { t: 'h', text: 'First, second, third' },
        { t: 'p', html: 'Add [[-ынчы]] (after a consonant) or [[-нчы]] (after a vowel), with harmony: [[бир|инчи]] (1st), [[эки|нчи]] (2nd), [[үч|үнчү]] (3rd), [[төрт|үнчү]] (4th), [[беш|инчи]] (5th), [[алты|нчы]] (6th), [[он|унчу]] (10th).' }
      ],
      quiz: [
        { t: 'mc', q: 'What is [[жети]]?', o: ['7', '6', '8', '70'], why: 'жети = 7, жетимиш = 70.' },
        { t: 'mc', q: 'What is [[он төрт]]?', o: ['14', '40', '104', '4'], why: 'ten four = 14.' },
        { t: 'mc', q: 'How do you say 50?', o: ['[[элүү]]', '[[беш он]]', '[[бешинчи]]', '[[алтымыш]]'], why: 'элүү = 50.' },
        { t: 'mc', q: '“Five books” is…', o: ['[[беш китеп]]', '[[беш китептер]]', '[[китеп беш]]', '[[бештер китеп]]'], why: 'No plural after numbers.' },
        { t: 'mc', q: 'How do you ask the price?', o: ['[[Канча турат?]]', '[[Кайда турат?]]', '[[Ким турат?]]', '[[Качан турат?]]'], why: '“How much stands?”' },
        { t: 'mc', q: 'What is [[миң тогуз жүз токсон бир]]?', o: ['1991', '1919', '9191', '1990'], why: 'thousand nine hundred ninety one.' },
        { t: 'type', q: 'Type the number 3 in Kyrgyz.', a: ['үч'], why: 'үч.' },
        { t: 'type', q: 'Type 25 in Kyrgyz.', a: ['жыйырма беш'], why: 'twenty five.' },
        { t: 'type', q: 'Type: “I am 20 years old.”', a: ['Мен жыйырма жаштамын', 'Жыйырма жаштамын'], why: 'жыйырма жаш-та-мын.' },
        { t: 'mc', q: 'What does [[үчүнчү]] mean?', o: ['third', 'thirty', 'three times', 'three each'], why: 'үч + үнчү = 3rd.' }
      ]
    },
    {
      id: 'plurals', title: 'Many things: the plural', kg: 'Көптүк сан', minutes: 30,
      goals: ['Pick the right plural from 12 forms', 'Know when Kyrgyz doesn’t use a plural'],
      blocks: [
        { t: 'h', text: 'One ending, twelve outfits' },
        { t: 'eli5', html: 'English mostly adds “-s”. Kyrgyz adds [[-лар]] — but it’s a chameleon. Its <b>vowel</b> matches the word (lesson 1.7) and its <b>first letter</b> matches the last sound of the word. Two quick questions and you’ve got it.' },
        { t: 'h', text: 'Question 1: what’s the last sound?' },
        { t: 'table', cols: ['Word ends in…', 'Plural starts with', 'Examples'], rows: [['a vowel, or й, р', '[[л]]', '[[алма|лар]] apples, [[үй|лөр]] houses, [[шаар|лар]] cities'], ['a voiced consonant: б в г д ж з л м н ң', '[[д]]', '[[кол|дор]] hands, [[кыз|дар]] girls, [[адам|дар]] people'], ['a voiceless consonant: к п с т ф х ц ч ш щ', '[[т]]', '[[ат|тар]] horses, [[китеп|тер]] books, [[дос|тор]] friends']] },
        { t: 'tip', title: 'Voiced or voiceless? Touch your throat.', html: 'Put your fingers on your throat and say “zzz”: it buzzes — voiced. Now “sss”: no buzz — voiceless. Kyrgyz endings love to match the buzz of the sound before them, because it’s easier for the mouth.' },
        { t: 'h', text: 'Question 2: what’s the last vowel?' },
        { t: 'p', html: 'Use the wide blank A: after [[а ы у]] → [[а]], after [[о]] → [[о]], after [[е и]] → [[е]], after [[ө ү]] → [[ө]].' },
        { t: 'table', cols: ['', '-л-', '-д-', '-т-'], rows: [['а / ы / у', '[[-лар]]: [[алма|лар]]', '[[-дар]]: [[кыз|дар]]', '[[-тар]]: [[ат|тар]]'], ['о', '[[-лор]]: [[тоо|лор]]', '[[-дор]]: [[кол|дор]]', '[[-тор]]: [[дос|тор]]'], ['е / и', '[[-лер]]: [[эне|лер]]', '[[-дер]]: [[тил|дер]]', '[[-тер]]: [[китеп|тер]]'], ['ө / ү', '[[-лөр]]: [[үй|лөр]]', '[[-дөр]]: [[көл|дөр]]', '[[-төр]]: [[сүт|төр]]']], caption: '3 starting letters × 4 vowels = 12 forms. They’re all the same ending.' },
        { t: 'warn', title: 'One irregular word', html: '[[бала]] (child) → [[балдар]] (children), not “балалар”. It’s so common you’ll know it in a day.' },
        { t: 'h', text: 'When Kyrgyz says “one” for “many”' },
        { t: 'list', items: ['After numbers: [[эки бала]] (two child = two children).', 'After [[көп]] (many) and [[бир нече]] (several): [[көп адам]] (many people).', 'For things in general, often singular: [[Мен алма жакшы көрөм]] — I like apples (I apple like).'] },
        { t: 'compare', en: 'I like apples.', kg: 'Мен алма жакшы көр|ө|м.', gloss: 'I apple good see-I', note: 'English needs the plural for “in general”. Kyrgyz doesn’t. ([[жакшы көр-]] = to like, literally “see as good”.)' },
        { t: 'vocab', items: [['адам', 'person'], ['киши', 'person, man (polite)'], ['эркек', 'man, male'], ['аял', 'woman'], ['бала', 'child'], ['алма', 'apple'], ['тил', 'language'], ['көп', 'many, a lot'], ['аз', 'few, a little'], ['бир нече', 'several']] }
      ],
      quiz: [
        { t: 'mc', q: 'Plural of [[кыз]] (girl)?', o: ['[[кыздар]]', '[[кызлар]]', '[[кызтар]]', '[[кыздер]]'], why: 'з is voiced → д; ы → а.' },
        { t: 'mc', q: 'Plural of [[дос]] (friend)?', o: ['[[достор]]', '[[дослор]]', '[[досдор]]', '[[достар]]'], why: 'с is voiceless → т; о → о.' },
        { t: 'mc', q: 'Plural of [[үй]] (house)?', o: ['[[үйлөр]]', '[[үйдөр]]', '[[үйлер]]', '[[үйлар]]'], why: 'й → л; ү → ө.' },
        { t: 'mc', q: 'Plural of [[мектеп]] (school)?', o: ['[[мектептер]]', '[[мектепдер]]', '[[мектептар]]', '[[мектеплер]]'], why: 'п is voiceless → т; е → е.' },
        { t: 'mc', q: 'Plural of [[бала]] (child)?', o: ['[[балдар]]', '[[балалар]]', '[[баладар]]', '[[балатар]]'], why: 'The famous irregular.' },
        { t: 'mc', q: 'Plural of [[тоо]] (mountain)?', o: ['[[тоолор]]', '[[тоолар]]', '[[тоодор]]', '[[тоолер]]'], why: 'Vowel ending → л; о → о.' },
        { t: 'mc', q: '“Four horses” is…', o: ['[[төрт ат]]', '[[төрт аттар]]', '[[аттар төрт]]', '[[төрт атлар]]'], why: 'No plural after a number.' },
        { t: 'type', q: 'Type the plural of [[кол]] (hand).', a: ['колдор'], why: 'л is voiced → д; о → о.' },
        { t: 'type', q: 'Type the plural of [[китеп]] (book).', a: ['китептер'], why: 'п → т; е → е.' },
        { t: 'type', q: 'Type the plural of [[көл]] (lake).', a: ['көлдөр'], why: 'л → д; ө → ө.' }
      ]
    },
    {
      id: 'my-your', title: 'My, your, his: possessive endings', kg: 'Менин китебим', minutes: 35,
      goals: ['Say my/your/his/our with endings', 'Know when п → б and к → г', 'Talk about your family'],
      blocks: [
        { t: 'h', text: 'Saying “my” twice' },
        { t: 'eli5', html: 'In Kyrgyz, “my” is a <b>sticker</b> on the thing: [[китеп|им]] = book-my. You can also put a name tag in front — [[менин]] — but it’s optional, like writing your name on a lunchbox that already has your sticker on it.' },
        { t: 'compare', en: 'my book', kg: '(менин) китеб|им', gloss: '(my) book-my', note: 'Most of the time people drop [[менин]] unless they’re stressing it: “<i>my</i> book, not yours”.' },
        { t: 'h', text: 'All the stickers' },
        { t: 'table', cols: ['Whose', 'Name tag', 'After a vowel', 'After a consonant'], kg: [1], rows: [['my', 'менин', '-м: [[ата|м]]', '-Iм: [[кол|ум]]'], ['your (friendly)', 'сенин', '-ң: [[ата|ң]]', '-Iң: [[кол|уң]]'], ['your (polite)', 'сиздин', '-ңIз: [[ата|ңыз]]', '-IңIз: [[кол|уңуз]]'], ['his / her / its', 'анын', '-сI: [[ата|сы]]', '-I: [[кол|у]]'], ['our', 'биздин', '-бIз: [[ата|быз]]', '-IбIз: [[кол|убуз]]'], ['your (all)', 'силердин', '-ңAр: [[ата|ңар]]', '-IңAр: [[кол|уңар]]'], ['their', 'алардын', '-сI: [[ата|сы]]', '-I: [[кол|у]]']], caption: '“Their” uses the same ending as “his/her”. Context — or the name tag [[алардын]] — makes it clear.' },
        { t: 'h', text: 'Soft landing: п → б, к → г' },
        { t: 'eli5', html: 'When a word ends in [[п]] or [[к]] and a <b>vowel</b> comes after it, the hard sound gets soft, like a ball landing on a cushion. [[китеп]] + [[им]] → [[китеб|им]]. It’s easier to say.' },
        { t: 'ex', items: [['китеп → китеб|им', 'book → my book'], ['мектеп → мектеб|ибиз', 'school → our school'], ['тарак → тараг|ым', 'comb → my comb'], ['Бишкек → Бишкег|им', 'Bishkek → my Bishkek'], ['ат → ат|ым', 'name → my name (т doesn’t change)']] },
        { t: 'warn', title: 'A few words break the rule', html: 'Some short words keep their [[к]] or [[п]], and a few words drop a vowel: [[мурун]] (nose) → [[мурд|ум]] (my nose), [[орун]] (place) → [[орд|ум]] (my place). Learn these as you meet them.' },
        { t: 'h', text: 'My family' },
        { t: 'vocab', items: [['үй-бүлө', 'family'], ['ата', 'father', 'my father: [[атам]]'], ['апа', 'mother', 'also [[эне]]; my mum: [[апам]]'], ['ага / байке', 'older brother', 'my older brother: [[агам]]'], ['эже', 'older sister', 'my older sister: [[эжем]]'], ['ини', 'younger brother (of a man)', '[[иним]]'], ['карындаш', 'younger sister (of a man)', '[[карындашым]]'], ['сиңди', 'younger sister (of a woman)', '[[сиңдим]]'], ['уул', 'son', '[[уулум]]'], ['кыз', 'daughter', '[[кызым]]'], ['чоң ата', 'grandfather', '“big father”'], ['чоң апа', 'grandmother', '“big mother”'], ['күйөө', 'husband', '[[күйөөм]]'], ['аял', 'wife', '[[аялым]]; more formal: [[жубайым]]'], ['тууган', 'relative']] },
        { t: 'tip', title: 'Older or younger matters', html: 'English has “brother” and “sister”. Kyrgyz cares about who is older, because older siblings get respect. A younger sister is [[карындаш]] if you are a man, [[сиңди]] if you are a woman.' },
        { t: 'h', text: 'Mine, yours, theirs: -кы' },
        { t: 'p', html: 'To say “mine” or “yours” without naming the thing, add [[-кы]] to the “of” form of the pronoun. Kyrgyz turns “of me” into “the one of me”:' },
        { t: 'table', cols: ['English', 'Kyrgyz', 'Example'], kg: [1], rows: [['mine', 'меники', '[[Бул китеп меники.]] — This book is mine.'], ['yours (friendly)', 'сеники', '[[Бул сеникиби?]] — Is this yours?'], ['yours (polite)', 'сиздики', '[[Сумка сиздикиби?]] — Is the bag yours?'], ['his / hers', 'аныкы', '[[Ал аныкы эмес.]] — That isn’t his.'], ['ours', 'биздики', '[[Бул үй биздики.]] — This house is ours.'], ['theirs', 'алардыкы', '[[Машина алардыкы.]] — The car is theirs.'], ['Aigul’s', 'Айгүлдүкү', 'Any name works: name + “of” + [[-кы]]']] },
        { t: 'ex', items: [['Бул менин ата|м.', 'This is my father.'], ['Анын ат|ы Нурлан.', 'His name is Nurlan.'], ['Сиздин үй|үңүз чоң.', 'Your house is big.'], ['Биздин мугалим|ибиз жакшы.', 'Our teacher is good.'], ['Атың ким?', 'What’s your name? (friendly)']] }
      ],
      quiz: [
        { t: 'mc', q: '“My mother”', o: ['[[апам]]', '[[апаным]]', '[[апасы]]', '[[апаң]]'], why: 'Vowel ending → just -м.' },
        { t: 'mc', q: '“My book”', o: ['[[китебим]]', '[[китепим]]', '[[китебым]]', '[[китепм]]'], why: 'п → б before a vowel; е → и.' },
        { t: 'mc', q: '“His/her house”', o: ['[[үйү]]', '[[үйсү]]', '[[үйүм]]', '[[үйүң]]'], why: 'Consonant ending → -I: ү → ү.' },
        { t: 'mc', q: '“Her father”', o: ['[[атасы]]', '[[атаы]]', '[[атам]]', '[[атасын]]'], why: 'Vowel ending → -сы.' },
        { t: 'mc', q: '“Your (polite) name”', o: ['[[атыңыз]]', '[[атыңиз]]', '[[атсыз]]', '[[атыңар]]'], why: 'ат + ыңыз.' },
        { t: 'mc', q: 'A man talks about his younger sister. Which word?', o: ['[[карындаш]]', '[[сиңди]]', '[[эже]]', '[[ини]]'], why: 'For a man: карындаш. For a woman: сиңди.' },
        { t: 'type', q: 'Type: “my son”', a: ['уулум', 'менин уулум'], why: 'уул + ум.' },
        { t: 'type', q: 'Type: “our school”', a: ['мектебибиз', 'биздин мектебибиз'], why: 'мектеп → мектеб + ибиз.' },
        { t: 'order', q: 'Build: “This is my father.”', a: 'Бул менин атам', extra: ['атасы'], why: 'this my father-my.' },
        { t: 'mc', q: 'What does [[чоң апа]] mean?', o: ['grandmother', 'big sister', 'aunt', 'mother-in-law'], why: '“Big mother”.' }
      ]
    },
    {
      id: 'have', title: 'I have, I don’t have', kg: 'Менин итим бар', minutes: 30,
      goals: ['Say what you have and don’t have', 'Ask “Do you have…?” in shops', 'Talk about family members you have'],
      blocks: [
        { t: 'h', text: 'There is no “have”' },
        { t: 'eli5', html: 'Kyrgyz has no verb “to have”. Instead you combine two things you already know: “my” stickers and the light switch [[бар / жок]]. “I have a dog” becomes “my dog exists”. “I don’t have a car” becomes “my car doesn’t exist”.' },
        { t: 'compare', en: 'I have a dog.', kg: 'Менин ит|им бар.', gloss: 'my dog-my exists' },
        { t: 'compare', en: 'She doesn’t have a car.', kg: 'Анын машина|сы жок.', gloss: 'her car-her doesn’t.exist' },
        { t: 'compare', en: 'Do you have children?', kg: 'Сиздин бала|ңыз бар|бы?', gloss: 'your child-your exists-?', note: 'Remember: one child or many, Kyrgyz often keeps it singular here.' },
        { t: 'ex', items: [['Менин эки эже|м бар.', 'I have two older sisters.'], ['Сенин ага|ң бар|бы?', 'Do you have an older brother?'], ['Жок, менин ага|м жок.', 'No, I don’t have an older brother.'], ['Биздин үй|үбүз бар.', 'We have a house.'], ['Менин убакт|ым жок.', 'I don’t have time.', 'убакыт drops a vowel: убакт-ым'], ['Анын эки уул|у жана бир кыз|ы бар.', 'He has two sons and a daughter.']] },
        { t: 'h', text: 'Having it on you: [[менде]]' },
        { t: 'p', html: 'There’s a second way, for things you have <i>on you</i> or <i>available right now</i>: “at me there is”. [[менде]] = at me, [[сизде]] = at you.' },
        { t: 'compare', en: 'Do you have water? (to sell, to give)', kg: 'Сизде суу бар|бы?', gloss: 'at.you water exists-?', note: 'This is the shop question. Learn it — you’ll use it every day.' },
        { t: 'table', cols: ['', 'own / family', 'on me / available'], rows: [['I have', '[[менин … -ым бар]]', '[[менде … бар]]'], ['you have', '[[сенин … -ың бар]]', '[[сенде … бар]]'], ['you (pol.) have', '[[сиздин … -ыңыз бар]]', '[[сизде … бар]]'], ['he / she has', '[[анын … -ы бар]]', '[[анда … бар]]'], ['we have', '[[биздин … -ыбыз бар]]', '[[бизде … бар]]']] },
        { t: 'ex', items: [['Менде акча жок.', 'I don’t have money (on me).'], ['Сизде нан бар|бы? — Бар.', 'Do you have bread? — We do.'], ['Сизде сдача бар|бы?', 'Do you have change?'], ['Менде бир суроо бар.', 'I have a question.']] },
        { t: 'dialog', title: 'Small talk about family', lines: [['Айгүл', 'Сиздин үй-бүлөңүз чоңбу?', 'Is your family big?'], ['Tom', 'Жок, анча чоң эмес. Менин бир эжем жана бир иним бар.', 'No, not very big. I have one older sister and one younger brother.'], ['Айгүл', 'Сиздин балаңыз барбы?', 'Do you have children?'], ['Tom', 'Ооба, бир кызым бар. Ал беш жашта.', 'Yes, I have a daughter. She is five.'], ['Айгүл', 'Кандай сонун! Менин үч балам бар.', 'How lovely! I have three children.']] },
        { t: 'vocab', items: [['бар', 'there is / have'], ['жок', 'there isn’t / don’t have'], ['менде', 'at me, on me'], ['сизде', 'at you (polite)'], ['машина', 'car'], ['суроо', 'question'], ['сдача', 'change (money back)'], ['жана', 'and'], ['анча … эмес', 'not very …'], ['чоң', 'big'], ['кичинекей', 'small, little']] }
      ],
      quiz: [
        { t: 'mc', q: '“I have a dog.”', o: ['[[Менин итим бар.]]', '[[Мен итим бар.]]', '[[Менин ит бар.]]', '[[Мен итти бар.]]'], why: 'my dog-my exists — both “my” markers.' },
        { t: 'mc', q: '“I don’t have a car.”', o: ['[[Менин машинам жок.]]', '[[Менин машинам эмес.]]', '[[Мен машина жокмун.]]', '[[Машинам бар эмес.]]'], why: 'Doesn’t exist → жок.' },
        { t: 'mc', q: 'At a shop: “Do you have bread?”', o: ['[[Сизде нан барбы?]]', '[[Сиздин наныңыз барбы?]]', '[[Нан сизби?]]', '[[Сиз нан барсызбы?]]'], why: 'Available at you → сизде.' },
        { t: 'mc', q: '[[Менде акча жок]] means…', o: ['I don’t have money on me.', 'I am not money.', 'Money is mine.', 'There is a lot of money.'], why: 'at me money none.' },
        { t: 'mc', q: '“Does she have a brother?”', o: ['[[Анын агасы барбы?]]', '[[Анын агам барбы?]]', '[[Ал агасыбы?]]', '[[Анын ага бар?]]'], why: 'her brother-her exists-?' },
        { t: 'type', q: 'Type: “I have a question.” (on me = менде, question = суроо)', a: ['Менде бир суроо бар', 'Менде суроо бар'], why: 'at me (one) question exists.' },
        { t: 'type', q: 'Type: “I don’t have time.” (my time = убактым)', a: ['Менин убактым жок', 'Убактым жок'], why: 'my time doesn’t exist.' },
        { t: 'order', q: 'Build: “I have two older sisters.”', a: 'Менин эки эжем бар', extra: ['эжелер'], why: 'No plural after numbers.' },
        { t: 'mc', q: 'What does [[кичинекей]] mean?', o: ['small, little', 'big', 'young', 'few'], why: '[[чоң]] big, [[кичинекей]] small.' }
      ]
    }
  ]
});
