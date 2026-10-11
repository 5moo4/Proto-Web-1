// 독립적인 확장 예시. 서버 요청이나 파일 전송은 하지 않는다.
function disclosure(triggerId, contentId) {
  const trigger = document.getElementById(triggerId);
  const content = document.getElementById(contentId);
  const root = trigger.parentElement;
  function setOpen(open, restoreFocus = false) {
    trigger.setAttribute('aria-expanded', String(open));
    content.hidden = !open;
    if (restoreFocus) trigger.focus({ preventScroll: true });
  }
  trigger.addEventListener('click', () => setOpen(content.hidden));
  root.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !content.hidden) { event.preventDefault(); setOpen(false, true); }
  });
  root.addEventListener('focusout', event => {
    if (!root.contains(event.relatedTarget)) setOpen(false);
  });
  document.addEventListener('pointerdown', event => {
    if (!root.contains(event.target)) setOpen(false);
  });
  return setOpen;
}
const closeActions = disclosure('action-trigger', 'action-list');
document.querySelectorAll('[data-action]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#action-status').textContent = `${button.dataset.action}했어요`;
  closeActions(false, true);
}));
disclosure('popover-trigger', 'popover-content');
let previewSize = 16;
function changePreviewSize(delta) {
  previewSize = Math.max(12, Math.min(24, previewSize + delta));
  document.querySelector('#font-preview').style.fontSize = `${previewSize}px`;
  document.querySelector('#font-smaller').disabled = previewSize === 12;
  document.querySelector('#font-larger').disabled = previewSize === 24;
}
document.querySelector('#font-smaller').addEventListener('click', () => changePreviewSize(-2));
document.querySelector('#font-larger').addEventListener('click', () => changePreviewSize(2));

const cityInput = document.querySelector('#city-input');
const cityOptions = document.querySelector('#city-options');
const cityStatus = document.querySelector('#city-status');
let cityMatches = [];
let activeCity = -1;
function closeCities() {
  cityOptions.hidden = true;
  cityInput.setAttribute('aria-expanded', 'false');
  cityInput.removeAttribute('aria-activedescendant');
  cityStatus.hidden = false;
  activeCity = -1;
}
function chooseCity(index) {
  if (!cityMatches[index]) return;
  cityInput.value = cityMatches[index];
  cityStatus.textContent = `${cityMatches[index]} 선택`;
  closeCities();
}
function suggestCities() {
  cityMatches = ['서울', '부산', '제주'].filter(city => city.includes(cityInput.value.trim()));
  cityOptions.replaceChildren();
  activeCity = -1;
  cityInput.removeAttribute('aria-activedescendant');
  cityMatches.forEach((city, index) => {
    const option = document.createElement('div');
    option.id = `city-option-${index}`;
    option.setAttribute('role', 'option');
    option.setAttribute('aria-selected', 'false');
    option.textContent = city;
    option.addEventListener('pointerdown', event => event.preventDefault());
    option.addEventListener('click', () => chooseCity(index));
    cityOptions.append(option);
  });
  cityOptions.hidden = !cityMatches.length;
  cityStatus.hidden = !!cityMatches.length;
  cityStatus.textContent = cityMatches.length ? '도시 이름을 입력해 보세요' : '일치하는 도시가 없어요';
  cityInput.setAttribute('aria-expanded', String(!!cityMatches.length));
}
cityInput.addEventListener('input', suggestCities);
cityInput.addEventListener('focus', suggestCities);
cityInput.addEventListener('blur', closeCities);
cityInput.addEventListener('keydown', event => {
  if (event.isComposing) return;
  if (event.key === 'Escape') { closeCities(); return; }
  if (event.key === 'Enter' && activeCity >= 0) { event.preventDefault(); chooseCity(activeCity); return; }
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  event.preventDefault();
  if (cityOptions.hidden) suggestCities();
  if (!cityMatches.length) return;
  activeCity = (activeCity + (event.key === 'ArrowDown' ? 1 : activeCity < 0 ? 0 : -1) + cityMatches.length) % cityMatches.length;
  [...cityOptions.children].forEach((option, index) => option.setAttribute('aria-selected', String(index === activeCity)));
  cityInput.setAttribute('aria-activedescendant', cityOptions.children[activeCity].id);
});

disclosure('multi-trigger', 'multi-options');
document.querySelectorAll('#multi-options input').forEach(input => input.addEventListener('change', () => {
  const values = [...document.querySelectorAll('#multi-options input:checked')].map(item => item.value);
  document.querySelector('#multi-summary').textContent = values.join(' · ') || '선택 없음';
  document.querySelector('#multi-trigger').textContent = values.length ? `${values.length}개 선택 ▾` : '관심 분야 선택 ▾';
}));
document.querySelector('#file-demo').addEventListener('change', event => {
  document.querySelector('#file-status').textContent = event.target.files[0]?.name || '선택만 해요 · 전송하지 않아요';
});
document.querySelector('#color-demo').addEventListener('input', event => {
  document.querySelector('#color-value').textContent = event.target.value;
});
document.querySelector('#otp-demo').addEventListener('input', event => {
  const input = event.target;
  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 6);
  document.querySelector('#otp-status').textContent = input.value.length === 6 ? '6자리 입력 완료' : `${input.value.length} / 6자리`;
});
const emailInput = document.querySelector('#email-demo');
document.querySelector('#validation-demo').addEventListener('submit', event => {
  event.preventDefault();
  const valid = emailInput.validity.valid;
  emailInput.setAttribute('aria-invalid', String(!valid));
  document.querySelector('#email-status').textContent = valid ? '올바른 이메일 형식이에요' : '이메일 형식을 확인해 주세요';
  document.querySelector('#email-status').classList.toggle('invalid', !valid);
  if (!valid) emailInput.focus();
});
emailInput.addEventListener('input', () => {
  emailInput.removeAttribute('aria-invalid');
  document.querySelector('#email-status').classList.remove('invalid');
  document.querySelector('#email-status').textContent = '이메일 형식을 확인해 보세요';
});
let currentStep = 0;
function moveStep(delta) {
  currentStep = Math.max(0, Math.min(2, currentStep + delta));
  document.querySelectorAll('.steps li').forEach((step, index) => {
    step.removeAttribute('aria-current');
    if (index === currentStep) step.setAttribute('aria-current', 'step');
    step.classList.toggle('complete', index < currentStep);
  });
  document.querySelector('#step-back').disabled = currentStep === 0;
  document.querySelector('#step-next').textContent = currentStep === 2 ? '처음으로' : '다음';
}
document.querySelector('#step-back').addEventListener('click', () => moveStep(-1));
document.querySelector('#step-next').addEventListener('click', () => moveStep(currentStep === 2 ? -2 : 1));

function simulatedLoad(buttonId, start, finish) {
  const button = document.getElementById(buttonId);
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-disabled') === 'true') return;
    button.setAttribute('aria-disabled', 'true');
    start();
    setTimeout(() => {
      finish();
      button.removeAttribute('aria-disabled');
      button.textContent = '다시 불러오기';
    }, 1400);
  });
}
simulatedLoad('load-skeleton', () => {
  document.querySelector('#skeleton-preview').setAttribute('aria-busy', 'true');
  document.querySelector('.skeleton-lines').hidden = false;
  document.querySelector('.loaded-content').hidden = true;
  document.querySelector('#skeleton-status').textContent = '불러오는 중';
}, () => {
  document.querySelector('#skeleton-preview').setAttribute('aria-busy', 'false');
  document.querySelector('.skeleton-lines').hidden = true;
  document.querySelector('.loaded-content').hidden = false;
  document.querySelector('#skeleton-status').textContent = '불러오기 완료';
});
simulatedLoad('load-spinner', () => {
  document.querySelector('#spinner').hidden = false;
  document.querySelector('#spinner-status').textContent = '불러오는 중';
}, () => {
  document.querySelector('#spinner').hidden = true;
  document.querySelector('#spinner-status').textContent = '불러오기 완료';
});
let hasItem = false;
document.querySelector('#empty-add').addEventListener('click', event => {
  hasItem = !hasItem;
  document.querySelector('#empty-status').textContent = hasItem ? '첫 번째 항목을 저장했어요' : '아직 저장한 항목이 없어요';
  event.currentTarget.textContent = hasItem ? '항목 비우기' : '첫 항목 추가';
});
let recovered = false;
document.querySelector('#retry-demo').addEventListener('click', event => {
  recovered = !recovered;
  document.querySelector('#error-status').textContent = recovered ? '내용을 불러왔어요' : '내용을 불러오지 못했어요';
  document.querySelector('.error-icon').textContent = recovered ? '✓' : '!';
  event.currentTarget.textContent = recovered ? '오류 다시 보기' : '다시 시도';
});
const avatars = ['민', '🌱', '🐱'];
let avatarIndex = 0;
document.querySelector('#avatar-demo').addEventListener('click', event => {
  avatarIndex = (avatarIndex + 1) % avatars.length;
  event.currentTarget.textContent = avatars[avatarIndex];
});
document.querySelector('#save-card').addEventListener('click', event => {
  const button = event.currentTarget;
  const saved = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(saved));
  button.textContent = saved ? '♥' : '♡';
});
let ascendingPrice = false;
document.querySelector('#sort-price').addEventListener('click', event => {
  ascendingPrice = !ascendingPrice;
  const products = [['노트', 3000], ['펜', 1000], ['가방', 9000]].sort((a, b) => ascendingPrice ? a[1] - b[1] : b[1] - a[1]);
  const tbody = document.querySelector('#price-rows');
  tbody.replaceChildren();
  products.forEach(([name, price]) => {
    const row = tbody.insertRow();
    row.insertCell().textContent = name;
    row.insertCell().textContent = `${price.toLocaleString('ko-KR')}원`;
  });
  document.querySelector('#price-heading').setAttribute('aria-sort', ascendingPrice ? 'ascending' : 'descending');
  event.currentTarget.textContent = ascendingPrice ? '가격 ↑' : '가격 ↓';
});
document.querySelectorAll('[data-list-item]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#list-status').textContent = `${button.dataset.listItem} 화면`;
}));
const formatButtons = [...document.querySelectorAll('[data-format]')];
formatButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    const active = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(active));
    document.querySelector('#format-preview').classList.toggle(`format-${button.dataset.format}`, active);
  });
  button.addEventListener('focus', () => formatButtons.forEach(item => { item.tabIndex = item === button ? 0 : -1; }));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % formatButtons.length;
    else if (event.key === 'ArrowLeft') next = (index + formatButtons.length - 1) % formatButtons.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = formatButtons.length - 1;
    else return;
    event.preventDefault();
    formatButtons[next].focus();
  });
});
connectOverlay('open-lightbox', 'image-lightbox', () => {});

// MUI 명칭을 기준으로 추가한 탐색·표현 예시.
document.querySelector('.demo-link').addEventListener('click', () => {
  document.querySelector('#card-example').focus({ preventScroll: true });
});
document.querySelector('#appbar-back').addEventListener('click', () => {
  document.querySelector('#appbar-body').textContent = '홈 화면';
});
document.querySelector('#appbar-search').addEventListener('click', () => {
  const input = document.createElement('input');
  input.className = 'text'; input.type = 'search'; input.placeholder = '앱 안에서 검색';
  input.setAttribute('aria-label', '앱 바 예시 검색');
  document.querySelector('#appbar-body').replaceChildren(input); input.focus();
});
document.querySelector('#divider-toggle').addEventListener('click', event => {
  const vertical = document.querySelector('#divider-preview').classList.toggle('vertical');
  document.querySelector('#divider-line').setAttribute('aria-orientation', vertical ? 'vertical' : 'horizontal');
  event.currentTarget.textContent = vertical ? '가로로 보기' : '세로로 보기';
});
document.querySelectorAll('[data-document-action]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#group-status').textContent = `${button.dataset.documentAction} 선택 · 예시 동작`;
}));
document.querySelector('#bookmark-toggle').addEventListener('click', event => {
  const active = event.currentTarget.getAttribute('aria-pressed') !== 'true';
  event.currentTarget.setAttribute('aria-pressed', String(active));
  event.currentTarget.textContent = active ? '★' : '☆';
  document.querySelector('#bookmark-status').textContent = active ? '저장됨' : '저장 안 됨';
});
function showBackdrop(open) {
  document.querySelector('#sample-backdrop').hidden = !open;
  (open ? document.querySelector('#close-backdrop') : document.querySelector('#open-backdrop')).focus({ preventScroll: true });
}
document.querySelector('#open-backdrop').addEventListener('click', () => showBackdrop(true));
document.querySelector('#sample-backdrop').addEventListener('click', () => showBackdrop(false));
document.querySelector('#sample-backdrop').addEventListener('keydown', event => {
  if (event.key === 'Escape') { event.preventDefault(); showBackdrop(false); }
});
document.querySelectorAll('[data-image]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#image-list-status').textContent = `${button.dataset.image} 이미지 선택`;
  document.querySelectorAll('[data-image]').forEach(item => item.classList.toggle('selected-image', item === button));
}));
for (const [id, name] of [['tree-file', '풍경.svg'], ['tree-readme', '안내.txt']]) {
  document.getElementById(id).addEventListener('click', () => {
    document.querySelector('#tree-status').textContent = `${name} 선택`;
  });
}
document.querySelector('#timeline-toggle').addEventListener('click', event => {
  const arrival = document.querySelector('#timeline-arrival');
  arrival.hidden = !arrival.hidden;
  event.currentTarget.textContent = arrival.hidden ? '다음 이력 보기' : '처음 이력 보기';
});
const speedTrigger = document.querySelector('#speed-trigger');
const speedActions = document.querySelector('#speed-actions');
function setSpeedOpen(open, restoreFocus = false) {
  speedActions.hidden = !open;
  speedTrigger.setAttribute('aria-expanded', String(open));
  speedTrigger.setAttribute('aria-label', open ? '빠른 작업 접기' : '빠른 작업 펼치기');
  speedTrigger.textContent = open ? '×' : '+';
  if (restoreFocus) speedTrigger.focus({ preventScroll: true });
}
speedTrigger.addEventListener('click', () => {
  const open = speedActions.hidden; setSpeedOpen(open);
  if (open) speedActions.querySelector('button').focus({ preventScroll: true });
});
document.querySelectorAll('[data-speed-action]').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#speed-status').textContent = `${button.dataset.speedAction} 작업 선택`;
  setSpeedOpen(false, true);
}));
document.querySelector('.speed-demo').addEventListener('keydown', event => {
  if (event.key === 'Escape') setSpeedOpen(false, true);
});
document.addEventListener('pointerdown', event => {
  if (!document.querySelector('.speed-demo').contains(event.target)) setSpeedOpen(false);
});

// 최종 확장: 65개까지.
document.querySelector('#icon-search').addEventListener('click', () => {
  const input = document.querySelector('#icon-search-field');
  input.hidden = false; input.focus();
});
const priceMin = document.querySelector('#price-min');
const priceMax = document.querySelector('#price-max');
function updatePriceRange(event) {
  if (event.target === priceMin) priceMin.value = Math.min(Number(priceMin.value), Number(priceMax.value) - 5);
  else priceMax.value = Math.max(Number(priceMax.value), Number(priceMin.value) + 5);
  document.querySelector('#price-range-output').value = `${priceMin.value}–${priceMax.value}만원`;
  priceMin.setAttribute('aria-valuetext', `${priceMin.value}만원`);
  priceMax.setAttribute('aria-valuetext', `${priceMax.value}만원`);
  const fill = document.querySelector('#price-range-fill');
  fill.style.left = `${priceMin.value}%`;
  fill.style.right = `${100 - priceMax.value}%`;
}
priceMin.addEventListener('input', updatePriceRange);
priceMax.addEventListener('input', updatePriceRange);
const stayStart = document.querySelector('#stay-start');
const stayEnd = document.querySelector('#stay-end');
function updateStay(event) {
  if (stayStart.value && stayEnd.value && stayStart.value > stayEnd.value) {
    if (event.target === stayStart) stayEnd.value = stayStart.value;
    else stayStart.value = stayEnd.value;
  }
  stayEnd.min = stayStart.value;
  const ready = Number.isFinite(stayStart.valueAsNumber) && Number.isFinite(stayEnd.valueAsNumber);
  document.querySelector('#stay-status').textContent = ready
    ? `${Math.round((stayEnd.valueAsNumber - stayStart.valueAsNumber) / 86400000)}박 선택`
    : '시작일과 종료일을 선택하세요';
}
stayStart.addEventListener('input', updateStay);
stayEnd.addEventListener('input', updateStay);
let snackDeleted = false;
let snackTimer;
const snack = document.querySelector('#snackbar-demo');
function dismissSnack() {
  clearTimeout(snackTimer);
  const hadFocus = snack.contains(document.activeElement);
  snack.hidden = true;
  if (hadFocus) document.querySelector('#snack-delete').focus({ preventScroll: true });
}
function scheduleSnack() {
  clearTimeout(snackTimer);
  if (!snack.hidden && !snack.matches(':hover') && !snack.contains(document.activeElement)) {
    snackTimer = setTimeout(dismissSnack, 5000);
  }
}
function restoreSnackItem() {
  snackDeleted = false; dismissSnack();
  document.querySelector('#snack-item').textContent = '메모 1개';
  document.querySelector('#snack-delete').textContent = '메모 삭제';
}
document.querySelector('#snack-delete').addEventListener('click', () => {
  if (snackDeleted) { restoreSnackItem(); return; }
  snackDeleted = true;
  document.querySelector('#snack-item').textContent = '메모 없음';
  document.querySelector('#snack-delete').textContent = '새 메모 추가';
  snack.hidden = false; scheduleSnack();
});
document.querySelector('#snack-undo').addEventListener('click', restoreSnackItem);
snack.addEventListener('pointerenter', () => clearTimeout(snackTimer));
snack.addEventListener('pointerleave', scheduleSnack);
snack.addEventListener('focusin', () => clearTimeout(snackTimer));
snack.addEventListener('focusout', () => setTimeout(scheduleSnack, 0));
snack.addEventListener('keydown', event => { if (event.key === 'Escape') dismissSnack(); });
document.querySelector('#masonry-change').addEventListener('click', () => {
  document.querySelector('#masonry-demo').classList.toggle('alternate');
});
