# Kazu (카즈) — Japanese Number Learning

A **single-file web app** for learning Japanese **numbers, counters, and date/time readings** through practice, quizzes, and review.
It uses the same mechanics as Kanade (flashcards + quizzes + contribution-grid/error-rate stats + Korean/English + dark mode + speech).

🔗 **Live:** https://clayborneyeounjunlee.github.io/kazu/

- Single file: runs entirely from one [`index.html`](index.html) (no external build or bundle)
- Data: **270 items / 24 parts** (verified by counting in the code)
  - **Numbers**: 0–10, tens (10–90), hundreds (100–900), thousands (1000–9000), 万·億
  - **Counters**: ～つ·個·人·本·枚·匹·台·冊·歳·杯·階·回·円
  - **Date & time**: ～月·日·曜日·時·分·時間
- Covers all sound changes (さんびゃく·ろっぴゃく·はっせん, etc.) and irregular readings (ついたち·はたち·とお, etc.)
- 🔊 Tap a character/row to hear its pronunciation with a `ja-JP` voice (Web Speech API)

---

## ✨ Key Features (User Perspective)

- **Flashcard practice (Practice)** — Tap a card to reveal the answer and self-grade with "I know it / I don't". Cards you missed are collected on the results screen for re-review.
- **6-choice quiz (Quiz)** — Each question shows 1 correct answer + 5 distractors (6 choices total). Enabling **hard mode** adds a per-question countdown timer (3, 5, or 7 seconds; default 5), and a timeout is automatically counted as incorrect.
- **Question direction selection** — 3 modes: `number→reading` / `reading→number` / `random`.
- **Part selection** — Freely combine the 24 parts via pill toggles to define your study scope. Your last selection is automatically saved and restored.
- **Focused review (Review)** — Automatically collects items studied 3+ times with an **error rate of 30% or higher**, sorted by error rate for re-testing.
- **Table (Charts) view** — Browse full tables by category to check readings, romaji, Korean pronunciation, and notes. Toggle reading hints on/off; tap a row to hear it spoken.
- **Statistics** — Quick stats on the home screen (today's study count, consecutive-day streak, accuracy), plus total cards, accuracy, study days, and streak on My Page, and a **GitHub contribution-grid-style heatmap**.
- **Korean / English switching**, **light / dark theme** (auto-detects system setting + manual toggle).
- **Google sign-in cloud sync** or **guest mode (this device only)** — every feature works fully as a guest too.
- Built-in button to **return to the moa hub**.

---

## 🧱 Tech Stack / Languages

| Item | Details |
|---|---|
| Languages | Pure **HTML + CSS + JavaScript** (no framework or build tools) |
| JS approach | **ES modules** (`<script type="module">`) — Firebase SDK loaded via dynamic `import()` |
| Structure | **Single `index.html`** (~1,700 lines, with markup, styles, and scripts inlined) |
| Styling | Inline `<style>` + theming based on **CSS variables (`:root` / `html[data-theme="dark"]`)** |
| Fonts | Korean body text: `Pretendard`, `Apple SD Gothic Neo`, `Malgun Gothic`, `Noto Sans KR` / Japanese (kana & kanji): `Yu Gothic UI`, `Meiryo`, `Hiragino Kaku Gothic ProN`, `Noto Sans JP` (`--kana-font`; all with system-font fallbacks, no web-font CDN) |
| Icon/favicon | Inline SVG data URI (a `数` character logo) |
| External CDN | **Firebase JS SDK `12.14.0`** — only the 3 modules `firebase-app` / `firebase-auth` / `firebase-firestore` are dynamically loaded from `https://www.gstatic.com/firebasejs/12.14.0/` |
| Speech | Built-in browser **Web Speech API** (`SpeechSynthesis`) — no extra library |
| PWA hints | `theme-color`, `apple-mobile-web-app-*`, `mobile-web-app-capable` meta tags (no manifest file) |

> **There is no build or install step whatsoever.** No `npm`, webpack, bundler, or transpiler is used — just serve `index.html` from any static server.

### Actual `<script>` / import evidence

```js
// index.html (module)
const FB_VER = "12.14.0";
const base = "https://www.gstatic.com/firebasejs/" + FB_VER + "/";
const [appM, authM, fsM] = await Promise.all([
  import(base + "firebase-app.js"),
  import(base + "firebase-auth.js"),
  import(base + "firebase-firestore.js")
]);
```

Firebase is loaded dynamically **only when needed** at app boot, so even if you are offline or the SDK fails to load, the app keeps running in guest mode.

---

## 🏗️ System Architecture

### Single file · screen-switching approach
With no router or framework, this is a **simple SPA** that shows/hides 9 pre-rendered `<section>` screens by toggling classes.

```js
const SCREENS = ["loading","auth","home","study","practice","quiz","result","charts","mypage"];
function showScreen(name){
  SCREENS.forEach(s => $("screen-" + s).classList.toggle("hidden", s !== name));
  window.scrollTo(0, 0);
}
```

| Screen | Role |
|---|---|
| `loading` | Initial loading spinner |
| `auth` | Google sign-in / start as guest |
| `home` | Greeting, quick stats, entry to Study/Charts/My Page |
| `study` | Study hub (part selection, mode, Practice/Quiz/Review tabs) |
| `practice` | Flashcard practice |
| `quiz` | 6-choice quiz (1 correct + 5 distractors) |
| `result` | Session results and retrying missed items |
| `charts` | Full tables by category |
| `mypage` | Statistics, heatmap, language/theme, sign-out |

### App boot flow (initialization IIFE at the bottom of the file)

1. An inline script in `<head>` **pre-applies the theme to prevent FOUC** using `localStorage["kazu-theme"]` (or the system dark-mode setting).
2. `restoreSetup()` → restores the last part/mode/timer settings, `applyLang(L)` → applies the language, `showScreen("loading")`.
3. Attempts `initFirebase()`:
   - **Success**: subscribes to `onAuthStateChanged`. If a signed-in user exists, `startCloud(fbUser)`; otherwise `startGuest()` if the previous mode was `guest`, or the `auth` screen.
   - **Failure/not configured**: proceeds as guest or shows the `auth` screen (sign-in button disabled).
4. `startGuest()` / `startCloud()` → enters the home screen via `enterApp()` and renders quick stats.

### State management
**Lightweight state** managed with global variables (no separate store library):

- `mode` (`"guest"` | `"cloud"`), `uid`, `userEmail`, `photoURL`
- `profile` — a single object consolidating the user's learning data (nickname, creation date, stats, activity)
- `POOLS` / `FULL_POOL` — card pools derived from the data
- `session` — the current practice/quiz session (deck, index, misses, correct count, etc.)
- `partsSel` / `studyMode` / `hardLimit` / `studyTab` — study hub settings
- `L` (language), theme (`data-theme` attribute)

### Core function map

| Function | Role |
|---|---|
| `initFirebase()` | Dynamically imports the Firebase SDK and builds the `FB` object (auth, db, doc, setDoc, etc.) |
| `buildPools()` | Builds card pools from `DATA`, assigning `cat`/`part`/`key` to each item |
| `startGuest()` / `startCloud()` | Enters guest/cloud mode and loads `profile` |
| `applyCloud()` / `profileFromSeed()` | Merges Firestore documents ↔ the local profile |
| `scheduleSave()` / `flushSave()` | Saves the local mirror immediately + (in cloud mode) writes to Firestore after a 2-second debounce |
| `record(card, isWrong)` | Records per-card exposure count (`s`), miss count (`w`), and per-day activity |
| `startSession(kind, cards, opts)` | Starts a practice/quiz session (shuffles the deck, decides question direction) |
| `renderPractice()` / `revealPractice()` / `gradePractice()` | Renders flashcards, reveals answers, self-grades |
| `renderQuiz()` / `buildOptions()` / `answerQuiz()` | Renders the quiz, builds options, grades (advances 700ms after a correct answer, 1600ms after a wrong one) |
| `startTimer()` / `clearTimer()` | Hard-mode countdown timer (updates every 50ms) |
| `showResult()` | Results screen (score, missed items list, retry) |
| `remindCards()` / `renderReview()` | Selects and renders review candidates by error rate |
| `renderCharts()` | Renders full tables by category |
| `renderMypage()` | Renders statistics and the heatmap |
| `calcStreak()` / `calcTotals()` | Computes the consecutive-day streak and total exposures/misses |
| `speak(text)` / `pickJaVoice()` | Plays `ja-JP` speech and selects a voice |
| `applyLang()` / `tr()` / `applyTheme()` | Applies i18n and the theme |

---

## 🗂️ Data

All learning data lives statically inside `index.html` as a **`const DATA` object literal** (no external `.js` files, JSON, or server).

### Category → part layout (`CATS`)

| Category | Part keys (item counts) |
|---|---|
| `num` (numbers) | `kihon`(11) · `juu`(13) · `hyaku`(9) · `sen`(9) · `man`(6) |
| `counter` (counters) | `tsu`(11) · `ko`(11) · `nin`(11) · `hon`(11) · `mai`(11) · `hiki`(11) · `dai`(11) · `satsu`(11) · `sai`(12) · `hai`(11) · `kai_floor`(11) · `kaicnt`(11) · `en`(14) |
| `datetime` (date & time) | `gatsu`(13) · `nichi`(17) · `youbi`(8) · `ji`(13) · `fun`(13) · `jikan`(11) |

- **24 parts · 270 total items** (verified by counting in the code)
- Each part is an array of items of the form `{num, kanji, kana, roma, kor, note}`.

### Item schema

| Field | Meaning | Example |
|---|---|---|
| `num` | The number/notation shown on screen | `"300"`, `"6つ"`, `"1個"`, `"いくつ"` |
| `kanji` | Kanji notation | `"三百"`, `"六つ"` |
| `kana` | Hiragana/katakana reading (basis for speech and grading) | `"さんびゃく"`, `"むっつ"` |
| `roma` | Romaji | `"sanbyaku"`, `"muttsu"` |
| `kor` | Korean pronunciation | `"산뱌쿠"`, `"뭇츠"` |
| `note` | Notes on sound changes, irregular readings, etc. | `"발음 변화 (ひゃく→びゃく)"` ("sound change") |

### Actual snippet

```js
const DATA = {
  hyaku: [
    {num:"100",kanji:"百",  kana:"ひゃく",    roma:"hyaku",    kor:"햐쿠",   note:""},
    {num:"300",kanji:"三百",kana:"さんびゃく",roma:"sanbyaku", kor:"산뱌쿠", note:"발음 변화 (ひゃく→びゃく)"},   // note: "sound change (ひゃく→びゃく)"
    {num:"600",kanji:"六百",kana:"ろっぴゃく",roma:"roppyaku", kor:"롭퍄쿠", note:"발음 변화 (촉음+ひゃく→ぴゃく)"}, // note: "sound change (sokuon+ひゃく→ぴゃく)"
    // ...
  ],
  tsu: [
    {num:"3つ",kanji:"三つ",kana:"みっつ",roma:"mittsu",kor:"밋츠",note:"발음 변화"},        // note: "sound change"
    {num:"10", kanji:"十",  kana:"とお",  roma:"too",   kor:"토오",note:"つ 없음, 특수 읽기"}, // note: "no つ, irregular reading"
    // ...
  ],
  // kihon, juu, sen, man, ko, nin, hon, mai, hiki, dai, satsu, sai, hai,
  // kai_floor, kaicnt, en, gatsu, nichi, youbi, ji, fun, jikan ...
};
```

### Derived structures (runtime)

```js
function buildPools(){
  const pools = {};
  for (const part of ALL_PARTS)
    pools[part] = (DATA[part]||[]).map(e => ({ ...e, cat:PART_CAT[part], part, key: part + ":" + e.num }));
  return pools;
}
let POOLS = buildPools();
let FULL_POOL = Object.values(POOLS).flat();
```

- Each card's **`key` (`"part:num"`, e.g. `"hyaku:300"`)** serves as the unique identifier for stored statistics.
- When building quiz options, cards sharing the same reading (`kana`) — e.g. `1階`/`1回` are both `いっかい` — are filtered so duplicates never appear among the choices.

---

## 💾 Storage / DB

The app uses **two storage paths** together. It **always saves a local mirror** regardless of sign-in status, so records are never lost even with unset security rules or while offline.

### 1) Browser `localStorage` keys

| Key | Purpose |
|---|---|
| `kazu-theme` | Theme (`"light"` / `"dark"`) |
| `kazu-lang` | Language (`"ko"` / `"en"`) |
| `kazu-mode` | Last sign-in method (`"guest"` / `"cloud"`) |
| `kazu-local` | **Local mirror of the entire learning profile** (nickname, creation date, stats, activity) as JSON |
| `kazu-setup` | Last study hub settings (selected parts, question mode, hard mode on/off, timer seconds) as JSON |

### 2) Firebase (optional · cloud sync)

- **Project:** `japanese-site-a0af9` (reuses the **same Firebase project** as Kanade)
- **Auth:** Firebase Authentication — Google sign-in. Tries a popup (`signInWithPopup`) first, falling back to a redirect (`signInWithRedirect`) on failure.
- **DB:** Cloud Firestore. **Collection `kazu`**, document ID = the user's `uid` → path **`kazu/{uid}`**. (**Fully separated** from Kanade's `users/{uid}`)
- The Firestore client is initialized with `experimentalForceLongPolling: true` + a **persistent local cache** (`persistentLocalCache` / single-tab manager) → renders from cache first, then syncs with the server.
- **The web config values (apiKey `AIza…`, etc.) are inlined in the code**, but these are **public identifiers** for a Firebase web app (not passwords); actual security is handled by the Firestore rules below.

#### Firestore document schema (`kazu/{uid}`)

```jsonc
{
  "nick": "학습자",          // display nickname; "학습자" = "learner" (Google displayName takes priority when signed in)
  "created": "2026-07-01",   // first-created date (YYYY-MM-DD)
  "stats": {                 // per-card stats, key = "part:num"
    "hyaku:300": { "s": 12, "w": 4 },   // s = times shown, w = wrong answers
    "tsu:3つ":   { "s": 8,  "w": 1 }
  },
  "activity": {              // study count per day (for heatmap/streak calculation)
    "2026-07-01": 37,
    "2026-06-30": 12
  }
}
```

#### Required security rules (adding just this one block enables sign-in + sync)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kanade (existing)
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    // Kazu (newly added)
    match /kazu/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

### Guest · offline fallback

- **Guest mode**: uses only `kazu-local` without a `uid` → data is stored only on this device and browser.
- **Even in cloud mode**, saves are mirrored to `localStorage` immediately, then written to Firestore with `setDoc(..., { merge:true })` after a 2-second debounce. Local records stay safe before the rules are applied or while offline.
- On screen hide (`visibilitychange`) or page exit (`pagehide`), `flushSave()` forces a save.

---

## 🌐 External APIs · Dependencies

| Dependency | Purpose | Key required | Where it goes |
|---|---|---|---|
| Firebase JS SDK (app/auth/firestore) `12.14.0` | Auth and cloud sync | Web config (public identifiers) | `FIREBASE_CONFIG` in `index.html` (already included) |
| Google sign-in (Firebase Auth Provider) | User authentication | — | Only the authorized domain needs registering in the Firebase Console (already approved via Kanade) |
| Web Speech API (`SpeechSynthesis`) | `ja-JP` pronunciation playback | Not needed (built into the browser) | — |

- **There are no commercial API keys (OpenAI/maps/exchange rates, etc.), servers, or backends.** The app runs entirely as a static frontend + optional Firebase.
- Speech prefers a `ja-JP` voice (falling back to any voice starting with `ja`), and if `speechSynthesis` is unavailable it is silently ignored.

---

## ▶️ Running Locally

Because it uses ES modules, double-clicking the file (`file://`) will not work. Open it via a simple static server.

```bash
# any one of these (no package.json — any plain static server will do)
npx serve .
python -m http.server 8000
```

Then open `http://localhost:8000` (or the address `serve` prints) in your browser.

> There is no `package.json`, `node_modules`, or build script, so no `npm install` step is needed.

---

## 🚀 Deployment (GitHub Pages)

The local git commit is already done. You only need to create the GitHub remote.

1. github.com → **New repository** → name it `kazu` (Public), created as an empty repo without a README/.gitignore
2. Connect the remote and push:
   ```bash
   git remote add origin https://github.com/ClayborneYeounjunLee/kazu.git
   git push -u origin main
   ```
3. Repo **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/(root)** → Save
4. After 1–2 minutes, the public URL: **https://clayborneyeounjunlee.github.io/kazu/**

> If you use GitHub Desktop: Add → Add Existing Repository to add this folder → Publish repository → then just do the Pages setup in step 3 above.

### ☁️ Enabling Google Sign-in / Cloud Sync (optional)
Reuses the **same Firebase project** as Kanade (`japanese-site-a0af9`). Data is stored in the collection **`kazu/{uid}`**, separate from Kanade's (`users/{uid}`). The domain (`clayborneyeounjunlee.github.io`) is already approved via Kanade so no extra setup is needed, and adding **just one Firestore rules block** turns on sign-in + sync (see the [security rules](#required-security-rules-adding-just-this-one-block-enables-sign-in--sync) above).

> Even before adding the rules, the app works fully in **"this device only" (guest)** mode, with records safely stored in the browser.
> (Sign-in mode also always keeps a local mirror, so records survive a refresh even before the rules are applied.)

---

## 📁 File Structure

```
kazu/
├── index.html   # the entire app — markup + CSS (:root/dark variables) + JS (module)
│                #  · <head> inline: theme pre-apply script, meta/favicon
│                #  · <style>: theme & component CSS (CSS-variable based)
│                #  · markup for the 9 screen <section>s
│                #  · <script type="module">:
│                #      FIREBASE_CONFIG / initFirebase (dynamic import)
│                #      DATA (270 items / 24 parts) · CATS · buildPools
│                #      data layer (localStorage mirror + Firestore)
│                #      session engine (practice/quiz/results/review)
│                #      stats · heatmap · charts · speech (Web Speech) · i18n · theme
│                #      boot IIFE (onAuthStateChanged)
└── README.md    # this document
```

This repo contains only two files, `index.html` and `README.md` (no `package.json`, `firebase.json`, `.firebaserc`, `.gitignore`, or server code).

---

## 🔗 Related Apps (moa Hub · Sibling App)

- **moa hub**: https://clayborneyeounjunlee.github.io/moa/ — reachable via the `◈` button in the app's top-right corner.
- **Kanade**: a Japanese learning app by the same author. Kazu reuses Kanade's **exact UI/mechanics** (flashcards, quizzes, contribution grid, Korean/English, dark mode, speech) and the **same Firebase project** (`japanese-site-a0af9`), but keeps its data in a separate collection (`kazu/{uid}` vs `users/{uid}`) so the two never interfere.
