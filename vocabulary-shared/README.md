# 배포·인프라단어장 / AI연동단어장

각 폴더의 index.html을 열면 실행되는 로컬 학습용 페이지입니다. 공유 스타일과 시뮬레이션 로직은 vocabulary-shared에 있습니다. 기본 카드 스타일은 backend-vocabulary/styles.css를 사용하므로 폴더들을 함께 유지하세요.

배포·인프라 6개: Deployment, Hosting, Domain Name, DNS, HTTPS, Environment Variable.
AI연동 5개: Model, Token, Context, Streaming, Tool Calling.

실제 네트워크 요청·배포·모델 호출·과금은 없습니다. 상태는 메모리에서만 관리됩니다. 도메인과 IP는 설명용 예약 주소이며 DNS 캐시는 재현하지 않습니다. HTTPS 표시는 실제 암호 연산이 아닌 설명입니다. 가상 모델 응답은 고정 문구이며 토큰 분할은 실제 토크나이저 결과가 아닙니다. 스트리밍은 같은 예시 문장을 조각으로 표시하며 도구 호출은 로컬 곱셈만 실행합니다.

참고한 공식 자료:
- MDN 웹 동작 원리: https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works
- MDN 도메인: https://developer.mozilla.org/en-US/docs/Glossary/Domain
- Anthropic 도구와 모델 구성: https://www.anthropic.com/engineering/building-effective-agents

검증: 11개 카드 선택 분기의 결과, 4개 페이지 메뉴와 카드 수, 320/390/768/1440px 가로 넘침, 브라우저 실행 오류 확인.
