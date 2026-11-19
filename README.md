# Кыргызча — Learn Kyrgyz from zero to B2

A complete Kyrgyz learning app for English speakers: a structured course like **Busuu**, a reading library like **LingQ**, accounts that sync across devices, a community that corrects your writing, and an installable phone app — deployable to Vercel in about 10 minutes.

No framework and no build step. The front end is plain HTML/CSS/JS; the back end is five small Vercel functions with **zero npm dependencies**, storing data in Upstash Redis.

---

## What's inside

**Course (Busuu-style)**
- 49 lessons in 7 stages, alphabet → B2, each with a "like you're five" explanation, English-vs-Kyrgyz boxes, colour-coded endings, vocabulary and a practice test (448 questions).
- **Placement test** that finds your starting stage.
- **Study plan**: pick a level, minutes a day and days a week → daily XP goal and a finish date.
- **Today dashboard**: goal ring, streak, next lesson, due reviews, weekly chart, plan progress.
- **Smart review** (spaced repetition with mixed exercise types: meaning, reverse, typing, listening), **Fix my mistakes**, **flashcards**, **My words** with word strength.
- **Speaking practice**: listen, record yourself, play back, optional speech-recognition check.
- **Community**: 14 writing prompts (A1–B2); other learners and native speakers correct your text, with highlighted edits; mark corrections as helpful; report button.
- **Weekly league** (opt-out) and **level tests with printable certificates** for A1, A1+, A2, B1, B2.

**Library (LingQ-style)**
- Every word in a text has a status: **new** (blue) → **learning 1–4** (yellow) → **known**.
- Tap a word: meaning, an ending analysis (e.g. *көлдөрүнүн* → **көл** "lake" + -дөрүнүн), your own note, Arabic origin, links to Wiktionary/Glosbe/Google Translate.
- Learning words flow into your review deck automatically. **Finish page** marks the remaining blue words as known.
- **Import any text** (news, lyrics, posts) into your own library. Known-word stats and milestones.

**Also**: suffix machine, alphabet trainer, cheat sheet, Arabic ↔ Kyrgyz hints and grammar logic, offline support, "Add to Home Screen".

**Guest mode**: without a server (opened as a file, offline, or in a preview) everything still works and is saved on the device. When the learner signs in, their device progress is merged into the account.

---

## Deploy to Vercel — step by step (like you're five)

You need two free accounts: **GitHub** (stores the files) and **Vercel** (runs the app). Vercel will create the database for you.

### 1. Put the files on GitHub
1. Unzip `kyrgyzcha.zip`.
2. On **github.com** click **+** → **New repository**, name it `kyrgyzcha`, click **Create repository**.
3. Click **"uploading an existing file"**, then drag in **everything inside** the `kyrgyzcha` folder (including the `api`, `css`, `js` and `icons` folders). Click **Commit changes**.
   - Check: `index.html` and the `api` folder must be at the top level of the repository.
   - Hidden files (`.gitignore`, `.vercelignore`) may not show in your file browser. That's fine.

### 2. Create the Vercel project
1. On **vercel.com** → **Sign up with GitHub** → **Add New… → Project** → pick `kyrgyzcha` → **Import**.
2. Framework preset: **Other**. Leave Build Command and Output Directory **empty**. Click **Deploy**.
3. The site goes live, but accounts aren't on yet. That's steps 3–4.

### 3. Add the database (Upstash Redis)
1. In your Vercel project open the **Storage** tab (or **Integrations → Marketplace**) and choose **Upstash → Redis** ("Upstash for Redis").
2. Create a database (the free plan is fine; pick a region close to your learners) and **connect it to the `kyrgyzcha` project**.
3. Vercel adds the settings `KV_REST_API_URL` and `KV_REST_API_TOKEN` automatically. (The app also accepts `UPSTASH_REDIS_REST_URL` / `UPSTASH_REDIS_REST_TOKEN`.)

### 4. Add the session secret
1. Project → **Settings → Environment Variables** → add:
   - **Name:** `SESSION_SECRET`
   - **Value:** a long random string, **at least 32 characters**. Mash the keyboard, or run `openssl rand -base64 48` on a Mac/Linux terminal.
2. Save.

### 5. Redeploy
Settings only apply to new deployments: **Deployments** → the latest one → **⋯** → **Redeploy**.

### 6. Try it
Open your URL (e.g. `https://kyrgyzcha.vercel.app`) → **Sign in → Create account**. Open the same URL on your phone, sign in, and your progress is there. On the phone choose **Add to Home Screen** to install it.

**If something's wrong**, the app tells you:
- "Database not connected" → step 3 wasn't connected to this project, or you didn't redeploy.
- "SESSION_SECRET is missing" → step 4, then redeploy.

**Custom domain:** Project → Settings → Domains.

---

## Run it on your computer

```bash
cd kyrgyzcha
node dev-server.js          # needs Node.js 18+; open http://localhost:3000
```
The dev server runs the same `/api` functions and stores data in `.devdb.json` (ignored by Git and Vercel). Double-clicking `index.html` also works, in guest mode.

---

## How it's built

```
kyrgyzcha/
├── index.html, favicon.svg, manifest.webmanifest, sw.js, icons/   app shell + PWA
├── css/style.css                 design system
├── js/
│   ├── kg.js                     Kyrgyz engine: harmony, suffixes, verbs, numbers, speech, answer checking
│   ├── app.js                    router, lessons, quizzes, tools, plugin API (window.APP)
│   ├── cloud.js                  accounts, sync/merge, league XP, account page, install prompt
│   ├── reader.js                 library, word statuses, dictionary + ending analyser, imports
│   ├── learn.js                  dashboard, plan, placement, review, speaking, community, certificates
│   └── data/                     course content, readers, Arabic data
├── api/                          Vercel serverless functions (Node, no dependencies)
│   ├── _lib/core.js              Redis REST client, sessions, passwords, rate limits
│   ├── auth.js                   sign up / in / out, profile, password, delete account
│   ├── state.js                  progress document (GET / PUT)
│   ├── texts.js                  imported texts
│   ├── community.js              posts, corrections, helpful, report, delete
│   └── leaderboard.js            weekly XP league
├── dev-server.js                 local server (not deployed)
└── vercel.json, package.json
```

**Sync**: progress is one JSON document per learner. The client merges device and account copies field by field (lesson scores and XP take the maximum, flashcards and word statuses take the most recent), so studying offline on two devices doesn't lose anything.

**Security**
- Passwords are hashed with scrypt.
- Sessions use signed, HttpOnly, SameSite cookies, and "sign out everywhere" invalidates old ones.
- Every write needs a custom header (CSRF protection).
- Sign-up, sign-in, posting and syncing are rate-limited.
- All user text is escaped before display.
- Posts with 3 reports are hidden.
- Deleting an account removes its data and posts.

**Known limits**
- There are no emails, so no "forgot password" link. The site owner can delete the user's `email:` key in Upstash so the person can sign up again.
- Audio uses the device's built-in voices (see "About the audio" in the app).
- Speech recognition for Kyrgyz depends on the browser.

## Editing content
Lessons are plain objects in `js/data/course-*.js`. Copy a lesson and edit it. `[[текст]]` marks Kyrgyz (tappable, with Latin help), `|` splits a word into coloured endings (`үй|лөр|үбүз|дө`), and in multiple-choice questions the **first option is the correct one** (options are shuffled on screen). After editing, bump `CACHE` in `sw.js` so installed apps fetch the new files.

Inspired by learn.kg, Busuu and LingQ. Content and code in this project are original.
