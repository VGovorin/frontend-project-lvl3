import * as yup from 'yup';
import onChange from 'on-change';
import { setLocale } from 'yup';
import i18next from 'i18next';
import view from './view.js';
import ru from './locales/ru.js';

export default () => {
  const newInstance = i18next.createInstance();
  newInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  });

  setLocale({
    mixed: {
      notOneOf: newInstance.t('errors.invalidUrl'),
    },
    string: {
      url: newInstance.t('errors.invalidUrl'),
    },
  });

  const state = {
    rssForm: {
      uiState: [],
      errors: [],
      urls: [],
      state: 'valid',
    },
  };

  const watchedState = onChange(state, view);

  const validate = (value) => {
    const schema = yup.object().shape({
      url: yup
        .string()
        .url()
        .notOneOf(watchedState.rssForm.urls.map(({ url }) => url)),
    });
    try {
      schema.validateSync(value);
      return null;
    } catch (e) {
      return e.message;
    }
  };

  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.querySelector('#url-input');
    const formData = new FormData(e.target);
    const formUrl = formData.get('url').trim();
    const error = validate({ url: formUrl });
    if (error) {
      watchedState.rssForm.state = 'invalid';
      watchedState.rssForm.errors = error;
    } else {
      form.reset();
      input.focus();
      watchedState.rssForm.errors = [];
      watchedState.rssForm.urls.push({ url: formUrl });
    }
  });
};
