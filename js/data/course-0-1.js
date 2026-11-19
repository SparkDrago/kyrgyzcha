/* Stage 0 — Before you start   |   Stage 1 — Alphabet & sounds */
window.COURSE = window.COURSE || { stages: [] };

window.COURSE.stages.push({
  n: 0, title: 'Before you start', kg: 'Баштоо', level: 'Start',
  blurb: 'What kind of language Kyrgyz is, the six big ideas that make it different from English, and how to use this course so it actually sticks.',
  lessons: [
    {
      id: 'how-kyrgyz-works', title: 'How Kyrgyz works', kg: 'Кыргыз тили кандай иштейт', minutes: 20,
      goals: ['Know where Kyrgyz comes from', 'See the big ideas before the details', 'Stop expecting it to work like English'],
      blocks: [
        { t: 'h', text: 'Meet the language' },
        { t: 'p', html: 'Kyrgyz ([[кыргыз тили]]) is the state language of Kyrgyzstan, a mountain country in Central Asia between Kazakhstan, Uzbekistan, Tajikistan and China. About five million people speak it. Russian is widely used too, especially in the capital, Bishkek — but in villages, at home, in songs and in the national epic <i>Manas</i>, the language is Kyrgyz.' },
        { t: 'p', html: 'Kyrgyz is a <b>Turkic</b> language. Its closest sibling is Kazakh — the two are largely understandable to each other. Cousins include Uzbek, Tatar, Uyghur and Turkish. If you ever learned Turkish, many words and almost all the grammar logic will feel familiar. Kyrgyz is <i>not</i> related to Russian, even though it uses Russian-style letters.' },
        { t: 'eli5', html: 'Imagine English is a train where every carriage is a separate word: “in — my — houses”. Kyrgyz is one long carriage that grows: [[үй|лөр|үм|дө]]. Same meaning, but the little words became <b>pieces glued to the end</b>. Learn the pieces, and you can build thousands of words you’ve never seen.' },
        { t: 'h', text: 'The six big ideas' },
        { t: 'p', html: '<b>1. Lego endings.</b> Kyrgyz adds endings in a fixed order: thing → how many → whose → role. Linguists call this “agglutinative”, from the Latin for “glue on”.' },
        { t: 'compare', en: 'from my friends', kg: 'дос|тор|ум|дан', gloss: 'friend - s - my - from', note: 'English reads front-to-back. Kyrgyz endings read back-to-front: <b>from</b> (дан) → <b>my</b> (ум) → <b>friends</b> (дос+тор).' },
        { t: 'p', html: '<b>2. The verb goes last.</b> English is Subject–Verb–Object. Kyrgyz is Subject–Object–Verb.' },
        { t: 'compare', en: 'I drink tea.', kg: 'Мен чай ич|е|м.', gloss: 'I tea drink-(now)-I' },
        { t: 'p', html: '<b>3. Vowel harmony.</b> Endings change their vowel to match the word, like a chameleon changing colour. The plural is one ending, but it appears as [[-лар]], [[-лер]], [[-лор]], [[-лөр]] and more, depending on the word. You’ll master this in lesson 1.7.' },
        { t: 'p', html: '<b>4. No “to have”.</b> You say a thing <i>exists</i> for you: [[Менин машина|м бар]] — “my car exists” = I have a car.' },
        { t: 'p', html: '<b>5. Description before the thing.</b> Every “who / which / that” part goes <i>before</i> the noun: “the man <u>who lives here</u>” becomes [[бул жерде жаша|ган киши]] — “here living man”.' },
        { t: 'p', html: '<b>6. Less to memorise.</b> No “a” or “the”. No he vs she — [[ал]] means both. No masculine/feminine nouns. Verbs are almost all regular. Spelling matches sound.' },
        { t: 'tip', title: 'Speak Arabic, Persian or Turkish?', html: 'You already know hundreds of Kyrgyz words. [[китеп]] is كتاب (book), [[убакыт]] is وقت (time), [[саат]] is ساعة (hour), [[рахмат]] comes from رحمة. Switch on <b>Arabic hints</b> at the top of the page, and see <a href="#arabic">For Arabic speakers</a> for the full list and the sound-change rules.' },
        { t: 'h', text: 'Friendly and polite “you”' },
        { t: 'p', html: 'Like French <i>tu / vous</i>, Kyrgyz has two kinds of “you”. [[сен]] is for friends, children, family your age. [[сиз]] is for strangers, older people, teachers, shop staff — anyone you’d call “sir” or “madam”. As a foreigner, <b>default to [[сиз]]</b>: nobody is offended by politeness.' },
        { t: 'tip', title: 'Respect is built into the language', html: 'Age matters in Kyrgyz culture. You’ll address older men as [[байке]] (big brother) and older women as [[эже]] (big sister), even strangers. Using these words instantly makes people warm to you.' },
        { t: 'h', text: 'Three scripts, one language' },
        { t: 'p', html: 'Kyrgyz was written in Arabic script until 1928, in a Latin alphabet from 1928 to 1940, and in Cyrillic since 1940. Today everything — signs, books, news, phones — uses Cyrillic, so that’s what you’ll learn. It takes about two weeks. You’ll see Latin letters under the Kyrgyz as training wheels; switch them off with the “Latin help” button once you can read.' }
      ],
      quiz: [
        { t: 'mc', q: 'Which language is closest to Kyrgyz?', o: ['Kazakh', 'Russian', 'Persian', 'Mongolian'], why: 'Kyrgyz and Kazakh are both Turkic and very close. Russian only lent its alphabet.' },
        { t: 'mc', q: 'Where does the verb usually go in a Kyrgyz sentence?', o: ['At the end', 'Second, like English', 'At the start', 'Anywhere'], why: 'Kyrgyz is Subject–Object–Verb: [[Мен чай ичем]] = I tea drink.' },
        { t: 'mc', q: '[[дос|тор|ум|дан]] means “from my friends”. Which piece means “from”?', o: ['[[дан]]', '[[дос]]', '[[тор]]', '[[ум]]'], why: 'The role ending (from/to/in) always comes last.' },
        { t: 'mc', q: 'You meet your friend’s grandmother. Which “you” do you use?', o: ['[[сиз]]', '[[сен]]', 'Either is fine'], why: '[[сиз]] is the respectful “you” — always for older people and strangers.' },
        { t: 'mc', q: 'How does Kyrgyz say “I have a car”?', o: ['“My car exists”', '“I own car”', '“Car is with me-have”', 'With a verb meaning “to have”'], why: 'Kyrgyz has no “have”: [[Менин машинам бар]] = my car exists.' },
        { t: 'mc', q: 'What does [[ал]] mean?', o: ['he, she or it', 'only “he”', 'only “she”', '“the”'], why: 'Kyrgyz has no grammatical gender. One word covers he, she and it.' },
        { t: 'mc', q: 'Which alphabet is Kyrgyz written in today?', o: ['Cyrillic', 'Latin', 'Arabic', 'Its own unique script'], why: 'Cyrillic since 1940 — 33 Russian letters plus Ң, Ө and Ү.' },
        { t: 'mc', q: 'In “the man who lives here”, where does “who lives here” go in Kyrgyz?', o: ['Before “man”', 'After “man”, like English', 'At the very end of the sentence'], why: 'Descriptions always come first: [[бул жерде жашаган киши]].' }
      ]
    },
    {
      id: 'how-to-learn', title: 'How to learn with this course', kg: 'Кантип үйрөнөбүз', minutes: 15,
      goals: ['Know what each part of a lesson is for', 'Set up a daily routine', 'Know how to type and listen'],
      blocks: [
        { t: 'h', text: 'What a lesson looks like' },
        { t: 'list', items: ['<b>Like you’re five</b> — the idea in the simplest possible words, usually with a picture in your head.', '<b>English vs Kyrgyz</b> boxes — the same sentence in both languages, with a word-by-word line so you see the logic, not just the translation.', '<b>Coloured pieces</b> — in examples, the word’s stem is plain and each ending gets its own colour: [[китеп|тер|им|ден]]. Watching the colours trains your eye to split words.', '<b>Words</b> — vocabulary with a listen button. Everything here goes into your flashcards.', '<b>Practice test</b> — multiple choice, typing and sentence-building. Score 80% and the lesson is complete.'] },
        { t: 'h', text: 'Typing Kyrgyz' },
        { t: 'p', html: 'Answer boxes come with an on-screen Kyrgyz keyboard (the special letters [[ң ө ү ы]] are highlighted). No Kyrgyz keyboard? Type Latin letters and the site converts them: <b>j</b> → ж, <b>ch</b> → ч, <b>sh</b> → ш, <b>ng</b> → ң, <b>ö</b> or <b>oe</b> → ө, <b>ü</b> or <b>ue</b> → ү, <b>y</b> after a consonant → ы, <b>y</b> after a vowel → й.' },
        { t: 'tip', title: 'Install a real keyboard', html: 'Add the “Kyrgyz” keyboard on your phone (Settings › Keyboards) and computer. Typing in Cyrillic every day is one of the fastest ways to make the letters automatic.' },
        { t: 'h', text: 'Listening' },
        { t: 'p', html: 'Tap any Kyrgyz word or the speaker button to hear it. The site uses voices built into your device, choosing Kyrgyz if available, then Kazakh (very close), then Turkish with adjusted spelling. It’s good for practice, but not a native speaker — see <a href="#about-audio">About the audio</a> for how to add better voices and where to hear real people.' },
        { t: 'h', text: 'The routine that works' },
        { t: 'eli5', html: 'Your brain is like a path through tall grass. Walk it once and the grass springs back. Walk it a little every day and it becomes a road. <b>Twenty minutes every day beats three hours on Sunday.</b>' },
        { t: 'list', ordered: true, items: ['Flashcards first (5–10 min). Say the answer out loud before flipping.', 'One lesson section or practice test (15–20 min).', 'Shadow one dialogue: listen, pause, repeat with the same rhythm (5 min).', 'Optional: a graded reader or a Kyrgyz song.'] },
        { t: 'warn', title: 'The one big mistake', html: 'Don’t skip the alphabet and lean on Latin letters. Learners who do this hit a wall at A2, because every real sign, menu and message is in Cyrillic. Two weeks of letters now saves months later.' }
      ],
      quiz: [
        { t: 'mc', q: 'What do you need to score on a practice test to complete a lesson?', o: ['80%', '50%', '100%', '60%'], why: 'Like a real level test: 80% shows you’ve really got it.' },
        { t: 'mc', q: 'In [[китеп|тер|им|ден]], which part is the stem (the meaning)?', o: ['[[китеп]] (book)', '[[тер]]', '[[им]]', '[[ден]]'], why: 'The stem comes first and stays plain; endings are coloured.' },
        { t: 'mc', q: 'With Latin typing, what does “ng” become?', o: ['ң', 'нг', 'г', 'н'], why: 'ң is one sound, like “ng” in sing.' },
        { t: 'mc', q: 'Which study pattern works best?', o: ['20 minutes every day', '3 hours once a week', 'Only when you feel like it', 'Cramming before a trip'], why: 'Short, daily, spaced practice is how memory works.' },
        { t: 'type', q: 'Type the letter for the sound “ü” (use the keyboard).', a: ['ү'], why: 'Ү — say “ee” with rounded lips.' }
      ]
    }
  ]
});

window.COURSE.stages.push({
  n: 1, title: 'The alphabet & sounds', kg: 'Алфавит жана тыбыштар', level: 'A0',
  blurb: 'All 36 letters in five friendly groups, the four sounds that make Kyrgyz special, long vowels, and vowel harmony — the rule behind every ending you’ll ever learn.',
  lessons: [
    {
      id: 'letters-friends', title: 'Six letters you already know', kg: 'А Е К М О Т', minutes: 20,
      goals: ['Read А, Е, К, М, О, Т', 'Read your first real Kyrgyz words'],
      blocks: [
        { t: 'h', text: 'Good news first' },
        { t: 'eli5', html: 'Some Kyrgyz letters are like friends from school who moved to a new town: same face, same voice. These six look like English letters <b>and</b> sound like them. You can read them right now.' },
        { t: 'letters', items: ['А', 'Е', 'К', 'М', 'О', 'Т'] },
        { t: 'h', text: 'How they really sound' },
        { t: 'list', items: ['[[А]] is always open, like “a” in <i>father</i>. Never like “a” in <i>cat</i> or <i>cake</i>.', '[[О]] is always a full “o”, like British <i>more</i> or <i>often</i>. English often swallows unstressed vowels into “uh” — Kyrgyz never does. Every vowel is said clearly.', '[[Е]] is “e” as in <i>bed</i>. At the very start of a word it’s “ye” — but native Kyrgyz words that start with this sound use [[Э]] instead (lesson 1.4).', '[[К]] is “k”. Next to [[а о у ы]] it moves deeper into the throat — you’ll hear it naturally.'] },
        { t: 'warn', title: 'Capital and small letters', html: 'Most Cyrillic small letters are just smaller capitals: [[А а]], [[Е е]], [[К к]], [[М м]], [[О о]], [[Т т]]. Careful with [[т]]: in handwriting and italics it can look like an English “m”. Printed, it’s a small Т.' },
        { t: 'h', text: 'Your first words' },
        { t: 'p', html: 'Read each word out loud, letter by letter, then smoothly. Kyrgyz words are usually stressed on the <b>last syllable</b>: a-TA, ke-ME.' },
        { t: 'ex', items: [['ата', 'father'], ['ат', 'horse; also “name”'], ['ак', 'white'], ['кат', 'letter (a message)'], ['ток', 'full (after eating)'], ['ок', 'bullet, arrow'], ['кеме', 'ship, boat'], ['Акмат', 'Akmat (a man’s name)']] },
        { t: 'tip', title: 'One letter = one sound', html: 'English spelling is chaos (though, through, tough). Kyrgyz is spelled almost exactly as it sounds. If you can say the letters, you can read the word. That’s a superpower you’ll have in two weeks.' }
      ],
      quiz: [
        { t: 'mc', q: 'How do you read [[ата]]?', o: ['a-ta (father)', 'ay-tay', 'a-ka', 'o-to'], why: 'А = a as in father, Т = t.' },
        { t: 'mc', q: 'Which sound does [[О]] make?', o: ['A full “o” as in more', '“uh”', '“oo”', '“a”'], why: 'Kyrgyz never reduces vowels to “uh”.' },
        { t: 'mc', q: 'What does [[ак]] mean?', o: ['white', 'horse', 'father', 'ship'], why: '[[ак]] = white. You’ll see it in Ak-Suu, Ak-Talaa and other place names.' },
        { t: 'mc', q: 'Where is the stress in most Kyrgyz words?', o: ['On the last syllable', 'On the first syllable', 'On the middle syllable', 'There is no stress'], why: 'ke-ME, a-TA, mek-TEP.' },
        { t: 'mc', q: 'Which word means “ship”?', o: ['[[кеме]]', '[[кат]]', '[[ток]]', '[[ок]]'], why: '[[кеме]] — ke-me.' },
        { t: 'type', q: 'Type the Kyrgyz word for “horse”.', a: ['ат'], why: 'А + Т = ат.' },
        { t: 'type', q: 'Type the Kyrgyz word for “father”.', a: ['ата'], why: 'ата — two open a’s.' },
        { t: 'mc', q: 'What does [[кат]] mean?', o: ['a letter (message)', 'a cat', 'white', 'a ship'], why: 'A Kyrgyz [[кат]] is something you write — no cats involved!' }
      ]
    },
    {
      id: 'letters-traps', title: 'Look-alikes that lie', kg: 'В Н Р С У Х', minutes: 25,
      goals: ['Stop reading В, Н, Р, С, У, Х as English', 'Read words like нан, суу, сен'],
      blocks: [
        { t: 'h', text: 'Six liars' },
        { t: 'eli5', html: 'These six letters are wearing English costumes. [[Н]] looks like an H but is really an N. [[Р]] looks like a P but is really an R. Your eyes will try to trick you for a few days — that’s normal. Say each one out loud ten times.' },
        { t: 'letters', items: ['В', 'Н', 'Р', 'С', 'У', 'Х'] },
        { t: 'table', cols: ['Looks like', 'Is really', 'Memory trick'], rows: [['B', '[[В]] = v', 'A “B” that got <b>v</b>ery lazy and buzzes: vvv'], ['H', '[[Н]] = n', 'Turn your head: H → N is just one stroke moved'], ['P', '[[Р]] = r', 'A rolling Р: the bump is a wheel — rrr'], ['C', '[[С]] = s', 'A snake hiding in a C: sss (never “k”)'], ['y', '[[У]] = oo', 'An owl saying “hoo” — У'], ['X', '[[Х]] = kh', 'X marks a raspy throat: like Scottish “loch”']] },
        { t: 'h', text: 'Read these' },
        { t: 'ex', items: [['нан', 'bread — the holy food of Kyrgyz tables'], ['суу', 'water (the double уу is held long)'], ['он', 'ten'], ['мен', 'I'], ['сен', 'you (friendly)'], ['сом', 'som — the Kyrgyz currency'], ['кар', 'snow'], ['конок', 'guest'], ['тур!', 'stand up! / get up!'], ['токто!', 'stop!'], ['Токмок', 'Tokmok (a town)'], ['Москва', 'Moscow']] },
        { t: 'warn', title: 'The [[Р]] is rolled', html: 'Kyrgyz [[р]] is a quick tap or roll of the tongue, like Spanish <i>pero</i> or a Scottish r. Don’t use the English “r” — it sounds like a different letter to Kyrgyz ears.' },
        { t: 'tip', title: 'Fun fact', html: '[[В]], [[Х]] (and [[Ф]], [[Ц]], [[Щ]]) mostly appear in words borrowed from Russian: [[вокзал]] (station), [[химия]] (chemistry). Native Kyrgyz words almost never use them.' }
      ],
      quiz: [
        { t: 'mc', q: 'What sound does [[Н]] make?', o: ['n', 'h', 'm', 'i'], why: 'Н is N in disguise.' },
        { t: 'mc', q: 'What sound does [[Р]] make?', o: ['a rolled r', 'p', 'b', 'f'], why: 'Р = r. Think “rolling wheel”.' },
        { t: 'mc', q: 'How do you read [[нан]]?', o: ['nan (bread)', 'han', 'hah', 'pan'], why: 'Н-А-Н = nan.' },
        { t: 'mc', q: 'How do you read [[суу]]?', o: ['suu (water) — long u', 'cyy', 'soy', 'kuu'], why: 'С = s, У = oo. Double уу = long.' },
        { t: 'mc', q: 'What does [[сен]] mean?', o: ['you (friendly)', 'I', 'ten', 'snow'], why: '[[мен]] = I, [[сен]] = you.' },
        { t: 'mc', q: 'What sound does [[У]] make?', o: ['oo as in moon', 'y as in yes', 'u as in cup', 'ü'], why: 'У is a pure “oo”.' },
        { t: 'type', q: 'Type the Kyrgyz word for “bread”.', a: ['нан'], why: 'н + а + н.' },
        { t: 'type', q: 'Type the Kyrgyz word for “I”.', a: ['мен'], why: 'м + е + н.' },
        { t: 'mc', q: 'Which word is “snow”?', o: ['[[кар]]', '[[сом]]', '[[он]]', '[[тур]]'], why: '[[кар]] — k-a-r, with a rolled r.' }
      ]
    },
    {
      id: 'letters-new-1', title: 'New shapes, part 1', kg: 'Б Г Д З И Й Л П', minutes: 25,
      goals: ['Read Б, Г, Д, З, И, Й, Л, П', 'Read city names: Талас, Баткен, Каракол'],
      blocks: [
        { t: 'h', text: 'Familiar sounds, new clothes' },
        { t: 'eli5', html: 'You already know these sounds from English. Only the pictures are new. Give each letter a little story and it sticks.' },
        { t: 'letters', items: ['Б', 'Г', 'Д', 'З', 'И', 'Й', 'Л', 'П'] },
        { t: 'table', cols: ['Letter', 'Sound', 'Memory trick'], rows: [['[[Б б]]', 'b', 'A “b” with a hat'], ['[[Г г]]', 'g', 'A gallows shape: <b>g</b>allows → g'], ['[[Д д]]', 'd', 'A little house with legs: <b>d</b>oor'], ['[[З з]]', 'z', 'The number 3, buzzing: zzz'], ['[[И и]]', 'ee', 'A backwards N that squeaks “ee”'], ['[[Й й]]', 'y (boy)', 'И wearing a tiny hat — a short “y”'], ['[[Л л]]', 'l', 'A tent: <b>l</b>ean-to'], ['[[П п]]', 'p', 'A doorway: <b>p</b>ortal']] },
        { t: 'warn', title: 'Two tricky ones', html: '[[И]] is “ee”, not English “i” in <i>sit</i>. And [[й]] is never a vowel: it only appears with another vowel, like English “y” in <i>boy</i> or <i>day</i>: [[ай]] (moon) = “ay”, [[үй]] (house), [[той]] (feast).' },
        { t: 'h', text: 'Read these' },
        { t: 'ex', items: [['бала', 'child'], ['бар', 'there is; exists'], ['бир', 'one'], ['ит', 'dog'], ['тил', 'language, tongue'], ['дос', 'friend'], ['зат', 'thing'], ['ай', 'moon; month'], ['той', 'feast, celebration'], ['дарак', 'tree'], ['китеп', 'book'], ['мектеп', 'school'], ['кийим', 'clothes'], ['базар', 'bazaar, market']] },
        { t: 'ex', title: 'Places in Kyrgyzstan', items: [['Талас', 'Talas — a city and province'], ['Баткен', 'Batken — in the far south-west'], ['Каракол', 'Karakol — near lake Issyk-Kul'], ['Кара-Балта', 'Kara-Balta — “black axe”']] },
        { t: 'tip', title: 'Г next to а, о, у, ы', html: 'After the “back” vowels [[а о у ы]], [[г]] softens into a gargled sound, like a French “r” or the Turkish ğ. In [[тоого]] (to the mountain) or [[ага]] (older brother) it’s almost a growl. Don’t worry about it yet — just notice it when you hear it.' }
      ],
      quiz: [
        { t: 'mc', q: 'What sound does [[И]] make?', o: ['ee as in see', 'i as in sit', 'n', 'y'], why: 'И = ee. Always.' },
        { t: 'mc', q: 'What sound does [[Д]] make?', o: ['d', 'g', 'l', 'b'], why: 'Д = d, the little house with legs.' },
        { t: 'mc', q: 'How do you read [[бала]]?', o: ['ba-la (child)', 'ga-pa', 'da-la', 'be-le'], why: 'Б = b, Л = l.' },
        { t: 'mc', q: 'What does [[дос]] mean?', o: ['friend', 'dog', 'thing', 'moon'], why: '[[дос]] — d-o-s.' },
        { t: 'mc', q: 'Which letter is “z”?', o: ['З', 'Э', 'Б', 'Л'], why: 'З looks like 3.' },
        { t: 'mc', q: 'How do you read [[мектеп]]?', o: ['mek-tep (school)', 'mek-ten', 'nek-tep', 'mex-ter'], why: 'Stress on the last syllable: mek-TEP.' },
        { t: 'type', q: 'Type the Kyrgyz word for “dog”.', a: ['ит'], why: 'и + т = it (sounds like “eet”).' },
        { t: 'type', q: 'Type the Kyrgyz word for “book”.', a: ['китеп'], why: 'к-и-т-е-п.' },
        { t: 'mc', q: 'What does [[ай]] mean?', o: ['moon, month', 'house', 'one', 'feast'], why: '[[ай]] — rhymes with “eye”.' }
      ]
    },
    {
      id: 'letters-new-2', title: 'New shapes, part 2', kg: 'Ж Ч Ш Э Ю Я Ё Ф', minutes: 25,
      goals: ['Read Ж, Ч, Ш, Э, Ю, Я, Ё, Ф', 'Know when to write Э and when Е'],
      blocks: [
        { t: 'h', text: 'Eight more' },
        { t: 'letters', items: ['Ж', 'Ч', 'Ш', 'Э', 'Ю', 'Я', 'Ё', 'Ф'] },
        { t: 'table', cols: ['Letter', 'Sound', 'Memory trick'], rows: [['[[Ж ж]]', 'j (jam)', 'A beetle — <b>j</b>umping bug'], ['[[Ч ч]]', 'ch', 'A <b>ch</b>air turned upside down: Ч'], ['[[Ш ш]]', 'sh', 'Three fingers on your lips: <b>sh</b>h!'], ['[[Э э]]', 'e (egg)', 'A backwards C with a tongue: “eh?”'], ['[[Ю ю]]', 'yu (you)', 'A ring with a stick: <b>you</b> and your ring'], ['[[Я я]]', 'ya (yard)', 'A backwards R saying “ya!”'], ['[[Ё ё]]', 'yo (yoga)', 'Е with two eyes: “yo!”'], ['[[Ф ф]]', 'f', 'A <b>f</b>ace with round cheeks — borrowed words only']] },
        { t: 'warn', title: 'Ж is “j”, not “zh”', html: 'In Russian, Ж is a buzzy “zh” (like <i>measure</i>). In Kyrgyz it is usually “j” as in <i>jam</i>: [[жол]] = “jol” (road), [[жок]] = “jok” (no). If you hear people from the south say it softer, that’s just accent.' },
        { t: 'h', text: 'Э or Е?' },
        { t: 'eli5', html: 'Both make the “e” sound. [[Э]] is the doorman: it stands at the <b>start</b> of a word ([[эне]], [[эки]], [[эт]]). [[Е]] works <b>inside</b> words ([[мен]], [[кеме]]). Simple rule for native Kyrgyz words: start = Э, everywhere else = Е.' },
        { t: 'h', text: 'Read these' },
        { t: 'ex', items: [['жол', 'road, way'], ['жок', 'no; there isn’t'], ['жаз', 'spring (season); write!'], ['чай', 'tea'], ['шаар', 'city'], ['эне', 'mother'], ['эки', 'two'], ['эт', 'meat'], ['иш', 'work, job'], ['кеч', 'evening; late'], ['аял', 'woman, wife'], ['аюу', 'bear'], ['коён', 'rabbit'], ['фото', 'photo']] },
        { t: 'ex', title: 'Places', items: [['Жалал-Абад', 'Jalal-Abad — a southern city'], ['Чолпон-Ата', 'Cholpon-Ata — a resort on Issyk-Kul'], ['Чүй', 'Chüy — the province around Bishkek']] }
      ],
      quiz: [
        { t: 'mc', q: 'How is [[жол]] pronounced in Kyrgyz?', o: ['jol', 'zhol', 'yol', 'shol'], why: 'Kyrgyz Ж ≈ English j in jam.' },
        { t: 'mc', q: 'What sound does [[Ш]] make?', o: ['sh', 'ch', 'shch', 'w'], why: 'Ш = sh, three fingers saying shh.' },
        { t: 'mc', q: 'What sound does [[Ч]] make?', o: ['ch', 'sh', 'h', 'ts'], why: 'Ч = ch as in chair.' },
        { t: 'mc', q: 'Which word means “tea”?', o: ['[[чай]]', '[[шаар]]', '[[жок]]', '[[эт]]'], why: '[[чай]] — the drink of every Kyrgyz home.' },
        { t: 'mc', q: 'Which letter starts native Kyrgyz words with the “e” sound?', o: ['Э', 'Е', 'Ё', 'Я'], why: 'Э at the start: [[эне]], [[эки]], [[эт]].' },
        { t: 'mc', q: 'What does [[жок]] mean?', o: ['no / there isn’t', 'road', 'yes', 'spring'], why: '[[жок]] is one of the most useful words in the language.' },
        { t: 'type', q: 'Type the Kyrgyz word for “two”.', a: ['эки'], why: 'э + к + и.' },
        { t: 'type', q: 'Type the Kyrgyz word for “city”.', a: ['шаар'], why: 'ш + аа + р — a long аа.' },
        { t: 'mc', q: 'How do you read [[аял]]?', o: ['a-yal (woman)', 'a-ral', 'a-jal', 'a-sal'], why: 'Я = ya.' }
      ]
    },
    {
      id: 'superstars', title: 'The Kyrgyz superstars', kg: 'Ң Ө Ү Ы', minutes: 30,
      goals: ['Pronounce Ң, Ө, Ү, Ы', 'Hear the difference in кол / көл / күл'],
      blocks: [
        { t: 'h', text: 'Four sounds that make Kyrgyz sound like Kyrgyz' },
        { t: 'eli5', html: 'English has 5 vowel letters. Kyrgyz has 8 vowel sounds — it has three extra “in-between” vowels, and they change meanings. [[кол]] is a hand, [[көл]] is a lake, [[күл]] is ash. Get these right and people understand you instantly.' },
        { t: 'letters', items: ['Ң', 'Ө', 'Ү', 'Ы'] },
        { t: 'h', text: 'Your mouth is a machine' },
        { t: 'p', html: 'Every vowel is made with two settings: <b>tongue</b> forward or back, and <b>lips</b> round or flat. Try it:' },
        { t: 'table', cols: ['', 'Lips flat', 'Lips round'], rows: [['Tongue forward', '[[и]] ee, [[е]] e', '[[ү]] ü, [[ө]] ö'], ['Tongue back', '[[ы]] ı, [[а]] a', '[[у]] u, [[о]] o']], caption: 'The superstars fill the empty corners English doesn’t use.' },
        { t: 'list', items: ['<b>[[Ү]] (ü)</b>: say “ee” and hold it. Now, without moving your tongue, round your lips into a tiny whistle. That’s ү. (German <i>über</i>, French <i>tu</i>.)', '<b>[[Ө]] (ö)</b>: say “e” as in <i>bed</i>. Hold it, and round your lips. That’s ө. (German <i>schön</i>, British “ur” in <i>fur</i> with round lips.)', '<b>[[Ы]] (ı)</b>: say “oo”. Hold it, and now smile — spread your lips flat without moving your tongue. That’s ы. It’s close to the “i” in <i>cousin</i> or the “e” in <i>roses</i>.', '<b>[[Ң]] (ng)</b>: the sound at the end of <i>sing</i>. One sound — no “g” after it. It never starts a word.'] },
        { t: 'h', text: 'Listen to the differences' },
        { t: 'ex', items: [['кол', 'hand, arm'], ['көл', 'lake'], ['күл', 'ash; laugh!'], ['уч', 'tip, end; fly!'], ['үч', 'three'], ['бут', 'leg, foot'], ['бүт', 'finish! / whole'], ['кыз', 'girl, daughter'], ['кез', 'moment, time']] },
        { t: 'h', text: 'Read these' },
        { t: 'ex', items: [['Кыргызстан', 'Kyrgyzstan'], ['жакшы', 'good, well'], ['ысык', 'hot'], ['күн', 'sun; day'], ['түн', 'night'], ['бүгүн', 'today'], ['үй', 'house, home'], ['сүт', 'milk'], ['төө', 'camel'], ['өлкө', 'country'], ['миң', 'thousand'], ['жаңы', 'new'], ['Ысык-Көл', 'Issyk-Kul — “hot lake”, which never freezes']] },
        { t: 'tip', title: 'Good news about Ө and Ү', html: 'They come in families. A word with ө or ү usually keeps the front, round sounds all the way through: [[бүгүн]], [[өлкө]], [[төрт]]. Your mouth stays in one shape. That’s vowel harmony, coming in lesson 1.7.' }
      ],
      quiz: [
        { t: 'mc', q: 'How do you make [[ү]]?', o: ['Say “ee”, then round your lips', 'Say “oo”, then smile', 'Say “e”, then round your lips', 'Say “u” as in cup'], why: 'ү = ee + round lips.' },
        { t: 'mc', q: 'How do you make [[ы]]?', o: ['Say “oo”, then spread your lips flat', 'Say “ee”, then round your lips', 'Like English “y”', 'It’s silent'], why: 'ы = tongue back, lips flat.' },
        { t: 'mc', q: 'What does [[көл]] mean?', o: ['lake', 'hand', 'ash', 'girl'], why: '[[кол]] = hand, [[көл]] = lake, [[күл]] = ash/laugh.' },
        { t: 'mc', q: 'What does [[үч]] mean?', o: ['three', 'tip / end', 'house', 'sun'], why: '[[үч]] = 3. [[уч]] = tip or “fly!”.' },
        { t: 'mc', q: 'How is [[ң]] pronounced?', o: ['ng as in sing, no hard g', 'n then g', 'just n', 'like ny'], why: 'One sound: [[миң]] = “ming” without the g.' },
        { t: 'mc', q: 'What does [[күн]] mean?', o: ['sun; day', 'night', 'milk', 'today'], why: '[[күн]] = sun and day. [[түн]] = night.' },
        { t: 'type', q: 'Type the Kyrgyz word for “house”.', a: ['үй'], why: 'ү + й.' },
        { t: 'type', q: 'Type the Kyrgyz word for “three”.', a: ['үч'], why: 'ү + ч.' },
        { t: 'type', q: 'Type the Kyrgyz word for “girl”.', a: ['кыз'], why: 'к + ы + з.' },
        { t: 'mc', q: 'What does [[жаңы]] mean?', o: ['new', 'good', 'hot', 'thousand'], why: 'ja-ngı. [[Жаңы жыл]] = New Year.' }
      ]
    },
    {
      id: 'long-vowels-loans', title: 'Long vowels, silent signs, and stress', kg: 'Созулма үндүүлөр', minutes: 25,
      goals: ['Hold long vowels', 'Recognise Ц, Щ, Ъ, Ь', 'Put the stress in the right place'],
      blocks: [
        { t: 'h', text: 'Double letters = hold it' },
        { t: 'eli5', html: 'When a vowel is written twice, don’t say it twice — just hold it longer, like singing one note. [[саат]] is “saaaat”, not “sa-at”. Short or long can change the meaning completely.' },
        { t: 'ex', items: [['сат', 'sell!'], ['саат', 'hour; clock, watch'], ['тоо', 'mountain'], ['суу', 'water'], ['төө', 'camel'], ['күү', 'melody (a kuu, played on the komuz)'], ['кечээ', 'yesterday'], ['ооба', 'yes'], ['шаар', 'city'], ['жоо', 'enemy']] },
        { t: 'h', text: 'The last four letters' },
        { t: 'letters', items: ['Ц', 'Щ', 'Ъ', 'Ь'] },
        { t: 'p', html: 'These appear almost only in words borrowed from Russian. [[Ъ]] and [[Ь]] make no sound of their own. Just recognise them and keep reading: [[цирк]] (circus), [[фильм]] (film), [[компьютер]] (computer), [[объект]] (object).' },
        { t: 'h', text: 'Stress: the end gets the beat' },
        { t: 'p', html: 'Kyrgyz stresses the <b>last syllable</b>. When you add an ending, the stress usually jumps onto the new last syllable:' },
        { t: 'ex', items: [['ки|ТЕП', 'book'], ['китеп|ТЕР', 'books'], ['китеп|тер|ИМ', 'my books'], ['китеп|тер|им|ДЕ', 'in my books']] },
        { t: 'tip', title: 'A few endings don’t take the beat', html: 'The “not” ending [[-ба]], the question ending [[-бы]] and the “am/are” endings push the stress back: [[ба|РА|м]] (I go) but [[БАР|ба|й|м]] (I don’t go). You’ll pick this up by ear.' },
        { t: 'h', text: 'Fun facts that help you read' },
        { t: 'list', items: ['Native Kyrgyz words don’t start with [[р]] or [[л]]. If you see one, it’s borrowed: [[радио]], [[лимон]].', 'Native words don’t start with [[ң]], [[ы]] is rare at the start, and [[ж]] is very common: [[жол]], [[жаз]], [[жакшы]], [[жок]], [[жаңы]].', 'Hyphens join names: [[Ысык-Көл]], [[Жалал-Абад]], [[Ала-Тоо]].'] }
      ],
      quiz: [
        { t: 'mc', q: 'How do you say [[саат]]?', o: ['One long “aa” — saaat', 'Two separate syllables: sa-at', 'Like “sat”', 'Like “sate”'], why: 'Double = long.' },
        { t: 'mc', q: 'What does [[саат]] mean?', o: ['hour, clock', 'sell!', 'city', 'yes'], why: '[[сат]] = sell!, [[саат]] = hour/clock.' },
        { t: 'mc', q: 'What does [[ь]] sound like?', o: ['Nothing — it’s silent', 'b', 'y', 'ı'], why: 'The soft sign is silent; it only appears in Russian loanwords.' },
        { t: 'mc', q: 'Which syllable is stressed in [[китептерим]]?', o: ['The last: -РИМ', 'The first: КИ-', 'The second: -ТЕП-', 'None'], why: 'Stress follows the last syllable as endings are added.' },
        { t: 'mc', q: 'Which word is borrowed from Russian?', o: ['[[радио]]', '[[жол]]', '[[тоо]]', '[[суу]]'], why: 'Native Kyrgyz words don’t start with р.' },
        { t: 'type', q: 'Type the Kyrgyz word for “yes”.', a: ['ооба'], why: 'Long оо, then ба.' },
        { t: 'type', q: 'Type the Kyrgyz word for “mountain”.', a: ['тоо'], why: 'т + long оо. [[Ала-Тоо]] is the great mountain range.' },
        { t: 'mc', q: 'What does [[кечээ]] mean?', o: ['yesterday', 'evening', 'tomorrow', 'today'], why: 'ke-CHEE, with a long ээ.' }
      ]
    },
    {
      id: 'vowel-harmony', title: 'Vowel harmony: the master rule', kg: 'Үндүүлөрдүн үндөшүүсү', minutes: 35,
      goals: ['Sort the 8 vowels into families', 'Pick the right vowel for any ending', 'Use the harmony machine'],
      blocks: [
        { t: 'h', text: 'Why endings change' },
        { t: 'eli5', html: 'Imagine a family going to a party. They all wear matching outfits. If a new baby joins the family, the baby gets the same outfit. In Kyrgyz, the word is the family and the ending is the baby: <b>the ending copies the outfit of the last vowel in the word</b>.' },
        { t: 'p', html: 'That’s why the plural ending looks different on every word:' },
        { t: 'ex', items: [['ат|тар', 'horses'], ['кол|дор', 'hands'], ['китеп|тер', 'books'], ['үй|лөр', 'houses']] },
        { t: 'p', html: 'It’s one ending. The vowel changes to match ([[а / о / е / ө]]), and the first letter changes to match the sound before it ([[т / д / л]]). In this lesson we do the vowels. The consonants come with the plural in lesson 2.6.' },
        { t: 'h', text: 'The vowel families' },
        { t: 'p', html: 'Remember the mouth machine from lesson 1.5? Back vowels are made in the back of the mouth, front vowels in the front. Round vowels round the lips.' },
        { t: 'table', cols: ['', 'Flat lips', 'Round lips'], rows: [['Back of the mouth', '[[а]] [[ы]]', '[[о]] [[у]]'], ['Front of the mouth', '[[е]] [[и]]', '[[ө]] [[ү]]']] },
        { t: 'p', html: 'Native Kyrgyz words stay on one side: all back ([[кыргыз]], [[тоо]], [[бала]]) or all front ([[мектеп]], [[бүгүн]], [[эне]]). Endings simply join the same side.' },
        { t: 'h', text: 'Two kinds of ending vowel' },
        { t: 'p', html: 'Every ending uses one of two “blank” vowels. In grammar tables you’ll see them as <b>A</b> (wide) and <b>I</b> (narrow). Look at the last vowel of the word and fill in the blank:' },
        { t: 'table', cols: ['Last vowel in the word', 'Wide blank A becomes', 'Narrow blank I becomes'], rows: [['[[а]] or [[ы]]', '[[а]]', '[[ы]]'], ['[[у]]', '[[а]]', '[[у]]'], ['[[о]]', '[[о]]', '[[у]]'], ['[[е]] or [[и]]', '[[е]]', '[[и]]'], ['[[ө]] or [[ү]]', '[[ө]]', '[[ү]]']], caption: 'Memorise this table. It runs every ending in the language.' },
        { t: 'warn', title: 'The one surprise', html: 'After [[у]], the wide vowel is [[а]], not [[о]]: [[уул|дар]] (sons), [[бут|тар]] (feet), [[суу|лар]] (waters). After [[о]] it’s [[о]]: [[тоо|лор]] (mountains). Everything else is perfectly logical.' },
        { t: 'h', text: 'Try it yourself' },
        { t: 'p', html: 'Type any word into the machine. It finds the last vowel and shows you six endings already “dressed” correctly. Try [[кыз]], [[тоо]], [[көз]], [[мугалим]].' },
        { t: 'widget', name: 'harmony' },
        { t: 'tip', title: 'Borrowed words', html: 'Loanwords can mix front and back vowels — [[мугалим]] (teacher), [[компьютер]]. No problem: the ending still looks only at the <b>last</b> vowel. [[мугалим|дер]] (teachers), [[компьютер|лер]] (computers).' }
      ],
      quiz: [
        { t: 'mc', q: 'Which vowel decides how an ending looks?', o: ['The last vowel in the word', 'The first vowel', 'The loudest vowel', 'The vowel in the ending itself'], why: 'Endings copy the last vowel’s family.' },
        { t: 'mc', q: 'Which vowels are “front and round”?', o: ['[[ө]] and [[ү]]', '[[о]] and [[у]]', '[[е]] and [[и]]', '[[а]] and [[ы]]'], why: 'Front + round = ө, ү.' },
        { t: 'mc', q: 'The word ends with the vowel [[о]] ([[тоо]]). The wide blank A becomes…', o: ['[[о]]', '[[а]]', '[[е]]', '[[ө]]'], why: 'о → о: [[тоо|лор]].' },
        { t: 'mc', q: 'The last vowel is [[у]] ([[уул]]). The wide blank A becomes…', o: ['[[а]]', '[[о]]', '[[у]]', '[[е]]'], why: 'The surprise rule: у → а. [[уулдар]].' },
        { t: 'mc', q: 'The last vowel is [[ү]] ([[үй]]). The narrow blank I becomes…', o: ['[[ү]]', '[[и]]', '[[ы]]', '[[у]]'], why: 'ө/ү → ү. [[үй|үм]] = my house.' },
        { t: 'mc', q: 'Which plural is correct for [[көл]] (lake)?', o: ['[[көлдөр]]', '[[көлдар]]', '[[көлдер]]', '[[көлдор]]'], why: 'Last vowel ө → wide vowel ө.' },
        { t: 'mc', q: 'Which plural is correct for [[ат]] (horse)?', o: ['[[аттар]]', '[[аттер]]', '[[аттор]]', '[[аттөр]]'], why: 'Last vowel а → а.' },
        { t: 'mc', q: '“My” is [[-Iм]] (narrow blank). What is “my hand” from [[кол]]?', o: ['[[колум]]', '[[колым]]', '[[колим]]', '[[колүм]]'], why: 'о → narrow у: [[колум]].' },
        { t: 'mc', q: 'Which group of vowels is “back”?', o: ['а, ы, о, у', 'е, и, ө, ү', 'а, е, и, о', 'ы, и, у, ү'], why: 'Back: а ы о у. Front: е и ө ү.' },
        { t: 'mc', q: 'For [[мугалим]] (teacher), which vowel decides the ending?', o: ['[[и]] — the last one', '[[у]] — the first one', 'both, mixed', 'none, it’s irregular'], why: 'Only the last vowel matters: [[мугалимдер]].' }
      ]
    }
  ]
});
