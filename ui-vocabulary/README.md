# 프론트엔드단어장

비전공자를 위한 웹·앱 UI 시각 단어장. 이 프로젝트의 작업 범위는 `ui-vocabulary/`이며, 상위 저장소의 다른 프로젝트와 구분한다.

- 시작 파일: `index.html` (브라우저에서 직접 열기)
- 스타일: `styles.css`
- 상호작용: `app.js`
- 추가 상호작용: `examples.js`
- 현재 구성: 직접 클릭하거나 드래그할 수 있는 기본 UI 65개 예시와 아래의 한글·영문 이름
- 향후 계획: 3초 제한 4지선다 스피드퀴즈, 오답 복습, 비전공자용 백엔드 기초 지식

현재의 단순한 구성을 유지한다. Sites를 사용하지 않고 로컬 코드로 작업한다.

두 번째 확장으로 추가한 예시는 하단 내비게이션, 바텀 시트, 내비게이션 드로어, 세그먼트 컨트롤, 별점, 비밀번호 입력창, 여러 줄 입력창, 알림 배지, 플로팅 액션 버튼, 알림 배너다.

세 번째 확장으로 추가한 예시는 드롭다운 메뉴, 팝오버, 자동완성, 다중 선택, 파일 업로드, 색상 선택기, 시간 선택기, 일회용 인증번호 입력, 폼 유효성 검사, 단계 표시기, 스켈레톤 로딩, 로딩 스피너, 빈 상태, 오류 상태, 아바타, 카드, 데이터 테이블, 리스트 항목, 툴바, 라이트박스다.

65개 명칭의 근거와 번역 검토는 [용어 대조 기록](./TERMINOLOGY.md)에 정리했다. 컴포넌트뿐 아니라 동작·로딩·빈 화면·오류 상태 패턴을 포함한다. 한글은 통용 음역 또는 뜻을 풀어쓴 학습용 번역이며, 모두가 공식 표준 번역인 것은 아니다.

예시는 모두 로컬에서 동작한다. 파일 선택은 파일명만 표시하며 파일을 읽거나 전송하지 않는다. 인증번호는 입력 형식만 체험하고 실제 인증은 하지 않는다. 로딩과 재시도는 서버 통신 없이 시연한다.

카드 열 수는 화면 폭에 맞춰 바뀐다. 새 예시의 터치 영역은 44px 이상이며, 모바일 입력 글자는 16px로 표시한다. 바텀 시트와 사이드 내비게이션은 닫기 버튼·배경 클릭·Escape로 닫고 실행 버튼으로 초점을 돌려준다.


## 표시 순서

일반적인 웹·모바일 앱에서의 노출 범위와 반복 사용 가능성을 기준으로 한 편집상 추정 순서다. 측정된 사용량 순위가 아니며, 쇼핑몰·관리자 도구·콘텐츠 앱 등 제품 유형에 따라 달라진다. 기본 입력과 액션, 콘텐츠, 탐색을 앞에 두고 특정 작업용 도구를 뒤에 배치한다. [Atlassian](https://atlassian.design/components/)과 [Material UI](https://mui.com/material-ui/all-components/)의 역할 분류를 참고했으며, 이 문서들이 사용 빈도 순위를 제공하는 것은 아니다.

1. Button
2. Icon Button
3. Link
4. Text Field
5. Search Field
6. App Bar
7. Card
8. Image List
9. Masonry
10. List Item
11. Divider
12. Checkbox
13. Select
14. Radio Button
15. Tabs
16. Modal Dialog
17. Backdrop
18. Dropdown Menu
19. Button Group
20. Switch
21. Toggle Button
22. Avatar
23. Badge
24. Password Input
25. Text Area
26. Form Validation
27. Toast
28. Snackbar
29. Tooltip
30. Accordion
31. Spinner
32. Alert Banner
33. Bottom Navigation
34. Navigation Drawer
35. Pagination
36. Breadcrumb
37. Data Table
38. Tree View
39. Empty State
40. Error State
41. Progress Bar
42. Timeline
43. Skeleton
44. Date Picker
45. Date Range Picker
46. File Upload
47. Autocomplete
48. Filter Chip
49. Bottom Sheet
50. Carousel
51. Multi-select
52. Popover
53. Segmented Control
54. Slider
55. Range Slider
56. Rating
57. Toolbar
58. Stepper
59. OTP Input
60. Step Indicator
61. Floating Action Button
62. Speed Dial
63. Lightbox
64. Time Picker
65. Color Picker

## 시각 컨셉

실사형 AI 코어와 티타늄 장비를 모티브로 한 사이버네틱 테마. `cyber-theme.css`는 기본 색상과 컴포넌트 테마를, `titanium-theme.css`는 금속 프레임·매립형 유리 패널·반응형 사진 헤더를 관리한다. `assets/cyber-core.png`는 내장 ImageGen으로 생성한 로컬 이미지이며 생성 프롬프트는 `assets/cyber-core-prompt.txt`에 보관한다. 외부 네트워크 요청 없이 동작한다. 모바일에서는 AI 코어 이미지 아래에 제목을 배치한다. 65개 UI의 명칭·순서·조작 예시는 유지한다.
