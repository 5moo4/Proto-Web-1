// Offline regression test; does not claim browser layout or remote HTTP coverage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, 'seoulcalendar.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const data = vm.runInNewContext(script.split("    const grid=document")[0] + '\n({events,venueLinks})', {Date});
const {events} = data;
const weekdayNames = '일월화수목금토';
// Independent Gregorian weekday arithmetic, not Date.getDay().
function weekday(iso) {
  let [y,m,d] = iso.split('-').map(Number);
  const t = [0,3,2,5,0,3,5,1,4,6,2,4];
  if (m < 3) y--;
  return (y + Math.floor(y/4) - Math.floor(y/100) + Math.floor(y/400) + t[m-1] + d) % 7;
}
const seen = new Set();
for (const event of events) {
  assert(event.start <= event.finish, event.n);
  assert(event.start <= '2026-10-31' && event.finish >= '2026-10-01', event.n);
  const key = event.venue + event.n + event.start;
  assert(!seen.has(key), 'Duplicate: ' + key); seen.add(key);
  assert.equal(new URL(event.link).protocol, 'https:');
  assert(!event.link.includes('undefined'), event.n);
  assert(event.d >= 1 && event.end <= 31 && event.d <= event.end, event.n);
  for (const [i,iso] of [event.start,event.finish].entries()) {
    const date = new Date(iso + 'T00:00:00Z');
    assert.equal(date.toISOString().slice(0,10), iso);
    assert.equal(date.getUTCDay(), weekday(iso), iso);
    const intl = new Intl.DateTimeFormat('ko-KR', {timeZone:'Asia/Seoul',weekday:'short'}).format(date);
    assert.equal(intl, weekdayNames[weekday(iso)], iso);
    assert(event.actual[i].endsWith('(' + intl + ')'), event.n);
  }
  if (event.days) for (const day of event.days) {
    assert(day >= event.d && day <= event.end);
    assert.equal(weekday('2026-10-' + String(day).padStart(2,'0')), 0);
  }
}
const anchors = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)];
for (const [,href] of anchors) {
  if (href.startsWith('https:')) new URL(href);
  else assert(fs.existsSync(path.resolve(__dirname, href)), 'Missing local target: '+href);
}
assert(html.includes('<h1>10월의 눈팅</h1>'));
assert(!html.includes('9월의 눈팅'));
const byName = name => events.find(e => e.n === name);
assert.equal(byName('2026 코베 베이비페어').finish, '2026-11-01');
assert.equal(byName('포춘 어드벤처 (운세박람회)').finish, '2026-11-01');
assert.equal(byName('서울드라마어워즈').start, '2026-10-08');
assert.equal(byName('노원달빛산책').finish, '2026-11-08');
assert.equal(byName('정동야행').start, '2026-10-30');
assert.equal(byName('미리 정동야행').start, '2026-10-29');

// Minimal DOM for exercising the page's actual event/click/filter code.
class Element {
  constructor(tag='div') { this.tag=tag; this.children=[]; this.dataset={}; this.style={}; this.className=''; this.textContent=''; this.listeners={}; }
  append(child) { child.parentElement=this; this.children.push(child); }
  insertAdjacentHTML(position, markup) { const el=new Element(); el.className=markup.match(/class="([^"]+)"/)[1]; this.append(el); }
  get classList() { return {add:name=>{this.className+=' '+name},remove:name=>{this.className=this.className.split(/\s+/).filter(x=>x!==name).join(' ')}}; }
  addEventListener(name, handler) { this.listeners[name]=handler; }
  click() { this.onclick?.({preventDefault(){},stopPropagation(){}}); }
  focus() { this.focused=true; }
  scrollIntoView() { this.scrolled=true; }
}
function exercise(now, mobile) {
  const grid=new Element();
  const nodes=Object.fromEntries(['#calendar','#sideTitle','#sideDate','#feature h4','#feature','#feature p','#feature span','#period','#place','#officialLink','#resetFilters','.side'].map(key=>[key,key==='#calendar'?grid:new Element()]));
  const boxes=['venue','museum','art','festival'].map(value=>Object.assign(new Element('input'),{value,checked:true}));
  const flatten=el=>el.children.flatMap(child=>[child,...flatten(child)]);
  const has=(el,name)=>el.className.split(/\s+/).includes(name);
  function queryAll(selector) {
    if(selector==='.filters input') return boxes;
    const parts=selector.split(' ');
    const classes=parts.at(-1).split('.').filter(Boolean);
    return flatten(grid).filter(el=>classes.every(c=>has(el,c)) && (parts.length===1 || parts[0].split('.').filter(Boolean).every(c=>has(el.parentElement,c))));
  }
  const document={createElement:tag=>new Element(tag),querySelectorAll:queryAll,querySelector:selector=>nodes[selector]||queryAll(selector)[0]||null};
  class FixedDate extends Date { constructor(...args) { super(...(args.length?args:[now])); } }
  const sandbox={document,Date:FixedDate,Intl,matchMedia:()=>({matches:mobile})};
  const runtimeEvents=vm.runInNewContext(script+'\nevents',sandbox);
  assert.equal(grid.children.length,35);
  assert.equal(grid.children.filter(day=>has(day,'blank')).length,4);
  const days=grid.children.filter(day=>!has(day,'blank'));
  assert.equal(days.length,31);
  for(const [index,day] of days.entries()) {
    const d=index+1;
    assert.equal(Number(day.children[0].textContent),d);
    assert.equal((index+4)%7,weekday('2026-10-'+String(d).padStart(2,'0')));
    const expected=runtimeEvents.map((e,i)=>({e,i})).filter(({e})=>d>=e.d&&d<=e.end&&(!e.days||e.days.includes(d))).map(({i})=>i);
    assert.deepEqual(day.children.slice(1).map(b=>Number(b.dataset.index)),Array.from(expected));
  }
  const rendered=queryAll('.event');
  assert.equal(new Set(rendered.map(b=>b.dataset.index)).size,events.length);
  for(const button of rendered) {
    const e=runtimeEvents[Number(button.dataset.index)];button.click();
    assert.equal(nodes['#officialLink'].href,e.link);
    assert.equal(nodes['#period'].textContent,e.actual.join(' — '));
    assert.equal(nodes['#feature h4'].textContent,e.n);
    assert.equal(nodes['#place'].textContent,e.venue);
    assert.equal(nodes['#officialLink'].textContent,e.hasDetailLink?'공식 행사 상세 보기':'기관 공식 일정 보기');
  }
  for(const category of boxes.map(b=>b.value)) {
    boxes.forEach(b=>b.checked=b.value===category);boxes[0].listeners.change();
    for(const button of rendered) assert.equal(button.style.display,button.dataset.category===category?'block':'none');
  }
  nodes['#resetFilters'].click();
  assert(boxes.every(b=>b.checked));assert(rendered.every(b=>b.style.display==='block'));
  if(mobile) assert(nodes['.side'].focused&&nodes['.side'].scrolled);
  return rendered.length;
}
const buttons=exercise('2026-10-02T03:00:00Z',false);
exercise('2026-10-01T15:30:00Z',true);
exercise('2026-09-30T14:00:00Z',false);
console.log(JSON.stringify({result:'PASS',events:events.length,venues:new Set(events.map(e=>e.venue)).size,eventURLs:new Set(events.map(e=>e.link)).size,anchorURLs:anchors.length,renderedButtons:buttons,datesChecked:events.length*2,weekdayMethods:3,gridCells:35,days:31,leadingBlanks:4,runtimeScenarios:3,notes:'Offline DOM harness; remote access and visual layout are separate checks.'},null,2));
