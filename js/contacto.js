// Formulario de cotización, cita y mensaje (sin servidor: usa WhatsApp, correo y calendario)
const CFG = window.IAP_CONFIG || {};
const $ = id => document.getElementById(id);
const num = (CFG.whatsapp || '').replace(/\D/g, '');
const esCita = () => $('tipo').value === 'Cita';

function alternarCita() {
  document.querySelectorAll('.cita').forEach(el => el.hidden = !esCita());
  $('fecha').required = $('hora').required = esCita();
}
$('tipo').addEventListener('change', alternarCita);
$('fecha').min = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 10);
alternarCita();

function aviso(texto, ok) { $('estado').textContent = texto; $('estado').className = 'nota ' + (ok ? 'ok' : 'error'); }
function validar() {
  const f = $('form-contacto');
  if (f.checkValidity()) return true;
  f.reportValidity();
  return false;
}
function mensaje() {
  const l = ['Hola INDUANDES PERÚ, soy ' + $('nombre').value.trim() + '.', 'Solicitud: ' + $('tipo').value, 'Servicio: ' + $('servicio').value];
  if (esCita()) l.push('Cita propuesta: ' + $('fecha').value + ' a las ' + $('hora').value + ' (sujeta a confirmación)');
  l.push('Contacto: ' + $('contacto').value.trim(), 'Mensaje: ' + $('mensaje').value.trim());
  return l.join('\n');
}

$('btn-wa').addEventListener('click', () => {
  if (!validar()) return;
  if (!num) return aviso('Falta configurar el número de WhatsApp en js/config.js.', false);
  open('https://wa.me/' + num + '?text=' + encodeURIComponent(mensaje()), '_blank', 'noopener');
  aviso('Se abrió WhatsApp con tu mensaje listo para enviar.', true);
});

$('btn-mail').addEventListener('click', () => {
  if (!validar()) return;
  if (!CFG.email) return aviso('Falta configurar el correo en js/config.js.', false);
  location.href = 'mailto:' + CFG.email + '?subject=' + encodeURIComponent($('tipo').value + ' - ' + $('servicio').value) + '&body=' + encodeURIComponent(mensaje());
  aviso('Se abrió tu programa de correo con el mensaje listo.', true);
});

// Recordatorio de la cita en formato .ics (Google Calendar, Outlook, iPhone)
const p2 = n => String(n).padStart(2, '0');
const fmt = d => d.getFullYear() + p2(d.getMonth() + 1) + p2(d.getDate()) + 'T' + p2(d.getHours()) + p2(d.getMinutes()) + '00';
const esc = t => t.replace(/\\/g, '\\\\').replace(/,/g, '\\,').replace(/;/g, '\\;').replace(/\n/g, '\\n');
$('btn-ics').addEventListener('click', () => {
  if (!validar()) return;
  const ini = new Date($('fecha').value + 'T' + $('hora').value), fin = new Date(ini.getTime() + 3600000);
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//INDUANDES PERU//Citas//ES', 'BEGIN:VEVENT',
    'UID:' + Date.now() + '@induandes', 'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z',
    'DTSTART:' + fmt(ini), 'DTEND:' + fmt(fin), 'SUMMARY:' + esc('Cita con INDUANDES PERÚ - ' + $('servicio').value),
    'DESCRIPTION:' + esc(mensaje()), 'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' }));
  a.download = 'cita-induandes.ics';
  a.click();
  URL.revokeObjectURL(a.href);
  aviso('Recordatorio descargado. Ábrelo para agregarlo a tu calendario.', true);
});

// Botones "Cotizar" de cada servicio
document.querySelectorAll('[data-servicio]').forEach(b => b.addEventListener('click', () => {
  $('tipo').value = 'Cotización';
  $('servicio').value = b.dataset.servicio;
  alternarCita();
  $('form-contacto').scrollIntoView({ behavior: 'smooth' });
  $('nombre').focus({ preventScroll: true });
}));

// Redes sociales y botón flotante de WhatsApp (solo si están configurados)
const redes = Object.entries(CFG.redes || {}).filter(([, url]) => url);
$('redes').innerHTML = redes.map(([n, u]) => '<a href="' + u + '" target="_blank" rel="noopener">' + n + '</a>').join(' · ');
if (num) { $('wa-flotante').href = 'https://wa.me/' + num; $('wa-flotante').hidden = false; }
