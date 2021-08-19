import _ from 'lodash';
import parser from './parser.js';
import getData from './getData.js';

export default (watchedState) => {
  setTimeout(function iter() {
    watchedState.rssForm.urls.forEach(({ url, id }) => {
      const currentLinkById = watchedState.rssForm.rssData.posts
        .filter((el) => el.id === id)
        .map((el) => el.link);
      getData(url)
        .then((response) => {
          const parsed = parser(response.data.contents);
          const newPosts = parsed.posts.filter((post) => !currentLinkById.includes(post.link));
          if (!_.isEmpty(newPosts)) {
            const newPostsById = newPosts.map(({ link, title }) => ({ id, link, title }));
            newPostsById.forEach((item) => watchedState.rssForm.rssData.posts.unshift(item));
          }
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
    setTimeout(iter, 5000);
  }, 5000);
};
