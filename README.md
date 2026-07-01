# Kazu · 카즈 — 일본어 숫자 학습

일본어 **숫자 · 조수사 · 날짜/시간 읽기**를 연습·퀴즈·복습으로 익히는 **단일 파일 웹앱**.
카나데(Kanade)와 같은 메커니즘(플래시카드 + 퀴즈 + 잔디/오답률 통계 + 한·영 + 다크모드 + 음성)입니다.

🔗 **라이브:** https://clayborneyeounjunlee.github.io/kazu/

- 단일 파일: [`index.html`](index.html) 하나로 동작 (외부 빌드·번들 없음)
- 데이터: **270개 항목 / 24개 파트** (코드에서 실측 확인)
  - **숫자**: 0–10, 십(10–90), 백(100–900), 천(1000–9000), 만·억
  - **조수사**: ～つ·個·人·本·枚·匹·台·冊·歳·杯·階·回·円
  - **날짜·시간**: ～月·日·曜日·時·分·時間
- 발음 변화(さんびゃく·ろっぴゃく·はっせん 등)·특수 읽기(ついたち·はたち·とお 등) 모두 반영
- 🔊 글자/줄을 누르면 `ja-JP` 음성으로 발음 재생 (Web Speech API)

---

## ✨ 주요 기능 (사용자 관점)

- **플래시카드 연습(Practice)** — 카드를 눌러 답을 열고, "알아요 / 몰라요"로 자가 채점. 몰랐던 카드는 결과 화면에서 모아 재복습.
- **6지선다 퀴즈(Quiz)** — 각 문항에 정답 1 + 오답 5개(총 6지선다) 보기. **하드 모드**를 켜면 문항별 제한시간 타이머(3·5·7초 선택, 기본 5초) 적용, 시간 초과 시 자동 오답 처리.
- **출제 방향 선택** — `숫자→읽기` / `읽기→숫자` / `랜덤` 3가지 모드.
- **파트 선택** — 24개 파트를 알약(pill) 토글로 자유 조합해 학습 범위 지정. 마지막 선택은 자동 저장·복원.
- **집중 복습(Review)** — 3회 이상 학습했는데 **오답률 30% 이상**인 항목만 자동 수집, 오답률 높은 순으로 정렬해 재출제.
- **표(Charts) 보기** — 카테고리별 전체 표를 보며 읽기/로마자/한글발음/노트 확인. 읽기 힌트 on/off 토글, 줄을 누르면 음성 재생.
- **통계** — 홈의 퀵스탯(오늘 학습량 · 연속 학습일 streak · 정답률), 마이페이지의 총 카드·정답률·학습일수·streak, **GitHub 잔디 스타일 히트맵**.
- **한국어 / English 전환**, **라이트 / 다크 테마**(시스템 설정 자동 감지 + 수동 토글).
- **Google 로그인 클라우드 동기화** 또는 **게스트(이 기기에서만)** — 게스트도 모든 기능이 완전히 동작.
- **모아(moa) 허브로 돌아가기** 버튼 내장.

---

## 🧱 기술 스택 / 언어

| 항목 | 내용 |
|---|---|
| 언어 | 순수 **HTML + CSS + JavaScript** (프레임워크·빌드 도구 없음) |
| JS 방식 | **ES 모듈** (`<script type="module">`) — 동적 `import()`로 Firebase SDK 로드 |
| 구조 | **단일 `index.html`** (약 1,700줄, 마크업·스타일·스크립트 인라인 포함) |
| 스타일 | 인라인 `<style>` + **CSS 변수(`:root` / `html[data-theme="dark"]`)** 기반 테마 |
| 폰트 | 본문 한글: `Pretendard`, `Apple SD Gothic Neo`, `Malgun Gothic`, `Noto Sans KR` / 일본어(가나·한자): `Yu Gothic UI`, `Meiryo`, `Hiragino Kaku Gothic ProN`, `Noto Sans JP` (`--kana-font`, 모두 시스템 폰트 폴백, 웹폰트 CDN 미사용) |
| 아이콘/파비콘 | 인라인 SVG data URI (`数` 글자 로고) |
| 외부 CDN | **Firebase JS SDK `12.14.0`** — `https://www.gstatic.com/firebasejs/12.14.0/` 에서 `firebase-app` / `firebase-auth` / `firebase-firestore` 3개 모듈만 동적 로드 |
| 음성 | 브라우저 내장 **Web Speech API**(`SpeechSynthesis`) — 별도 라이브러리 없음 |
| PWA 힌트 | `theme-color`, `apple-mobile-web-app-*`, `mobile-web-app-capable` 메타 태그 (매니페스트 파일은 없음) |

> **빌드/설치 단계가 전혀 없습니다.** `npm`·webpack·번들러·트랜스파일러를 쓰지 않으며, 정적 서버로 `index.html`만 서빙하면 됩니다.

### 실제 `<script>` / import 근거

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

Firebase는 앱 부팅 시 **필요할 때만** 동적으로 불러오므로, 오프라인이거나 SDK 로드에 실패해도 게스트 모드로 앱이 계속 동작합니다.

---

## 🏗️ 시스템 구조

### 단일 파일 · 화면 전환 방식
별도 라우터·프레임워크 없이, 미리 렌더된 9개 화면 `<section>`을 클래스 토글로 보였다/숨겼다 하는 **간단한 SPA**입니다.

```js
const SCREENS = ["loading","auth","home","study","practice","quiz","result","charts","mypage"];
function showScreen(name){
  SCREENS.forEach(s => $("screen-" + s).classList.toggle("hidden", s !== name));
  window.scrollTo(0, 0);
}
```

| 화면 | 역할 |
|---|---|
| `loading` | 초기 로딩 스피너 |
| `auth` | Google 로그인 / 게스트 시작 |
| `home` | 인사·퀵스탯·학습/표/마이페이지 진입 |
| `study` | 학습 허브(파트 선택·모드·연습/퀴즈/복습 탭) |
| `practice` | 플래시카드 연습 |
| `quiz` | 6지선다(정답1+오답5) 퀴즈 |
| `result` | 세션 결과·오답 재도전 |
| `charts` | 카테고리별 전체 표 |
| `mypage` | 통계·히트맵·언어/테마·로그아웃 |

### 앱 부팅 흐름 (파일 하단 초기화 IIFE)

1. `<head>`의 인라인 스크립트가 `localStorage["kazu-theme"]`(또는 시스템 다크모드)로 **FOUC 방지 테마 선적용**.
2. `restoreSetup()` → 마지막 파트/모드/타이머 설정 복원, `applyLang(L)` → 언어 적용, `showScreen("loading")`.
3. `initFirebase()` 시도:
   - **성공**: `onAuthStateChanged` 구독. 로그인 사용자가 있으면 `startCloud(fbUser)`, 없으면 이전 모드가 `guest`면 `startGuest()`, 아니면 `auth` 화면.
   - **실패/미설정**: 게스트로 진행하거나 `auth` 화면 표시(로그인 버튼 비활성).
4. `startGuest()` / `startCloud()` → `enterApp()`으로 홈 진입 + 퀵스탯 렌더.

### 상태 관리
전역 변수로 관리하는 **경량 상태**(별도 스토어 라이브러리 없음):

- `mode` (`"guest"` | `"cloud"`), `uid`, `userEmail`, `photoURL`
- `profile` — 사용자 학습 데이터 객체(닉네임·생성일·통계·활동) 하나로 통합
- `POOLS` / `FULL_POOL` — 데이터에서 파생된 카드 풀
- `session` — 현재 연습/퀴즈 세션(덱·인덱스·오답·정답수 등)
- `partsSel` / `studyMode` / `hardLimit` / `studyTab` — 학습 허브 설정
- `L`(언어), 테마(`data-theme` 속성)

### 핵심 함수 지도

| 함수 | 역할 |
|---|---|
| `initFirebase()` | Firebase SDK 동적 import, `FB` 객체(auth·db·doc·setDoc 등) 구성 |
| `buildPools()` | `DATA` → 각 항목에 `cat`/`part`/`key` 부여한 카드 풀 생성 |
| `startGuest()` / `startCloud()` | 게스트/클라우드 진입, `profile` 로드 |
| `applyCloud()` / `profileFromSeed()` | Firestore 문서 ↔ 로컬 프로필 병합 |
| `scheduleSave()` / `flushSave()` | 로컬 미러 즉시 저장 + (클라우드 시)2초 디바운스 후 Firestore 반영 |
| `record(card, isWrong)` | 카드별 노출수(`s`)·오답수(`w`) 및 일자별 활동량 기록 |
| `startSession(kind, cards, opts)` | 연습/퀴즈 세션 시작(덱 셔플·출제방향 결정) |
| `renderPractice()` / `revealPractice()` / `gradePractice()` | 플래시카드 렌더·정답 공개·자가 채점 |
| `renderQuiz()` / `buildOptions()` / `answerQuiz()` | 퀴즈 렌더·보기 생성·채점(정답 700ms·오답 1600ms 후 다음) |
| `startTimer()` / `clearTimer()` | 하드 모드 제한시간 타이머(50ms 간격 갱신) |
| `showResult()` | 결과 화면(점수·오답 목록·재도전) |
| `remindCards()` / `renderReview()` | 오답률 기준 복습 대상 선정·렌더 |
| `renderCharts()` | 카테고리별 전체 표 렌더 |
| `renderMypage()` | 통계·히트맵 렌더 |
| `calcStreak()` / `calcTotals()` | 연속 학습일·총 노출/오답 집계 |
| `speak(text)` / `pickJaVoice()` | `ja-JP` 음성 재생·음성 선택 |
| `applyLang()` / `tr()` / `applyTheme()` | i18n·테마 적용 |

---

## 🗂️ 데이터

모든 학습 데이터는 `index.html` 안의 **`const DATA` 객체 리터럴**에 정적으로 들어 있습니다(외부 `.js`·JSON·서버 없음).

### 카테고리 → 파트 구성 (`CATS`)

| 카테고리 | 파트 키(개수) |
|---|---|
| `num` (숫자) | `kihon`(11) · `juu`(13) · `hyaku`(9) · `sen`(9) · `man`(6) |
| `counter` (조수사) | `tsu`(11) · `ko`(11) · `nin`(11) · `hon`(11) · `mai`(11) · `hiki`(11) · `dai`(11) · `satsu`(11) · `sai`(12) · `hai`(11) · `kai_floor`(11) · `kaicnt`(11) · `en`(14) |
| `datetime` (날짜·시간) | `gatsu`(13) · `nichi`(17) · `youbi`(8) · `ji`(13) · `fun`(13) · `jikan`(11) |

- **파트 수: 24 · 총 항목 수: 270** (코드에서 실측)
- 각 파트는 `{num, kanji, kana, roma, kor, note}` 형태의 항목 배열.

### 항목 스키마

| 필드 | 의미 | 예시 |
|---|---|---|
| `num` | 화면에 보이는 숫자/표기 | `"300"`, `"6つ"`, `"1個"`, `"いくつ"` |
| `kanji` | 한자 표기 | `"三百"`, `"六つ"` |
| `kana` | 히라가나/가타카나 읽기(음성·정답 기준) | `"さんびゃく"`, `"むっつ"` |
| `roma` | 로마자 | `"sanbyaku"`, `"muttsu"` |
| `kor` | 한글 발음 | `"산뱌쿠"`, `"뭇츠"` |
| `note` | 발음 변화·특수 읽기 등 설명 | `"발음 변화 (ひゃく→びゃく)"` |

### 실제 스니펫

```js
const DATA = {
  hyaku: [
    {num:"100",kanji:"百",  kana:"ひゃく",    roma:"hyaku",    kor:"햐쿠",   note:""},
    {num:"300",kanji:"三百",kana:"さんびゃく",roma:"sanbyaku", kor:"산뱌쿠", note:"발음 변화 (ひゃく→びゃく)"},
    {num:"600",kanji:"六百",kana:"ろっぴゃく",roma:"roppyaku", kor:"롭퍄쿠", note:"발음 변화 (촉음+ひゃく→ぴゃく)"},
    // ...
  ],
  tsu: [
    {num:"3つ",kanji:"三つ",kana:"みっつ",roma:"mittsu",kor:"밋츠",note:"발음 변화"},
    {num:"10", kanji:"十",  kana:"とお",  roma:"too",   kor:"토오",note:"つ 없음, 특수 읽기"},
    // ...
  ],
  // kihon, juu, sen, man, ko, nin, hon, mai, hiki, dai, satsu, sai, hai,
  // kai_floor, kaicnt, en, gatsu, nichi, youbi, ji, fun, jikan ...
};
```

### 파생 구조 (런타임)

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

- 각 카드의 **`key`(`"파트:num"`, 예 `"hyaku:300"`)** 가 통계 저장의 고유 식별자로 쓰입니다.
- 퀴즈 보기 생성 시, 같은 읽기(`kana`)를 가진 카드(예 `1階`/`1回` 둘 다 `いっかい`)가 보기에 중복 노출되지 않도록 필터링합니다.

---

## 💾 저장소 / DB

이 앱은 **두 개의 저장 경로**를 함께 씁니다. 로그인 여부와 무관하게 **항상 로컬 미러본을 저장**하므로, 규칙 미설정·오프라인 상황에서도 기록이 사라지지 않습니다.

### 1) 브라우저 `localStorage` 키

| 키 | 용도 |
|---|---|
| `kazu-theme` | 테마 (`"light"` / `"dark"`) |
| `kazu-lang` | 언어 (`"ko"` / `"en"`) |
| `kazu-mode` | 마지막 로그인 방식 (`"guest"` / `"cloud"`) |
| `kazu-local` | **학습 프로필 전체의 로컬 미러**(닉네임·생성일·통계·활동) JSON |
| `kazu-setup` | 학습 허브 마지막 설정(선택 파트·출제모드·하드 여부·타이머 초) JSON |

### 2) Firebase (선택 · 클라우드 동기화)

- **프로젝트:** `japanese-site-a0af9` (카나데와 **동일 Firebase 프로젝트** 재사용)
- **인증:** Firebase Authentication — Google 로그인. 팝업(`signInWithPopup`) 시도 후 실패하면 리다이렉트(`signInWithRedirect`)로 폴백.
- **DB:** Cloud Firestore. **컬렉션 `kazu`**, 문서 ID = 사용자 `uid` → 경로 **`kazu/{uid}`**. (카나데의 `users/{uid}`와 **완전히 분리**)
- Firestore 클라이언트는 `experimentalForceLongPolling: true` + **영속 로컬 캐시**(`persistentLocalCache` / 단일 탭 매니저)로 초기화 → 캐시 우선 렌더 후 서버 동기화.
- **웹 설정값(apiKey `AIza…` 등)은 코드에 인라인**되어 있으나, 이는 Firebase 웹 앱의 **공개용 식별자**(비밀번호 아님)이며 실제 보안은 아래 Firestore 규칙이 담당합니다.

#### Firestore 문서 스키마 (`kazu/{uid}`)

```jsonc
{
  "nick": "학습자",          // 표시 닉네임 (로그인 시 Google displayName 우선)
  "created": "2026-07-01",   // 최초 생성일 (YYYY-MM-DD)
  "stats": {                 // 카드별 통계, 키 = "파트:num"
    "hyaku:300": { "s": 12, "w": 4 },   // s=노출수, w=오답수
    "tsu:3つ":   { "s": 8,  "w": 1 }
  },
  "activity": {              // 일자별 학습 횟수 (히트맵/스트릭 계산용)
    "2026-07-01": 37,
    "2026-06-30": 12
  }
}
```

#### 필요한 보안 규칙 (규칙 1블록만 추가하면 로그인+동기화 활성화)

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 카나데 (기존)
    match /users/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
    // 카즈 (이번에 추가)
    match /kazu/{uid} {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

### 게스트 · 오프라인 폴백

- **게스트 모드**: `uid` 없이 `kazu-local`만 사용 → 이 기기·이 브라우저에만 저장.
- **클라우드 모드에서도** 저장은 `localStorage`에 즉시 미러링 후 2초 디바운스로 Firestore에 `setDoc(..., { merge:true })`. 규칙 적용 전이나 오프라인에서도 로컬 기록은 안전.
- 화면 숨김(`visibilitychange`)·페이지 이탈(`pagehide`) 시 `flushSave()`로 강제 저장.

---

## 🌐 외부 API · 의존성

| 의존성 | 용도 | 키 필요 | 넣는 위치 |
|---|---|---|---|
| Firebase JS SDK (app/auth/firestore) `12.14.0` | 인증·클라우드 동기화 | 웹 config(공개 식별자) | `index.html`의 `FIREBASE_CONFIG` (이미 포함) |
| Google 로그인 (Firebase Auth Provider) | 사용자 인증 | — | 승인 도메인만 Firebase Console에 등록(카나데에서 이미 승인됨) |
| Web Speech API (`SpeechSynthesis`) | `ja-JP` 발음 재생 | 불필요(브라우저 내장) | — |

- **별도의 상용 API 키(OpenAI/지도/환율 등)나 서버·백엔드가 없습니다.** 전적으로 정적 프런트엔드 + Firebase(선택)로 동작.
- 음성은 `ja-JP` 보이스를 우선 선택하며(`ja`로 시작하는 보이스로 폴백), `speechSynthesis`가 없으면 조용히 무시됩니다.

---

## ▶️ 로컬 실행 방법

ES 모듈을 쓰기 때문에 파일을 더블클릭(`file://`)하면 동작하지 않습니다. 간단한 정적 서버로 여세요.

```bash
# 아무거나 하나 (package.json 없음 — 순수 정적 서버면 됨)
npx serve .
python -m http.server 8000
```

그 후 브라우저에서 `http://localhost:8000` (또는 serve가 알려주는 주소) 접속.

> `package.json`·`node_modules`·빌드 스크립트가 없으므로 `npm install` 단계는 필요 없습니다.

---

## 🚀 배포 (GitHub Pages)

로컬 git 커밋은 이미 되어 있습니다. GitHub 원격만 만들면 됩니다.

1. github.com → **New repository** → 이름 `kazu` (Public), README/.gitignore 없이 빈 리포로 생성
2. 원격 연결 후 푸시:
   ```bash
   git remote add origin https://github.com/ClayborneYeounjunLee/kazu.git
   git push -u origin main
   ```
3. 리포 **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/(root)** → Save
4. 1~2분 뒤 공개 주소: **https://clayborneyeounjunlee.github.io/kazu/**

> GitHub Desktop을 쓰면: Add → Add Existing Repository로 이 폴더를 추가 → Publish repository → 위 3번 Pages 설정만 하면 됩니다.

### ☁️ Google 로그인 / 클라우드 동기화 켜기 (선택)
카나데와 **같은 Firebase 프로젝트**(`japanese-site-a0af9`)를 재사용합니다. 데이터는 카나데(`users/{uid}`)와 분리된 컬렉션 **`kazu/{uid}`** 에 저장됩니다. 도메인(`clayborneyeounjunlee.github.io`)은 이미 카나데에서 승인돼 있어 추가 설정이 필요 없고, **Firestore 규칙 1블록만** 추가하면 로그인+동기화가 켜집니다(위 [보안 규칙](#필요한-보안-규칙-규칙-1블록만-추가하면-로그인동기화-활성화) 참조).

> 규칙을 추가하기 전에도 앱은 **"이 기기에서만 쓰기"(게스트)** 로 완전히 동작하며, 기록은 브라우저에 안전하게 저장됩니다.
> (로그인 모드에서도 로컬 미러본을 항상 함께 저장하므로 규칙 적용 전 새로고침해도 기록이 사라지지 않습니다.)

---

## 📁 파일 구조

```
kazu/
├── index.html   # 앱 전체 — 마크업 + CSS(:root/다크 변수) + JS(module)
│                #  · <head> 인라인: 테마 선적용 스크립트, 메타/파비콘
│                #  · <style>: 테마·컴포넌트 CSS (CSS 변수 기반)
│                #  · 9개 화면 <section> 마크업
│                #  · <script type="module">:
│                #      FIREBASE_CONFIG / initFirebase (동적 import)
│                #      DATA(270항목/24파트) · CATS · buildPools
│                #      데이터 계층(localStorage 미러 + Firestore)
│                #      세션 엔진(연습/퀴즈/결과/복습)
│                #      통계·히트맵·차트·음성(Web Speech)·i18n·테마
│                #      부팅 IIFE(onAuthStateChanged)
└── README.md    # 이 문서
```

이 리포에는 `index.html`과 `README.md` 두 파일뿐입니다(`package.json`·`firebase.json`·`.firebaserc`·`.gitignore`·서버 코드 없음).

---

## 🔗 관련 앱 (모아 허브 · 형제 앱)

- **모아(moa) 허브**: https://clayborneyeounjunlee.github.io/moa/ — 앱 내 우측 상단 `◈` 버튼으로 이동.
- **카나데(Kanade)**: 같은 제작자의 일본어 학습 앱. 카즈는 카나데와 **동일한 UI/메커니즘**(플래시카드·퀴즈·잔디·한/영·다크모드·음성)과 **동일 Firebase 프로젝트**(`japanese-site-a0af9`)를 재사용하되, 데이터는 별도 컬렉션(`kazu/{uid}` vs `users/{uid}`)으로 분리해 서로 간섭하지 않습니다.
