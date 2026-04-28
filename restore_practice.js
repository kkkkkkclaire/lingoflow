const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Add Tab Button
if(!html.includes('data-section="practice"')) {
  html = html.replace(
    '<button class="tab-btn" data-section="lookup">智能查询</button>',
    '<button class="tab-btn" data-section="practice">单词练习</button>\n    <button class="tab-btn" data-section="lookup">智能查询</button>'
  );
}

// 2. Add Section Div
if(!html.includes('id="sec-practice"')) {
  html = html.replace(
    '<div class="section" id="sec-lookup">',
    '<div class="section" id="sec-practice"></div>\n  <div class="section" id="sec-lookup">'
  );
}

// 3. Add Switch logic
if(!html.includes("case'practice':renderPractice();break;")) {
  html = html.replace(
    "case'grammar':renderGrammar();break;case'lookup':renderLookup();break}",
    "case'grammar':renderGrammar();break;case'practice':renderPractice();break;case'lookup':renderLookup();break}"
  );
}

// 4. Add Practice CSS
if(!html.includes('.practice-container')) {
  const css = `
/* PRACTICE */
.practice-container{max-width:600px;margin:0 auto;text-align:center;}
.practice-cats{display:flex;flex-wrap:wrap;gap:12px;justify-content:center;margin-top:20px;}
.p-cat-btn{padding:12px 24px;border-radius:12px;background:rgba(255,255,255,0.4);border:1px solid rgba(255,255,255,0.5);cursor:pointer;font-weight:600;font-size:1rem;transition:all var(--transition);}
.p-cat-btn:hover{background:rgba(255,255,255,0.7);transform:translateY(-2px);}
.p-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;}
.p-back-btn{background:rgba(255,255,255,0.3);border:none;padding:8px 16px;border-radius:20px;cursor:pointer;font-size:0.9rem;}
.p-progress{flex:1;margin:0 20px;height:8px;background:rgba(255,255,255,0.3);border-radius:4px;overflow:hidden;}
.p-progress-fill{height:100%;background:var(--text-primary);width:0%;transition:width 0.3s ease;}
.practice-card{background:rgba(255,255,255,0.5);border-radius:20px;padding:40px 20px;backdrop-filter:blur(10px);box-shadow:0 8px 32px rgba(0,0,0,0.05);border:1px solid rgba(255,255,255,0.6);margin-bottom:20px;}
.p-target-word{font-size:2.5rem;font-weight:700;margin-bottom:10px;}
.p-hint{color:var(--text-secondary);font-size:1rem;margin-bottom:30px;min-height:24px;}
.p-input-wrap{display:flex;justify-content:center;gap:10px;margin-bottom:20px;}
.p-input{font-size:1.5rem;padding:12px 20px;border-radius:12px;border:2px solid rgba(255,255,255,0.8);background:rgba(255,255,255,0.6);outline:none;text-align:center;width:250px;transition:all 0.2s;}
.p-input:focus{border-color:var(--text-primary);background:#fff;}
.p-submit{padding:12px 24px;border-radius:12px;border:none;background:var(--text-primary);color:#fff;font-size:1.1rem;cursor:pointer;}
.p-controls{display:flex;justify-content:space-between;gap:20px;}
.p-nav-btn{flex:1;padding:12px;border-radius:12px;border:none;background:rgba(255,255,255,0.5);cursor:pointer;font-size:1rem;transition:all 0.2s;}
.p-nav-btn:hover{background:rgba(255,255,255,0.8);}
.p-feedback{margin-top:15px;font-weight:600;font-size:1.1rem;min-height:26px;}
.p-gender{font-size:0.9rem;margin-top:-5px;margin-bottom:10px;}
`;
  html = html.replace('/* LOOKUP */', css + '\n/* LOOKUP */');
}

// 5. Add Practice JS
if(!html.includes('const practiceState')) {
  const js = `
// PRACTICE
const practiceState = { cat: null, words: [], currentIndex: 0, totalOriginal: 0, newWordsSeen: 0 };
function getEsGenderInfo(catId, w) {
  if(currentLang!=='es') return null;
  const nounCats=['home','restaurant','transport','relations','hobbies','body','clothes','nature','jobs'];
  if(!nounCats.includes(catId)) return null;
  const m=['padre','hermano','amigo','hijo','esposo','niño','profesor','vecino','compañero','dormitorio','baño','teléfono','reloj','arroz','pan','pescado','huevo','café','té','menú','tenedor','cuchillo','plato','aeropuerto','hotel','autobús','taxi','tren','mapa','boleto','pasaporte','banco','hospital','estudiante','azúcar','libro','deporte','juego','arte','viaje','baile','piano','equipo','pasatiempo','ojo','brazo','pie','cuerpo','pelo','médico','dolor','pantalones','vestido','abrigo','zapato','sombrero','calcetín','bolso','cinturón','anillo','perro','gato','pájaro','pez','caballo','árbol','río','mar','cielo','sol','policía','trabajador','conductor','jefe','empleado','granjero','cocinero','artista','cantante','actor','escritor','gerente','piloto','ingeniero'];
  const f=['madre','hermana','hija','esposa','casa','habitación','cocina','mesa','silla','cama','puerta','ventana','luz','computadora','llave','agua','carne','fruta','leche','sal','cuenta','cuchara','estación','izquierda','derecha','calle','escuela','música','película','foto','canción','guitarra','pelota','cabeza','oreja','boca','nariz','cara','mano','pierna','medicina','ropa','camisa','camiseta','falda','chaqueta','gafas','flor','hierba','montaña','luna','estrella','enfermera'];
  if(m.includes(w.toLowerCase())) return {color:'#4F8BCA', label:'阳性 (m.)'};
  if(f.includes(w.toLowerCase())) return {color:'#D26B88', label:'阴性 (f.)'};
  return null;
}
function stripAccents(str) { return str.normalize('NFD').replace(/[\\u0300-\\u036f]/g, ''); }
function renderPractice() {
  const sec = document.getElementById('sec-practice');
  if(!practiceState.cat) {
    let h = '<h2 class="section-title">选择练习类别</h2><div class="practice-cats">';
    for(const cat of DATA[currentLang].vocab.categories) {
      h += \`<button class="p-cat-btn" onclick="startPractice('\${cat.id}')">\${cat.name}</button>\`;
    }
    h += '</div>';
    sec.innerHTML = h;
  } else {
    renderPracticeCard();
  }
}
function startPractice(catId) {
  const cat = DATA[currentLang].vocab.categories.find(c=>c.id===catId);
  if(!cat) return;
  practiceState.cat = catId;
  practiceState.words = [];
  cat.subgroups.forEach(sg => sg.items.forEach(item => {
    practiceState.words.push({ w: item.w, t: item.t, isReview: false });
  }));
  practiceState.words = practiceState.words.sort(() => Math.random() - 0.5);
  practiceState.totalOriginal = practiceState.words.length;
  practiceState.currentIndex = 0;
  practiceState.newWordsSeen = 0;
  renderPracticeCard();
}
function renderPracticeCard() {
  const sec = document.getElementById('sec-practice');
  if(practiceState.currentIndex >= practiceState.words.length) {
    sec.innerHTML = '<div class="practice-container"><h2>🎉 练习完成！</h2><button class="p-submit" style="margin-top:20px" onclick="practiceState.cat=null;renderPractice()">返回类别</button></div>';
    return;
  }
  const item = practiceState.words[practiceState.currentIndex];
  if(!item.isReview) practiceState.newWordsSeen++;
  const progress = Math.min(100, Math.floor((practiceState.newWordsSeen / practiceState.totalOriginal) * 100));
  
  let genderHtml = '';
  const g = getEsGenderInfo(practiceState.cat, item.w);
  if(g) genderHtml = \`<div class="p-gender" style="color:\${g.color}">\${g.label}</div>\`;

  sec.innerHTML = \`
    <div class="practice-container">
      <div class="p-header">
        <button class="p-back-btn" onclick="practiceState.cat=null;renderPractice()">← 类别</button>
        <div class="p-progress"><div class="p-progress-fill" style="width:\${progress}%"></div></div>
        <div style="font-size:0.9rem">\${progress}%</div>
      </div>
      <div class="practice-card">
        <div class="p-target-word">\${item.t}</div>
        \${genderHtml}
        <div class="p-hint" id="p-hint">\${item.isReview ? '🔄 错题复习' : ''}</div>
        <div class="p-input-wrap">
          <input type="text" id="p-input" class="p-input" autocomplete="off" placeholder="输入对应单词...">
        </div>
        <div class="p-feedback" id="p-feedback"></div>
      </div>
      <div class="p-controls">
        <button class="p-nav-btn" onclick="prevPractice()">上一题</button>
        <button class="p-submit" onclick="checkPractice()">提交 (Enter)</button>
        <button class="p-nav-btn" onclick="nextPractice()">下一题</button>
      </div>
    </div>
  \`;
  document.getElementById('p-input').focus();
  document.getElementById('p-input').addEventListener('keydown', e => {
    if(e.key === 'Enter') checkPractice();
  });
}
function checkPractice() {
  const inputEl = document.getElementById('p-input');
  const val = inputEl.value.trim();
  const feedback = document.getElementById('p-feedback');
  if(!val) {
    feedback.textContent = '请输入内容！';
    feedback.style.color = '#FFA500';
    return;
  }
  const item = practiceState.words[practiceState.currentIndex];
  const target = item.w.trim();
  const normalizedInput = stripAccents(val.toLowerCase());
  const normalizedTarget = stripAccents(target.toLowerCase());
  
  const hintEl = document.getElementById('p-hint');
  
  if(val.toLowerCase() === target.toLowerCase()) {
    feedback.textContent = '✅ 正确！';
    feedback.style.color = '#4CAF50';
    inputEl.style.borderColor = '#4CAF50';
    inputEl.disabled = true;
    speak(target);
    setTimeout(nextPractice, 800);
  } else if (currentLang === 'es' && normalizedInput === normalizedTarget) {
    feedback.textContent = \`⚠️ 拼写正确但缺少重音。正确答案是: \${target}\`;
    feedback.style.color = '#FFA500';
    inputEl.style.borderColor = '#FFA500';
    inputEl.value = target;
    inputEl.disabled = true;
    speak(target);
    setTimeout(nextPractice, 1500);
  } else {
    feedback.textContent = \`❌ 错误！正确答案是: \${target}\`;
    feedback.style.color = '#F44336';
    inputEl.style.borderColor = '#F44336';
    inputEl.value = target;
    inputEl.disabled = true;
    speak(target);
    
    // Ebbinghaus logic: schedule to appear again
    const scheduleReview = (offset) => {
      let insertIndex = practiceState.currentIndex + offset;
      if (insertIndex > practiceState.words.length) insertIndex = practiceState.words.length;
      practiceState.words.splice(insertIndex, 0, { w: item.w, t: item.t, isReview: true });
    };
    scheduleReview(3);
    scheduleReview(8);
    
    setTimeout(nextPractice, 2000);
  }
}
function nextPractice() {
  practiceState.currentIndex++;
  renderPracticeCard();
}
function prevPractice() {
  if(practiceState.currentIndex > 0) {
    practiceState.currentIndex--;
    // If going back to a new word, decrement counter
    if(!practiceState.words[practiceState.currentIndex].isReview) practiceState.newWordsSeen--;
    renderPracticeCard();
  }
}

// LOOKUP
`;
  html = html.replace('// LOOKUP', js);
}

fs.writeFileSync('index.html', html);
console.log('Restored Practice');
