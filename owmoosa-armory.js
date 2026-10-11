(() => {
  'use strict';
  const weapons = [
    {"id":"frost","name":"서리의 맹세","element":"서리","color":"#a9dcec","roman":"I","lore":"얼어붙은 맹세는 꺾이지 않는다. 검 끝에 닿은 적의 기세를 늦춘다.","traits":["냉기 · 둔화","절제된 일격"]},
    {"id":"flame","name":"잿불의 심판","element":"화염","color":"#eda36a","roman":"II","lore":"재가 된 왕국의 마지막 불씨. 물러서지 않는 검투사의 손에서 타오른다.","traits":["화염 · 연소","맹렬한 공세"]},
    {"id":"lightning","name":"뇌명의 송곳니","element":"번개","color":"#a9bfff","roman":"III","lore":"천둥이 들리기 전에 결투는 끝난다. 한순간의 틈을 꿰뚫는 푸른 섬광.","traits":["번개 · 감전","찰나의 일격"]},
    {"id":"tempest","name":"폭풍의 서약","element":"폭풍","color":"#c5b7df","roman":"IV","lore":"고요한 칼날에 갇힌 폭풍. 거센 바람이 적의 균형을 무너뜨린다.","traits":["폭풍 · 밀쳐내기","전장을 지배하는 검"]},
    {"id":"venom","name":"독사의 입맞춤","element":"맹독","color":"#adcb77","roman":"V","lore":"깊은 상처보다 오래 남는 저주. 작은 스침 하나가 결투의 끝을 바꾼다.","traits":["맹독 · 상처 중독","칼날에 묻힌 독"]},
    {"id":"soul","name":"망령의 속삭임","element":"영혼","color":"#a4dce7","roman":"VI","lore":"잊힌 전사들의 목소리가 칼날에 머문다. 침묵 속에서 적의 의지를 꺾는다.","traits":["영혼 · 공포","망자와 맺은 계약"]},
    {"id":"shadow","name":"심연의 침묵","element":"암흑","color":"#ad95d3","roman":"VII","lore":"빛이 닿지 않는 곳에서 벼린 검. 그림자가 먼저 다가가 적의 시야를 삼킨다.","traits":["암흑 · 은폐","그림자 속 일격"]},
    {"id":"gravity","name":"중력의 왕관","element":"중력","color":"#c5b9de","roman":"VIII","lore":"돌과 먼지마저 고개를 숙이는 칼날. 무거운 압력으로 적의 발을 묶는다.","traits":["중력 · 압박","거스를 수 없는 무게"]},
    {"id":"magnet","name":"철의 지배자","element":"자력","color":"#c6b398","roman":"IX","lore":"흩어진 쇳조각이 검의 부름에 응한다. 적의 강철을 붙잡아 빈틈을 만든다.","traits":["자력 · 인력","강철을 다스리는 손"]},
    {"id":"resonance","name":"공명의 메아리","element":"파동","color":"#d8c8a7","roman":"X","lore":"한 번의 휘두름이 수없는 울림이 된다. 보이지 않는 파동이 방어를 흔든다.","traits":["파동 · 충격","침묵을 깨는 울림"]},
    {"id":"tide","name":"심해의 물결","element":"물","color":"#9dcced","roman":"XI","lore":"깊은 물의 고요함을 품은 검. 유연하게 흘러들어 거센 물결로 되받아친다.","traits":["물 · 유동","흐름을 읽는 반격"]},
    {"id":"earth","name":"대지의 척추","element":"대지","color":"#c6a676","roman":"XII","lore":"산맥의 심장에서 깨어난 칼날. 한 걸음을 지킬 때마다 바위처럼 단단해진다.","traits":["대지 · 강인","무너지지 않는 태세"]},
    {"id":"sand","name":"사막의 모래시계","element":"모래","color":"#e1b16d","roman":"XIII","lore":"사라진 왕국의 모래가 칼날을 감싼다. 흩어지는 황금빛 장막이 적을 가린다.","traits":["모래 · 눈가림","사막의 숨결"]},
    {"id":"forest","name":"고목의 맹약","element":"자연","color":"#aec58b","roman":"XIV","lore":"오래된 숲이 검투사에게 내어준 가지. 살아 있는 덩굴이 적의 걸음을 붙잡는다.","traits":["자연 · 속박","숲의 수호자"]},
    {"id":"bloom","name":"개화의 축복","element":"생명","color":"#e1b6bd","roman":"XV","lore":"폐허에도 꽃은 피어난다. 황금빛 꽃잎이 생명력을 북돋아 지친 검투사의 체력을 보강한다.","traits":["생명 · 활력","생기를 더하는 꽃잎"]},
    {"id":"rune","name":"태고의 회로","element":"마도","color":"#81e0d4","roman":"XVI","lore":"잊힌 문명의 문양이 맥박처럼 흐른다. 정교한 마력이 칼끝에서 하나로 모인다.","traits":["마도 · 증폭","고대의 정밀함"]},
    {"id":"radiance","name":"여명의 성약","element":"신성","color":"#efdaad","roman":"XVII","lore":"새벽의 빛을 봉인한 순백의 검. 어둠을 걷어내고 흔들리는 마음을 밝힌다.","traits":["신성 · 정화","빛을 향한 맹세"]},
    {"id":"beast","name":"황금늑대의 포효","element":"야수","color":"#dcb77c","roman":"XVIII","lore":"칼날 속에서 황금빛 늑대가 깨어난다. 사냥꾼의 본능이 적의 빈틈을 쫓는다.","traits":["야수 · 추격","포효하는 투지"]},
    {"id":"rose","name":"붉은 장미의 유혹","element":"매혹","color":"#e2a0b3","roman":"XIX","lore":"아름다움에 시선이 머무는 순간, 승부는 기운다. 장미의 마력이 경계를 흐린다.","traits":["매혹 · 현혹","우아한 기만"]},
    {"id":"blood","name":"혈월의 갈증","element":"혈마","color":"#db8c8d","roman":"XX","lore":"붉은 달 아래 새겨진 위험한 서약. 끝나지 않는 갈증이 칼날을 깨운다.","traits":["혈마 · 흡수","붉은 달의 계약"]},
    {"id":"crystal","name":"수정의 영원","element":"수정","color":"#d9deec","roman":"XXI","lore":"수없이 갈라진 빛이 하나의 날에 모인다. 투명한 결정이 흔들림 없는 의지를 비춘다.","traits":["수정 · 굴절","완벽한 결정"]},
    {"id":"swarm","name":"군체의 군주","element":"군체","color":"#c4b074","roman":"XXII","lore":"작은 날갯짓이 거대한 위협이 된다. 검을 따르는 무리가 적의 집중을 흩뜨린다.","traits":["군체 · 교란","끝없는 날갯짓"]},
    {"id":"astral","name":"별을 잇는 밤","element":"별빛","color":"#b4bce9","roman":"XXIII","lore":"칼날 안에 밤하늘이 펼쳐진다. 먼 별들의 궤적이 다음 일격을 인도한다.","traits":["별빛 · 인도","밤하늘의 길잡이"]},
    {"id":"scripture","name":"백지의 예언","element":"언령","color":"#dfcfaf","roman":"XXIV","lore":"아직 쓰이지 않은 이야기를 품은 검. 한 장의 주문이 결투의 운명을 바꾼다.","traits":["언령 · 주문","기록되지 않은 미래"]},
    {"id":"bone","name":"백골의 왕좌","element":"사령","color":"#c6d3b2","roman":"XXV","lore":"잠든 뼈들이 왕의 부름에 응한다. 잊힌 군단의 집념이 검을 지탱한다.","traits":["사령 · 소환","죽음을 넘어선 충성"]},
    {"id":"silk","name":"은실의 덫","element":"거미줄","color":"#d3d5df","roman":"XXVI","lore":"이슬을 머금은 은실이 고요히 펼쳐진다. 한 번 얽힌 발걸음은 쉽게 풀리지 않는다.","traits":["거미줄 · 포박","소리 없는 사냥"]},
    {"id":"revenant","name":"불사의 원한","element":"불사","color":"#b3c68d","roman":"XXVII","lore":"무덤 아래 묻힌 원한이 다시 깨어난다. 쓰러져도 놓지 못한 검이 주인을 기다린다.","traits":["불사 · 저주","끝나지 않은 결투"]},
    {"id":"arsenal","name":"강철의 포화","element":"기계","color":"#e1b472","roman":"XXVIII","lore":"이계의 병기가 칼날을 따라 정렬한다. 정교한 기계의 심장이 공격의 순간을 맞춘다.","traits":["기계 · 포격","이계의 무기고"]},
    {"id":"renewal","name":"새싹의 성소","element":"재생","color":"#d3e4bb","roman":"XXIX","lore":"메마른 대리석에도 새잎을 틔우는 빛. 베이고 찢긴 상처를 서서히 아물게 하는 검.","traits":["재생 · 상처 치유","되살아나는 숨결"]},
    {"id":"mist","name":"안개의 장막","element":"안개","color":"#bccbd2","roman":"XXX","lore":"차가운 물안개가 검의 윤곽을 지운다. 보이지 않는 칼끝이 적의 예측을 벗어난다.","traits":["안개 · 은폐","희미한 경계"]},
    {"id":"rift","name":"차원의 틈","element":"차원","color":"#b8a8e8","roman":"XXXI","lore":"칼날의 균열 너머 다른 세계가 비친다. 닿을 수 없던 거리에도 일격의 길이 열린다.","traits":["차원 · 절단","세계 사이의 틈"]},
    {"id":"chronos","name":"시간의 잔향","element":"시간","color":"#dbbc80","roman":"XXXII","lore":"황금 톱니가 잃어버린 찰나를 센다. 지나간 일격의 잔상이 다음 움직임에 겹친다.","traits":["시간 · 지연","멈춰 선 찰나"]},
    {"id":"fallout","name":"황혼의 낙진","element":"방사","color":"#f0c778","roman":"XXXIII","lore":"금지된 문명의 섬광을 가둔 검. 황금빛 잔광 아래 파멸의 힘이 잠들어 있다.","traits":["방사 · 붕괴","봉인된 섬광"]},
    {"id":"lunar","name":"월광의 기도","element":"달빛","color":"#c0d1ee","roman":"XXXIV","lore":"차오르고 기우는 달의 약속을 새겼다. 긴 밤을 지키는 은빛이 칼끝으로 모인다.","traits":["달빛 · 수호","고요한 밤의 맹세"]},
    {"id":"solar","name":"태양의 심장","element":"태양","color":"#f0bf71","roman":"XXXV","lore":"한낮의 태양을 품은 황금의 칼날. 물러설 곳 없는 전장에 찬란한 열기를 펼친다.","traits":["태양 · 작열","꺼지지 않는 광휘"]},
    {"id":"fortune","name":"행운의 매듭","element":"행운","color":"#d9c184","roman":"XXXVI","lore":"네 잎의 문양에 작은 우연들이 모인다. 마지막 순간의 행운이 결투의 흐름을 바꾼다.","traits":["행운 · 반전","운명이 건넨 기회"]},
    {"id":"mirror","name":"거울의 미궁","element":"반사","color":"#cad5e3","roman":"XXXVII","lore":"깨진 거울마다 다른 궤적이 비친다. 상대의 시선을 흔들고 다가온 마력을 되비춘다.","traits":["반사 · 환영","수천 개의 칼끝"]},
    {"id":"kraken","name":"심해왕의 속박","element":"심해","color":"#78becd","roman":"XXXVIII","lore":"가라앉은 왕국의 수호자가 검을 감싼다. 차가운 촉수가 도망치는 적을 붙잡는다.","traits":["심해 · 구속","깊은 바다의 부름"]},
    {"id":"dream","name":"몽환의 계단","element":"꿈","color":"#c7b8e6","roman":"XXXIX","lore":"잠든 세계로 이어지는 계단이 칼날에 흐른다. 꿈과 현실의 경계에서 적의 감각을 흐린다.","traits":["꿈 · 몽환","깨어나지 않는 길"]},
    {"id":"dragon","name":"흑룡의 역린","element":"용","color":"#d99a79","roman":"XL","lore":"고룡의 비늘을 겹겹이 벼린 검. 잠든 분노가 균열 사이로 붉게 타오른다.","traits":["용 · 격노","왕을 거스르는 비늘"]},
    {"id":"rust","name":"녹슨 왕국의 유산","element":"산화","color":"#c39879","roman":"XLI","lore":"찬란했던 강철도 세월 앞에 무너진다. 금속 갑옷에 녹을 퍼뜨려 서서히 강도를 떨어뜨린다.","traits":["산화 · 금속 약화","강철의 마지막 기억"]},
    {"id":"avarice","name":"황금왕의 탐욕","element":"황금","color":"#e6c16f","roman":"XLII","lore":"수많은 왕의 금화가 한 자루의 검이 되었다. 눈부신 부의 무게가 칼날 끝에 실린다.","traits":["황금 · 연성","끝없는 소유의 욕망"]},
    {"id":"logic","name":"청색 지성의 칼날","element":"연산","color":"#9ad5e9","roman":"XLIII","lore":"푸른 회로를 따라 수많은 가능성이 흐른다. 적의 움직임을 읽어 가장 짧은 승리의 길을 찾는다.","traits":["연산 · 예측","빈틈을 읽는 지성"]},
    {"id":"invisible","name":"무형의 약속","element":"투명","color":"#dae3e7","roman":"XLIV","lore":"빛을 그대로 통과시키는 무형의 칼날. 주변을 가리지 않은 채 검 자체의 모습을 감춘다.","traits":["투명 · 비가시","보이지 않는 검"]},
    {"id":"bubble","name":"물거품의 요람","element":"거품","color":"#c9dbe9","roman":"XLV","lore":"무지갯빛 거품이 충격을 나누어 받아낸다. 터져 나가는 방울들이 다음 일격을 위한 틈을 만든다.","traits":["거품 · 완충","부드러운 방어막"]},
    {"id":"colossus","name":"거인의 이정표","element":"거대","color":"#c9c4ac","roman":"XLVI","lore":"산맥 위로 솟아오른 거인의 검. 휘두르는 순간 칼날의 크기가 늘어나 넓은 범위를 휩쓴다.","traits":["거대 · 확장","산을 넘는 사거리"]},
    {"id":"flight","name":"창공의 날개","element":"비행","color":"#b6d8f1","roman":"XLVII","lore":"흰 날개가 검과 주인의 몸을 하늘로 이끈다. 지형을 넘어 공중에서 새로운 공격 각도를 찾는다.","traits":["비행 · 활공","하늘을 걷는 검"]},
    {"id":"oblivion","name":"망각의 회랑","element":"망각","color":"#bdc5ce","roman":"XLVIII","lore":"칼날 속 회랑에 버려진 기억이 떠돈다. 적이 익숙하게 외운 검로를 지워 다음 수를 잊게 한다.","traits":["망각 · 기억 봉인","잊힌 검술의 문"]},
    {"id":"void","name":"공허의 끝","element":"공허","color":"#c3b0d7","roman":"XLIX","lore":"검의 중심에는 아무것도 남지 않는다. 닿은 마법을 삼켜 그 흔적마저 소멸시킨다.","traits":["공허 · 마력 소거","돌아오지 않는 끝"]},
    {"id":"melody","name":"황금 현의 찬가","element":"선율","color":"#e1c28c","roman":"L","lore":"황금 현을 타고 전장의 박자가 흐른다. 동료의 호흡을 맞추고 흔들린 사기를 끌어올린다.","traits":["선율 · 고무","함께 울리는 찬가"]},
    {"id":"replica","name":"쌍생의 실험","element":"복제","color":"#b8d3c7","roman":"LI","lore":"하나의 칼날에서 같은 형상의 검들이 갈라진다. 복제된 칼날이 주인의 공격 궤적을 따라 움직인다.","traits":["복제 · 분열","하나에서 태어난 셋"]},
    {"id":"miasma","name":"황색 역병의 숨","element":"독무","color":"#cbd186","roman":"LII","lore":"노란 독무가 낮게 번져 전장에 머문다. 상처를 내지 않아도 안개 속 적에게 지속적으로 영향을 준다.","traits":["독무 · 지역 오염","숨을 조이는 장막"]},
    {"id":"magma","name":"화산의 혈맥","element":"용암","color":"#f2a06c","roman":"LIII","lore":"녹아 흐르는 바위가 칼날의 균열을 채운다. 바닥에 남은 용암이 적의 진입로를 막는다.","traits":["용암 · 지면 장악","흐르는 불의 강"]},
    {"id":"swamp","name":"늪지의 침묵","element":"늪","color":"#a9ba8a","roman":"LIV","lore":"오래 잠긴 검이 딛고 선 땅을 진창으로 바꾼다. 깊이 빠질수록 적의 발걸음은 무거워진다.","traits":["늪 · 침하","빠져나오기 힘든 땅"]},
    {"id":"acid","name":"연금술사의 눈물","element":"산성","color":"#d4cf96","roman":"LV","lore":"칼날에서 흘러내린 산성 방울이 단단한 표면을 녹인다. 금속뿐 아니라 돌로 된 방벽에도 길을 낸다.","traits":["산성 · 용해","방벽을 녹이는 방울"]},
    {"id":"blizzard","name":"백야의 눈보라","element":"눈보라","color":"#d2e0e9","roman":"LVI","lore":"휘몰아치는 눈이 넓은 전장을 덮는다. 쌓이는 눈과 거센 눈발이 적의 시야와 이동을 함께 방해한다.","traits":["눈보라 · 기상 장악","하얗게 지워진 전장"]},
    {"id":"beam","name":"백광의 관통","element":"광선","color":"#c3dff5","roman":"LVII","lore":"한 줄기로 모인 빛이 검 끝을 지나 뻗는다. 곧은 광선이 멀리 있는 표적을 정밀하게 꿰뚫는다.","traits":["광선 · 직선 관통","빛으로 잇는 사거리"]}
  ];
  const stage=document.querySelector('.weapon-stage');
  const container=document.querySelector('.cards');
  const pagination=document.querySelector('.pagination');
  const soundButton=document.querySelector('.sound');
  const equip=document.querySelector('.equip');
  const status=document.querySelector('.selection');
  const announcement=document.querySelector('#announcement');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const count=weapons.length;
  const mod=n=>((n%count)+count)%count;
  const wrap=n=>mod(n+count/2)-count/2;
  let position=0,target=0,velocity=0,lastTime=0,raf=0,step=250;
  let selected=0,equipped=null,drag=null,suppressClick=false,settlePending=false;
  let audio=null,noise=null,muted=false,lastWhoosh=-1;
  try{muted=localStorage.getItem('armory-muted')==='true';equipped=localStorage.getItem('armory-equipped')}catch{}
  const cards=weapons.map((weapon,i)=>{
    const card=document.createElement('button');
    card.type='button';card.className='weapon-card';card.style.setProperty('--tone',weapon.color);
    card.setAttribute('aria-label',weapon.name+' · '+weapon.element);
    const img=document.createElement('img');
    img.dataset.src='./assets/armory/'+weapon.id+'.webp';img.alt=weapon.element+' 마법에 둘러싸인 장검';img.draggable=false;img.decoding='sync';
    const shade=document.createElement('span');shade.className='card-shade';shade.setAttribute('aria-hidden','true');
    const caption=document.createElement('span');caption.className='card-caption';caption.innerHTML='<b>'+weapon.element+'</b><span>'+weapon.name+'</span>';
    const number=document.createElement('span');number.className='card-number';number.textContent=weapon.roman;
    card.append(img,shade,caption,number);container.append(card);
    card.addEventListener('click',()=>{
      if(suppressClick)return;
      const delta=wrap(i-mod(Math.round(target)));
      if(delta)go(target+delta);else {stage.focus({preventScroll:true});if(['frost','flame','lightning','tempest','venom','soul','shadow','gravity','magnet','resonance'].includes(weapon.id)){unlockAudio();triggerElement(weapon.id);}}
    });
    const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',weapon.name+' 보기');
    dot.addEventListener('click',()=>go(Math.round(target)+wrap(i-mod(Math.round(target)))));
    pagination.append(dot);
    return {card,shade,dot,img};
  });
  const jump=document.querySelector('#weapon-jump');
  weapons.forEach((w,i)=>{const option=new Option(String(i+1).padStart(2,'0')+' · '+w.name,i);jump.add(option);});
  jump.addEventListener('change',()=>go(Math.round(target)+wrap(Number(jump.value)-mod(Math.round(target)))));
  function preload(center){cards.forEach(({img},i)=>{if(Math.abs(wrap(i-center))<=4&&!img.getAttribute('src'))img.src=img.dataset.src;});}
  function updateSound(){
    soundButton.innerHTML=muted?'소리 꺼짐 <span aria-hidden="true">♪</span>':'소리 켜짐 <span aria-hidden="true">♫</span>';
    soundButton.setAttribute('aria-pressed',String(!muted));
    soundButton.setAttribute('aria-label',muted?'효과음 켜기':'효과음 끄기');
  }
  function unlockAudio(){
    if(muted)return;
    try{
      if(!audio){
        const Audio=window.AudioContext||window.webkitAudioContext;
        if(!Audio)return;
        audio=new Audio();
        noise=audio.createBuffer(1,Math.ceil(audio.sampleRate*.32),audio.sampleRate);
        const data=noise.getChannelData(0);
        for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;
      }
      if(audio.state==='suspended')audio.resume().catch(()=>{});
    }catch{audio=null;}
  }
  function whoosh(direction){
    unlockAudio();if(!audio||muted)return;
    const now=audio.currentTime;
    if(now-lastWhoosh<.095)return;
    lastWhoosh=now;
    const source=audio.createBufferSource();source.buffer=noise;
    const filter=audio.createBiquadFilter();filter.type='bandpass';filter.Q.value=.55;
    filter.frequency.setValueAtTime(1500,now);filter.frequency.exponentialRampToValueAtTime(260,now+.28);
    const gain=audio.createGain();gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.12,now+.055);gain.gain.exponentialRampToValueAtTime(.0001,now+.28);
    const pan=audio.createStereoPanner();pan.pan.setValueAtTime(-direction*.3,now);pan.pan.linearRampToValueAtTime(direction*.3,now+.25);
    source.connect(filter).connect(gain).connect(pan).connect(audio.destination);
    source.start(now);source.stop(now+.30);
    source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();pan.disconnect();};
  }
  let flameSound=null;
  document.addEventListener('armory:clear-effect',()=>{if(flameSound){try{flameSound.stop();}catch{}flameSound=null;}});
  function triggerElement(id){
    document.dispatchEvent(new Event('armory:clear-effect'));
    if(id==='frost'){triggerFrost();return;}
    if(id==='tempest'){triggerTempest();return;}
    if(['venom','soul','shadow','gravity','magnet','resonance'].includes(id)){document.dispatchEvent(new Event('armory:'+id));return;}
    document.dispatchEvent(new Event('armory:'+id));
    if(!audio||muted)return;
    const now=audio.currentTime,source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();
    const thunder=id==='lightning';
    source.buffer=noise;source.loop=true;source.playbackRate.value=thunder?.24:.68;
    filter.type='lowpass';filter.frequency.setValueAtTime(thunder?120:650,now);filter.frequency.linearRampToValueAtTime(thunder?430:1900,now+(thunder?2.5:1));filter.frequency.linearRampToValueAtTime(thunder?65:350,now+(thunder?6:7.8));
    gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(thunder?.2:.13,now+(thunder?2:2.4));gain.gain.exponentialRampToValueAtTime(.0001,now+(thunder?6.4:8.2));
    source.connect(filter).connect(gain).connect(audio.destination);flameSound=source;source.start(now);source.stop(now+(thunder?6.5:8.3));
    source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();if(flameSound===source)flameSound=null;};
  }
  function triggerTempest(){
    document.dispatchEvent(new Event('armory:tempest'));
    if(!audio||muted)return;
    const now=audio.currentTime,source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();
    const buffer=audio.createBuffer(1,audio.sampleRate*3,audio.sampleRate),data=buffer.getChannelData(0);
    let low=0;for(let i=0;i<data.length;i++){low=low*.96+(Math.random()*2-1)*.04;data[i]=low*3;}
    source.buffer=buffer;source.loop=true;filter.type='lowpass';filter.Q.value=.6;
    filter.frequency.setValueAtTime(220,now);gain.gain.setValueAtTime(.0001,now);
    for(let i=1;i<=6;i++){filter.frequency.linearRampToValueAtTime(350+Math.random()*950,now+i);gain.gain.linearRampToValueAtTime(.11+Math.random()*.13,now+i);}
    gain.gain.exponentialRampToValueAtTime(.0001,now+8.7);
    source.connect(filter).connect(gain).connect(audio.destination);flameSound=source;source.start(now);source.stop(now+8.8);
    source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();if(flameSound===source)flameSound=null;};
  }
  function triggerFrost(){
    document.dispatchEvent(new Event('armory:frost'));
    if(!audio||muted)return;
    const now=audio.currentTime;
    for(let i=0;i<11;i++){
      const at=now+i*.065,source=audio.createBufferSource(),filter=audio.createBiquadFilter(),gain=audio.createGain();
      source.buffer=noise;source.playbackRate.value=1.2+Math.random()*.8;
      filter.type='highpass';filter.frequency.value=2200;
      gain.gain.setValueAtTime(.0001,at);gain.gain.exponentialRampToValueAtTime(.035*(1-i/15),at+.003);
      gain.gain.exponentialRampToValueAtTime(.0001,at+.065);
      source.connect(filter).connect(gain).connect(audio.destination);source.start(at);source.stop(at+.08);
      source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};
    }
  }
  function chime(){
    if(!audio||muted||audio.state!=='running')return;
    const now=audio.currentTime;
    [740,1197,1825].forEach((hz,i)=>{
      const osc=audio.createOscillator(),gain=audio.createGain();
      osc.type='sine';osc.frequency.value=hz;
      gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.018/(i+1),now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+.3+i*.04);
      osc.connect(gain).connect(audio.destination);osc.start(now);osc.stop(now+.45);
      osc.onended=()=>{osc.disconnect();gain.disconnect();};
    });
  }
  function information(index){
    const previousSelection=selected;
    selected=mod(index);const w=weapons[selected];
    if(selected!==previousSelection)document.dispatchEvent(new Event('armory:clear-effect'));
    preload(selected);jump.value=String(selected);
    document.querySelector('#weapon-counter').textContent=String(selected+1).padStart(2,'0')+' / '+count;
    const marker=cards[selected].dot;
    pagination.scrollTo({left:marker.offsetLeft-pagination.clientWidth/2+marker.offsetWidth/2,behavior:reduce.matches?'instant':'smooth'});
    document.documentElement.style.setProperty('--accent',w.color);
    document.querySelector('#element').textContent=w.element;
    document.querySelector('#weapon-name').textContent=w.name;
    document.querySelector('#weapon-lore').textContent=w.lore;
    document.querySelector('#trait-one').textContent=w.traits[0];
    document.querySelector('#trait-two').textContent=w.traits[1];
    status.textContent=equipped===w.id?w.name+' · 선택한 무기':'';
    equip.innerHTML=equipped===w.id?'◇ 이 검을 선택했습니다 ◇':'<span aria-hidden="true">◇</span> 이 검을 선택하기 <span aria-hidden="true">◇</span>';
    cards.forEach(({card,dot},i)=>{
      dot.setAttribute('aria-current',String(i===selected));
      card.setAttribute('aria-pressed',String(i===selected));
    });
  }
  function paint(){
    cards.forEach(({card,shade},i)=>{
      const distance=wrap(i-position),a=Math.abs(distance);
      const visible=a<2.49;card.hidden=!visible;card.tabIndex=visible?0:-1;
      if(!visible)return;
      if(!cards[i].img.getAttribute('src'))cards[i].img.src=cards[i].img.dataset.src;
      const scale=Math.max(.65,1-.20*Math.min(a,1)-.075*Math.max(0,a-1));
      const x=distance*step;
      const y=Math.min(a,2)*16;
      const angle=-Math.sign(distance)*Math.min(a,1.6)*8;
      card.style.transform='translate3d('+x.toFixed(3)+'px,'+y.toFixed(3)+'px,0) rotateY('+angle.toFixed(3)+'deg) scale('+scale.toFixed(4)+')';
      const opacity=a<2.04?1:Math.max(0,(2.48-a)/.44);
      card.style.opacity=opacity.toFixed(3);
      card.style.zIndex=String(10-Math.round(a*3));
      card.style.pointerEvents=a>2.3?'none':'auto';
      shade.style.opacity=Math.min(.67,a*.34).toFixed(3);
    });
  }
  function tick(now){
    raf=0;const dt=lastTime?Math.min((now-lastTime)/1000,.04):1/60;lastTime=now;
    if(!drag){
      // Exact critically damped spring. Retargeting keeps current position and velocity.
      const omega=12,offset=position-target,term=velocity+omega*offset,decay=Math.exp(-omega*dt);
      position=target+(offset+term*dt)*decay;
      velocity=(velocity-omega*term*dt)*decay;
      if(reduce.matches||(Math.abs(position-target)<.0005&&Math.abs(velocity)<.004)){
        position=target;velocity=0;paint();
        if(settlePending){settlePending=false;information(Math.round(target));announcement.textContent=weapons[selected].name+', '+weapons[selected].element+' 속성';chime();}
        lastTime=0;return;
      }
    }
    paint();raf=requestAnimationFrame(tick);
  }
  function animate(){if(!raf){lastTime=0;raf=requestAnimationFrame(tick);}}
  function go(next){
    const rounded=Math.round(next);if(rounded===target&&!drag)return;
    whoosh(Math.sign(rounded-position)||1);
    target=rounded;settlePending=true;
    information(target);animate();
  }
  function resize(){
    if(drag)finishDrag(true);
    const visibleCard=cards.find(({card})=>!card.hidden);
    const cardWidth=(visibleCard||cards[0]).card.offsetWidth;
    if(!cardWidth)return;
    step=innerWidth<650?cardWidth*.78:Math.min(cardWidth*.93,innerWidth*.205);
    paint();
  }
  document.querySelector('.previous').addEventListener('click',()=>go(Math.round(target)-1));
  document.querySelector('.next').addEventListener('click',()=>go(Math.round(target)+1));
  stage.addEventListener('pointerdown',e=>{
    if(!e.isPrimary||drag||e.button!==0||e.target.closest('.arrow'))return;
    unlockAudio();
    drag={id:e.pointerId,x:e.clientX,y:e.clientY,start:position,lastX:e.clientX,time:e.timeStamp,v:0,moved:false};
    velocity=0;settlePending=false;stage.classList.add('is-dragging');
  });
  stage.addEventListener('pointermove',e=>{
    if(!drag||e.pointerId!==drag.id)return;
    const dx=e.clientX-drag.x;
    if(!drag.moved&&Math.abs(dx)>6){
      if(Math.abs(e.clientY-drag.y)>Math.abs(dx)){finishDrag(true);return;}
      drag.moved=true;stage.setPointerCapture(e.pointerId);whoosh(-Math.sign(dx));
    }
    if(!drag.moved)return;
    const dt=Math.max(1,e.timeStamp-drag.time)/1000;
    drag.v=drag.v*.6+(-(e.clientX-drag.lastX)/step/dt)*.4;
    drag.lastX=e.clientX;drag.time=e.timeStamp;
    position=drag.start-dx/step;paint();
  });
  function finishDrag(cancelled=false){
    if(!drag)return;const d=drag;drag=null;stage.classList.remove('is-dragging');
    if(stage.hasPointerCapture(d.id))stage.releasePointerCapture(d.id);
    if(d.moved){
      suppressClick=true;setTimeout(()=>suppressClick=false,0);
      const v=cancelled||performance.now()-d.time>100?0:Math.max(-6,Math.min(6,d.v));
      const projected=position+v*.16;
      target=Math.round(projected);velocity=v;settlePending=true;
      information(target);animate();
    }else{target=Math.round(target);animate();}
  }
  stage.addEventListener('pointerup',e=>{if(drag&&e.pointerId===drag.id)finishDrag();});
  stage.addEventListener('pointercancel',e=>{if(drag&&e.pointerId===drag.id)finishDrag(true);});
  stage.addEventListener('lostpointercapture',e=>{if(e.target===stage&&drag&&e.pointerId===drag.id)finishDrag(true);});
  window.addEventListener('pointerup',e=>{if(drag&&e.pointerId===drag.id)finishDrag();});
  window.addEventListener('keydown',e=>{
    if(e.altKey||e.metaKey||e.ctrlKey||e.target.matches('input,textarea,select'))return;
    if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(Math.round(target)+(e.key==='ArrowRight'?1:-1));}
    if(e.key==='Escape')document.querySelector('.back').click();
  });
  soundButton.addEventListener('click',()=>{
    muted=!muted;updateSound();try{localStorage.setItem('armory-muted',String(muted))}catch{}
    if(!muted){unlockAudio();}else if(audio)audio.suspend().catch(()=>{});
  });
  equip.addEventListener('click',()=>{
    unlockAudio();equipped=weapons[selected].id;
    try{localStorage.setItem('armory-equipped',equipped)}catch{}
    information(selected);chime();
    if(['frost','flame','lightning','tempest','venom','soul','shadow','gravity','magnet','resonance'].includes(equipped))triggerElement(equipped);
  });
  document.addEventListener('visibilitychange',()=>{
    if(document.hidden){finishDrag(true);cancelAnimationFrame(raf);raf=0;lastTime=0;if(audio)audio.suspend().catch(()=>{});}
    else {if(settlePending)animate();}
  });
  reduce.addEventListener('change',()=>{if(reduce.matches){position=target;velocity=0;paint();}animate();});
  window.addEventListener('resize',resize);
  if(new URLSearchParams(location.search).get('from')==='preview')document.querySelector('.back').href='./owmoosa-entry-reference.html#project4';
  updateSound();information(0);resize();
})();