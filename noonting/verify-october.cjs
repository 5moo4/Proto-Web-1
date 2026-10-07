// Offline regression test; does not claim browser layout or remote HTTP coverage.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const html = fs.readFileSync(path.join(__dirname, 'seoulcalendar.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
new vm.Script(script);
const data = vm.runInNewContext(script.split("    const grid=document")[0] + '\n({events,venueLinks,venueColors})', {Date});
const {events} = data;
for(const event of events){
  assert.equal(event.displayName,event.n.replace(/《[^》]*》/g,'').replace(/\s+/g,' ').trim());
  assert(event.displayName.length>0);
  assert(!/[《》]/.test(event.displayName));
}
// The colored official links are also the single venue legend.
assert(!html.includes('<div class="venue-legend"'));
const sourceBlock=html.match(/<div class="source-links"[\s\S]*?<\/div>/)[0];
const sourceLinks=[...sourceBlock.matchAll(/<a class="([^"]+)" href="([^"]+)"[^>]*>([^<]+)<\/a>/g)];
const venues=[...new Set(events.map(e=>e.venue))];
assert.equal(sourceLinks.length,venues.length);
for(const venue of venues){
  const color=data.venueColors[venue]||'festival';
  assert(sourceLinks.some(([,c,url])=>c===color&&url===data.venueLinks[venue]),venue);
  assert(html.includes(':is(.event,.source-links a,.feature).'+color+'{'), 'Shared event/link/detail color: '+venue);
}
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
assert.equal(byName('비어페스트 코엑스 2026').finish, '2026-10-11');
assert.equal(byName('2026 코베 베이비페어').finish, '2026-11-01');
assert.equal(byName('포춘 어드벤처 (운세박람회)').finish, '2026-11-01');
assert.equal(byName('서울드라마어워즈').start, '2026-10-08');
assert.equal(byName('노원달빛산책').finish, '2026-11-08');
assert.equal(byName('정동야행').start, '2026-10-30');
assert.equal(byName('미리 정동야행').start, '2026-10-29');

// Minimal DOM for exercising the page's actual event/click/filter code.
class Element {
  constructor(tag='div') { this.tag=tag; this.children=[]; this.dataset={}; this.style={}; this.className=''; this.textContent=''; this.listeners={}; }
  append(child) { if(child.parentElement)child.parentElement.children=child.parentElement.children.filter(x=>x!==child);child.parentElement=this; this.children.push(child); }
  showModal() { this.open=true; }
  setAttribute(name,value) { (this.attributes??={})[name]=value; }
  getAttribute(name) { return this.attributes?.[name]??null; }
  replaceChildren() { this.children.forEach(c=>c.parentElement=null);this.children=[]; }
  close() { this.open=false;this.listeners.close?.(); }
  insertAdjacentHTML(position, markup) { const el=new Element(); el.className=markup.match(/class="([^"]+)"/)[1]; this.append(el); }
  get classList() { return {add:name=>{this.className+=' '+name},remove:name=>{this.className=this.className.split(/\s+/).filter(x=>x!==name).join(' ')}}; }
  addEventListener(name, handler) { this.listeners[name]=handler; }
  click() { this.onclick?.({preventDefault(){},stopPropagation(){}}); }
  focus() { this.focused=true; }
  scrollIntoView() { this.scrolled=true; }
}
function exercise(now, mobile) {
  const grid=new Element();
  const nodes=Object.fromEntries(['#calendar','#sideTitle','#sideDate','#feature h4','#feature','#feature p','#feature span','#period','#place','#officialLink','#resetFilters','.side','#detailDialog','#closeDetail'].map(key=>[key,key==='#calendar'?grid:new Element()]));
  const detailHome=new Element();detailHome.append(nodes['.side']);
  nodes['#agendaSearch']=new Element('input');nodes['#agendaSearch'].value='';
  nodes['#clearAgendaSearch']=new Element('button');
  for(const key of ['#previousDay','#nextDay','#goToday'])nodes[key]=new Element('button');
  nodes['#toggleSources']=new Element('button');nodes['#toggleSources'].setAttribute('aria-expanded','false');
  nodes['#sourceToggleText']=new Element();
  for(const key of ['.filters','#filterHome','#filterDialog','#filterDialogContent','#openFilters','#closeFilters','#filterStatus'])nodes[key]=new Element();
  for(const key of ['#mobileDate','#agendaList','#agendaTitle','#agendaCount','#toggleMobileView','.calendar','.mobile-agenda'])nodes[key]=new Element();
  nodes['#filterHome'].append(nodes['.filters']);
  const media={matches:mobile,addEventListener(name,handler){this.change=handler}};
  const window={scrollY:2400,scrollTo(options){this.scrollY=options.top}};
  const boxes=['venue','museum','art','festival'].map(value=>Object.assign(new Element('input'),{value,checked:true}));
  const flatten=el=>el.children.flatMap(child=>[child,...flatten(child)]);
  const has=(el,name)=>el.className.split(/\s+/).includes(name);
  function queryAll(selector) {
    if(selector==='.filters input') return boxes;
    const parts=selector.split(' ');
    const classes=parts.at(-1).split('.').filter(Boolean);
    return flatten(grid).filter(el=>classes.every(c=>has(el,c)) && (parts.length===1 || parts[0].split('.').filter(Boolean).every(c=>has(el.parentElement,c))));
  }
  const document={body:new Element('body'),createElement:tag=>new Element(tag),querySelectorAll:queryAll,querySelector:selector=>nodes[selector]||queryAll(selector)[0]||null};
  document.body.style.cssText='';
  class FixedDate extends Date { constructor(...args) { super(...(args.length?args:[now])); } }
  const sandbox={document,window,Date:FixedDate,Intl,matchMedia:()=>media};
  const runtimeEvents=vm.runInNewContext(script+'\nevents',sandbox);
  assert.equal(nodes['#toggleSources'].getAttribute('aria-expanded'),'false');
  nodes['#toggleSources'].click();
  assert.equal(nodes['#toggleSources'].getAttribute('aria-expanded'),'true');
  assert.equal(nodes['#sourceToggleText'].textContent,'접기 −');
  nodes['#toggleSources'].click();
  assert.equal(nodes['#toggleSources'].getAttribute('aria-expanded'),'false');
  assert.equal(nodes['#sourceToggleText'].textContent,'펼치기 ＋');
  assert.equal(nodes['#mobileDate'].children.length,31);
  nodes['#agendaSearch'].value='서 도 호';nodes['#agendaSearch'].listeners.input();
  assert.equal(nodes['#agendaList'].children.length,1);
  assert.equal(nodes['#agendaList'].children[0].children[1].textContent,'서도호');
  nodes['#agendaSearch'].value='국립현대미술관';nodes['#agendaSearch'].listeners.input();
  assert(nodes['#agendaList'].children.length>1);
  assert(nodes['#agendaList'].children.every(b=>runtimeEvents[Number(b.dataset.index)].venue.includes('국립현대미술관')));
  nodes['#agendaSearch'].value='존재하지않는행사';nodes['#agendaSearch'].listeners.input();
  assert.equal(nodes['#agendaList'].children.length,0);
  assert(nodes['#agendaCount'].textContent.includes('검색 결과가 없습니다'));
  nodes['#clearAgendaSearch'].click();assert.equal(nodes['#agendaSearch'].value,'');assert(nodes['#clearAgendaSearch'].disabled);
  assert(nodes['#agendaList'].children.length>0);
  nodes['#mobileDate'].value='1';nodes['#mobileDate'].listeners.change();
  assert(nodes['#previousDay'].disabled);nodes['#previousDay'].click();assert.equal(nodes['#mobileDate'].value,'1');
  nodes['#nextDay'].click();assert.equal(nodes['#mobileDate'].value,'2');
  nodes['#previousDay'].click();assert.equal(nodes['#mobileDate'].value,'1');
  nodes['#mobileDate'].value='31';nodes['#mobileDate'].listeners.change();
  assert(nodes['#nextDay'].disabled);nodes['#nextDay'].click();assert.equal(nodes['#mobileDate'].value,'31');
  nodes['#goToday'].click();
  assert.equal(nodes['#mobileDate'].value,now.startsWith('2026-09')?'31':'2');
  assert.equal(nodes['#goToday'].disabled,now.startsWith('2026-09'));
  for(let d=1;d<=31;d++){
    nodes['#mobileDate'].value=String(d);nodes['#mobileDate'].listeners.change();
    const expected=runtimeEvents.map((event,index)=>({event,index})).filter(({event})=>d>=event.d&&d<=event.end&&(!event.days||event.days.includes(d)));
    assert.deepEqual(nodes['#agendaList'].children.map(b=>Number(b.dataset.index)),Array.from(expected.map(x=>x.index)));
    for(const item of nodes['#agendaList'].children){
      const event=runtimeEvents[Number(item.dataset.index)];
      assert.equal(item.children[1].textContent,event.displayName,'Shortened mobile event title');
      assert.equal(item.className,'feature mobile-item '+event.c);
    }
  }
  nodes['#toggleMobileView'].click();assert(nodes['.calendar'].className.includes('month-mode'));
  nodes['#toggleMobileView'].click();assert(!nodes['.calendar'].className.includes('month-mode'));
  if(mobile){
    const item=nodes['#agendaList'].children[0];item.click();
    assert(nodes['#detailDialog'].open);
    assert.equal(nodes['#feature h4'].textContent,item.children[1].textContent);
    nodes['#closeDetail'].click();assert(item.focused,'Focus returns to mobile list item');
    nodes['#mobileDate'].value='8';nodes['#mobileDate'].listeners.change();
    assert(has(grid.children[11],'chosen'),'List date also selects month cell');
    nodes['#agendaSearch'].value='존재하지않는행사';nodes['#agendaSearch'].listeners.input();
    assert.equal(nodes['#agendaList'].children.length,0);
    nodes['#toggleMobileView'].click();
    assert(html.includes('.calendar.month-mode #agendaCount{display:none}'),'Month view hides list search count');
    queryAll('.event').at(-1).click();nodes['#closeDetail'].click();
    assert.equal(nodes['#mobileDate'].value,'31','Month selection updates list date');
    assert(nodes['#agendaTitle'].textContent.startsWith('10월 31일'));
    assert(nodes['.calendar'].className.includes('month-mode'),'Month selection keeps month view');
    nodes['#toggleMobileView'].click();
    assert.equal(nodes['#mobileDate'].value,'31');
    assert.equal(nodes['#agendaSearch'].value,'존재하지않는행사','Search preserved on view switch');
    assert.equal(nodes['#agendaList'].children.length,0);
    nodes['#clearAgendaSearch'].click();
    assert(nodes['#agendaList'].children.length>0);
  }
  assert(!nodes['#filterDialog'].open,'Filters do not open automatically');
  if(mobile){
    nodes['#openFilters'].click();
    assert(nodes['#filterDialog'].open);
    assert.equal(nodes['.filters'].parentElement,nodes['#filterDialogContent']);
    nodes['#closeFilters'].click();
    assert(!nodes['#filterDialog'].open);
    assert.equal(nodes['.filters'].parentElement,nodes['#filterHome']);
    assert(nodes['#openFilters'].focused);
  }
  assert(!nodes['#detailDialog'].open,'No automatic popup on load');
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
    assert.equal(nodes['#feature h4'].textContent,e.displayName);
    assert.equal(button.title,e.displayName);
    assert(!/[《》]/.test(button.children[0].textContent));
    assert.equal(nodes['#feature'].className,'feature '+e.c);
    assert.equal(nodes['#place'].textContent,e.venue);
    assert.equal(nodes['#officialLink'].textContent,e.hasDetailLink?'공식 행사 상세 보기':'기관 공식 일정 보기');
    if(mobile){
      assert(nodes['#detailDialog'].open);
      assert.equal(nodes['.side'].parentElement,nodes['#detailDialog']);
      assert.equal(document.body.style.position,'fixed');
      nodes['#closeDetail'].click();
      assert(!nodes['#detailDialog'].open);
      assert.equal(nodes['.side'].parentElement,detailHome);
      assert.equal(document.body.style.cssText,'');
      assert.equal(window.scrollY,2400);
      assert(button.focused);
    }else assert(!nodes['#detailDialog'].open);
  }
  for(const category of boxes.map(b=>b.value)) {
    boxes.forEach(b=>b.checked=b.value===category);boxes[0].listeners.change();
    assert(nodes['#agendaList'].children.every(item=>runtimeEvents[Number(item.dataset.index)].category===category));
    for(const button of rendered) assert.equal(button.style.display,button.dataset.category===category?'flex':'none');
  }
  nodes['#resetFilters'].click();
  assert.equal(nodes['#filterStatus'].textContent,'전체 유형 표시 중');
  assert(boxes.every(b=>b.checked));assert(rendered.every(b=>b.style.display==='flex'));
  if(mobile){
    nodes['#openFilters'].click();media.matches=false;media.change();
    assert(!nodes['#filterDialog'].open);
    assert.equal(nodes['.filters'].parentElement,nodes['#filterHome']);
    media.matches=true;
    rendered.at(-1).click();media.matches=false;media.change();
    assert(!nodes['#detailDialog'].open,'Resize closes popup');
    assert.equal(nodes['.side'].parentElement,detailHome);
    assert(!nodes['.side'].scrolled,'No jump to bottom of calendar');
  }
  return rendered.length;
}
const buttons=exercise('2026-10-02T03:00:00Z',false);
exercise('2026-10-01T15:30:00Z',true);
exercise('2026-09-30T14:00:00Z',false);
console.log(JSON.stringify({result:'PASS',events:events.length,venues:new Set(events.map(e=>e.venue)).size,eventURLs:new Set(events.map(e=>e.link)).size,anchorURLs:anchors.length,renderedButtons:buttons,datesChecked:events.length*2,weekdayMethods:3,gridCells:35,days:31,leadingBlanks:4,runtimeScenarios:3,notes:'Offline DOM harness; remote access and visual layout are separate checks.'},null,2));
