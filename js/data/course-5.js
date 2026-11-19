/* Stage 5 — The fluency engine (B1) */
window.COURSE.stages.push({
  n: 5, title: 'The fluency engine', kg: 'Эркин сүйлөө', level: 'B1',
  blurb: 'The grammar that turns phrases into real conversation: “the book that I read”, “if”, “he said that”, helper verbs, “when / because / until”, voices, and the many shades of the past.',
  lessons: [
    {
      id: 'participles', title: 'The “who/which” machine: -ган', kg: 'Мен окуган китеп', minutes: 40,
      goals: ['Turn a sentence into a description with -ган', 'Say “the book I read”, “the man who came”', 'Use -чу, -ып жаткан and -а турган'],
      blocks: [
        { t: 'h', text: 'Sentences that become adjectives' },
        { t: 'eli5', html: 'In English, “the book <u>that the child read</u>” puts the description <i>after</i> the book. Kyrgyz can’t do that — descriptions always come <b>before</b> the noun, like [[чоң]] in [[чоң үй]]. So Kyrgyz squeezes the whole sentence into one big adjective. The squeezing tool is [[-ган]].' },
        { t: 'p', html: 'Watch the machine work:' },
        { t: 'list', ordered: true, items: ['Start with a sentence: [[Бала китеп окуду.]] — The child read a book.', 'Choose what you want to describe: <b>the book</b>. Take it out of the sentence.', 'Change the verb to [[-ган]]: [[окуду]] → [[окуган]].', 'Put the leftover sentence in front of the noun: [[бала окуган китеп]] — “the book the child read”.'] },
        { t: 'compare', en: 'the book (that) the child read', kg: 'бала оку|ган китеп', gloss: 'child read-which book' },
        { t: 'compare', en: 'the child who read the book', kg: 'китеп оку|ган бала', gloss: 'book read-who child', note: 'Same words, different order — different meaning. The last noun is always the one being described.' },
        { t: 'p', html: '[[-ган]] follows harmony and the г/к rule: [[-ган / -ген / -гон / -гөн]], [[-кан / -кен…]] after voiceless sounds: [[кел|ген]], [[көр|гөн]], [[ич|кен]], [[тап|кан]].' },
        { t: 'h', text: 'No “who”, “which”, “that”, “where”' },
        { t: 'eli5', html: 'English needs a little signpost word — who, which, that, where, when. Kyrgyz needs none: [[-ган]] does all their jobs. One tool, many uses.' },
        { t: 'ex', items: [['кечээ кел|ген киши', 'the man who came yesterday'], ['мен оку|ган китеп', 'the book (that) I read'], ['мен туул|ган шаар', 'the city where I was born'], ['биз жолук|кан күн', 'the day (when) we met'], ['сен айт|кан сөз', 'the word you said'], ['кел|бе|ген адам', 'the person who didn’t come']] },
        { t: 'tip', title: 'Whose action? Two styles', html: 'The doer can stay plain — [[мен окуган китеп]] — or take “my” on both sides: [[менин окуган китеб|им]] (my read book-my). Both are common; the second feels more personal.' },
        { t: 'h', text: 'Other describing tools' },
        { t: 'table', cols: ['Ending', 'Time feeling', 'Example', 'Meaning'], rows: [['[[-ган]]', 'done, or in general', '[[иште|ген адам]]', 'a person who worked / works'], ['[[-ып жаткан]]', 'happening now', '[[китеп оку|п жат|кан бала]]', 'the child who is reading a book'], ['[[-чу]]', 'usually, habit', '[[мен бар|чу кафе]]', 'the café I usually go to'], ['[[-а турган]]', 'going to, future', '[[эртең кел|е турган конок]]', 'the guest who will come tomorrow'], ['[[-ар]]', 'future (set phrases)', '[[кел|ер жылы]]', 'next year (the coming year)']] },
        { t: 'h', text: 'Descriptions as nouns' },
        { t: 'p', html: 'Drop the noun and the description becomes “the one(s) who”:' },
        { t: 'ex', items: [['кел|ген|дер', 'those who came'], ['Окугандарга рахмат!', 'Thanks to everyone who read (this)!'], ['Билгениңди айт.', 'Say what you know.', 'your-knowing say'], ['Бул жерде иштегендердин баары кыргызча сүйлөйт.', 'Everyone who works here speaks Kyrgyz.']] },
        { t: 'vocab', items: [['туул-', 'be born'], ['жолук-', 'meet'], ['сөз', 'word'], ['конок', 'guest'], ['баары', 'all, everyone'], ['компания', 'company'], ['кезек', 'turn, queue']] }
      ],
      quiz: [
        { t: 'mc', q: '[[бала окуган китеп]] means…', o: ['the book the child read', 'the child who read a book', 'the child is reading a book', 'the child’s book'], why: 'The last noun is the one described.' },
        { t: 'mc', q: '“the man who came yesterday”', o: ['[[кечээ келген киши]]', '[[киши кечээ келген]]', '[[кечээ келди киши]]', '[[киши ким кечээ келди]]'], why: 'Description first, noun last. No “who”.' },
        { t: 'mc', q: '“the city where I was born”', o: ['[[мен туулган шаар]]', '[[шаар мен туулган]]', '[[мен туулдум шаар]]', '[[кайда мен туулган шаар]]'], why: '-ган does the job of “where”.' },
        { t: 'mc', q: '“the café I usually go to”', o: ['[[мен барчу кафе]]', '[[мен барган кафе]]', '[[мен бара турган кафе]]', '[[мен барам кафе]]'], why: '-чу = habit.' },
        { t: 'mc', q: '“the child who is reading”', o: ['[[окуп жаткан бала]]', '[[окуган бала]]', '[[окучу бала]]', '[[окуй турган бала]]'], why: '-ып жаткан = happening now.' },
        { t: 'mc', q: 'What does [[келгендер]] mean?', o: ['those who came', 'the coming ones (future)', 'guests', 'they came'], why: '-ган + plural = those who …' },
        { t: 'mc', q: 'Which form of -ган goes on [[ич-]] (drink)?', o: ['[[ичкен]]', '[[ичген]]', '[[ичкан]]', '[[ичгөн]]'], why: 'ч voiceless → к; и → е.' },
        { t: 'type', q: 'Type: “the book I read” (I = мен)', a: ['мен окуган китеп', 'менин окуган китебим'], why: 'I read-which book.' },
        { t: 'order', q: 'Build: “the person who didn’t come”', a: 'келбеген адам', extra: ['келген'], why: 'not-piece inside -ган.' },
        { t: 'order', q: 'Build: “the guest who will come tomorrow”', a: 'эртең келе турган конок', why: '-а турган = future.' }
      ]
    },
    {
      id: 'backwards', title: 'Reading backwards & “the fact that”', kg: 'Айтканыңыз туура', minutes: 35,
      goals: ['Read long Kyrgyz noun phrases without panic', 'Say “I know that…”, “what you said”, “I’m glad you came”'],
      blocks: [
        { t: 'h', text: 'How to read a long Kyrgyz phrase' },
        { t: 'eli5', html: 'A long Kyrgyz phrase is like a caterpillar: lots of little legs, and the head is at the <b>end</b>. Don’t try to understand each leg first. Jump to the head (the last noun), then walk back to see what the legs say about it.' },
        { t: 'compare', en: 'the book that my friend who lives in Osh gave me yesterday', kg: 'Ошто жаша|ган дос|ум кечээ мага бер|ген китеп', gloss: 'Osh-in live-who friend-my yesterday to-me give-which book', note: 'Head: [[китеп]] (book). Which book? The one [[бер|ген]] (given) [[мага]] (to me) [[кечээ]] (yesterday) by [[досум]] (my friend). Which friend? [[Ошто жашаган]] — the one living in Osh.' },
        { t: 'list', ordered: true, items: ['Find the last noun. That’s what it’s all about.', 'Find the [[-ган]] word just before it. That’s the main action describing it.', 'Everything before belongs to that action: who did it, when, where.', 'Repeat if there’s another [[-ган]] inside.'] },
        { t: 'h', text: '“That…” sentences: -ганы' },
        { t: 'eli5', html: 'English says “I know <u>that he lives in Bishkek</u>.” Kyrgyz turns “he lives in Bishkek” into a noun — “his living in Bishkek” — and then just uses it like any other noun, with any case ending.' },
        { t: 'compare', en: 'I know that he lives in Bishkek.', kg: 'Анын Бишкекте жаша|ган|ын бил|е|м.', gloss: 'his Bishkek-in living-his-(object) know-I' },
        { t: 'compare', en: 'I’m glad you came.', kg: 'Кел|ген|иңе кубаныч|та|мын.', gloss: 'coming-your-to glad-I.am' },
        { t: 'compare', en: 'What you said is right.', kg: 'Айт|кан|ыңыз туура.', gloss: 'saying-your right' },
        { t: 'p', html: 'The recipe: verb + [[-ган]] + “my/your/his” + case. It’s exactly how you’d treat [[китеп]] → [[китебиңди]].' },
        { t: 'ex', items: [['Эмне де|ген|иңди түшүн|бө|дү|м.', 'I didn’t understand what you said.'], ['Анын кел|ер-кел|бес|ин бил|бе|й|м.', 'I don’t know whether he’ll come or not.', '“his coming-not.coming” — -ар for the future'], ['Сиздин мугалим экен|иңизди бил|ген эмес|мин.', 'I didn’t know you were a teacher.'], ['Мен ага кат жаз|ган|ымды унутуп калдым.', 'I forgot that I’d written to her.'], ['Жардам бер|ген|иңиз үчүн рахмат!', 'Thank you for helping!']] },
        { t: 'tip', title: '“Thank you for…”', html: '[[-ганыңыз үчүн рахмат]] is the all-purpose “thank you for (doing)”: [[Келгениңиз үчүн рахмат]] (thanks for coming), [[Күткөнүңүз үчүн рахмат]] (thanks for waiting).' },
        { t: 'vocab', items: [['кубанычтамын', 'I’m glad', '[[кубаныч]] “joy” + [[-та]] “in” — “I am in joy”'], ['туура', 'right, correct'], ['унут-', 'forget'], ['экен', 'turns out to be'], ['ишен-', 'believe, trust (in = dative)'], ['эсте-', 'remember', 'also [[эсимде]] — “in my memory”']] }
      ],
      quiz: [
        { t: 'mc', q: 'When reading a long Kyrgyz noun phrase, where is the “head”?', o: ['At the end', 'At the start', 'In the middle', 'After the verb'], why: 'The last noun is what it’s all about.' },
        { t: 'mc', q: '[[Келгениңе кубанычтамын]] means…', o: ['I’m glad you came.', 'I’m glad I came.', 'I’m happy to come.', 'You came happily.'], why: 'your-coming-to glad-I-am.' },
        { t: 'mc', q: '“What you said is right.” (polite)', o: ['[[Айтканыңыз туура.]]', '[[Сиз айттыңыз туура.]]', '[[Эмне айттыңыз туура.]]', '[[Айткан туура сиз.]]'], why: 'your-saying right.' },
        { t: 'mc', q: '“I know that he lives in Bishkek.”', o: ['[[Анын Бишкекте жашаганын билем.]]', '[[Мен билем ал Бишкекте жашайт.]]', '[[Билем ал Бишкекте жашаган.]]', '[[Анын Бишкекте жашады билем.]]'], why: 'His living-in-Bishkek (object) I know.' },
        { t: 'mc', q: '“Thanks for helping.” (polite)', o: ['[[Жардам бергениңиз үчүн рахмат.]]', '[[Жардам бердиңиз үчүн рахмат.]]', '[[Рахмат жардам бериңиз.]]', '[[Жардамга рахмат бердиңиз.]]'], why: '-ганыңыз үчүн = for your doing.' },
        { t: 'mc', q: 'In [[Ошто жашаган досум берген китеп]], who gave the book?', o: ['my friend who lives in Osh', 'I did', 'someone in Osh', 'the book gave it'], why: 'досум is the doer of берген.' },
        { t: 'type', q: 'Type: “I didn’t understand what you said.” (friendly)', a: ['Эмне дегениңди түшүнбөдүм'], why: 'what your-saying (object) understand-not-did-I.' },
        { t: 'order', q: 'Build: “Thanks for coming.” (polite)', a: 'Келгениңиз үчүн рахмат', why: 'your-coming for thanks.' }
      ]
    },
    {
      id: 'if', title: 'If: -са, wishes and “even if”', kg: 'Убактың болсо, кел', minutes: 35,
      goals: ['Make real and unreal “if” sentences', 'Make wishes with -са экен', 'Say “even if”, “may”, “probably”'],
      blocks: [
        { t: 'h', text: 'The “if” piece' },
        { t: 'eli5', html: '[[-са]] is a little door: “if this happens…”. You open the door in the first half of the sentence, and the second half shows what’s behind it. You can say [[эгер]] (if) at the start too, but the [[-са]] is what really matters.' },
        { t: 'compare', en: 'If it rains, we’ll stay home.', kg: '(Эгер) жамгыр жаа|са, үйдө кал|а|быз.', gloss: '(if) rain fall-if, home-at stay-we' },
        { t: 'p', html: '[[-са]] (harmony: [[-са / -се / -со / -сө]]) + the short endings from the past tense:' },
        { t: 'table', cols: ['', 'бар- (go)', 'кел- (come)', 'көр- (see)', 'бол- (be)'], rows: [['мен', '[[бар|са|м]]', '[[кел|се|м]]', '[[көр|сө|м]]', '[[бол|со|м]]'], ['сен', '[[бар|са|ң]]', '[[кел|се|ң]]', '[[көр|сө|ң]]', '[[бол|со|ң]]'], ['сиз', '[[бар|са|ңыз]]', '[[кел|се|ңиз]]', '[[көр|сө|ңүз]]', '[[бол|со|ңуз]]'], ['ал', '[[бар|са]]', '[[кел|се]]', '[[көр|сө]]', '[[бол|со]]'], ['биз', '[[бар|са|к]]', '[[кел|се|к]]', '[[көр|сө|к]]', '[[бол|со|к]]'], ['силер', '[[бар|са|ңар]]', '[[кел|се|ңер]]', '[[көр|сө|ңөр]]', '[[бол|со|ңор]]']] },
        { t: 'h', text: '“If it is…”: [[болсо]]' },
        { t: 'p', html: 'For nouns and adjectives, use [[бол-]] (be, become):' },
        { t: 'ex', items: [['Убакт|ың бол|со, кел.', 'If you have time, come.'], ['Сиз даяр бол|со|ңуз, баштайлы.', 'If you’re ready, let’s start.'], ['Кымбат бол|бо|со, сатып ал|а|м.', 'If it isn’t expensive, I’ll buy it.']] },
        { t: 'h', text: 'Unreal “if”: would' },
        { t: 'compare', en: 'If I had money, I would buy a house.', kg: 'Акча|м бол|со, үй сатып ал|мак|мын.', gloss: 'money-my be-if, house buy-would-I', note: '[[-мак]] + ending = “would”. Context tells you if it’s about now or the past.' },
        { t: 'h', text: 'Five more jobs for -са' },
        { t: 'table', cols: ['Pattern', 'Meaning', 'Example'], rows: [['-са экен', 'I wish, I hope', '[[Эртең күн ачык бол|со экен.]] — I hope tomorrow is sunny.'], ['-са да', 'even if, although', '[[Кымбат бол|со да, сатып ал|а|м.]] — Even if it’s expensive, I’ll buy it.'], ['-са болот', 'may, can (permission)', '[[Бул жерде отур|са|ңыз болот.]] — You may sit here.'], ['-са болобу?', 'may I?', '[[Терезени ач|са|м болобу?]] — May I open the window?'], ['-са керек', 'probably, must be', '[[Ал үйдө бол|со керек.]] — She must be at home.'], ['эмне кыл|са|м …?', 'what should I …?', '[[Эмне кыл|са|м болот?]] — What should I do?']] },
        { t: 'tip', title: 'Question word + -са + да = “-ever”', html: '[[ким бол|со да]] — whoever it is; [[кайда бар|са|ң да]] — wherever you go; [[эмне бол|со да]] — whatever happens. A beautiful little pattern.' },
        { t: 'vocab', items: [['эгер', 'if'], ['бол-', 'be, become, happen'], ['кал-', 'stay, remain'], ['башта-', 'begin, start'], ['ачык', 'open; clear (weather)'], ['күн ачык', 'it’s sunny'], ['-мак', 'would (with ending)']] }
      ],
      quiz: [
        { t: 'mc', q: '“if I go”', o: ['[[барсам]]', '[[барсым]]', '[[барамса]]', '[[бардымса]]'], why: 'бар + са + м.' },
        { t: 'mc', q: '“if you (polite) see”', o: ['[[көрсөңүз]]', '[[көрсаңыз]]', '[[көрсеңиз]]', '[[көрөсүзсө]]'], why: 'Harmony: ө → ө, then ү.' },
        { t: 'mc', q: '“If you have time, come.” (friendly)', o: ['[[Убактың болсо, кел.]]', '[[Убактың барса, кел.]]', '[[Убакыт болсоң, кел.]]', '[[Убактың бар, келсе.]]'], why: 'your-time be-if, come.' },
        { t: 'mc', q: '[[Эртең күн ачык болсо экен]] means…', o: ['I hope tomorrow is sunny.', 'If tomorrow is sunny…', 'Tomorrow will be sunny.', 'It was sunny yesterday.'], why: '-са экен = a wish.' },
        { t: 'mc', q: '“Even if it’s expensive, I’ll buy it.”', o: ['[[Кымбат болсо да, сатып алам.]]', '[[Кымбат болсо, сатып алам.]]', '[[Кымбат болсо экен, сатып алам.]]', '[[Кымбат да, сатып алам болсо.]]'], why: '-са да = even if.' },
        { t: 'mc', q: '“If I had money, I would buy a house.”', o: ['[[Акчам болсо, үй сатып алмакмын.]]', '[[Акчам болсо, үй сатып алдым.]]', '[[Акчам бар, үй сатып алам.]]', '[[Акчам болсо экен, үй сатып алам.]]'], why: '-мак + ending = would.' },
        { t: 'mc', q: '[[Ал үйдө болсо керек]] means…', o: ['She must be at home.', 'She should be at home!', 'If she is at home…', 'She needs a home.'], why: '-са керек = probably.' },
        { t: 'type', q: 'Type: “May I open the window?” (open = ач-, window = терезе)', a: ['Терезени ачсам болобу'], why: 'window-the open-if-I is-it-OK?' },
        { t: 'order', q: 'Build: “If it rains, we’ll stay home.”', a: 'Жамгыр жааса үйдө калабыз', why: 'rain fall-if home-at stay-we.' }
      ]
    },
    {
      id: 'said-that', title: 'He said that…: деп', kg: 'Келем деди', minutes: 35,
      goals: ['Report what people say, think and ask', 'Ask “What’s this called?”', 'Use деп for purpose and дейт for hearsay'],
      blocks: [
        { t: 'h', text: 'Kyrgyz keeps the quote' },
        { t: 'eli5', html: 'In English, “He said, ‘I’ll come’” becomes “He said <i>that he would come</i>” — you change I to he, will to would. Kyrgyz doesn’t bother! It keeps the exact words and adds [[деп]], which means “saying”. Like holding up a speech bubble.' },
        { t: 'compare', en: 'He said that he would come.', kg: 'Ал кел|е|м де|ди.', gloss: 'he “I.will.come” said', note: '[[келем]] is still “I will come” — inside the bubble.' },
        { t: 'compare', en: 'She told me that she was tired.', kg: 'Ал мага чарча|ды|м деп айт|ты.', gloss: 'she to-me “I.got.tired” saying told' },
        { t: 'p', html: '[[де-]] means “say” on its own ([[деди]] — he said). [[деп]] is its [[-ып]] form — “saying” — and links the bubble to another verb: [[деп айтты]] (said), [[деп сурады]] (asked), [[деп ойлойм]] (I think), [[деп жазды]] (wrote).' },
        { t: 'h', text: 'Thinking, asking, hoping' },
        { t: 'ex', items: [['Ал туура деп ойло|й|м.', 'I think he’s right.', '“he right” thinking I think'], ['Ал «Качан келесиң?» деп сура|ды.', 'He asked, “When are you coming?”'], ['Эртең кар жаайт деп уктум.', 'I heard it will snow tomorrow.'], ['Сени келет деп күт|түм.', 'I waited, thinking you’d come.']] },
        { t: 'h', text: 'What’s it called?' },
        { t: 'vocab', items: [['Бул кыргызча эмне деп аталат?', 'What is this called in Kyrgyz?'], ['Муну кыргызча кантип айтат?', 'How do you say this in Kyrgyz?'], ['«Apple» кыргызча эмне болот?', 'What is “apple” in Kyrgyz?'], ['Кымыз деген эмне?', 'What is “kymyz”?', '[[деген]] = “so-called, named”'], ['Айгүл деген кыз', 'a girl called Aigul']] },
        { t: 'h', text: 'Purpose: “let me… saying”' },
        { t: 'eli5', html: 'To explain <i>why</i> you did something, Kyrgyz quotes your own thought: “‘Let me learn Kyrgyz,’ saying, I came.” Your intention is a little speech bubble in your head.' },
        { t: 'compare', en: 'I came to learn Kyrgyz.', kg: 'Кыргыз тилин үйрөн|өйүн деп кел|ди|м.', gloss: '“let.me.learn Kyrgyz” saying came-I' },
        { t: 'ex', items: [['Сени көр|өйүн деп кел|ди|м.', 'I came to see you.'], ['Кечикпейин деп такси менен кел|ди|м.', 'I took a taxi so I wouldn’t be late.', '“let me not be late” saying']] },
        { t: 'h', text: 'Hearsay: [[дейт]]' },
        { t: 'p', html: '[[дейт]] (he/she says, they say) at the end of a sentence turns it into rumour or reported news:' },
        { t: 'ex', items: [['Эртең кар жаайт дейт.', 'They say it’ll snow tomorrow.'], ['Ал үйлөнүптүр дейт.', 'Apparently he got married, they say.'], ['Эмне дейт?', 'What does he say? / What did he say?']] },
        { t: 'tip', title: 'In writing, the formal way', html: 'Formal texts also use [[-ганын]] + [[айтты]]: [[Ал келерин айтты]] — “He said that he would come.” You’ll meet this in the news (lesson 6.5). In speech, [[деп]] wins.' },
        { t: 'vocab', items: [['де-', 'say'], ['деп', 'saying (quote marker)'], ['ойло-', 'think'], ['сура-', 'ask'], ['атал-', 'be called'], ['деген', 'called, so-called; said'], ['кечик-', 'be late'], ['дейт', 'they say, apparently']] }
      ],
      quiz: [
        { t: 'mc', q: '[[Ал келем деди]] means…', o: ['He said that he would come.', 'He said that I would come.', 'I said that he would come.', 'He came and spoke.'], why: 'The quote stays in the original “I”.' },
        { t: 'mc', q: '“I think he’s right.”', o: ['[[Ал туура деп ойлойм.]]', '[[Ойлойм ал туура.]]', '[[Ал туура ойлойм деп.]]', '[[Мен ойлойм ал туурабы.]]'], why: '“he right” saying I think.' },
        { t: 'mc', q: 'How do you ask what something is called in Kyrgyz?', o: ['[[Бул кыргызча эмне деп аталат?]]', '[[Бул кыргызча кимби?]]', '[[Бул кыргызча кайда?]]', '[[Кыргызча эмне болду?]]'], why: '“what saying is it called?”' },
        { t: 'mc', q: '“I came to see you.” (friendly)', o: ['[[Сени көрөйүн деп келдим.]]', '[[Сени көрүп келдим.]]', '[[Сени көргөн келдим.]]', '[[Сени көрсөм келдим.]]'], why: '“let me see you” saying I came.' },
        { t: 'mc', q: '[[Эртең кар жаайт дейт]] means…', o: ['They say it’ll snow tomorrow.', 'I say it’ll snow tomorrow.', 'It snowed yesterday.', 'Will it snow tomorrow?'], why: 'дейт = hearsay.' },
        { t: 'mc', q: 'What does [[деген]] mean in [[Айгүл деген кыз]]?', o: ['called, named', 'said to', 'thinks', 'wants'], why: 'a girl called Aigul.' },
        { t: 'type', q: 'Type: “She asked, ‘When are you coming?’” (use деп сурады, friendly you)', a: ['Ал качан келесиң деп сурады', 'Качан келесиң деп сурады'], why: 'Quote + деп сурады.' },
        { t: 'order', q: 'Build: “I came to learn Kyrgyz.”', a: 'Кыргыз тилин үйрөнөйүн деп келдим', why: '“let me learn” saying came-I.' }
      ]
    },
    {
      id: 'helper-verbs', title: 'Helper verbs: the secret spice', kg: 'Окуп чыктым', minutes: 40,
      goals: ['Use the 9 most common helper verbs', 'Feel the difference between жазды and жазып алды', 'Sound natural instead of textbook'],
      blocks: [
        { t: 'h', text: 'Verbs that add flavour' },
        { t: 'eli5', html: 'English adds little words to change a verb’s flavour: “eat” vs “eat <u>up</u>”, “write” vs “write <u>down</u>”, “fall” vs “fall <u>asleep</u>”. Kyrgyz does the same with a <b>second verb</b>: the main verb gets [[-ып]], and a helper verb comes after it. The helper loses its own meaning and becomes spice.' },
        { t: 'compare', en: 'I wrote it down (for myself).', kg: 'Жаз|ып ал|ды|м.', gloss: 'write-ing took-I', note: '[[ал-]] (take) = for my own benefit.' },
        { t: 'compare', en: 'He fell asleep.', kg: 'Укта|п кал|ды.', gloss: 'sleep-ing stayed', note: '[[кал-]] (stay) = ended up in a new state, often without meaning to.' },
        { t: 'h', text: 'The spice rack' },
        { t: 'table', cols: ['Helper', 'Own meaning', 'Flavour it adds', 'Examples'], rows: [
          ['[[ал-]]', 'take', 'for yourself', '[[жазып алдым]] — I wrote it down; [[сатып ал]] — buy; [[үйрөнүп алдым]] — I’ve learned it (got it)'],
          ['[[бер-]]', 'give', 'for someone else', '[[айтып бериңиз]] — tell (us); [[жазып берем]] — I’ll write it for you; [[окуп бер]] — read it to me'],
          ['[[кал-]]', 'stay', 'ended up, suddenly a new state', '[[уктап калды]] — fell asleep; [[унутуп калдым]] — I forgot; [[кечигип калдым]] — I ended up late; [[тоюп калдым]] — I’m full'],
          ['[[кой-]]', 'put', 'done and dusted; light, polite', '[[айтып коюңуз]] — just tell (them); [[жазып кой]] — jot it down; [[айтып коёюн]] — let me just tell you'],
          ['[[чык-]]', 'go out', 'all the way through', '[[окуп чыктым]] — I read it cover to cover'],
          ['[[кет-]]', 'leave', 'away, gone, irreversible', '[[сынып кетти]] — it broke; [[чыгып кетти]] — he went out; [[өтүп кетти]] — it passed'],
          ['[[жибер-]]', 'send', 'suddenly, in one go', '[[күлүп жиберди]] — she burst out laughing; [[жазып жибер]] — write and send it'],
          ['[[көр-]]', 'see', 'try and see', '[[жеп көрүңүз]] — try it (eat); [[кийип көрсөм болобу?]] — may I try it on?'],
          ['[[-а бер-]]', 'give (with -а)', 'go on, keep doing', '[[сүйлөй бериңиз]] — go ahead, keep talking; [[отура бериңиз]] — stay seated, don’t get up']] },
        { t: 'h', text: 'Same verb, different spice' },
        { t: 'ex', items: [['Ал кат жаз|ды.', 'He wrote a letter. (plain fact)'], ['Ал кат жаз|ып ал|ды.', 'He wrote himself a note.'], ['Ал мага кат жаз|ып бер|ди.', 'He wrote a letter for me.'], ['Ал кат жаз|ып жибер|ди.', 'He dashed off a letter (and sent it).'], ['Ал катты жаз|ып бүт|үр|дү.', 'He finished writing the letter.']] },
        { t: 'tip', title: 'Learn them as chunks', html: 'Don’t analyse every helper while speaking. Learn the top 20 combinations as single words: [[сатып ал-]], [[алып кел-]], [[унутуп кал-]], [[уктап кал-]], [[айтып бер-]], [[жеп көр-]], [[окуп чык-]]… The feeling for new ones grows with listening.' },
        { t: 'dialog', title: 'In a clothes shop', lines: [['Tom', 'Бул куртканы кийип көрсөм болобу?', 'May I try on this jacket?'], ['Сатуучу', 'Албетте, кийип көрүңүз.', 'Of course, try it on.'], ['Tom', 'Бир аз чоң экен. Кичинерээгин алып келип бересизби?', 'It’s a bit big. Could you bring me a smaller one?'], ['Сатуучу', 'Мына. Бул сизге жакшы жарашып калды!', 'Here. This one suits you nicely!']] },
        { t: 'vocab', items: [['унут-', 'forget'], ['сын-', 'break'], ['күл-', 'laugh'], ['бүтүр-', 'finish (something)'], ['кийип көр-', 'try on'], ['куртка', 'jacket'], ['жараш-', 'suit, look good on']] }
      ],
      quiz: [
        { t: 'mc', q: '[[Уктап калды]] means…', o: ['He fell asleep.', 'He stayed sleeping.', 'He wants to sleep.', 'He slept and left.'], why: 'кал- = ended up in a new state.' },
        { t: 'mc', q: 'Which helper means “for yourself”?', o: ['[[ал-]]', '[[бер-]]', '[[кет-]]', '[[чык-]]'], why: 'ал- (take) = for my own benefit.' },
        { t: 'mc', q: '“Please tell us (for us).”', o: ['[[Айтып бериңиз.]]', '[[Айтып алыңыз.]]', '[[Айтып кетиңиз.]]', '[[Айтып чыгыңыз.]]'], why: 'бер- = for someone else.' },
        { t: 'mc', q: '“I forgot.”', o: ['[[Унутуп калдым.]]', '[[Унутуп бердим.]]', '[[Унутуп көрдүм.]]', '[[Унутуп чыктым.]]'], why: 'An unintended change of state → кал-.' },
        { t: 'mc', q: '[[Окуп чыктым]] means…', o: ['I read it all the way through.', 'I read and went out.', 'I tried reading.', 'I read it for someone.'], why: 'чык- = all the way through.' },
        { t: 'mc', q: '“Try it!” (offering food, polite)', o: ['[[Жеп көрүңүз!]]', '[[Жеп алыңыз!]]', '[[Жеп кетиңиз!]]', '[[Жеп калыңыз!]]'], why: 'көр- = try and see.' },
        { t: 'mc', q: 'Your host says [[Отура бериңиз]] as you start to stand. She means…', o: ['Stay seated, don’t get up.', 'Please sit down again later.', 'Give me your seat.', 'Sit and give.'], why: '-а бер- = go on, keep doing.' },
        { t: 'type', q: 'Type: “It broke.” (сын-, use кет-)', a: ['Сынып кетти'], why: 'break-ing left.' },
        { t: 'order', q: 'Build: “May I try it on?”', a: 'Кийип көрсөм болобу', why: 'wear-ing see-if-I OK-?' }
      ]
    },
    {
      id: 'when-because', title: 'When, after, because, until', kg: 'Келгенде, кеткенден кийин', minutes: 40,
      goals: ['Join sentences with when, while, after, before, until', 'Explain reasons and purposes', 'Say “as soon as” and “although”'],
      blocks: [
        { t: 'h', text: 'No little joining words — endings again' },
        { t: 'eli5', html: 'English joins two sentences with a word in the middle: “I was sleeping <u>when</u> he came.” Kyrgyz turns the first sentence into a [[-ган]] noun and gives it a case ending — the same endings you already know! “At his coming” = when he came. “From his coming after” = after he came.' },
        { t: 'compare', en: 'When I arrived, he was sleeping.', kg: 'Мен кел|ген|де, ал укта|п жат|кан.', gloss: 'I coming-at, he sleeping lay' },
        { t: 'h', text: 'The joining toolkit' },
        { t: 'table', cols: ['Meaning', 'Build', 'Example', 'Literally'], rows: [
          ['when', 'verb-ган + да', '[[Ал кел|ген|де, тамак же|дик.]] — When he came, we ate.', 'at (his) coming'],
          ['while', 'verb-ып жаткан + да', '[[Тамак жаса|п жат|кан|да, телефон шыңгыра|ды.]] — While I was cooking, the phone rang.', 'at cooking-lying'],
          ['after', 'verb-ган + дан кийин', '[[Тамак же|ген|ден кийин сейилде|й|биз.]] — After eating, we’ll go for a walk.', 'after from eating'],
          ['before', 'verb-ар + дан мурун', '[[Укта|ар|дан мурун китеп оку|й|м.]] — Before sleeping, I read.', 'before from (future) sleeping'],
          ['until', 'verb-гыча', '[[Мен кел|гиче күт.]] — Wait until I come.', 'up to coming'],
          ['because', 'verb-гандыктан', '[[Оору|ган|дыктан, кел|е ал|ба|ды|м.]] — Because I was ill, I couldn’t come.', 'from the fact of being ill'],
          ['in order to', 'verb-уу үчүн', '[[Кыргыз тилин үйрөн|үү үчүн күн сайын оку|й|м.]] — I study every day to learn Kyrgyz.', 'for learning'],
          ['(went) to do', 'verb-ганы + motion', '[[Нан ал|ганы бар|ды|м.]] — I went to buy bread.', 'went for taking bread'],
          ['as soon as', 'verb-ар/-ери менен', '[[Үйгө кел|ери менен укта|п кал|ды.]] — As soon as he got home, he fell asleep.', 'with (his) coming'],
          ['although', 'verb-ганы менен', '[[Кымбат бол|гон|у менен, сапаты жакшы.]] — Although it’s expensive, the quality is good.', 'with its being expensive']] },
        { t: 'tip', title: 'Noun versions are easy', html: 'With nouns, just use the same postpositions: [[бала кез|им|де]] (when I was a child, “at my child-time”), [[сабак|тан кийин]] (after class), [[сабак|тан мурун]] (before class), [[кеч|ке чейин]] (until evening).' },
        { t: 'h', text: 'Simple glue words still work' },
        { t: 'p', html: 'In speech you can always use separate sentences with [[анткени]] (because), [[ошондо]] (then, at that moment), [[андан кийин]] (after that), [[ошондуктан]] (so). The endings make you sound more fluent — and you’ll need them to understand books and news.' },
        { t: 'ex', items: [['Бала кез|им|де тоодо жаша|чу|буз.', 'When I was a child, we used to live in the mountains.'], ['Мен кел|гиче эч жакка бар|ба.', 'Don’t go anywhere until I come.'], ['Жамгыр жаа|ган|дыктан, үйдө кал|дык.', 'Because it rained, we stayed home.'], ['Сени көр|үү үчүн кел|ди|м.', 'I came in order to see you.']] },
        { t: 'vocab', items: [['шыңгыра-', 'ring (phone, bell)'], ['сейилде-', 'go for a walk'], ['кез', 'time, period', '[[бала кезимде]] — in my childhood'], ['оору-', 'be ill; hurt'], ['сапат', 'quality'], ['эч жакка', 'nowhere, anywhere (with negative)'], ['ошондо', 'then, at that time']] }
      ],
      quiz: [
        { t: 'mc', q: '“when he came”', o: ['[[ал келгенде]]', '[[ал келгенден]]', '[[ал келгиче]]', '[[ал келсе]]'], why: '-ган + да = at his coming.' },
        { t: 'mc', q: '“after eating”', o: ['[[тамак жегенден кийин]]', '[[тамак жегенде кийин]]', '[[тамак жегенге кийин]]', '[[тамак жеп кийин]]'], why: 'кийин takes -дан.' },
        { t: 'mc', q: '“Wait until I come.”', o: ['[[Мен келгиче күт.]]', '[[Мен келгенде күт.]]', '[[Мен келсем күт.]]', '[[Мен келгенден күт.]]'], why: '-гыча = until.' },
        { t: 'mc', q: '“Because I was ill, I couldn’t come.”', o: ['[[Ооругандыктан, келе албадым.]]', '[[Ооруганда, келе албадым.]]', '[[Ооруса, келе албадым.]]', '[[Ооруп келе албадым анткени.]]'], why: '-гандыктан = because.' },
        { t: 'mc', q: '“I went to buy bread.”', o: ['[[Нан алганы бардым.]]', '[[Нан алгандан бардым.]]', '[[Нан алганда бардым.]]', '[[Нан алгыча бардым.]]'], why: '-ганы + motion verb = went to do.' },
        { t: 'mc', q: '“before sleeping”', o: ['[[уктаардан мурун]]', '[[уктагандан кийин]]', '[[уктаганда]]', '[[уктагыча мурун]]'], why: '-ардан мурун = before.' },
        { t: 'mc', q: '[[Бала кезимде]] means…', o: ['When I was a child', 'My child’s time', 'At the children’s place', 'Before the child'], why: 'at my child-time.' },
        { t: 'type', q: 'Type: “in order to learn” (learn = үйрөн-)', a: ['үйрөнүү үчүн'], why: 'үйрөн + үү + үчүн.' },
        { t: 'order', q: 'Build: “After class, I’ll go home.”', a: 'Сабактан кийин үйгө барам', why: 'class-from after home-to go-I.' }
      ]
    },
    {
      id: 'voices', title: 'Verb dials: make, be done, oneself, each other', kg: 'Окут, жазыл, жуун, сүйлөш', minutes: 40,
      goals: ['Make causatives: “make someone do”', 'Make passives: “be done”', 'Use reflexive and reciprocal verbs'],
      blocks: [
        { t: 'h', text: 'Four dials on every verb' },
        { t: 'eli5', html: 'Imagine each verb has dials you can turn. One dial makes <b>someone else</b> do it. One makes it <b>happen to</b> something. One makes you do it <b>to yourself</b>. One makes people do it <b>to each other</b>. Each dial is a tiny piece added right after the stem — before any tense or person endings.' },
        { t: 'h', text: '1. Make someone do: causative' },
        { t: 'table', cols: ['Verb', 'Causative', 'Meaning'], rows: [['[[оку-]] read', '[[оку|т-]]', 'teach (make read)'], ['[[иште-]] work', '[[иште|т-]]', 'operate, run (make work)'], ['[[ич-]] drink', '[[ич|ир-]]', 'make drink, give (medicine)'], ['[[жаз-]] write', '[[жаз|дыр-]]', 'have (it) written, dictate'], ['[[күл-]] laugh', '[[күл|дүр-]]', 'make laugh'], ['[[өл-]] die', '[[өл|түр-]]', 'kill'], ['[[бил-]] know', '[[бил|дир-]]', 'inform, announce'], ['[[кир-]] enter', '[[кир|гиз-]]', 'bring in, insert'], ['[[кайт-]] return', '[[кайт|ар-]]', 'give back']], caption: 'After vowels: usually [[-т]]. After consonants: usually [[-дыр / -тыр]]. Some verbs use [[-ыр]], [[-гыз]] or [[-ар]] — learn those with the verb.' },
        { t: 'ex', items: [['Ал мектепте англис тилин оку|т|а|т.', 'She teaches English at a school.'], ['Сен мени күл|дүр|дүң!', 'You made me laugh!'], ['Өкмөт жаңы мыйзамды бил|дир|ди.', 'The government announced a new law.'], ['Китепти эртең кайт|ар|ам.', 'I’ll return the book tomorrow.']] },
        { t: 'h', text: '2. Be done: passive' },
        { t: 'p', html: '[[-ыл]] after most consonants, [[-ын]] after [[л]], and [[-н]] after vowels:' },
        { t: 'ex', items: [['Бул китеп 2020-жылы жаз|ыл|ган.', 'This book was written in 2020.'], ['Үй сат|ыл|ды.', 'The house was sold.'], ['Дүкөн саат тогузда ач|ыл|а|т.', 'The shop opens at nine. (is opened)'], ['Жаңы мыйзам кабыл ал|ын|ды.', 'A new law was adopted.', 'very common in the news'], ['Бул сөз кантип айт|ыл|а|т?', 'How is this word said?']] },
        { t: 'h', text: '3. To yourself: reflexive' },
        { t: 'ex', items: [['жуу- → жуу|н-', 'wash → wash yourself'], ['кий- → кий|ин-', 'put on → get dressed'], ['көр- → көр|үн-', 'see → appear, seem'], ['Ал чарчаган көр|үн|ө|т.', 'He looks tired. (he appears tired)']] },
        { t: 'h', text: '4. Each other: reciprocal' },
        { t: 'p', html: '[[-ыш]] (after consonants) or [[-ш]] (after vowels) = with each other, together. You’ve already seen it in “they” forms like [[барышат]] — it originally meant “they go together”.' },
        { t: 'ex', items: [['сүйлө- → сүйлө|ш-', 'speak → talk with each other'], ['көр- → көр|үш-', 'see → see each other', '[[Көрүшкөнчө!]] — until we see each other'], ['тааны- → тааны|ш-', 'recognise → get acquainted', '[[Таанышып алалы]] — let’s get to know each other'], ['жардам бер- → жардам|даш-', 'help → help each other'], ['кучакта- → кучакта|ш-', 'hug → hug each other']] },
        { t: 'tip', title: 'Dials can stack', html: '[[сүйлө|ш|түр-]] = make (people) talk to each other — mediate. [[көр|сөт-]] = show (make see). Dictionaries usually list the common stacked verbs as their own words.' },
        { t: 'vocab', items: [['окут-', 'teach'], ['билдир-', 'inform, announce'], ['кайтар-', 'return, give back'], ['өкмөт', 'government'], ['мыйзам', 'law'], ['кабыл ал-', 'accept, adopt'], ['көрүн-', 'seem, appear'], ['тааныш-', 'get acquainted'], ['көрсөт-', 'show']] }
      ],
      quiz: [
        { t: 'mc', q: '[[окут-]] means…', o: ['teach', 'be read', 'read to yourself', 'read together'], why: 'Causative: make (someone) read.' },
        { t: 'mc', q: '“The house was sold.”', o: ['[[Үй сатылды.]]', '[[Үй сатты.]]', '[[Үй саттырды.]]', '[[Үй сатышты.]]'], why: 'Passive: сат + ыл.' },
        { t: 'mc', q: '[[сүйлөш-]] means…', o: ['talk with each other', 'make someone speak', 'be spoken', 'speak to yourself'], why: 'Reciprocal -ш.' },
        { t: 'mc', q: '“You made me laugh!” (friendly)', o: ['[[Сен мени күлдүрдүң!]]', '[[Сен мени күлдүң!]]', '[[Сен мага күлүштүң!]]', '[[Сен мени күлүндүң!]]'], why: 'Causative: күл + дүр.' },
        { t: 'mc', q: '[[Ал чарчаган көрүнөт]] means…', o: ['He looks tired.', 'He saw that he was tired.', 'He is showing tiredness.', 'He saw a tired man.'], why: 'көрүн- = appear, seem.' },
        { t: 'mc', q: 'Which is “be written”?', o: ['[[жазыл-]]', '[[жаздыр-]]', '[[жазыш-]]', '[[жазын-]]'], why: 'Passive -ыл.' },
        { t: 'mc', q: '[[Жаңы мыйзам кабыл алынды]] means…', o: ['A new law was adopted.', 'The new law took over.', 'They accepted a new boss.', 'Take the new law.'], why: 'ал + ын = passive.' },
        { t: 'type', q: 'Type: “Let’s get to know each other.” (тааныш- + ал- helper)', a: ['Таанышып алалы'], why: 'get.acquainted-ing take-let’s.' },
        { t: 'order', q: 'Build: “The shop opens at nine.”', a: 'Дүкөн саат тогузда ачылат', why: 'shop hour nine-at is.opened.' }
      ]
    },
    {
      id: 'more-pasts', title: 'Shades of the past: have been, used to, apparently', kg: 'Баргам, барчумун, келиптир', minutes: 40,
      goals: ['Say “I have been” and “I’ve never…”', 'Say “I used to”', 'Report things you didn’t see yourself'],
      blocks: [
        { t: 'h', text: 'Kyrgyz cares how you know' },
        { t: 'eli5', html: 'In English, “He came” is just “he came”. Kyrgyz asks: <b>did you see it, or did you find out later?</b> If you saw it: [[Ал келди]]. If you just found his shoes by the door: [[Ал келиптир]] — “it seems he came”. Kyrgyz has different pasts for different kinds of knowing.' },
        { t: 'h', text: 'The pasts at a glance' },
        { t: 'table', cols: ['Form', 'Feeling', 'Example', 'Meaning'], rows: [
          ['[[-ды]]', 'I saw it, I’m sure (lesson 4.1)', '[[Ал кел|ди.]]', 'He came.'],
          ['[[-ган]] + ending', 'it has happened; experience; result', '[[Мен Ошко бар|ган|мын.]]', 'I have been to Osh.'],
          ['[[-чу]] + ending', 'used to, habit in the past', '[[Мен тоого бар|чу|мун.]]', 'I used to go to the mountains.'],
          ['[[-ып]] + [[-тыр]]', 'apparently, it turns out', '[[Ал кел|ип|тир.]]', 'It seems he came.'],
          ['[[-ып жаткан эле]]', 'was doing', '[[Ал укта|п жат|кан эле.]]', 'He was sleeping.'],
          ['[[-мак]] + ending', 'would have, was going to', '[[Мен бар|мак|мын.]]', 'I would have gone.']] },
        { t: 'h', text: 'Have you ever…? [[-ган]]' },
        { t: 'ex', items: [['Сиз Ысык-Көлгө бар|ган|сыз|бы?', 'Have you (ever) been to Issyk-Kul?'], ['Ооба, эки жолу бар|ган|мын.', 'Yes, I’ve been twice.'], ['Мен кымыз ич|кен эмес|мин.', 'I’ve never drunk kymyz.', '-ган + эмес = have never'], ['Ал Манасты оку|ган.', 'He has read Manas.']] },
        { t: 'tip', title: 'Short spoken forms', html: 'In speech [[барганмын]] is often shortened to [[баргам]], and [[барган элем]] to [[баргам]] too. You’ll hear [[Көргөм]] (I’ve seen it) all the time.' },
        { t: 'h', text: 'Used to: [[-чу]]' },
        { t: 'ex', items: [['Бала кезимде жайында айылга бар|чу|буз.', 'When I was a child, we used to go to the village every summer.'], ['Ал мурун тамеки чек|чү.', 'He used to smoke.'], ['Сен мурун бул жерде иште|чү|сүң|бү?', 'Did you use to work here?']] },
        { t: 'h', text: 'It turns out: [[-ыптыр]] and [[экен]]' },
        { t: 'p', html: '[[-ыптыр]] (harmony: [[-ыптыр / -иптир / -уптур / -үптүр]], or [[-птыр]] after a vowel) is for things you discover, hear about, or realise afterwards. [[экен]] does the same for nouns and adjectives — and is the word for “oh, I see!” moments.' },
        { t: 'ex', items: [['Кар жаа|п|тыр!', 'It snowed! (I just looked outside)'], ['Ал үйлөн|үп|түр.', 'Apparently he got married.'], ['Бул жерде мурун мектеп бол|уп|тур.', 'There used to be a school here, it turns out.'], ['Сиз мугалим экен|сиз!', 'Oh, so you’re a teacher!'], ['Даамдуу экен!', 'It’s delicious! (I just tasted it)']] },
        { t: 'h', text: 'Was: [[эле]], [[элем]]' },
        { t: 'p', html: '[[эле]] (was) works like a past “to be”, with endings: [[элем]] (I was), [[элең]], [[элеңиз]], [[эле]], [[элек]], [[элеңер]].' },
        { t: 'ex', items: [['Мен студент элем.', 'I was a student.'], ['Кечээ үйдө элеңизби?', 'Were you at home yesterday?'], ['Мен китеп оку|п жат|кан элем.', 'I was reading a book.']] },
        { t: 'h', text: 'I had, I would' },
        { t: 'ex', items: [['Менин машина|м бар эле.', 'I had a car.', '“my car existed” — [[бар]] + [[эле]] (was); also [[бар болчу]]'], ['Убакт|ым жок эле.', 'I didn’t have time.'], ['Мен барат элем, бирок убакт|ым жок.', 'I would go, but I don’t have time.', '3rd-person verb + [[эле]] + ending = would'], ['Мен бар|мак|мын, бирок ооруп калдым.', 'I would have gone, but I fell ill.', '[[-мак]] = would (have), for plans that didn’t happen']] },
        { t: 'h', text: 'Future guesses: [[-ар]]' },
        { t: 'p', html: '[[-ар]] (harmony; [[-р]] after a vowel) is a softer, guessing future: [[Ал келер]] — he’ll probably come. Set phrase: [[Көрөрбүз]] — We’ll see.' },
        { t: 'p', html: 'Its negative is [[-бас]]: [[Ал келбес]] — he probably won’t come; [[Унутпаспын]] — I won’t forget (a promise).' },
        { t: 'vocab', items: [['жолу', 'time(s)', '[[эки жолу]] — twice'], ['айыл', 'village'], ['тамеки чек-', 'smoke'], ['үйлөн-', 'get married (of a man)'], ['мурун', 'before, formerly'], ['экен', 'it turns out'], ['эле', 'was'], ['Көрөрбүз', 'We’ll see']] }
      ],
      quiz: [
        { t: 'mc', q: '“I have been to Osh.”', o: ['[[Мен Ошко барганмын.]]', '[[Мен Ошко бардым эле.]]', '[[Мен Ошко барчумун.]]', '[[Мен Ошко барыптырмын.]]'], why: '-ган = experience.' },
        { t: 'mc', q: '“I’ve never drunk kymyz.”', o: ['[[Мен кымыз ичкен эмесмин.]]', '[[Мен кымыз ичпедим.]]', '[[Мен кымыз ичпейм.]]', '[[Мен кымыз ичкен жок.]]'], why: '-ган + эмес = have never.' },
        { t: 'mc', q: '“He used to smoke.”', o: ['[[Ал мурун тамеки чекчү.]]', '[[Ал мурун тамеки чекти.]]', '[[Ал мурун тамеки чегиптир.]]', '[[Ал мурун тамеки чегер.]]'], why: '-чу = used to.' },
        { t: 'mc', q: 'You look outside and see snow. You say…', o: ['[[Кар жааптыр!]]', '[[Кар жаады!]]', '[[Кар жаачу!]]', '[[Кар жаайт!]]'], why: 'A discovery you didn’t watch happen → -птыр.' },
        { t: 'mc', q: '[[Сиз мугалим экенсиз!]] means…', o: ['Oh, so you’re a teacher!', 'You were a teacher.', 'You will be a teacher.', 'Are you a teacher?'], why: 'экен = it turns out.' },
        { t: 'mc', q: '“I was a student.”', o: ['[[Мен студент элем.]]', '[[Мен студентмин эле.]]', '[[Мен студент болдум.]]', '[[Мен студент экем.]]'], why: 'эле + м = I was.' },
        { t: 'mc', q: '[[Көрөрбүз]] means…', o: ['We’ll see.', 'We saw.', 'Let’s see.', 'We used to see.'], why: '-ар future guess.' },
        { t: 'type', q: 'Type: “Have you (polite) been to Issyk-Kul?”', a: ['Сиз Ысык-Көлгө баргансызбы', 'Ысык-Көлгө баргансызбы'], why: 'бар + ган + сыз + бы.' },
        { t: 'order', q: 'Build: “It seems he came.”', a: 'Ал келиптир', extra: ['келди'], why: '-иптир = apparently.' }
      ]
    }
  ]
});
