# 프론트엔드단어장 — 용어 대조 기록

검토일: 2026-10-12. 대상: `index.html`의 65개 한글·영문 명칭.

이 기록의 번호는 최초 추가 순서의 고정 검토 ID이며 현재 화면 순서가 아니다. 빈도 기준으로 재배치한 현재 순서는 README의 표시 순서를 따른다.

실재하는 컴포넌트 또는 UI 패턴에 대응하는지 확인했다. 아래 근거는 해당 용어의 사용을 보여주며, 사용 빈도 순위나 전 세계 공통 표준을 입증하는 자료는 아니다. 한글 명칭은 국내 라이브러리의 표기, 음역, 비전공자용 설명 번역을 함께 사용한다. 설명 번역을 공식 표준 번역으로 간주하면 안 된다.

## 1차 검토에서 수정한 8개 항목

| 번호 | 이전 | 현재 | 수정 이유 |
| --- | --- | --- | --- |
| 6 | 셀렉트 박스 / Select Box | 셀렉트 / Select | 기존도 쓰이는 말이지만 KRDS의 컴포넌트 표기로 통일 |
| 7 | 입력 필드 / Input Field | 텍스트 필드 / Text Field | 입력 필드는 범위가 넓음. 예시는 한 줄 텍스트 필드 |
| 10 | 모달 / Modal Dialog | 모달 대화상자 / Modal Dialog | modal은 표시 방식도 뜻함. 영문과 한글 범위를 맞춤 |
| 16 | 수량 조절기 / Quantity Stepper | 스테퍼(수량 조절) / Stepper | 수량은 예시 용도. Apple의 실제 컴포넌트명은 Stepper |
| 23 | 사이드 내비게이션 / Navigation Drawer | 내비게이션 드로어 / Navigation Drawer | 고정 사이드 탐색과 열고 닫는 드로어를 구분 |
| 38 | 인증번호 입력창 / Verification Code Input | 일회용 인증번호 입력 / OTP Input | 이전은 설명형 이름. OTP·Pin Input 계열의 검색 가능한 이름으로 정리 |
| 39 | 입력값 검증 / Form Validation | 폼 유효성 검사 / Form Validation | 부품 자체가 아니라 폼 검증 동작이라는 뜻을 명확히 함 |
| 46 | 콘텐츠 카드 / Content Card | 카드 / Card | 콘텐츠는 용도를 덧붙인 말. 일반 컴포넌트명은 Card |

기존 이름들이 모두 허구였다는 뜻은 아니다. 설명형 이름과 대표 명칭을 구분하고 한영 대응을 더 정확히 한 것이다.

## 전체 65개 대조

‘유지’는 뜻이 맞는다는 판단이지, 한글 표기가 유일한 공식 번역이라는 뜻이 아니다. 근거의 컴포넌트명과 현재 이름이 다르면 비고에 구분했다.

| 번호 | 한글 | 영문 | 근거·판정 |
| --- | --- | --- | --- |
| 1 | 체크박스 | Checkbox | [W3C][w3c], [HANUI][hanui] — 유지 |
| 2 | 라디오 버튼 | Radio Button | [W3C][w3c] Radio Group, [HANUI][hanui] Radio — 그룹 내 개별 버튼 이름으로 유지 |
| 3 | 버튼 | Button | [W3C][w3c], [HANUI][hanui] — 유지 |
| 4 | 토글 스위치 | Switch | [W3C][w3c]의 정확한 패턴명으로 영문 통일 |
| 5 | 슬라이더 | Slider | [W3C][w3c], [HANUI][hanui] — 유지 |
| 6 | 셀렉트 | Select | [KRDS][krds] — 한영 표기 맞춤 |
| 7 | 텍스트 필드 | Text Field | [Atlassian][ads] Text field — 예시 범위에 맞춤 |
| 8 | 탭 | Tabs | [W3C][w3c], [HANUI][hanui] — 유지 |
| 9 | 아코디언 | Accordion | [W3C][w3c], [HANUI][hanui] — 유지. 예시는 단일 패널로 단순화 |
| 10 | 모달 대화상자 | Modal Dialog | [W3C][w3c] Dialog (Modal), [Atlassian][ads] — 한글 보완 |
| 11 | 툴팁 | Tooltip | [W3C][w3c] — 유지 |
| 12 | 토스트 알림 | Toast | [Adobe][toast]의 정확한 컴포넌트명으로 영문 통일 |
| 13 | 페이지네이션 | Pagination | [Atlassian][ads], [HANUI][hanui] — 유지 |
| 14 | 브레드크럼 | Breadcrumb | [W3C][w3c], [HANUI][hanui] — Breadcrumbs도 사용, 유지 |
| 15 | 진행 표시줄 | Progress Bar | [Atlassian][ads] — 의미 번역, 유지 |
| 16 | 스테퍼(수량 조절) | Stepper | [Apple][stepper] — 증감 컨트롤. 40번 단계 표시기와 구별 |
| 17 | 필터 칩 | Filter Chip | [Android][chip] — 유지. 예시는 선택 상태만 시연 |
| 18 | 검색창 | Search Field | [Adobe][search] — 의미 번역, 유지 |
| 19 | 캐러셀 | Carousel | [W3C][w3c], [HANUI][hanui] — 유지 |
| 20 | 날짜 선택기 | Date Picker | [Chakra][chakra] — 의미 번역, 유지 |
| 21 | 하단 내비게이션 | Bottom Navigation | [MUI][bottom-nav] — 유지. 다른 시스템에서는 Navigation Bar 또는 Tab Bar라는 이름도 사용 |
| 22 | 바텀 시트 | Bottom Sheet | [Android][android-quick] — 음역, 유지 |
| 23 | 내비게이션 드로어 | Navigation Drawer | [Android][android-quick] — 한영 범위 맞춤. 한국어 Android 문서에서는 탐색 창 표기도 사용 |
| 24 | 세그먼트 컨트롤 | Segmented Control | [Apple][segmented], [Chakra][chakra] — 통용 음역, 유지 |
| 25 | 별점 | Rating | [MUI][rating]와 [Chakra][chakra]의 컴포넌트명으로 통일 |
| 26 | 비밀번호 입력창 | Password Input | [Chakra][password]의 정확한 컴포넌트명으로 통일. Password Field도 실제 표현이나 본 단어장은 Input 채택 |
| 27 | 여러 줄 입력창 | Text Area | [Atlassian][ads] Text area, [HANUI][hanui] Textarea — 한글은 쉬운 뜻풀이, 유지 |
| 28 | 알림 배지 | Badge | [Atlassian][ads]의 정확한 컴포넌트명. 예시는 알림 개수 배지 |
| 29 | 플로팅 액션 버튼 | Floating Action Button | [Android][android] — 유지. 약칭 FAB |
| 30 | 알림 배너 | Alert Banner | [Adobe Spectrum][alert-banner]의 실제 컴포넌트 제목과 일치. 유지 |
| 31 | 드롭다운 메뉴 | Dropdown Menu | [Atlassian][ads] — 유지. 값을 고르는 Select와 작업 메뉴를 구분 |
| 32 | 팝오버 | Popover | [Chakra][chakra] — 유지. 설정 컨트롤을 담는 팝업; 짧은 설명 전용 Tooltip과 구별 |
| 33 | 자동완성 | Autocomplete | [MUI][autocomplete] — 유지. 현재 구현 형태는 추천 목록이 있는 Combobox |
| 34 | 다중 선택 | Multi-select | [Carbon][carbon] Multiselect — 하이픈 표기 변형, 유지 |
| 35 | 파일 업로드 | File Upload | [Chakra][chakra], [HANUI][hanui] — 유지. 이 예시는 파일 선택만 수행 |
| 36 | 색상 선택기 | Color Picker | [Chakra][chakra] — 의미 번역, 유지 |
| 37 | 시간 선택기 | Time Picker | [USWDS][time] — 의미 번역, 유지 |
| 38 | 일회용 인증번호 입력 | OTP Input | [Ant Design][ant-input]에서 OTP input 표현 사용. [shadcn/ui][otp]는 Input OTP, [Chakra][pin]는 Pin Input으로 명명. 유지 |
| 39 | 폼 유효성 검사 | Form Validation | [Bootstrap][validation] — 개별 부품명보다 검증 동작·피드백 패턴 |
| 40 | 단계 표시기 | Step Indicator | [USWDS][steps] — 실제 사용되는 이름. [MUI][mui-stepper]에서는 Stepper로도 부름 |
| 41 | 스켈레톤 로딩 | Skeleton | [Atlassian][ads]의 정확한 컴포넌트명으로 통일 |
| 42 | 로딩 스피너 | Spinner | [Atlassian][ads]의 정확한 컴포넌트명으로 통일 |
| 43 | 빈 상태 | Empty State | [Atlassian][ads] — 데이터가 없는 상태 패턴, 의미 번역 |
| 44 | 오류 상태 | Error State | [PatternFly][error] — 오류 및 복구 안내 상태, 의미 번역 |
| 45 | 아바타 | Avatar | [Atlassian][ads], [Chakra][chakra] — 유지 |
| 46 | 카드 | Card | [Chakra][chakra], [HANUI][hanui] — 대표 컴포넌트명으로 통일 |
| 47 | 데이터 테이블 | Data Table | [shadcn/ui][shadcn], [HANUI][hanui] — 유지. 이 예시는 정렬 가능한 표 |
| 48 | 리스트 항목 | List Item | [MUI][list-item] ListItem — API 식별자를 읽기 좋게 띄어 쓴 이름, 유지 |
| 49 | 툴바 | Toolbar | [W3C][w3c] — 유지 |
| 50 | 라이트박스 | Lightbox | [PhotoSwipe][lightbox] — 실제 이미지 확대 라이브러리에서 사용. 이미지 표시 패턴이며 모달과 상하위 관계 가능 |
| 51 | 링크 | Link | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 52 | 앱 바 | App Bar | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 53 | 구분선 | Divider | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 54 | 버튼 그룹 | Button Group | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 55 | 토글 버튼 | Toggle Button | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 56 | 배경 가림막 | Backdrop | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 57 | 이미지 목록 | Image List | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 58 | 트리 뷰 | Tree View | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 59 | 타임라인 | Timeline | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 60 | 스피드 다이얼 | Speed Dial | [MUI 컴포넌트 목록][mui-components] — 실제 명칭과 일치 |
| 61 | 아이콘 버튼 | Icon Button | [MUI](https://mui.com/material-ui/react-button/#icon-button) — 실제 문서 명칭 |
| 62 | 범위 슬라이더 | Range Slider | [MUI](https://mui.com/material-ui/react-slider/#range-slider) — 실제 문서 명칭 |
| 63 | 기간 선택기 | Date Range Picker | [MUI](https://mui.com/x/react-date-pickers/date-range-picker/) — 실제 문서 명칭 |
| 64 | 스낵바 | Snackbar | [MUI](https://mui.com/material-ui/react-snackbar/) — 실제 문서 명칭 |
| 65 | 메이슨리 | Masonry | [MUI](https://mui.com/material-ui/react-masonry/) — 실제 문서 명칭 |

## 예시와 퀴즈에 관한 주의점

현재 예시는 이름을 익히는 간소화된 시연이다. 접근성 표준 전체 준수나 각 디자인 시스템의 완전한 구현을 인증한 것은 아니다. 아코디언은 패널 하나, 필터 칩은 선택 상태, 파일 업로드는 파일 선택만 보여준다. 팝오버와 드롭다운 메뉴는 카드 안에서 펼쳐지는 간소화된 구현이다.

50개는 서로 배타적인 50종의 기본 부품이 아니다. 모달/라이트박스, 텍스트 필드/검색창/비밀번호 입력, 빈 상태/오류 상태 등은 상위 개념·변형·패턴이 섞여 있다. 향후 퀴즈에서는 한 그림에 여러 정답이 성립할 수 있는 조합을 피해야 한다. Stepper는 시스템에 따라 수량 증감 또는 단계 흐름을 뜻하므로 맥락을 표시해야 한다.

[krds]: https://www.krds.go.kr/html/site/component/component_06_03.html
[hanui]: https://hanui.io/components
[w3c]: https://www.w3.org/WAI/ARIA/apg/patterns/
[ads]: https://atlassian.design/components/
[chakra]: https://chakra-ui.com/docs/components/concepts/overview
[stepper]: https://developer.apple.com/design/human-interface-guidelines/steppers
[segmented]: https://developer.apple.com/design/human-interface-guidelines/segmented-controls
[android]: https://developer.android.com/develop/ui/compose/components?hl=ko
[android-quick]: https://developer.android.com/develop/ui/compose/quick-guides/collections/display-interactive-components?hl=en
[chip]: https://developer.android.com/develop/ui/compose/quick-guides/content/create-chip
[bottom-nav]: https://mui.com/material-ui/react-bottom-navigation/
[search]: https://react-spectrum.adobe.com/react-spectrum/SearchField.html
[toast]: https://spectrum.adobe.com/web/rsp/components/toast
[password]: https://chakra-ui.com/docs/components/password-input
[autocomplete]: https://mui.com/material-ui/react-autocomplete/
[otp]: https://ui.shadcn.com/docs/components/radix/input-otp
[pin]: https://chakra-ui.com/docs/components/pin-input
[validation]: https://getbootstrap.com/docs/5.0/forms/validation/
[steps]: https://designsystem.digital.gov/components/step-indicator/
[mui-stepper]: https://mui.com/material-ui/react-stepper/
[time]: https://designsystem.digital.gov/components/time-picker/
[error]: https://www.patternfly.org/component-groups/error-communication/error-state/
[shadcn]: https://ui.shadcn.com/docs/components
[lightbox]: https://photoswipe.com/getting-started/

## 2차 검토 — 영문 표시만 재확인

영문은 실무 문서의 대표 명칭을 우선한다. 뜻이 통하는 설명형 표현도 모두 틀린 것은 아니지만, 학습용 표시에서는 다음 7개를 간결한 컴포넌트명으로 통일했다. 한글과 예시 동작은 변경하지 않았다.

| 이전 영문 | 현재 영문 | 근거 |
| --- | --- | --- |
| Toggle Switch | Switch | [W3C][w3c] |
| Toast Notification | Toast | [Adobe][toast] |
| Star Rating | Rating | [MUI][rating] |
| Password Field | Password Input | [Chakra][password] |
| Notification Badge | Badge | [Atlassian][ads] |
| Skeleton Loading | Skeleton | [Atlassian][ads] |
| Loading Spinner | Spinner | [Atlassian][ads] |

확인 결과, 현재 50개 영문은 실제 문서의 명칭 또는 문서에서 쓰는 용어의 대소문자·띄어쓰기·단복수 변형이다. 이는 유일한 국제 표준 명칭이라는 의미가 아니다. OTP Input/Input OTP/Pin Input, Breadcrumb/Breadcrumbs, Multi-select/Multiselect 같은 차이는 오류로 단정하지 않는다. Alert Banner는 Adobe의 독립된 제목으로 직접 확인했으므로 이전의 ‘단순 조합명’ 판정을 바로잡았다.

Stepper는 특히 주의한다. [Apple][stepper]의 증감 컨트롤과 [MUI][mui-stepper]의 단계 진행 표시가 같은 이름을 사용한다. 현 예시의 Stepper는 전자이며, 40번의 Step Indicator는 [USWDS][steps]에 근거한 별도 표기다. 현재 모습과 영문이 맞는다는 판단과, 모든 제품에서 그 이름을 쓰는지는 별개의 문제다.

[alert-banner]: https://spectrum.adobe.com/page/alert-banner/
[carbon]: https://www.carbondesignsystem.com/building-blocks/core/components/overview/components
[ant-input]: https://ant.design/components/input/
[list-item]: https://mui.com/material-ui/api/list-item/
[rating]: https://mui.com/material-ui/react-rating/

[mui-components]: https://mui.com/material-ui/all-components/

## 60개 확장 메모

검토 ID 51–60을 추가했다. 위 1·2차 검토의 50개는 당시 대상 개수다. 현재 60개 역시 기능·상태·컴포넌트가 섞여 있으며, 번호는 화면 순위가 아니다. Tree View는 중첩된 폴더를 native details/summary로 표현한 시연이며 완전한 ARIA tree 키보드 패턴 구현은 아니다. Backdrop은 카드 안에서 가림막을 보여준다. Divider는 방향 전환으로 시각적 형태를 체험한다.


## 65개 확장 메모

추가는 65개에서 마친다. Icon Button과 Range Slider는 기존 Button·Slider의 변형이다. Date Range Picker는 시작·종료 날짜 입력 두 개로 간소화했으며 단일 달력 내 범위 하이라이트는 구현하지 않았다. Snackbar는 되돌리기 버튼이 있는 알림으로 시연한다. Toast와 Snackbar는 디자인 시스템에 따라 개념이 겹치므로 서로 배타적인 퀴즈 정답으로 취급하지 않는다. Masonry는 높이가 다른 항목의 열 배치를 보여준다. 모두 로컬 코드이며 MUI 라이브러리에 의존하지 않는다.
