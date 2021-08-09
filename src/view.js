const watchedState = (path, value) => {
  const input = document.querySelector('#url-input');
  if (value === 'invalid') {
    input.classList.add('is-invalid');
  }
  if (path === 'rssForm.urls') {
    input.classList.remove('is-invalid');
  }
};

export default watchedState;
