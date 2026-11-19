/* The 36 letters of the Kyrgyz alphabet.
   g: friend | trap | new | special | loan
   l: letter, s: sound, h: how to say it, w: example word, m: meaning */
window.ALPHABET = [
  { l: 'А', g: 'friend', s: 'a', h: 'like “a” in father', w: 'ата', m: 'father' },
  { l: 'Е', g: 'friend', s: 'e / ye', h: '“e” in bed; “ye” at the start of a word', w: 'жер', m: 'land, earth' },
  { l: 'К', g: 'friend', s: 'k', h: 'like “k”; deeper in the throat next to а о у ы', w: 'кол', m: 'hand' },
  { l: 'М', g: 'friend', s: 'm', h: 'like “m”', w: 'мен', m: 'I' },
  { l: 'О', g: 'friend', s: 'o', h: 'like “o” in more — always full, never “uh”', w: 'он', m: 'ten' },
  { l: 'Т', g: 'friend', s: 't', h: 'like “t”', w: 'тоо', m: 'mountain' },

  { l: 'В', g: 'trap', s: 'v', h: 'looks like B, sounds like “v”', w: 'вокзал', m: 'train station' },
  { l: 'Н', g: 'trap', s: 'n', h: 'looks like H, sounds like “n”', w: 'нан', m: 'bread' },
  { l: 'Р', g: 'trap', s: 'r', h: 'looks like P, a rolled “r” like Spanish pero', w: 'бар', m: 'there is; go!' },
  { l: 'С', g: 'trap', s: 's', h: 'looks like C, always “s” (never “k”)', w: 'суу', m: 'water' },
  { l: 'У', g: 'trap', s: 'u', h: 'looks like y, sounds like “oo” in moon', w: 'уул', m: 'son' },
  { l: 'Х', g: 'trap', s: 'kh', h: 'looks like X, a raspy “h” like Scottish loch', w: 'химия', m: 'chemistry' },

  { l: 'Б', g: 'new', s: 'b', h: 'like “b”', w: 'бала', m: 'child' },
  { l: 'Г', g: 'new', s: 'g', h: 'like “g” in go; softer, gargled next to а о у ы', w: 'гүл', m: 'flower' },
  { l: 'Д', g: 'new', s: 'd', h: 'like “d”', w: 'дос', m: 'friend' },
  { l: 'Ж', g: 'new', s: 'j', h: 'like “j” in jam (not “zh” as in Russian)', w: 'жол', m: 'road' },
  { l: 'З', g: 'new', s: 'z', h: 'like “z” — it looks like the number 3', w: 'зат', m: 'thing' },
  { l: 'И', g: 'new', s: 'i', h: 'like “ee” in see — a backwards N', w: 'ит', m: 'dog' },
  { l: 'Й', g: 'new', s: 'y', h: 'like “y” in boy — И wearing a little hat', w: 'үй', m: 'house' },
  { l: 'Л', g: 'new', s: 'l', h: 'like “l”', w: 'көл', m: 'lake' },
  { l: 'П', g: 'new', s: 'p', h: 'like “p” — it looks like a doorway', w: 'пияз', m: 'onion' },
  { l: 'Ф', g: 'new', s: 'f', h: 'like “f” (only in borrowed words)', w: 'фильм', m: 'film' },
  { l: 'Ч', g: 'new', s: 'ch', h: 'like “ch” in chair', w: 'чай', m: 'tea' },
  { l: 'Ш', g: 'new', s: 'sh', h: 'like “sh” in shop', w: 'шаар', m: 'city' },
  { l: 'Э', g: 'new', s: 'e', h: 'like “e” in egg; used at the start of words', w: 'эне', m: 'mother' },
  { l: 'Ю', g: 'new', s: 'yu', h: 'like “you”', w: 'аюу', m: 'bear' },
  { l: 'Я', g: 'new', s: 'ya', h: 'like “ya” in yard', w: 'аял', m: 'woman, wife' },
  { l: 'Ё', g: 'new', s: 'yo', h: 'like “yo” in yoga', w: 'коён', m: 'rabbit' },

  { l: 'Ң', g: 'special', s: 'ng', h: '“ng” in sing — one sound, no hard g', w: 'миң', m: 'thousand' },
  { l: 'Ө', g: 'special', s: 'ö', h: 'say “e” as in bed, then round your lips', w: 'төө', m: 'camel' },
  { l: 'Ү', g: 'special', s: 'ü', h: 'say “ee”, then round your lips like a whistle', w: 'күн', m: 'sun, day' },
  { l: 'Ы', g: 'special', s: 'ı', h: 'say “oo”, then smile — the “i” in cousin', w: 'кыз', m: 'girl, daughter' },

  { l: 'Ц', g: 'loan', s: 'ts', h: 'like “ts” in cats', w: 'цирк', m: 'circus' },
  { l: 'Щ', g: 'loan', s: 'shch', h: 'a long soft “sh”', w: 'щётка', m: 'brush' },
  { l: 'Ъ', g: 'loan', s: '—', h: 'hard sign: silent, makes a tiny pause', w: 'объект', m: 'object' },
  { l: 'Ь', g: 'loan', s: '—', h: 'soft sign: silent, softens the letter before it', w: 'фильм', m: 'film' }
];

/* Words for the alphabet reading drill — all real, all common */
window.READ_DRILL = [
  ['ата', 'father'], ['апа', 'mother'], ['бала', 'child'], ['нан', 'bread'], ['суу', 'water'], ['чай', 'tea'], ['үй', 'house'],
  ['кыз', 'girl'], ['уул', 'son'], ['тоо', 'mountain'], ['көл', 'lake'], ['жол', 'road'], ['ит', 'dog'], ['ат', 'horse'],
  ['мектеп', 'school'], ['китеп', 'book'], ['шаар', 'city'], ['дос', 'friend'], ['мугалим', 'teacher'], ['жакшы', 'good'],
  ['рахмат', 'thank you'], ['ооба', 'yes'], ['жок', 'no'], ['салам', 'hi'], ['күн', 'day, sun'], ['түн', 'night'],
  ['Бишкек', 'Bishkek'], ['Ош', 'Osh'], ['Нарын', 'Naryn'], ['Ысык-Көл', 'Issyk-Kul'], ['Кыргызстан', 'Kyrgyzstan'],
  ['боз үй', 'yurt'], ['кымыз', 'fermented mare’s milk'], ['бешбармак', 'beshbarmak (dish)'], ['манты', 'dumplings'],
  ['базар', 'bazaar'], ['такси', 'taxi'], ['дүкөн', 'shop'], ['акча', 'money'], ['сом', 'som (currency)'], ['төө', 'camel'],
  ['өлкө', 'country'], ['сүт', 'milk'], ['эт', 'meat'], ['алма', 'apple'], ['гүл', 'flower'], ['миң', 'thousand'],
  ['жаңы', 'new'], ['кечээ', 'yesterday'], ['эртең', 'tomorrow'], ['бүгүн', 'today'], ['үйрөнүү', 'learning'], ['тил', 'language']
];
