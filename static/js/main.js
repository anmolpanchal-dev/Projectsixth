// ===== NAV TOGGLE =====
function toggleNav() {
  document.querySelector('.nav-links').classList.toggle('open');
}

// ===== SLIDER <-> INPUT SYNC =====
function syncInput(fieldId, val) {
  const input = document.getElementById(fieldId);
  if (input) input.value = parseFloat(val).toFixed(1);
}

function updateSlider(sliderId, val) {
  const slider = document.getElementById(sliderId);
  if (slider && val !== '') slider.value = parseFloat(val);
}

// ===== PRESET LOADER =====
function loadPreset(sl, sw, pl, pw) {
  const fields = {
    sepal_length: { val: sl, slider: 'sl' },
    sepal_width:  { val: sw, slider: 'sw' },
    petal_length: { val: pl, slider: 'pl' },
    petal_width:  { val: pw, slider: 'pw' },
  };
  Object.entries(fields).forEach(([id, { val, slider }]) => {
    const input = document.getElementById(id);
    const s = document.getElementById(slider);
    if (input) input.value = val.toFixed(1);
    if (s) s.value = val;
  });
  // Highlight effect
  document.querySelectorAll('.input-wrap input').forEach(inp => {
    inp.style.borderColor = 'var(--accent)';
    setTimeout(() => inp.style.borderColor = '', 800);
  });
}

// ===== CLEAR FORM =====
function clearForm() {
  const form = document.getElementById('predictForm');
  if (form) {
    form.reset();
    document.querySelectorAll('.slider').forEach(s => {
      const mid = (parseFloat(s.min) + parseFloat(s.max)) / 2;
      s.value = mid.toFixed(1);
    });
  }
}

// ===== FORM SUBMIT LOADING =====
const form = document.getElementById('predictForm');
if (form) {
  form.addEventListener('submit', () => {
    const btn = document.getElementById('submitBtn');
    if (btn) {
      btn.querySelector('.btn-text').style.display = 'none';
      btn.querySelector('.btn-loading').style.display = 'inline';
      btn.disabled = true;
    }
  });
}

// ===== SCROLL OBSERVER =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.animate-slide, .species-card, .about-card, .ds-card, .stack-item').forEach(el => {
  el.style.animationPlayState = 'paused';
  observer.observe(el);
});