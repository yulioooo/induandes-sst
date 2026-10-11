// Barra de progreso de lectura
const prog = document.getElementById('progreso');
addEventListener('scroll', () => {
  const h = document.documentElement;
  prog.style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100 + '%';
}, { passive: true });

// Contadores animados del hero
document.querySelectorAll('[data-n]').forEach(el => {
  const meta = +el.dataset.n, ini = performance.now(), dur = 1400;
  const paso = t => {
    const p = Math.min((t - ini) / dur, 1);
    el.textContent = Math.round(meta * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(paso);
  };
  requestAnimationFrame(paso);
});

// Revelado al hacer scroll y llenado de barras de indicadores
document.querySelectorAll('main section').forEach(s => s.classList.add('reveal'));
const obs = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('ver');
    e.target.querySelectorAll('[data-w]').forEach(b => b.style.width = b.dataset.w + '%');
    obs.unobserve(e.target);
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(s => obs.observe(s));

// Enlace activo en el menú
const enlaces = document.querySelectorAll('.nav a');
const secs = [...document.querySelectorAll('main section[id]')];
addEventListener('scroll', () => {
  const y = scrollY + 120;
  const act = secs.filter(s => s.offsetTop <= y).pop();
  enlaces.forEach(a => a.classList.toggle('on', act && a.hash === '#' + act.id));
}, { passive: true });

// Pestañas de los ATS
document.querySelectorAll('.tabs button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tabs button, .panel').forEach(x => x.classList.remove('on'));
    btn.classList.add('on');
    document.getElementById(btn.dataset.t).classList.add('on');
  });
});

// Checklist de la carpeta SUNAFIL
const casillas = document.querySelectorAll('.checks input');
const avance = document.getElementById('avance');
const avTxt = document.getElementById('avTxt');
casillas.forEach(c => c.addEventListener('change', () => {
  const n = [...casillas].filter(x => x.checked).length;
  avance.style.width = (n / casillas.length) * 100 + '%';
  avTxt.textContent = n === casillas.length
    ? 'Carpeta completa: lista para fiscalización'
    : n + ' de ' + casillas.length + ' bloques listos';
}));

// Botón para volver arriba
const subir = document.querySelector('.subir');
addEventListener('scroll', () => subir.classList.toggle('on', scrollY > 700), { passive: true });
