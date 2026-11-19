/* Stage 6 — Mastery (B2) */
window.COURSE.stages.push({
  n: 6, title: 'Mastery', kg: 'Чеберчилик', level: 'B2',
  blurb: 'Build new words from old ones, handle long formal sentences, speak like a local with particles and idioms, read the news, understand the culture behind the language, and decode Kyrgyz at full speed.',
  lessons: [
    {
      id: 'word-building', title: 'Word-building toolkit', kg: 'Сөз жасоо', minutes: 40,
      goals: ['Recognise the 12 most productive suffixes', 'Guess the meaning of new words', 'Use paired words like ата-эне'],
      blocks: [
        { t: 'h', text: 'Cookie cutters for words' },
        { t: 'eli5', html: 'Kyrgyz has a box of cookie cutters. Press [[-чы]] into “song” and you get “singer”. Press [[-лык]] into “friend” and you get “friendship”. Learn a dozen cutters and every root you know becomes five or six words. At B2 this is how your vocabulary explodes.' },
        { t: 'table', cols: ['Suffix', 'Makes…', 'Examples'], rows: [
          ['[[-чы]]', 'a person who does / deals with it', '[[ыр|чы]] singer (song-er), [[мал|чы]] herder (livestock-er), [[балык|чы]] fisherman, [[темир|чи]] blacksmith'],
          ['[[-уучу]]', 'a person who does (from verbs)', '[[оку|учу]] pupil, [[сат|уучу]] seller, [[айд|оочу]] driver, [[жаз|уучу]] writer'],
          ['[[-лык]]', '-ness, -hood, -ship; from a place', '[[дос|тук]] friendship, [[жакшы|лык]] kindness, [[эркин|дик]] freedom, [[бала|лык]] childhood, [[бишкек|тик]] from Bishkek'],
          ['[[-луу]] / [[-сыз]]', 'with / without', '[[акыл|дуу]] clever, [[акыл|сыз]] stupid, [[шекер|сиз]] sugar-free, [[ийгилик|түү]] successful'],
          ['[[-дай]]', 'like, as; about (with numbers)', '[[тоо|дой]] like a mountain, [[бал|дай]] таттуу sweet as honey, [[отуз|дай]] адам about thirty people'],
          ['[[-ча]]', 'in the manner / language of', '[[кыргыз|ча]] in Kyrgyz, [[англис|че]] in English, [[мени|мче]] in my opinion'],
          ['[[-кана]]', 'a place for', '[[аш|кана]] kitchen, canteen; [[мейман|кана]] hotel; [[дары|кана]] pharmacy'],
          ['[[-гыч]]', 'a tool for doing', '[[ач|кыч]] key (opener), [[сүрт|күч]] wiper, eraser; [[муз|да|т|кыч]] fridge (ice-make-er)'],
          ['[[-уу]]', 'the act of (verbal noun)', '[[оку|у]] reading, studies; [[жаз|уу]] writing; [[сүйлө|ө]] speaking'],
          ['[[-ла]]', 'a verb from a noun / adjective', '[[таза|ла-]] to clean, [[ой|ло-]] to think, [[кол|до-]] to support (give a hand), [[баа|ла-]] to evaluate'],
          ['[[-ым]]', 'the result of an action', '[[бил|им]] knowledge, [[кий|им]] clothing, [[чеч|им]] decision, [[бөл|үм]] section, department'],
          ['[[-ыш]]', 'the way / act of doing', '[[жүр|үш]] way of walking, [[көр|үш]] view, [[ачыл|ыш]] opening']] },
        { t: 'h', text: 'Watch a word family grow' },
        { t: 'ex', items: [['оку-', 'read, study'], ['оку|у', 'study, studies'], ['оку|учу', 'pupil'], ['оку|т-', 'teach'], ['оку|т|уучу', 'teacher (university)'], ['оку|т|уу', 'teaching']] },
        { t: 'h', text: 'Paired words' },
        { t: 'p', html: 'Kyrgyz loves joining two related words with a hyphen to mean “X and that kind of thing”, or a whole category:' },
        { t: 'vocab', items: [['ата-эне', 'parents', 'father-mother'], ['бала-чака', 'kids, children (and family)'], ['кийим-кече', 'clothes and such'], ['идиш-аяк', 'dishes, crockery'], ['дос-тамыр', 'friends and acquaintances'], ['аш-тамак', 'food (all kinds)'], ['эл-жер', 'homeland, people and land'], ['ой-пикир', 'thoughts and opinions']] },
        { t: 'tip', title: 'Guessing strategy', html: 'When you meet a long unknown word, peel endings off from the right until you reach a root you know. [[ийгиликтүү]] → [[ийгилик|түү]] → “with success” → successful. Nine times out of ten you can guess, and context confirms it.' },
        { t: 'vocab', title: 'New words', items: [['мал', 'livestock'], ['темир', 'iron'], ['эркин', 'free'], ['ийгилик', 'success'], ['таттуу', 'sweet'], ['муз', 'ice'], ['чеч-', 'solve, decide; untie'], ['пикир', 'opinion']] }
      ],
      quiz: [
        { t: 'mc', q: '[[ырчы]] means…', o: ['singer', 'song', 'to sing', 'musical'], why: 'ыр (song) + чы (person).' },
        { t: 'mc', q: '[[достук]] means…', o: ['friendship', 'friendly', 'friends', 'befriend'], why: '-лык/-тук = -ship.' },
        { t: 'mc', q: '[[менимче]] means…', o: ['in my opinion', 'like me', 'for me', 'my language'], why: '-ча = according to.' },
        { t: 'mc', q: '[[ачкыч]] means…', o: ['key, opener', 'opening', 'open', 'hungry'], why: 'ач (open) + кыч (tool).' },
        { t: 'mc', q: '[[ата-эне]] means…', o: ['parents', 'grandparents', 'father’s mother', 'family name'], why: 'father-mother.' },
        { t: 'mc', q: '[[ойло-]] means…', o: ['to think', 'thought', 'thoughtful', 'to forget'], why: 'ой (thought) + ло (make verb).' },
        { t: 'mc', q: '[[отуздай адам]] means…', o: ['about thirty people', 'thirty-year-old person', 'the thirtieth person', 'thirty times a person'], why: '-дай with numbers = about.' },
        { t: 'mc', q: '[[билим]] means…', o: ['knowledge', 'to know', 'knowing person', 'known'], why: 'бил (know) + им (result).' },
        { t: 'type', q: 'Type the Kyrgyz word for “in English” (English = англис)', a: ['англисче'], why: 'англис + че.' },
        { t: 'type', q: 'Type the word for “kitchen” (food + place)', a: ['ашкана'], why: 'аш + кана.' }
      ]
    },
    {
      id: 'complex', title: 'Long sentences & formal grammar', kg: 'Татаал сүйлөмдөр', minutes: 40,
      goals: ['Use -уу and -ыш as nouns', 'Say “I don’t know when/where/what…”', 'Use “the more… the more” and “every time”'],
      blocks: [
        { t: 'h', text: 'Actions as things' },
        { t: 'eli5', html: 'At B2 you start treating whole actions as objects you can pick up: “learning Kyrgyz”, “his coming”, “the fact that it’s true”. Kyrgyz has three tools for this, from most general to most specific: [[-уу]] (the act), [[-ыш]] + my/your (someone’s doing it), [[-гандык]] (the fact that).' },
        { t: 'table', cols: ['Tool', 'Feeling', 'Example'], rows: [['[[-уу]]', 'the action in general', '[[Кыргыз тилин үйрөн|үү кызыктуу.]] — Learning Kyrgyz is interesting.'], ['[[-ыш]] + poss.', 'someone’s action, often necessary', '[[Анын кел|иш|и керек.]] — He needs to come.'], ['[[-ган]] + poss.', 'something done (lesson 5.2)', '[[Айт|кан|ыңыз туура.]] — What you said is right.'], ['[[-гандык]] / [[экендик]]', 'the fact that (formal)', '[[Анын туура экен|диг|ин бил|е|м.]] — I know that he is right.']] },
        { t: 'h', text: 'Signs you’ll see everywhere' },
        { t: 'ex', items: [['Тамеки чег|үү|гө болбойт.', 'No smoking.', 'to smoking it is not allowed'], ['Сүрөткө тарт|уу|га тыюу салынат.', 'Photography prohibited.'], ['Кир|үү', 'Entrance'], ['Чыг|уу', 'Exit'], ['Иттер менен кир|үү|гө болбойт.', 'No dogs allowed.']] },
        { t: 'h', text: 'I don’t know when / where / what' },
        { t: 'compare', en: 'I don’t know when he will come.', kg: 'Анын качан кел|ер|ин бил|бе|й|м.', gloss: 'his when coming-his-(obj) know-not-I', note: 'The question word stays inside; the verb becomes a noun with -ар/-ган + his + object ending.' },
        { t: 'ex', items: [['Кайда экен|ин айтчы.', 'Tell me where it is.'], ['Эмне кыл|ыш керек|тиг|ин түшүн|дү|м.', 'I understood what needs to be done.'], ['Ким кел|ген|ин көр|дү|ңбү?', 'Did you see who came?'], ['Канча турар|ын сура|ды|м.', 'I asked how much it would cost.']] },
        { t: 'h', text: 'The more…, the more…' },
        { t: 'compare', en: 'The more you read, the more you know.', kg: 'Канча көп оку|са|ң, ошончо көп бил|е|сиң.', gloss: 'how.much a.lot read-if-you, that.much a.lot know-you' },
        { t: 'ex', items: [['Ал кел|ген сайын белек алып кел|е|т.', 'Every time he comes, he brings a present.', '-ган сайын = every time'], ['Бекер отур|ган|ча, иште|йин.', 'Rather than sitting idle, let me work.', '-ганча = rather than'], ['Ким эмгектен|се, ошол жей|т.', 'Whoever works, eats.', 'ким … ошол = whoever … that one'], ['Кандай сура|са|ң, ошондой жооп ал|а|сың.', 'As you ask, so you’ll be answered.']] },
        { t: 'h', text: 'Unpacking a long sentence' },
        { t: 'p', html: 'Here is a real B2-style sentence. Find the final verb first, then its subject, then the descriptions:' },
        { t: 'ex', items: [['Былтыр Нарында өткөн фестивалга катышкан чет элдик туристтердин көбү кайра келгиси келерин айтышты.', 'Most of the foreign tourists who took part in the festival held in Naryn last year said that they would like to come back.']] },
        { t: 'list', ordered: true, items: ['Final verb: [[айтышты]] — they said.', 'Who? [[туристтердин көбү]] — most of the tourists.', 'Which tourists? [[чет элдик]] (foreign), who [[катышкан]] (took part) [[фестивалга]] (in the festival).', 'Which festival? The one [[өткөн]] (held) [[Нарында]] (in Naryn) [[былтыр]] (last year).', 'Said what? [[кайра келгиси келерин]] — that they’d like to come back.'] },
        { t: 'vocab', items: [['кызыктуу', 'interesting'], ['тыюу салын-', 'be prohibited'], ['кирүү / чыгуу', 'entrance / exit'], ['сайын', 'every (time)'], ['бекер', 'idle; for free; in vain'], ['эмгектен-', 'work, labour'], ['жооп', 'answer'], ['катыш-', 'take part'], ['чет элдик', 'foreign, foreigner'], ['кайра', 'again, back']] }
      ],
      quiz: [
        { t: 'mc', q: '[[Тамеки чегүүгө болбойт]] is a sign meaning…', o: ['No smoking.', 'Smoking area.', 'Cigarettes sold here.', 'Smoking is unhealthy.'], why: 'to smoking it isn’t allowed.' },
        { t: 'mc', q: '“Learning Kyrgyz is interesting.”', o: ['[[Кыргыз тилин үйрөнүү кызыктуу.]]', '[[Кыргыз тилин үйрөнөм кызыктуу.]]', '[[Кыргыз тили үйрөнгөн кызыктуу.]]', '[[Кызыктуу үйрөнөт кыргыз тил.]]'], why: '-уу = the act of.' },
        { t: 'mc', q: '“I don’t know when he will come.”', o: ['[[Анын качан келерин билбейм.]]', '[[Мен билбейм ал качан келет.]]', '[[Качан ал келет билбейм деп.]]', '[[Анын качан келди билбейм.]]'], why: 'Embedded question → noun with -ар + ын.' },
        { t: 'mc', q: '[[Ал келген сайын белек алып келет]] means…', o: ['Every time he comes, he brings a present.', 'When he came, he brought a present.', 'He will come with a present.', 'He came to bring a present.'], why: '-ган сайын = every time.' },
        { t: 'mc', q: '“The more you read, the more you know.”', o: ['[[Канча көп окусаң, ошончо көп билесиң.]]', '[[Көп окусаң, көп билдиң.]]', '[[Окуган сайын билбейсиң.]]', '[[Ошончо окусаң канча билесиң.]]'], why: 'канча … ошончо.' },
        { t: 'mc', q: 'In a long Kyrgyz sentence, what should you find first?', o: ['The final verb', 'The first word', 'All the adjectives', 'The longest word'], why: 'The verb at the end tells you what happened.' },
        { t: 'type', q: 'Type the sign word for “Exit” (go out = чык-)', a: ['Чыгуу'], why: 'чык → чыг + уу.' },
        { t: 'order', q: 'Build: “Rather than sitting idle, let me work.”', a: 'Бекер отурганча иштейин', why: '-ганча = rather than.' }
      ]
    },
    {
      id: 'natural-speech', title: 'Speak like a local: particles & register', kg: 'Да, эле, го, чы', minutes: 40,
      goals: ['Use the little particles that make speech natural', 'Use 15 discourse words: actually, anyway, for example', 'Switch between formal, polite and casual'],
      blocks: [
        { t: 'h', text: 'Tiny words, big feelings' },
        { t: 'eli5', html: 'Textbook Kyrgyz is correct but stiff, like a robot. Real people sprinkle in tiny words that carry feelings: surprise, doubt, insistence, softness. They’re like emojis for your voice. Add a few and you suddenly sound human.' },
        { t: 'table', cols: ['Particle', 'Feeling', 'Example'], rows: [
          ['[[да / дагы]]', 'also; emphasis, “come on”', '[[Мен да.]] — Me too. [[Ооба да!]] — Of course! [[Кел да!]] — Come on, come!'],
          ['[[эле]]', 'just, only, already', '[[азыр эле]] — right now; [[жаңы эле]] — just now; [[Мен эле билем]] — only I know'],
          ['[[го]]', 'probably, I guess', '[[Ал келет го.]] — He’ll come, I suppose.'],
          ['[[-чы]]', 'softener; “what about…?”', '[[Сенчи?]] — And you? [[Айтчы.]] — Tell me.'],
          ['[[гана]]', 'only', '[[Бир гана суроо.]] — Just one question.'],
          ['[[деле]]', 'even; anyway', '[[Ал деле билбейт.]] — Even he doesn’t know.'],
          ['[[эмеспи]]', 'after all, you know', '[[Бүгүн жума эмеспи.]] — It’s Friday, after all.'],
          ['[[экен]]', 'oh, so…! (discovery)', '[[Сонун экен!]] — Oh, it’s wonderful!'],
          ['[[бекен]]', 'I wonder…', '[[Ал келер бекен?]] — I wonder if he’ll come.']] },
        { t: 'h', text: 'Words that steer a conversation' },
        { t: 'vocab', items: [['Чынбы? / Чын элеби?', 'Really?'], ['Ырас.', 'True. That’s right.'], ['Албетте.', 'Of course.'], ['Балким', 'maybe, perhaps'], ['Сыягы', 'apparently, it seems'], ['Чынында', 'actually, in fact'], ['Мисалы', 'for example'], ['Демек', 'so, that means'], ['Айтор', 'anyway'], ['Баары бир', 'it doesn’t matter; all the same'], ['Жалпысынан', 'in general'], ['Биринчиден… экинчиден…', 'firstly… secondly…'], ['Менин оюмча', 'in my opinion'], ['Кыскасы', 'in short'], ['Мейли эми', 'oh well, never mind']] },
        { t: 'h', text: 'Three registers' },
        { t: 'table', cols: ['', 'Formal (writing, officials)', 'Polite (default)', 'Casual (friends)'], rows: [['Hello', '[[Саламатсыздарбы!]]', '[[Саламатсызбы!]]', '[[Салам! Кандай?]]'], ['Could you…?', '[[… бере аласызбы?]]', '[[… бериңизчи.]]', '[[… берчи.]]'], ['Thank you', '[[Ыраазычылык билдирем.]]', '[[Чоң рахмат.]]', '[[Рахмат!]]'], ['Bye', '[[Урматтоо менен]] (in letters)', '[[Жакшы калыңыз.]]', '[[Кош! Көрүшкөнчө!]]']] },
        { t: 'h', text: 'What people actually say' },
        { t: 'list', items: ['<b>[[жатат]] often sounds like [[атат]]:</b> [[Эмне кылып жатасың?]] → “Эмне кылып атасың?”', '<b>“Didn’t” in speech:</b> instead of [[көрбөдүм]], people very often say [[көргөн жокмун]] — I didn’t see (it).', '<b>Russian mixing:</b> in Bishkek you’ll hear Russian words inside Kyrgyz sentences — [[короче]] (in short), [[вообще]] (generally), [[нормально]] (fine). It’s normal; understand it, but you don’t need to copy it.', '<b>Names with respect:</b> add [[байке]] or [[эже]] after names of older people: [[Асан байке]], [[Гүлнара эже]]. A male teacher is [[агай]], a female teacher [[эжеке]].'] },
        { t: 'h', text: 'A formal email' },
        { t: 'ex', items: [['Урматтуу Асел Бакытовна!', 'Dear Asel Bakytovna,', 'урматтуу = respected; formal style uses first name + patronymic'], ['Сизге … жөнүндө кайрылып жатам.', 'I am writing to you about …'], ['Жообуңузду күтөм.', 'I look forward to your reply.'], ['Урматтоо менен, Том Смит', 'Yours sincerely, Tom Smith']] },
        { t: 'dialog', title: 'Natural chat', lines: [['Азамат', 'Кандай, бро? Эмне кылып атасың?', 'Hey, how’s it going? What are you up to?'], ['Tom', 'Эч нерсе, үйдө эле отурам. Сенчи?', 'Nothing, just sitting at home. You?'], ['Азамат', 'Мен да. Кечинде футбол бар эмеспи, көрөбүзбү?', 'Same. There’s football tonight, you know — shall we watch?'], ['Tom', 'Ооба да! Бирок кайсы жерде?', 'Of course! But where?'], ['Азамат', 'Менин үйүмдө. Беш адамдай болобуз го.', 'At mine. There’ll be about five of us, I guess.']] }
      ],
      quiz: [
        { t: 'mc', q: '[[Сенчи?]] means…', o: ['And you?', 'Are you there?', 'Is it you?', 'You again?'], why: '-чы = what about.' },
        { t: 'mc', q: '[[Ал келет го]] means…', o: ['He’ll come, I suppose.', 'He must come!', 'He came.', 'Will he come?'], why: 'го = probably.' },
        { t: 'mc', q: '[[азыр эле]] means…', o: ['right now', 'not now', 'later', 'always'], why: 'эле = just.' },
        { t: 'mc', q: 'Which word means “actually, in fact”?', o: ['[[Чынында]]', '[[Балким]]', '[[Айтор]]', '[[Мисалы]]'], why: 'чын = true.' },
        { t: 'mc', q: 'In casual speech, [[көргөн жокмун]] means…', o: ['I didn’t see (it).', 'I have never been seen.', 'I don’t see.', 'There is no one I saw.'], why: 'A very common spoken past negative.' },
        { t: 'mc', q: 'How do you start a formal letter?', o: ['[[Урматтуу …!]]', '[[Салам, …!]]', '[[Кандай, …?]]', '[[Кош, …!]]'], why: 'урматтуу = respected, dear.' },
        { t: 'mc', q: '[[Ал келер бекен?]] means…', o: ['I wonder if he’ll come.', 'He will definitely come.', 'Did he come?', 'He came, apparently.'], why: 'бекен = I wonder.' },
        { t: 'type', q: 'Type: “Me too.”', a: ['Мен да', 'Мен дагы'], why: 'да = too.' },
        { t: 'order', q: 'Build: “It’s Friday, after all.”', a: 'Бүгүн жума эмеспи', why: 'эмеспи = after all, you know.' }
      ]
    },
    {
      id: 'proverbs', title: 'Proverbs, idioms and blessings', kg: 'Макалдар', minutes: 35,
      goals: ['Understand 12 well-known proverbs', 'Use 10 body-part idioms', 'Give blessings and congratulations'],
      blocks: [
        { t: 'h', text: 'Why proverbs matter' },
        { t: 'eli5', html: 'Kyrgyz grew up as a spoken language of nomads, passed on by storytellers and poets. Proverbs ([[макал-лакаптар]]) are its pocket wisdom. Older people drop them into conversation all the time. Using one at the right moment earns you instant respect — and a big smile.' },
        { t: 'h', text: '12 proverbs' },
        { t: 'ex', items: [
          ['Жакшы сөз — жарым ырыс.', 'A kind word is half of happiness.'],
          ['Ырыс алды — ынтымак.', 'Unity is the beginning of happiness.'],
          ['Миң уккандан бир көргөн артык.', 'Seeing once is better than hearing a thousand times.', 'like “seeing is believing”'],
          ['Көп жашаган билбейт, көптү көргөн билет.', 'It’s not the one who has lived long who knows, but the one who has seen much.'],
          ['Ат — адамдын канаты.', 'The horse is a person’s wings.'],
          ['Таш түшкөн жерине оор.', 'A stone is heaviest where it falls.', 'trouble weighs most on the one it happens to'],
          ['Сабырдуу жетер муратка, сабырсыз калар уятка.', 'The patient reach their goal; the impatient end in shame.'],
          ['Ачуу — душман, акыл — дос.', 'Anger is an enemy, reason is a friend.'],
          ['Эмгектин наны таттуу.', 'The bread of labour is sweet.'],
          ['Билекти билим жыгат.', 'Knowledge beats muscle.', 'knowledge throws down the forearm'],
          ['Ата-энеңди сыйласаң, балаңдан сый көрөсүң.', 'Respect your parents, and your children will respect you.'],
          ['Өнөр алды — кызыл тил.', 'The first of all skills is eloquence.', 'the red tongue — speech']] },
        { t: 'h', text: 'Body-part idioms' },
        { t: 'table', cols: ['Idiom', 'Literally', 'Meaning'], rows: [['[[колу ачык]]', 'hand open', 'generous'], ['[[оозу бош]]', 'mouth loose', 'can’t keep a secret'], ['[[кулак сал-]]', 'put an ear', 'listen carefully'], ['[[көз сал-]]', 'put an eye', 'keep an eye on'], ['[[бети жок]]', 'has no face', 'shameless'], ['[[мурдун көтөр-]]', 'raise one’s nose', 'be arrogant'], ['[[жүрөгү түшүп кетти]]', 'his heart dropped', 'he got a fright'], ['[[башы айланды]]', 'his head spun', 'he got dizzy / confused'], ['[[тилин тап-]]', 'find someone’s tongue', 'find a way to get along with'], ['[[колдон келет]]', 'it comes from the hand', 'can manage, be able to']] },
        { t: 'ex', items: [['Ал абдан колу ачык адам.', 'She’s a very generous person.'], ['Сөзүмө кулак салыңыз.', 'Please listen carefully to what I say.'], ['Колумдан келгенче жардам берем.', 'I’ll help as much as I can.', 'as far as it comes from my hand']] },
        { t: 'h', text: 'Blessings and wishes' },
        { t: 'vocab', items: [['Ак жол!', 'Have a good trip!', '“white road”'], ['Куттуктайм!', 'Congratulations!'], ['Туулган күнүң менен!', 'Happy birthday! (friendly)', 'polite: [[Туулган күнүңүз менен!]]'], ['Жаңы жылыңыз менен!', 'Happy New Year!'], ['Ден соолугуңуз чың болсун!', 'Good health to you!', '“may your health be strong”'], ['Ишиңизге ийгилик!', 'Good luck with your work!'], ['Аш болсун!', 'Enjoy your meal!', 'said to people eating'], ['Оомийин', 'Amen — said with hands passed over the face after a blessing (бата)'], ['Береке берсин!', 'May there be abundance! (thanks after a meal)']] },
        { t: 'tip', title: 'The бата', html: 'After a meal, an elder often gives a blessing ([[бата]]): everyone holds their hands open, palms up, and at the end says [[Оомийин]] while passing the hands down over the face. Simply follow what others do.' }
      ],
      quiz: [
        { t: 'mc', q: '[[Миң уккандан бир көргөн артык]] means…', o: ['Seeing once is better than hearing a thousand times.', 'A thousand people heard it.', 'Listen a thousand times.', 'One who sees, hears.'], why: 'from a thousand hearings, one seeing is better.' },
        { t: 'mc', q: '[[Жакшы сөз — жарым ырыс]] means…', o: ['A kind word is half of happiness.', 'Good words are rare.', 'Speak half of what you know.', 'Happiness is a good word.'], why: 'ырыс = happiness, fortune.' },
        { t: 'mc', q: 'Someone who is [[колу ачык]] is…', o: ['generous', 'clumsy', 'injured', 'honest'], why: 'Open-handed.' },
        { t: 'mc', q: '[[кулак сал-]] means…', o: ['listen carefully', 'refuse to listen', 'whisper', 'hear a rumour'], why: 'put an ear.' },
        { t: 'mc', q: 'A friend is going on a trip. You say…', o: ['[[Ак жол!]]', '[[Куттуктайм!]]', '[[Оомийин!]]', '[[Береке берсин!]]'], why: 'white road = good journey.' },
        { t: 'mc', q: '[[Ат — адамдын канаты]] means…', o: ['The horse is a person’s wings.', 'A person’s name is their wings.', 'The horse is faster than a bird.', 'Names fly away.'], why: 'ат = horse here; канат = wing.' },
        { t: 'mc', q: '[[Колумдан келгенче жардам берем]] means…', o: ['I’ll help as much as I can.', 'I’ll help with my hands.', 'Come and help me.', 'Help came from my hand.'], why: 'as far as it comes from my hand.' },
        { t: 'type', q: 'Type: “Congratulations!”', a: ['Куттуктайм', 'Куттуктайм!'], why: 'куттукта- = congratulate.' },
        { t: 'order', q: 'Build: “Good luck with your work!”', a: 'Ишиңизге ийгилик', why: 'to-your-work success.' }
      ]
    },
    {
      id: 'news', title: 'Reading the news', kg: 'Жаңылыктар', minutes: 40,
      goals: ['Know 30 words from news and politics', 'Recognise formal passives and reporting verbs', 'Read a short news article'],
      blocks: [
        { t: 'h', text: 'The language of headlines' },
        { t: 'eli5', html: 'News Kyrgyz is like everyday Kyrgyz wearing a suit and tie. Same grammar, but longer words, lots of “was done” (passive) and “according to”. Learn about fifty key words and the formal patterns, and news goes from impossible to readable.' },
        { t: 'vocab', items: [['өкмөт', 'government'], ['президент', 'president'], ['Жогорку Кеңеш', 'Supreme Council — the parliament', 'short: ЖК'], ['депутат', 'member of parliament'], ['министрлик', 'ministry'], ['мыйзам', 'law'], ['шайлоо', 'election'], ['мамлекет', 'state, country'], ['Кыргыз Республикасы', 'the Kyrgyz Republic', 'short: КР'], ['эл аралык', 'international'], ['БУУ', 'the UN', '[[Бириккен Улуттар Уюму]]'], ['экономика', 'economy'], ['бюджет', 'budget'], ['маалымат', 'information, data'], ['билдирүү', 'statement, announcement'], ['жыйын', 'meeting, gathering'], ['долбоор', 'project, draft'], ['курулуш', 'construction'], ['аба ырайы', 'the weather (also the name of the forecast segment)'], ['борбор калаа', 'capital city']] },
        { t: 'h', text: 'Formal patterns' },
        { t: 'table', cols: ['Pattern', 'Meaning', 'Example'], rows: [['[[… боюнча]]', 'according to; on (the topic of)', '[[маалымат боюнча]] — according to information'], ['[[…-га ылайык]]', 'in accordance with', '[[мыйзамга ылайык]] — in line with the law'], ['[[…-гандыгын билдирди]]', 'reported that', '[[Министр долбоор кабыл алынгандыгын билдирди.]]'], ['[[маалымдады]]', '(he/she) informed', '[[Пресс-кызмат маалымдады.]] — the press service reported'], ['[[белгиледи]]', 'noted, stressed', '[[Президент белгиледи.]]'], ['[[кабыл алынды]]', 'was adopted', '[[Мыйзам кабыл алынды.]]'], ['[[ишке ашырылат]]', 'will be implemented', '[[Долбоор ишке ашырылат.]]'], ['[[өттү]]', 'took place', '[[Жыйын өттү.]] — A meeting was held.']] },
        { t: 'h', text: 'Read an article' },
        { t: 'p', html: 'A short, invented news item in real news style. Read it twice: once for the gist, once with the glosses.' },
        { t: 'ex', items: [
          ['Бишкекте жаңы мектеп ачылды.', 'A new school has opened in Bishkek.'],
          ['Шаардык мэриянын маалыматы боюнча, мектеп 1200 окуучуга ылайыкталган.', 'According to the city hall, the school is designed for 1,200 pupils.'],
          ['Ачылыш аземине шаар мэри, мугалимдер жана ата-энелер катышты.', 'The mayor, teachers and parents attended the opening ceremony.'],
          ['Мэр өз сөзүндө билим берүү шаардын негизги милдеттеринин бири экенин белгиледи.', 'In his speech, the mayor stressed that education is one of the city’s main duties.'],
          ['Анын билдирүүсүнө ылайык, быйыл борбор калаада дагы үч мектеп курулат.', 'According to his statement, three more schools will be built in the capital this year.']] },
        { t: 'tip', title: 'How to read news faster', html: '1) Read the headline and first sentence — they hold the whole story. 2) Look for the verb at the end of each sentence. 3) Skip the long official names; they’re just “the ministry” or “the city”. 4) Read the same story on <a href="https://www.azattyk.org">Azattyk</a> in Kyrgyz after reading it in English elsewhere — knowing the story makes the language easy.' },
        { t: 'vocab', title: 'From the article', items: [['мэрия', 'city hall'], ['ылайыкталган', 'designed for, adapted to'], ['ачылыш аземи', 'opening ceremony'], ['катыш-', 'take part, attend'], ['билим берүү', 'education', '“giving knowledge”'], ['негизги', 'main, basic'], ['милдет', 'duty, task'], ['быйыл', 'this year'], ['курул-', 'be built']] }
      ],
      quiz: [
        { t: 'mc', q: '[[өкмөт]] means…', o: ['government', 'parliament', 'president', 'ministry'], why: 'өкмөт = government.' },
        { t: 'mc', q: '[[Жогорку Кеңеш]] is…', o: ['the parliament', 'the supreme court', 'the president’s office', 'a newspaper'], why: 'Supreme Council = parliament.' },
        { t: 'mc', q: '[[маалымат боюнча]] means…', o: ['according to information', 'information about', 'without information', 'more information'], why: 'боюнча = according to.' },
        { t: 'mc', q: '[[Мыйзам кабыл алынды]] means…', o: ['The law was adopted.', 'The law was cancelled.', 'They accepted the lawyer.', 'Adopt the law!'], why: 'Passive of кабыл ал-.' },
        { t: 'mc', q: '[[шайлоо]] means…', o: ['election', 'law', 'statement', 'budget'], why: 'шайла- = elect; шайлоо = election.' },
        { t: 'mc', q: 'In the article, how many new schools will be built this year?', o: ['three more', 'one', '1,200', 'none'], why: '[[дагы үч мектеп курулат]].' },
        { t: 'mc', q: '[[быйыл]] means…', o: ['this year', 'last year', 'next year', 'every year'], why: 'быйыл = this year; былтыр = last year.' },
        { t: 'type', q: 'Type: “the weather” (as in the news segment)', a: ['аба ырайы'], why: 'аба (air) ырайы (its appearance).' },
        { t: 'order', q: 'Build: “A new school has opened in Bishkek.”', a: 'Бишкекте жаңы мектеп ачылды', why: 'Bishkek-in new school was.opened.' }
      ]
    },
    {
      id: 'culture', title: 'Culture inside the language', kg: 'Маданият', minutes: 40,
      goals: ['Know the Manas epic and its place in Kyrgyz life', 'Name the parts of a yurt', 'Understand hospitality, holidays and nomadic games'],
      blocks: [
        { t: 'h', text: 'Manas' },
        { t: 'p', html: 'The epic of <b>Manas</b> ([[Манас эпосу]]) tells of the hero Manas, who unites the Kyrgyz tribes, and continues with his son Semetey and grandson Seitek. Some recorded versions run to around half a million lines, making it one of the longest epic poems in the world. It is performed from memory by a [[манасчы]], a reciter who chants in a trance-like flow. UNESCO added the Kyrgyz epic trilogy to its Intangible Cultural Heritage list in 2013.' },
        { t: 'p', html: 'Manas is everywhere: Bishkek’s airport, the main university, statues, streets and banknotes carry the name. Knowing a few lines of it is like an English speaker quoting Shakespeare.' },
        { t: 'vocab', items: [['эпос', 'epic'], ['манасчы', 'Manas reciter'], ['баатыр', 'hero, warrior'], ['акын', 'poet, bard (improvises verse)'], ['айтыш', 'improvised poetic duel between two akyns'], ['комуз', 'komuz — the three-string lute'], ['күү', 'an instrumental piece for komuz']] },
        { t: 'h', text: 'The yurt: a home that moves' },
        { t: 'p', html: 'The [[боз үй]] (literally “grey house”, for its felt) was home for nomadic families and can be taken down and loaded onto horses in about an hour. Its parts name many things in Kyrgyz life:' },
        { t: 'table', cols: ['Part', 'What it is', 'Why it matters'], rows: [['[[түндүк]]', 'the round crown at the top', 'it’s on the national flag; passed down through generations as a symbol of the family'], ['[[уук]]', 'the curved roof poles', 'they connect the walls to the түндүк'], ['[[кереге]]', 'the folding lattice walls', 'the size of a yurt is counted in кереге sections'], ['[[босого]]', 'the threshold', 'never step on it — it’s disrespectful'], ['[[төр]]', 'the place of honour, opposite the door', 'for the most honoured guest or eldest person'], ['[[шырдак]]', 'a bright felt carpet with mosaic patterns', 'a signature Kyrgyz craft']] },
        { t: 'tip', title: 'The flag', html: 'The red flag shows a golden sun with 40 rays — one for each of the legendary forty tribes — and a [[түндүк]] in the middle. A folk explanation of the name [[кыргыз]] links it to [[кырк]] (forty).' },
        { t: 'h', text: 'Hospitality' },
        { t: 'p', html: 'A guest ([[конок]]) is sacred. The table spread for guests is the [[дасторкон]], covered with bread, sweets, dried fruit and [[боорсок]] before the main dishes even arrive. Bread is never thrown away or placed upside down. Tea keeps coming: your host pours a little at a time, so it stays hot — an empty cup is quickly refilled. At big feasts the most honoured guest may be offered the sheep’s head ([[кой башы]]) to share out.' },
        { t: 'h', text: 'Holidays and games' },
        { t: 'vocab', items: [['Нооруз', 'Nooruz — spring New Year, 21 March'], ['Ак калпак күнү', 'Kalpak Day, 5 March'], ['Эгемендүүлүк күнү', 'Independence Day, 31 August'], ['көк бөрү', 'kok-boru — horseback game played with a goat carcass', '“grey wolf”'], ['ордо', 'ordo — a game of knucklebones'], ['тогуз коргоол', 'toguz korgool — a board game with stones', '“nine sheep droppings”!'], ['оодарыш', 'wrestling on horseback'], ['Көчмөндөр оюндары', 'the World Nomad Games', 'held in Kyrgyzstan in 2014, 2016 and 2018']] },
        { t: 'h', text: 'Words that carry culture' },
        { t: 'ex', items: [['Кыз — конок.', 'A daughter is a guest.', 'she will one day marry and leave, so she is cherished'], ['Ата-бабалардын салты', 'the tradition of our ancestors'], ['Жети ата', 'seven fathers', 'Kyrgyz traditionally know their ancestors seven generations back'], ['Ашар', 'community work', 'neighbours helping build a house, for free']] }
      ],
      quiz: [
        { t: 'mc', q: 'Who is a [[манасчы]]?', o: ['A reciter of the Manas epic', 'A descendant of Manas', 'A horseback warrior', 'A yurt builder'], why: '-чы = person who deals with it.' },
        { t: 'mc', q: 'What is the [[түндүк]]?', o: ['The crown at the top of a yurt', 'The door of a yurt', 'A felt carpet', 'The place of honour'], why: 'It’s on the flag.' },
        { t: 'mc', q: 'Which part of the yurt should you never step on?', o: ['[[босого]] (threshold)', '[[төр]]', '[[кереге]]', '[[шырдак]]'], why: 'Stepping on the threshold is disrespectful.' },
        { t: 'mc', q: 'What is [[көк бөрү]]?', o: ['A horseback game', 'A wolf hunt', 'A spring holiday', 'A blue felt hat'], why: 'Literally “grey wolf”.' },
        { t: 'mc', q: 'When is Nooruz?', o: ['21 March', '5 March', '31 August', '1 January'], why: 'The spring equinox new year.' },
        { t: 'mc', q: 'How many rays does the sun on the flag have?', o: ['40', '12', '7', '100'], why: 'One for each of the forty tribes.' },
        { t: 'mc', q: '[[дасторкон]] is…', o: ['the table spread for guests', 'a felt carpet', 'a soup', 'a guest'], why: 'Covered with bread, sweets and more.' },
        { t: 'mc', q: '[[Ашар]] means…', o: ['neighbours helping each other for free', 'a big feast', 'a wedding', 'a market day'], why: 'Community work.' },
        { t: 'type', q: 'Type the word for “yurt” (grey house)', a: ['боз үй'], why: 'боз (grey) + үй (house).' }
      ]
    },
    {
      id: 'fast', title: 'Decoding Kyrgyz at full speed', kg: 'Тез түшүнүү', minutes: 45,
      goals: ['Split any long word into its pieces in seconds', 'Know the fixed order of endings', 'Train your ear for real-speed speech'],
      blocks: [
        { t: 'h', text: 'Every word has the same skeleton' },
        { t: 'eli5', html: 'Kyrgyz endings always stand in line in the <b>same order</b>, like children lining up by height. Once you know the line, you can split any monster word, even one you’ve never seen. Read from the right: the last piece tells you the role, the one before says whose, then how many, then what kind of thing.' },
        { t: 'table', cols: ['Nouns', '1. Root', '2. New word', '3. Many', '4. Whose', '5. Role (case)', '6. “the one at”', '7. Is / ?'], rows: [['example', '[[үй]]', '—', '[[лөр]]', '[[үбүз]]', '[[дө]]', '[[гү]]', '—'], ['meaning', 'house', '', '-s', 'our', 'in', 'the one(s)', '']] },
        { t: 'p', html: '[[үй|лөр|үбүз|дө|гү]] = “the one(s) in our houses”. The piece [[-дагы]] (“which is at”) turns a place into a description: [[Бишкек|те|ги]] — the one in Bishkek, [[үйдөгүлөр]] — the people at home.' },
        { t: 'table', cols: ['Verbs', '1. Root', '2. Voice', '3. Not', '4. Time / mood', '5. Person', '6. ?'], rows: [['example', '[[көр]]', '[[үш]]', '[[пө]]', '[[й]]', '[[бүз]]', '[[бү]]'], ['meaning', 'see', 'each other', 'not', '(now/later)', 'we', '?']] },
        { t: 'p', html: '[[көр|үш|пө|й|бүз|бү?]] = “Won’t we see each other?”' },
        { t: 'h', text: 'Practice: split these monsters' },
        { t: 'ex', items: [
          ['Кыргызстан|дык|тар|дын', 'of the people of Kyrgyzstan', 'Kyrgyzstan - from - many - of'],
          ['китеп|тер|ибиз|ден', 'from our books'],
          ['оку|т|кан|дар|га', 'to those who taught', 'read - make - who did - many - to'],
          ['жаз|ыл|ган|дыг|ын', '(the fact) that it was written (object)', 'write - be done - did - fact - its'],
          ['кел|бе|ген|диг|иңиз|ди', '(the fact) that you didn’t come (object)'],
          ['үйрөн|үш|үбүз керек', 'we need to learn'],
          ['сүйлө|ш|түр|үп кой|ду', 'he quickly got them talking to each other'],
          ['бар|ба|й кал|ган|ым|ды', '(the fact) that I ended up not going (object)']] },
        { t: 'h', text: 'Train your ear' },
        { t: 'list', items: ['<b>Wait for the verb.</b> In Kyrgyz the action comes last. Practise holding the first part of a sentence in your head without translating it.', '<b>Listen for endings, not roots.</b> [[-дан]], [[-га]], [[-да]], [[-ган]], [[-са]], [[-ып]] are loud signposts. Even if you miss a word, the ending tells you its job.', '<b>Learn the spoken shortcuts:</b> [[жатат]] → “атат”, [[барганмын]] → “баргам”, [[эмне үчүн]] → “эмнеге”, [[көргөн жокмун]] = I didn’t see.', '<b>Shadow:</b> play 5–10 seconds of a podcast or video, pause, repeat with the same speed and melody. Ten minutes a day changes your listening in a month.', '<b>Transcribe:</b> write down one minute of real speech. Check against subtitles. It shows you exactly which sounds your ear is missing.', '<b>Re-listen:</b> the same clip ten times beats ten clips once. Familiar audio trains your brain to parse at speed.'] },
        { t: 'h', text: 'Your B2 checklist' },
        { t: 'list', items: ['I can follow a TV news story about a familiar topic.', 'I can read an Azattyk article with a dictionary for only a few words.', 'I can explain my opinion and argue with [[менимче]], [[бирок]], [[анткени]], [[ошондуктан]].', 'I can tell a story in the past using [[-ды]], [[-чу]], [[-ыптыр]] and [[-ганда]].', 'I can talk with a Kyrgyz speaker for 20 minutes without switching to English or Russian.', 'I understand most of what my friends say to each other — not just what they say to me.'] },
        { t: 'tip', title: 'What next?', html: 'From here, the course gives way to real life. Read Kyrgyz literature (Chingiz Aitmatov’s stories are available in Kyrgyz — try [[Жамийла]]), watch Kyrgyz films with subtitles, follow Kyrgyz musicians, and speak every day. Congratulations — [[Куттуктайбыз!]]' }
      ],
      quiz: [
        { t: 'mc', q: '[[үйлөрүбүздө]] means…', o: ['in our houses', 'from our house', 'our houses are', 'to our houses'], why: 'үй-лөр-үбүз-дө: house-s-our-in.' },
        { t: 'mc', q: '[[Бишкектеги]] means…', o: ['the one in Bishkek', 'from Bishkek', 'to Bishkek', 'Bishkek’s'], why: '-дагы = which is at.' },
        { t: 'mc', q: '[[көрүшпөйбүзбү?]] means…', o: ['Won’t we see each other?', 'Didn’t we see?', 'Let’s not see each other.', 'We don’t see them.'], why: 'see-each.other-not-(now)-we-?' },
        { t: 'mc', q: 'In a noun, which comes first?', o: ['plural, then possessive, then case', 'case, then plural, then possessive', 'possessive, then plural, then case', 'any order'], why: 'Root → many → whose → role.' },
        { t: 'mc', q: '[[окуткандарга]] means…', o: ['to those who taught', 'to the readers', 'from the teachers', 'they taught them'], why: 'read-make-who.did-many-to.' },
        { t: 'mc', q: 'In a verb, where does the “not” piece go?', o: ['After the voice, before the tense', 'At the very end', 'Before the root', 'After the person'], why: 'Root → voice → not → tense → person → ?' },
        { t: 'mc', q: 'Spoken “эмне кылып атасың” is the same as…', o: ['[[эмне кылып жатасың]]', '[[эмне кыласың]]', '[[эмне кылдың]]', '[[эмне кылгың келет]]'], why: 'жатат is often pronounced атат.' },
        { t: 'type', q: 'Type: “from our books”', a: ['китептерибизден'], why: 'китеп-тер-ибиз-ден.' },
        { t: 'type', q: 'Type: “the people at home” (house-at-the.one-s)', a: ['үйдөгүлөр'], why: 'үй-дө-гү-лөр.' }
      ]
    }
  ]
});
