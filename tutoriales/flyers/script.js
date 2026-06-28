// ==========================================================
// 1. BASE DE DATOS Y CONFIGURACIONES GENERALES
// ==========================================================
const KEYWORDS_IGLESIA = {
  "Obra Misional": ["missionary preaching", "young missionary", "bible teaching", "gospel sharing"],
  "Reunion Bautismal": ["baptism water", "sacred ordinance", "spiritual baptism", "water baptism ceremony"],
  "Sociedad de Socorro": ["women service group", "sisterhood unity", "women helping community", "relief society"],
  "Cuorum de Elderes": ["men priesthood", "elders group", "men unity service", "priesthood holders"],
  "Primaria": ["children learning classroom", "happy kids group", "children drawing art", "kids playing together"],
  "Hombres Jovenes": ["young men group", "youth hiking mountain", "teenage boys camping", "youth activity"],
  "Mujeres Jovenes": ["young women smiling", "teenage girls group", "youth girls together", "young women laughing"],
  "Noche Misional": ["open bible reading", "scripture study", "holy book", "gospel study group"],
  "Jas": ["single adults party", "young adults celebration", "social gathering", "friendship group"],
  "Conferencia de Barrio": ["church congregation", "people chapel", "religious gathering", "ward meeting"],
  "Conferencia de Estaca": ["large audience conference", "convention hall", "auditorium meeting", "stake conference"],
  "Actividad de Servicio": ["volunteers community service", "people helping", "charity work", "community helping hands"],
  "Limpieza de la Capilla": ["cleaning tools work", "people cleaning", "chapel maintenance", "service cleaning"],
  "Cumpleaños": ["birthday celebration", "birthday cake", "balloons party", "confetti party"],
  "Aniversario": ["anniversary celebration", "golden ribbons", "elegant event", "gala dinner"],
  "Otros": ["community gathering", "people together", "social event", "celebration group"]
};

const PALETTES = {
  "Obra Misional": {bg:"#1e293b", accent:"#d4af37"},
  "Reunion Bautismal": {bg:"#1a365d", accent:"#3182ce"},
  "Sociedad de Socorro": {bg:"#4a1525", accent:"#ec4899"},
  "Cuorum de Elderes": {bg:"#0f172a", accent:"#3b82f6"},
  "Primaria": {bg:"#1e3a8a", accent:"#eab308"},
  "Hombres Jovenes": {bg:"#064e3b", accent:"#10b981"},
  "Mujeres Jovenes": {bg:"#4c1d95", accent:"#f472b6"},
  "Noche Misional": {bg:"#172554", accent:"#f59e0b"},
  "Jas": {bg:"#3b0764", accent:"#f97316"},
  "Conferencia de Barrio": {bg:"#0f172a", accent:"#64748b"},
  "Conferencia de Estaca": {bg:"#311042", accent:"#ef4444"},
  "Actividad de Servicio": {bg:"#14532d", accent:"#84cc16"},
  "Limpieza de la Capilla": {bg:"#115e59", accent:"#06b6d4"},
  "Cumpleaños": {bg:"#581c87", accent:"#f43f5e"},
  "Aniversario": {bg:"#1e1b4b", accent:"#fbbf24"},
  "Otros": {bg:"#334155", accent:"#94a3b8"},
  "Personalizado": {bg:"#1e293b", accent:"#f97316"}
};

const FONTS_BY_STYLE = {
  solemne: { titles: ["'Cinzel', serif", "'Playfair Display', serif"], body: "'Inter', sans-serif" },
  minimal: { titles: ["'Montserrat', sans-serif"], body: "'Inter', sans-serif" },
  clasico: { titles: ["'Georgia', serif", "'Playfair Display', serif"], body: "'Georgia', serif" },
  vintage: { titles: ["'Courier Prime', monospace", "'Cinzel Decorative', cursive"], body: "'Courier Prime', monospace" },
  moderno: { titles: ["'Bebas Neue', sans-serif", "'Montserrat', sans-serif"], body: "'Inter', sans-serif" },
  collage: { titles: ["'Permanent Marker', cursive", "'Fugaz One', sans-serif"], body: "'Courier Prime', monospace" },
  deportivo:{ titles: ["'Bebas Neue', sans-serif", "'Fugaz One', sans-serif"], body: "'Space Grotesk', sans-serif" },
  loco: { titles: ["'Bangers', cursive", "'Permanent Marker', cursive"], body: "'Space Grotesk', sans-serif" },
  natural: { titles: ["'Montserrat', sans-serif", "'Playfair Display', serif"], body: "'Inter', sans-serif" },
  collegenat:{ titles: ["'Fugaz One', sans-serif", "'Bangers', cursive"], body: "'Space Grotesk', sans-serif" }
};

// Combos completos de tipografía: cada combo define la fuente del TÍTULO y también
// la fuente del CUERPO (fecha, lugar, viñetas, nota), además de un espaciado de letras
// propio. Así, al cambiar de combo, cambia el estilo completo del flyer, no solo el título.
const FONT_COMBOS = [
  { title: "'Cinzel', serif",            body: "'Inter', sans-serif",         letterSpacing: "1px"   },
  { title: "'Playfair Display', serif",  body: "'Georgia', serif",            letterSpacing: "0px"   },
  { title: "'Bebas Neue', sans-serif",    body: "'Montserrat', sans-serif",    letterSpacing: "2px"   },
  { title: "'Bangers', cursive",          body: "'Space Grotesk', sans-serif", letterSpacing: "0.5px" },
  { title: "'Permanent Marker', cursive", body: "'Courier Prime', monospace",  letterSpacing: "0px"   },
  { title: "'Fugaz One', sans-serif",     body: "'Montserrat', sans-serif",    letterSpacing: "0.5px" },
  { title: "'Cinzel Decorative', cursive",body: "'Courier Prime', monospace",  letterSpacing: "1.5px" },
  { title: "'Courier Prime', monospace",  body: "'Courier Prime', monospace",  letterSpacing: "0px"   },
  { title: "'Montserrat', sans-serif",    body: "'Inter', sans-serif",         letterSpacing: "0px"   },
  { title: "'Space Grotesk', sans-serif", body: "'Inter', sans-serif",         letterSpacing: "0.5px" }
];

const STYLE_VISUALS = {
  solemne: { filter: "contrast(1.05) saturate(0.85)", radius: "2px", letterSpacing: "2.5px", uppercase: true, texture: "none" },
  minimal: { filter: "grayscale(.25) contrast(1.12)", radius: "2px", letterSpacing: "0px", uppercase: false, texture: "none" },
  clasico: { filter: "sepia(.2) contrast(1.05)", radius: "3px", letterSpacing: "0.5px", uppercase: false, texture: "frame" },
  vintage: { filter: "sepia(.55) contrast(1.1) brightness(.93)", radius: "2px", letterSpacing: "1px", uppercase: true, texture: "grain" },
  moderno: { filter: "contrast(1.3) saturate(1.35)", radius: "0px", letterSpacing: "-0.5px",uppercase: true, texture: "diagonal" },
  collage: { filter: "saturate(1.45) contrast(1.1)", radius: "10px", letterSpacing: "0px", uppercase: false, texture: "tape" },
  deportivo: { filter: "contrast(1.35) saturate(1.4)", radius: "0px", letterSpacing: "1px", uppercase: true, texture: "speed" },
  loco: { filter: "saturate(1.8) hue-rotate(-4deg)", radius: "26px", letterSpacing: "0px", uppercase: false, texture: "confetti" },
  natural: { filter: "saturate(1.15) brightness(1.04)", radius: "18px", letterSpacing: "0.5px", uppercase: false, texture: "leaf" },
  collegenat:{ filter: "saturate(1.35) contrast(1.08)", radius: "16px", letterSpacing: "0px", uppercase: false, texture: "sticker" }
};

let uploadedPhotos = [];
let currentOptions = [];
let selectedIndex = null;
let lockedPhotos = [false, false, false, false];
let historyOptions = null;

const categorySelect = document.getElementById('flyer-category');
const customTitleField = document.getElementById('customTitleField');
const generateBtn = document.getElementById('generateBtn');
const regenBtn = document.getElementById('regenBtn');
const backBtn = document.getElementById('backBtn');
const photoInput = document.getElementById('photoInput');
const thumbContainer = document.getElementById('thumbContainer');
const clearPhotoBtn = document.getElementById('clearPhoto');

if (categorySelect && customTitleField) {
  categorySelect.addEventListener('change', () => {
    customTitleField.style.display = (categorySelect.value === 'Personalizado') ? 'block' : 'none';
  });
}

if (photoInput) {
  photoInput.setAttribute('multiple', 'true');
  photoInput.addEventListener('change', (e) => {
    uploadedPhotos = [];
    if(thumbContainer) thumbContainer.innerHTML = '';
    const files = Array.from(e.target.files).slice(0, 3);
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = function(evt) {
        uploadedPhotos.push(evt.target.result);
        if(thumbContainer) {
          const img = document.createElement('img');
          img.src = evt.target.result;
          img.style = "width:50px;height:50px;object-fit:cover;border-radius:4px;margin-right:5px;border:1px solid #cbd5e1;";
          thumbContainer.appendChild(img);
        }
      };
      reader.readAsDataURL(file);
    });
    if(clearPhotoBtn) clearPhotoBtn.style.display = 'inline-block';
  });
}

if (clearPhotoBtn) {
  clearPhotoBtn.addEventListener('click', () => {
    uploadedPhotos = [];
    if(photoInput) photoInput.value = '';
    if(thumbContainer) thumbContainer.innerHTML = '';
    clearPhotoBtn.style.display = 'none';
  });
}

// ==========================================================
// 2. COMPONENTES AUXILIARES Y OPCIONALES (CITA Y NOTAS)
// ==========================================================
function getStyleVisual(styleKey){ return STYLE_VISUALS[styleKey] || STYLE_VISUALS.solemne; }
function getFontPack(styleKey){ return FONTS_BY_STYLE[styleKey] || FONTS_BY_STYLE.solemne; }

function pickTitleFont(styleKey, overrideFont = null){
  if (overrideFont) return overrideFont;
  const pack = getFontPack(styleKey);
  return pack.titles[Math.floor(Math.random() * pack.titles.length)];
}

function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

// Cita de escritura/frase: se muestra junto al resto del contenido superior, como antes.
function quoteHtml(data) {
  if(!data.quote) return '';
  return `<div style="font-style:italic; font-size:3.2cqi; margin:1.5cqi auto; max-width:85%; opacity:0.85; line-height:1.2;">"${escapeHtml(data.quote)}"</div>`;
}

// Nota/alerta adicional: SIEMPRE debe ir hasta el final, en la parte más baja del flyer.
// Por eso esta función se llama al final de cada plantilla, después de la fecha/lugar/viñetas.
function alertNoteHtml(data, colorAccent) {
  if(!data.extra) return '';
  return `<div style="font-size:3cqi; font-weight:700; background:rgba(255,255,255,0.15); display:inline-block; padding:0.5cqi 2cqi; border-radius:4px; margin-top:1.5cqi; color:${colorAccent};">⚠️ ${escapeHtml(data.extra)}</div>`;
}

function bulletsHtml(data, color){
  if(!data.bullets || data.bullets.length === 0) return '';
  return `<ul style="margin:1cqi 0 0; padding:0; list-style:none; text-align:inherit; display:inline-block;">
    ${data.bullets.slice(0,4).map(b => `
      <li style="display:flex;align-items:baseline;gap:1cqi;font-size:3.2cqi;font-weight:600;margin-bottom:.5cqi;color:inherit;">
        <span style="color:${color};">✦</span><span>${escapeHtml(b)}</span>
      </li>`).join('')}
  </ul>`;
}

function getTextureOverlay(textureType) {
  switch(textureType) {
    case 'grain': return `<div style="position:absolute;inset:0;opacity:0.07;background-image:radial-gradient(circle, #000 10%, transparent 11%);background-size:4px 4px;pointer-events:none;"></div>`;
    case 'diagonal': return `<div style="position:absolute;inset:0;opacity:0.05;background:linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000);background-size:8px 8px;pointer-events:none;"></div>`;
    case 'frame': return `<div style="position:absolute;inset:2.5cqi;border:1px solid rgba(255,255,255,0.25);pointer-events:none;z-index:5;"></div>`;
    default: return '';
  }
}

function getImg(imgList, index) {
  if (!imgList || imgList.length === 0) return `https://picsum.photos/seed/${Math.random() * 1000}/800/1100`;
  if (imgList.length === 1) return imgList[0];
  if (imgList.length === 2) return imgList[index % 2];
  return imgList[index % 3];
}

// ==========================================================
// 3. CATÁLOGO COMPLETO DE PLANTILLAS
// ==========================================================
function plantillaSolemne(data, imgList, fontOverride = null) {
  const p = data.palette; const sv = getStyleVisual(data.style); const titleFont = fontOverride ? fontOverride.title : pickTitleFont(data.style); const bodyFont = fontOverride ? fontOverride.body : getFontPack(data.style).body; const titleLS = fontOverride ? fontOverride.letterSpacing : '0px';
  return {
    templateName: "Solemne Centrado",
    html: `<div style="position:absolute;inset:0;background:${p.bg};font-family:${bodyFont};color:#fff;padding:5cqi;display:flex;flex-direction:column;justify-content:space-between;box-sizing:border-box;text-align:center;">
      ${getTextureOverlay(sv.texture)}
      <div style="border-bottom:1px solid ${p.accent};padding-bottom:2cqi;">
        <div style="font-family:${titleFont};letter-spacing:${titleLS};font-size:8cqi;color:${p.accent};font-weight:700;${sv.uppercase?'text-transform:uppercase;':''}">${escapeHtml(data.title)}</div>
        ${data.subtitle ? `<div style="font-size:3.5cqi;margin-top:0.5cqi;opacity:0.9;">${escapeHtml(data.subtitle)}</div>` : ''}
      </div>
      <div style="flex:1;display:flex;align-items:center;justify-content:center;margin:2.5cqi 0;overflow:hidden;border-radius:${sv.radius};box-shadow:0 8px 20px rgba(0,0,0,0.3);">
        <img src="${getImg(imgList, 0)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;filter:${sv.filter};">
      </div>
      <div>
        ${quoteHtml(data)}
        <div style="font-size:4cqi;font-weight:700;color:${p.accent};margin-top:1cqi;">📅 ${escapeHtml(data.datetime)}</div>
        <div style="font-size:3.6cqi;margin-top:0.3cqi;opacity:0.95;">📍 ${escapeHtml(data.location)}</div>
        ${bulletsHtml(data, p.accent)}
        ${alertNoteHtml(data, p.accent)}
      </div>
    </div>`
  };
}

function plantillaMinimal(data, imgList, fontOverride = null) {
  const p = data.palette; const sv = getStyleVisual(data.style); const titleFont = fontOverride ? fontOverride.title : pickTitleFont(data.style); const bodyFont = fontOverride ? fontOverride.body : getFontPack(data.style).body; const titleLS = fontOverride ? fontOverride.letterSpacing : '0px';
  return {
    templateName: "Minimalista Asimétrico",
    html: `<div style="position:absolute;inset:0;background:#ffffff;font-family:${bodyFont};color:#1e293b;padding:5cqi;display:flex;flex-direction:column;justify-content:space-between;box-sizing:border-box;">
      <div>
        <div style="font-family:${titleFont};letter-spacing:${titleLS};font-size:8.5cqi;font-weight:800;color:${p.bg};line-height:1.1;margin-bottom:1cqi;">${escapeHtml(data.title)}</div>
        <div style="width:50px;height:4px;background:${p.accent};"></div>
      </div>
      <div style="height:38%;width:100%;overflow:hidden;border-radius:${sv.radius};">
        <img src="${getImg(imgList, 0)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;filter:${sv.filter};">
      </div>
      <div>
        ${quoteHtml(data)}
        <div style="background:${p.bg};color:#fff;padding:3.5cqi;border-radius:6px;margin-top:1.5cqi;">
          <div style="font-size:3.8cqi;font-weight:700;color:${p.accent};">⏰ ${escapeHtml(data.datetime)}</div>
          <div style="font-size:3.5cqi;margin-top:0.3cqi;">📍 ${escapeHtml(data.location)}</div>
          ${bulletsHtml(data, p.accent)}
        </div>
        ${alertNoteHtml(data, p.bg)}
      </div>
    </div>`
  };
}

function plantillaMultiFotoTresCirculos(data, imgList, fontOverride = null) {
  const p = data.palette; const sv = getStyleVisual(data.style); const titleFont = fontOverride ? fontOverride.title : pickTitleFont(data.style); const bodyFont = fontOverride ? fontOverride.body : getFontPack(data.style).body; const titleLS = fontOverride ? fontOverride.letterSpacing : '0px';
  return {
    templateName: "Trilogía de Círculos Simétricos (3 Fotos)",
    html: `<div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 0%, #fff 40%, #f1f5f9 100%);font-family:${bodyFont};padding:5cqi;display:flex;flex-direction:column;justify-content:space-between;align-items:center;box-sizing:border-box;text-align:center;">
      <div style="width:100%;">
        <div style="font-family:${titleFont};letter-spacing:${titleLS};font-size:8.5cqi;font-weight:900;color:${p.bg};text-transform:uppercase;line-height:1;">${escapeHtml(data.title)}</div>
        ${data.subtitle ? `<div style="font-size:3.6cqi;font-weight:700;color:${p.accent};margin-top:0.5cqi;">${escapeHtml(data.subtitle)}</div>` : ''}
      </div>
      <div style="display:flex;justify-content:center;gap:3cqi;width:100%;margin:2cqi 0;">
        <div style="width:24cqi;height:24cqi;border-radius:50%;border:4px solid ${p.accent};box-shadow:0 6px 15px rgba(0,0,0,0.15);overflow:hidden;">
          <img src="${getImg(imgList, 0)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;filter:${sv.filter};">
        </div>
        <div style="width:24cqi;height:24cqi;border-radius:50%;border:4px solid ${p.bg};box-shadow:0 8px 20px rgba(0,0,0,0.2);overflow:hidden;z-index:2;">
          <img src="${getImg(imgList, 1)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;filter:${sv.filter};">
        </div>
        <div style="width:24cqi;height:24cqi;border-radius:50%;border:4px solid ${p.accent};box-shadow:0 6px 15px rgba(0,0,0,0.15);overflow:hidden;">
          <img src="${getImg(imgList, 2)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;filter:${sv.filter};">
        </div>
      </div>
      <div style="width:100%;">
        ${quoteHtml(data)}
        <div style="width:100%;background:${p.bg};color:#fff;border-radius:30px;padding:3.5cqi;box-sizing:border-box;box-shadow:0 8px 20px rgba(0,0,0,0.15);margin-top:1.5cqi;">
          <div style="font-size:3.8cqi;font-weight:700;color:${p.accent};">📅 ${escapeHtml(data.datetime)}</div>
          <div style="font-size:3.6cqi;margin-top:0.3cqi;">📍 ${escapeHtml(data.location)}</div>
          ${bulletsHtml(data, p.accent)}
        </div>
        ${alertNoteHtml(data, p.bg)}
      </div>
    </div>`
  };
}

function plantillaDosCirculosSimetricos(data, imgList, fontOverride = null) {
  const p = data.palette; const sv = getStyleVisual(data.style); const titleFont = fontOverride ? fontOverride.title : pickTitleFont(data.style); const bodyFont = fontOverride ? fontOverride.body : getFontPack(data.style).body; const titleLS = fontOverride ? fontOverride.letterSpacing : '0px';
  return {
    templateName: "Dúo Círculos Simétricos (2 Fotos)",
    html: `<div style="position:absolute;inset:0;background:#ffffff;font-family:${bodyFont};padding:5cqi;display:flex;flex-direction:column;justify-content:space-between;align-items:center;box-sizing:border-box;text-align:center;">
      <div style="width:100%;">
        <div style="font-family:${titleFont};letter-spacing:${titleLS};font-size:8.5cqi;font-weight:900;color:${p.bg};text-transform:uppercase;">${escapeHtml(data.title)}</div>
        <div style="width:60px;height:3px;background:${p.accent};margin:1cqi auto 0;"></div>
      </div>
      <div style="display:flex;justify-content:center;gap:4cqi;width:100%;margin:2cqi 0;">
        <div style="width:30cqi;height:30cqi;border-radius:50%;border:4px solid ${p.bg};box-shadow:0 8px 18px rgba(0,0,0,0.15);overflow:hidden;">
          <img src="${getImg(imgList, 0)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;filter:${sv.filter};">
        </div>
        <div style="width:30cqi;height:30cqi;border-radius:50%;border:4px solid ${p.accent};box-shadow:0 8px 18px rgba(0,0,0,0.15);overflow:hidden;">
          <img src="${getImg(imgList, 1)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;filter:${sv.filter};">
        </div>
      </div>
      <div style="width:100%;">
        ${quoteHtml(data)}
        <div style="width:100%;background:linear-gradient(135deg, ${p.bg} 0%, #1e293b 100%);color:#fff;border-radius:12px;padding:3.5cqi;box-sizing:border-box;margin-top:1cqi;">
          <div style="font-size:3.8cqi;font-weight:700;color:${p.accent};">⏰ ${escapeHtml(data.datetime)}</div>
          <div style="font-size:3.5cqi;margin-top:0.3cqi;opacity:0.95;">📍 ${escapeHtml(data.location)}</div>
          ${bulletsHtml(data, p.accent)}
        </div>
        ${alertNoteHtml(data, p.bg)}
      </div>
    </div>`
  };
}

function plantillaCumpleanosEspecial(data, imgList, fontOverride = null) {
  const titleFont = fontOverride ? fontOverride.title : pickTitleFont(data.style); const bodyFont = fontOverride ? fontOverride.body : getFontPack(data.style).body; const titleLS = fontOverride ? fontOverride.letterSpacing : '0px';
  return {
    templateName: "Celebración Cumpleaños Premium",
    html: `<div style="position:absolute;inset:0;background:radial-gradient(circle, #fdf2f8 0%, #fce7f3 100%);font-family:${bodyFont};padding:5cqi;display:flex;flex-direction:column;justify-content:space-between;align-items:center;box-sizing:border-box;overflow:hidden;text-align:center;">
      <div style="position:absolute;top:2cqi;left:3cqi;font-size:8cqi;opacity:0.8;">🎈</div>
      <div style="position:absolute;top:4cqi;right:4cqi;font-size:8cqi;opacity:0.8;">🎉</div>
      <div>
        <div style="font-family:${titleFont};letter-spacing:${titleLS};font-size:9cqi;font-weight:900;color:#9d174d;line-height:1.1;">🎂 ${escapeHtml(data.title)} 🎂</div>
        ${data.subtitle ? `<div style="font-size:3.8cqi;font-weight:700;color:#db2777;margin-top:0.5cqi;">${escapeHtml(data.subtitle)}</div>` : ''}
      </div>
      <div style="width:44cqi;height:44cqi;border-radius:50%;border:6px dashed #db2777;padding:1cqi;background:#fff;box-shadow:0 10px 22px rgba(219,39,119,0.2);overflow:hidden;">
        <img src="${getImg(imgList, 0)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;border-radius:50%;">
      </div>
      <div style="width:100%;">
        ${quoteHtml(data)}
        <div style="width:100%;background:#fff;border:2px solid #fbcfe8;border-radius:16px;padding:3.5cqi;box-shadow:0 6px 15px rgba(0,0,0,0.05);margin-top:1cqi;">
          <div style="font-size:4cqi;font-weight:800;color:#9d174d;">✨ ¡Acompáñanos a celebrar! ✨</div>
          <div style="font-size:3.5cqi;color:#4c0519;margin-top:1cqi;font-weight:600;">📅 ${escapeHtml(data.datetime)} | 📍 ${escapeHtml(data.location)}</div>
          ${bulletsHtml(data, '#db2777')}
        </div>
        ${alertNoteHtml(data, '#db2777')}
      </div>
    </div>`
  };
}

function plantillaAniversarioEspecial(data, imgList, fontOverride = null) {
  const titleFont = fontOverride ? fontOverride.title : pickTitleFont(data.style); const bodyFont = fontOverride ? fontOverride.body : getFontPack(data.style).body; const titleLS = fontOverride ? fontOverride.letterSpacing : '0px';
  return {
    templateName: "Aniversario de Gala Oro",
    html: `<div style="position:absolute;inset:0;background:#0f172a;border:3px solid #fbbf24;font-family:${bodyFont};color:#fff;padding:5cqi;display:flex;flex-direction:column;justify-content:space-between;align-items:center;box-sizing:border-box;text-align:center;">
      <div style="position:absolute;top:10px;left:10px;width:20px;height:20px;border-top:2px solid #fbbf24;border-left:2px solid #fbbf24;"></div>
      <div style="margin-top:1cqi;">
        <div style="font-family:${titleFont};letter-spacing:${titleLS};font-size:8cqi;font-weight:800;color:#fff;line-height:1.1;text-transform:uppercase;">✨ ${escapeHtml(data.title)} ✨</div>
      </div>
      <div style="display:flex;justify-content:center;position:relative;width:100%;height:32%;margin:1.5cqi 0;">
        <div style="width:28cqi;height:28cqi;border:3px solid #fbbf24;overflow:hidden;transform:rotate(-6deg) translateX(2cqi);box-shadow:0 6px 15px rgba(0,0,0,0.5);z-index:1;">
          <img src="${getImg(imgList, 0)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;">
        </div>
        <div style="width:28cqi;height:28cqi;border:3px solid #fff;overflow:hidden;transform:rotate(6deg) translateX(-2cqi);box-shadow:0 6px 15px rgba(0,0,0,0.5);">
          <img src="${getImg(imgList, 1)}" crossorigin="anonymous" style="width:100%;height:100%;object-fit:cover;">
        </div>
      </div>
      <div style="width:100%;">
        ${quoteHtml(data)}
        <div style="width:100%;background:rgba(255,255,255,0.05);border-top:1px solid #fbbf24;border-bottom:1px solid #fbbf24;padding:3.5cqi;box-sizing:border-box;margin-top:1cqi;">
          <div style="font-size:3.8cqi;font-weight:700;color:#fbbf24;">👑 ${escapeHtml(data.datetime)}</div>
          <div style="font-size:3.5cqi;margin-top:0.3cqi;opacity:0.9;">📍 ${escapeHtml(data.location)}</div>
          ${bulletsHtml(data, '#fbbf24')}
        </div>
        ${alertNoteHtml(data, '#fbbf24')}
      </div>
    </div>`
  };
}

const ALL_TEMPLATES = [
  plantillaSolemne, plantillaMinimal, plantillaMultiFotoTresCirculos,
  plantillaDosCirculosSimetricos, plantillaCumpleanosEspecial, plantillaAniversarioEspecial
];

// ==========================================================
// 4. LOGICA DE FORMULARIO E IMAGENES (API O USER)
// ==========================================================

// Convierte una URL remota (Pexels / picsum.photos) en una imagen Base64 (data:...)
// Esto es CLAVE para que la descarga nunca falle: una vez que la imagen está en
// Base64, ya no es "externa" para el navegador, así que el canvas de html2canvas
// nunca queda "contaminado" (tainted) sin importar si el servidor remoto
// responde bien o mal los encabezados CORS.
async function toDataUri(url) {
  try {
    const res = await fetch(url, { mode: 'cors' });
    if (!res.ok) throw new Error('Respuesta no válida al descargar la imagen: ' + res.status);
    const blob = await res.blob();
    return await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = () => reject(new Error('No se pudo leer la imagen descargada'));
      reader.readAsDataURL(blob);
    });
  } catch (e) {
    console.warn('No se pudo convertir a Base64, se usará la URL directa (puede afectar la descarga):', url, e);
    return url; // Fallback: si falla la conversión, igual se muestra (aunque la descarga podría fallar en ese caso puntual)
  }
}

async function fetchImageIglesia(category, customKeyword = "") {
  if(uploadedPhotos && uploadedPhotos.length > 0) return uploadedPhotos; // Ya son Base64 (vienen de FileReader)

  const pexelsKey = document.getElementById('pexelsKey') ? document.getElementById('pexelsKey').value.trim() : '';
  if(!pexelsKey) {
    const fallback = `https://picsum.photos/seed/${Math.random() * 1000}/800/1100`;
    return [await toDataUri(fallback)];
  }

  let keywordArray = KEYWORDS_IGLESIA[category] || KEYWORDS_IGLESIA["Otros"];
  if(customKeyword && customKeyword.trim()) {
    keywordArray = customKeyword.toLowerCase().split(" ").concat(keywordArray.slice(0, 2));
  }

  let selectedKeyword = keywordArray[Math.floor(Math.random() * keywordArray.length)];
  const finalQuery = `${selectedKeyword} church`;

  try {
    const page = Math.floor(Math.random() * 3) + 1;
    const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(finalQuery)}&per_page=15&page=${page}`, {
      headers: { Authorization: pexelsKey }
    });
    if(!res.ok) {
      const fallback = `https://picsum.photos/seed/${Math.random() * 1000}/800/1100`;
      return [await toDataUri(fallback)];
    }
    const data = await res.json();
    if(!data.photos || data.photos.length === 0) {
      const fallback = `https://picsum.photos/seed/${Math.random() * 1000}/800/1100`;
      return [await toDataUri(fallback)];
    }

    // Solo convertimos las primeras 3 (es lo máximo que usan las plantillas) para no demorar de más
    const urls = data.photos.slice(0, 3).map(p => p.src.large2x || p.src.large);
    return await Promise.all(urls.map(u => toDataUri(u)));
  } catch(e) {
    const fallback = `https://picsum.photos/seed/${Math.random() * 1000}/800/1100`;
    return [await toDataUri(fallback)];
  }
}

function getFormData(){
  const cat = document.getElementById('flyer-category').value;
  const style = document.getElementById('flyer-style').value;
  const titleInput = document.getElementById('flyer-title') ? document.getElementById('flyer-title').value.trim() : '';
  const bulletText = document.getElementById('bullet-points') ? document.getElementById('bullet-points').value : '';
  const bulletsArray = bulletText.split('\n').map(line => line.trim()).filter(line => line !== '');

  return {
    category: cat,
    style: style,
    title: titleInput !== "" ? titleInput : "ACTIVIDAD",
    subtitle: document.getElementById('flyer-subtitle') ? document.getElementById('flyer-subtitle').value.trim() : "",
    quote: document.getElementById('quote') ? document.getElementById('quote').value.trim() : "",
    bullets: bulletsArray,
    datetime: document.getElementById('datetime').value.trim() || 'Por confirmar',
    location: document.getElementById('location').value.trim() || 'Capilla del Barrio',
    extra: document.getElementById('extra') ? document.getElementById('extra').value.trim() : "",
    palette: PALETTES[cat] || PALETTES['Otros']
  };
}

// ==========================================================
// 5. MOTOR DE GENERACIÓN DE 4 OPCIONES (ALEATORIEDAD REAL)
// ==========================================================
async function generateFourOptions() {
  if (generateBtn) { generateBtn.disabled = true; generateBtn.textContent = '✨ Generando paneles...'; }

  const data = getFormData();
  // CORRECCIÓN: la palabra clave personalizada se lee del campo correcto (custom-search-field),
  // antes se leía por error del campo de Título.
  const customSearchEl = document.getElementById('custom-search-field');
  const customKeyword = (customTitleField && customTitleField.style.display !== 'none' && customSearchEl)
    ? customSearchEl.value
    : '';

  if (currentOptions && currentOptions.length > 0) {
    historyOptions = JSON.parse(JSON.stringify(currentOptions));
    if (backBtn) backBtn.style.display = 'inline-block';
  }

  const newOptions = [];
  const totalTemplates = ALL_TEMPLATES.length;

  // ANTES: cada una de las 4 opciones elegía su plantilla al azar de forma INDEPENDIENTE,
  // así que era pura suerte que no se repitieran (con solo 4 plantillas genéricas disponibles,
  // repetirse era muy probable). AHORA: se baraja el orden de las 4 plantillas genéricas una
  // sola vez y se reparte una distinta a cada opción, garantizando 4 diseños diferentes.
  const genericTemplateOrder = [0, 1, 2, 3];
  for (let i = genericTemplateOrder.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [genericTemplateOrder[i], genericTemplateOrder[j]] = [genericTemplateOrder[j], genericTemplateOrder[i]];
  }

  for (let i = 0; i < 4; i++) {
    let imgList;
    if (lockedPhotos[i] && currentOptions[i]) {
      imgList = currentOptions[i].imgList;
    } else {
      imgList = await fetchImageIglesia(data.category, customKeyword);
    }

    // Cada opción recibe una plantilla distinta del orden ya barajado
    let chosenIndex = genericTemplateOrder[i];
    if (data.category === 'Cumpleaños') chosenIndex = 4; // Forzar plantilla especial cumpleaños
    if (data.category === 'Aniversario') chosenIndex = 5; // Forzar plantilla especial aniversario

    const renderObj = ALL_TEMPLATES[chosenIndex](data, imgList);

    newOptions.push({
      html: renderObj.html,
      imgList: imgList,
      templateName: renderObj.templateName,
      variantIndex: chosenIndex,
      currentFontIndex: 0 // Rastreador para el mezclador de fuentes
    });
  }

  currentOptions = newOptions;
  selectedIndex = null;
  const editPanel = document.getElementById('edit-panel');
  if (editPanel) editPanel.style.display = 'none';

  renderResults();
  if (generateBtn) { generateBtn.disabled = false; generateBtn.textContent = '✨ Generar 4 Variaciones de Estilo'; }
}

// ==========================================================
// 6. RENDERIZACIÓN DE INTERFAZ Y BOTONES DE CANDADO
// ==========================================================
function renderResults(){
  const area = document.getElementById('resultsArea');
  if(!area) return;

  let html = '<div class="grid">';
  currentOptions.forEach((opt, i) => {
    const lockClass = lockedPhotos[i] ? 'btn-lock locked' : 'btn-lock';
    const selectedClass = (selectedIndex === i) ? ' selected' : '';
    html += `
      <div class="flyer-wrap${selectedClass}" data-idx="${i}" id="wrap-${i}">
        <div class="tag">
          <span>Opción ${i+1}</span>
          <span>${opt.templateName}</span>
          <button class="${lockClass}" data-idx="${i}">${lockedPhotos[i] ? '🔒' : '🔓'}</button>
        </div>
        <div class="flyer-card">${opt.html}</div>
      </div>`;
  });
  html += '</div>';
  area.innerHTML = html;

  area.querySelectorAll('.flyer-wrap').forEach(el => {
    el.addEventListener('click', () => { selectOption(parseInt(el.dataset.idx)); });
  });

  area.querySelectorAll('.btn-lock').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.dataset.idx);
      lockedPhotos[idx] = !lockedPhotos[idx];
      btn.textContent = lockedPhotos[idx] ? '🔒' : '🔓';
      btn.classList.toggle('locked');
      e.stopPropagation();
    });
  });

  if (currentOptions.length > 0 && regenBtn) {
    regenBtn.style.display = 'inline-block';
  }
}

// ==========================================================
// 7. SELECCIÓN DE OPCIÓN, CAMBIO DE TIPOGRAFÍA Y PANEL DE EDICIÓN
//    (Esta sección era la que faltaba: por eso desaparecían los botones)
// ==========================================================
function selectOption(idx) {
  selectedIndex = idx;

  document.querySelectorAll('.flyer-wrap').forEach((el) => {
    const elIdx = parseInt(el.dataset.idx);
    el.classList.toggle('selected', elIdx === idx);
  });

  renderEditPanel();
}

function renderEditPanel() {
  const panel = document.getElementById('edit-panel');
  if (!panel || selectedIndex === null) return;

  const opt = currentOptions[selectedIndex];
  if (!opt) return;

  panel.style.display = 'flex';
  panel.innerHTML = `
    <div class="selected-preview">
      <div class="flyer-card" id="downloadTarget">${opt.html}</div>
    </div>
    <div class="selected-actions">
      <h3>✅ Opción ${selectedIndex + 1} seleccionada</h3>
      <p>Plantilla: <strong>${opt.templateName}</strong>. Puedes probar otra tipografía para este diseño o descargar el flyer en buena calidad.</p>
      <button class="style-btn" id="changeFontBtn">🔤 Cambiar Tipografía</button>
      <button class="download-btn" id="downloadBtn">⬇️ Descargar Flyer (PNG)</button>
    </div>
  `;

  const fontBtn = document.getElementById('changeFontBtn');
  if (fontBtn) {
    fontBtn.addEventListener('click', () => changeFont(selectedIndex));
  }

  const downloadBtn = document.getElementById('downloadBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => downloadFlyer());
  }
}

function changeFont(idx) {
  try {
    const opt = currentOptions[idx];
    if (!opt) return;

    const data = getFormData();

    // Cicla por los 10 combos completos (título + cuerpo + espaciado)
    const totalCombos = FONT_COMBOS.length;
    opt.currentFontIndex = (opt.currentFontIndex + 1) % totalCombos;
    const combo = FONT_COMBOS[opt.currentFontIndex];

    const renderObj = ALL_TEMPLATES[opt.variantIndex](data, opt.imgList, combo);
    opt.html = renderObj.html;

    // Vuelve a pintar la cuadrícula completa (para que la miniatura también se actualice)
    // y luego repinta el panel de edición sobre la opción ya seleccionada.
    renderResults();
    renderEditPanel();

    // Feedback visible: confirma en el propio botón que el cambio sí ocurrió
    const fontNameClean = combo.title.split(',')[0].replace(/['"]/g, '');
    const fontBtn = document.getElementById('changeFontBtn');
    if (fontBtn) {
      fontBtn.textContent = `🔤 Tipografía: ${fontNameClean} (clic para cambiar otra vez)`;
    }
  } catch (err) {
    console.error('Error al cambiar la tipografía:', err);
    alert('Ocurrió un error al cambiar la tipografía. Revisa la consola del navegador (F12) para más detalles.');
  }
}

// ==========================================================
// 8. DESCARGA DEL FLYER (html2canvas) - CORS CORREGIDO
// ==========================================================
async function downloadFlyer() {
  const downloadBtn = document.getElementById('downloadBtn');
  const target = document.getElementById('downloadTarget');
  if (!target) return;

  if (typeof html2canvas === 'undefined') {
    alert('No se pudo cargar la librería de descarga (html2canvas). Verifica tu conexión a internet y vuelve a intentarlo.');
    return;
  }

  if (downloadBtn) { downloadBtn.disabled = true; downloadBtn.textContent = '⏳ Generando imagen...'; }

  try {
    // Espera a que las tipografías terminen de cargar antes de capturar,
    // si no, html2canvas puede capturar con la fuente equivocada o en blanco.
    if (document.fonts && document.fonts.ready) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(target, {
      useCORS: true,       // Como las fotos ya están en Base64 (ver fetchImageIglesia/toDataUri), esto ya no genera bloqueo
      allowTaint: false,   // IMPORTANTE: con true, el canvas queda "contaminado" y el navegador bloquea toda exportación.
                            // Esa era la causa real del error de descarga. Con las imágenes ya en Base64, no se necesita allowTaint.
      backgroundColor: null,
      scale: 3,            // Mayor resolución para impresión
      width: target.offsetWidth,
      height: target.offsetHeight
    });

    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('El canvas no generó una imagen (posiblemente bloqueado por seguridad del navegador).');
      }

      const data = getFormData();
      const safeTitle = (data.title || 'flyer').toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // quita acentos
        .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 40);

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `flyer-${safeTitle || 'actividad'}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 4000);

      if (downloadBtn) { downloadBtn.disabled = false; downloadBtn.textContent = '⬇️ Descargar Flyer (PNG)'; }
    }, 'image/png');

  } catch (err) {
    console.error('Error al generar el flyer. Detalle técnico completo:', err);
    const detalle = (err && err.message) ? err.message : 'Error desconocido';
    alert('No se pudo descargar el flyer.\n\nDetalle técnico (cópialo y compártelo si el problema sigue):\n' + detalle + '\n\nAbre la consola del navegador con F12 para ver más información.');
    if (downloadBtn) { downloadBtn.disabled = false; downloadBtn.textContent = '⬇️ Descargar Flyer (PNG)'; }
  }
}

// ==========================================================
// 9. LISTENERS PRINCIPALES: GENERAR / REGENERAR / HISTORIAL
//    (generateBtn no tenía listener antes: por eso nada pasaba al hacer clic
//     después de que algo rompiera el flujo)
// ==========================================================
if (generateBtn) {
  generateBtn.addEventListener('click', () => {
    generateFourOptions();
  });
}

if (regenBtn) {
  regenBtn.addEventListener('click', () => {
    generateFourOptions();
  });
}

if (backBtn) {
  backBtn.addEventListener('click', () => {
    if (historyOptions) {
      currentOptions = historyOptions;
      historyOptions = null;
      backBtn.style.display = 'none';
      selectedIndex = null;
      const panel = document.getElementById('edit-panel');
      if (panel) panel.style.display = 'none';
      renderResults();
    }
  });
}
