document.addEventListener('DOMContentLoaded', function () {
  // small helper for future interactivity
  console.log('DeenSource front-end loaded');
  // Mirror the same Ask form handling in the public copy
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

      msg.textContent = 'Thanks — your question was accepted locally (demo).';
      msg.classList.remove('hidden', 'text-red-600');
      msg.classList.add('text-green-600');

      form.reset();
    });
  }
});
