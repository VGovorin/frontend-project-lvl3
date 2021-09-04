import * as yup from 'yup';
import onChange from 'on-change';
import i18next from 'i18next';
import _ from 'lodash';
import view from './view.js';
import ru from './locales/ru.js';
import getData from './getData.js';
import parser from './parser.js';
import updatePosts from './updatePosts.js';

export default () => {
  const newInstance = i18next.createInstance();
  newInstance.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  });

  yup.setLocale({
    mixed: {
      notOneOf: newInstance.t('errors.repetingUrls'),
    },
    string: {
      url: newInstance.t('errors.invalidUrl'),
    },
  });

  const state = {
    rssForm: {
      processState: 'filling',
      errors: [],
      rssData: {
        feeds: [],
        posts: [],
      },
      urls: [],
      state: 'valid',
    },
  };

  const watchedState = onChange(state, view(newInstance));

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
    } catch (error) {
      return error.message;
    }
  };

  const form = document.querySelector('form');
  form.addEventListener('submit', (eventSubmit) => {
    eventSubmit.preventDefault();
    const input = document.querySelector('#url-input');
    watchedState.rssForm.processState = 'sending';
    const formData = new FormData(eventSubmit.target);
    const formUrl = formData.get('url').trim();
    const error = validate({ url: formUrl });
    if (error) {
      watchedState.rssForm.processState = 'filling';
      watchedState.rssForm.state = 'invalid';
      watchedState.rssForm.errors = error;
    } else {
      form.reset();
      input.focus();
      const id = _.uniqueId();
      watchedState.rssForm.errors = [];
      getData(formUrl)
        .then((response) => {
          const { contents } = response.data;
          try {
            const data = parser(contents);
            watchedState.rssForm.urls.push({ url: formUrl, id });
            const { titleFeeds, descriptionFeeds } = data;
            const { posts } = data;
            const listPostById = posts.map(({ link, title, description }) => ({
              id, link, title, description,
            }));
            const newListPosts = listPostById.concat(watchedState.rssForm.rssData.posts);
            watchedState.rssForm.rssData.posts = newListPosts;
            watchedState.rssForm.rssData.feeds.unshift({
              id,
              titleFeeds,
              descriptionFeeds,
            });
            watchedState.rssForm.processState = 'filling';
            watchedState.rssForm.state = 'valid';
            updatePosts(watchedState);
          } catch {
            watchedState.rssForm.state = 'invalid';
            watchedState.rssForm.errors = newInstance.t('urlNotContainValidRss');
            watchedState.rssForm.processState = 'filling';
          }
        })
        .catch((e) => {
          if (e.networkError) {
            watchedState.rssForm.errors = newInstance.t('errors.networkError');
          }
        })
        .finally(() => {
          watchedState.rssForm.processState = 'filling';
        });
    }
  });
};
