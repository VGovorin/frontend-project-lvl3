const watchedState = (path, value) => {
  const errorMessage = document.querySelector('#error-message');
  const input = document.querySelector('#url-input');
  errorMessage.textContent = '';
  if (value === 'invalid') {
    input.classList.add('is-invalid');
  }
  if (path === 'rssForm.urls') {
    input.classList.remove('is-invalid');
  }
  if (path === 'rssForm.errors') {
    errorMessage.textContent = value;
  }
};

export default watchedState;
