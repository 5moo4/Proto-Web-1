// Specialized beginner vocabulary. Plain data, shared by flashcards and quizzes.
const terms = [
  {
    "id": "concept-code",
    "category": "concept",
    "ko": "코드",
    "en": "Code",
    "definition": "컴퓨터가 할 일을 적어 둔 명령문.",
    "example": "AI에게 “코드를 수정해 줘”라고 하면 컴퓨터에 전달할 명령문을 고치는 거예요."
  },
  {
    "id": "concept-programming-language",
    "category": "concept",
    "ko": "프로그래밍 언어",
    "en": "Programming Language",
    "definition": "컴퓨터에 명령을 적을 때 사용하는 규칙과 표현의 체계.",
    "example": "사람이 한국어나 영어로 말하듯, 프로그램을 만들 때도 정해진 언어를 사용해요."
  },
  {
    "id": "concept-python",
    "category": "concept",
    "ko": "파이썬",
    "en": "Python",
    "definition": "자동화·데이터 분석·AI 개발에 널리 쓰며, 들여쓰기로 코드의 묶음을 구분하는 프로그래밍 언어.",
    "example": "컴퓨터에 일을 시키는 언어의 이름이에요. 예를 들어 엑셀 자료를 읽어 합계를 내는 작업을 만들 수 있어요. 이 언어로 쓴 파일은 보통 .py로 끝나요."
  },
  {
    "id": "cache",
    "category": "concept",
    "ko": "캐시",
    "en": "Cache",
    "definition": "다시 쓸 정보를 임시로 보관해 반복 작업을 줄이는 것.",
    "example": "같은 정보를 매번 새로 가져오지 않고 저장해 둔 결과를 꺼내요. 오래된 정보가 남으면 비우기도 해요."
  },
  {
    "id": "embedding",
    "category": "concept",
    "ko": "임베딩",
    "en": "Embedding",
    "definition": "글이나 이미지의 특징을 숫자 묶음으로 표현하는 것.",
    "example": "비슷한 뜻의 문장을 찾는 데 써요. “강아지”와 “반려견”의 관련성을 숫자로 비교하는 식이에요."
  },
  {
    "id": "library",
    "category": "concept",
    "ko": "라이브러리",
    "en": "Library",
    "definition": "필요할 때 가져다 쓰는, 미리 만들어진 코드 모음.",
    "example": "날짜 계산 기능을 처음부터 만들지 않고 가져다 써요. 라이브러리는 재사용할 기능에, 패키지는 설치·배포할 수 있게 포장한 단위에 초점이 있어요. 라이브러리를 패키지로 설치하기도 해요."
  },
  {
    "id": "pip",
    "category": "concept",
    "ko": "핍",
    "en": "pip",
    "definition": "파이썬이라는 컴퓨터 명령 언어에서 쓸 기능 꾸러미를 설치하는 도구.",
    "example": "날씨 정보를 받아오는 기능처럼, 남이 만들어 둔 코드 묶음을 가져올 때 써요. pip는 언어가 아니라 설치 도구예요."
  },
  {
    "id": "api",
    "category": "concept",
    "ko": "API",
    "en": "API",
    "definition": "프로그램끼리 정해진 방식으로 기능이나 데이터를 주고받는 접점.",
    "example": "내 앱에서 날씨 서비스에 정보를 요청해 기온을 받아와요."
  },
  {
    "id": "variable",
    "category": "concept",
    "ko": "변수",
    "en": "Variable",
    "definition": "프로그램에서 값을 가리키도록 붙여 둔 이름.",
    "example": "“점수”라는 이름으로 현재 점수 10을 기억하고 계산에 사용해요."
  },
  {
    "id": "database",
    "category": "concept",
    "ko": "데이터베이스",
    "en": "Database",
    "definition": "데이터를 체계적으로 저장하고 찾아보는 시스템.",
    "example": "회원 이름이나 주문 내역을 저장하고 필요한 기록을 찾아요."
  },
  {
    "id": "dependency",
    "category": "concept",
    "ko": "의존성",
    "en": "Dependency",
    "definition": "내 프로그램이 동작하는 데 필요한 다른 코드나 기능 묶음.",
    "example": "사진 편집 앱이 다른 사람이 만든 이미지 처리 기능을 쓰면, 그 기능이 앱의 의존성이에요."
  },
  {
    "id": "concept-javascript",
    "category": "concept",
    "ko": "자바스크립트",
    "en": "JavaScript",
    "definition": "웹페이지의 동작 등을 만들 때 사용하는 프로그래밍 언어.",
    "example": "버튼을 누르면 계산 결과를 보여주는 일을 시킬 수 있어요. 서버 쪽에서도 사용할 수 있어요."
  },
  {
    "id": "concept-typescript",
    "category": "concept",
    "ko": "타입스크립트",
    "en": "TypeScript",
    "definition": "자바스크립트에 값의 종류를 확인하는 규칙을 더한 언어.",
    "example": "숫자가 필요한 자리에 글자를 잘못 넣는 실수를 실행 전에 찾는 데 도움을 줘요."
  },
  {
    "id": "concept-source-code",
    "category": "concept",
    "ko": "소스 코드",
    "en": "Source Code",
    "definition": "사람이 읽고 수정할 수 있는 형태로 적은 프로그램의 원본.",
    "example": "AI가 만든 기능을 바꾸려면 원본 코드 파일을 수정해요."
  },
  {
    "id": "concept-file-path",
    "category": "concept",
    "ko": "파일 경로",
    "en": "File Path",
    "definition": "파일이나 폴더가 어디에 있는지 나타내는 주소.",
    "example": "“사진 폴더 안의 고양이 사진”처럼 컴퓨터 안의 위치를 가리켜요."
  },
  {
    "id": "concept-file-extension",
    "category": "concept",
    "ko": "파일 확장자",
    "en": "File Extension",
    "definition": "파일 이름 끝에서 파일의 종류를 나타내는 부분.",
    "example": "photo.png의 .png는 이미지 종류를, main.py의 .py는 파이썬 코드 파일을 나타내요."
  },
  {
    "id": "concept-terminal",
    "category": "concept",
    "ko": "터미널",
    "en": "Terminal",
    "definition": "글자로 명령을 입력해 컴퓨터를 조작하는 창.",
    "example": "AI가 “이 명령을 실행하세요”라고 하면 이 창에 명령을 입력하는 경우가 많아요."
  },
  {
    "id": "concept-command-line-interface",
    "category": "concept",
    "ko": "명령줄 인터페이스",
    "en": "Command-line Interface",
    "definition": "명령어를 글자로 입력해 기능을 사용하는 방식.",
    "example": "버튼 대신 “설치해”, “실행해”에 해당하는 명령을 적어요. 줄여서 CLI라고 해요."
  },
  {
    "id": "concept-command",
    "category": "concept",
    "ko": "명령어",
    "en": "Command",
    "definition": "컴퓨터나 도구에 특정 작업을 시키는 지시.",
    "example": "폴더를 만들거나 프로그램을 실행하는 지시를 한 줄로 입력할 수 있어요."
  },
  {
    "id": "concept-package",
    "category": "concept",
    "ko": "패키지",
    "en": "Package",
    "definition": "설치하거나 배포할 수 있도록 묶어 놓은 코드와 관련 파일.",
    "example": "배송 상자에 물건과 안내서를 함께 담듯, 코드와 필요한 파일을 설치할 수 있게 묶어요. 안에는 재사용할 기능 모음인 라이브러리가 들어갈 수도 있어요."
  },
  {
    "id": "concept-package-manager",
    "category": "concept",
    "ko": "패키지 관리자",
    "en": "Package Manager",
    "definition": "필요한 코드 묶음의 설치·업데이트·제거를 관리하는 도구.",
    "example": "꾸러미마다 필요한 다른 꾸러미도 함께 설치해 줄 수 있어요."
  },
  {
    "id": "concept-npm",
    "category": "concept",
    "ko": "npm",
    "en": "npm",
    "definition": "주로 자바스크립트용 코드 묶음을 설치하고 관리하는 도구.",
    "example": "AI가 npm install을 안내하면 프로젝트에 필요한 코드 묶음을 준비하는 작업일 수 있어요."
  },
  {
    "id": "concept-node-js",
    "category": "concept",
    "ko": "노드제이에스",
    "en": "Node.js",
    "definition": "자바스크립트를 웹브라우저 밖에서도 실행하게 해 주는 환경.",
    "example": "브라우저를 열지 않고도 자바스크립트로 서버나 자동 작업을 실행할 수 있어요."
  },
  {
    "id": "concept-runtime",
    "category": "concept",
    "ko": "런타임",
    "en": "Runtime",
    "definition": "프로그램을 실행하는 데 필요한 환경이나 실행 체계.",
    "example": "요리법이 있어도 주방이 필요하듯, 코드를 실행하려면 맞는 실행 환경이 필요해요."
  },
  {
    "id": "concept-virtual-environment",
    "category": "concept",
    "ko": "가상 환경",
    "en": "Virtual Environment",
    "definition": "프로젝트별로 설치한 도구와 코드 묶음을 분리하는 공간.",
    "example": "한 작업에 필요한 버전이 다른 작업에 영향을 주지 않도록 나눠요. 여기서는 파이썬 작업 환경을 뜻해요."
  },
  {
    "id": "concept-framework",
    "category": "concept",
    "ko": "프레임워크",
    "en": "Framework",
    "definition": "앱을 만들 때 기본 구조와 작업 방식을 제공하는 코드 틀.",
    "example": "방마다 뼈대를 직접 세우는 대신, 준비된 구조 안에 필요한 기능을 채우는 느낌이에요."
  },
  {
    "id": "concept-module",
    "category": "concept",
    "ko": "모듈",
    "en": "Module",
    "definition": "관련된 코드를 하나의 단위로 나눈 것.",
    "example": "로그인 기능과 결제 기능을 따로 정리해 필요한 부분을 가져다 쓸 수 있어요."
  },
  {
    "id": "concept-function",
    "category": "concept",
    "ko": "함수",
    "en": "Function",
    "definition": "필요할 때 불러 실행할 수 있도록 묶어 둔 작업 단위.",
    "example": "가격과 수량을 주면 총액을 계산하는 작업을 만들어 여러 번 불러요. 보통 이름을 붙여 사용하지만 이름 없는 함수도 있어요."
  },
  {
    "id": "concept-parameter",
    "category": "concept",
    "ko": "매개변수",
    "en": "Parameter",
    "definition": "작업을 만들 때, 전달받을 값의 자리에 붙여 놓은 이름.",
    "example": "“가격 × 수량”을 계산하는 함수를 만들면 가격·수량이 입력 자리의 이름이에요. 실제로 넣는 1,000원·2개는 인수라고 불러요."
  },
  {
    "id": "concept-argument",
    "category": "concept",
    "ko": "인자",
    "en": "Argument",
    "definition": "작업을 불러 실행할 때 입력 자리에 실제로 전달하는 값.",
    "example": "“가격 × 수량”을 계산하는 함수에 1,000원과 2개를 넣으면 이 두 값이 인수예요. 입력 자리의 이름인 가격·수량은 매개변수예요."
  },
  {
    "id": "concept-return-value",
    "category": "concept",
    "ko": "반환값",
    "en": "Return Value",
    "definition": "함수가 작업을 마친 뒤 호출한 곳에 돌려주는 값.",
    "example": "합계를 계산하는 작업에 3과 5를 넣고 8을 돌려받아요."
  },
  {
    "id": "concept-data-type",
    "category": "concept",
    "ko": "자료형",
    "en": "Data Type",
    "definition": "값이 숫자인지 글자인지 등을 구분하는 종류.",
    "example": "10과 “열”은 의미가 비슷해도 컴퓨터가 다루는 값의 종류는 달라요."
  },
  {
    "id": "concept-string",
    "category": "concept",
    "ko": "문자열",
    "en": "String",
    "definition": "글자들을 이어 놓은 데이터.",
    "example": "이름, 이메일 주소, “안녕하세요” 같은 글자 정보를 뜻해요. 글자로 저장된 숫자도 포함돼요."
  },
  {
    "id": "concept-boolean",
    "category": "concept",
    "ko": "불리언",
    "en": "Boolean",
    "definition": "참과 거짓, 두 가지 중 하나만 나타내는 값.",
    "example": "로그인했는지 여부를 참 또는 거짓으로 저장해요."
  },
  {
    "id": "concept-array",
    "category": "concept",
    "ko": "배열",
    "en": "Array",
    "definition": "여러 값을 순서가 있는 목록으로 묶은 것.",
    "example": "장바구니 상품을 첫째, 둘째, 셋째처럼 순서대로 담아둘 수 있어요."
  },
  {
    "id": "concept-object",
    "category": "concept",
    "ko": "객체",
    "en": "Object",
    "definition": "이름이 붙은 여러 값이나 동작을 한데 묶어 다루는 단위.",
    "example": "한 회원의 이름, 나이, 이메일을 각각의 이름표와 함께 묶어요."
  },
  {
    "id": "concept-null",
    "category": "concept",
    "ko": "널",
    "en": "Null",
    "definition": "값이 없음을 나타내기 위해 사용하는 특별한 값.",
    "example": "아직 정하지 않은 배송 날짜를 나타낼 수 있어요. 숫자 0이나 빈 글자와는 구별돼요."
  },
  {
    "id": "concept-conditional-statement",
    "category": "concept",
    "ko": "조건문",
    "en": "Conditional Statement",
    "definition": "조건에 따라 실행할 일을 나누는 명령.",
    "example": "로그인했다면 내용을 보여주고, 아니면 로그인 안내를 보여줘요."
  },
  {
    "id": "concept-loop",
    "category": "concept",
    "ko": "반복문",
    "en": "Loop",
    "definition": "같은 작업을 여러 번 수행하도록 하는 명령.",
    "example": "회원 100명의 이름을 한 명씩 처리할 때 같은 작업을 반복해요."
  },
  {
    "id": "concept-exception",
    "category": "concept",
    "ko": "예외",
    "en": "Exception",
    "definition": "실행 중 정상적인 진행을 벗어난 상황을 알리는 신호.",
    "example": "읽으려는 파일이 없으면 그 상황을 알리고 다른 처리를 하도록 만들 수 있어요."
  },
  {
    "id": "concept-error-handling",
    "category": "concept",
    "ko": "오류 처리",
    "en": "Error Handling",
    "definition": "문제가 생겼을 때 어떻게 대응할지 정하는 것.",
    "example": "인터넷 연결이 끊기면 앱이 멈추는 대신 다시 시도하라는 안내를 보여줘요."
  },
  {
    "id": "concept-asynchronous-processing",
    "category": "concept",
    "ko": "비동기 처리",
    "en": "Asynchronous Processing",
    "definition": "작업이 끝나기를 기다리는 동안 다른 일을 진행할 수 있게 하는 방식.",
    "example": "사진을 받아오는 동안에도 사용자가 다른 버튼을 누를 수 있게 만들어요."
  },
  {
    "id": "concept-bug",
    "category": "concept",
    "ko": "버그",
    "en": "Bug",
    "definition": "프로그램이 의도와 다르게 동작하게 만드는 문제.",
    "example": "수량이 2개인데 합계는 1개 가격으로 나오는 것도 버그예요."
  },
  {
    "id": "concept-debugging",
    "category": "concept",
    "ko": "디버깅",
    "en": "Debugging",
    "definition": "프로그램 문제의 원인을 찾아 고치는 과정.",
    "example": "잘못된 합계가 어디서 생겼는지 계산 과정을 따라가며 확인해요."
  },
  {
    "id": "concept-log",
    "category": "concept",
    "ko": "로그",
    "en": "Log",
    "definition": "프로그램이 실행 중 남기는 사건과 상태의 기록.",
    "example": "몇 시에 주문을 받았고 어디서 실패했는지 추적하는 데 써요."
  },
  {
    "id": "concept-stack-trace",
    "category": "concept",
    "ko": "스택 트레이스",
    "en": "Stack Trace",
    "definition": "문제가 생긴 곳까지 어떤 작업들을 거쳤는지 보여주는 호출 기록.",
    "example": "오류 메시지 아래의 파일 이름과 줄 번호가 원인을 찾는 단서가 될 수 있어요."
  },
  {
    "id": "concept-unit-test",
    "category": "concept",
    "ko": "단위 테스트",
    "en": "Unit Test",
    "definition": "작은 기능 하나를 따로 떼어 검사하는 테스트.",
    "example": "가격 계산 함수 하나에 여러 숫자를 넣어 계산이 맞는지 확인해요."
  },
  {
    "id": "concept-integration-test",
    "category": "concept",
    "ko": "통합 테스트",
    "en": "Integration Test",
    "definition": "여러 기능을 연결했을 때 함께 잘 동작하는지 확인하는 테스트.",
    "example": "주문 접수 기능과 주문 저장 기능을 연결해 검사해요."
  },
  {
    "id": "concept-regression-test",
    "category": "concept",
    "ko": "회귀 테스트",
    "en": "Regression Test",
    "definition": "코드를 바꾼 뒤 기존에 되던 기능이 망가지지 않았는지 확인하는 테스트.",
    "example": "결제 기능을 고친 뒤 로그인과 장바구니도 여전히 되는지 확인해요."
  },
  {
    "id": "concept-refactoring",
    "category": "concept",
    "ko": "리팩터링",
    "en": "Refactoring",
    "definition": "겉으로 드러나는 동작은 유지하면서 코드의 내부 구조를 정리하는 작업.",
    "example": "같은 기능을 더 읽기 쉽고 수정하기 쉽게 정돈해요."
  },
  {
    "id": "concept-technical-debt",
    "category": "concept",
    "ko": "기술 부채",
    "en": "Technical Debt",
    "definition": "지금의 구현 방식 때문에 나중에 추가로 생길 수 있는 수정·관리 부담.",
    "example": "급하게 만든 부분을 그대로 두면 새 기능을 붙일 때 더 많은 손질이 필요할 수 있어요."
  },
  {
    "id": "concept-version-control",
    "category": "concept",
    "ko": "버전 관리",
    "en": "Version Control",
    "definition": "파일의 변경 이력을 남기고 비교·복구하는 방식.",
    "example": "어제 되던 코드와 오늘 바뀐 코드를 비교하고 필요한 상태로 돌아갈 수 있어요."
  },
  {
    "id": "concept-git",
    "category": "concept",
    "ko": "깃",
    "en": "Git",
    "definition": "프로젝트의 변경 이력을 각 컴퓨터에 보관하며 기록·비교·병합하는 버전 관리 도구.",
    "example": "AI가 고친 파일을 이전 상태와 비교하거나 별도 작업을 합칠 때 써요. 버전 관리는 작업 방식의 이름, Git은 그 일을 하는 도구, GitHub는 온라인 협업 서비스예요."
  },
  {
    "id": "concept-github",
    "category": "concept",
    "ko": "깃허브",
    "en": "GitHub",
    "definition": "Git으로 관리하는 프로젝트를 온라인에 보관하고 협업하는 서비스.",
    "example": "코드를 공유하고 변경 제안을 검토하는 곳이에요. Git 자체와는 다른 서비스예요."
  },
  {
    "id": "concept-repository",
    "category": "concept",
    "ko": "저장소",
    "en": "Repository",
    "definition": "프로젝트 파일과 변경 이력을 모아 관리하는 공간.",
    "example": "한 앱의 코드와 그 수정 기록을 함께 보관해요. 여기서는 코드 저장소를 뜻해요."
  },
  {
    "id": "concept-commit",
    "category": "concept",
    "ko": "커밋",
    "en": "Commit",
    "definition": "변경한 내용을 하나의 기록으로 남기는 것.",
    "example": "“로그인 오류 수정”이라는 설명과 함께 이번 변경을 기록해요."
  },
  {
    "id": "concept-branch",
    "category": "concept",
    "ko": "브랜치",
    "en": "Branch",
    "definition": "기존 작업에서 갈라져 별도로 변경을 진행하는 작업 흐름.",
    "example": "현재 잘 되는 버전을 유지하면서 새 기능을 따로 만들어 볼 수 있어요."
  },
  {
    "id": "concept-merge",
    "category": "concept",
    "ko": "머지",
    "en": "Merge",
    "definition": "나뉘어 작업한 변경 내용을 합치는 것.",
    "example": "별도로 만든 검색 기능을 기본 작업 흐름에 합쳐요."
  },
  {
    "id": "concept-merge-conflict",
    "category": "concept",
    "ko": "충돌",
    "en": "Merge Conflict",
    "definition": "변경 내용을 합칠 때 도구가 자동으로 선택하지 못하는 상황.",
    "example": "두 작업에서 같은 문장을 다르게 고쳤다면 어느 내용을 남길지 정해야 해요."
  },
  {
    "id": "concept-pull-request",
    "category": "concept",
    "ko": "풀 리퀘스트",
    "en": "Pull Request",
    "definition": "내 변경을 프로젝트에 합쳐 달라고 제안하는 요청.",
    "example": "바꾼 코드와 이유를 보여주고 검토받은 뒤 합칠 수 있어요."
  },
  {
    "id": "concept-push",
    "category": "concept",
    "ko": "푸시",
    "en": "Push",
    "definition": "내 컴퓨터의 변경 기록을 연결된 원격 저장소로 보내는 것.",
    "example": "내 컴퓨터에서 기록한 수정 내용을 온라인 코드 보관소에 올려요."
  },
  {
    "id": "concept-client",
    "category": "concept",
    "ko": "클라이언트",
    "en": "Client",
    "definition": "다른 컴퓨터나 프로그램에 서비스를 요청하는 쪽.",
    "example": "날씨 정보를 요청하는 휴대폰 앱이나 웹브라우저가 해당돼요."
  },
  {
    "id": "concept-server",
    "category": "concept",
    "ko": "서버",
    "en": "Server",
    "definition": "요청을 받아 데이터나 기능을 제공하는 프로그램 또는 컴퓨터.",
    "example": "날씨 요청이 오면 저장된 정보를 찾아 보내주는 쪽이에요."
  },
  {
    "id": "concept-frontend",
    "category": "concept",
    "ko": "프론트엔드",
    "en": "Frontend",
    "definition": "사용자가 접하고 조작하는 부분을 담당하는 프로그램 영역.",
    "example": "보이는 화면뿐 아니라 버튼을 눌렀을 때 화면이 바뀌는 동작도 맡아요."
  },
  {
    "id": "concept-backend",
    "category": "concept",
    "ko": "백엔드",
    "en": "Backend",
    "definition": "요청 처리와 데이터 관리 등 화면 뒤의 기능을 담당하는 프로그램 영역.",
    "example": "로그인 정보를 확인하거나 주문을 저장하는 일을 맡아요."
  },
  {
    "id": "concept-request",
    "category": "concept",
    "ko": "요청",
    "en": "Request",
    "definition": "다른 프로그램에 정보 조회나 작업 실행을 요구하며 보내는 메시지.",
    "example": "앱이 서버에 “이 상품의 가격을 알려줘” 또는 “이 주문을 저장해 줘”라고 보내요. 서버가 돌려주는 결과는 응답이에요."
  },
  {
    "id": "concept-response",
    "category": "concept",
    "ko": "응답",
    "en": "Response",
    "definition": "요청을 받은 쪽이 돌려주는 결과 메시지.",
    "example": "서버가 상품 가격이나 실패 이유를 앱에 보내줘요."
  },
  {
    "id": "concept-endpoint",
    "category": "concept",
    "ko": "엔드포인트",
    "en": "Endpoint",
    "definition": "특정 기능에 요청을 보내기 위해 정해 놓은 접점이나 주소.",
    "example": "회원 조회와 주문 조회에 서로 다른 요청 주소를 사용할 수 있어요."
  },
  {
    "id": "concept-http",
    "category": "concept",
    "ko": "HTTP",
    "en": "HTTP",
    "definition": "웹에서 요청과 응답을 주고받는 약속.",
    "example": "브라우저와 서버가 정보를 어떤 형식으로 주고받을지 정해요. 자체적으로 통신을 암호화하지는 않아요."
  },
  {
    "id": "concept-https",
    "category": "concept",
    "ko": "HTTPS",
    "en": "HTTPS",
    "definition": "주고받는 내용을 암호화해 보호하는 HTTP 연결 방식.",
    "example": "통신 중 내용을 보호하지만, 사이트 내용까지 믿을 만하다는 뜻은 아니에요."
  },
  {
    "id": "concept-json",
    "category": "concept",
    "ko": "JSON",
    "en": "JSON",
    "definition": "글자 형태로 구조화된 데이터를 주고받는 형식.",
    "example": "이름과 나이처럼 이름표가 붙은 값을 일정한 규칙으로 묶어 전달해요."
  },
  {
    "id": "concept-table",
    "category": "concept",
    "ko": "테이블",
    "en": "Table",
    "definition": "데이터베이스에서 데이터를 행과 열로 모아 놓은 구조.",
    "example": "회원 목록에서 한 줄은 한 회원, 각 칸은 이름이나 가입일이 될 수 있어요."
  },
  {
    "id": "concept-record",
    "category": "concept",
    "ko": "레코드",
    "en": "Record",
    "definition": "저장된 데이터에서 한 항목에 해당하는 값들의 묶음.",
    "example": "회원 목록의 한 사람에 해당하는 이름·이메일·가입일 묶음이에요."
  },
  {
    "id": "concept-query",
    "category": "concept",
    "ko": "쿼리",
    "en": "Query",
    "definition": "데이터베이스에 필요한 데이터를 요청하거나 변경을 지시하는 내용.",
    "example": "“이번 달 주문만 찾아줘”처럼 조건을 정해 저장된 정보를 다뤄요."
  },
  {
    "id": "concept-sql",
    "category": "concept",
    "ko": "SQL",
    "en": "SQL",
    "definition": "주로 표 형태의 데이터를 저장하는 시스템에 조회·변경을 지시하는 언어.",
    "example": "저장된 회원을 찾거나 주문 기록을 추가할 때 사용할 수 있어요."
  },
  {
    "id": "concept-database-schema",
    "category": "concept",
    "ko": "데이터베이스 스키마",
    "en": "Database Schema",
    "definition": "저장할 데이터의 구조와 규칙을 정해 놓은 것.",
    "example": "회원에게 이름과 이메일을 저장할지, 이메일을 꼭 입력해야 할지 정해요."
  },
  {
    "id": "concept-database-migration",
    "category": "concept",
    "ko": "마이그레이션",
    "en": "Database Migration",
    "definition": "저장된 데이터의 구조 등을 단계적으로 바꾸는 작업.",
    "example": "회원 정보에 생일 항목을 추가할 때 기존 데이터를 고려해 구조를 바꿔요."
  },
  {
    "id": "concept-backup",
    "category": "concept",
    "ko": "백업",
    "en": "Backup",
    "definition": "문제에 대비해 따로 보관해 둔 데이터 사본.",
    "example": "실수로 주문 기록을 지웠을 때 복구할 수 있도록 사본을 남겨요."
  },
  {
    "id": "concept-authentication",
    "category": "concept",
    "ko": "인증",
    "en": "Authentication",
    "definition": "접근하려는 사람이 누구인지 확인하는 과정.",
    "example": "로그인할 때 비밀번호 등으로 계정 주인이 맞는지 확인해요."
  },
  {
    "id": "concept-authorization",
    "category": "concept",
    "ko": "권한 부여",
    "en": "Authorization",
    "definition": "어떤 사람이나 프로그램이 무엇을 할 수 있는지 결정하는 것.",
    "example": "로그인한 사용자라도 관리자만 회원 삭제를 할 수 있게 정해요."
  },
  {
    "id": "concept-encryption",
    "category": "concept",
    "ko": "암호화",
    "en": "Encryption",
    "definition": "정해진 열쇠가 있어야 내용을 읽을 수 있도록 데이터를 바꾸는 것.",
    "example": "내용을 전달하는 도중 다른 사람이 쉽게 읽지 못하게 보호해요."
  },
  {
    "id": "concept-api-key",
    "category": "concept",
    "ko": "API 키",
    "en": "API Key",
    "definition": "프로그램이 외부 기능을 사용할 때 호출자를 구분하거나 접근을 허용하는 데 쓰는 값.",
    "example": "날씨 서비스를 호출할 때 사용하는 키예요. 비밀로 발급된 키는 공개 코드에 넣으면 안 돼요."
  },
  {
    "id": "concept-environment-variable",
    "category": "concept",
    "ko": "환경 변수",
    "en": "Environment Variable",
    "definition": "프로그램의 실행 환경에서 전달하는 설정값.",
    "example": "같은 코드라도 시험용 저장소와 실제 서비스 저장소를 다르게 지정할 수 있어요."
  },
  {
    "id": "concept-session",
    "category": "concept",
    "ko": "세션",
    "en": "Session",
    "definition": "여러 번의 요청을 하나의 이용 흐름으로 이어서 관리하는 상태.",
    "example": "페이지를 옮겨도 로그인한 이용자인지 이어서 확인할 때 사용할 수 있어요."
  },
  {
    "id": "concept-cookie",
    "category": "concept",
    "ko": "쿠키",
    "en": "Cookie",
    "definition": "웹사이트가 브라우저에 저장하게 하고 이후 요청에 함께 보낼 수 있는 작은 데이터.",
    "example": "로그인 상태를 확인하는 표식 등을 담을 수 있어요. 민감한 정보를 함부로 넣으면 안 돼요."
  },
  {
    "id": "concept-deployment",
    "category": "concept",
    "ko": "배포",
    "en": "Deployment",
    "definition": "만든 프로그램을 사용할 환경에 반영하는 작업.",
    "example": "내 컴퓨터에서 고친 기능을 실제 서비스에 적용해 다른 사람도 사용하게 해요."
  },
  {
    "id": "concept-hosting",
    "category": "concept",
    "ko": "호스팅",
    "en": "Hosting",
    "definition": "서비스 파일이나 프로그램이 동작할 공간과 자원을 제공하는 것.",
    "example": "내 컴퓨터를 꺼도 다른 서버에서 사이트가 계속 실행되도록 맡길 수 있어요."
  },
  {
    "id": "concept-domain-name",
    "category": "concept",
    "ko": "도메인",
    "en": "Domain Name",
    "definition": "인터넷에서 사용하는, 사람이 기억하기 쉬운 이름.",
    "example": "사이트를 찾을 때 복잡한 숫자 주소 대신 이름을 입력할 수 있게 해요."
  },
  {
    "id": "concept-dns",
    "category": "concept",
    "ko": "DNS",
    "en": "DNS",
    "definition": "도메인 이름에 대응하는 주소 등의 정보를 찾아주는 시스템.",
    "example": "사이트 이름을 입력하면 연결할 컴퓨터의 주소를 찾는 데 사용돼요."
  },
  {
    "id": "concept-build",
    "category": "concept",
    "ko": "빌드",
    "en": "Build",
    "definition": "원본 코드를 실행하거나 배포하기 알맞은 형태로 준비하는 과정.",
    "example": "코드를 변환하고 필요한 파일을 모으는 작업 등이 포함될 수 있어요."
  },
  {
    "id": "concept-localhost",
    "category": "concept",
    "ko": "로컬호스트",
    "en": "Localhost",
    "definition": "지금 사용하는 컴퓨터 자체를 가리키는 이름.",
    "example": "내 컴퓨터에서 만든 서비스를 시험할 때 사용해요. 다른 사람의 컴퓨터에서는 그 사람 자신을 가리켜요."
  },
  {
    "id": "concept-port",
    "category": "concept",
    "ko": "포트",
    "en": "Port",
    "definition": "한 컴퓨터에서 통신할 프로그램을 구분하는 번호.",
    "example": "같은 컴퓨터에서 여러 서비스를 실행하면 서로 다른 번호로 접속 대상을 구분할 수 있어요."
  },
  {
    "id": "concept-rollback",
    "category": "concept",
    "ko": "롤백",
    "en": "Rollback",
    "definition": "변경을 취소하거나 이전 상태로 되돌리는 작업.",
    "example": "새 버전에 문제가 생겼을 때 이전 버전으로 돌려요. 저장 데이터까지 자동으로 복구되는 것은 아니에요."
  },
  {
    "id": "concept-prompt",
    "category": "concept",
    "ko": "프롬프트",
    "en": "Prompt",
    "definition": "AI에 전달하는 질문·요청·지시 등의 입력.",
    "example": "“비밀번호를 잊었을 때 재설정하는 기능을 만들어줘”처럼 원하는 일을 설명해요."
  },
  {
    "id": "concept-model",
    "category": "concept",
    "ko": "모델",
    "en": "Model",
    "definition": "학습한 패턴을 바탕으로 입력을 처리하고 결과를 만드는 AI의 핵심 체계.",
    "example": "같은 질문이라도 선택한 모델에 따라 답변의 특성이 달라질 수 있어요."
  },
  {
    "id": "concept-token",
    "category": "concept",
    "ko": "토큰",
    "en": "Token",
    "definition": "AI가 글 등을 처리할 때 사용하는 작은 단위.",
    "example": "한 단어가 여러 조각으로 나뉠 수 있어요. 글자 수나 단어 수와 항상 같지는 않아요."
  },
  {
    "id": "concept-context",
    "category": "concept",
    "ko": "컨텍스트",
    "en": "Context",
    "definition": "AI가 이번 답변을 만들 때 참고하도록 제공받은 정보.",
    "example": "현재 요청과 함께 이전 대화, 관련 파일 내용, 작업 규칙 등을 보내줄 수 있어요."
  },
  {
    "id": "concept-hallucination",
    "category": "concept",
    "ko": "할루시네이션",
    "en": "Hallucination",
    "definition": "AI가 사실이 아니거나 근거 없는 내용을 그럴듯하게 내놓는 현상.",
    "example": "존재하지 않는 기능이나 사용법을 안내할 수 있어 실제 문서와 실행 결과로 확인해야 해요."
  },
  {
    "id": "concept-retrieval-augmented-generation",
    "category": "concept",
    "ko": "검색 증강 생성",
    "en": "Retrieval-Augmented Generation",
    "definition": "관련 자료를 먼저 찾아 AI에 전달하고 그 자료를 참고해 답하게 하는 방식.",
    "example": "내 문서에서 관련 부분을 찾아 답변에 활용해요. 줄여서 RAG라고 하며 정확성을 자동 보장하지는 않아요."
  },
  {
    "id": "concept-tool-calling",
    "category": "concept",
    "ko": "도구 호출",
    "en": "Tool Calling",
    "definition": "AI가 외부 기능의 실행을 요청하고 프로그램이 그 결과를 돌려주는 방식.",
    "example": "AI가 계산기 사용을 요청하면 프로그램이 계산하고 결과를 AI에 전달해요."
  },
  {
    "id": "concept-agent",
    "category": "concept",
    "ko": "에이전트",
    "en": "Agent",
    "definition": "목표를 위해 AI가 다음 작업을 고르고 도구를 사용하며 진행하도록 만든 시스템.",
    "example": "파일 확인, 코드 수정, 실행 확인을 이어서 할 수 있어요. 허용 범위와 결과 확인이 필요해요."
  },
  {
    "id": "ai-modality",
    "category": "concept",
    "ko": "모달리티",
    "en": "Modality",
    "definition": "AI가 다루는 정보의 종류나 표현 방식.",
    "example": "글·이미지·소리·영상은 서로 다른 모달리티예요. 화면 위에 뜨는 모달 창과는 다른 말이에요."
  },
  {
    "id": "ai-multimodal",
    "category": "concept",
    "ko": "멀티모달",
    "en": "Multimodal",
    "definition": "글·이미지·소리 등 여러 종류의 정보를 다루는 방식.",
    "example": "사진과 질문을 함께 보내 사진 내용을 설명하게 할 수 있어요. 모델마다 지원하는 입력과 출력 종류는 달라요."
  },
  {
    "id": "ai-model-context-protocol",
    "category": "concept",
    "ko": "MCP",
    "en": "Model Context Protocol",
    "definition": "AI 앱과 외부 도구·자료를 연결할 때 사용하는 공통 통신 규칙.",
    "example": "매번 제각각 연결하는 대신 같은 규칙으로 파일이나 업무 도구에 접근하게 해요. MCP 자체가 AI 모델이나 접근 허가는 아니에요."
  },
  {
    "id": "ai-plugin",
    "category": "concept",
    "ko": "플러그인",
    "en": "Plugin",
    "definition": "앱에 설치하거나 추가해 기능을 확장하는 구성품.",
    "example": "AI 앱에 새로운 도구나 작업 기능을 더해요. 포함하는 기능과 설치 방식은 앱마다 달라요."
  },
  {
    "id": "ai-connector",
    "category": "concept",
    "ko": "커넥터",
    "en": "Connector",
    "definition": "앱이 다른 서비스의 자료나 기능을 사용하도록 연결해 주는 구성.",
    "example": "문서 보관 서비스와 AI 앱을 연결해 허용된 문서를 찾게 해요. 플러그인이 기능 확장 묶음이라면 커넥터는 서비스 연결에 초점이 있어요."
  },
  {
    "id": "ai-agent-skill",
    "category": "concept",
    "ko": "에이전트 스킬",
    "en": "Agent Skill",
    "definition": "AI가 특정 일을 수행할 때 참고하는 지침과 자료 등의 묶음.",
    "example": "보고서 작성 규칙과 예시를 묶어 필요할 때 불러 쓰게 해요. 외부 기능을 실제로 실행하는 도구와는 역할이 달라요."
  },
  {
    "id": "ai-workflow",
    "category": "concept",
    "ko": "워크플로",
    "en": "Workflow",
    "definition": "목표를 끝내기 위해 정해 놓은 작업 순서와 흐름.",
    "example": "자료 찾기 → 요약하기 → 검토하기 순서로 작업을 연결해요. AI가 매번 순서를 스스로 정하는 것과는 구분돼요."
  },
  {
    "id": "ai-multi-agent-system",
    "category": "concept",
    "ko": "멀티에이전트",
    "en": "Multi-agent System",
    "definition": "여러 AI 에이전트가 역할을 나누거나 협력하도록 만든 구성.",
    "example": "한쪽은 코드를 작성하고 다른 쪽은 검토해요. 여러 개를 쓴다고 항상 더 정확하거나 저렴한 것은 아니에요."
  },
  {
    "id": "ai-orchestration",
    "category": "concept",
    "ko": "오케스트레이션",
    "en": "Orchestration",
    "definition": "여러 도구나 AI의 실행 순서·분담·결과 전달을 조율하는 것.",
    "example": "누가 조사하고 언제 검토할지 정하고, 앞 작업의 결과를 다음 작업에 넘겨요."
  },
  {
    "id": "ai-sandbox",
    "category": "concept",
    "ko": "샌드박스",
    "en": "Sandbox",
    "definition": "실행 가능한 작업과 접근 범위를 제한한 격리 환경.",
    "example": "AI가 만든 코드를 시험할 때 중요한 파일에 마음대로 접근하지 못하게 범위를 제한해요. 설정에 따라 보호 범위는 달라요."
  },
  {
    "id": "ai-human-in-the-loop",
    "category": "concept",
    "ko": "휴먼 인 더 루프",
    "en": "Human-in-the-loop",
    "definition": "자동 처리 과정의 일부에 사람이 검토하거나 결정하도록 넣는 방식.",
    "example": "AI가 작성한 메일을 보내기 전에 사람이 내용을 확인하고 승인하게 해요."
  },
  {
    "id": "ai-prompt-injection",
    "category": "concept",
    "ko": "프롬프트 인젝션",
    "en": "Prompt Injection",
    "definition": "AI가 읽는 자료 등에 지시를 끼워 넣어 원래 작업을 다른 방향으로 유도하는 공격.",
    "example": "웹페이지 안에 “이전 지시를 무시하고 비밀을 보내라”는 문장을 넣는 식이에요. 자료 내용과 실행할 지시를 구분해야 해요."
  },
  {
    "id": "ai-guardrails",
    "category": "concept",
    "ko": "가드레일",
    "en": "Guardrails",
    "definition": "AI의 입력·출력·행동을 정한 범위 안에 두기 위한 검사와 제한 장치.",
    "example": "비밀 정보 출력이나 허용하지 않은 작업을 걸러요. 하나의 장치만으로 모든 오류를 막는 것은 아니에요."
  },
  {
    "id": "ai-system-prompt",
    "category": "concept",
    "ko": "시스템 프롬프트",
    "en": "System Prompt",
    "definition": "앱이 AI의 역할과 기본 행동 규칙을 정해 전달하는 지시.",
    "example": "고객 안내용 AI에 말투와 처리 범위를 정해 줘요. 실제 지시의 우선순위와 지원 방식은 서비스마다 달라요."
  },
  {
    "id": "ai-few-shot-prompting",
    "category": "concept",
    "ko": "퓨샷 프롬프팅",
    "en": "Few-shot Prompting",
    "definition": "원하는 답의 예시를 몇 개 함께 보여주며 요청하는 방식.",
    "example": "좋은 상품 소개글 두 개를 보여주고 비슷한 형식으로 새 소개글을 쓰게 해요. 모델을 새로 학습시키는 작업은 아니에요."
  },
  {
    "id": "ai-prompt-template",
    "category": "concept",
    "ko": "프롬프트 템플릿",
    "en": "Prompt Template",
    "definition": "바뀌는 부분만 채워 반복해서 쓸 수 있게 만든 요청 양식.",
    "example": "“아래 상품을 세 문장으로 소개해 줘: [상품 정보]”처럼 공통 지시와 바꿀 내용을 나눠요."
  },
  {
    "id": "ai-structured-output",
    "category": "concept",
    "ko": "구조화된 출력",
    "en": "Structured Output",
    "definition": "결과를 미리 정한 항목과 자료 구조에 맞춰 받는 방식.",
    "example": "자유로운 문장 대신 이름·가격·재고 항목으로 받으면 앱이 후속 처리를 하기 쉬워요. 형식이 맞아도 내용의 정확성은 확인해야 해요."
  },
  {
    "id": "ai-context-window",
    "category": "concept",
    "ko": "컨텍스트 윈도",
    "en": "Context Window",
    "definition": "AI가 한 번에 다룰 수 있는 정보량의 범위나 한도.",
    "example": "현재 참고 정보인 컨텍스트와 달리, 담을 수 있는 용량을 뜻해요. 입력과 출력의 한도 계산 방식은 모델마다 달라요."
  },
  {
    "id": "ai-ai-memory",
    "category": "concept",
    "ko": "AI 메모리",
    "en": "AI Memory",
    "definition": "이후 작업에 다시 쓰도록 정보를 보관하고 찾아 전달하는 기능.",
    "example": "선호하는 말투 등을 저장했다가 새 대화에 제공해요. 모델이 모든 대화를 영구히 기억하거나 다시 학습한다는 뜻은 아니에요."
  },
  {
    "id": "ai-context-compaction",
    "category": "concept",
    "ko": "컨텍스트 압축",
    "en": "Context Compaction",
    "definition": "긴 작업 기록을 요약하거나 정리해 다시 참고할 정보의 양을 줄이는 것.",
    "example": "대화가 길어지면 중요한 결정과 진행 상태를 요약해 이어가요. 세부 내용이 빠질 수 있어요."
  },
  {
    "id": "ai-model-training",
    "category": "concept",
    "ko": "모델 학습",
    "en": "Model Training",
    "definition": "여러 사례를 이용해 AI 모델 내부의 수치를 조정하는 과정.",
    "example": "많은 예시에서 패턴을 배우도록 모델을 바꿔요. 대화창에 자료를 한 번 보여주는 것과는 다른 과정이에요."
  },
  {
    "id": "ai-inference",
    "category": "concept",
    "ko": "추론 실행",
    "en": "Inference",
    "definition": "학습된 모델에 입력을 넣어 결과를 계산하는 과정.",
    "example": "모델 학습은 예시를 보고 내부 숫자를 조정하는 과정이고, 추론은 준비된 모델을 실제로 사용하는 과정이에요. 질문을 넣고 답변을 생성하는 것이 추론의 예예요."
  },
  {
    "id": "ai-fine-tuning",
    "category": "concept",
    "ko": "파인튜닝",
    "en": "Fine-tuning",
    "definition": "이미 학습된 모델을 추가 사례로 더 학습시켜 조정하는 것.",
    "example": "특정 응답 형식에 맞는 사례를 학습시킬 수 있어요. 문서를 검색해 참고하게 하는 RAG와는 방식이 달라요."
  },
  {
    "id": "ai-large-language-model",
    "category": "concept",
    "ko": "대규모 언어 모델",
    "en": "Large Language Model",
    "definition": "많은 언어 자료 등을 학습해 글을 처리하고 생성하는 큰 규모의 AI 모델.",
    "example": "줄여서 LLM이라고 해요. 번역·요약·코드 작성 등에 쓰지만 사실을 항상 정확히 아는 것은 아니에요."
  },
  {
    "id": "ai-generative-ai",
    "category": "concept",
    "ko": "생성형 AI",
    "en": "Generative AI",
    "definition": "학습한 패턴을 바탕으로 글·그림·소리 등의 새 결과물을 만드는 AI.",
    "example": "질문에 맞는 설명문을 쓰거나 요청한 그림을 만들어요. 새 결과가 반드시 독창적이거나 정확한 것은 아니에요."
  },
  {
    "id": "ai-transformer",
    "category": "concept",
    "ko": "트랜스포머",
    "en": "Transformer",
    "definition": "글 조각 등 입력의 각 부분이 서로 얼마나 관련 있는지 반영하며 정보를 처리하는 AI 모델 구조.",
    "example": "“철수가 우산을 폈다. 비가 왔다.”에서 단어 사이 관계를 계산에 반영하는 식이에요. 많은 언어 모델에 쓰는 설계 방식이며 특정 챗봇 이름은 아니에요."
  },
  {
    "id": "ai-model-weights",
    "category": "concept",
    "ko": "모델 가중치",
    "en": "Model Weights",
    "definition": "학습 과정에서 조정되어 모델의 계산에 쓰이는 내부 수치들.",
    "example": "모델이 익힌 패턴이 계산에 반영되도록 하는 숫자 묶음이에요. 원래 학습 자료를 그대로 모아 둔 목록은 아니에요."
  },
  {
    "id": "ai-open-weight-model",
    "category": "concept",
    "ko": "공개 가중치 모델",
    "en": "Open-weight Model",
    "definition": "학습된 내부 수치를 내려받아 사용할 수 있도록 공개한 모델.",
    "example": "직접 실행하거나 조정할 수 있지만 이용 조건은 따로 확인해야 해요. 학습 자료까지 전부 공개됐다는 뜻은 아니에요."
  },
  {
    "id": "ai-local-model",
    "category": "concept",
    "ko": "로컬 모델",
    "en": "Local Model",
    "definition": "외부 AI 서버 대신 내 컴퓨터나 직접 관리하는 기기에서 실행하는 모델.",
    "example": "모델을 내려받아 내 기기에서 답변을 만들어요. 실행 앱이 외부로 정보를 보내는지는 별도로 확인해야 해요."
  },
  {
    "id": "ai-quantization",
    "category": "concept",
    "ko": "양자화",
    "en": "Quantization",
    "definition": "모델의 내부 숫자를 더 적은 저장 자리로 표현해 용량과 메모리 사용을 줄이는 방법.",
    "example": "아주 정밀한 숫자를 더 적은 단계의 값으로 표현하는 식이에요. 작은 기기에서 큰 모델을 실행하는 데 도움이 되지만 결과 품질과 속도는 방법에 따라 달라져요."
  },
  {
    "id": "ai-temperature",
    "category": "concept",
    "ko": "템퍼러처",
    "en": "Temperature",
    "definition": "AI가 다음 글 조각을 고를 때, 유력한 후보에 얼마나 집중할지 조절하는 설정.",
    "example": "낮추면 가능성이 높은 표현을 더 자주 고르는 경향이 있고, 높이면 덜 유력한 표현도 고르기 쉬워져요. 정확도를 직접 조절하는 값은 아니에요."
  },
  {
    "id": "ai-top-p",
    "category": "concept",
    "ko": "탑 피",
    "en": "Top-p",
    "definition": "다음 출력 후보를 가능성 순으로 모아, 합친 확률이 정한 기준에 이를 만큼만 선택지로 남기는 설정.",
    "example": "후보 확률이 60%·30%·10%라면 기준 0.9에서는 앞의 두 후보를 모아 90%를 채워요. 그 안에서 다음 조각을 골라요. 답변이 90% 정확하다는 뜻은 아니에요."
  },
  {
    "id": "ai-seed",
    "category": "concept",
    "ko": "시드",
    "en": "Seed",
    "definition": "무작위 선택 과정의 시작 상태를 정하는 값.",
    "example": "같은 조건의 결과를 비교할 때 활용해요. 같은 시드를 넣어도 서비스나 실행 환경에 따라 완전히 같은 결과가 보장되지는 않아요."
  },
  {
    "id": "ai-optical-character-recognition",
    "category": "concept",
    "ko": "광학 문자 인식",
    "en": "Optical Character Recognition",
    "definition": "사진이나 스캔 이미지 속 글자를 읽어 문자 데이터로 바꾸는 기술.",
    "example": "줄여서 OCR이라고 해요. 영수증 사진의 금액을 복사 가능한 글자로 추출할 때 써요."
  },
  {
    "id": "ai-speech-to-text",
    "category": "concept",
    "ko": "음성 인식",
    "en": "Speech-to-Text",
    "definition": "사람이 말한 소리를 글자로 바꾸는 처리.",
    "example": "줄여서 STT라고 해요. 녹음된 회의에서 발언 내용을 문자로 옮기지만 잘못 들은 부분은 확인해야 해요."
  },
  {
    "id": "ai-text-to-speech",
    "category": "concept",
    "ko": "음성 합성",
    "en": "Text-to-Speech",
    "definition": "글로 된 내용을 말소리로 만들어 주는 처리.",
    "example": "줄여서 TTS라고 해요. 작성한 안내문을 소리로 읽어 주는 기능을 만들 수 있어요."
  },
  {
    "id": "ai-chunking",
    "category": "concept",
    "ko": "청킹",
    "en": "Chunking",
    "definition": "긴 문서 등을 처리하기 좋은 작은 구간으로 나누는 작업.",
    "example": "긴 안내서를 문단이나 주제별 조각으로 나눠 검색에 활용해요. AI의 기본 처리 단위인 토큰과는 달라요."
  },
  {
    "id": "ai-semantic-search",
    "category": "concept",
    "ko": "의미 검색",
    "en": "Semantic Search",
    "definition": "정확히 같은 단어뿐 아니라 뜻의 관련성을 이용해 찾는 검색 방식.",
    "example": "“환불 방법”으로 검색했을 때 “결제 취소 안내”도 관련 자료로 찾게 해요."
  },
  {
    "id": "ai-vector-database",
    "category": "concept",
    "ko": "벡터 데이터베이스",
    "en": "Vector Database",
    "definition": "정보의 특징을 나타내는 숫자 묶음을 저장하고 유사한 묶음을 찾는 데 쓰는 데이터베이스.",
    "example": "글의 뜻을 숫자로 표현한 임베딩을 저장해 비슷한 문서를 찾는 데 사용해요. 임베딩을 만드는 작업 자체와는 달라요."
  },
  {
    "id": "ai-reranking",
    "category": "concept",
    "ko": "리랭킹",
    "en": "Reranking",
    "definition": "먼저 찾은 후보들을 질문과의 관련성 등으로 다시 평가해 순서를 바꾸는 작업.",
    "example": "검색 결과 20개를 가져온 뒤 질문에 더 잘 맞는 문서가 위에 오도록 다시 정렬해요."
  },
  {
    "id": "ai-grounding",
    "category": "concept",
    "ko": "그라운딩",
    "en": "Grounding",
    "definition": "AI의 답변을 제공된 자료나 확인 가능한 외부 정보에 연결하는 것.",
    "example": "회사 규정에 근거해 답하게 만들어요. RAG는 이를 위한 방법 중 하나이며 출처 연결만으로 정확성이 보장되지는 않아요."
  },
  {
    "id": "ai-streaming",
    "category": "concept",
    "ko": "스트리밍",
    "en": "Streaming",
    "definition": "결과가 전부 완성되기 전에 만들어진 부분부터 차례로 전달하는 방식.",
    "example": "AI 답변이 조금씩 나타나 읽기 시작할 수 있어요. 전체 작업이 끝나는 시간까지 반드시 줄어드는 것은 아니에요."
  },
  {
    "id": "ai-latency",
    "category": "concept",
    "ko": "지연 시간",
    "en": "Latency",
    "definition": "요청을 보낸 뒤 정해진 응답 지점까지 기다리는 시간.",
    "example": "AI가 첫 글자를 보여주기까지와 전체 답변을 마치기까지의 시간은 다를 수 있어요. 어떤 지점을 재는지 함께 확인해요."
  },
  {
    "id": "ai-rate-limiting",
    "category": "concept",
    "ko": "요청 제한",
    "en": "Rate Limiting",
    "definition": "일정 시간 동안 허용할 요청 수나 처리량을 제한하는 방식.",
    "example": "짧은 시간에 AI를 너무 많이 호출하면 제한될 수 있어요. 보낼 수 있는 글 조각 수를 기준으로 제한하기도 해요."
  },
  {
    "id": "ai-ai-evaluation",
    "category": "concept",
    "ko": "AI 평가",
    "en": "AI Evaluation",
    "definition": "AI 결과가 정한 기준을 충족하는지 사례를 통해 확인하는 작업.",
    "example": "줄여서 eval이라고도 해요. 모델을 바꾸기 전 우리 서비스의 질문들로 정확성과 형식을 비교해요."
  },
  {
    "id": "ai-benchmark",
    "category": "concept",
    "ko": "벤치마크",
    "en": "Benchmark",
    "definition": "성능을 비교할 수 있도록 정해 둔 과제나 평가 기준.",
    "example": "같은 문제 묶음으로 여러 모델을 비교해요. 점수가 높다고 내 서비스의 모든 작업에서 더 좋은 것은 아니에요."
  },
  {
    "id": "ai-knowledge-distillation",
    "category": "concept",
    "ko": "지식 증류",
    "en": "Knowledge Distillation",
    "definition": "다른 모델의 출력이나 행동을 학습에 활용해 모델을 훈련하는 방법.",
    "example": "큰 모델의 답변을 작은 모델의 학습 자료로 사용할 수 있어요. 내부 숫자의 표현을 줄이는 양자화와는 달라요."
  },
  {
    "id": "ai-reasoning-model",
    "category": "concept",
    "ko": "추론형 모델",
    "en": "Reasoning Model",
    "definition": "복잡한 문제를 풀 때 중간 계산이나 검토에 자원을 쓰도록 설계·학습된 모델.",
    "example": "어려운 코드 문제에 유용할 수 있지만 답변 시간이 늘거나 오류가 날 수 있어요. 모든 모델 실행을 뜻하는 inference와 구별해요."
  },
  {
    "id": "ai-prompt-engineering",
    "category": "concept",
    "ko": "프롬프트 엔지니어링",
    "en": "Prompt Engineering",
    "definition": "원하는 결과를 얻도록 AI에 줄 지시·예시·형식을 설계하고 개선하는 작업.",
    "example": "막연히 “잘 써줘”라고 하기보다 목적·대상·결과 형식을 정하고 실제 결과를 보며 다듬어요."
  },
  {
    "id": "ai-vibe-coding",
    "category": "concept",
    "ko": "바이브 코딩",
    "en": "Vibe Coding",
    "definition": "원하는 동작을 자연어로 말하고 AI가 만든 코드의 결과를 보며 수정하는 개발 방식.",
    "example": "특히 코드를 세세히 읽기보다 AI와의 대화와 실행 결과에 의존하는 방식을 가리키기도 해요. 실제 서비스에서는 동작과 보안 확인이 필요해요."
  },
  {
    "id": "backend-input-validation",
    "category": "concept",
    "ko": "입력값 검증",
    "en": "Input Validation",
    "definition": "받은 값이 정해진 형식과 범위에 맞는지 확인하는 것.",
    "example": "주문 수량에 마이너스 숫자를 넣거나 이메일을 엉뚱하게 적으면 거절해요. 화면에서 확인했더라도 서버가 다시 검사해야 해요."
  },
  {
    "id": "backend-crud",
    "category": "concept",
    "ko": "CRUD",
    "en": "CRUD",
    "definition": "데이터를 만들고·읽고·고치고·지우는 네 가지 기본 작업.",
    "example": "게시글 작성, 목록 보기, 내용 수정, 삭제가 각각 해당돼요. AI가 “CRUD를 만든다”고 하면 이런 기본 기능을 구현한다는 뜻이에요."
  },
  {
    "id": "backend-primary-key",
    "category": "concept",
    "ko": "기본 키",
    "en": "Primary Key",
    "definition": "저장된 각 항목을 중복이나 빈 값 없이 구분하도록 지정한 대표 항목 또는 항목 조합.",
    "example": "회원 이름은 같아도 회원 번호로 각각을 구분해요. 한 가지 값으로 구분할 수도 있고, 여러 항목을 묶어 구분할 수도 있어요."
  },
  {
    "id": "backend-foreign-key",
    "category": "concept",
    "ko": "외래 키",
    "en": "Foreign Key",
    "definition": "저장된 표의 항목이 다른 항목을 참조하도록 연결하고, 그 관계를 지키는 규칙.",
    "example": "주문 표의 회원 번호를 회원 표와 연결해 누구의 주문인지 나타내요. 존재하지 않는 회원 번호를 주문에 넣지 못하게 할 수 있어요. 같은 표 안의 다른 항목을 참조하기도 해요."
  },
  {
    "id": "backend-unique-constraint",
    "category": "concept",
    "ko": "고유 제약 조건",
    "en": "Unique Constraint",
    "definition": "정해진 항목이나 항목 조합의 값이 중복되지 못하게 하는 저장 규칙.",
    "example": "한 이메일로 계정을 두 개 만들 수 없게 할 때 써요. 동시에 가입 요청이 들어와도 저장 단계에서 중복을 막는 데 도움이 돼요."
  },
  {
    "id": "backend-database-index",
    "category": "concept",
    "ko": "데이터베이스 인덱스",
    "en": "Database Index",
    "definition": "저장된 데이터를 더 빨리 찾기 위해 따로 만드는 탐색 구조.",
    "example": "책 뒤의 찾아보기처럼 이메일로 회원을 빨리 찾게 해요. 대신 저장 공간을 쓰고 데이터 추가·수정 때 관리 비용이 생겨요."
  },
  {
    "id": "backend-transaction",
    "category": "concept",
    "ko": "트랜잭션",
    "en": "Transaction",
    "definition": "여러 데이터 변경을 한 묶음으로 처리해 모두 반영하거나 모두 취소하는 단위.",
    "example": "포인트 송금에서는 내 잔액을 줄이고 상대 잔액을 늘려야 해요. 같은 거래로 묶으면 중간 실패 때 출금만 남는 일을 막을 수 있어요."
  },
  {
    "id": "backend-race-condition",
    "category": "concept",
    "ko": "경쟁 상태",
    "en": "Race Condition",
    "definition": "여러 작업의 실행 순서나 타이밍에 따라 결과가 달라지는 문제.",
    "example": "재고가 하나 남았는데 두 사람이 동시에 구매하면 둘 다 살 수 있다고 판단할 수 있어요. 겹친 요청에서도 재고가 맞도록 처리해야 해요."
  },
  {
    "id": "backend-soft-delete",
    "category": "concept",
    "ko": "소프트 삭제",
    "en": "Soft Delete",
    "definition": "데이터를 바로 없애는 대신 삭제됐다는 표시를 남기는 방식.",
    "example": "게시글을 목록에서 숨기되 복구할 수 있도록 보관해요. 실제 데이터는 남아 있으므로 완전히 지우는 것과는 달라요."
  },
  {
    "id": "backend-data-retention-period",
    "category": "concept",
    "ko": "데이터 보존 기간",
    "en": "Data Retention Period",
    "definition": "어떤 데이터를 얼마나 오래 보관할지 정한 기간.",
    "example": "오래된 작업 기록을 무한히 쌓지 않고 정한 기간 뒤 정리해요. 복구에 필요한 기간과 개인정보를 불필요하게 남기지 않을 기준을 함께 정해요."
  },
  {
    "id": "backend-object-storage",
    "category": "concept",
    "ko": "오브젝트 스토리지",
    "en": "Object Storage",
    "definition": "사진·동영상 같은 파일을 식별 정보와 함께 보관하는 저장 방식.",
    "example": "회원 정보는 데이터베이스에, 업로드한 큰 사진은 파일 저장 서비스에 보관할 수 있어요. 저장했다고 자동으로 모두에게 공개되는 것은 아니에요."
  },
  {
    "id": "backend-signed-url",
    "category": "concept",
    "ko": "서명된 URL",
    "en": "Signed URL",
    "definition": "주소에 검증 정보를 붙여 정해진 조건으로 파일 등에 접근하게 하는 링크.",
    "example": "비공개 파일을 잠깐 내려받게 하는 링크를 만들 수 있어요. 만료 시간이 있어도 유효한 동안 링크를 가진 사람이 사용할 수 있으니 공유에 주의해요."
  },
  {
    "id": "backend-payload",
    "category": "concept",
    "ko": "페이로드",
    "en": "Payload",
    "definition": "요청이나 메시지 안에 담아 보내는 실제 작업 데이터.",
    "example": "상품을 주문할 때 상품 번호·수량·배송 정보가 해당돼요. 주소나 안내 정보와 구분해 “실제로 전달할 내용”을 가리키는 말이에요."
  },
  {
    "id": "backend-http-status-code",
    "category": "concept",
    "ko": "HTTP 상태 코드",
    "en": "HTTP Status Code",
    "definition": "웹 요청의 처리 결과를 숫자로 알려주는 코드.",
    "example": "200은 성공, 404는 요청한 대상을 찾지 못함, 500은 서버 내부 오류를 나타내요. 숫자만 보고 원인을 단정하지 않고 상세 기록도 확인해요."
  },
  {
    "id": "backend-rest-api",
    "category": "concept",
    "ko": "REST API",
    "en": "REST API",
    "definition": "대상별 주소와 HTTP의 동작 등을 이용해 기능을 설계하는 API 방식.",
    "example": "상품을 대상으로 한 주소에 조회를 요청하거나 주문 주소에 생성을 요청해요. 각 요청에 처리에 필요한 정보를 담는 등의 설계 원칙이 있어요. 주소만 나누거나 JSON을 쓴다고 모두 REST API인 것은 아니에요."
  },
  {
    "id": "backend-webhook",
    "category": "concept",
    "ko": "웹훅",
    "en": "Webhook",
    "definition": "어떤 일이 발생하면 미리 등록한 주소로 알림 요청을 보내는 방식.",
    "example": "결제가 끝났을 때 결제 서비스가 내 서버로 결과를 알려줘요. 알림이 진짜인지 확인하고 같은 알림이 여러 번 와도 중복 처리되지 않게 해야 해요."
  },
  {
    "id": "backend-polling",
    "category": "concept",
    "ko": "폴링",
    "en": "Polling",
    "definition": "상태가 바뀌었는지 일정 간격으로 반복해서 물어보는 방식.",
    "example": "파일 변환이 끝났는지 몇 초마다 서버에 확인해요. 너무 자주 물으면 요청량이 늘어나므로 적절한 간격을 정해요."
  },
  {
    "id": "backend-websocket",
    "category": "concept",
    "ko": "웹소켓",
    "en": "WebSocket",
    "definition": "연결을 유지하면서 양쪽이 서로 메시지를 보낼 수 있는 통신 방식.",
    "example": "채팅에서 새 메시지가 생기면 서버가 곧바로 전달할 수 있어요. 연결이 끊겼을 때 다시 연결하는 처리도 필요해요."
  },
  {
    "id": "backend-timeout",
    "category": "concept",
    "ko": "타임아웃",
    "en": "Timeout",
    "definition": "기다릴 수 있는 시간을 넘겨 더 이상 응답을 기다리지 않는 것.",
    "example": "외부 AI가 너무 오래 응답하지 않으면 기다림을 끝내고 안내해요. 기다림이 끝났다고 상대 서버의 작업도 반드시 취소된 것은 아니에요."
  },
  {
    "id": "backend-retry",
    "category": "concept",
    "ko": "재시도",
    "en": "Retry",
    "definition": "실패했거나 응답을 확인하지 못한 작업을 다시 시도하는 것.",
    "example": "잠깐 끊긴 연결은 다시 요청하면 성공할 수 있어요. 하지만 결제처럼 반복되면 곤란한 작업은 중복 처리 방지와 함께 설계해야 해요."
  },
  {
    "id": "backend-idempotency",
    "category": "concept",
    "ko": "멱등성",
    "en": "Idempotency",
    "definition": "같은 작업을 여러 번 요청해도 한 번 요청한 것과 같은 효과를 내는 성질.",
    "example": "주문 요청에 같은 식별값을 붙여 다시 보내도 주문이 또 만들어지지 않게 설계할 수 있어요. 재시도할 때 특히 중요해요."
  },
  {
    "id": "backend-job-queue",
    "category": "concept",
    "ko": "작업 큐",
    "en": "Job Queue",
    "definition": "바로 처리하지 않을 작업을 넣어두고 차례로 가져가게 하는 대기열.",
    "example": "사진 변환 요청을 먼저 접수한 뒤 작업자가 꺼내 처리해요. 대기열에 들어갔다는 것과 실제 작업이 끝났다는 것은 달라요."
  },
  {
    "id": "backend-background-job",
    "category": "concept",
    "ko": "백그라운드 작업",
    "en": "Background Job",
    "definition": "사용자가 화면에서 계속 기다리지 않아도 별도로 진행하는 작업.",
    "example": "긴 보고서 생성을 맡긴 뒤 다른 화면을 사용할 수 있게 해요. 완료·실패 상태를 나중에 확인할 방법도 필요해요."
  },
  {
    "id": "backend-cron-job",
    "category": "concept",
    "ko": "크론 작업",
    "en": "Cron Job",
    "definition": "정해진 시간이나 주기에 자동 실행하도록 예약한 작업.",
    "example": "매일 새벽에 오래된 임시 파일을 정리하거나 주간 보고서를 만들어요. 백그라운드 작업 중에서도 “언제 실행할지”를 예약하는 경우예요."
  },
  {
    "id": "backend-access-token",
    "category": "concept",
    "ko": "액세스 토큰",
    "en": "Access Token",
    "definition": "허용된 기능을 호출할 때 접근 권한의 증표로 사용하는 값.",
    "example": "로그인 뒤 내 정보 조회 요청에 함께 보낼 수 있어요. AI의 글 처리 단위인 토큰과는 다르며, 유효 기간과 사용할 수 있는 범위가 정해질 수 있어요."
  },
  {
    "id": "backend-refresh-token",
    "category": "concept",
    "ko": "리프레시 토큰",
    "en": "Refresh Token",
    "definition": "새 액세스 토큰을 발급받는 데 사용하는 증표.",
    "example": "접근용 증표가 만료돼도 다시 로그인하지 않고 새로 받을 때 써요. 모든 서비스가 쓰는 것은 아니며, 유출되면 위험해 안전하게 보관해야 해요."
  },
  {
    "id": "backend-oauth",
    "category": "concept",
    "ko": "OAuth",
    "en": "OAuth",
    "definition": "비밀번호를 직접 넘기지 않고 다른 앱에 제한된 접근 권한을 주는 규칙.",
    "example": "일정 앱에 내 캘린더를 읽을 권한만 줄 수 있어요. OAuth 자체는 로그인 신원 확인 규칙이 아니며, 로그인에는 별도 규칙이 함께 쓰이기도 해요."
  },
  {
    "id": "backend-password-hashing",
    "category": "concept",
    "ko": "비밀번호 해싱",
    "en": "Password Hashing",
    "definition": "비밀번호를 원문 대신 검증용 계산 결과로 바꿔 저장하는 방식.",
    "example": "로그인할 때 입력값을 다시 계산해 맞는지 확인해요. 원문을 되돌리는 암호화와 다르며, 비밀번호용 검증된 방식과 설정을 써야 해요."
  },
  {
    "id": "backend-cross-origin-resource-sharing",
    "category": "concept",
    "ko": "CORS",
    "en": "Cross-Origin Resource Sharing",
    "definition": "웹브라우저에서 다른 출처의 자료를 읽도록 서버가 허용 범위를 알리는 규칙.",
    "example": "내 사이트와 API의 주소가 다를 때 CORS 오류를 볼 수 있어요. 출처는 주소의 통신 방식·도메인·포트 조합을 뜻해요. 로그인 권한 검사와는 별개예요."
  },
  {
    "id": "backend-secrets-management",
    "category": "concept",
    "ko": "시크릿 관리",
    "en": "Secrets Management",
    "definition": "API 키나 비밀번호 같은 비밀값을 보관·전달·교체하는 관리 체계.",
    "example": "비밀값을 공개 코드에 적지 않고 필요한 서버만 받아 쓰게 해요. 화면에 전달되는 코드에 넣으면 사용자에게 노출될 수 있어요."
  },
  {
    "id": "backend-staging-environment",
    "category": "concept",
    "ko": "스테이징 환경",
    "en": "Staging Environment",
    "definition": "실제 서비스에 반영하기 전에 최종 확인하는 별도의 시험 환경.",
    "example": "새 결제 기능을 실제 고객에게 바로 보여주지 않고 먼저 시험해요. 시험 환경도 실제 고객 데이터나 결제와 연결되지 않도록 확인해야 해요."
  },
  {
    "id": "backend-production-environment",
    "category": "concept",
    "ko": "운영 환경",
    "en": "Production Environment",
    "definition": "실제 이용자가 서비스를 사용하는 실행 환경.",
    "example": "여기서 데이터를 지우거나 설정을 바꾸면 실제 사용자에게 영향을 줄 수 있어요. 내 컴퓨터에서 시험하는 환경과 구별해야 해요."
  },
  {
    "id": "backend-health-check",
    "category": "concept",
    "ko": "헬스 체크",
    "en": "Health Check",
    "definition": "서비스가 정상적으로 응답하거나 요청을 받을 준비가 됐는지 확인하는 검사.",
    "example": "서버에 간단한 확인 요청을 보내 작동 여부를 살펴요. 이 검사에 통과했다고 모든 기능이 정상이라는 뜻은 아니에요."
  },
  {
    "id": "backend-monitoring",
    "category": "concept",
    "ko": "모니터링",
    "en": "Monitoring",
    "definition": "서비스의 상태와 변화를 계속 관찰해 문제를 알아차리는 활동.",
    "example": "오류가 갑자기 늘거나 응답이 느려지는지 살펴보고 알림을 받을 수 있어요. 개별 사건을 남기는 로그와 함께 활용해요."
  },
  {
    "id": "backend-load-balancing",
    "category": "concept",
    "ko": "로드 밸런싱",
    "en": "Load Balancing",
    "definition": "여러 서버로 요청을 나누어 보내는 것.",
    "example": "한 서버에만 이용자가 몰리지 않도록 분산해요. 여러 서버가 같은 사용자 상태나 데이터를 다룰 방법도 함께 설계해야 해요."
  },
  {
    "id": "design-layer",
    "category": "visual",
    "ko": "레이어",
    "en": "Layer",
    "definition": "그림이나 글자를 겹쳐 놓고 따로 편집하는 층.",
    "example": "배경 사진 위에 제목을 별도 층으로 올리면 사진을 건드리지 않고 글자만 옮길 수 있어요."
  },
  {
    "id": "design-png",
    "category": "visual",
    "ko": "PNG",
    "en": "PNG",
    "definition": "투명한 부분을 저장할 수 있고, 압축 과정에서 이미지 정보를 잃지 않는 이미지 파일 형식.",
    "example": "배경이 없는 로고를 저장할 때 쓸 수 있어요. PNG라고 해서 모든 파일의 배경이 투명한 것은 아니에요."
  },
  {
    "id": "design-jpeg",
    "category": "visual",
    "ko": "JPEG",
    "en": "JPEG",
    "definition": "사진을 저장할 때 널리 쓰며, 보통 일부 정보를 줄여 용량을 작게 만드는 이미지 형식.",
    "example": "JPG와 JPEG는 같은 형식을 가리켜요. 일반적인 JPEG는 투명 배경을 지원하지 않아요."
  },
  {
    "id": "design-svg",
    "category": "visual",
    "ko": "SVG",
    "en": "SVG",
    "definition": "점·선·곡선 등을 글로 된 규칙으로 표현할 수 있는 이미지 파일 형식.",
    "example": "선으로 만든 로고나 아이콘을 확대해도 선명하게 표시할 수 있어요. 안에 사진이 들어갈 수도 있어요."
  },
  {
    "id": "design-webp",
    "category": "visual",
    "ko": "WebP",
    "en": "WebP",
    "definition": "사진·투명 배경·움직이는 이미지를 담을 수 있는 웹용 이미지 형식.",
    "example": "사이트 이미지의 용량을 줄이는 데 사용할 수 있어요. 결과 용량은 이미지와 저장 설정에 따라 달라요."
  },
  {
    "id": "design-avif",
    "category": "visual",
    "ko": "AVIF",
    "en": "AVIF",
    "definition": "사진 등을 효율적으로 압축하며 투명한 부분도 저장할 수 있는 이미지 형식.",
    "example": "큰 사진의 전송량을 줄일 때 고려할 수 있어요. 사용할 앱이나 브라우저가 지원하는지 확인해요."
  },
  {
    "id": "design-gif",
    "category": "visual",
    "ko": "GIF",
    "en": "GIF",
    "definition": "제한된 색으로 이미지를 저장하고 짧은 움직임도 담을 수 있는 형식.",
    "example": "반복 재생되는 간단한 그림에 써요. 풍부한 색의 사진이나 부드러운 반투명 표현에는 제약이 있어요."
  },
  {
    "id": "opacity",
    "category": "visual",
    "ko": "오퍼시티",
    "en": "Opacity",
    "definition": "요소가 얼마나 불투명하게 보일지 정하는 값.",
    "example": "100%는 선명하게, 30%는 비쳐 보이게 해요. 0%면 보이지 않아요."
  },
  {
    "id": "vector",
    "category": "visual",
    "ko": "벡터 그래픽",
    "en": "Vector Graphics",
    "definition": "점·선·곡선 등의 정보로 표현하는 그림.",
    "example": "로고나 아이콘을 크게 확대해도 윤곽을 선명하게 그릴 수 있어요."
  },
  {
    "id": "pixel",
    "category": "visual",
    "ko": "픽셀",
    "en": "Pixel",
    "definition": "디지털 이미지를 이루는 작은 색상 칸.",
    "example": "작은 비트맵 이미지를 크게 확대하면 네모난 칸이 보일 수 있어요."
  },
  {
    "id": "padding",
    "category": "visual",
    "ko": "패딩",
    "en": "Padding",
    "definition": "요소의 테두리와 내용 사이에 두는 안쪽 여백.",
    "example": "버튼 글자가 테두리에 바짝 붙지 않도록 안쪽 공간을 늘려요."
  },
  {
    "id": "margin",
    "category": "visual",
    "ko": "마진",
    "en": "Margin",
    "definition": "요소의 테두리 바깥쪽에 두는 여백.",
    "example": "나란한 카드 사이를 떨어뜨릴 때 사용할 수 있어요."
  },
  {
    "id": "radius",
    "category": "visual",
    "ko": "보더 레이디어스",
    "en": "Border Radius",
    "definition": "요소의 모서리를 둥글게 만드는 정도.",
    "example": "각진 버튼을 둥근 버튼으로 바꿔요."
  },
  {
    "id": "gradient",
    "category": "visual",
    "ko": "그레이디언트",
    "en": "Gradient",
    "definition": "두 개 이상의 색이 서서히 이어지는 표현.",
    "example": "배경이 파란색에서 분홍색으로 자연스럽게 바뀌어요."
  },
  {
    "id": "shadow",
    "category": "visual",
    "ko": "박스 섀도",
    "en": "Box Shadow",
    "definition": "요소의 테두리 영역에 그림자를 더하는 효과.",
    "example": "카드가 배경 위에 살짝 떠 있는 것처럼 보여요."
  },
  {
    "id": "design-raster-image",
    "category": "visual",
    "ko": "래스터 이미지",
    "en": "Raster Image",
    "definition": "작은 색상 칸들을 모아 표현한 이미지.",
    "example": "사진처럼 수많은 색상 칸으로 이루어져 있어요. 크게 늘리면 칸이나 흐릿함이 드러날 수 있어요."
  },
  {
    "id": "design-aspect-ratio",
    "category": "visual",
    "ko": "화면 비율",
    "en": "Aspect Ratio",
    "definition": "이미지나 화면의 가로와 세로 길이의 비율.",
    "example": "16:9는 가로가 긴 화면, 1:1은 정사각형이에요. 크기가 달라도 비율은 같을 수 있어요."
  },
  {
    "id": "design-pixel-density",
    "category": "visual",
    "ko": "픽셀 밀도",
    "en": "Pixel Density",
    "definition": "일정한 물리적 길이 안에 픽셀이 얼마나 촘촘하게 들어가는지 나타내는 값.",
    "example": "픽셀은 화면이나 이미지를 이루는 작은 색상 칸이에요. PPI는 1인치당 칸 수를 뜻해요. 같은 1,000칸을 더 좁은 길이에 담으면 밀도가 높아져요."
  },
  {
    "id": "design-image-compression",
    "category": "visual",
    "ko": "이미지 압축",
    "en": "Image Compression",
    "definition": "이미지 파일이 차지하는 저장 공간을 줄이는 처리.",
    "example": "사이트가 빨리 열리도록 사진의 파일 용량을 줄여요. 방법에 따라 화질이 달라질 수 있어요."
  },
  {
    "id": "design-lossy-compression",
    "category": "visual",
    "ko": "손실 압축",
    "en": "Lossy Compression",
    "definition": "정보 일부를 버려 파일 용량을 줄이는 방식.",
    "example": "사진 저장 품질을 낮추면 용량은 줄지만 세밀한 부분이 사라질 수 있어요."
  },
  {
    "id": "design-lossless-compression",
    "category": "visual",
    "ko": "무손실 압축",
    "en": "Lossless Compression",
    "definition": "압축한 데이터를 다시 풀었을 때 원래 정보를 그대로 복원할 수 있는 방식.",
    "example": "그림 정보를 바꾸지 않고 효율적으로 묶어요. 항상 파일이 아주 작아지는 것은 아니에요."
  },
  {
    "id": "design-alpha-channel",
    "category": "visual",
    "ko": "알파 채널",
    "en": "Alpha Channel",
    "definition": "이미지 각 부분이 얼마나 투명한지 기록하는 정보.",
    "example": "머리카락 가장자리를 완전히 지우거나 남기는 것뿐 아니라 반투명하게 표현할 수 있어요."
  },
  {
    "id": "design-thumbnail",
    "category": "visual",
    "ko": "썸네일",
    "en": "Thumbnail",
    "definition": "큰 이미지나 콘텐츠를 미리 살펴보도록 만든 작은 대표 그림.",
    "example": "사진 목록에 작은 미리보기를 보여주고 누르면 원본을 열어요."
  },
  {
    "id": "design-favicon",
    "category": "visual",
    "ko": "파비콘",
    "en": "Favicon",
    "definition": "브라우저 탭이나 즐겨찾기 등에 표시되는 사이트의 작은 아이콘.",
    "example": "여러 탭 중 내 사이트를 알아보기 쉽게 로고를 작게 표시해요."
  },
  {
    "id": "design-export",
    "category": "visual",
    "ko": "내보내기",
    "en": "Export",
    "definition": "작업물을 사용 목적에 맞는 파일로 만들어 저장하는 것.",
    "example": "편집 중인 디자인을 웹에 올릴 PNG나 SVG로 저장해요. 편집용 원본 저장과는 목적이 달라요."
  },
  {
    "id": "design-design-asset",
    "category": "visual",
    "ko": "디자인 에셋",
    "en": "Design Asset",
    "definition": "디자인에 가져다 쓰는 이미지·아이콘·글꼴 등의 재료.",
    "example": "AI에게 화면을 만들게 할 때 로고 파일과 사진을 함께 전달해요."
  },
  {
    "id": "design-canvas",
    "category": "visual",
    "ko": "캔버스",
    "en": "Canvas",
    "definition": "이미지나 디자인을 그리거나 배치하는 작업 영역.",
    "example": "그림을 담는 종이처럼 가로와 세로 범위를 정해 작업해요. 여기서는 디자인 편집 영역을 뜻해요."
  },
  {
    "id": "design-artboard",
    "category": "visual",
    "ko": "아트보드",
    "en": "Artboard",
    "definition": "하나의 디자인 파일 안에서 작업물을 나누는 개별 화면 영역.",
    "example": "같은 파일에 휴대폰 첫 화면과 로그인 화면을 따로 배치해요."
  },
  {
    "id": "design-mask",
    "category": "visual",
    "ko": "마스크",
    "en": "Mask",
    "definition": "원본을 직접 지우지 않고 특정 부분만 보이거나 가려지게 하는 장치.",
    "example": "인물 주변을 가렸다가 나중에 다시 드러낼 수 있어요."
  },
  {
    "id": "design-clipping-mask",
    "category": "visual",
    "ko": "클리핑 마스크",
    "en": "Clipping Mask",
    "definition": "다른 도형이나 층의 형태를 이용해 보이는 범위를 제한하는 방식.",
    "example": "네모난 사진을 원 안에서만 보이게 만들어요."
  },
  {
    "id": "design-path",
    "category": "visual",
    "ko": "패스",
    "en": "Path",
    "definition": "점들을 직선이나 곡선으로 연결한 경로.",
    "example": "로고의 외곽이나 펜으로 그린 곡선의 형태를 정의해요."
  },
  {
    "id": "design-anchor-point",
    "category": "visual",
    "ko": "앵커 포인트",
    "en": "Anchor Point",
    "definition": "경로의 위치와 모양을 조정하는 기준점.",
    "example": "로고 외곽의 점을 옮겨 모양을 다듬어요."
  },
  {
    "id": "design-bezier-curve",
    "category": "visual",
    "ko": "베지어 곡선",
    "en": "Bézier Curve",
    "definition": "기준점과 조절점으로 모양을 정하는 부드러운 곡선.",
    "example": "펜 도구의 손잡이를 움직여 둥근 로고의 휘어짐을 바꿔요."
  },
  {
    "id": "design-blur",
    "category": "visual",
    "ko": "블러",
    "en": "Blur",
    "definition": "이미지나 요소의 경계를 흐리게 만드는 효과.",
    "example": "배경을 흐리게 만들어 앞쪽 글자가 더 눈에 띄게 할 수 있어요."
  },
  {
    "id": "design-blend-mode",
    "category": "visual",
    "ko": "혼합 모드",
    "en": "Blend Mode",
    "definition": "겹친 층의 색을 어떤 계산 방식으로 섞을지 정하는 설정.",
    "example": "위의 질감 이미지와 아래 사진이 자연스럽게 섞이도록 방식을 바꿔요."
  },
  {
    "id": "design-color-palette",
    "category": "visual",
    "ko": "색상 팔레트",
    "en": "Color Palette",
    "definition": "디자인에서 함께 사용하도록 고른 색의 모음.",
    "example": "브랜드의 파랑, 배경의 흰색, 글자의 짙은 회색을 한 세트로 정해요."
  },
  {
    "id": "design-hex-color-code",
    "category": "visual",
    "ko": "색상 코드",
    "en": "Hex Color Code",
    "definition": "0~9와 A~F를 사용해 색을 적는 표기법.",
    "example": "웹에서 #FF0000은 빨강, #000000은 검정이에요. 이처럼 16개의 기호로 수를 표현하는 방식을 16진수라고 해요. 색을 정확하게 전달할 때 써요."
  },
  {
    "id": "design-rgb",
    "category": "visual",
    "ko": "RGB",
    "en": "RGB",
    "definition": "빨강·초록·파랑 빛의 양을 조합해 색을 나타내는 방식.",
    "example": "화면의 색을 세 가지 빛 성분으로 정해요."
  },
  {
    "id": "design-cmyk",
    "category": "visual",
    "ko": "CMYK",
    "en": "CMYK",
    "definition": "청록·자홍·노랑·검정 잉크 성분으로 색을 나타내는 방식.",
    "example": "인쇄물을 만들 때 사용해요. 화면의 RGB 색과 인쇄 결과는 다르게 보일 수 있어요."
  },
  {
    "id": "design-saturation",
    "category": "visual",
    "ko": "채도",
    "en": "Saturation",
    "definition": "색이 회색에 가까운지, 색채가 강하게 느껴지는지 나타내는 정도.",
    "example": "채도를 낮추면 차분해지고 높이면 색이 더 강하게 느껴져요."
  },
  {
    "id": "design-contrast",
    "category": "visual",
    "ko": "대비",
    "en": "Contrast",
    "definition": "색이나 밝기 등의 차이가 두드러지는 정도.",
    "example": "배경과 글자 색의 차이를 키우면 글자를 구별하기 쉬워져요."
  },
  {
    "id": "design-complementary-colors",
    "category": "visual",
    "ko": "보색",
    "en": "Complementary Colors",
    "definition": "색상환에서 서로 반대편에 놓인 색의 관계.",
    "example": "사용하는 색 체계에 따라 짝이 달라질 수 있어요. 강한 대비를 주고 싶을 때 활용해요."
  },
  {
    "id": "design-tint",
    "category": "visual",
    "ko": "색조",
    "en": "Tint",
    "definition": "기준 색에 흰색을 섞어 더 밝게 만든 색.",
    "example": "진한 파랑을 연한 파랑으로 만들어 배경에 사용할 수 있어요. 여기서는 흰색을 더하는 뜻이에요."
  },
  {
    "id": "design-shade",
    "category": "visual",
    "ko": "암색",
    "en": "Shade",
    "definition": "기준 색에 검정을 섞어 더 어둡게 만든 색.",
    "example": "기본 파랑보다 어두운 색을 만들어 눌린 버튼 등에 사용할 수 있어요."
  },
  {
    "id": "design-color-profile",
    "category": "visual",
    "ko": "색상 프로파일",
    "en": "Color Profile",
    "definition": "색 숫자를 어떤 실제 색으로 해석할지 알려주는 정보.",
    "example": "사진을 다른 화면이나 인쇄 장치에서 다룰 때 색을 일관되게 관리하는 데 사용해요."
  },
  {
    "id": "design-typography",
    "category": "visual",
    "ko": "타이포그래피",
    "en": "Typography",
    "definition": "글꼴·크기·간격 등을 조절해 글자를 읽기 좋게 구성하는 일.",
    "example": "제목과 본문이 잘 구분되고 편하게 읽히도록 글자의 모양과 배치를 정해요."
  },
  {
    "id": "design-serif",
    "category": "visual",
    "ko": "세리프",
    "en": "Serif",
    "definition": "글자 획 끝에 작은 장식이 붙은 글자 형태.",
    "example": "영문에서 획 끝의 작은 돌출 장식으로 고전적인 인상을 줄 수 있어요."
  },
  {
    "id": "design-sans-serif",
    "category": "visual",
    "ko": "산세리프",
    "en": "Sans Serif",
    "definition": "글자 획 끝의 작은 장식이 없는 글자 형태.",
    "example": "단정한 영문 제목이나 본문에 자주 사용돼요. 실제 가독성은 크기와 디자인에 따라 달라요."
  },
  {
    "id": "design-monospace",
    "category": "visual",
    "ko": "고정폭 글꼴",
    "en": "Monospace",
    "definition": "각 글자가 차지하는 가로 폭을 같게 설계한 글꼴.",
    "example": "코드나 숫자 열을 줄 맞춰 보여줄 때 편리해요."
  },
  {
    "id": "design-line-height",
    "category": "visual",
    "ko": "행 높이",
    "en": "Line Height",
    "definition": "한 줄의 글자가 배치되는 영역의 높이.",
    "example": "여러 줄의 본문이 너무 붙어 있으면 값을 늘려 읽기 편하게 해요. 글자 사이 가로 간격과는 달라요."
  },
  {
    "id": "design-letter-spacing",
    "category": "visual",
    "ko": "자간",
    "en": "Letter Spacing",
    "definition": "연속된 글자 사이의 간격을 전반적으로 조정하는 값.",
    "example": "제목의 글자들을 조금 벌리거나 모을 수 있어요."
  },
  {
    "id": "design-kerning",
    "category": "visual",
    "ko": "커닝",
    "en": "Kerning",
    "definition": "특정 글자 쌍 사이의 간격을 모양에 맞게 조정하는 것.",
    "example": "영문 A와 V 사이가 벌어져 보이지 않도록 두 글자 사이만 다듬어요."
  },
  {
    "id": "design-typographic-hierarchy",
    "category": "visual",
    "ko": "텍스트 계층",
    "en": "Typographic Hierarchy",
    "definition": "글자의 크기·굵기 등으로 중요도와 읽는 순서를 구분하는 구성.",
    "example": "큰 제목, 중간 소제목, 작은 본문으로 내용의 관계를 보여줘요."
  },
  {
    "id": "design-layout",
    "category": "visual",
    "ko": "레이아웃",
    "en": "Layout",
    "definition": "화면에서 글·사진·버튼 등을 배치하는 구성.",
    "example": "사진은 위에, 설명은 아래에 놓는 식으로 화면의 전체 구조를 정해요."
  },
  {
    "id": "design-grid",
    "category": "visual",
    "ko": "그리드",
    "en": "Grid",
    "definition": "행과 열을 기준으로 요소를 배치하는 격자 구조.",
    "example": "상품을 가로 세 칸씩 가지런히 놓을 때 기준으로 써요."
  },
  {
    "id": "design-column",
    "category": "visual",
    "ko": "컬럼",
    "en": "Column",
    "definition": "화면이나 표를 세로로 나눈 영역.",
    "example": "본문과 옆 안내 영역을 두 개의 세로 칸으로 나눠요."
  },
  {
    "id": "design-gutter",
    "category": "visual",
    "ko": "거터",
    "en": "Gutter",
    "definition": "그리드의 열이나 행 사이에 두는 간격.",
    "example": "상품 열 사이에 일정한 빈 공간을 둬서 붙어 보이지 않게 해요."
  },
  {
    "id": "design-viewport",
    "category": "visual",
    "ko": "뷰포트",
    "en": "Viewport",
    "definition": "웹페이지에서 현재 화면으로 볼 수 있는 영역.",
    "example": "휴대폰에서는 이 영역이 좁아 같은 페이지도 여러 줄로 배치될 수 있어요."
  },
  {
    "id": "design-responsive-design",
    "category": "visual",
    "ko": "반응형 디자인",
    "en": "Responsive Design",
    "definition": "화면 크기 등에 맞춰 배치와 크기를 조정하는 디자인 방식.",
    "example": "컴퓨터에서 세 열이던 카드를 휴대폰에서는 한 열로 보여줘요."
  },
  {
    "id": "design-breakpoint",
    "category": "visual",
    "ko": "브레이크포인트",
    "en": "Breakpoint",
    "definition": "화면 배치 규칙을 바꾸도록 정한 경계 조건.",
    "example": "화면이 일정 폭보다 좁아지면 메뉴를 접도록 정해요."
  },
  {
    "id": "design-flexbox",
    "category": "visual",
    "ko": "플렉스박스",
    "en": "Flexbox",
    "definition": "요소를 주로 한 방향의 줄을 기준으로 배치하는 웹 레이아웃 방식.",
    "example": "버튼들을 한 줄에 놓고 간격을 조절해요. 공간이 부족하면 여러 줄로 감쌀 수도 있어요."
  },
  {
    "id": "design-gap",
    "category": "visual",
    "ko": "갭",
    "en": "Gap",
    "definition": "배치된 항목이나 줄 사이에 넣는 간격 값.",
    "example": "카드마다 바깥 여백을 따로 주지 않고 카드 사이 간격을 한 번에 정해요."
  },
  {
    "id": "design-z-index",
    "category": "visual",
    "ko": "지 인덱스",
    "en": "Z-index",
    "definition": "겹치는 웹 요소의 앞뒤 순서를 정할 때 사용하는 값.",
    "example": "안내창이 배경보다 앞에 보이도록 조정해요. 요소가 속한 겹침 구조의 영향도 받아요."
  },
  {
    "id": "design-overflow",
    "category": "visual",
    "ko": "오버플로",
    "en": "Overflow",
    "definition": "내용이 정해진 영역을 넘치는 상황과 그 처리 방식.",
    "example": "긴 글이 상자 밖으로 나가면 숨기거나 스크롤해서 볼 수 있도록 정해요."
  },
  {
    "id": "design-fixed-positioning",
    "category": "visual",
    "ko": "고정 위치",
    "en": "Fixed Positioning",
    "definition": "보통 화면의 보이는 영역을 기준으로 요소 위치를 고정하는 웹 배치 방식.",
    "example": "페이지를 내려도 도움말 버튼을 같은 위치에 둘 수 있어요. 부모의 설정에 따라 기준이 달라지기도 해요."
  },
  {
    "id": "design-sticky-positioning",
    "category": "visual",
    "ko": "스티키 위치",
    "en": "Sticky Positioning",
    "definition": "스크롤하다 정해진 위치에 도달하면 일정 범위 안에서 붙어 있는 배치 방식.",
    "example": "목록 제목이 위쪽에 닿으면 붙어 있다가 그 영역이 끝나면 함께 지나가게 만들어요."
  },
  {
    "id": "design-wireframe",
    "category": "visual",
    "ko": "와이어프레임",
    "en": "Wireframe",
    "definition": "색과 장식을 자세히 넣기 전에 화면 구조를 간단히 그린 설계도.",
    "example": "상자와 글자만으로 제목·사진·버튼의 위치를 먼저 정해요."
  },
  {
    "id": "design-mockup",
    "category": "visual",
    "ko": "목업",
    "en": "Mockup",
    "definition": "실제처럼 보이도록 외형을 표현한 디자인 시안.",
    "example": "색과 글꼴을 적용해 완성된 화면이 어떻게 보일지 확인해요. 실제 기능은 없을 수 있어요."
  },
  {
    "id": "design-prototype",
    "category": "visual",
    "ko": "프로토타입",
    "en": "Prototype",
    "definition": "아이디어나 흐름을 시험해 보려고 만든 초기 모형.",
    "example": "로그인 버튼을 누르면 다음 화면으로 넘어가게 해서 이용 과정을 확인해요."
  },
  {
    "id": "design-component",
    "category": "visual",
    "ko": "컴포넌트",
    "en": "Component",
    "definition": "반복해서 쓸 수 있도록 묶어 만든 화면 구성 단위.",
    "example": "같은 모양과 동작의 버튼을 여러 화면에서 재사용해요."
  },
  {
    "id": "design-design-system",
    "category": "visual",
    "ko": "디자인 시스템",
    "en": "Design System",
    "definition": "여러 화면을 일관되게 만들기 위한 규칙과 재사용 요소의 체계.",
    "example": "색·글자·버튼 규칙을 정해 새 화면을 만들어도 같은 서비스처럼 보이게 해요."
  },
  {
    "id": "design-design-token",
    "category": "visual",
    "ko": "디자인 토큰",
    "en": "Design Token",
    "definition": "반복해서 쓰는 색·간격 등의 디자인 값을 이름으로 관리한 것.",
    "example": "“기본 강조색”이라는 이름의 값을 바꾸면 연결된 요소들에 적용할 수 있어요."
  },
  {
    "id": "design-user-interface",
    "category": "visual",
    "ko": "UI",
    "en": "User Interface",
    "definition": "사람이 제품을 보고 조작하는 접점.",
    "example": "앱의 메뉴, 버튼, 입력칸처럼 사용자가 기능을 쓰게 해 주는 부분이에요."
  },
  {
    "id": "design-user-experience",
    "category": "visual",
    "ko": "UX",
    "en": "User Experience",
    "definition": "제품을 사용하는 과정에서 사람이 겪고 느끼는 경험.",
    "example": "예쁜 예약 버튼은 UI의 일부예요. 예약을 쉽게 끝내고 결과 안내까지 이해했다면 좋은 UX에 가까워요. 화면 모양뿐 아니라 사용 과정 전체를 다루는 디자인 개념이에요."
  },
  {
    "id": "design-hover-state",
    "category": "visual",
    "ko": "호버 상태",
    "en": "Hover State",
    "definition": "누르지 않고 포인터를 올려두었을 때의 표시 상태.",
    "example": "마우스를 올리면 버튼 색이 변해요. 터치 화면에서는 같은 방식이 없을 수 있어요."
  },
  {
    "id": "design-focus-state",
    "category": "visual",
    "ko": "포커스 상태",
    "en": "Focus State",
    "definition": "현재 키보드 입력 등을 받을 요소임을 나타내는 상태.",
    "example": "Tab 키로 이동할 때 선택된 입력칸이나 버튼에 테두리를 표시해요."
  },
  {
    "id": "design-disabled-state",
    "category": "visual",
    "ko": "비활성 상태",
    "en": "Disabled State",
    "definition": "현재 사용할 수 없도록 막아 둔 요소의 상태.",
    "example": "필수 내용을 아직 안 썼을 때 제출 버튼을 누를 수 없게 만들어요. 색만 바꾸는 것과는 달라요."
  },
  {
    "id": "design-microinteraction",
    "category": "visual",
    "ko": "마이크로인터랙션",
    "en": "Microinteraction",
    "definition": "작은 행동에 반응해 상태나 결과를 알려주는 짧은 상호작용.",
    "example": "좋아요를 누르면 하트가 채워지고 저장됐음을 알려줘요."
  },
  {
    "id": "design-transition",
    "category": "visual",
    "ko": "트랜지션",
    "en": "Transition",
    "definition": "한 상태에서 다른 상태로 바뀌는 과정을 부드럽게 연결하는 효과.",
    "example": "버튼의 배경색이 순간적으로 바뀌지 않고 서서히 변하게 해요."
  },
  {
    "id": "design-keyframe",
    "category": "visual",
    "ko": "키프레임",
    "en": "Keyframe",
    "definition": "움직임의 특정 시점에 어떤 상태여야 하는지 정한 기준 장면.",
    "example": "처음에는 작게, 중간에는 크게, 마지막에는 원래 크기가 되도록 지정해요."
  },
  {
    "id": "design-easing",
    "category": "visual",
    "ko": "이징",
    "en": "Easing",
    "definition": "움직임이 진행되는 동안 속도가 변하는 방식을 정하는 것.",
    "example": "서랍이 일정한 속도로만 움직이지 않고 끝에 가까워질수록 천천히 멈추게 해요."
  },
  {
    "id": "design-accessibility",
    "category": "visual",
    "ko": "접근성",
    "en": "Accessibility",
    "definition": "다양한 능력과 이용 환경의 사람이 제품을 사용할 수 있게 하는 특성.",
    "example": "마우스 없이도 버튼을 조작하고, 글을 소리로 읽어 주는 도구로 내용을 이해할 수 있게 해요."
  },
  {
    "id": "ui-navigation",
    "category": "visual",
    "ko": "내비게이션",
    "en": "Navigation",
    "definition": "사이트나 앱의 다른 화면으로 이동하도록 길을 안내하는 메뉴 영역.",
    "example": "홈·상품·내 정보처럼 갈 곳을 모아둬요. “네비게이터”라고 찾는 화면 이동 메뉴는 보통 내비게이션이라고 불러요."
  },
  {
    "id": "ui-header",
    "category": "visual",
    "ko": "헤더",
    "en": "Header",
    "definition": "페이지나 영역의 도입부에 제목·로고·주요 메뉴 등을 모아둔 부분.",
    "example": "쇼핑몰 위쪽에 로고와 검색창, 주요 메뉴를 배치해요."
  },
  {
    "id": "ui-footer",
    "category": "visual",
    "ko": "푸터",
    "en": "Footer",
    "definition": "페이지나 영역의 마무리에 관련 정보를 모아둔 부분.",
    "example": "사이트 아래쪽에 연락처·이용약관·저작권 안내를 넣어요. “풋터”라고도 검색하지만 일반적인 표기는 푸터예요."
  },
  {
    "id": "ui-sidebar",
    "category": "visual",
    "ko": "사이드바",
    "en": "Sidebar",
    "definition": "주요 내용 옆에 메뉴나 보조 정보를 배치한 영역.",
    "example": "관리 화면 왼쪽에 회원·주문·통계 메뉴를 세로로 놓아요."
  },
  {
    "id": "ui-menu",
    "category": "visual",
    "ko": "메뉴",
    "en": "Menu",
    "definition": "사용할 작업이나 이동할 곳을 선택하도록 모아놓은 목록.",
    "example": "더보기 버튼을 누르면 수정·공유·삭제가 나타나요. “메뉴박스”라고 부르는 상자형 목록도 보통 메뉴라고 해요."
  },
  {
    "id": "ui-dropdown",
    "category": "visual",
    "ko": "드롭다운",
    "en": "Dropdown",
    "definition": "버튼이나 입력 영역을 누르면 펼쳐지는 선택 목록.",
    "example": "정렬 버튼을 누르면 최신순·가격순 목록이 나와요. 위치에 따라 위쪽으로 펼쳐질 수도 있어요."
  },
  {
    "id": "ui-checkbox",
    "category": "visual",
    "ko": "체크박스",
    "en": "Checkbox",
    "definition": "선택 여부를 각각 켜고 끌 수 있는 작은 체크 표시 칸.",
    "example": "관심 분야를 여러 개 고르거나 이용약관 동의 여부를 표시해요."
  },
  {
    "id": "ui-radio-button",
    "category": "visual",
    "ko": "라디오 버튼",
    "en": "Radio Button",
    "definition": "같은 묶음 안에서 하나의 항목을 고르게 하는 선택 표시.",
    "example": "배송 방법에서 일반 배송과 빠른 배송 중 하나만 골라요. 여러 개를 고르는 체크박스와 달라요."
  },
  {
    "id": "ui-switch",
    "category": "visual",
    "ko": "스위치",
    "en": "Switch",
    "definition": "설정을 켜거나 끄는 두 가지 상태로 바꾸는 조작 요소.",
    "example": "알림 설정을 ON 또는 OFF로 바꿔요. 토글 스위치라고도 불러요."
  },
  {
    "id": "ui-text-field",
    "category": "visual",
    "ko": "텍스트 필드",
    "en": "Text Field",
    "definition": "사용자가 짧은 글이나 값을 입력하는 칸.",
    "example": "이름이나 이메일 주소를 적어요. 긴 여러 줄 글을 쓰는 칸과 구분해요."
  },
  {
    "id": "ui-text-area",
    "category": "visual",
    "ko": "텍스트 영역",
    "en": "Text Area",
    "definition": "여러 줄의 글을 입력할 수 있는 칸.",
    "example": "문의 내용이나 긴 소개글을 작성해요. HTML에서는 textarea라는 이름을 사용해요."
  },
  {
    "id": "ui-search-field",
    "category": "visual",
    "ko": "검색창",
    "en": "Search Field",
    "definition": "찾고 싶은 내용을 입력해 검색하도록 만든 칸.",
    "example": "상품 이름을 입력해 목록에서 원하는 상품을 찾아요."
  },
  {
    "id": "ui-accordion",
    "category": "visual",
    "ko": "아코디언",
    "en": "Accordion",
    "definition": "제목을 누르면 관련 내용을 펼치거나 접는 구성.",
    "example": "자주 묻는 질문의 제목을 누르면 답변이 나타나요. 여러 항목을 동시에 펼칠지는 설계에 따라 달라요."
  },
  {
    "id": "ui-tabs",
    "category": "visual",
    "ko": "탭",
    "en": "Tabs",
    "definition": "같은 영역의 내용을 여러 묶음으로 나누고 전환하는 요소.",
    "example": "상품 화면에서 상세 설명·리뷰·문의 중 하나를 눌러 해당 내용을 보여줘요."
  },
  {
    "id": "ui-breadcrumbs",
    "category": "visual",
    "ko": "브레드크럼",
    "en": "Breadcrumbs",
    "definition": "현재 위치가 어떤 상위 영역에 속하는지 순서대로 보여주는 경로 안내.",
    "example": "홈 → 의류 → 셔츠처럼 표시해 상위 분류로 돌아가기 쉽게 해요."
  },
  {
    "id": "ui-pagination",
    "category": "visual",
    "ko": "페이지네이션",
    "en": "Pagination",
    "definition": "여러 페이지로 나눈 목록에서 볼 페이지를 선택하는 요소.",
    "example": "검색 결과 아래의 1·2·3·다음으로 다른 결과 묶음을 열어요."
  },
  {
    "id": "ui-modal-dialog",
    "category": "visual",
    "ko": "모달 대화상자",
    "en": "Modal Dialog",
    "definition": "닫거나 처리하기 전까지 뒤쪽 화면의 조작을 막는 대화상자.",
    "example": "정말 삭제할지 확인하는 창을 띄우고 확인 또는 취소를 선택하게 해요. 단순히 떠 있는 모든 상자를 뜻하지는 않아요."
  },
  {
    "id": "ui-tooltip",
    "category": "visual",
    "ko": "툴팁",
    "en": "Tooltip",
    "definition": "특정 요소가 무엇인지 짧게 알려주는 보조 설명 상자.",
    "example": "아이콘에 포인터를 올리거나 키보드로 초점을 맞추면 “다운로드”라는 설명이 나타나요."
  },
  {
    "id": "ui-toast",
    "category": "visual",
    "ko": "토스트",
    "en": "Toast",
    "definition": "작업 결과 등을 잠깐 알려주고 사라지는 알림.",
    "example": "저장 직후 “저장했어요”라는 짧은 메시지를 표시해요. 사용자의 작업을 막지 않는 방식으로 써요."
  },
  {
    "id": "ui-badge",
    "category": "visual",
    "ko": "배지",
    "en": "Badge",
    "definition": "아이콘이나 항목에 붙여 개수·상태 등을 알려주는 작은 표시.",
    "example": "알림 아이콘 옆의 숫자 3으로 읽지 않은 알림이 세 개임을 보여줘요."
  },
  {
    "id": "ui-card",
    "category": "visual",
    "ko": "카드",
    "en": "Card",
    "definition": "하나의 대상에 관한 정보를 묶어 보여주는 화면 구성.",
    "example": "상품 사진·이름·가격을 한 덩어리로 모아 다른 상품과 구분해요."
  },
  {
    "id": "ui-avatar",
    "category": "visual",
    "ko": "아바타",
    "en": "Avatar",
    "definition": "사용자나 대상을 나타내는 작은 대표 이미지나 글자 표시.",
    "example": "댓글 옆에 프로필 사진을 보여주거나 사진 대신 이름의 첫 글자를 표시해요."
  },
  {
    "id": "ui-progress-bar",
    "category": "visual",
    "ko": "진행률 표시줄",
    "en": "Progress Bar",
    "definition": "작업이 얼마나 진행됐는지 길이로 보여주는 막대.",
    "example": "파일 업로드가 60% 끝났음을 막대로 표현해요. 정확한 진행률을 모를 때는 움직이는 막대를 쓰기도 해요."
  },
  {
    "id": "ui-loading-spinner",
    "category": "visual",
    "ko": "로딩 스피너",
    "en": "Loading Spinner",
    "definition": "작업을 처리 중임을 반복 움직임으로 알려주는 표시.",
    "example": "결과를 기다리는 동안 작은 원이 돌아가요. 보통 정확한 완료 비율까지 알려주지는 않아요."
  },
  {
    "id": "ui-skeleton",
    "category": "visual",
    "ko": "스켈레톤",
    "en": "Skeleton",
    "definition": "내용을 불러오는 동안 실제 내용의 자리와 모양을 미리 보여주는 표시.",
    "example": "사진 자리에는 회색 상자, 글 자리에는 회색 줄을 보여줘요."
  },
  {
    "id": "ui-bottom-navigation",
    "category": "visual",
    "ko": "하단 내비게이션",
    "en": "Bottom Navigation",
    "definition": "앱의 주요 화면으로 이동하는 메뉴를 화면 아래에 모은 구성.",
    "example": "휴대폰 앱 아래에 홈·검색·내 정보 메뉴를 놓아 손가락으로 쉽게 이동하게 해요."
  },
  {
    "id": "ui-bottom-sheet",
    "category": "visual",
    "ko": "바텀 시트",
    "en": "Bottom Sheet",
    "definition": "화면 아래쪽에서 올라와 추가 정보나 작업을 보여주는 패널.",
    "example": "지도에서 장소를 누르면 아래에서 상세 정보가 올라와요. 뒤쪽 화면을 막을지 여부는 설계에 따라 달라요."
  },
  {
    "id": "ui-date-picker",
    "category": "visual",
    "ko": "날짜 선택기",
    "en": "Date Picker",
    "definition": "달력 등의 방식으로 날짜를 고르게 하는 입력 요소.",
    "example": "예약 날짜를 직접 타이핑하는 대신 달력에서 선택해요."
  },
  {
    "id": "ui-slider",
    "category": "visual",
    "ko": "슬라이더",
    "en": "Slider",
    "definition": "손잡이를 움직여 일정 범위 안의 값을 고르는 요소.",
    "example": "음량이나 밝기를 조절해요. 범위의 두 끝을 고르는 형태는 범위 슬라이더라고 구분해요."
  },
  {
    "id": "ui-autocomplete",
    "category": "visual",
    "ko": "자동완성",
    "en": "Autocomplete",
    "definition": "입력한 내용에 맞춰 선택 가능한 후보를 제안하는 기능.",
    "example": "도시 이름에 “서”를 입력하면 “서울” 같은 후보를 보여줘요. 사용자가 후보를 선택해 입력을 마칠 수 있어요."
  },
  {
    "id": "extra-state-management",
    "category": "concept",
    "ko": "상태 관리",
    "en": "State Management",
    "definition": "현재 화면과 기능이 어떤 상태인지 기록하고 일관되게 바꾸는 방식.",
    "example": "장바구니에 상품을 넣으면 목록과 총액이 함께 바뀌어야 해요. 화면의 생김새가 아니라 여러 곳이 같은 정보를 보도록 관리하는 원리예요.",
    "tags": []
  },
  {
    "id": "extra-data-persistence",
    "category": "concept",
    "ko": "데이터 영속성",
    "en": "Data Persistence",
    "definition": "프로그램을 닫거나 다시 실행해도 필요한 데이터가 남도록 저장하는 성질.",
    "example": "입력 중인 메모를 다시 열어도 이어 쓰게 만들어요. 잠깐 변수에 담는 것만으로는 보통 재실행 뒤까지 남지 않아요.",
    "tags": []
  },
  {
    "id": "extra-debounce",
    "category": "concept",
    "ko": "디바운스",
    "en": "Debounce",
    "definition": "연속해서 발생하는 동작이 잠잠해질 때까지 기다렸다가 처리하는 방식.",
    "example": "검색어를 한 글자 쓸 때마다 요청하지 않고 타이핑을 잠깐 멈췄을 때 검색해요. 마지막 입력을 기준으로 기다림을 다시 시작하는 방식이 흔해요.",
    "tags": []
  },
  {
    "id": "extra-throttle",
    "category": "concept",
    "ko": "스로틀",
    "en": "Throttle",
    "definition": "동작이 계속 발생해도 일정 간격 안에서는 처리 횟수를 제한하는 방식.",
    "example": "화면을 움직이는 동안 위치 계산을 너무 자주 하지 않게 해요. 입력이 멈추기를 기다리는 디바운스와 달리 진행 중에도 간격을 두고 처리할 수 있어요.",
    "tags": []
  },
  {
    "id": "extra-feature-flag",
    "category": "concept",
    "ko": "기능 플래그",
    "en": "Feature Flag",
    "definition": "코드를 다시 배포하지 않고 기능의 사용 여부를 설정으로 바꾸는 장치.",
    "example": "새 기능을 일부 사용자에게 먼저 켜거나 문제가 생기면 꺼요. 버튼을 숨기는 것만으로 접근 권한이 차단되는 것은 아니에요.",
    "tags": []
  },
  {
    "id": "extra-content-delivery-network",
    "category": "concept",
    "ko": "CDN",
    "en": "Content Delivery Network",
    "definition": "여러 지역의 서버를 활용해 콘텐츠를 전달하는 체계.",
    "example": "사진이나 화면 파일을 사용자와 가까운 곳에서 전달해 대기 시간을 줄일 수 있어요. 여러 서버에 어떤 파일을 보관하고 갱신할지도 정해야 해요.",
    "tags": []
  },
  {
    "id": "extra-lazy-loading",
    "category": "concept",
    "ko": "지연 로딩",
    "en": "Lazy Loading",
    "definition": "자료나 기능을 처음부터 모두 불러오지 않고 필요해질 때 불러오는 방식.",
    "example": "페이지 아래쪽 사진은 사용자가 가까이 내려왔을 때 가져올 수 있어요. 처음 화면에서 바로 필요한 내용까지 늦추면 오히려 불편할 수 있어요.",
    "tags": []
  },
  {
    "id": "extra-list-virtualization",
    "category": "concept",
    "ko": "리스트 가상화",
    "en": "List Virtualization",
    "definition": "긴 목록에서 현재 보이는 부분 주변만 화면 요소로 만들어 처리하는 방식.",
    "example": "항목이 만 개여도 한꺼번에 전부 그리지 않아 화면이 가벼워질 수 있어요. 데이터를 나중에 가져오는 지연 로딩과는 다른 처리예요.",
    "tags": []
  },
  {
    "id": "extra-cross-site-scripting",
    "category": "concept",
    "ko": "크로스 사이트 스크립팅",
    "en": "Cross-Site Scripting",
    "definition": "공격자가 넣은 코드가 다른 사용자의 웹페이지에서 실행되게 하는 공격.",
    "example": "줄여서 XSS라고 해요. 댓글 같은 입력을 단순 글이 아니라 실행할 코드로 잘못 처리할 때 생길 수 있어요. 화면에 표시할 자료를 안전하게 다뤄야 해요.",
    "tags": []
  },
  {
    "id": "extra-cross-site-request-forgery",
    "category": "concept",
    "ko": "크로스 사이트 요청 위조",
    "en": "Cross-Site Request Forgery",
    "definition": "로그인한 사용자의 브라우저를 이용해 원하지 않은 요청을 보내게 하는 공격.",
    "example": "줄여서 CSRF라고 해요. 사용자가 원치 않은 설정 변경 등이 일어날 수 있어요. 로그인 상태만 믿지 않고 요청의 출처와 검증값 등을 확인하는 방어가 필요해요.",
    "tags": []
  },
  {
    "id": "extra-progressive-web-app",
    "category": "concept",
    "ko": "프로그레시브 웹 앱",
    "en": "Progressive Web App",
    "definition": "웹 기술로 만들면서 설치나 오프라인 사용 같은 앱 기능을 제공할 수 있는 웹 앱.",
    "example": "줄여서 PWA라고 해요. 모바일 홈 화면에서 실행하게 만들 수 있지만 지원 기능은 기기와 브라우저마다 다르고, 오프라인 동작도 따로 구현해야 해요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-native-app",
    "category": "concept",
    "ko": "네이티브 앱",
    "en": "Native App",
    "definition": "특정 운영체제의 앱 환경과 기능을 직접 활용하도록 만든 앱.",
    "example": "운영체제는 안드로이드나 iOS처럼 기기를 움직이는 기본 시스템이에요. 그 환경에 맞춰 카메라 같은 기능을 사용하는 앱을 만들어요. 웹 앱도 카메라를 쓸 수 있으므로 카메라 사용 여부만으로 구분하지는 않아요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-webview",
    "category": "concept",
    "ko": "웹뷰",
    "en": "WebView",
    "definition": "앱 안에서 웹페이지를 표시하고 실행하는 구성 요소.",
    "example": "모바일 앱 안에 웹으로 만든 도움말이나 화면을 넣어요. 일반 브라우저와 지원 기능·로그인 상태·보안 설정이 다를 수 있어요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-app-lifecycle",
    "category": "concept",
    "ko": "앱 생명주기",
    "en": "App Lifecycle",
    "definition": "앱이 열리고 숨겨지고 다시 돌아오거나 종료되는 상태 변화의 흐름.",
    "example": "모바일에서 전화를 받으러 나갔다가 돌아왔을 때 작성 중인 내용이 유지되도록 처리해요. 앱이 계속 실행된다고 가정하면 안 돼요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-runtime-permission",
    "category": "concept",
    "ko": "런타임 권한",
    "en": "Runtime Permission",
    "definition": "앱 사용 중 카메라·위치 같은 기기 기능에 접근하기 위해 받는 허용.",
    "example": "사진을 찍는 순간 카메라 접근을 요청해요. 사용자가 거절하거나 나중에 권한을 꺼도 앱이 안내하며 동작하게 해야 해요. 서버의 회원 권한과는 달라요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-deep-link",
    "category": "concept",
    "ko": "딥 링크",
    "en": "Deep Link",
    "definition": "앱의 첫 화면 대신 특정 내용이나 기능으로 바로 연결하는 링크.",
    "example": "공유받은 링크로 해당 상품을 바로 열어요. 모바일 앱이 설치되지 않았을 때의 이동 경로와 로그인 필요 여부도 정해야 해요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-push-notification",
    "category": "concept",
    "ko": "푸시 알림",
    "en": "Push Notification",
    "definition": "서비스 쪽 사건을 기기의 알림 체계를 통해 사용자에게 전달하는 방식.",
    "example": "앱을 보고 있지 않을 때 새 메시지 알림을 보낼 수 있어요. 모바일 알림 허용과 운영체제 정책의 영향을 받으며 즉시 전달이 항상 보장되지는 않아요. 화면 안 토스트와는 달라요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-offline-first",
    "category": "concept",
    "ko": "오프라인 우선",
    "en": "Offline-first",
    "definition": "연결이 없어도 주요 작업을 할 수 있게 설계하고 연결되면 서버와 맞추는 접근 방식.",
    "example": "지하철에서 메모를 쓰고 인터넷이 돌아오면 전송하게 해요. 서버가 꼭 필요한 작업은 구분하고 저장·전송 상태도 알려줘야 해요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-data-synchronization",
    "category": "concept",
    "ko": "데이터 동기화",
    "en": "Data Synchronization",
    "definition": "기기와 서버 등 여러 곳의 데이터를 서로 맞추는 과정.",
    "example": "휴대폰에서 고친 메모가 다른 기기에도 반영되게 해요. 같은 내용을 양쪽에서 고쳤다면 어느 값을 남길지 규칙이 필요해요. 백업과는 목적이 달라요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-secure-storage",
    "category": "concept",
    "ko": "보안 저장소",
    "en": "Secure Storage",
    "definition": "기기가 제공하는 보호 기능을 이용해 비밀값 등을 보관하는 저장 영역.",
    "example": "모바일의 로그인 증표를 일반 설정 파일 대신 보호된 저장 수단으로 관리해요. 기기 상태와 구현에 따라 보호 수준이 달라져 무조건 안전한 것은 아니에요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-empty-state",
    "category": "visual",
    "ko": "빈 상태",
    "en": "Empty State",
    "definition": "목록에 표시할 항목이 없을 때 이유와 다음 행동을 안내하는 화면 구성.",
    "example": "즐겨찾기를 아직 추가하지 않았거나 검색 결과가 없을 때 안내해요. “첫 항목을 추가해 보세요”처럼 다음 행동을 제시하며, 불러오는 중이나 실패한 상태와 구분해요.",
    "tags": []
  },
  {
    "id": "extra-error-state",
    "category": "visual",
    "ko": "오류 상태",
    "en": "Error State",
    "definition": "작업이 실패했음을 알리고 해결할 행동을 안내하는 화면 구성.",
    "example": "목록을 못 불러오면 이유와 다시 시도 버튼을 보여줘요. 내부의 오류 처리 방식이 아니라 사용자가 보는 안내를 뜻해요.",
    "tags": []
  },
  {
    "id": "extra-helper-text",
    "category": "visual",
    "ko": "도움말 텍스트",
    "en": "Helper Text",
    "definition": "입력이나 선택을 잘할 수 있도록 곁에 붙이는 짧은 설명.",
    "example": "비밀번호 칸 아래에 필요한 길이와 규칙을 미리 알려줘요. 잘못 입력한 뒤 보여주는 오류 문구와 목적이 달라요.",
    "tags": []
  },
  {
    "id": "extra-placeholder",
    "category": "visual",
    "ko": "플레이스홀더",
    "en": "Placeholder",
    "definition": "입력칸이 비어 있을 때 예시나 힌트로 잠시 표시하는 내용.",
    "example": "이메일 칸에 example@example.com을 보여줄 수 있어요. 입력하면 사라지므로 그 칸의 이름을 알려주는 레이블을 대신해서는 안 돼요.",
    "tags": []
  },
  {
    "id": "extra-field-label",
    "category": "visual",
    "ko": "필드 레이블",
    "en": "Field Label",
    "definition": "입력칸에 어떤 정보를 넣어야 하는지 알려주는 이름표.",
    "example": "칸 위나 옆에 “이메일 주소”라고 표시해요. 값을 입력한 뒤에도 항목을 구분할 수 있게 하고 읽기 도구에도 연결해야 해요.",
    "tags": []
  },
  {
    "id": "extra-inline-validation",
    "category": "visual",
    "ko": "인라인 검증",
    "en": "Inline Validation",
    "definition": "입력값의 확인 결과를 해당 입력칸 가까이에 보여주는 방식.",
    "example": "이메일 칸 아래에 “주소 형식을 확인해 주세요”라고 표시해요. 화면에서 안내한다고 서버의 입력 검증을 생략할 수 있는 것은 아니에요.",
    "tags": []
  },
  {
    "id": "extra-progressive-disclosure",
    "category": "visual",
    "ko": "점진적 공개",
    "en": "Progressive Disclosure",
    "definition": "처음에는 필요한 내용만 보여주고 추가 내용은 필요할 때 펼쳐 보이는 구성 방식.",
    "example": "기본 설정 아래의 “고급 설정”을 열면 더 자세한 항목이 나와요. 아코디언 같은 특정 부품 이름이 아니라 정보를 나누는 설계 원칙이에요.",
    "tags": []
  },
  {
    "id": "extra-primary-action",
    "category": "visual",
    "ko": "주요 액션",
    "en": "Primary Action",
    "definition": "현재 화면에서 가장 중요한 행동으로 강조하는 선택지.",
    "example": "예약 화면에서는 예약 확정 버튼을 가장 눈에 띄게 만들어요. 모든 버튼을 똑같이 강조하면 다음에 할 일을 찾기 어려워져요.",
    "tags": []
  },
  {
    "id": "extra-segmented-control",
    "category": "visual",
    "ko": "세그먼티드 컨트롤",
    "en": "Segmented Control",
    "definition": "붙어 있는 짧은 선택 항목들로 모드나 표시 방식을 바꾸는 요소.",
    "example": "가격 보기에서 월간·연간 중 하나를 골라요. 별도 내용 묶음 사이를 이동하는 탭과 비슷하게 보여도 쓰는 목적을 구분해요.",
    "tags": []
  },
  {
    "id": "extra-step-indicator",
    "category": "visual",
    "ko": "단계 표시기",
    "en": "Step Indicator",
    "definition": "여러 단계의 과정에서 현재 위치와 진행 상태를 알려주는 표시.",
    "example": "가입 과정 위에 정보 입력 → 확인 → 완료를 보여줘요. 작업량을 막대로 나타내는 진행률 표시줄과 달리 단계의 구조를 알려줘요.",
    "tags": []
  },
  {
    "id": "extra-safe-area",
    "category": "visual",
    "ko": "안전 영역",
    "en": "Safe Area",
    "definition": "기기의 화면 가림이나 시스템 조작 영역을 고려해 주요 내용을 배치하는 범위.",
    "example": "모바일 카메라 구멍이나 아래쪽 홈 조작 표시와 버튼이 겹치지 않게 해요. 배경은 화면 끝까지 그리면서 중요한 내용은 안쪽에 둘 수 있어요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-touch-target",
    "category": "visual",
    "ko": "터치 타깃",
    "en": "Touch Target",
    "definition": "손가락으로 눌렀을 때 실제로 반응하는 영역.",
    "example": "모바일의 작은 아이콘도 주변까지 누를 수 있게 넓혀요. 보이는 그림의 크기와 실제 눌리는 영역은 다를 수 있고, 이웃 버튼과 겹치지 않아야 해요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-thumb-zone",
    "category": "visual",
    "ko": "엄지 도달 영역",
    "en": "Thumb Zone",
    "definition": "휴대폰을 잡은 손의 엄지가 비교적 편하게 닿는 화면 범위.",
    "example": "자주 쓰는 조작을 손이 닿기 쉬운 곳에 배치할 때 참고해요. 기기 크기·잡는 방식·사용자에 따라 달라지는 설계 기준이에요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-gesture",
    "category": "visual",
    "ko": "제스처",
    "en": "Gesture",
    "definition": "터치 움직임이나 접촉 방식으로 의도를 전달하는 조작 방식.",
    "example": "모바일에서 밀기·길게 누르기·두 손가락 벌리기 등이 있어요. 숨겨진 조작만으로 중요한 기능을 제공하지 않고 다른 방법도 마련해요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-swipe-action",
    "category": "visual",
    "ko": "스와이프 액션",
    "en": "Swipe Action",
    "definition": "항목을 옆으로 밀어 작업을 드러내거나 실행하는 조작 방식.",
    "example": "모바일 메시지 목록을 옆으로 밀면 보관 버튼이 나타나요. 단순히 목록을 이동하는 스크롤과 달리 해당 항목에 행동을 수행해요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-long-press",
    "category": "visual",
    "ko": "길게 누르기",
    "en": "Long Press",
    "definition": "손가락을 잠시 대고 유지해 추가 행동을 실행하는 조작.",
    "example": "모바일 항목을 길게 눌러 선택하거나 추가 메뉴를 열어요. 사용자가 발견하기 어려울 수 있어 메뉴 버튼 같은 대안도 두는 것이 좋아요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-pinch-to-zoom",
    "category": "visual",
    "ko": "핀치 줌",
    "en": "Pinch-to-Zoom",
    "definition": "두 손가락 사이 거리를 바꿔 내용을 확대하거나 축소하는 조작.",
    "example": "모바일 사진이나 지도를 자세히 볼 때 사용해요. 작은 글을 읽으려는 확대까지 무조건 막으면 사용이 어려워질 수 있어요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-pull-to-refresh",
    "category": "visual",
    "ko": "당겨서 새로고침",
    "en": "Pull-to-Refresh",
    "definition": "화면 내용을 아래로 당겨 갱신을 요청하는 조작 방식.",
    "example": "모바일 목록의 맨 위에서 아래로 당기면 최신 내용을 불러와요. 요청 중인지 끝났는지 함께 표시해요. 반복 요청을 보내는 폴링과는 달라요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-scroll-snap",
    "category": "visual",
    "ko": "스크롤 스냅",
    "en": "Scroll Snap",
    "definition": "스크롤이 멈출 때 항목의 경계 같은 정해진 위치에 맞춰 멈추도록 하는 방식.",
    "example": "모바일에서 사진을 넘길 때 다음 사진의 시작점에 정돈되게 맞춰요. 사용자가 자유롭게 이동해야 하는 긴 본문에서는 적용을 신중히 해요.",
    "tags": [
      "모바일"
    ]
  },
  {
    "id": "extra-adaptive-layout",
    "category": "visual",
    "ko": "적응형 레이아웃",
    "en": "Adaptive Layout",
    "definition": "주어진 화면이나 기기 조건에 맞춰 준비된 배치 구성을 선택하는 방식.",
    "example": "휴대폰에서는 목록만, 넓은 태블릿에서는 목록과 상세 내용을 함께 보여줘요. 반응형과 용법이 겹치지만 여기서는 폭에 따른 미세 조정보다 배치 구조 선택에 초점을 둬요.",
    "tags": [
      "모바일"
    ]
  }
];
