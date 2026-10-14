# 간단한 모바일 단어장

## 2026-10-13 최종 검토

338개 전체의 정의·예시를 읽고 22개 항목을 보완했습니다. 파이썬의 특징, 패키지/라이브러리, 매개변수/인수, 버전 관리/Git/GitHub, 학습/추론, UI/UX를 구별하고 양자화·온도·Top-p·색상 코드에 쉬운 설명과 예시를 넣었습니다. 함수가 반드시 이름을 갖는다는 오해, 기본 키가 항상 단일 값이라는 오해, 외래 키가 반드시 다른 표만 참조한다는 오해를 바로잡았습니다. 기존 ID와 개념 206/디자인 132 분류는 유지했습니다.

작은 화면에서 긴 영문 보기가 내부 스크롤에 가려지고 아래쪽 선택지가 화면 밖으로 밀리는 문제를 수정했습니다. 퀴즈의 3초 제한과 520ms 정답 표시 시간은 유지했습니다.

검증: `audit.cjs`를 Playwright와 Edge로 실행했습니다. 338개 카드와 출제 데이터, 이름·ID·정의 중복, 320×568/390×844/1280×900에서 전체 문제·보기 잘림, 실제 3초 시간초과, 오답 후 재출제(10문제·12회 시도), 결과 집계, 재시작, 오답 저장 후 새로고침, 무제한 복습, 랜덤 순서, 처음↔끝 이동, 검색 결과 없음, 손상된 저장 기록, 세 가지 출제 범위, 문제 수 10~100 한도를 확인했습니다. 브라우저 실행 오류는 없었습니다. 모바일 크기는 데스크톱 Edge의 화면 크기 재현이며 실제 iOS/Android 기기 검증은 아닙니다.

재실행: Playwright가 설치된 환경에서 `node ai-service-vocabulary/audit.cjs`. 별도 경로에 설치되어 있다면 `PLAYWRIGHT_MODULE` 환경 변수로 해당 모듈 경로를 지정합니다. 화면 확인용 `audit-mobile.png`가 생성됩니다.

추가 대조 자료:
- Python: https://docs.python.org/3/tutorial/
- 출력 후보 선택 설정: https://huggingface.co/docs/transformers/main_classes/text_generation
- CORS: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS

메인 진입점: index.html. 기존 네 분야 체험형 입구는 explore.html에 보존했습니다.

개념 206개와 디자인·UI 132개를 한 장씩 표시합니다. 스피드퀴즈는 기존 JP-quiz와 같은 10~100문제 선택(기본 50), 문제당 3초, 4지선다 방식입니다. 오답·시간초과는 대기열 뒤로 보내고 정답을 맞힌 고유 문제만 완료 처리합니다. 정답 표시 후 520ms 뒤 자동 진행하며 전부 맞히면 총 도전·오답·시간초과·소요시간을 표시합니다. 오답 복습은 시간 제한 없이 선택한 복습 단어를 모두 맞힐 때까지 진행합니다. 탭을 숨기면 다음 문제 자동 전환을 멈추며 진행 중 문제의 3초 제한은 유지합니다. 화면을 전환하면 예약된 타이머를 취소합니다. 오답 ID는 이 브라우저의 localStorage에 저장하며 저장을 사용할 수 없어도 현재 세션에서 동작합니다. 브라우저·파일 URL 환경에 따라 오답 기록의 보존 범위는 다를 수 있습니다.

내용 참고:
- pip 공식 문서: https://pip.pypa.io/en/stable/
- Google 임베딩 설명: https://developers.google.com/machine-learning/crash-course/embeddings/embedding-space
- MDN opacity: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/opacity

검증: 320/390/768/1440px 화면, 단어 이동, 5문제 정답 결과, 3초 시간 초과, 오답 저장과 재로드, 복습 정답 시 제거, 화면 변경 시 타이머 취소, 스크립트 오류 없음.

개념 데이터는 terms.js에서 관리합니다. 코드·언어·파이썬부터 학습하며 한글·영문·설명·예시를 검색할 수 있습니다. 새 개념도 퀴즈·오답 복습에 자동 포함됩니다.

갤러리 4번은 모바일 단어장, 5번은 체험형단어장(explore.html)입니다. 체험형의 네 페이지는 explore.html로 돌아옵니다.

추가 내용 참고:
- Python 설치 환경: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/
- MDN JavaScript: https://developer.mozilla.org/en-US/docs/Glossary/JavaScript
- GitHub 변경 제안: https://docs.github.com/en/pull-requests/reference/pull-requests
- Anthropic 에이전트: https://www.anthropic.com/engineering/building-effective-agents

디자인 확장: 레이어·파일 형식·이미지 편집·색상·타이포그래피·레이아웃·화면 설계·동작 상태·접근성. 총 263개(개념 151 + 디자인·UI 112). 신규 항목도 검색·퀴즈·오답 복습에서 동일하게 사용합니다.

디자인 내용 참고:
- MDN 이미지 형식: https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types
- Adobe 레이어: https://helpx.adobe.com/photoshop/desktop/create-manage-layers/create-layer-compositions/create-layers-and-layer-groups.html
- Adobe 마스크: https://helpx.adobe.com/photoshop/desktop/create-masks/layer-masks/add-layer-masks.html
- MDN 행 높이: https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/line-height
- MDN 반응형 디자인: https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design

단어장은 새로고침마다 한 번 전체 순서를 섞으며, 검색·분류 전환 중에는 그 순서를 유지합니다. 이전·다음은 양 끝에서 순환하며 검색 결과가 없거나 한 개면 버튼을 비활성화합니다. 이동 버튼은 화면 하단에 고정하고 가려지지 않도록 하단 공간을 확보했습니다.
검증: 무작위 순서, 처음/끝 순환, 카드 길이별 버튼 좌표, 오답/시간초과 재출제, 10문제 완료 통계, 다시 하기, 화면 전환 시 타이머 취소, 모바일 가로 넘침.

직관적·일상적인 항목 정리: 33개 제거. 제거 항목은 프로그램, 파일, 폴더, 프로젝트, 코드 편집기, 설치, 테스트, 이미지 크기, 투명 배경, 그룹, 크롭, 리사이즈, 회전, 뒤집기, 정렬, 간격 균등 분배, 채우기, 선, 선명하게 하기, 배경 제거, 색상, 밝기, 강조색, 서체, 폰트, 글자 크기, 글자 두께, 텍스트 정렬, 줄바꿈, 말줄임, 공백, 스크롤, 로딩 상태. 단어장·퀴즈 모두 terms.js에서 읽으며, 기존 오답 기록 중 제거된 ID는 로드 시 걸러 저장합니다. PNG·레이어·캐시·파이썬·RGB·커닝처럼 별도 설명이 필요한 용어는 유지합니다.

UI 용어 30개 추가: 내비게이션, 헤더, 푸터, 사이드바, 메뉴, 드롭다운, 체크박스, 라디오 버튼, 스위치, 텍스트 필드, 텍스트 영역, 검색창, 아코디언, 탭, 브레드크럼, 페이지네이션, 모달 대화상자, 툴팁, 토스트, 배지, 카드, 아바타, 진행률 표시줄, 로딩 스피너, 스켈레톤, 하단 내비게이션, 바텀 시트, 날짜 선택기, 슬라이더, 자동완성. 검색·퀴즈·오답 복습에 동일한 데이터가 사용됩니다. 내비게이터/네비게이터, 풋터, 메뉴박스 등 자주 쓰는 표현은 설명에 포함하고 영문은 Navigation, Footer, Menu로 표기합니다.
참고: https://mui.com/material-ui/all-components/ , https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/nav , https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/footer

AI 용어 50개 확장: 현재 총 263개(개념 151 + 디자인·UI 112). ID·한글명·영문명·정의의 중복을 대소문자와 공백 등을 정규화해 검사했습니다. 기존 Prompt, Context, Model, Agent, Token, Cache, Embedding, RAG, Tool Calling은 새 이름으로 반복 추가하지 않았습니다. 상위/하위 또는 연관 개념은 차이를 설명했습니다: 모달리티/멀티모달, 플러그인/커넥터/스킬/MCP, 컨텍스트/윈도/메모리/압축, 학습/추론/파인튜닝, RAG/그라운딩/의미 검색, 평가/벤치마크, 양자화/증류.
참고 자료:
- MCP: https://modelcontextprotocol.io/specification/draft/server/index
- Skills: https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills
- Context: https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Text generation: https://huggingface.co/docs/transformers/llm_tutorial
- Sampling: https://huggingface.co/docs/transformers/v5.1.0/en/main_classes/text_generation

서버·백엔드 개념 35개 추가: 현재 총 298개(개념 186 + 디자인·UI 112). 기존 인증·권한·세션·쿠키·캐시·요청 제한·서버·백엔드는 반복 추가하지 않았습니다. 입력 검증, 데이터 관계와 저장 일관성, 외부 서비스 통신, 비밀값과 접근 증표, 운영 환경과 상태 확인에 초점을 맞췄습니다. 타임아웃/실제 취소, 큐 접수/완료, OAuth/로그인, CORS/접근 권한, AI 토큰/액세스 토큰을 구별해 설명합니다.
참고: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status , https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS , https://stripe.com/blog/idempotency , https://docs.stripe.com/api/webhook_endpoints , https://www.postgresql.org/docs/15/sql-createindex.html

실용·모바일 확장: 40개 추가, 현재 총 338개(개념 206 + 디자인·UI 132). 일반 개념/일반 UI/모바일 개념/모바일 UI 각각 10개. 분류 기준은 외관·공간·조작·상태 안내는 visual, 실행·통신·저장·권한·공격 원리는 concept입니다. 모바일 신규 20개에는 모바일 검색 태그를 붙였습니다.
중복 검토: 캐시/영속성, 백그라운드 작업/앱 생명주기, 권한 부여/기기 런타임 권한, 입력값 검증/인라인 검증, 지연 로딩/목록 가상화, 토스트/푸시 알림, 스크롤/스와이프 액션, 반응형/적응형, 일반 오류 처리/오류 상태를 별개 목적에 맞춰 구별했습니다. 기존 용어는 재분류하거나 삭제하지 않았습니다.
참고: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation , https://developer.android.com/training/app-links/create-deeplinks , https://m3.material.io/foundations/layout/canonical-examples/overview
