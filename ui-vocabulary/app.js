
const push=document.querySelector('#push');let clicks=0;push.onclick=()=>{push.textContent=`클릭 ${++clicks}회`};
const sw=document.querySelector('#switch');sw.onclick=()=>{const on=sw.getAttribute('aria-checked')!=='true';sw.setAttribute('aria-checked',String(on));document.querySelector('#switch-status').textContent=on?'ON':'OFF'};
document.querySelector('#range').oninput=e=>document.querySelector('#range-value').value=e.target.value;
const tabs=[...document.querySelectorAll('[role=tab]')];function selectTab(tab){tabs.forEach(t=>{t.setAttribute('aria-selected',String(t===tab));t.tabIndex=t===tab?0:-1});const p=document.querySelector('#panel');p.textContent=tab.textContent+' 모음';p.setAttribute('aria-labelledby',tab.id)}tabs.forEach((tab,i)=>{tab.onclick=()=>selectTab(tab);tab.onkeydown=e=>{let n;if(e.key==='ArrowRight'||e.key==='ArrowLeft')n=1-i;else if(e.key==='Home')n=0;else if(e.key==='End')n=1;else return;e.preventDefault();selectTab(tabs[n]);tabs[n].focus()}});
const modal=document.querySelector('#modal');document.querySelector('#open-modal').onclick=()=>modal.showModal();modal.addEventListener('click',e=>{const r=modal.getBoundingClientRect();if(e.target===modal&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))modal.close()});


const tooltipTrigger = document.querySelector('#tooltip-trigger');
const tooltip = document.querySelector('#tooltip');
const showTooltip = () => { tooltip.hidden = false; };
const hideTooltip = () => { tooltip.hidden = true; };
tooltipTrigger.addEventListener('pointerenter', showTooltip);
tooltipTrigger.addEventListener('pointerleave', hideTooltip);
tooltipTrigger.addEventListener('focus', showTooltip);
tooltipTrigger.addEventListener('blur', hideTooltip);
tooltipTrigger.addEventListener('click', showTooltip);
tooltipTrigger.addEventListener('keydown', event => {
  if (event.key === 'Escape') hideTooltip();
});

let toastTimer;
document.querySelector('#show-toast').addEventListener('click', () => {
  const toast = document.querySelector('#toast');
  clearTimeout(toastTimer);
  toast.hidden = false;
  toastTimer = setTimeout(() => { toast.hidden = true; }, 2500);
});

const pages = [...document.querySelectorAll('.pagination button')];
pages.forEach(button => button.addEventListener('click', () => {
  pages.forEach(page => page.removeAttribute('aria-current'));
  button.setAttribute('aria-current', 'page');
  document.querySelector('#page-content').textContent = `${button.textContent}페이지 내용`;
}));

const crumbs = [...document.querySelectorAll('.breadcrumbs button')];
function setBreadcrumb(level) {
  crumbs.forEach((button, index) => {
    button.hidden = index > level;
    button.removeAttribute('aria-current');
    if (index > 0) button.previousElementSibling.hidden = index > level;
  });
  crumbs[level].setAttribute('aria-current', 'page');
  document.querySelector('#breadcrumb-content').textContent = `${crumbs[level].textContent} 폴더`;
}
crumbs.forEach((button, index) => button.addEventListener('click', () => setBreadcrumb(index)));
document.querySelector('#breadcrumb-reset').addEventListener('click', () => setBreadcrumb(2));

document.querySelector('#advance-progress').addEventListener('click', event => {
  const progress = document.querySelector('#progress');
  progress.value = progress.value === 100 ? 0 : progress.value + 25;
  document.querySelector('#progress-status').textContent = `${progress.value}%`;
  event.currentTarget.textContent = progress.value === 100 ? '다시 시작' : '진행하기';
});

let quantity = 1;
function updateQuantity(change) {
  quantity = Math.max(1, Math.min(9, quantity + change));
  document.querySelector('#quantity').value = quantity;
  document.querySelector('#decrease').disabled = quantity === 1;
  document.querySelector('#increase').disabled = quantity === 9;
}
document.querySelector('#decrease').addEventListener('click', () => updateQuantity(-1));
document.querySelector('#increase').addEventListener('click', () => updateQuantity(1));
document.querySelectorAll('.chip').forEach(chip => chip.addEventListener('click', () => {
  chip.setAttribute('aria-pressed', String(chip.getAttribute('aria-pressed') !== 'true'));
}));

document.querySelector('#search').addEventListener('input', event => {
  const matches = ['사과', '바나나', '포도'].filter(fruit => fruit.includes(event.target.value.trim()));
  document.querySelector('#search-result').textContent = matches.length ? matches.join(' · ') : '검색 결과가 없어요';
});

const slides = [['🌿', '숲', '#112c2e'], ['🌊', '바다', '#12253d'], ['🌅', '노을', '#302039']];
let slideIndex = 0;
function changeSlide(direction) {
  slideIndex = (slideIndex + direction + slides.length) % slides.length;
  const slide = document.querySelector('#slide');
  slide.children[0].textContent = slides[slideIndex][0];
  slide.children[1].textContent = slides[slideIndex][1];
  slide.style.background = slides[slideIndex][2];
  document.querySelector('#slide-count').textContent = `${slideIndex + 1} / ${slides.length}`;
}
document.querySelector('#previous-slide').addEventListener('click', () => changeSlide(-1));
document.querySelector('#next-slide').addEventListener('click', () => changeSlide(1));

// 추가된 모바일 친화적 예시.
const navigationButtons = [...document.querySelectorAll('.bottom-nav button')];
navigationButtons.forEach(button => button.addEventListener('click', () => {
  navigationButtons.forEach(item => item.removeAttribute('aria-current'));
  button.setAttribute('aria-current', 'page');
  document.querySelector('#nav-content').textContent = `${button.dataset.screen} 화면`;
}));

function connectOverlay(triggerId, dialogId, onSelect) {
  const trigger = document.getElementById(triggerId);
  const dialog = document.getElementById(dialogId);
  trigger.addEventListener('click', () => {
    dialog.returnValue = '';
    document.body.classList.add('overlay-open');
    dialog.showModal();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('overlay-open');
    if (dialog.returnValue) onSelect(dialog.returnValue);
    trigger.focus({ preventScroll: true });
  });
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close('');
  });
}
connectOverlay('open-sheet', 'bottom-sheet', value => {
  document.querySelector('#sheet-selection').textContent = `${value} · 다시 열기`;
});
connectOverlay('open-drawer', 'side-drawer', value => {
  document.querySelector('#drawer-status').textContent = `${value} 화면`;
});

const segments = [...document.querySelectorAll('.segmented button')];
segments.forEach(button => button.addEventListener('click', () => {
  segments.forEach(item => item.setAttribute('aria-pressed', String(item === button)));
  document.querySelector('#billing-price').textContent = button.dataset.price;
}));
const ratingInputs = [...document.querySelectorAll('.rating input')];
ratingInputs.forEach(input => input.addEventListener('change', () => {
  ratingInputs.forEach(item => item.parentElement.classList.toggle('filled', Number(item.value) <= Number(input.value)));
  document.querySelector('#rating-status').textContent = `${input.value} / 5점`;
}));
document.querySelector('#toggle-password').addEventListener('click', event => {
  const input = document.querySelector('#password-demo');
  const visible = input.type === 'password';
  input.type = visible ? 'text' : 'password';
  event.currentTarget.setAttribute('aria-pressed', String(visible));
  event.currentTarget.textContent = visible ? '숨기기' : '보기';
});
document.querySelector('#message-demo').addEventListener('input', event => {
  document.querySelector('#message-count').textContent = `${event.target.value.length} / 100`;
});
function updateNotifications(unread) {
  document.querySelector('#notification-count').hidden = !unread;
  document.querySelector('#notification-demo').setAttribute('aria-label', unread ? '알림 3개, 눌러서 모두 읽기' : '읽지 않은 알림 없음');
  document.querySelector('#notification-status').textContent = unread ? '읽지 않은 알림 3개' : '모두 읽었어요';
}
document.querySelector('#notification-demo').addEventListener('click', () => updateNotifications(false));
document.querySelector('#reset-notifications').addEventListener('click', () => updateNotifications(true));
let noteCount = 0;
document.querySelector('#add-note').addEventListener('click', () => {
  document.querySelector('#note-count').textContent = `메모 ${++noteCount}개`;
});
document.querySelector('#dismiss-alert').addEventListener('click', () => {
  document.querySelector('#alert-banner').hidden = true;
  document.querySelector('#restore-alert').hidden = false;
  document.querySelector('#restore-alert').focus({ preventScroll: true });
});
document.querySelector('#restore-alert').addEventListener('click', () => {
  document.querySelector('#alert-banner').hidden = false;
  document.querySelector('#restore-alert').hidden = true;
  document.querySelector('#dismiss-alert').focus({ preventScroll: true });
});
