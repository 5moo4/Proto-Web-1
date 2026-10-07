'use strict';
const $ = selector => document.querySelector(selector);
const storageKey = 'owmoosa-higgsfield-favorites-v1';
let saved = [];
try { const value = JSON.parse(localStorage.getItem(storageKey) || '[]'); if (Array.isArray(value)) saved = value.filter(id => commands.some(c => c.id === id)); } catch {}
const favorites = new Set(saved);
let category = 'all', onlyFavorites = false, toastTimer;
const labels = {image:'IMAGE PRESET', video:'VIDEO PRESET', camera:'CAMERA CONTROL'};
function notify(message) { $('#toast').textContent = message; clearTimeout(toastTimer); toastTimer = setTimeout(() => $('#toast').textContent = '', 3000); }
function exampleFor(c) {
  if (c.category === 'camera') return `카메라 컨트롤에서 ${c.name} 선택. 장면 설명: ${c.meaning} 연출로 숲속의 인물을 촬영해 줘.`;
  return `${c.name} 첨부한 제품을 활용해 ${c.meaning} ${c.category === 'image' ? '이미지를 만들어 줘.' : '영상을 만들어 줘.'}`;
}
function render() {
  const query = $('#search').value.trim().toLocaleLowerCase();
  const filtered = commands.filter(c => (category === 'all' || c.category === category) && (!onlyFavorites || favorites.has(c.id)) && `${c.name} ${c.meaning}`.toLocaleLowerCase().includes(query));
  $('#result-count').textContent = `${filtered.length}개의 명령어 · ${onlyFavorites ? '즐겨찾기' : '원본 순서'}`;
  $('#favorite-count').textContent = favorites.size;
  $('#empty').hidden = filtered.length > 0;
  $('#cards').innerHTML = filtered.map(c => `<article class="card" data-category="${c.category}" data-id="${c.id}"><div class="card-top"><span><span class="number">${String(c.id).padStart(3,'0')}</span><span class="badge">${labels[c.category]}</span></span><button class="star" data-action="favorite" aria-label="${c.name} 즐겨찾기" aria-pressed="${favorites.has(c.id)}">${favorites.has(c.id) ? '★' : '☆'}</button></div><h2>${c.name}</h2><p class="meaning">${c.meaning}</p><div class="card-bottom"><span class="syntax">${c.category === 'camera' ? '/ 없이 사용' : '/ 슬래시 명령어'}</span><button class="copy" data-action="copy" aria-label="${c.name} 복사">명령어 복사 ↗</button></div><div class="reference"><a class="reference-link ${c.reference.type}" href="${c.reference.url}" target="_blank" rel="noopener noreferrer" aria-label="${c.name} ${c.reference.type === 'official' ? '공식 예시 영상 보기' : '구글 검색'} (새 탭)">${c.name} · ${c.reference.type === 'official' ? '공식 예시 영상 ↗' : '구글 검색 ↗'}</a><small>${c.reference.type === 'official' ? 'Higgsfield 공식 개별 페이지 · 새 탭' : '개별 예시 링크 미확인 · 구글 검색 결과 · 새 탭'}</small></div><details><summary>사용 예시 보기</summary><div class="example">${exampleFor(c)}<button data-action="example">예시 복사</button></div></details></article>`).join('');
}
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
    else {
      const textarea = document.createElement('textarea'); textarea.value = text; textarea.style.cssText = 'position:fixed;opacity:0'; document.body.append(textarea); textarea.select();
      const success = document.execCommand('copy'); textarea.remove(); if (!success) throw new Error('copy failed');
    }
    notify('클립보드에 복사했어요.');
  } catch { notify('복사하지 못했어요. 명령어 텍스트를 선택해 복사해 주세요.'); }
}
$('#cards').addEventListener('click', event => {
  const button = event.target.closest('button[data-action]'); if (!button) return;
  const c = commands.find(c => c.id === Number(button.closest('.card').dataset.id));
  if (button.dataset.action === 'favorite') {
    favorites.has(c.id) ? favorites.delete(c.id) : favorites.add(c.id);
    try { localStorage.setItem(storageKey, JSON.stringify([...favorites])); } catch { notify('브라우저 저장이 제한되어 이번 방문 중에만 유지됩니다.'); }
    if (onlyFavorites) { render(); ($('#cards .star') || $('#favorites')).focus(); }
    else { button.setAttribute('aria-pressed', String(favorites.has(c.id))); button.textContent = favorites.has(c.id) ? '★' : '☆'; $('#favorite-count').textContent = favorites.size; }
  } else copyText(button.dataset.action === 'example' ? exampleFor(c) : c.name);
});
$('.filters').addEventListener('click', event => { const button = event.target.closest('[data-category]'); if (!button) return; category = button.dataset.category; document.querySelectorAll('.filters button').forEach(b => b.setAttribute('aria-pressed', String(b === button))); render(); });
$('#search').addEventListener('input', render);
$('#favorites').addEventListener('click', () => { onlyFavorites = !onlyFavorites; $('#favorites').setAttribute('aria-pressed', String(onlyFavorites)); render(); });
$('#reset').addEventListener('click', () => { $('#search').value = ''; onlyFavorites = false; $('#favorites').setAttribute('aria-pressed','false'); document.querySelector('[data-category="all"]').click(); $('#search').focus(); });
document.addEventListener('keydown', event => { if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName) && !document.activeElement.isContentEditable) { event.preventDefault(); $('#search').focus(); } });
render();
