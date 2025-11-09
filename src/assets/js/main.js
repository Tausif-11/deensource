document.addEventListener('DOMContentLoaded', function () {
  // DeenSource front-end loader
  // 1) Load shared HTML includes (navbar/footer)
  // 2) Wire mobile menu toggle
  // 3) Wire Ask form validation and simulated submit

  async function loadIncludes() {
    const includes = document.querySelectorAll('[data-include]');
    for (const el of includes) {
      const src = el.getAttribute('data-include');
      if (!src) continue;
      try {
        // Try absolute includes path first (works on deployed public root)
        let res = await fetch(src);
        if (!res.ok) {
          // fallback to relative path
          res = await fetch(src.replace(/^\//, ''));
        }
        if (res.ok) {
          el.innerHTML = await res.text();
        }
      } catch (e) {
        // silently ignore — pages will still render without includes
        console.warn('Include load failed for', src);
      }
    }

    // After includes loaded, wire mobile menu (navbar lives inside include)
    const menuBtn = document.getElementById('mobile-menu-btn');
    const menuPane = document.getElementById('mobile-menu');
    if (menuBtn && menuPane) {
      menuBtn.addEventListener('click', function () {
        menuPane.classList.toggle('hidden');
      });
    }
  }

  loadIncludes();

  // Ask form handling (Name, Email, Question)
  const form = document.getElementById('ask-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = (document.getElementById('name') || {}).value || '';
      const email = (document.getElementById('email') || {}).value || '';
      const title = (document.getElementById('title') || {}).value || '';
      const body = (document.getElementById('body') || {}).value || '';
      const msg = document.getElementById('form-message');

      // simple validation
      const errors = [];
      if (!name.trim()) errors.push('Please enter your name.');
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) errors.push('Please enter a valid email.');
      if (!title.trim()) errors.push('Please enter a short title for your question.');
      if (!body.trim()) errors.push('Please provide details for your question.');

      if (errors.length) {
        msg.innerHTML = errors.map(e => `<div>${e}</div>`).join('');
        msg.classList.remove('hidden');
        msg.classList.remove('text-green-600');
        msg.classList.add('text-red-600');
        return;
      }

      // simulate async submit
      msg.textContent = 'Thanks — your question was accepted locally (demo).';
      msg.classList.remove('hidden');
      msg.classList.remove('text-red-600');
      msg.classList.add('text-green-600');
      form.reset();
    });
  }

  // Minimal UX: remove messages if user edits fields
  document.addEventListener('input', function (e) {
    const msg = document.getElementById('form-message');
    if (!msg) return;
    if (!msg.classList.contains('hidden')) {
      msg.classList.add('hidden');
    }
  });
});
