const DB = [
['あさ','아사'],['ひる','히루'],['よる','요루'],['いぬ','이누'],['ねこ','네코'],['とり','토리'],['うみ','우미'],['やま','야마'],['かわ','카와'],['そら','소라'],['あめ','아메'],['ゆき','유키'],['はな','하나'],['みず','미즈'],['おちゃ','오차'],['ごはん','고한'],['たまご','타마고'],['さかな','사카나'],['にく','니쿠'],['くだもの','쿠다모노'],['りんご','링고'],['いちご','이치고'],['みかん','미캉'],['すし','스시'],['ぱん','팡'],['あさごはん','아사고한'],['のみもの','노미모노'],['ともだち','토모다치'],['かぞく','카조쿠'],['せんせい','센세이'],['がくせい','가쿠세이'],['でんしゃ','덴샤'],['くるま','쿠루마'],['じてんしゃ','지텐샤'],['えき','에키'],['みち','미치'],['いえ','이에'],['へや','헤야'],['まど','마도'],['つくえ','츠쿠에'],['ほん','혼'],['かばん','카방'],['でんわ','덴와'],['とけい','토케이'],['くつ','쿠츠'],['ふく','후쿠'],['あたま','아타마'],['て','테'],['あし','아시'],['め','메'],['くち','쿠치'],['あか','아카'],['あお','아오'],['しろ','시로'],['くろ','쿠로'],['おおきい','오오키이'],['ちいさい','치이사이'],['あたらしい','아타라시이'],['ふるい','후루이'],['あつい','아츠이'],['つめたい','츠메타이'],['おいしい','오이시이'],['たかい','타카이'],['やすい','야스이'],['はやい','하야이'],['たべる','타베루'],['のむ','노무'],['みる','미루'],['きく','키쿠'],['はなす','하나스'],['いく','이쿠'],['くる','쿠루'],['かえる','카에루'],['ねる','네루'],['おきる','오키루'],['べんきょう','벵쿄ㅡ'],['しんぶん','심붕'],['えいが','에이가'],['おんがく','옹가쿠'],['しゃしん','샤신'],['りょこう','료코ㅡ'],['てがみ','테가미'],['でんき','덴키'],['びょういん','뵤ㅡ잉'],['ぎんこう','깅코ㅡ'],['ゆうびんきょく','유ㅡ빙쿄쿠'],['コンビニ','콤비니'],['ホテル','호테루'],['レストラン','레스토랑'],['コーヒー','코ㅡ히ㅡ'],['ジュース','주ㅡ스'],['ケーキ','케ㅡ키'],['アイスクリーム','아이스쿠리ㅡ무'],['テレビ','테레비'],['ラジオ','라지오'],['カメラ','카메라'],['パソコン','파소콩'],['スマホ','스마호'],['エレベーター','에레베ㅡ타ㅡ'],['タクシー','타쿠시ㅡ'],['バス','바스'],['スーパー','스ㅡ파ㅡ'],['デパート','데파ㅡ토'],['ノート','노ㅡ토'],['ペン','펭'],['ドア','도아'],['ベッド','벳도'],['シャワー','샤와ㅡ'],['テーブル','테ㅡ부루'],['フォーク','포ㅡ쿠'],['ナイフ','나이후'],['サッカー','삿카ㅡ'],['テニス','테니스'],['ゲーム','게ㅡ무'],['ピアノ','피아노'],['ギター','기타ㅡ'],
['いま','이마'],['きのう','키노ㅡ'],['あした','아시타'],['まいにち','마이니치'],['しゅうまつ','슈ㅡ마츠'],['げつようび','게츠요ㅡ비'],['かようび','카요ㅡ비'],['すいようび','스이요ㅡ비'],['もくようび','모쿠요ㅡ비'],['きんようび','킹요ㅡ비'],['どようび','도요ㅡ비'],['にちようび','니치요ㅡ비'],['てんき','텡키'],['かぜ','카제'],['くもり','쿠모리'],['あたたかい','아타타카이'],['すずしい','스즈시이'],['むずかしい','무즈카시이'],['やさしい','야사시이'],['たのしい','타노시이'],
['アパート','아파ㅡ토'],['マンション','망숑'],['オフィス','오피스'],['ビル','비루'],['キッチン','킷칭'],['トイレ','토이레'],['リビング','리빙구'],['バルコニー','바루코니ㅡ'],['ガレージ','가레ㅡ지'],['ポスト','포스토'],['カーテン','카ㅡ텡'],['ソファー','소파ㅡ'],['クッション','쿳숑'],['カーペット','카ㅡ펫토'],['クローゼット','쿠로ㅡ젯토'],['エアコン','에아콩'],['ストーブ','스토ㅡ부'],['アイロン','아이롱'],['レンジ','렝지'],['オーブン','오ㅡ븡'],['フライパン','후라이팡'],['サラダ','사라다'],['スープ','스ㅡ푸'],['ハンバーグ','함바ㅡ구'],['ステーキ','스테ㅡ키'],['カレー','카레ㅡ'],['ラーメン','라ㅡ멩'],['スパゲッティ','스파게티'],['サンドイッチ','산도잇치'],['チョコレート','초코레ㅡ토'],['クッキー','쿳키ㅡ'],['プリン','푸링'],['ヨーグルト','요ㅡ구루토'],['バナナ','바나나'],['オレンジ','오렝지'],['レモン','레몽'],['メロン','메롱'],['パイナップル','파인앗푸루'],['トマト','토마토'],['ポテト','포테토'],['キャベツ','캬베츠'],['タマネギ','타마네기'],['ニンジン','닝징'],['キュウリ','큐ㅡ리'],['ピーマン','피ㅡ망'],['ウインナー','위인나ㅡ'],['チーズ','치ㅡ즈'],['ミルク','미루쿠'],['バター','바타ㅡ'],['ジャム','쟘'],['メニュー','메뉴ㅡ'],['レシート','레시ㅡ토'],['ポイント','포인토'],['サイズ','사이즈'],['デザイン','데자인'],['ブランド','부랑도'],['プレゼント','푸레젠토'],['イベント','이벵토'],['パーティー','파ㅡ티ㅡ'],['スケジュール','스케주ㅡ루'],['カレンダー','카렌다ㅡ'],['ニュース','뉴ㅡ스'],['スポーツ','스포ㅡ츠'],['アニメ','아니메'],['ドラマ','도라마'],['マンガ','망가'],['ミュージック','뮤ㅡ직쿠'],['コンサート','콘사ㅡ토'],['ライブ','라이부'],['チケット','치켓토'],['インターネット','인타ㅡ넷토'],['メール','메ㅡ루'],['アプリ','아푸리'],['サイト','사이토'],['パスワード','파스와ㅡ도'],['データ','데ㅡ타'],['ファイル','화이루'],['キーボード','키ㅡ보ㅡ도'],['マウス','마우스'],['イヤホン','이야홍'],['ヘッドホン','헷도홍'],['マイク','마이쿠'],['プリンター','푸린타ㅡ'],['コピー','코피ㅡ'],['ロボット','로봇토'],['エンジン','엔징'],['ガソリン','가소링'],['ブレーキ','부레ㅡ키'],['ハンドル','한도루'],['タイヤ','타이야'],['ガラス','가라스'],['ミラー','미라ㅡ'],['ナンバー','남바ㅡ'],['シート','시ㅡ토'],['シャンプー','샴푸ㅡ'],['リンス','링스'],['タオル','타오루'],['ブラシ','부라시'],['ドライヤー','도라이야ㅡ'],['スリッパ','스릿파'],['パジャマ','파자마'],['セーター','세ㅡ타ㅡ'],['スカート','스카ㅡ토'],['ズボン','즈봉'],['ジャケット','자켓토'],['コート','코ㅡ토'],['シャツ','샤츠'],['ネクタイ','네쿠타이'],['ベルト','베루토'],['アクセサリー','아쿠세사리ㅡ'],['リング','링구'],['ネックレス','넷쿠레스'],['バッグ','밧구'],['サンダル','산다루'],['ブーツ','부ㅡ츠'],['スニーカー','스니ㅡ카ㅡ']
].map(([kana, reading]) => ({ kana, reading }));

const knownKana = new Set(DB.map(item => item.kana));
for (const item of globalThis.HIRAGANA_ADDITIONS || []) {
  if (!knownKana.has(item.kana)) {
    DB.push(item);
    knownKana.add(item.kana);
  }
}
for (const item of globalThis.KATAKANA_ADDITIONS || []) {
  if (!knownKana.has(item.kana)) {
    DB.push(item);
    knownKana.add(item.kana);
  }
}

const $ = id => document.getElementById(id);
const screens = { start: $('start-screen'), quiz: $('quiz-screen'), result: $('result-screen') };
let selectedCount = 50, state = null;
const shuffle = list => { const copy = [...list]; for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [copy[i], copy[j]] = [copy[j], copy[i]]; } return copy; };
const isHiragana = item => /^[\u3040-\u309f]+$/.test(item.kana);
// Explicit scope also includes katakana-based words such as エモい and オタ活.
const isKatakana = item => item.script === 'katakana' || /^[\u30a0-\u30ff]+$/.test(item.kana);
function selectedPool() {
  const scope = document.querySelector('input[name="script"]:checked').value;
  if (scope === 'hiragana') return DB.filter(isHiragana);
  if (scope === 'katakana') return DB.filter(isKatakana);
  return DB;
}
function setScreen(name) { Object.entries(screens).forEach(([key, el]) => el.hidden = key !== name); window.scrollTo(0, 0); }
function setCount(change) { selectedCount = Math.max(10, Math.min(100, selectedCount + change)); $('question-count').value = selectedCount; }
$('decrease').addEventListener('click', () => setCount(-10)); $('increase').addEventListener('click', () => setCount(10));

function begin() {
  if (state) { clearTimeout(state.timer); clearTimeout(state.nextTimer); cancelAnimationFrame(state.frame); }
  const pool = selectedPool();
  const initial = shuffle(pool).slice(0, Math.min(selectedCount, pool.length));
  state = { initial, pool, queue:[...initial], completed:new Set(), attempts:0, wrong:0, timeouts:0, startedAt:performance.now(), locked:false, timer:null };
  setScreen('quiz'); showQuestion();
}
function optionsFor(item) {
  const unique = new Map(state.pool.filter(x => x.kana !== item.kana && x.reading !== item.reading).map(x => [x.reading, x]));
  const alternatives = shuffle([...unique.values()]).slice(0, 3);
  return shuffle([item, ...alternatives]);
}
function showQuestion() {
  if (!state.queue.length) return finish();
  state.locked = false; const item = state.queue[0];
  $('question').textContent = item.kana;
  $('question').style.fontSize = `clamp(1.4rem, ${Math.min(15, 72 / item.kana.length)}vw, ${Math.min(5.5, 21 / item.kana.length)}rem)`; $('feedback').textContent = '';
  $('progress-label').textContent = `${state.completed.size} / ${state.initial.length}`;
  $('progress-fill').style.width = `${state.completed.size / state.initial.length * 100}%`;
  const choices = $('choices'); choices.replaceChildren();
  optionsFor(item).forEach(option => { const button = document.createElement('button'); button.className = 'choice'; button.textContent = option.reading; button.type = 'button'; button.addEventListener('click', () => answer(option, button)); choices.append(button); });
  state.deadline = Date.now() + 3000;
  const token = state.deadline;
  const tick = () => {
    if (state.locked || state.deadline !== token) return;
    const remaining = Math.max(0, state.deadline - Date.now());
    $('timer-fill').style.transform = `scaleX(${remaining / 3000})`;
    if (!remaining) return resolve(null);
    state.frame = requestAnimationFrame(tick);
  };
  tick();
  state.timer = window.setTimeout(() => { if (state.deadline === token) resolve(null); }, 3000);
}
function answer(option, button) {
  if (state.locked) return;
  if (Date.now() >= state.deadline) return resolve(null);
  resolve(option, button);
}

function resolve(option, clicked) {
  if (state.locked) return; state.locked = true; clearTimeout(state.timer); cancelAnimationFrame(state.frame); state.attempts++;
  const item = state.queue.shift(); const correct = option && option.kana === item.kana;
  const buttons = [...$('choices').children]; const rightButton = buttons.find(b => b.textContent === item.reading);
  buttons.forEach(b => b.disabled = true);
  if (correct) { state.completed.add(item.kana); clicked.classList.add('correct'); $('feedback').textContent = '정답!'; }
  else { if (option === null) { state.timeouts++; $('feedback').textContent = '시간초과'; } else { state.wrong++; clicked.classList.add('wrong'); $('feedback').textContent = '오답'; } rightButton.classList.add('correct'); state.queue.push(item); }
  $('progress-label').textContent = `${state.completed.size} / ${state.initial.length}`;
  $('progress-fill').style.width = `${state.completed.size / state.initial.length * 100}%`;
  state.nextTimer = window.setTimeout(() => { if (!document.hidden) showQuestion(); }, 520);
}
function finish() {
  $('progress-label').textContent = `${state.initial.length} / ${state.initial.length}`; $('progress-fill').style.width = '100%';
  const seconds = Math.round((performance.now() - state.startedAt) / 1000);
  $('attempts-stat').textContent = state.attempts; $('wrong-stat').textContent = state.wrong; $('timeout-stat').textContent = state.timeouts; $('elapsed-stat').textContent = `${seconds}초`;
  setScreen('result');
}
$('start-button').addEventListener('click', begin); $('retry-button').addEventListener('click', begin); $('home-button').addEventListener('click', () => setScreen('start'));
document.addEventListener('visibilitychange', () => {
  if (!state || screens.quiz.hidden) return;
  if (document.hidden) {
    clearTimeout(state.nextTimer);
  } else if (state.locked) {
    clearTimeout(state.nextTimer); showQuestion();
  } else if (Date.now() >= state.deadline) {
    resolve(null);
  }
});
if (['http:', 'https:'].includes(location.protocol) && 'serviceWorker' in navigator) window.addEventListener('load', () => {
  navigator.serviceWorker.register('./sw.js').catch(error => console.warn('Offline cache unavailable:', error));
});


