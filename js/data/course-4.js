/* Stage 4 — Everyday life (A2) */
window.COURSE.stages.push({
  n: 4, title: 'Everyday life', kg: 'Күнүмдүк турмуш', level: 'A2',
  blurb: 'Talk about yesterday and right now, ask people to do things, say what you want, can and must do, describe the world around you — and handle taxis, cafés, bazaars and doctors.',
  lessons: [
    {
      id: 'past', title: 'Yesterday: the past tense', kg: 'Кечээ бардым', minutes: 35,
      goals: ['Say what you did with -ды', 'Make it negative and ask questions', 'Use past time words'],
      blocks: [
        { t: 'h', text: 'One past for “did” and “have done”' },
        { t: 'eli5', html: 'English has “I ate” and “I have eaten”. Kyrgyz uses one form for both: the verb + [[-ды]] + a short person ending. It’s for things that really happened and are finished — things you saw or know for sure.' },
        { t: 'compare', en: 'I went to the bazaar yesterday.', kg: 'Кечээ мен базар|га бар|ды|м.', gloss: 'yesterday I bazaar-to go-did-I' },
        { t: 'compare', en: 'Have you eaten?', kg: 'Тамак же|ди|ңиз|би?', gloss: 'food eat-did-you-?', note: 'A classic Kyrgyz greeting from hosts and grandmothers. The answer is [[Ооба, жедим]] — or you’ll be fed immediately.' },
        { t: 'h', text: 'Building it' },
        { t: 'p', html: 'Stem + [[-ды]] (the [[д]] becomes [[т]] after a voiceless sound; the vowel follows harmony) + the <b>short</b> endings:' },
        { t: 'table', cols: ['', 'Short ending', 'бар- (go)', 'кел- (come)', 'оку- (read)', 'ич- (drink)'], rows: [
          ['мен', '-м', '[[бар|ды|м]]', '[[кел|ди|м]]', '[[оку|ду|м]]', '[[ич|ти|м]]'], ['сен', '-ң', '[[бар|ды|ң]]', '[[кел|ди|ң]]', '[[оку|ду|ң]]', '[[ич|ти|ң]]'], ['сиз', '-ңIз', '[[бар|ды|ңыз]]', '[[кел|ди|ңиз]]', '[[оку|ду|ңуз]]', '[[ич|ти|ңиз]]'], ['ал', '—', '[[бар|ды]]', '[[кел|ди]]', '[[оку|ду]]', '[[ич|ти]]'],
          ['биз', '-к', '[[бар|ды|к]]', '[[кел|ди|к]]', '[[оку|ду|к]]', '[[ич|ти|к]]'], ['силер', '-ңAр', '[[бар|ды|ңар]]', '[[кел|ди|ңер]]', '[[оку|ду|ңар]]', '[[ич|ти|ңер]]'], ['алар', '-ыш- … —', '[[бар|ыш|ты]]', '[[кел|иш|ти]]', '[[оку|ш|ту]]', '[[ич|иш|ти]]']] },
        { t: 'tip', title: 'Short endings look like “my, your”', html: '[[-м]], [[-ң]], [[-ңыз]], [[-ңар]] — they’re the possessive endings from lesson 2.7! Only “we” is different: [[-к]]. Kyrgyz loves to recycle.' },
        { t: 'h', text: 'Didn’t, and did you?' },
        { t: 'p', html: 'Negative: put the not-piece [[-ба]] before [[-ды]]. Question: [[-бы]] at the end.' },
        { t: 'ex', items: [['Мен түшүн|бө|дү|м.', 'I didn’t understand.'], ['Ал кел|бе|ди.', 'He didn’t come.'], ['Көр|дү|ңүз|бү?', 'Did you see (it)?'], ['Сиз качан кел|ди|ңиз?', 'When did you arrive?'], ['Мен эки күн мурун кел|ди|м.', 'I arrived two days ago.', 'two day before'], ['Ким айт|ты?', 'Who said (it)?'], ['Биз кино көр|дү|к.', 'We watched a film.'], ['Алар кечээ кел|иш|ти.', 'They came yesterday.']] },
        { t: 'h', text: 'Past time words' },
        { t: 'vocab', items: [['кечээ', 'yesterday'], ['мурдагы күнү', 'the day before yesterday'], ['өткөн жумада', 'last week'], ['өткөн айда', 'last month'], ['былтыр', 'last year'], ['… мурун', '… ago', '[[үч жыл мурун]] — three years ago'], ['жаңы эле', 'just now'], ['эчак', 'long ago; already (long since)'], ['али', 'yet, still', '[[Али келе элек]] — he hasn’t come yet'], ['буга чейин', 'before this, so far']] },
        { t: 'warn', title: '“Not yet” is special', html: 'For “haven’t … yet”, Kyrgyz uses [[-а элек]]: [[Мен али же|й элек|мин]] — I haven’t eaten yet. [[Ал али кел|е элек]] — he hasn’t come yet. Don’t use [[-бады]] for “not yet”.' }
      ],
      quiz: [
        { t: 'mc', q: '“I came.”', o: ['[[Мен келдим.]]', '[[Мен келем.]]', '[[Мен келтим.]]', '[[Мен келдиң.]]'], why: 'кел + ди + м.' },
        { t: 'mc', q: '“I drank.”', o: ['[[Мен ичтим.]]', '[[Мен ичдим.]]', '[[Мен ичем.]]', '[[Мен ичтик.]]'], why: 'ч is voiceless → т.' },
        { t: 'mc', q: '“We read.” (past)', o: ['[[Биз окудук.]]', '[[Биз окудум.]]', '[[Биз окудубуз.]]', '[[Биз окуйбуз.]]'], why: '“We” = -к.' },
        { t: 'mc', q: '“He didn’t come.”', o: ['[[Ал келбеди.]]', '[[Ал келдибе.]]', '[[Ал келди эмес.]]', '[[Ал келбейт.]]'], why: 'not-piece before -ди.' },
        { t: 'mc', q: '“When did you (polite) arrive?”', o: ['[[Сиз качан келдиңиз?]]', '[[Сиз качан келесиз?]]', '[[Сиз качан келдиңизби?]]', '[[Сиз кайда келдиңиз?]]'], why: 'No -би with a question word.' },
        { t: 'mc', q: '“They saw.”', o: ['[[Алар көрүштү.]]', '[[Алар көрдү.]]', '[[Алар көрдүк.]]', '[[Алар көрүшөт.]]'], why: 'көр + үш + тү.' },
        { t: 'mc', q: '“I haven’t eaten yet.”', o: ['[[Мен али жей элекмин.]]', '[[Мен али жебедим.]]', '[[Мен али жебейм.]]', '[[Мен жедим али.]]'], why: '“Not yet” = -а элек.' },
        { t: 'type', q: 'Type: “I didn’t understand.”', a: ['Түшүнбөдүм', 'Мен түшүнбөдүм'], why: 'түшүн + бө + дү + м.' },
        { t: 'type', q: 'Type: “I went to the bazaar.”', a: ['Мен базарга бардым', 'Базарга бардым'], why: 'бар + ды + м.' },
        { t: 'order', q: 'Build: “I arrived two days ago.”', a: 'Мен эки күн мурун келдим', why: 'I two day before came-I.' }
      ]
    },
    {
      id: 'right-now', title: 'Right now: -ып жатат', kg: 'Эмне кылып жатасың?', minutes: 30,
      goals: ['Say what’s happening right now', 'Use бара жатам for going and coming', 'Ask “What are you doing?”'],
      blocks: [
        { t: 'h', text: 'Your body tells the time' },
        { t: 'eli5', html: 'To say something is happening <i>right now</i>, Kyrgyz says what you’re doing and then adds a body position verb, as if describing a photo: “reading — lying”, “working — sitting”, “waiting — standing”. The most common one is [[жат-]] (lie), and it’s used for almost everything, even if you’re standing up!' },
        { t: 'compare', en: 'I’m reading a book.', kg: 'Мен китеп оку|п жат|а|м.', gloss: 'I book read-ing lie-I' },
        { t: 'compare', en: 'What are you doing?', kg: 'Эмне кыл|ып жат|а|сың?', gloss: 'what do-ing lie-you', note: 'You’ll hear this many times a day. [[кыл-]] = do.' },
        { t: 'h', text: 'Building it' },
        { t: 'list', items: ['Verb + [[-ып]] (after a consonant, with harmony: [[-ып / -ип / -уп / -үп]]) or [[-п]] (after a vowel).', 'Then [[жат-]] in the present: [[жатам]], [[жатасың]], [[жатасыз]], [[жатат]], [[жатабыз]], [[жатасыңар]], [[жатышат]].'] },
        { t: 'ex', items: [['Мен иште|п жат|а|м.', 'I’m working.'], ['Ал тамак же|п жат|а|т.', 'She’s eating.'], ['Биз кыргыз тилин үйрөн|үп жат|а|быз.', 'We’re learning Kyrgyz.'], ['Жамгыр жаа|п жат|а|т.', 'It’s raining.', 'rain falling lies'], ['Алар футбол ойно|п жат|ыш|а|т.', 'They’re playing football.']] },
        { t: 'h', text: 'Going and coming: -а жатам' },
        { t: 'p', html: 'With motion verbs, Kyrgyz uses [[-а]] instead of [[-ып]]:' },
        { t: 'ex', items: [['Мен үйгө бар|а жат|а|м.', 'I’m on my way home.'], ['Мен кел|е жат|а|м!', 'I’m coming! (on my way)'], ['Кайда бар|а жат|а|сыз?', 'Where are you going?']] },
        { t: 'h', text: 'Other body positions' },
        { t: 'table', cols: ['Helper', 'Literally', 'Feeling', 'Example'], rows: [['[[жат-]]', 'lie', 'happening now (default)', '[[окуп жатам]] — I’m reading'], ['[[отур-]]', 'sit', 'busy with it for a while', '[[иштеп отурам]] — I’m (sitting here) working'], ['[[тур-]]', 'stand', 'briefly, or waiting', '[[күтүп турам]] — I’m waiting'], ['[[жүр-]]', 'walk around', 'these days, lately', '[[Бишкекте иштеп жүрөм]] — I’m working in Bishkek these days']] },
        { t: 'h', text: 'Not doing it right now' },
        { t: 'p', html: 'Two common ways:' },
        { t: 'ex', items: [['Түшүн|бө|й жат|а|м.', 'I’m not understanding.', 'not-piece + -й + жат'], ['Мен иште|п жат|кан жок|мун.', 'I’m not working (right now).', '“my working-lying doesn’t exist”']] },
        { t: 'tip', title: 'Past “was doing”', html: 'Put the helper in the past: [[окуп жаттым]] (I was reading) or, more formally, [[окуп жаткан элем]]. You’ll see [[элем]] (I was) properly at B1.' },
        { t: 'vocab', items: [['кыл-', 'do'], ['жат-', 'lie (down); helper for “right now”'], ['отур-', 'sit'], ['тур-', 'stand'], ['жүр-', 'walk, go about'], ['күт-', 'wait'], ['жамгыр', 'rain'], ['кар жаайт', 'it snows'], ['телефон', 'phone'], ['сүйлөш-', 'talk (with each other)']] }
      ],
      quiz: [
        { t: 'mc', q: '“I’m reading.”', o: ['[[Мен окуп жатам.]]', '[[Мен окуйм жатам.]]', '[[Мен окудум жатам.]]', '[[Мен окуп жатат.]]'], why: 'оку + п + жатам.' },
        { t: 'mc', q: '“What are you doing?” (friendly)', o: ['[[Эмне кылып жатасың?]]', '[[Эмне кылып жатам?]]', '[[Эмне кыласыңбы?]]', '[[Эмне жатасың кылып?]]'], why: 'what do-ing lie-you.' },
        { t: 'mc', q: '“I’m on my way home.”', o: ['[[Үйгө бара жатам.]]', '[[Үйгө барып жатам.]]', '[[Үйдө бара жатам.]]', '[[Үйгө бардым жатам.]]'], why: 'Motion verbs use -а жат-.' },
        { t: 'mc', q: '“It’s raining.”', o: ['[[Жамгыр жаап жатат.]]', '[[Жамгыр жаайм.]]', '[[Жамгыр бар.]]', '[[Жамгыр жатат.]]'], why: 'rain fall-ing lies.' },
        { t: 'mc', q: '“I’m waiting.” (standing, briefly)', o: ['[[Күтүп турам.]]', '[[Күтүп жүрөм.]]', '[[Күтөм турам.]]', '[[Күттүм.]]'], why: 'тур- = stand, briefly.' },
        { t: 'mc', q: '[[Бишкекте иштеп жүрөм]] means…', o: ['I’m working in Bishkek these days.', 'I walked to work in Bishkek.', 'I want to work in Bishkek.', 'I worked in Bishkek.'], why: 'жүр- = lately, these days.' },
        { t: 'type', q: 'Type: “I’m working.”', a: ['Мен иштеп жатам', 'Иштеп жатам'], why: 'иште + п + жатам.' },
        { t: 'type', q: 'Type: “I’m coming!” (on my way)', a: ['Келе жатам', 'Мен келе жатам'], why: 'кел + е + жатам.' },
        { t: 'order', q: 'Build: “We’re learning Kyrgyz.”', a: 'Биз кыргыз тилин үйрөнүп жатабыз', why: 'we Kyrgyz language learn-ing lie-we.' }
      ]
    },
    {
      id: 'commands', title: 'Please do it: commands and requests', kg: 'Келиңиз, отуруңуз!', minutes: 30,
      goals: ['Tell friends and strangers to do things', 'Make requests softer and polite', 'Say “let’s” and “let me”'],
      blocks: [
        { t: 'h', text: 'The bare stem is a command' },
        { t: 'eli5', html: 'The verb stem on its own is already a command — to a friend or a child: [[Кел!]] (Come!), [[Отур!]] (Sit!). To be polite, you dress it up with endings, like adding “please” and a smile.' },
        { t: 'table', cols: ['To whom', 'Build', 'кел- (come)', 'отур- (sit)', 'оку- (read)'], rows: [['a friend', 'stem', '[[Кел!]]', '[[Отур!]]', '[[Оку!]]'], ['one person, politely', '-IңIз', '[[Кел|иңиз!]]', '[[Отур|уңуз!]]', '[[Оку|ңуз!]]'], ['a group of friends', '-гIлA', '[[Кел|гиле!]]', '[[Отур|гула!]]', '[[Оку|гула!]]'], ['a group, politely', '-IңIздAр', '[[Кел|иңиздер!]]', '[[Отур|уңуздар!]]', '[[Оку|ңуздар!]]']] },
        { t: 'h', text: 'Don’t!' },
        { t: 'p', html: 'Add the not-piece: [[Барба!]] (Don’t go!), [[Барба|ңыз!]] (Please don’t go!), [[Кабатыр бол|бо|ңуз]] (Don’t worry).' },
        { t: 'h', text: 'The magic softener -чы' },
        { t: 'eli5', html: 'Adding [[-чы]] to a request is like saying it with a gentle voice and raised eyebrows. [[Бериңиз]] is “Give (it to me).” [[Бериңиз|чи]] is “Could you give me that, please?” Use it all the time.' },
        { t: 'ex', items: [['Суу бериңиз|чи.', 'Could you give me some water, please?'], ['Бир аз күтө туруңуз|чу.', 'Please wait a moment.'], ['Кайталап коюңуз|чу.', 'Could you repeat that, please?', '[[кой-]] as a helper makes it lighter, quicker'], ['Кара|чы!', 'Look! (friendly)'], ['Айтчы, бул эмне?', 'Tell me, what’s this?']] },
        { t: 'h', text: 'Let’s, let me, let him' },
        { t: 'table', cols: ['Meaning', 'Build', 'бар- (go)', 'оку- (read)', 'көр- (see)'], rows: [['let’s …', '-AлI / -йлI', '[[Бар|алы!]]', '[[Оку|йлу!]]', '[[Көр|өлү!]]'], ['let me …', '-AйIн / -йIн', '[[Бар|айын]]', '[[Оку|юн]]', '[[Көр|өйүн]]'], ['let him/her …', '-сIн', '[[Бар|сын]]', '[[Оку|сун]]', '[[Көр|сүн]]']] },
        { t: 'h', text: 'Phrases you’ll hear as a guest' },
        { t: 'vocab', items: [['Келиңиз, отуруңуз!', 'Come in, sit down!'], ['Төргө өтүңүз!', 'Please take the seat of honour!', 'the [[төр]] is the place furthest from the door'], ['Тамак алыңыз!', 'Help yourself! (take food)'], ['Чай ичиңиз!', 'Have some tea!'], ['Уялбаңыз!', 'Don’t be shy!'], ['Жүрү!', 'Come on! Let’s go! (friendly)'], ['Токтоңуз!', 'Stop! (polite)'], ['Сураныч', 'please (formal, written)']] },
        { t: 'tip', title: '[[Сураныч]] isn’t the everyday “please”', html: 'English sticks “please” on everything. Kyrgyz shows politeness through [[сиз]]-forms and [[-чы]], not a separate word. [[Сураныч]] appears in formal writing and signs.' }
      ],
      quiz: [
        { t: 'mc', q: 'Politely: “Sit down.”', o: ['[[Отуруңуз.]]', '[[Отур.]]', '[[Отургула.]]', '[[Отурам.]]'], why: 'One person, polite: -уңуз.' },
        { t: 'mc', q: 'To a group of friends: “Come!”', o: ['[[Келгиле!]]', '[[Келиңиз!]]', '[[Кел!]]', '[[Келели!]]'], why: 'Group, friendly: -гиле.' },
        { t: 'mc', q: '“Let’s go!”', o: ['[[Баралы!]]', '[[Барайын!]]', '[[Барсын!]]', '[[Баргыла!]]'], why: 'let’s = -алы.' },
        { t: 'mc', q: '“Please don’t go.”', o: ['[[Барбаңыз.]]', '[[Барыңыз эмес.]]', '[[Бар жок.]]', '[[Барбайм.]]'], why: 'not-piece + polite ending.' },
        { t: 'mc', q: 'What does adding [[-чы]] do?', o: ['Makes a request softer', 'Makes it past tense', 'Makes it negative', 'Makes it plural'], why: '[[Бериңизчи]] = could you please give.' },
        { t: 'mc', q: 'Your host says [[Тамак алыңыз!]] She means…', o: ['Help yourself to food!', 'Buy some food!', 'Take the food away!', 'Have you eaten?'], why: 'ал- = take.' },
        { t: 'type', q: 'Type politely: “Please wait a moment.”', a: ['Бир аз күтө туруңузчу', 'Күтө туруңузчу', 'Бир аз күтө туруңуз'], why: 'күт + ө + туруңуз + чу.' },
        { t: 'type', q: 'Type: “Let me see.” (көр-)', a: ['Көрөйүн'], why: 'көр + өйүн.' },
        { t: 'order', q: 'Build: “Could you give me some water, please?”', a: 'Мага суу бериңизчи', why: 'to-me water give-you-please.' }
      ]
    },
    {
      id: 'want-can-must', title: 'Want, can, must, may', kg: 'Баргым келет', minutes: 35,
      goals: ['Say what you want to do', 'Say what you can and can’t do', 'Say what you need, must, and may do'],
      blocks: [
        { t: 'h', text: 'Want: “my going comes”' },
        { t: 'eli5', html: 'Kyrgyz says “I want to go” in a lovely way: [[Баргым келет]] — literally “my going is coming”. The wish arrives by itself, like a feeling. You don’t want — the wanting comes to you.' },
        { t: 'compare', en: 'I want to go.', kg: 'Бар|гы|м кел|е|т.', gloss: 'go-ing-my comes' },
        { t: 'list', items: ['Verb + [[-гы]] ([[-кы]] after voiceless; harmony: [[-гы / -ги / -гу / -гү]]).', 'Then the “my/your” ending: [[-м]], [[-ң]], [[-ңыз]], [[-сы]], [[-быз]], [[-ңар]].', 'Then [[келет]] (comes) — or [[келбейт]] (doesn’t come) for “don’t want”.'] },
        { t: 'ex', items: [['Же|ги|м кел|е|т.', 'I want to eat. / I’m hungry.'], ['Уйку|м кел|е|т.', 'I’m sleepy.', '“my sleep is coming” — same idea with a noun'], ['Ич|ки|м кел|бе|й|т.', 'I don’t want to drink.'], ['Эмне же|ги|ңиз кел|е|т?', 'What would you like to eat?'], ['Ал Ысык-Көлгө бар|гы|сы кел|е|т.', 'She wants to go to Issyk-Kul.'], ['Кино көр|гү|ң кел|е|би?', 'Do you want to watch a film?']] },
        { t: 'tip', title: 'Wanting things (not actions)', html: 'For things, say you need them: [[Мага чай керек]] (to-me tea needed), or turn it into an action: [[Чай ичким келет]] (I want to drink tea). [[Каала-]] (desire) exists, but sounds formal: [[Эмне каалайсыз?]] — What would you like? (a waiter).' },
        { t: 'h', text: 'Can: “go-able”' },
        { t: 'compare', en: 'I can speak Kyrgyz.', kg: 'Кыргызча сүйлө|й ал|а|м.', gloss: 'Kyrgyz-ly speak-ing take-I', note: 'Verb + [[-а]] (after a consonant) or [[-й]] (after a vowel), then [[ал-]] in any tense. Literally you “take” the action — you can grab it.' },
        { t: 'ex', items: [['Мен бар|а ал|а|м.', 'I can go.'], ['Мен бар|а ал|ба|й|м.', 'I can’t go.'], ['Мага жардам бер|е ал|а|сыз|бы?', 'Can you help me?'], ['Мен түшүн|ө ал|ба|й жат|а|м.', 'I can’t understand (right now).'], ['Ал келе ал|ба|ды.', 'He couldn’t come.']] },
        { t: 'h', text: 'Must and need: [[керек]]' },
        { t: 'ex', items: [['Мага суу керек.', 'I need water.', 'to-me water needed'], ['Бар|ыш|ым керек.', 'I have to go.', 'my going is needed'], ['Эртең иште|ш|им керек.', 'I have to work tomorrow.'], ['Кыргыз тилин үйрөн|үү керек.', 'One must learn Kyrgyz. / Kyrgyz should be learned.'], ['Кереги жок.', 'No need. / It’s not necessary.']] },
        { t: 'ex', title: 'Must not, had to, could', items: [['Бар|ба|ш|ым керек.', 'I mustn’t go.', 'the not-piece goes in before -ыш: бар-ба-ш'], ['Бар|ыш|ым керек эле.', 'I had to go.', 'add [[эле]] (was) — or [[болчу]]'], ['Мен бара ал|ды|м.', 'I was able to go. / I managed to go.', 'put [[ал-]] in the past'], ['Ал келе ал|ба|ды.', 'He couldn’t come.']] },
        { t: 'h', text: 'May I? [[болобу]]' },
        { t: 'p', html: 'To ask permission, say “If I do X, is it OK?” — verb + [[-сам]] (if I) + [[болобу?]] (is it OK?). Full “if” comes at B1; learn these as chunks now:' },
        { t: 'vocab', items: [['Кирсем болобу?', 'May I come in?'], ['Сүрөткө тартсам болобу?', 'May I take a photo?'], ['Отурсам болобу?', 'May I sit down?'], ['Болот.', 'Yes, it’s OK. / Allowed.'], ['Болбойт.', 'It’s not allowed. / No.'], ['Мүмкүн', 'possible; maybe'], ['Мүмкүн эмес.', 'Impossible.']] },
        { t: 'vocab', title: 'New words', items: [['керек', 'needed, necessary'], ['каала-', 'wish, desire (formal)'], ['жардам', 'help'], ['укта-', 'sleep'], ['сүрөт', 'picture, photo'], ['сүрөткө тарт-', 'take a photo'], ['кир-', 'enter, come in']] }
      ],
      quiz: [
        { t: 'mc', q: '“I want to go.”', o: ['[[Баргым келет.]]', '[[Барам келет.]]', '[[Барышым келет.]]', '[[Баргым барат.]]'], why: 'бар + гы + м + келет.' },
        { t: 'mc', q: '“I want to drink.”', o: ['[[Ичким келет.]]', '[[Ичгим келет.]]', '[[Ичкым келет.]]', '[[Ичим келет.]]'], why: 'ч voiceless → к; и → и.' },
        { t: 'mc', q: '“I can’t go.”', o: ['[[Бара албайм.]]', '[[Барбай алам.]]', '[[Бара алам эмес.]]', '[[Баргым келбейт.]]'], why: 'Negative goes on ал-.' },
        { t: 'mc', q: '“I have to go.”', o: ['[[Барышым керек.]]', '[[Баргым керек.]]', '[[Бара керек.]]', '[[Барам керек.]]'], why: 'бар + ыш + ым + керек.' },
        { t: 'mc', q: '“May I take a photo?”', o: ['[[Сүрөткө тартсам болобу?]]', '[[Сүрөткө тартам болот?]]', '[[Сүрөт тартгым келеби?]]', '[[Сүрөткө тарта аласызбы?]]'], why: 'If I take, is it OK?' },
        { t: 'mc', q: '[[Кереги жок]] means…', o: ['No need.', 'I don’t want it.', 'It’s impossible.', 'It’s not allowed.'], why: 'its need doesn’t exist.' },
        { t: 'type', q: 'Type: “I need water.”', a: ['Мага суу керек'], why: 'to-me water needed.' },
        { t: 'type', q: 'Type: “I can speak Kyrgyz.”', a: ['Кыргызча сүйлөй алам', 'Мен кыргызча сүйлөй алам'], why: 'сүйлө + й + алам.' },
        { t: 'order', q: 'Build: “Can you (polite) help me?”', a: 'Мага жардам бере аласызбы', why: 'to-me help give-ing take-you-?' }
      ]
    },
    {
      id: 'positions', title: 'On, under, next to: position words', kg: 'Столдун үстүндө', minutes: 35,
      goals: ['Say where things are: on, under, inside, behind', 'Use postpositions: with, for, about, until, after', 'Ask for and give directions'],
      blocks: [
        { t: 'h', text: 'Places are body parts' },
        { t: 'eli5', html: 'In Kyrgyz, “on the table” is said like “at the table’s top”. Every thing has a top, a bottom, an inside, a front, a back, a side — like a body. You say whose part it is, which part, and then “at”, “to” or “from”.' },
        { t: 'compare', en: 'on the table', kg: 'стол|дун үст|ү|ндө', gloss: 'table-’s top-its-at' },
        { t: 'compare', en: 'next to the school', kg: 'мектеп|тин жан|ы|нда', gloss: 'school-’s side-its-at' },
        { t: 'table', cols: ['Part', 'Meaning', 'at (where?)', 'to (where to?)', 'from'], kg: [0], rows: [['үст', 'top → on', '[[үст|ү|ндө]]', '[[үст|ү|нө]]', '[[үст|ү|нөн]]'], ['ал(д)', 'front → in front of; under', '[[алд|ы|нда]]', '[[алд|ы|на]]', '[[алд|ы|нан]]'], ['арт', 'back → behind', '[[арт|ы|нда]]', '[[арт|ы|на]]', '[[арт|ы|нан]]'], ['ич', 'inside → in', '[[ич|и|нде]]', '[[ич|и|не]]', '[[ич|и|нен]]'], ['жан', 'side → next to', '[[жан|ы|нда]]', '[[жан|ы|на]]', '[[жан|ы|нан]]'], ['аст', 'bottom → under', '[[аст|ы|нда]]', '[[аст|ы|на]]', '[[аст|ы|нан]]'], ['орто', 'middle → between, among', '[[орто|су|нда]]', '[[орто|су|на]]', '[[орто|су|нан]]'], ['сырт', 'outside', '[[сырт|ы|нда]]', '[[сырт|ы|на]]', '[[сырт|ы|нан]]']], caption: 'Remember the extra н after “his/its” (lesson 3.5)? Here it is again: үст-ү-н-дө.' },
        { t: 'ex', items: [['Китеп стол|дун үст|ү|ндө.', 'The book is on the table.'], ['Мышык диван|дын аст|ы|нда.', 'The cat is under the sofa.'], ['Банк мектеп|тин жан|ы|нда.', 'The bank is next to the school.'], ['Ачкычты сумка|нын ич|и|не салдым.', 'I put the key in the bag.'], ['Үй|дүн арт|ы|нда бак бар.', 'There’s a garden behind the house.']] },
        { t: 'h', text: 'Little words that come after' },
        { t: 'p', html: 'English has prepositions (before the noun). Kyrgyz has <b>postpositions</b> (after the noun). Some need a case on the noun before them:' },
        { t: 'table', cols: ['Kyrgyz', 'English', 'Noun before it takes…', 'Example'], kg: [0], rows: [['менен', 'with', 'nothing', '[[досум менен]] — with my friend'], ['үчүн', 'for', 'nothing', '[[сен үчүн]] — for you; [[ал үчүн]] — for that'], ['жөнүндө', 'about', 'nothing', '[[Кыргызстан жөнүндө]] — about Kyrgyzstan'], ['сыяктуу', 'like, similar to', 'nothing', '[[тоо сыяктуу]] — like a mountain'], ['чейин', 'until, up to', 'dative -га', '[[саат бешке чейин]] — until five'], ['кийин', 'after', 'ablative -дан', '[[сабактан кийин]] — after class'], ['мурун', 'before', 'ablative -дан', '[[тамактан мурун]] — before the meal'], ['бери', 'since', 'ablative -дан', '[[былтырдан бери]] — since last year'], ['каршы', 'against', 'dative -га', '[[мага каршы]] — against me'], ['карай', 'towards', 'dative -га', '[[тоого карай]] — towards the mountains']] },
        { t: 'table', cols: ['Kyrgyz', 'English', 'Example'], kg: [0], rows: [['аркылуу', 'through, via, by means of', '[[телефон аркылуу]] — by phone; [[Алматы аркылуу]] — via Almaty'], ['ордуна', 'instead of (after -нын)', '[[чайдын ордуна]] — instead of tea'], ['арасында', 'among (after -нын)', '[[достордун арасында]] — among friends'], ['башка', 'except, other than (after -дан)', '[[сенден башка]] — except you']] },
        { t: 'h', text: 'Asking the way' },
        { t: 'vocab', items: [['оң', 'right', '[[оңго]] — to the right'], ['сол', 'left', '[[солго]] — to the left'], ['түз', 'straight'], ['бурулуңуз', 'turn (polite)'], ['жакын', 'near'], ['алыс', 'far'], ['көчө', 'street'], ['аянт', 'square (in a city)'], ['жөө', 'on foot'], ['бурч', 'corner']] },
        { t: 'dialog', title: 'Finding Ala-Too Square', lines: [['Tom', 'Кечиресиз, Ала-Тоо аянты кайда?', 'Excuse me, where is Ala-Too Square?'], ['Киши', 'Түз барыңыз, анан экинчи көчөдөн оңго бурулуңуз.', 'Go straight, then turn right at the second street.'], ['Tom', 'Алыспы?', 'Is it far?'], ['Киши', 'Жок, жакын. Жөө беш мүнөт.', 'No, it’s close. Five minutes on foot.'], ['Tom', 'Чоң рахмат!', 'Thank you very much!']] },
        { t: 'vocab', title: 'New words', items: [['мышык', 'cat'], ['диван', 'sofa'], ['ачкыч', 'key', 'from [[ач-]] (open) + [[-кыч]] (tool)'], ['сал-', 'put (into)'], ['бак', 'garden'], ['сабак', 'lesson, class']] }
      ],
      quiz: [
        { t: 'mc', q: '“on the table”', o: ['[[столдун үстүндө]]', '[[столдо үстү]]', '[[үстүндө стол]]', '[[столдун үстү]]'], why: 'table-’s top-its-at.' },
        { t: 'mc', q: '“under the sofa”', o: ['[[дивандын астында]]', '[[дивандын үстүндө]]', '[[дивандын артында]]', '[[дивандын ичинде]]'], why: 'аст = bottom → under.' },
        { t: 'mc', q: '“next to the school”', o: ['[[мектептин жанында]]', '[[мектептин ичинде]]', '[[мектепке жанында]]', '[[мектепте жан]]'], why: 'жан = side.' },
        { t: 'mc', q: '“after class”', o: ['[[сабактан кийин]]', '[[сабакка кийин]]', '[[сабак кийин]]', '[[кийин сабак]]'], why: 'кийин takes the ablative.' },
        { t: 'mc', q: '“until five o’clock”', o: ['[[саат бешке чейин]]', '[[саат бештен чейин]]', '[[саат беште чейин]]', '[[чейин саат беш]]'], why: 'чейин takes the dative.' },
        { t: 'mc', q: '“with my friend”', o: ['[[досум менен]]', '[[менен досум]]', '[[досума менен]]', '[[досумдан менен]]'], why: 'Postposition: after the noun.' },
        { t: 'mc', q: 'What does [[Солго бурулуңуз]] mean?', o: ['Turn left.', 'Turn right.', 'Go straight.', 'Stop here.'], why: 'сол = left.' },
        { t: 'type', q: 'Type: “to the right”', a: ['оңго'], why: 'оң + го.' },
        { t: 'order', q: 'Build: “The bank is next to the school.”', a: 'Банк мектептин жанында', why: 'bank school-’s side-its-at.' }
      ]
    },
    {
      id: 'describing', title: 'Describing things and comparing', kg: 'Чоң, чоңураак, эң чоң', minutes: 35,
      goals: ['Use 30 common adjectives', 'Say bigger, biggest, very', 'Say “I like it” the Kyrgyz way'],
      blocks: [
        { t: 'h', text: 'Opposites' },
        { t: 'vocab', items: [['чоң — кичине', 'big — small'], ['жаңы — эски', 'new — old (things)'], ['жаш — кары', 'young — old (people)'], ['жакшы — жаман', 'good — bad'], ['ысык — суук', 'hot — cold'], ['кымбат — арзан', 'expensive — cheap'], ['узун — кыска', 'long — short'], ['бийик — жапыз', 'high, tall — low'], ['оор — жеңил', 'heavy, difficult — light, easy'], ['тез — жай', 'fast — slow'], ['кызыктуу — кызыксыз', 'interesting — boring'], ['таза — кир', 'clean — dirty'], ['сулуу', 'beautiful'], ['даамдуу', 'tasty'], ['бош — толук', 'empty, free — full']] },
        { t: 'h', text: 'Bigger: two ways' },
        { t: 'eli5', html: 'To compare in Kyrgyz, you say what you’re comparing <b>from</b>: “Bishkek, <i>from</i> Osh, is big.” Your mind starts at Osh and moves up to Bishkek. You can also add [[-ыраак]] (“-er”) to the adjective, but you don’t have to.' },
        { t: 'compare', en: 'Bishkek is bigger than Osh.', kg: 'Бишкек Ош|тон чоң.', gloss: 'Bishkek Osh-from big', note: 'Or: [[Бишкек Оштон чоң|ураак]]. Both are correct.' },
        { t: 'ex', items: [['Бул арзан|ыраак.', 'This one is cheaper.'], ['Жайыраак сүйлөңүзчү.', 'Speak more slowly, please.'], ['Чай кофе|ден жакшы.', 'Tea is better than coffee.'], ['Мен сен|ден улуу|мун.', 'I’m older than you.', 'улуу = elder; кичүү = younger']] },
        { t: 'h', text: 'Biggest: [[эң]]' },
        { t: 'ex', items: [['Жеңиш чокусу — Кыргызстандагы эң бийик тоо.', 'Jengish Chokusu is the highest mountain in Kyrgyzstan.'], ['Бул эң даамдуу тамак!', 'This is the tastiest food!'], ['Ал эң жакшы досум.', 'He’s my best friend.']] },
        { t: 'h', text: 'Very, a bit, super' },
        { t: 'table', cols: ['Kyrgyz', 'English', 'Example'], kg: [0], rows: [['абдан', 'very', '[[абдан жакшы]] — very good'], ['өтө', 'too, extremely', '[[өтө кымбат]] — too expensive'], ['аябай', 'really, terribly (casual)', '[[аябай сонун]] — really great'], ['бир аз', 'a bit', '[[бир аз суук]] — a bit cold'], ['анча … эмес', 'not very', '[[анча алыс эмес]] — not very far']] },
        { t: 'tip', title: 'Double-colour words', html: 'Kyrgyz can intensify a colour by repeating its first syllable with [[п]]: [[ак]] → [[ап-ак]] (snow-white), [[кара]] → [[кап-кара]] (pitch black), [[кызыл]] → [[кып-кызыл]] (bright red), [[сары]] → [[сап-сары]] (bright yellow). Fun and very native-sounding.' },
        { t: 'h', text: 'With and without: -луу and -сыз' },
        { t: 'p', html: '[[-луу]] (with, full of) and [[-сыз]] (without) turn nouns into adjectives. Both follow harmony; [[-луу]] also follows the л/д/т rule like the plural ([[-дуу]], [[-туу]]), while [[-сыз]] always starts with с.' },
        { t: 'ex', items: [['туз → туз|дуу / туз|суз', 'salt → salty / unsalted'], ['шекер → шекер|сиз чай', 'sugar → tea without sugar'], ['акыл → акыл|дуу', 'mind → clever'], ['даам → даам|дуу', 'taste → tasty'], ['кызык → кызык|туу', 'interest → interesting'], ['үй → үй|сүз', 'house → homeless']] },
        { t: 'h', text: 'I like it: “it pleases to me”' },
        { t: 'compare', en: 'I like Bishkek.', kg: 'Мага Бишкек жак|а|т.', gloss: 'to-me Bishkek pleases', note: 'Like Spanish <i>me gusta</i>: the thing does the pleasing, you receive it. Or use [[жакшы көр-]] (see as good): [[Мен Бишкекти жакшы көрөм]].' },
        { t: 'ex', items: [['Сага бул жак|а|бы?', 'Do you like this?'], ['Мага абдан жак|ты!', 'I really liked it!'], ['Мага жак|па|й|т.', 'I don’t like it.']] },
        { t: 'vocab', title: 'Colours', items: [['ак', 'white'], ['кара', 'black'], ['кызыл', 'red'], ['көк', 'blue', 'also “green” for grass and plants in traditional use'], ['жашыл', 'green'], ['сары', 'yellow'], ['боз', 'grey'], ['күрөң', 'brown'], ['кызгылт', 'pink'], ['түс', 'colour']] }
      ],
      quiz: [
        { t: 'mc', q: '“Bishkek is bigger than Osh.”', o: ['[[Бишкек Оштон чоң.]]', '[[Бишкек Ошко чоң.]]', '[[Бишкек Ошто чоң.]]', '[[Бишкек чоң Ош.]]'], why: 'Comparison uses -дан (from).' },
        { t: 'mc', q: '“the highest mountain”', o: ['[[эң бийик тоо]]', '[[бийикураак тоо]]', '[[тоо эң бийик]]', '[[абдан тоо бийик]]'], why: 'эң = most.' },
        { t: 'mc', q: '“I like it.”', o: ['[[Мага жагат.]]', '[[Мен жагат.]]', '[[Мени жагат.]]', '[[Менде жагат.]]'], why: 'It pleases to me: мага.' },
        { t: 'mc', q: '“tea without sugar”', o: ['[[шекерсиз чай]]', '[[шекерлүү чай]]', '[[чай шекер жок]]', '[[шекерден чай]]'], why: '-сиз = without.' },
        { t: 'mc', q: 'What does [[өтө кымбат]] mean?', o: ['too expensive', 'very cheap', 'a bit expensive', 'not expensive'], why: 'өтө = too, extremely.' },
        { t: 'mc', q: 'What is the opposite of [[ысык]]?', o: ['[[суук]]', '[[жылуу]]', '[[таза]]', '[[жеңил]]'], why: 'hot — cold.' },
        { t: 'mc', q: '[[ап-ак]] means…', o: ['snow-white', 'a little white', 'not white', 'whitish-grey'], why: 'Repetition with п intensifies.' },
        { t: 'type', q: 'Type: “very good”', a: ['абдан жакшы'], why: 'абдан = very.' },
        { t: 'type', q: 'Type: “clever” (mind = акыл, with = -дуу)', a: ['акылдуу'], why: 'акыл + дуу.' },
        { t: 'order', q: 'Build: “I really liked it!”', a: 'Мага абдан жакты', why: 'to-me very pleased.' }
      ]
    },
    {
      id: 'somebody-nobody', title: 'Somebody, nobody, everybody, myself', kg: 'Бирөө, эч ким, баары, өзүм', minutes: 35,
      goals: ['Say someone, something, somewhere', 'Say nobody, nothing, never — with a double negative', 'Use өзүм (myself) and өз (own)'],
      blocks: [
        { t: 'h', text: 'Some-, every-, no- words' },
        { t: 'eli5', html: 'English builds these words from little pieces: <b>some</b>one, <b>every</b>one, <b>no</b>one. Kyrgyz does the same with its own pieces: [[бир]] (one / some), [[ар]] (every) and [[эч]] (no). Put them in front of a question word and you get a whole family.' },
        { t: 'table', cols: ['Question word', 'some-', 'every-', 'no- (+ negative verb)'], rows: [
          ['[[ким]] who', '[[бирөө]], [[кимдир бирөө]] — someone', '[[ар ким]], [[баары]] — everyone', '[[эч ким]] — nobody'],
          ['[[эмне]] what', '[[бир нерсе]] — something', '[[баары]], [[бардыгы]] — everything', '[[эч нерсе]] — nothing'],
          ['[[кайда]] where', '[[бир жерде]] — somewhere', '[[бардык жерде]] — everywhere', '[[эч жерде]] — nowhere; [[эч жакка]] — (to) nowhere'],
          ['[[качан]] when', '[[бир күнү]] — one day, someday', '[[ар дайым]] — always', '[[эч качан]] — never'],
          ['[[кайсы]] which', '[[кээ бир]] — some (of them)', '[[ар бир]] — every, each', '[[эч бир]] — not a single']] },
        { t: 'ex', items: [['Бирөө чалды.', 'Someone called.'], ['Бир нерсе жегим келет.', 'I want to eat something.'], ['Ар бир адам өз тилин сүйөт.', 'Every person loves their own language.'], ['Баары жакшы!', 'Everything’s fine!'], ['Кээ бир дүкөндөр жекшембиде жабык.', 'Some shops are closed on Sunday.']] },
        { t: 'h', text: 'Nobody: two “no”s make a no' },
        { t: 'eli5', html: 'In English two “no”s cancel out: “I <i>don’t</i> know <i>nobody</i>” sounds wrong. In Kyrgyz you <b>must</b> use both: the [[эч]]-word <b>and</b> a negative verb. Think of it as saying “no” twice so nobody misses it.' },
        { t: 'compare', en: 'I don’t know anybody here.', kg: 'Мен бул жерде эч кимди тааны|ба|й|м.', gloss: 'I this place-at no.one-(obj) know-not-I', note: 'English uses “anybody” with “not”, or “nobody” with a positive verb. Kyrgyz always uses [[эч ким]] + a negative verb.' },
        { t: 'ex', items: [['Эч ким кел|ген жок.', 'Nobody came.'], ['Мен эч нерсе бил|бе|й|м.', 'I don’t know anything. / I know nothing.'], ['Ал эч качан кечик|пе|й|т.', 'She is never late.'], ['Эч жакка бар|ба|й|м, үйдө калам.', 'I’m not going anywhere, I’m staying home.'], ['Ким келди? — Эч ким.', 'Who came? — Nobody.', 'a one-word answer needs no verb']] },
        { t: 'tip', title: 'Endings go on the question word', html: '[[эч ким]] and [[эч нерсе]] take case endings like any noun: [[эч кимге]] (to nobody), [[эч кимди]] (nobody, as object), [[эч нерседен]] (from nothing): [[Мен эч нерседен коркпойм]] — I’m not afraid of anything.' },
        { t: 'h', text: 'Myself: өз-' },
        { t: 'p', html: '[[өз]] means “self”. Add the “my / your” stickers you know from lesson 2.7:' },
        { t: 'table', cols: ['English', 'Kyrgyz', 'Example'], kg: [1], rows: [['myself', 'өзүм', '[[Мен муну өзүм жасадым.]] — I made this myself.'], ['yourself', 'өзүң', '[[Өзүң бил.]] — You decide (“know yourself”).'], ['yourself (polite)', 'өзүңүз', '[[Өзүңүз кандайсыз?]] — And how are you?'], ['himself / herself', 'өзү', '[[Ал өзү келди.]] — He came himself.'], ['ourselves', 'өзүбүз', '[[Өзүбүз барабыз.]] — We’ll go ourselves.'], ['yourselves', 'өзүңөр', ''], ['themselves', 'өздөрү', '[[Алар өздөрү билишет.]] — They know themselves.']] },
        { t: 'ex', items: [['өз үйүм', 'my own house'], ['өз тилибиз', 'our own language'], ['Өзүңдү сакта!', 'Take care of yourself!'], ['Ал өзүн жакшы сезет.', 'He feels well.', '“he feels himself good”']] },
        { t: 'vocab', items: [['бирөө', 'someone'], ['бир нерсе', 'something'], ['бир жерде', 'somewhere'], ['ар бир', 'every, each'], ['баары', 'everyone, everything'], ['кээ бир', 'some'], ['эч ким', 'nobody'], ['эч нерсе', 'nothing'], ['эч качан', 'never'], ['эч жакка', 'nowhere (to)'], ['өзүм', 'myself'], ['өз', 'own'], ['тааны-', 'know (a person)'], ['сез-', 'feel'], ['жабык', 'closed']] }
      ],
      quiz: [
        { t: 'mc', q: '“Nobody came.”', o: ['[[Эч ким келген жок.]]', '[[Эч ким келди.]]', '[[Бирөө келген жок.]]', '[[Баары келди.]]'], why: 'эч ким + a negative verb.' },
        { t: 'mc', q: '“I don’t know anything.”', o: ['[[Мен эч нерсе билбейм.]]', '[[Мен эч нерсе билем.]]', '[[Мен бир нерсе билбейм.]]', '[[Мен баары билбейм.]]'], why: 'Kyrgyz needs both “no”s.' },
        { t: 'mc', q: '[[Бирөө чалды]] means…', o: ['Someone called.', 'Nobody called.', 'Everyone called.', 'One person called twice.'], why: 'бирөө = someone.' },
        { t: 'mc', q: '“She is never late.”', o: ['[[Ал эч качан кечикпейт.]]', '[[Ал эч качан кечигет.]]', '[[Ал ар дайым кечикпейт.]]', '[[Ал бир күнү кечикпейт.]]'], why: 'эч качан + negative verb.' },
        { t: 'mc', q: '[[ар бир]] means…', o: ['every, each', 'some', 'nobody', 'one more'], why: 'ар = every.' },
        { t: 'mc', q: '“I made this myself.”', o: ['[[Мен муну өзүм жасадым.]]', '[[Мен муну өзү жасадым.]]', '[[Мен муну менин жасадым.]]', '[[Мен өзүмдү жасадым.]]'], why: 'өз + үм = myself.' },
        { t: 'mc', q: '[[өз тилибиз]] means…', o: ['our own language', 'our language teacher', 'ourselves', 'the language of ours, theirs'], why: 'өз = own.' },
        { t: 'type', q: 'Type: “Everything’s fine!”', a: ['Баары жакшы'], why: 'баары = everything.' },
        { t: 'type', q: 'Type the word for “nothing”.', a: ['эч нерсе'], why: 'эч + нерсе.' },
        { t: 'order', q: 'Build: “I’m not going anywhere.”', a: 'Эч жакка барбайм', extra: ['барам'], why: 'nowhere-to go-not-I.' }
      ]
    },
    {
      id: 'linking', title: 'And then: linking actions', kg: 'Туруп, жуунуп, чай ичтим', minutes: 30,
      goals: ['Chain actions with -ып', 'Say “without doing” with -бай', 'Describe your daily routine'],
      blocks: [
        { t: 'h', text: 'One tense at the end' },
        { t: 'eli5', html: 'In English you say “I got up, washed, and drank tea” — three past tenses. Kyrgyz is lazier and smarter: the first actions just get [[-ып]] (“-ing and then”), and only the <b>last verb</b> says when and who. Like a train where only the last carriage carries the label.' },
        { t: 'compare', en: 'I got up, washed and drank tea.', kg: 'Мен тур|уп, жуун|уп, чай ич|ти|м.', gloss: 'I get.up-and wash-and tea drink-did-I' },
        { t: 'compare', en: 'Tomorrow I’ll get up, wash and drink tea.', kg: 'Эртең тур|уп, жуун|уп, чай ич|е|м.', gloss: 'tomorrow get.up-and wash-and tea drink-will-I', note: 'Same [[-уп]] forms — only the last verb changed.' },
        { t: 'p', html: '[[-ып]] follows the same pattern you met in [[-ып жатат]]: [[-ып / -ип / -уп / -үп]] after a consonant, just [[-п]] after a vowel: [[иште|п]], [[оку|п]].' },
        { t: 'h', text: 'Famous pairs' },
        { t: 'p', html: 'Some -ып pairs are so common they work as one word:' },
        { t: 'ex', items: [['бар|ып кел|ди|м', 'I’ve been (there and back)', 'went-and came'], ['сатып ал|ды|м', 'I bought', 'sold-and took'], ['алып кел|иңиз', 'bring (it)', 'take-and come'], ['алып кет|иңиз', 'take (it) away', 'take-and leave'], ['чыгып кет|ти', 'he went out', 'exit-and left'], ['кайтып кел|ди|м', 'I came back', 'return-and came']] },
        { t: 'h', text: 'Without doing: -бай' },
        { t: 'p', html: 'Put the not-piece before [[-й]]: [[-бай / -бей / -бой / -бөй]] = “without …-ing”.' },
        { t: 'ex', items: [['Ал тамак же|бе|й кет|ти.', 'He left without eating.'], ['Мен укта|ба|й иште|ди|м.', 'I worked without sleeping.'], ['Ойло|бо|й сүйлө|бө!', 'Don’t speak without thinking!']] },
        { t: 'h', text: 'My day' },
        { t: 'vocab', items: [['ойгон-', 'wake up'], ['тур-', 'get up'], ['жуун-', 'wash (yourself)'], ['кийин-', 'get dressed'], ['эртең мененки тамак', 'breakfast'], ['түшкү тамак', 'lunch'], ['кечки тамак', 'dinner'], ['ишке бар-', 'go to work'], ['үйгө кел-', 'come home'], ['эс ал-', 'rest, relax', '“take breath/mind”'], ['адегенде', 'first'], ['андан кийин', 'after that'], ['акырында', 'finally']] },
        { t: 'ex', title: 'A morning, told the Kyrgyz way', items: [['Мен саат жетиде ойгон|уп, тур|а|м.', 'I wake up and get up at seven.'], ['Адегенде жуун|уп, кийин|ип, эртең мененки тамак ич|е|м.', 'First I wash, get dressed and have breakfast.', '“drink breakfast” — Kyrgyz often says ич- for meals with tea'], ['Андан кийин автобус менен ишке бар|а|м.', 'After that I go to work by bus.'], ['Кечинде үйгө кел|ип, эс ал|а|м.', 'In the evening I come home and relax.']] },
        { t: 'tip', title: 'Short sentences are fine too', html: 'You can always use separate sentences with [[анан]] (then). But chaining with [[-ып]] makes you sound fluent quickly, and you’ll hear it constantly.' }
      ],
      quiz: [
        { t: 'mc', q: 'In a chain of actions, which verb shows the tense?', o: ['The last one', 'The first one', 'All of them', 'None'], why: 'Only the last carriage carries the label.' },
        { t: 'mc', q: '“I got up and washed.”', o: ['[[Туруп, жуундум.]]', '[[Турдум, жуунуп.]]', '[[Туруп, жуунуп.]]', '[[Турам, жуундум.]]'], why: 'First verb -уп, last verb past.' },
        { t: 'mc', q: '[[Бишкекке барып келдим]] means…', o: ['I’ve been to Bishkek (and back).', 'I’m going to Bishkek.', 'I came from Bishkek.', 'I want to go to Bishkek.'], why: 'went-and came.' },
        { t: 'mc', q: '“He left without eating.”', o: ['[[Ал тамак жебей кетти.]]', '[[Ал тамак жеп кетти.]]', '[[Ал тамак жебеди кетти.]]', '[[Ал тамак жок кетти.]]'], why: '-бей = without.' },
        { t: 'mc', q: '“Bring (it), please.”', o: ['[[Алып келиңиз.]]', '[[Алып кетиңиз.]]', '[[Сатып алыңыз.]]', '[[Барып келиңиз.]]'], why: 'take-and come.' },
        { t: 'mc', q: 'What does [[эс ал-]] mean?', o: ['rest, relax', 'remember', 'take notes', 'wake up'], why: 'Literally “take breath”.' },
        { t: 'type', q: 'Type: “I bought” (sell-and took)', a: ['сатып алдым', 'Мен сатып алдым'], why: 'сатып + алдым.' },
        { t: 'order', q: 'Build: “I come home and relax.”', a: 'Үйгө келип эс алам', why: 'home-to come-and rest-take-I.' },
        { t: 'order', q: 'Build: “First I wash and get dressed.”', a: 'Адегенде жуунуп кийинем', why: 'first wash-and dress-I.' }
      ]
    },
    {
      id: 'real-life', title: 'Real life: taxi, café, doctor, bazaar', kg: 'Турмушта', minutes: 40,
      goals: ['Take a taxi and agree a price', 'Order food and pay', 'Explain a health problem', 'Bargain at the bazaar'],
      blocks: [
        { t: 'h', text: 'Taxi' },
        { t: 'dialog', title: 'In a taxi', lines: [['Tom', 'Саламатсызбы! Ош базарына чейин канча?', 'Hello! How much to Osh Bazaar?'], ['Айдоочу', 'Үч жүз сом.', 'Three hundred som.'], ['Tom', 'Кымбат. Эки жүз элүү болобу?', 'That’s expensive. Is 250 OK?'], ['Айдоочу', 'Мейли, отуруңуз.', 'Alright, get in.'], ['Tom', 'Бул жерден токтотуп коюңузчу.', 'Please stop here.'], ['Айдоочу', 'Мына, келдик.', 'Here we are.']] },
        { t: 'vocab', items: [['… чейин канча?', 'How much to …?'], ['Бул жерден токтотуп коюңузчу.', 'Please stop here.'], ['Тезирээк', 'faster'], ['Ушул жерде', 'right here'], ['Мына', 'here (it is), look'], ['Келдик.', 'We’ve arrived.']] },
        { t: 'h', text: 'Café' },
        { t: 'dialog', title: 'Ordering lunch', lines: [['Официант', 'Саламатсызбы! Эмне каалайсыз?', 'Hello! What would you like?'], ['Tom', 'Менюну бериңизчи.', 'Could I have the menu, please?'], ['Tom', 'Мага бир лагман жана бир чай.', 'One lagman and one tea for me.'], ['Официант', 'Кара чайбы же көк чайбы?', 'Black tea or green tea?'], ['Tom', 'Көк чай. Шекерсиз.', 'Green tea. Without sugar.'], ['Tom', 'Абдан даамдуу экен! Эсепти алып келиңизчи.', 'That was delicious! Could you bring the bill, please?']] },
        { t: 'vocab', items: [['Эмне каалайсыз?', 'What would you like?'], ['Мага … бериңизчи.', 'Could I have … please?'], ['Эсепти алып келиңизчи.', 'The bill, please.'], ['лагман', 'lagman — hand-pulled noodles with meat and vegetables'], ['палоо', 'plov — rice with meat and carrots'], ['манты', 'manty — steamed dumplings'], ['самса', 'samsa — baked pastry with meat'], ['шорпо', 'shorpo — meat soup'], ['боорсок', 'boorsok — fried dough pieces'], ['кымыз', 'kymyz — fermented mare’s milk, the summer drink'], ['вегетариандык', 'vegetarian']] },
        { t: 'h', text: 'Doctor' },
        { t: 'eli5', html: 'Kyrgyz says your body part <b>is hurting</b> — it does the action: [[Башым ооруп жатат]] = “My head is hurting”. Swap in any body part.' },
        { t: 'dialog', title: 'At the clinic', lines: [['Дарыгер', 'Эмнеге даттанасыз?', 'What’s the complaint?'], ['Tom', 'Менин башым жана тамагым ооруп жатат.', 'My head and throat hurt.'], ['Дарыгер', 'Температураңыз барбы?', 'Do you have a temperature?'], ['Tom', 'Ооба, кечээден бери.', 'Yes, since yesterday.'], ['Дарыгер', 'Бул дарыны күнүнө үч жолу ичиңиз.', 'Take this medicine three times a day.']] },
        { t: 'vocab', items: [['баш', 'head'], ['тамак', 'throat (also “food”!)'], ['ич', 'stomach, belly (also “inside”)'], ['тиш', 'tooth'], ['бел', 'lower back, waist'], ['колум', 'my arm, hand'], ['… ооруп жатат', '… hurts'], ['дары', 'medicine'], ['дарыкана', 'pharmacy', '“medicine-house”'], ['Тез жардам чакырыңыз!', 'Call an ambulance!', 'In Kyrgyzstan dial 103 (ambulance) or 112'], ['жолу', 'time(s)', '[[үч жолу]] — three times']] },
        { t: 'h', text: 'Bazaar' },
        { t: 'dialog', title: 'Bargaining for a kalpak', lines: [['Tom', 'Бул калпак канча турат?', 'How much is this kalpak?'], ['Сатуучу', 'Эки миң сом.', 'Two thousand som.'], ['Tom', 'Өтө кымбат! Миң беш жүз болобу?', 'Too expensive! Is 1,500 OK?'], ['Сатуучу', 'Жок, миң сегиз жүз. Колго жасалган!', 'No, 1,800. It’s handmade!'], ['Tom', 'Мейли, миң жети жүз. Акыркы баа.', 'OK, 1,700. Final price.'], ['Сатуучу', 'Макул, алыңыз!', 'Deal, take it!']] },
        { t: 'vocab', items: [['калпак', 'kalpak — the white felt hat'], ['колго жасалган', 'handmade'], ['акыркы баа', 'final price'], ['баа', 'price'], ['Макул.', 'Agreed. Deal.'], ['Арзандатып бериңизчи.', 'Could you lower the price?'], ['Карап эле жатам.', 'I’m just looking.']] },
        { t: 'tip', title: 'Bargaining culture', html: 'In bazaars, bargaining is expected and friendly; in supermarkets and cafés, prices are fixed. A smile and a few Kyrgyz words often get you a better price than any argument.' }
      ],
      quiz: [
        { t: 'mc', q: 'How do you ask a taxi driver the price to Osh Bazaar?', o: ['[[Ош базарына чейин канча?]]', '[[Ош базары кайда?]]', '[[Ош базарында канча?]]', '[[Ош базарынан канча?]]'], why: 'чейин = up to.' },
        { t: 'mc', q: '“Please stop here.”', o: ['[[Бул жерден токтотуп коюңузчу.]]', '[[Бул жерге барыңызчы.]]', '[[Бул жерде күтө туруңуз.]]', '[[Бул жерди көрүңүз.]]'], why: 'Stop (the car) at this place.' },
        { t: 'mc', q: '“The bill, please.”', o: ['[[Эсепти алып келиңизчи.]]', '[[Менюну бериңизчи.]]', '[[Эсеп канча?]]', '[[Акча алыңыз.]]'], why: 'Bring the bill, please.' },
        { t: 'mc', q: '“My head hurts.”', o: ['[[Башым ооруп жатат.]]', '[[Мен баш ооруймун.]]', '[[Башым жок.]]', '[[Башыма оорудум.]]'], why: 'My head is hurting.' },
        { t: 'mc', q: 'Where do you buy medicine?', o: ['[[дарыкана]]', '[[ашкана]]', '[[китепкана]]', '[[оорукана]]'], why: 'дары (medicine) + кана (place).' },
        { t: 'mc', q: 'What is [[кымыз]]?', o: ['fermented mare’s milk', 'a meat soup', 'a felt hat', 'fried dough'], why: 'The national drink of summer pastures.' },
        { t: 'mc', q: 'At the bazaar, [[Макул]] means…', o: ['Deal / Agreed', 'Too expensive', 'I’m just looking', 'Handmade'], why: 'макул = OK, agreed.' },
        { t: 'type', q: 'Type: “three times a day” (a day = күнүнө)', a: ['күнүнө үч жолу'], why: 'per-day three times.' },
        { t: 'order', q: 'Build: “One lagman and one tea for me.”', a: 'Мага бир лагман жана бир чай', why: 'to-me one lagman and one tea.' }
      ]
    },
    {
      id: 'phone-hotel-work', title: 'Phone, hotel and work', kg: 'Телефон, мейманкана, жумуш', minutes: 40,
      goals: ['Make and answer a phone call', 'Check in to a hotel and solve a problem', 'Talk about your job and your workday'],
      blocks: [
        { t: 'h', text: 'On the phone' },
        { t: 'p', html: 'Kyrgyz answers the phone with [[Алло]] — used only on the phone, never as a hello in person. You’ll also hear [[Угуп жатам]], “I’m listening”.' },
        { t: 'dialog', title: 'Calling a friend', lines: [['Апасы', 'Алло, угуп жатам.', 'Hello, I’m listening.'], ['Tom', 'Саламатсызбы! Бул Том. Бермет үйдөбү?', 'Hello! This is Tom. Is Bermet at home?'], ['Апасы', 'Жок, ал азыр иште. Эмне деп коёюн?', 'No, she’s at work now. What shall I tell her?'], ['Tom', 'Кечинде мага чалсын деп коюңузчу.', 'Please tell her to call me this evening.'], ['Апасы', 'Макул, айтып коём. Анда сиздин номериңиз барбы?', 'OK, I’ll tell her. Does she have your number?'], ['Tom', 'Ооба, бар. Рахмат, жакшы калыңыз!', 'Yes, she does. Thanks, goodbye!']] },
        { t: 'vocab', items: [['Алло', 'Hello? (phone only)'], ['Угуп жатам.', 'I’m listening. (answering a call)'], ['телефон чал-', 'make a phone call', '[[Мага чалыңыз]] — call me'], ['Кайра чалам.', 'I’ll call back.'], ['Линия бош эмес.', 'The line is busy.'], ['Үнүңүз угулбай жатат.', 'I can’t hear you.', '“your voice isn’t being heard”'], ['Туура эмес номерге чалдыңыз.', 'You’ve called the wrong number.'], ['Номериңиз канча?', 'What’s your number?'], ['билдирүү', 'message, text']] },
        { t: 'h', text: 'At the hotel' },
        { t: 'dialog', title: 'Checking in', lines: [['Tom', 'Саламатсызбы! Мен бөлмө брондогом. Атым Том Смит.', 'Hello! I’ve booked a room. My name is Tom Smith.'], ['Кызматкер', 'Бир мүнөт… Ооба, бар. Паспортуңузду бериңизчи.', 'One moment… Yes, here it is. Your passport, please.'], ['Кызматкер', 'Бөлмөңүз үчүнчү кабатта. Мына ачкычыңыз.', 'Your room is on the third floor. Here’s your key.'], ['Tom', 'Эртең мененки тамак саат канчада?', 'What time is breakfast?'], ['Кызматкер', 'Жетиден онго чейин, биринчи кабатта.', 'From seven to ten, on the ground floor.'], ['Tom', 'Wi-Fi барбы?', 'Is there Wi-Fi?'], ['Кызматкер', 'Бар, паролу ачкычтын үстүндө жазылган.', 'Yes, the password is written on the key card.']] },
        { t: 'warn', title: 'Floors start at one', html: 'In Kyrgyzstan the ground floor is [[биринчи кабат]] (the first floor). What English calls the first floor is [[экинчи кабат]].' },
        { t: 'vocab', items: [['мейманкана', 'hotel', '[[мейман]] (guest) + [[кана]] (house)'], ['бөлмө', 'room'], ['брондо-', 'book, reserve'], ['бир орундуу бөлмө', 'single room'], ['эки орундуу бөлмө', 'double room'], ['кабат', 'floor, storey'], ['ачкыч', 'key'], ['паспорт', 'passport'], ['сүлгү', 'towel'], ['… иштебей жатат.', '… isn’t working.', '[[Душ иштебей жатат]] — the shower isn’t working'], ['Бөлмөнү алмаштырсам болобу?', 'Could I change rooms?'], ['Эсепти даярдап коюңузчу.', 'Please prepare the bill (for check-out).']] },
        { t: 'h', text: 'At work' },
        { t: 'dialog', title: 'Small talk with a new colleague', lines: [['Нурлан', 'Сиз бул жерде жаңысызбы? Кайсы бөлүмдө иштейсиз?', 'Are you new here? Which department do you work in?'], ['Tom', 'Ооба, бүгүн биринчи күнүм. Маркетинг бөлүмүндө иштейм.', 'Yes, today is my first day. I work in marketing.'], ['Нурлан', 'Кош келиңиз! Иш саат тогузда башталат, түшкү тыныгуу бирден экиге чейин.', 'Welcome! Work starts at nine, the lunch break is from one to two.'], ['Tom', 'Жыйналыш качан болот?', 'When is the meeting?'], ['Нурлан', 'Ар дүйшөмбү саат ондо. Жетекчибиз абдан жакшы адам.', 'Every Monday at ten. Our boss is a very nice person.']] },
        { t: 'vocab', items: [['жумуш / иш', 'work, job'], ['кеңсе', 'office'], ['кызматкер', 'employee, staff member', '[[кызмат]] (service) + [[-кер]] (doer)'], ['кесиптеш', 'colleague', '“profession-mate”'], ['жетекчи', 'boss, manager'], ['бөлүм', 'department'], ['жыйналыш', 'meeting'], ['айлык', 'salary', 'literally “monthly”'], ['дем алыш', 'day off, weekend'], ['иш сапар', 'business trip'], ['түшкү тыныгуу', 'lunch break'], ['келишим', 'contract, agreement']] },
        { t: 'tip', title: 'Jobs with -чы', html: 'Many job names are a noun + [[-чы]]: [[иш|чи]] (worker), [[спорт|чу]] (athlete), [[котор|мочу]] (translator, from [[котор-]] “translate”), [[балык|чы]] (fisherman). See lesson 6.1 for the whole toolkit.' }
      ],
      quiz: [
        { t: 'mc', q: 'When do you say [[Алло]]?', o: ['Only when answering or making a phone call', 'When meeting a friend', 'When entering a shop', 'When saying goodbye'], why: 'Алло is phone-only.' },
        { t: 'mc', q: '[[Линия бош эмес]] means…', o: ['The line is busy.', 'The line is free.', 'There’s no signal.', 'Wrong number.'], why: '“The line isn’t free.”' },
        { t: 'mc', q: '“I’ll call back.”', o: ['[[Кайра чалам.]]', '[[Кайра келем.]]', '[[Чалып жатам.]]', '[[Мага чалыңыз.]]'], why: 'кайра = again, back.' },
        { t: 'mc', q: 'In Kyrgyzstan, what is [[биринчи кабат]]?', o: ['the ground floor', 'the floor above the ground floor', 'the basement', 'the top floor'], why: 'Floors are counted from the ground.' },
        { t: 'mc', q: '[[Душ иштебей жатат]] means…', o: ['The shower isn’t working.', 'I’m not taking a shower.', 'The shower is busy.', 'Where is the shower?'], why: '“The shower is not working.”' },
        { t: 'mc', q: 'What is a [[кесиптеш]]?', o: ['a colleague', 'a boss', 'a contract', 'a business trip'], why: '“profession-mate”.' },
        { t: 'mc', q: 'What is [[айлык]]?', o: ['salary', 'holiday', 'monthly meeting', 'moon'], why: 'From ай (month): monthly pay.' },
        { t: 'type', q: 'Type: “Is there Wi-Fi?”', a: ['Wi-Fi барбы'], why: 'Wi-Fi + бар + бы.' },
        { t: 'type', q: 'Type the word for “hotel”.', a: ['мейманкана'], why: 'guest-house.' },
        { t: 'order', q: 'Build: “I work in the marketing department.”', a: 'Маркетинг бөлүмүндө иштейм', why: 'marketing department-its-in work-I.' }
      ]
    }
  ]
});
