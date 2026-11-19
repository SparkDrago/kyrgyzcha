# Кыргызча — Learn Kyrgyz from zero to B2

A complete Kyrgyz learning app for English speakers: a structured course like **Busuu**, a reading library like **LingQ**, accounts that sync across devices, a community that corrects your writing, and an installable phone app — deployable to Vercel in about 10 minutes.

No framework and no build step. The front end is plain HTML/CSS/JS; the back end is five small Vercel functions with **zero npm dependencies**, storing data in **Supabase** (Postgres).

---

## What's inside

**Course (Busuu-style)**
- 49 lessons in 7 stages, alphabet → B2, each with a "like you're five" explanation, English-vs-Kyrgyz boxes, colour-coded endings, vocabulary and a practice test (448 questions).
- **Placement test** that finds your starting stage.
- **Study plan**: pick a level, minutes a day and days a week → daily XP goal and a finish date.
- **Today dashboard**: goal ring, streak, next lesson, due reviews, weekly chart, plan progress.
- **Smart review** (spaced repetition with mixed exercise types: meaning, reverse, typing, listening), **Fix my mistakes**, **flashcards**, **My words** with word strength.
- **Word drops** (Drops-style): 3, 5 or 10-minute picture sessions across 16 topics (287 words). Swipe away words you know; tap the picture, pick the word, listen, build it from letter blocks and match pairs. Learned words join Smart review.
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

You need free accounts on **GitHub** (stores the files) and **Vercel** (runs the app). Vercel creates the Supabase database for you.

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

### 3. Add the database (Supabase)
1. In your Vercel project open the **Storage** tab → **Create Database** → **Supabase** (from the Marketplace).
2. Accept, pick the free plan and a region close to your learners, and **connect it to the `kyrgyzcha` project**.
3. Vercel adds `SUPABASE_URL` and the secret key (`SUPABASE_SECRET_KEY`, or `SUPABASE_SERVICE_ROLE_KEY` on older projects) automatically.
4. Create the tables: click **Open in Supabase** → **SQL Editor** → **New query**, paste the whole file [`supabase/schema.sql`](supabase/schema.sql) and press **Run**. You should see "Success. No rows returned". (Running it again later is safe.)

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
- "The database tables are missing" → step 3.4: run `supabase/schema.sql` in the SQL Editor.
- "SESSION_SECRET is missing" → step 4, then redeploy.

**Custom domain:** Project → Settings → Domains.

---

## Run it on your computer

```bash
cd kyrgyzcha
SUPABASE_URL=https://xxxx.supabase.co SUPABASE_SECRET_KEY=sb_secret_xxx node dev-server.js   # Node 18+; open http://localhost:3000
```
The dev server runs the same `/api` functions as Vercel. Without the two Supabase settings the app still runs, in guest mode. Double-clicking `index.html` also works, in guest mode.

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
│   ├── drops.js                  word drops: picture topics, timed sessions, letter blocks, pairs
│   └── data/                     course content, readers, Arabic data, drops topics + pictures
├── api/                          Vercel serverless functions (Node, no dependencies)
│   ├── _lib/core.js              Supabase client, sessions, passwords, rate limits
│   ├── auth.js                   sign up / in / out, profile, password, delete account
│   ├── state.js                  progress document (GET / PUT)
│   ├── texts.js                  imported texts
│   ├── community.js              posts, corrections, helpful, report, delete
│   └── leaderboard.js            weekly XP league
├── supabase/schema.sql           tables + SQL functions (run once in Supabase)
├── dev-server.js                 local server (not deployed)
└── vercel.json, package.json
```

**Data**: everything lives in Supabase tables (`kg_users`, `kg_progress`, `kg_texts`, `kg_posts`, `kg_corrections`, `kg_xp`…), which you can browse in Supabase's Table Editor. The browser never talks to Supabase: only the server functions do, with the secret key. Row Level Security is on and the public keys have no access.

**Sync**: progress is one JSON document per learner. The client merges device and account copies field by field (lesson scores and XP take the maximum, flashcards and word statuses take the most recent), so studying offline on two devices doesn't lose anything.

**Security**
- Passwords are hashed with scrypt.
- Sessions use signed, HttpOnly, SameSite cookies, and "sign out everywhere" invalidates old ones.
- Every write needs a custom header (CSRF protection).
- Sign-up, sign-in, posting and syncing are rate-limited.
- All user text is escaped before display.
- Posts with 3 reports are hidden.
- Deleting an account removes all of its data (database cascades).
- Moderation: hide a post by setting `reports` to 3 in the `kg_posts` table, or delete the row.

**Known limits**
- There are no emails, so no "forgot password" link. The site owner can delete the person's row in `kg_users` (this also deletes their data) so they can sign up again.
- Audio uses the device's built-in voices (see "About the audio" in the app).
- Speech recognition for Kyrgyz depends on the browser.

## Editing content
Lessons are plain objects in `js/data/course-*.js`. Copy a lesson and edit it. `[[текст]]` marks Kyrgyz (tappable, with Latin help), `|` splits a word into coloured endings (`үй|лөр|үбүз|дө`), and in multiple-choice questions the **first option is the correct one** (options are shuffled on screen). After editing, bump `CACHE` in `sw.js` so installed apps fetch the new files.

Inspired by learn.kg, Busuu and LingQ. Content and code in this project are original.
