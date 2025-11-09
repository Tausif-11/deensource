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
  form.addEventListener('submit', async function (e) {
      e.preventDefault();
      const contact = (document.getElementById('contact') || {}).value || '';
      const body = (document.getElementById('body') || {}).value || '';
      const msg = document.getElementById('form-message');

      // simple validation
      const errors = [];
      if (!contact.trim()) errors.push('Please enter your Instagram ID or email.');
      if (!body.trim()) errors.push('Please provide your question.');

      if (errors.length) {
        msg.innerHTML = errors.map(e => `<div>${e}</div>`).join('');
        msg.classList.remove('hidden');
        msg.classList.remove('text-green-600');
        msg.classList.add('text-red-600');
        return;
      }

      // Attempt to POST to /api/ask (Vercel function). Fallback to local demo if network fails.
      const payload = { contact, question: body };
      try {
        const response = await fetch('/api/ask', {
          method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
        });
        if (!response.ok) throw new Error('network');
        const json = await response.json();
        msg.innerHTML = `<strong>Thank you.</strong> Your question was received (demo). Message id: ${json.payload && json.payload.id ? json.payload.id : ''}. You will get your answer through email or Instagram DM.`;
        // Optionally update local UI or push the new question into responses grid if desired
      } catch (err) {
        // fallback message
        msg.innerHTML = '<strong>Thank you.</strong> You will get your answer through email or Instagram DM. (demo fallback)';
      }

      msg.classList.remove('hidden');
      msg.classList.remove('text-red-600');
      msg.classList.add('text-green-400');
      msg.classList.add('fade');
      form.reset();
      // keep the message visible for a few seconds then fade
      setTimeout(() => {
        msg.classList.add('opacity-0');
        setTimeout(() => msg.classList.add('hidden'), 400);
      }, 5000);
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

  // Response page: load responses.json, render cards, filters and search
  async function loadResponses() {
    const grid = document.getElementById('responses-grid');
    const search = document.getElementById('search');
    const filter = document.getElementById('topic-filter');
    if (!grid) return;
    try {
      const res = await fetch('/data/responses.json');
      const data = await res.json();
      let items = data;

      // populate filter options
      const topics = Array.from(new Set(data.map(d => d.topic)));
      topics.forEach(t => {
        const opt = document.createElement('option'); opt.value = t; opt.textContent = t; filter.appendChild(opt);
      });

      function render(list) {
        grid.innerHTML = '';
        if (!list.length) {
          grid.innerHTML = '<div class="text-gray-400">No responses found.</div>';
          return;
        }
        list.forEach(item => {
          const el = document.createElement('article');
          el.className = 'card-dark';
          el.innerHTML = `<h3 class="font-semibold text-white">${item.question}</h3><div class="mt-3 text-gray-300">${item.answer}</div><div class="mt-4 text-xs text-gray-400">Topic: ${item.topic}</div>`;
          grid.appendChild(el);
        });
      }

      render(items);

      // live search
      search.addEventListener('input', function () {
        const q = this.value.toLowerCase();
        const topic = filter.value;
        const filtered = data.filter(d => (topic === 'all' || d.topic === topic) && (d.question.toLowerCase().includes(q) || d.answer.toLowerCase().includes(q)));
        render(filtered);
      });

      filter.addEventListener('change', function () {
        const q = search.value.toLowerCase();
        const topic = this.value;
        const filtered = data.filter(d => (topic === 'all' || d.topic === topic) && (d.question.toLowerCase().includes(q) || d.answer.toLowerCase().includes(q)));
        render(filtered);
      });

    } catch (e) {
      console.warn('Failed to load responses.json', e);
    }
  }

  loadResponses();

  // Scroll-to-top button
  const scrollBtn = document.getElementById('scroll-top');
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) scrollBtn.classList.remove('hidden'); else scrollBtn.classList.add('hidden');
    });
    scrollBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }
});
