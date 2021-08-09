import * as yup from 'yup';
import onChange from 'on-change';
import view from './view.js';

const schema = yup.string().trim().required().url();

export default () => {
  const state = {
    rssForm: {
      uiState: [],
      errors: [],
      urls: [],
      state: 'valid',
    },
  };

  const watchedState = onChange(state, view);

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#url-input');
    const formData = new FormData(e.target);
    const url = formData.get('url').trim();
    if (watchedState.rssForm.urls.includes(url)) {
      watchedState.rssForm.state = 'invalid';
    } else {
      schema
        .validate(url)
        .then((data) => {
          form.reset();
          input.focus();
          watchedState.rssForm.urls.push(data);
          watchedState.rssForm.state = 'valid';
        })
        .catch((err) => {
          watchedState.rssForm.errors = err;
          watchedState.rssForm.state = 'invalid';
        });
    }
  });
};
