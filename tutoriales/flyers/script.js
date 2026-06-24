// ============== DATA ==============
const PALETTES = {
  "Noche Misional":        {bg:"#0f1b3d", accent:"#d4af37", eyebrow:"NOCHE MISIONAL"},
  "Actividad de Limpieza": {bg:"#16302a", accent:"#9fd8b8", eyebrow:"ACTIVIDAD DE SERVICIO"},
  "Sociedad de Socorro":   {bg:"#451f30", accent:"#e8b4bc", eyebrow:"SOCIEDAD DE SOCORRO"},
  "Primaria":              {bg:"#1c5e8a", accent:"#ffd166", eyebrow:"ACTIVIDAD DE PRIMARIA"},
  "Actividad de Jóvenes":  {bg:"#2a1a47", accent:"#ff8c42", eyebrow:"JÓVENES"},
  "Obra Misional":         {bg:"#3a2812", accent:"#e0a458", eyebrow:"OBRA MISIONAL"},
  "Noche de Hogar":        {bg:"#27331b", accent:"#f4d35e", eyebrow:"NOCHE DE HOGAR"},
  "Conferencia de Barrio": {bg:"#181826", accent:"#c9a44c", eyebrow:"CONFERENCIA DE BARRIO"},
  "Conferencia de Estaca": {bg:"#14213d", accent:"#d4af37", eyebrow:"CONFERENCIA DE ESTACA"},
  "Actividad Social":      {bg:"#531f43", accent:"#ffb6c1", eyebrow:"ACTIVIDAD SOCIAL"},
  "Cumpleaños":             {bg:"#5a1e5e", accent:"#ffd166", eyebrow:"¡FELIZ CUMPLEAÑOS!"},
  "Baby Shower":            {bg:"#3d5a6e", accent:"#f9c9d6", eyebrow:"BABY SHOWER"},
  "Graduación":             {bg:"#0f1f3d", accent:"#d4af37", eyebrow:"GRADUACIÓN"},
  "Aniversario":            {bg:"#4a1620", accent:"#e8b4bc", eyebrow:"ANIVERSARIO"},
  "Reunión Familiar":       {bg:"#5c3a1e", accent:"#f4d35e", eyebrow:"REUNIÓN FAMILIAR"},
  "Despedida o Bienvenida":{bg:"#1c4a52", accent:"#8fd9c4", eyebrow:"NOS REUNIMOS"},
  "Evento Deportivo":       {bg:"#16241a", accent:"#9ee37d", eyebrow:"EVENTO DEPORTIVO"},
  "Personalizada":         {bg:"#1f2430", accent:"#c79a3d", eyebrow:"ACTIVIDAD DEL BARRIO"}
};

const GRADIENTS = [
  d => `linear-gradient(180deg, rgba(0,0,0,.1) 0%, ${d}cc 65%, ${d} 100%)`,
  d => `linear-gradient(0deg, rgba(0,0,0,.1) 0%, ${d}cc 65%, ${d} 100%)`,
  d => `linear-gradient(125deg, ${d}e6 10%, rgba(0,0,0,.2) 55%, ${d}cc 100%)`,
  d => `radial-gradient(circle at 50% 35%, rgba(0,0,0,0) 0%, ${d}dd 80%)`,
  d => `linear-gradient(200deg, ${d}f2 0%, rgba(0,0,0,.15) 50%, ${d}f2 100%)`
];

let uploadedPhoto = null;
let lastSeeds = [];
let usedPhotoIds = [];
let currentOptions = [];
let selectedIndex = null;

const CATEGORY_QUERIES = {
  "Noche Misional":        ["missionaries teaching", "young missionaries", "bible study group"],
  "Actividad de Limpieza": ["volunteers cleaning", "community cleanup", "gardening volunteers"],
  "Sociedad de Socorro":   ["women group meeting", "women crafting together", "women helping"],
  "Primaria":              ["children playing classroom", "kids crafts activity", "happy kids group"],
  "Actividad de Jóvenes":  ["teenagers group activity", "youth group having fun", "young people bonfire"],
  "Obra Misional":         ["open bible reading", "missionary work", "sharing faith"],
  "Noche de Hogar":        ["family gathering home", "family dinner table", "family bonding"],
  "Conferencia de Barrio": ["church congregation", "people sitting church pews", "audience conference"],
  "Conferencia de Estaca": ["large conference hall audience", "convention crowd", "auditorium stage"],
  "Actividad Social":      ["friends party celebration", "community potluck", "people celebrating"],
  "Cumpleaños":             ["birthday party celebration", "balloons confetti party", "birthday cake"],
  "Baby Shower":            ["baby shower decoration", "pregnant woman celebration"],
  "Graduación":             ["graduation cap students", "graduation ceremony"],
  "Aniversario":            ["couple celebration anniversary", "romantic dinner"],
  "Reunión Familiar":       ["family reunion outdoor", "family gathering picnic"],
  "Despedida o Bienvenida":["farewell party people", "friends hugging goodbye"],
  "Evento Deportivo":       ["sports team celebration", "soccer match action"],
  "Personalizada":         ["community gathering people", "volunteers community event"]
};

// Elements DOM
const categorySelect = document.getElementById('category');
const customTitleField = document.getElementById('customTitleField');
const generateBtn = document.getElementById('generateBtn');
const regenBtn = document.getElementById('regenBtn');
const photoInput = document.getElementById('photoInput');
const clearPhotoBtn = document.getElementById('clearPhoto');
const thumbImg = document.getElementById('thumb');

categorySelect.addEventListener('change', () => {
  customTitleField.style.display = categorySelect.value === 'Personalizada' ? 'block' : 'none';
});

// Upload User Photo Logic
photoInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      uploadedPhoto = evt.target.result;
      thumbImg.src = uploadedPhoto;
      thumbImg.style.display = 'block';
      clearPhotoBtn.style.display = 'inline-block';
    };
    reader.readAsDataURL(file);
  }
});

clearPhotoBtn.addEventListener('click', () => {
  uploadedPhoto = null;
  photoInput.value = '';
  thumbImg.style.display = 'none';
  clearPhotoBtn.style.display = 'none';
});

function getPexelsKey(){ return document.getElementById('pexelsKey').value.trim(); }
function setApiStatus(msg, ok){
  const el = document.getElementById('apiStatus');
  if(el) { el.textContent = msg; el.style.color = ok ? '#3d6b52' : '#a3433a'; }
}

function randomSeed(){
  let s = Math.floor(Math.random()*100000) + '-' + Date.now();
  lastSeeds.push(s);
  if(lastSeeds.length > 50) lastSeeds.shift();
  return s;
}

async function fetchCategoryPhoto(category, w, h){
  if(uploadedPhoto) return uploadedPhoto;
  const key = getPexelsKey();
  if(!key) return `https://picsum.photos/seed/${randomSeed()}/${w}/${h}`;

  const queries = CATEGORY_QUERIES[category] || CATEGORY_QUERIES['Personalizada'];
  const query = queries[Math.floor(Math.random()*queries.length)];
  const page = Math.floor(Math.random()*3) + 1;

  try {
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=12&page=${page}`, {
      headers: { Authorization: key }
    });
    if(!res.ok) return `https://picsum.photos/seed/${randomSeed()}/${w}/${h}`;
    const data = await res.json();
    let photos = data.photos || [];
    if(photos.length === 0) return `https://picsum.photos/seed/${randomSeed()}/${w}/${h}`;
    const chosen = photos[Math.floor(Math.random()*photos.length)];
    setApiStatus('✅ Conectado a Pexels — Imagen cargada con éxito.', true);
    return chosen.src.large2x || chosen.src.large;
  } catch(e) {
    return `https://picsum.photos/seed/${randomSeed()}/${w}/${h}`;
  }
}

function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

function getFormData(){
  const cat = categorySelect.value;
  let title = cat === 'Personalizada' ? (document.getElementById('customTitle').value.trim() || 'Actividad del Barrio') : cat;
  return {
    category: cat,
    title: title.toUpperCase(),
    quote: document.getElementById('quote').value.trim(),
    datetime: document.getElementById('datetime').value.trim() || 'Por confirmar',
    location: document.getElementById('location').value.trim() || 'Capilla del Barrio',
    extra: document.getElementById('extra').value.trim(),
    palette: PALETTES[cat] || PALETTES['Personalizada']
  };
}

// ============== PLANTILLAS (FUENTES CORREGIDAS) ==============

function tplMagazine(d, img, grad, align){
  const just = align === 'left' ? 'flex-start' : (align === 'right' ? 'flex-end' : 'center');
  const txtAlign = align === 'left' ? 'left' : (align === 'right' ? 'right' : 'center');
  
  // ⚡ REDUCCIÓN DE FUENTE: Pasamos de 7.2vw a un tamaño adaptativo en porcentaje ideal (8.5% y 4.5%)
  return `
    <img class="f-bg" src="${img}" crossorigin="anonymous">
    <div class="f-overlay" style="background:${grad}"></div>
    <div class="f-content" style="justify-content:space-between;align-items:${just};text-align:${txtAlign};">
      <div>
        <div class="f-eyebrow" style="color:${d.palette.accent}; font-size: 12px;">${d.palette.eyebrow}</div>
        <div class="f-title" style="font-size: 9%; max-width: 100%; font-weight:800;">${escapeHtml(d.title)}</div>
        ${d.quote ? `<div class="f-quote" style="font-size: 4.5%; margin-top:12px; max-width:95%;">${escapeHtml(d.quote)}</div>` : ''}
      </div>
      <div style="width: 100%; display: flex; flex-direction: column; align-items: ${just};">
        <div class="f-rule" style="background:${d.palette.accent}"></div>
        <div class="f-meta-row" style="font-size: 5.5%;"><span class="ic">📅</span>${escapeHtml(d.datetime)}</div>
        <div class="f-meta-row" style="font-size: 4.5%; color:${d.palette.accent}; margin-top: 4px;"><span class="ic">📍</span>${escapeHtml(d.location)}</div>
        ${d.extra ? `<div class="f-meta-sub" style="font-size: 3.5%;">${escapeHtml(d.extra)}</div>` : ''}
      </div>
    </div>`;
}

function tplLateral(d, img, grad, mirrored){
  return `
    <div style="position:absolute;inset:0;display:flex;flex-direction:${mirrored?'row-reverse':'row'}">
      <div style="width:42%;position:relative;overflow:hidden;">
        <img class="f-bg" src="${img}" crossorigin="anonymous">
        <div style="position:absolute;inset:0;background:linear-gradient(${mirrored?'-90deg':'90deg'}, rgba(0,0,0,0) 60%, ${d.palette.bg} 100%)"></div>
      </div>
      <div style="width:58%;background:${d.palette.bg};display:flex;flex-direction:column;justify-content:center;padding:8% 7%;color:#fff;">
        <div class="f-eyebrow" style="color:${d.palette.accent}; font-size: 11px;">${d.palette.eyebrow}</div>
        <div class="f-title" style="font-size: 8.5%; margin-top:8px;">${escapeHtml(d.title)}</div>
        ${d.quote ? `<div class="f-quote" style="font-size: 4.2%; margin-top:10px;">${escapeHtml(d.quote)}</div>` : ''}
        <div class="f-rule" style="background:${d.palette.accent}"></div>
        <div class="f-meta-row" style="font-size: 4.8%;"><span class="ic">📅</span>${escapeHtml(d.datetime)}</div>
        <div class="f-meta-row" style="font-size: 4.2%; color:${d.palette.accent}; margin-top:4px;"><span class="ic">📍</span>${escapeHtml(d.location)}</div>
        ${d.extra ? `<div class="f-meta-sub" style="font-size: 3.5%; margin-top:8px;">${escapeHtml(d.extra)}</div>` : ''}
      </div>
    </div>`;
}

function tplSeal(d, img){
  return `
    <div style="position:absolute;inset:0;background:${d.palette.bg};display:flex;flex-direction:column;align-items:center;text-align:center;padding:9% 8%;color:#fff;">
      <div class="f-eyebrow" style="color:${d.palette.accent}; font-size: 11px;">${d.palette.eyebrow}</div>
      <img src="${img}" crossorigin="anonymous" class="f-seal-img" style="width:34%;aspect-ratio:1/1;margin-top:14px;color:${d.palette.accent};">
      <div class="f-title" style="font-size: 8%; margin-top:16px;">${escapeHtml(d.title)}</div>
      <div class="f-rule" style="background:${d.palette.accent}"></div>
      ${d.quote ? `<div class="f-quote" style="font-size: 4.5%; margin-bottom:10px;">${escapeHtml(d.quote)}</div>` : ''}
      <div style="margin-top:auto;width:100%;">
        <div class="f-meta-row" style="font-size: 5%; justify-content:center;"><span class="ic">📅</span>${escapeHtml(d.datetime)}</div>
        <div class="f-meta-row" style="font-size: 4.2%; color:${d.palette.accent}; justify-content:center; margin-top:4px;"><span class="ic">📍</span>${escapeHtml(d.location)}</div>
        ${d.extra ? `<div class="f-meta-sub" style="font-size: 3.5%; margin-top:8px;">${escapeHtml(d.extra)}</div>` : ''}
      </div>
    </div>`;
}

function tplRibbon(d, img, grad){
  // ⚡ REDUCCIÓN DE FUENTE: Ajustado el título de la cinta del 6.4vw al 7.5% interno para evitar desbordes
  return `
    <img class="f-bg" src="${img}" crossorigin="anonymous" style="filter:saturate(.85)">
    <div class="f-overlay" style="background:${grad}"></div>
    <div style="position:absolute;top:14%;left:-8%;width:116%;transform:rotate(-4deg);background:${d.palette.accent};padding:4% 0;text-align:center;box-shadow:0 6px 18px rgba(0,0,0,.3); z-index:3;">
      <div style="font-size: 3.5%; font-weight: 700; letter-spacing:2px; color:${d.palette.bg}; text-transform:uppercase;">${d.palette.eyebrow}</div>
      <div class="f-title" style="font-size: 7.5%; color:${d.palette.bg}; text-shadow:none; font-weight:800; margin-top:2px;">${escapeHtml(d.title)}</div>
    </div>
    <div style="position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,.6);padding:6% 8%;color:#fff;z-index:2;">
      ${d.quote ? `<div class="f-quote" style="font-size: 4.2%; margin-bottom:8px;">${escapeHtml(d.quote)}</div>` : ''}
      <div class="f-meta-row" style="font-size: 5.2%;"><span class="ic">📅</span>${escapeHtml(d.datetime)}</div>
      <div class="f-meta-row" style="font-size: 4.2%; color:${d.palette.accent}; margin-top:3px;"><span class="ic">📍</span>${escapeHtml(d.location)}</div>
      ${d.extra ? `<div class="f-meta-sub" style="font-size: 3.5%; margin-top:6px;">${escapeHtml(d.extra)}</div>` : ''}
    </div>`;
}

function tplCollage(d, img1, img2){
  return `
    <div style="position:absolute;inset:0;display:flex;flex-direction:column;">
      <div style="height:46%;position:relative;overflow:hidden;border-bottom:3px solid ${d.palette.accent};">
        <img class="f-bg" src="${img1}" crossorigin="anonymous">
      </div>
      <div style="height:54%;position:relative;overflow:hidden;background:${d.palette.bg};">
        <img class="f-bg" src="${img2}" crossorigin="anonymous" style="opacity:.28;">
        <div style="position:absolute;inset:0;display:flex;flex-direction:column;justify-content:center;padding:6% 8%;color:#fff;">
          <div class="f-eyebrow" style="color:${d.palette.accent}; font-size: 11px;">${d.palette.eyebrow}</div>
          <div class="f-title" style="font-size: 8%; margin-top:6px;">${escapeHtml(d.title)}</div>
          <div class="f-rule" style="background:${d.palette.accent}"></div>
          <div class="f-meta-row" style="font-size: 4.8%;"><span class="ic">📅</span>${escapeHtml(d.datetime)}</div>
          <div class="f-meta-row" style="font-size: 4.2%; color:${d.palette.accent}; margin-top:3px;"><span class="ic">📍</span>${escapeHtml(d.location)}</div>
          ${d.extra ? `<div class="f-meta-sub" style="font-size: 3.5%; margin-top:6px;">${escapeHtml(d.extra)}</div>` : ''}
        </div>
      </div>
    </div>`;
}

const TEMPLATE_NAMES = ['Revista Minimalista','Editorial Lateral','Sello Clásico','Cinta Diagonal','Collage Doble'];

async function buildOption(data, forceTemplateIdx){
  const tplIdx = forceTemplateIdx !== undefined ? forceTemplateIdx : Math.floor(Math.random()*5);
  const grad = GRADIENTS[Math.floor(Math.random()*GRADIENTS.length)](data.palette.bg);
  const aligns = ['left','center','right'];
  const align = aligns[Math.floor(Math.random()*aligns.length)];
  const mirrored = Math.random() > 0.5;

  let html, img1, img2;
  switch(tplIdx){
    case 0:
      img1 = await fetchCategoryPhoto(data.category, 900, 1200);
      html = tplMagazine(data, img1, grad, align);
      break;
    case 1:
      img1 = await fetchCategoryPhoto(data.category, 700, 1200);
      html = tplLateral(data, img1, grad, mirrored);
      break;
    case 2:
      img1 = await fetchCategoryPhoto(data.category, 600, 600);
      html = tplSeal(data, img1);
      break;
    case 3:
      img1 = await fetchCategoryPhoto(data.category, 900, 1200);
      html = tplRibbon(data, img1, grad);
      break;
    case 4:
      [img1, img2] = await Promise.all([
        fetchCategoryPhoto(data.category, 900, 700),
        fetchCategoryPhoto(data.category, 900, 700)
      ]);
      html = tplCollage(data, img1, img2);
      break;
  }
  return { html, templateName: TEMPLATE_NAMES[tplIdx] };
}

async function generateFourOptions(){
  generateBtn.disabled = true;
  generateBtn.textContent = '⏳ Buscando fotos y diseñando...';
  const data = getFormData();
  currentOptions = [];
  
  // Forzamos un renderizado limpio de las opciones mezcladas consecutivamente
  for(let i=0; i<4; i++){
    const opt = await buildOption(data, i % 5);
    currentOptions.push(opt);
  }
  
  renderResults();
  generateBtn.disabled = false;
  generateBtn.textContent = '✨ Generar 4 Diseños Variados';
}

function renderResults(){
  const area = document.getElementById('resultsArea');
  let html = '<div class="grid">';
  currentOptions.forEach((opt, i) => {
    html += `
      <div class="flyer-wrap" data-idx="${i}">
        <div class="tag"><span>Opción ${i+1}</span><span>${opt.templateName}</span></div>
        <div class="flyer-card">${opt.html}</div>
      </div>`;
  });
  html += '</div>';
  area.innerHTML = html;

  area.querySelectorAll('.flyer-wrap').forEach(el => {
    el.addEventListener('click', () => selectOption(parseInt(el.dataset.idx)));
  });

  regenBtn.style.display = 'inline-block';
}

function selectOption(idx){
  selectedIndex = idx;
  document.querySelectorAll('.flyer-wrap').forEach(el => {
    el.classList.toggle('selected', parseInt(el.dataset.idx) === idx);
  });
  const opt = currentOptions[idx];
  const sp = document.getElementById('selectedPanel');
  sp.style.display = 'flex';
  sp.innerHTML = `
    <div class="selected-preview">
      <div class="flyer-card" id="selectedCard">${opt.html}</div>
    </div>
    <div class="selected-actions">
      <h3>Diseño seleccionado: ${opt.templateName}</h3>
      <p>Descárgalo en alta resolución (PNG) listo para compartir en el chat del barrio o imprimir.</p>
      <button class="download-btn" id="downloadBtn">⬇️ Descargar PNG en alta resolución</button>
    </div>`;
  document.getElementById('downloadBtn').addEventListener('click', downloadSelected);
  sp.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function downloadSelected(){
  const card = document.getElementById('selectedCard');
  const btn = document.getElementById('downloadBtn');

  if(typeof html2canvas === 'undefined'){
    btn.textContent = '⚠️ Error en motor html2canvas. Recarga la página.';
    return;
  }

  btn.textContent = 'Generando descarga...';
  btn.disabled = true;
  
  html2canvas(card, { scale: 3, useCORS: true, allowTaint: false }).then(canvas => {
    canvas.toBlob(function(blob){
      if(!blob){
        window.open(canvas.toDataURL('image/png'), '_blank');
        btn.textContent = 'Descargado en pestaña nueva';
        btn.disabled = false;
        return;
      }
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.download = `flyer_barrio_${Date.now()}.png`;
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(url), 4000);

      btn.textContent = '⬇️ Descargar PNG en alta resolución';
      btn.disabled = false;
    }, 'image/png');
  });
}

generateBtn.addEventListener('click', generateFourOptions);
regenBtn.addEventListener('click', generateFourOptions);