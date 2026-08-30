# FLOWAX SPACE 홈페이지 PRD

## 문서 정보

| 항목 | 내용 |
|---|---|
| 프로젝트명 | FLOWAX SPACE 홈페이지 |
| 문서 상태 | 인터뷰 완료 · 사용자 승인 완료 |
| 작성일 | 2026-08-30 |
| 제작 형태 | React·Next.js 기반 단일 스크롤 홈페이지 |
| 기준 자료 | 웹디자인 카피 디자인.txt의 EXOSIA 랜딩 페이지 명세 |
| 실제 프로젝트 위치 | C:/Users/User/Desktop/Homepage_항공연구소 |
| 진행 원칙 | 각 단계 결과를 로컬 사이트에서 확인하고 승인한 뒤 다음 단계 진행 |

---

## 1. 목표 개요

### 1.1 핵심 목표

FLOWAX SPACE를 2050년 실제 운영 중인 글로벌 민간 우주 연구소처럼 보여주는 몰입형 브랜드 홈페이지를 제작한다. 정보 탐색이나 전환보다 첫 화면의 화려함, 압도적인 우주 규모, 정밀한 미래 기술의 인상을 최우선으로 한다.

### 1.2 한 문장 정의

AI와 자율 로봇이 인간보다 먼저 달과 화성에 도착해 탐사하고, 기지를 건설하며, 생존 가능한 환경을 준비하는 미래 우주 연구소의 시네마틱 웹 경험.

### 1.3 성공 조건

- TXT의 메인 디자인, 배치, 색상, 영상, 이미지, 애니메이션과 반응형 구조를 재현한다.
- EXOSIA 관련 문구를 FLOWAX SPACE의 브랜드·임무·연구 콘텐츠로 교체한다.
- 한국어를 기본으로 제공하고 EN 버튼으로 자연스럽게 작성된 영어 콘텐츠를 즉시 표시한다.
- PC와 모바일을 동일한 우선순위로 완성한다.
- 실제 데이터 전송·분석·배포 없이 로컬에서 완성하고 검수한다.

---

## 2. 브랜드 및 세계관

### 2.1 브랜드 기본 정보

- 공식 표기: FLOWAX SPACE
- 한글 브랜드명 병기: 사용하지 않음
- 조직 성격: 한국에서 출발해 국제 연구진·기업과 협력하는 글로벌 민간 우주 연구소
- 세계관 시점: 2050년 전후
- 표현 방식: 가상 또는 콘셉트 안내 없이 실제 미래 연구소처럼 표현
- 푸터: © 2050 FLOWAX SPACE

### 2.2 핵심 연구 분야

- AI 기반 자율항법 및 자율임무 수행
- 달·화성 기지 및 생명유지 시스템
- 대표 방향: AI와 로봇이 인간보다 먼저 달·화성에 도착해 거주 기지를 건설하고 운영하는 자율 기지 시스템

### 2.3 대표 임무

- 임무명: FX–01 GENESIS
- 목적: 무인 AI·로봇 시스템이 화성 정착 후보지를 탐사하고 자율 기지를 구축한 뒤 첫 승무원을 맞이한다.
- 서사: AI 훈련 → 후보지 탐사 → 기지 설계 → 모듈 발사 → 자율 건설 → 모래폭풍 통신 두절과 자율 복구 → 첫 승무원 도착

### 2.4 핵심 인상

1. 압도적인 우주의 규모와 경이로움
2. 극도로 정밀하고 진보된 미래 기술

### 2.5 최우선 방문자

- 글로벌 우주기관
- 대학 및 연구기관
- 공동 연구 파트너

방문자 전환보다 브랜드 경험을 우선하며 협력 문의는 푸터의 보조 기능으로 제공한다.

---

## 3. 디자인 원칙

### 3.1 유지 요소

- 짙은 우주 배경과 청백색 강조색
- 전체 화면 고정 우주인 영상
- 페이지 스크롤에 연동되는 영상 시간 이동
- 로딩 퍼센트 화면
- 히어로 세로 그리드와 대형 3줄 제목
- 오른쪽 아래 원형 스크롤 버튼
- 왼쪽 아래 브랜드 설명 블록
- 단어가 순서대로 밝아지는 미션 선언문
- 4열 핵심 수치
- 비대칭 이미지 카드 3개
- 마지막 대형 메시지·정보 행·흰색 버튼·푸터
- 데스크톱·태블릿·모바일 반응형 규칙

### 3.2 변경 요소

- 브랜드명과 FX 심볼
- 폰트
- 한국어·영어 문구
- 메뉴명
- 연구소·임무·통계·카드 콘텐츠
- 티켓·시리즈·캐릭터·에피소드 관련 의미

### 3.3 추가하지 않을 요소

- 메인 페이지 글리치, 마우스 추적, 추가 패럴랙스, 카드 등장 애니메이션
- 별도의 행성 회전 이미지나 3D 오브젝트
- 자동 오디오나 사운드 버튼
- 모바일 햄버거 메뉴
- 모션 감소 모드

새 애니메이션은 합의한 전체 화면 아카이브, 문의 패널, DAY ONE 시퀀스와 FX 로고 호버에만 사용한다.

### 3.4 언어별 레이아웃

원본 수치를 기본으로 사용한다. 한국어 또는 영어가 영역을 넘으면 글자를 과도하게 줄이지 않고 줄바꿈, 콘텐츠 폭, 정렬과 간격을 자연스럽게 조정한다.

---

## 4. 시각 시스템

### 4.1 색상

TXT 팔레트를 그대로 사용한다.

| 용도 | 색상 |
|---|---|
| 페이지 배경 | #04060b |
| 기본 흰색 | #f4f7fb |
| 브랜드 강조 청백색 | #b9cdea |
| 내비게이션 | #e8edf4 |
| 히어로 본문 | #d6dde6 |
| 작은 링크 | #dfe5ec |
| 회색 라벨 | #c4cad2 |
| 보조 본문 | #b2b7be |
| 공개 전 미션 단어 | #6b7684 |
| 구분선 | #4a5361 |

### 4.2 폰트

- 한국어·본문: Pretendard
- 영문·숫자·임무 코드: Space Grotesk
- 프로젝트 내부에 폰트 파일과 라이선스 파일을 저장한다.
- 외부 폰트 CDN은 사용하지 않는다.
- 폴백: Arial, sans-serif

### 4.3 로고

- 교차 궤도가 X를 만들고 한쪽 선이 F로 이어지는 단색 벡터 심볼
- FX 심볼과 FLOWAX SPACE 워드마크 조합
- 헤더, 푸터, 파비콘에 사용
- 기본 상태는 정지, 호버 시 궤도만 미세하게 이동
- 로딩 화면에는 로고를 넣지 않는다.

---

## 5. 정보 구조

별도 서브페이지 없이 하나의 긴 스크롤 페이지로 구성한다.

1. Hero
2. Mission
3. Mission Stats
4. Mission Logs
5. First Arrival
6. Footer

전체 임무 아카이브, 개별 카드 상세 기록, 협력 문의 폼, DAY ONE 엔딩은 페이지 위에 전체 화면 패널로 연다.

---

## 6. 글로벌 레이아웃

- 배경 #04060b, 기본 텍스트 #f4f7fb
- 부드러운 앵커 스크롤
- 좌우 패딩: 데스크톱 64px, 1100px 이하 36px, 768px 이하 24px
- 고정 배경 z-index 0, 스크롤 콘텐츠 relative z-index 1
- 전체 화면 패널은 모든 콘텐츠 위에 표시

---

## 7. 고정 배경 영상과 로더

### 7.1 영상

- 프로젝트 파일: public/media/hero-astronaut.mp4
- 길이 약 7.13초, 해상도 1280×720
- PC와 모바일에 같은 원본 파일 사용
- muted, playsInline, preload auto
- 자동 시간 재생 없음
- 화면 100%, object-fit cover
- 오버레이 rgba(4,6,11,0.35)

### 7.2 스크롤 스크럽

- progress = scrollY / (scrollHeight - innerHeight)
- target = progress × video.duration
- current += (target - current) × 0.1
- 차이가 0.01 미만이면 current를 target과 동일하게 처리
- readyState 2 이상이면 video.currentTime에 current 적용
- 진행률과 영상 시간은 유효 범위로 제한

아래로 스크롤하면 우주인이 앞으로 회전·이동하고 위로 스크롤하면 역방향으로 돌아간다.

### 7.3 로더

- 전체 화면 고정, 배경 #04060b, z-index 60
- 중앙에 퍼센트 숫자만 표시
- 13px, 자간 .25em, 굵기 600, 색상 #b9cdea
- buffered end / duration 값을 표시
- canplaythrough 시 0.6초 페이드
- 최대 6초 후 반드시 닫기
- 실패 시 대표 프레임을 대체 배경으로 사용

---

## 8. 섹션 명세

### 8.1 Hero

#### 구조와 헤더

- 최소 높이 100svh
- 5개 동일 세로 그리드, 모바일에서 숨김
- 헤더 패딩: 30px 64px
- 1100px 이하: 24px 36px
- 768px 이하: 18px 24px
- 왼쪽: FX 심볼 + FLOWAX SPACE
- 중앙 한국어: 홈 / 연구소 / 연구 기술 / 임무
- 중앙 영어: HOME / INSTITUTE / RESEARCH / MISSIONS
- 우측: 임무 진입 / ENTER MISSION
- 클릭 시 First Arrival로 이동
- 모바일에서는 중앙 메뉴 숨김

#### 메인 제목

한국어:

    인류가 도착하기 전,
    새로운 세계를
    준비합니다.

영어:

    Before we arrive,
    a new world
    will be ready.

- 두 번째 줄 #b9cdea
- clamp(42px, 5.6vw, 82px), 굵기 500, 줄높이 1.03
- 최대 너비 620px, 위 여백 9vh

#### 보조 문구

- 한국어: AI와 로봇이 먼저 도착해, 인간을 위한 최초의 거주 환경을 구축합니다.
- 영어: AI and autonomous machines arrive first, building humanity’s first viable habitat.
- 최대 너비 300px, 15px, 줄높이 1.5

#### 원형 버튼

- 더 깊이 / GO DEEPER
- 아래 화살표
- 데스크톱 148×148px, 우측 64px, 하단 44px
- 태블릿 130×130px, 우측·하단 36px
- 모바일 정적 중앙 배치 118×118px
- 화살표 1.8초, 6px 반복
- 클릭 시 Mission으로 이동

#### 왼쪽 하단

- 제목: 새로운 행성의 첫 번째 설계자 / THE FIRST ARCHITECTS OF A NEW WORLD
- 한국어: FLOWAX SPACE는 AI와 자율 로봇을 통해 인간이 도착하기 전에 탐사하고, 건설하며, 생존 가능한 환경을 준비합니다.
- 영어: FLOWAX SPACE sends AI and autonomous machines ahead of humanity—to explore, build, and prepare a world capable of sustaining life.
- 링크: 우리의 비전 / OUR VISION
- 클릭 시 Mission으로 이동

### 8.2 Mission

- 최소 높이 82svh
- 위 여백 clamp(64px, 10vh, 140px)
- 패딩 100px 64px 0
- 문장 최대 560px
- 데스크톱 왼쪽 여백 14%, 태블릿 이하 0
- 라벨: / 우리의 임무 / OUR MISSION

한국어:

우리는 인류의 다음 정착지가 인간의 도착과 함께 시작되어서는 안 된다고 믿습니다. FLOWAX SPACE는 AI와 자율 로봇을 먼저 보내 낯선 세계를 이해하고, 기지를 건설하며, 생존 가능한 환경을 준비합니다. 우리가 도착하는 순간, 그곳은 이미 살아갈 수 있는 세계가 되어 있을 것입니다.

영어:

We believe humanity’s next settlement should not begin with human arrival. FLOWAX SPACE sends AI and autonomous machines ahead—to understand an unfamiliar world, construct its first habitat, and prepare the conditions for life. By the time we arrive, that world will already be ready for us.

단어 공개:

- 시작 #6b7684, 전환 0.35초
- p = clamp01((innerHeight × 0.85 − rect.top) / (innerHeight × 0.65))
- 공개 일반 단어 #f4f7fb
- FLOWAX SPACE만 #b9cdea
- clamp(20px, 2vw, 27px), 굵기 500, 줄높이 1.35

### 8.3 Mission Stats

- 4열, 최대 너비 880px, 중앙, 패딩 64px 32px
- 2~4열 왼쪽 경계선
- 모바일 2×2, 행 간격 44px

| 숫자 | 한국어 | 영어 |
|---|---|---|
| 12 | 자율 탐사 임무 | AUTONOMOUS MISSIONS |
| 3 | 달 전초기지 | LUNAR OUTPOSTS |
| 148 | 자율 로봇 | AUTONOMOUS ROBOTS |
| 1 | 화성 선행 기지 | MARS FORWARD BASE |

### 8.4 Mission Logs

- 패딩 110px 64px
- 라벨: 임무 기록 / MISSION LOGS
- 제목: 인류보다 먼저 시작된 여정 / THE JOURNEY BEFORE US
- 버튼: 전체 임무 기록 ↗ / VIEW ALL LOGS ↗
- 데스크톱 1.35fr 1fr 1fr, 간격 56px
- 카드 2·3 위 여백 96px
- 모바일 1열, 위 여백 제거
- TXT 이미지 3장을 로컬 저장해 동일 비율과 크롭으로 사용
- 카드 전체 클릭

| 카드 | 메타 | 한국어 제목 | 영어 제목 |
|---|---|---|---|
| 1 | PHASE 01 • 2049.08 | PATHFINDER / 새로운 정착 가능 구역을 발견하다 | PATHFINDER / A New Settlement Zone Discovered |
| 2 | PHASE 02 • 2050.01 | GENESIS / 인류보다 먼저 화성을 향하다 | GENESIS / Bound for Mars Before Humanity |
| 3 | PHASE 03 • 2050.11 | ARRIVAL / 준비된 세계에 첫발을 내딛다 | ARRIVAL / First Steps into a World Prepared |

카드 1은 아카이브 단계 2, 카드 2는 단계 4, 카드 3은 단계 6을 연다.

### 8.5 First Arrival

- 패딩 140px 64px 0, 중앙 정렬
- 라벨: / 첫 도착 / THE FIRST ARRIVAL
- 한국어 제목: 2050년, 새로운 세계의 첫날이 시작됩니다.
- 영어 제목: IN 2050, DAY ONE BEGINS IN A NEW WORLD.
- 한국어 새로운 세계의 첫날, 영어 DAY ONE 강조
- clamp(28px, 3.4vw, 48px), 최대 너비 720px

보조 문구:

- 한국어: FX–01 GENESIS의 자율 시스템이 탐사와 건설, 생명유지 준비를 마쳤습니다. 이제 첫 승무원이 화성에서의 새로운 하루를 시작합니다.
- 영어: The autonomous systems of FX–01 GENESIS have completed exploration, construction, and life-support preparation. The first crew now begins a new day on Mars.

정보:

    2050.11.27 / ELYSIUM PLANITIA, MARS / SOL 001 · 06:40 MTC

- 데스크톱 가로, 모바일 세로
- 흰색 버튼: DAY ONE 진입 / ENTER DAY ONE
- 클릭 시 DAY ONE 시퀀스

### 8.6 Footer

- CTA에서 120px 아래, 위쪽 경계선, 패딩 28px 0 32px
- 데스크톱 가로, 모바일 세로
- 홈 / HOME → Hero
- 연구 기술 / RESEARCH → Mission
- 임무 / MISSIONS → Mission Logs
- 협력 제안 / PARTNERSHIP → 문의 패널
- © 2050 FLOWAX SPACE

---

## 9. 전체 화면 기능

### 9.1 임무 아카이브

- 검은 패널로 열기
- 배경 스크롤 잠금과 기존 위치 복귀
- 닫기 버튼과 Esc
- 키보드 포커스 고정
- 이미지 없이 코드, 날짜, 상태, 설명으로 구성

| 단계 | 날짜 | 코드 | 상태 | 기록 |
|---|---|---|---|---|
| 1 | 2047.02 | GENESIS CORE | VERIFIED | 자율 판단 코어의 장기 화성 모의 임무 완료 |
| 2 | 2049.08 | PATHFINDER | SITE CONFIRMED | 엘리시움 평원 첫 정착 가능 구역 확인 |
| 3 | 2049.10 | HABITAT ALPHA | DESIGN LOCKED | 자율 건설과 생명유지 모듈 최종 설계 확정 |
| 4 | 2050.01 | GENESIS LAUNCH | IN TRANSIT | FX–01 기지 모듈 지구 궤도 출발 |
| 5 | 2050.08 | STORM PROTOCOL | RECOVERED | 모래폭풍 통신 두절 중 AI가 전력과 생명유지 자율 복구 |
| 6 | 2050.11 | ARRIVAL | CREW ARRIVED | 첫 승무원이 가동 준비를 마친 화성 기지에 도착 |

모든 기록의 자연스러운 영문판도 함께 작성한다.

### 9.2 협력 문의 패널

- 푸터 PARTNERSHIP 클릭
- 제목: 연구의 다음 좌표를 함께 설정하세요 / DEFINE THE NEXT COORDINATE
- 기관명, 담당자명, 업무 이메일, 협력 분야, 제안 내용, 개인정보 동의
- 입력 가능, 실제 전송·저장·외부 요청 없음
- 제출 비활성화, TRANSMISSION OFFLINE
- 닫으면 모든 값 초기화
- 브라우저 저장 없음

### 9.3 DAY ONE

다음 문장을 무음으로 순서대로 표시:

    ATMOSPHERE STABLE
    HABITAT ONLINE
    CREW ARRIVED
    DAY ONE HAS BEGUN

검은 화면, 선, 청백색 빛과 페이드만 사용한다. 닫으면 First Arrival 위치로 돌아간다.

---

## 10. 다국어

- 기본 한국어
- EN 클릭 시 영어, 영어 화면에서는 KR
- 새로고침 없이 즉시 전환
- 선택 언어 저장 안 함
- 새 방문과 새로고침은 항상 한국어
- 열린 패널도 즉시 전환
- 날짜·코드·좌표·상태는 영문 유지 가능

---

## 11. 기술 요구사항

### 11.1 스택

- Next.js + React
- [추론] App Router와 TypeScript
- [추론] CSS Modules 또는 전역 CSS 직접 스타일링
- requestAnimationFrame 기반 영상 스크럽
- 백엔드, 데이터베이스, 인증, 외부 API 없음

### 11.2 프로젝트 관리

- 기존 TXT 삭제·수정 금지
- 지정 폴더에 Git 저장소 생성
- 요청 전 commit, push, GitHub 연결, 배포 금지
- 환경변수와 비밀정보 불필요
- 모든 영상·이미지·폰트 로컬 제공

### 11.3 지원 환경

- 최신 Chrome, Edge, Safari, Firefox
- iPhone Safari, Android Chrome
- 데스크톱 1101px 이상
- 태블릿 769~1100px
- 모바일 768px 이하
- PC와 모바일 동일 우선순위
- 모바일에도 원본 7MB 영상 사용

### 11.4 접근성

- 이미지 대체 텍스트
- 키보드 조작
- 패널 포커스 고정과 Esc 닫기
- 입력 필드 라벨
- 모션 감소 모드는 제공하지 않음

---

## 12. 예외 처리

- 영상 메타데이터 실패 시 대표 프레임
- 진행률 계산 실패에도 6초 후 로더 닫기
- 스크롤 분모가 0이면 진행률 0
- 영상 시간 유효 범위 제한
- 글꼴 실패 시 폴백
- 문구 넘침은 자연스러운 레이아웃으로 전환
- 패널이 열리면 배경 클릭·스크롤 차단
- 문의 폼은 네트워크 요청 없음
- JavaScript 오류 시 가능한 기본 콘텐츠 유지

---

## 13. 검수 기준

### 기능

- AC1 새로고침 시 한국어
- AC2 EN/KR 전환 시 모든 문구 즉시 변경
- AC3 페이지 스크롤 시작·끝이 영상 시작·끝과 대응
- AC4 역스크롤 시 영상 역방향 이동
- AC5 로더 진행률과 6초 대체 처리
- AC6 모든 앵커가 지정 위치로 이동
- AC7 카드 클릭 시 해당 상세 기록
- AC8 6단계 아카이브 탐색
- AC9 문의는 전송·저장 없이 닫을 때 초기화
- AC10 DAY ONE 네 문장 순차 표시

### 시각

- AC11 TXT 색상, 레이어, 패딩, 그리드, 카드 비율 유지
- AC12 1440px·1920px에서 문구와 CTA가 잘리지 않음
- AC13 390px에서 통계 2×2, 카드 1열, 정보와 푸터가 자연스러움
- AC14 한국어·영어 가로 스크롤과 겹침 없음
- AC15 카드 계단식 데스크톱 배치와 모바일 평면 배치
- AC16 고정 영상이 모든 섹션 뒤에 표시

### 기술

- AC17 Next.js 프로덕션 빌드 성공
- AC18 치명적 콘솔 오류 없음
- AC19 모든 미디어·폰트 로컬 로드
- AC20 데이터 전송·분석·쿠키·언어 저장 없음
- AC21 기존 TXT 보존
- AC22 승인 없는 commit, push, 배포 없음

---

## 14. 우선순위

### P0 필수

TXT 재현, 우주인 영상 스크럽, 로더, FLOWAX 브랜딩, 한·영 전환, 반응형, 단어 공개, 통계, 카드, First Arrival, 로컬 에셋.

### P1 중요

FX 심볼, 6단계 아카이브, 카드 상세, 문의 패널, DAY ONE, Git 초기화, 브라우저 검수.

### P2 향후

실제 이메일, 데이터베이스, 분석, 서브페이지, 도메인, 배포, 실제 운영 정보와 법적 고지.

---

## 15. 제외 범위

- 실제 이메일 전송
- 백엔드·데이터베이스·로그인·결제
- 분석과 쿠키
- 모바일 햄버거
- 자동 오디오
- 모션 감소 설정
- 별도 행성 회전 이미지·3D 모델
- TXT에 없는 메인 추가 효과
- 가상 또는 콘셉트 표시
- 미디어 원본 URL·출처 기록
- 배포·도메인·GitHub 업로드

---

## 16. 위험

1. 미디어 사용권: 제공 영상·이미지의 사용권이 확인되지 않아 공개 전 별도 확인이 필요하다.
2. 실재 기관 오인: 가상 안내가 없어 실제 기관이나 성과로 오인될 수 있다.
3. 모션 접근성: 전체 애니메이션으로 일부 방문자가 어지럼증을 느낄 수 있다.
4. 모바일 성능: 약 7MB 원본 영상으로 느린 연결에서 로딩이 길어질 수 있다.
5. 브라우저 차이: iPhone Safari에서 프레임 탐색이 덜 부드러울 수 있다.
6. 문의 제한: 폼은 디자인 시연용이며 실제 전송되지 않는다.

---

## 17. 단계별 실행 계획

각 단계는 로컬 사이트에서 사용자 승인 후 진행한다.

### 1단계 PRD

이 문서 검토와 수정. 승인 전 코드 제작 금지.

### 2단계 프로젝트·Git·에셋

폴더 확인, Git 초기화, Next.js 생성, TXT 보존, 미디어·폰트 배치, 로컬 실행.

### 3단계 TXT 기준 기본 화면

글로벌 스타일, 고정 영상, Hero, Mission, Stats, Logs, First Arrival, Footer, 반응형.

### 4단계 메인 애니메이션

로더, 영상 스크럽, 단어 공개, 화살표, 기존 호버.

### 5단계 확장 기능

한·영 전환, 아카이브, 카드 상세, 문의 패널, DAY ONE, FX 호버.

### 6단계 검수

프로덕션 빌드, PC·모바일 브라우저, 텍스트 넘침, 영상 실패, 키보드 조작.

### 7단계 완료 보고

작업, 파일, 테스트, 사용자 확인, 위험, Git·commit·push·배포 상태.

---

## 18. 권장 구현 방향

Next.js 단일 페이지에서 각 섹션과 전체 화면 패널을 독립 컴포넌트로 구성한다. 영상 스크럽과 단어 공개는 TXT 계산식을 직접 구현하고, 추가 패널과 DAY ONE에만 전환 애니메이션을 사용한다. 외부 서비스 없이 모든 미디어와 폰트를 로컬에서 제공한다.

---

## 19. 승인란

- [x] 브랜드·세계관
- [x] 한국어·영어 문구
- [x] 섹션 구조
- [x] 애니메이션 범위
- [x] 전체 화면 기능
- [x] 기술·반응형·검수 기준
- [x] 2단계 프로젝트 구성 시작

PRD 승인 전에는 홈페이지 코드 제작을 시작하지 않는다.
