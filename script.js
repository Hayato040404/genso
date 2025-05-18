const elements = [
  {en: "Hydrogen", ja: "水素"}, {en: "Helium", ja: "ヘリウム"},
  {en: "Lithium", ja: "リチウム"}, {en: "Beryllium", ja: "ベリリウム"},
  {en: "Boron", ja: "ホウ素"}, {en: "Carbon", ja: "炭素"},
  {en: "Nitrogen", ja: "窒素"}, {en: "Oxygen", ja: "酸素"},
  {en: "Fluorine", ja: "フッ素"}, {en: "Neon", ja: "ネオン"},
  {en: "Sodium", ja: "ナトリウム"}, {en: "Magnesium", ja: "マグネシウム"},
  {en: "Aluminum", ja: "アルミニウム"}, {en: "Silicon", ja: "ケイ素"},
  {en: "Phosphorus", ja: "リン"}, {en: "Sulfur", ja: "硫黄"},
  {en: "Chlorine", ja: "塩素"}, {en: "Argon", ja: "アルゴン"},
  {en: "Potassium", ja: "カリウム"}, {en: "Calcium", ja: "カルシウム"},
  {en: "Scandium", ja: "スカンジウム"}, {en: "Titanium", ja: "チタン"},
  {en: "Vanadium", ja: "バナジウム"}, {en: "Chromium", ja: "クロム"},
  {en: "Manganese", ja: "マンガン"}, {en: "Iron", ja: "鉄"},
  {en: "Cobalt", ja: "コバルト"}, {en: "Nickel", ja: "ニッケル"},
  {en: "Copper", ja: "銅"}, {en: "Zinc", ja: "亜鉛"},
  {en: "Gallium", ja: "ガリウム"}, {en: "Germanium", ja: "ゲルマニウム"},
  {en: "Arsenic", ja: "ヒ素"}, {en: "Selenium", ja: "セレン"},
  {en: "Bromine", ja: "臭素"}, {en: "Krypton", ja: "クリプトン"},
  {en: "Rubidium", ja: "ルビジウム"}, {en: "Strontium", ja: "ストロンチウム"},
  {en: "Yttrium", ja: "イットリウム"}, {en: "Zirconium", ja: "ジルコニウム"}
];

let mastered = JSON.parse(localStorage.getItem(\"mastered\") || \"[]\");
let mistakes = JSON.parse(localStorage.getItem(\"mistakes\") || \"{}\");
let weakMode = typeof weakMode !== \"undefined\" && weakMode;

function getQuizList() {
  if (weakMode) {
    let sorted = Object.entries(mistakes).sort((a,b) => b[1]-a[1]);
    let topWeak = sorted.map(([k]) => elements.find(e => e.en === k)).filter(Boolean);
    return topWeak.length > 0 ? topWeak : elements;
  } else {
    return elements.filter(e => !mastered.includes(e.en));
  }
}

function pickRandomElement() {
  let list = getQuizList();
  if (list.length === 0) {
    document.getElementById(\"quiz-box\").innerHTML = '<p>すべてクリアしました！🎉</p>';
    return;
  }
  let q = list[Math.floor(Math.random() * list.length)];
  document.getElementById(\"question-text\").textContent = q.en;
  document.getElementById(\"answer\").value = \"\";
  document.getElementById(\"feedback\").textContent = \"\";
  document.getElementById(\"progress\").textContent = `のこり: ${list.length}`;
}

function checkAnswer() {
  let input = document.getElementById(\"answer\").value.trim();
  let qText = document.getElementById(\"question-text\").textContent;
  let item = elements.find(e => e.en === qText);
  if (!item) return;

  if (input === item.ja) {
    document.getElementById(\"feedback\").textContent = \"⭕ 正解！\";
    if (!mastered.includes(item.en)) {
      mastered.push(item.en);
      localStorage.setItem(\"mastered\", JSON.stringify(mastered));
    }
  } else {
    document.getElementById(\"feedback\").textContent = `❌ 不正解 (${item.ja})`;
    mistakes[item.en] = (mistakes[item.en] || 0) + 1;
    localStorage.setItem(\"mistakes\", JSON.stringify(mistakes));
  }
  setTimeout(pickRandomElement, 1000);
}

if (document.getElementById(\"submit\")) {
  document.getElementById(\"submit\").onclick = checkAnswer;
  if (document.getElementById(\"reset\")) {
    document.getElementById(\"reset\").onclick = () => {
      localStorage.clear();
      location.reload();
    };
  }
  pickRandomElement();
}
