# TARGET LAB 모바일 앱 (Android · iOS)

정보통신설비 유지보수·관리 / 성능점검 앱을 휴대폰 앱으로 설치하기 위한 프로젝트입니다.
웹 앱(`www/index.html`)을 Capacitor로 감싸 Android(APK·AAB)와 iOS(IPA) 앱으로 만듭니다.

## 들어 있는 것

| 경로 | 내용 |
|---|---|
| `www/index.html` | 앱 화면 전체 (웹 버전과 같은 기능) |
| `capacitor.config.json` | 앱 이름 `TARGET LAB`, 앱 ID `kr.targetlab.app` |
| `assets/` | 앱 아이콘·시작 화면 원본 (빌드 때 크기별로 자동 생성) |
| `scripts/native-setup.js` | 카메라·마이크·사진 권한을 자동으로 넣는 스크립트 |
| `.github/workflows/android-apk.yml` | GitHub에서 Android APK를 자동으로 만드는 설정 |
| `.github/workflows/ios-build.yml` | GitHub의 Mac 서버에서 iOS 빌드를 확인하는 설정 |

> 앱 ID(`kr.targetlab.app`)는 스토어에 올리기 전에 회사 도메인으로 바꾸세요 (예: `kr.co.회사명.targetlab`).

---

## 방법 1. PC 설치 없이 Android APK 받기 (GitHub)

1. GitHub에 새 저장소를 만들고 이 폴더의 파일을 모두 올립니다 (`.github` 폴더 포함).
2. 저장소의 **Actions** 탭 → **Android APK** → **Run workflow**.
3. 5~10분 뒤 완료된 실행을 열고 아래 **Artifacts**에서 `TARGETLAB-apk`를 내려받습니다.
4. 압축을 풀어 나온 `app-debug.apk`를 휴대폰에 옮겨 설치합니다.
   (처음 설치할 때 "출처를 알 수 없는 앱 설치 허용"을 켜야 합니다.)

## 방법 2. PC에서 직접 빌드

준비물: Node.js 20 이상
- Android: Android Studio (JDK 21 포함)
- iOS: Mac + Xcode 16 이상 (+ 실기기·배포는 Apple Developer 계정)

```bash
npm install

# Android
npm run android:init      # android 프로젝트 생성 + 권한 + 아이콘
npm run android:open      # Android Studio에서 열기 → ▶ 실행 또는 Build > Generate Signed Bundle/APK

# iOS (Mac)
npm run ios:init          # ios 프로젝트 생성 + 권한 + 아이콘
npm run ios:open          # Xcode에서 열기 → Signing & Capabilities에서 팀 선택 → ▶ 실행
```

화면(`www/index.html`)을 고친 뒤에는 `npm run sync`로 앱에 반영합니다.

## 스토어 배포

- **Google Play**: Android Studio에서 서명한 AAB(`Build > Generate Signed Bundle`)를 Play Console에 올립니다. 개발자 계정 등록이 필요합니다.
- **App Store**: Xcode에서 `Product > Archive` → App Store Connect 업로드. Apple Developer Program 가입이 필요합니다.
- 계정 비용·심사 기준은 각 사이트에서 최신 내용을 확인하세요.

---

## 앱에서 달라지는 점

- **저장 위치**: 데이터·사진·음성이 **휴대폰 안**에 저장됩니다 (인터넷이 없어도 점검표 작성 가능).
  웹 버전(Claude 아티팩트)과 자동으로 연결되지 않습니다.
- **데이터 옮기기**: 왼쪽 메뉴 맨 아래 **데이터 백업**으로 ZIP 파일을 만들고, 다른 기기(앱 또는 웹)에서 **백업 가져오기**로 불러옵니다.
- **파일 저장**: PPT·엑셀·HTML·백업 파일은 휴대폰의 공유 창이 열리면 "파일에 저장", 카카오톡, 메일 등으로 보냅니다.
- **사진·녹음**: 휴대폰 카메라와 마이크를 바로 사용합니다 (첫 사용 때 권한 허용).
- **점검항목별 사진 폴더**: 사진을 찍으면 휴대폰 `문서/TARGETLAB/현장_점검/설비/점검항목/` 폴더에도 자동 저장됩니다. (Android: 내 파일 › 문서, iPhone: 파일 앱 › 나의 iPhone › TARGET LAB)
- **인터넷이 필요한 기능**: PPT·엑셀·ZIP 만들기(라이브러리를 인터넷에서 불러옴), 웹 글꼴.
- **AI 문구 다듬기**: Claude 안에서만 동작하므로 앱에서는 버튼이 나타나지 않습니다.
