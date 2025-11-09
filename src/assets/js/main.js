document.addEventListener('DOMContentLoaded', function () {
  // small helper for future interactivity
  console.log('DeenSource front-end loaded');

  // Ask form handling
  const form = document.getElementById('ask-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const title = document.getElementById('title').value.trim();
      const body = document.getElementById('body').value.trim();
      const category = document.getElementById('category').value;
      const msg = document.getElementById('form-message');

      if (!title) {
        msg.textContent = 'Please enter a title for your question.';
        msg.classList.remove('hidden', 'text-green-600');
        msg.classList.add('text-red-600');
        return;
      }

      // Simulate submission — in a real app, send fetch() to a backend.
      msg.textContent = 'Thanks — your question was accepted locally (demo).';
      msg.classList.remove('hidden', 'text-red-600');
      msg.classList.add('text-green-600');

      // Clear form fields (optional)
      form.reset();
    });
  }
});
