'use strict';
const shuffle=list=>{const a=[...list];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const deckOrder=shuffle(terms);

const art={'design-layer':'<div class="layer-sample"><span>배경</span><span>사진</span><span>제목</span></div>','design-png':'<div class="alpha-sample"><span>★</span></div><span class="art-note">투명 배경 예시<br>격자는 편집기의 표시</span>',opacity:'<div class="square">100%</div><div class="square" style="opacity:.3">30%</div>',vector:'<svg width="160" height="80" viewBox="0 0 160 80" aria-hidden="true"><circle cx="35" cy="40" r="15" fill="#657ae9"/><circle cx="110" cy="40" r="35" fill="#657ae9"/></svg>',pixel:'<div class="pixel"></div>',padding:'<div class="padding-box"><span>내용</span></div>',margin:'<div class="space-demo"><div class="square">카드</div><div class="square">카드</div></div>',radius:'<div class="square"></div><div class="square" style="border-radius:24px"></div>',gradient:'<div class="gradient-demo"></div>',shadow:'<div class="square shadow-demo"></div>'};
let category='concept',index=0,mode='learn',wrong=new Set();
try{const saved=JSON.parse(localStorage.getItem('simple-vocabulary-wrong')||'[]');if(Array.isArray(saved))wrong=new Set(saved.filter(id=>terms.some(t=>t.id===id)));}catch{}
const $=s=>document.querySelector(s);let timer=null,nextTimer=null,round=null,selectedCount=50,selectedScope='all';
function save(){try{localStorage.setItem('simple-vocabulary-wrong',JSON.stringify([...wrong]));}catch{}$('#wrong-count').textContent=wrong.size;}
function visibleTerms(){const q=$('#term-search').value.trim().toLocaleLowerCase();return deckOrder.filter(t=>t.category===category&&(!q||[t.ko,t.en,t.definition,t.example,...(t.tags||[])].some(v=>v.toLocaleLowerCase().includes(q))));}
$('#term-search').addEventListener('input',()=>{index=0;draw();});
function draw(){const list=visibleTerms();if(!list.length){$('#deck').innerHTML='<p class="hint">일치하는 단어가 없어요. 다른 말로 찾아보세요.</p>';$('#position').textContent='0 / 0';$('#prev').disabled=$('#next').disabled=true;$('#category-hint').textContent='검색 결과 0개';return;}index=Math.min(index,list.length-1);const t=list[index];$('#deck').innerHTML=`<article class="word"><span class="label">${category==='concept'?'CONCEPT':'DESIGN'} / ${String(index+1).padStart(2,'0')}</span><h2>${t.ko}</h2><span class="english" lang="en">${t.en}</span>${art[t.id]?`<div class="visual" aria-label="${t.ko} 시각 예시">${art[t.id]}</div>`:''}<p class="definition">${t.definition}</p><div class="example"><b>이럴 때 쓰여요</b>${t.example}</div></article>`;$('#position').textContent=`${index+1} / ${list.length}`;$('#prev').disabled=$('#next').disabled=list.length<2;$('#category-hint').textContent=category==='concept'?`비개발자를 위한 개념 ${terms.filter(t=>t.category==='concept').length}개 · 현재 ${list.length}개`:`디자인 용어 ${terms.filter(t=>t.category==='visual').length}개 · 현재 ${list.length}개`;}
function setMode(next){clearInterval(timer);clearTimeout(nextTimer);timer=nextTimer=null;round=null;mode=next;document.body.classList.toggle('quiz-mode',next==='quiz');document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===next)));for(const id of ['learn','quiz','review'])$('#'+id).hidden=id!==next;if(next==='quiz')setup();if(next==='review')review();}
document.querySelectorAll('[data-mode]').forEach(b=>b.onclick=()=>setMode(b.dataset.mode));document.querySelectorAll('[data-category]').forEach(b=>b.onclick=()=>{category=b.dataset.category;$('#term-search').placeholder=category==='visual'?'예: 레이어, PNG, 자간':'예: 파이썬, 캐시, pip';$('#term-search').value='';index=0;document.querySelectorAll('[data-category]').forEach(a=>a.setAttribute('aria-pressed',String(a===b)));draw();});function moveWord(delta){const n=visibleTerms().length;if(n){index=(index+delta+n)%n;draw();}}$('#prev').onclick=()=>moveWord(-1);$('#next').onclick=()=>moveWord(1);

function setup(){
 clearInterval(timer);clearTimeout(nextTimer);round=null;
 $('#quiz').innerHTML=`<div class="speed-start"><p class="speed-eyebrow">3초 스피드 훈련</p><h2>AI 서비스 만들기<br>스피드 퀴즈</h2><div class="count-picker"><p>맞추고 싶은 문제 몇 개?</p><div class="picker-row"><button id="decrease" aria-label="문제 수 줄이기">◀</button><output id="question-count" aria-live="polite">${selectedCount}</output><button id="increase" aria-label="문제 수 늘리기">▶</button></div></div><fieldset class="script-picker"><legend>출제 범위</legend><div class="script-options"><label><input type="radio" name="scope" value="concept"><span>보이지 않는 개념만</span></label><label><input type="radio" name="scope" value="visual"><span>눈에 보이는 디자인만</span></label><label><input type="radio" name="scope" value="all"><span>개념 &amp; 디자인</span></label></div></fieldset><p class="speed-help">3초 안에 정답을 골라요.<br>틀린 문제는 다시 나와요. 모두 맞히면 완료!</p><button id="start" class="primary">START</button></div>`;
 $(`input[name=scope][value=${selectedScope}]`).checked=true;
 const count=delta=>{selectedCount=Math.max(10,Math.min(100,selectedCount+delta));$('#question-count').value=selectedCount;$('#decrease').disabled=selectedCount===10;$('#increase').disabled=selectedCount===100;};count(0);$('#decrease').onclick=()=>count(-10);$('#increase').onclick=()=>count(10);
 $('#start').onclick=()=>{selectedScope=$('input[name=scope]:checked').value;start(terms.filter(t=>selectedScope==='all'||t.category===selectedScope),3,selectedCount);};
}
function start(pool,limit=3,count=selectedCount){
 clearInterval(timer);clearTimeout(nextTimer);const initial=shuffle(pool).slice(0,Math.min(count,pool.length));if(!initial.length)return setup();
 round={initial,queue:[...initial],completed:new Set(),attempts:0,wrong:0,timeouts:0,limit,answered:false,startedAt:performance.now(),pool:[...pool],count,finished:false};question();
}
function question(){
 const r=round;if(!r||r.finished)return;if(!r.queue.length)return result();clearInterval(timer);clearTimeout(nextTimer);r.answered=false;const t=r.queue[0];
 const choices=shuffle([t,...shuffle(terms.filter(a=>a.category===t.category&&a.id!==t.id)).slice(0,3)]);
 $('#quiz').innerHTML=`<div class="speed-game"><div class="quiz-header"><span id="progress-label">${r.completed.size} / ${r.initial.length}</span><div class="progress-track"><div id="progress-fill" style="width:${r.completed.size/r.initial.length*100}%"></div></div></div><div class="question-card"><p id="question" tabindex="-1">${t.definition}</p></div><div class="timer-track" aria-label="남은 시간"><div id="timer-fill"></div></div><div class="answers">${choices.map(a=>`<button data-answer="${a.id}">${a.ko}<small lang="en">${a.en}</small></button>`).join('')}</div><p id="feedback" class="feedback" role="status" aria-live="assertive"></p></div>`;
 $('.timer-track').setAttribute('aria-label',r.limit?'남은 시간 3초':'시간 제한 없는 복습');
 if(!r.limit)$('#timer-fill').style.opacity='.25';
 $('#question').focus({preventScroll:true});r.deadline=performance.now()+r.limit*1000;
 document.querySelectorAll('[data-answer]').forEach(b=>b.onclick=()=>answer(r.limit&&performance.now()>=r.deadline?null:b.dataset.answer));
 if(r.limit)timer=setInterval(tick,30);
}
function tick(){const r=round;if(!r||r.answered||r.finished)return;const remaining=Math.max(0,r.deadline-performance.now());$('#timer-fill').style.transform=`scaleX(${remaining/(r.limit*1000)})`;if(!remaining)answer(null);}
function answer(id){
 const r=round;if(!r||r.answered||r.finished)return;r.answered=true;clearInterval(timer);timer=null;const t=r.queue.shift(),correct=id===t.id;r.attempts++;
 if(correct){r.completed.add(t.id);wrong.delete(t.id);}else{r.queue.push(t);wrong.add(t.id);if(id===null)r.timeouts++;else r.wrong++;}save();
 document.querySelectorAll('[data-answer]').forEach(b=>{b.disabled=true;b.classList.toggle('correct',b.dataset.answer===t.id);b.classList.toggle('incorrect',b.dataset.answer===id&&!correct);});
 $('#progress-label').textContent=`${r.completed.size} / ${r.initial.length}`;$('#progress-fill').style.width=`${r.completed.size/r.initial.length*100}%`;
 $('#feedback').textContent=correct?'정답!':`${id===null?'시간초과':'오답'} · 정답: ${t.ko}`;
 nextTimer=setTimeout(()=>{if(round===r&&!document.hidden&&mode==='quiz')question();},520);
}
function result(){
 const r=round;clearInterval(timer);clearTimeout(nextTimer);r.finished=true;
 $('#quiz').innerHTML=`<div class="speed-result"><p class="speed-eyebrow">COMPLETE</p><h2>모든 문제를 맞혔어요</h2><dl class="stats"><div><dt>총 도전</dt><dd>${r.attempts}</dd></div><div><dt>오답</dt><dd>${r.wrong}</dd></div><div><dt>시간초과</dt><dd>${r.timeouts}</dd></div><div><dt>소요시간</dt><dd>${Math.round((performance.now()-r.startedAt)/1000)}초</dd></div></dl><button id="again" class="primary">다시 하기</button><button id="quiz-home" class="secondary">처음으로</button><button id="to-review" class="secondary">오답 복습 (${wrong.size})</button></div>`;
 $('#again').onclick=()=>start(r.pool,r.limit,r.count);$('#quiz-home').onclick=setup;$('#to-review').onclick=()=>setMode('review');
}
function review(){const list=terms.filter(t=>wrong.has(t.id));$('#review').innerHTML=`<div class="result"><h2>한 번 더 보면 내 단어.</h2><p>${list.length?`${list.length}개를 다시 읽어보세요. 복습 퀴즈는 시간 제한이 없어요.`:'아직 복습할 단어가 없어요. 퀴즈를 풀면 틀린 단어가 여기에 모여요.'}</p>${list.length?'<button class="primary" id="retry-wrong">이 단어들로 복습 퀴즈</button>':''}</div>${list.map(t=>`<article class="review-card"><h3>${t.ko} <small>${t.en}</small></h3><p>${t.definition}</p><p>${t.example}</p><button data-known="${t.id}">이제 알겠어요 ✓</button></article>`).join('')}`;if(list.length)$('#retry-wrong').onclick=()=>{setMode('quiz');start(list,0,list.length);};document.querySelectorAll('[data-known]').forEach(b=>b.onclick=()=>{wrong.delete(b.dataset.known);save();review();});}

document.addEventListener('visibilitychange',()=>{if(!round||round.finished||mode!=='quiz')return;if(document.hidden){clearTimeout(nextTimer);}else if(round.answered){question();}else if(round.limit&&performance.now()>=round.deadline){answer(null);}});
save();draw();
