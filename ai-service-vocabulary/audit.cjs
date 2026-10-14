// Run with: node audit.cjs. Set PLAYWRIGHT_MODULE if Playwright is not on Node's module path.
const assert = require('node:assert/strict');
const {pathToFileURL} = require('node:url');
const path = require('node:path');
const {chromium} = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
(async()=>{
 const browser=await chromium.launch({channel:'msedge',headless:true});
 try {
 const page=await browser.newPage({viewport:{width:320,height:568}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.join(__dirname,'index.html')).href);
 const audit=await page.evaluate(()=>{
  const issues=[];
  for(const key of ['id','ko','en','definition']){
   const seen=new Set();for(const t of terms){const v=t[key].normalize('NFKC').toLowerCase().replace(/[\s\p{P}]/gu,'');if(seen.has(v))issues.push('duplicate '+key+': '+t.id);seen.add(v);}
  }
  for(const t of terms){if(!t.example||!['concept','visual'].includes(t.category))issues.push('invalid '+t.id);}
  setMode('learn');
  for(const c of ['concept','visual']){category=c;$('#term-search').value='';const list=visibleTerms();for(let i=0;i<list.length;i++){index=i;draw();if(document.documentElement.scrollWidth>innerWidth)issues.push('card overflow '+list[i].id);}}
  setMode('quiz');
  let bounds;
  for(const t of terms){start([t],0,1);const buttons=[...document.querySelectorAll('[data-answer]')];if(buttons.length!==4||new Set(buttons.map(b=>b.dataset.answer)).size!==4)issues.push('choices '+t.id);if(!buttons.some(b=>b.dataset.answer===t.id))issues.push('missing answer '+t.id);if($('#question').textContent!==t.definition)issues.push('prompt '+t.id);for(const b of buttons)if(b.scrollHeight>b.clientHeight+1)issues.push('answer clipping '+b.dataset.answer);if(document.documentElement.scrollWidth>innerWidth)issues.push('quiz overflow '+t.id);bounds={bottom:document.querySelector('.answers').getBoundingClientRect().bottom,height:innerHeight};answer(t.id);if(round.completed.size!==1)issues.push('scoring '+t.id);clearTimeout(nextTimer);}
  setMode('learn');return {total:terms.length,issues,bounds};
 });
 console.log('All-card audit',JSON.stringify(audit));assert.deepEqual(audit.issues,[]);assert.ok(audit.bounds.bottom<=audit.bounds.height);
 for(const viewport of [{width:320,height:568},{width:390,height:844},{width:1280,height:900}]){
  await page.setViewportSize(viewport);
  const layoutIssues=await page.evaluate(()=>{
   const issues=[];setMode('quiz');
   for(const t of terms){start([t],0,1);const q=$('.question-card');if(q.scrollHeight>q.clientHeight+1)issues.push('question clipped '+t.id);for(const b of document.querySelectorAll('[data-answer]'))if(b.scrollHeight>b.clientHeight+1)issues.push('answer clipped '+b.dataset.answer);if($('.answers').getBoundingClientRect().bottom>innerHeight)issues.push('answers below screen '+t.id);}
   setMode('learn');return issues;
  });assert.deepEqual(layoutIssues,[],JSON.stringify(viewport));
 }
 await page.setViewportSize({width:320,height:568});
 // Exercise real click handlers, timer, mastery queue and persisted review.
 await page.evaluate(()=>{wrong.clear();save();setMode('quiz');selectedCount=10;setup();});
 await page.click('#start');
 const first=await page.evaluate(()=>round.queue[0].id);
 const bad=await page.locator(`[data-answer]:not([data-answer="${first}"])`).first().getAttribute('data-answer');
 await page.click(`[data-answer="${bad}"]`);
 await page.waitForTimeout(600);
 assert.equal(await page.evaluate(()=>round.wrong),1);
 await page.waitForTimeout(3050);
 assert.equal(await page.evaluate(()=>round.timeouts),1);
 await page.waitForTimeout(600);
 for(let i=0;i<10;i++){
  const id=await page.evaluate(()=>round.queue[0].id);
  await page.click(`[data-answer="${id}"]`);
  await page.waitForTimeout(560);
 }
 assert.equal(await page.locator('.speed-result').count(),1);
 assert.deepEqual(await page.evaluate(()=>({attempts:round.attempts,done:round.completed.size,wrong:round.wrong,timeouts:round.timeouts})),{attempts:12,done:10,wrong:1,timeouts:1});
 await page.click('#again');assert.equal(await page.locator('[data-answer]').count(),4);
 await page.evaluate(()=>{setMode('quiz');start([terms[0]],0,1);answer(null);clearTimeout(nextTimer);setMode('review');});
 await page.reload();assert.equal(await page.locator('#wrong-count').textContent(),'1');
 await page.click('[data-mode="review"]');await page.click('#retry-wrong');
 await page.waitForTimeout(3200);assert.equal(await page.evaluate(()=>round.attempts),0);
 const reviewId=await page.evaluate(()=>round.queue[0].id);await page.click(`[data-answer="${reviewId}"]`);await page.waitForTimeout(600);
 assert.equal(await page.locator('#wrong-count').textContent(),'0');
 await page.click('[data-mode="learn"]');
 const firstOrder=await page.evaluate(()=>deckOrder.map(t=>t.id).join(','));await page.reload();assert.notEqual(await page.evaluate(()=>deckOrder.map(t=>t.id).join(',')),firstOrder);
 await page.click('#prev');assert.equal(await page.evaluate(()=>index),205);await page.click('#next');assert.equal(await page.evaluate(()=>index),0);
 await page.fill('#term-search','no-match-xyz');assert.equal(await page.locator('#position').textContent(),'0 / 0');assert.equal(await page.locator('#prev').isDisabled(),true);
 await page.fill('#term-search','');
 await page.evaluate(()=>{localStorage.setItem('simple-vocabulary-wrong','broken-json');});await page.reload();assert.equal(await page.locator('#wrong-count').textContent(),'0');
 // All scope selectors and min/max controls.
 await page.click('[data-mode="quiz"]');
 await page.evaluate(()=>{for(let i=0;i<20;i++)$('#decrease').click();});assert.equal(await page.locator('#question-count').textContent(),'10');
 await page.evaluate(()=>{for(let i=0;i<20;i++)$('#increase').click();});assert.equal(await page.locator('#question-count').textContent(),'100');
 for(const scope of ['concept','visual','all']){
  await page.locator(`input[value="${scope}"]`).check();await page.click('#start');
  assert.equal(await page.evaluate(s=>round.initial.length===100&&round.initial.every(t=>s==='all'||t.category===s),scope),true);
  await page.click('[data-mode="quiz"]');
 }
 await page.evaluate(()=>{start([terms.find(t=>t.id==='ai-top-p')],0,1);});
 await page.screenshot({path:path.join(__dirname,'audit-mobile.png'),fullPage:true});
 assert.deepEqual(errors,[]);console.log('PASS: 338 cards/quiz items; 320/390/1280 layouts; real timed 12-attempt round; restart; persisted review; untimed review; shuffle; circular navigation; search; malformed storage; all scopes and count limits.');
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1;});
