async function checkHealth() {
  const el = document.getElementById('health-indicator');
  try {
    const res = await fetch('/health');
    const data = await res.json();
    el.textContent = data.status === 'ok' ? 'OK' : 'Unknown';
    el.classList.remove('text-danger');
    el.classList.add('text-success');
  } catch (e) {
    el.textContent = 'Unavailable';
    el.classList.remove('text-success');
    el.classList.add('text-danger');
  }
}

async function debugTemplates() {
  const fld = document.getElementById('tpl-folder');
  const files = document.getElementById('tpl-files');
  try {
    const res = await fetch('/debug/templates');
    const data = await res.json();
    fld.textContent = data.template_folder || 'n/a';
    files.textContent = Array.isArray(data.files) ? data.files.join(', ') : 'n/a';
  } catch (e) {
    fld.textContent = 'n/a';
    files.textContent = 'n/a';
  }
}

function demoPredict() {
  const form = document.getElementById('predict-form');
  const valueEl = document.getElementById('predict-value');
  const fd = new FormData(form);
  const obj = Object.fromEntries(fd.entries());

  const temperature = parseFloat(obj.temperature) || 0;
  const rh = parseFloat(obj.rh) || 0;
  const ws = parseFloat(obj.ws) || 0;
  const rain = parseFloat(obj.rain) || 0;
  const ffmc = parseFloat(obj.ffmc) || 0;
  const dmc = parseFloat(obj.dmc) || 0;
  const isi = parseFloat(obj.isi) || 0;

  // Simple placeholder: scaled combination to resemble a single output
  let score = 0.5 * temperature + 0.3 * ws + 0.15 * ffmc + 0.1 * dmc + 0.12 * isi - 0.3 * (rh / 100) - 0.4 * rain;
  score = Math.max(0, score);
  valueEl.textContent = score.toFixed(6);
}

window.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('predict-btn');
  if (btn) btn.addEventListener('click', demoPredict);
});
