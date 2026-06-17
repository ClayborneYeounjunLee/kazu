# Kazu · 카즈 — 일본어 숫자 학습

일본어 **숫자 · 조수사 · 날짜/시간 읽기**를 연습·퀴즈·복습으로 익히는 단일 파일 웹앱.
카나데(Kanade)와 같은 메커니즘(플래시카드 + 퀴즈 + 잔디/오답률 통계 + 한·영 + 다크모드 + 음성)입니다.

- 단일 파일: [`index.html`](index.html) 하나로 동작
- 데이터: 270개 항목 / 24개 파트
  - **숫자**: 0–10, 십(10–90), 백(100–900), 천(1000–9000), 만·억
  - **조수사**: ～つ·個·人·本·枚·匹·台·冊·歳·杯·階·回·円
  - **날짜·시간**: ～月·日·曜日·時·分·時間
- 발음 변화(さんびゃく·ろっぴゃく·はっせん 등)·특수 읽기(ついたち·はたち 등) 모두 반영
- 🔊 글자/줄을 누르면 ja-JP 음성으로 발음 재생

## 로컬에서 보기
ES 모듈을 쓰기 때문에 파일을 더블클릭(`file://`)하면 동작하지 않습니다. 간단한 정적 서버로 여세요.

```bash
# 아무거나 하나
npx serve .
python -m http.server 8000
```
그 후 브라우저에서 `http://localhost:8000` (또는 serve가 알려주는 주소) 접속.

## GitHub에 올리기 (새 리포 + Pages)
로컬 git 커밋은 이미 되어 있습니다. GitHub 원격만 만들면 됩니다.

1. github.com → **New repository** → 이름 `kazu` (Public), README/.gitignore 없이 빈 리포로 생성
2. 원격 연결 후 푸시:
   ```bash
   git remote add origin https://github.com/nsaosulfate/kazu.git
   git push -u origin main
   ```
3. 리포 **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: **main** / **/(root)** → Save
4. 1~2분 뒤 공개 주소: **https://nsaosulfate.github.io/kazu/**

> GitHub Desktop을 쓰면: Add → Add Existing Repository로 이 폴더를 추가 → Publish repository → 위 3번 Pages 설정만 하면 됩니다.

## ☁️ Google 로그인 / 클라우드 동기화 (선택)
카나데와 **같은 Firebase 프로젝트**(`japanese-site-a0af9`)를 재사용합니다. 데이터는 카나데(`users/{uid}`)와 분리된
컬렉션 **`kazu/{uid}`** 에 저장됩니다. 도메인(`nsaosulfate.github.io`)은 이미 카나데에서 승인돼 있어 추가 설정이 필요 없고,
**Firestore 규칙 1줄만** 추가하면 로그인+동기화가 켜집니다.

Firebase Console → 해당 프로젝트 → **Firestore Database → 규칙(Rules)** 에 아래 블록을 추가:

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
> 규칙을 추가하기 전에도 앱은 **"이 기기에서만 쓰기"(게스트)** 로 완전히 동작하며, 기록은 브라우저에 안전하게 저장됩니다.
> (로그인 모드에서도 로컬 미러본을 항상 함께 저장하므로 규칙 적용 전 새로고침해도 기록이 사라지지 않습니다.)
