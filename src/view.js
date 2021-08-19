const watchedState = (newInstance) => (path, value) => {
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
  if (path === 'rssForm.rssData.feeds') {
    const feedsContainer = document.querySelector('.feeds');
    feedsContainer.innerHTML = '';
    const container = document.createElement('div');
    container.classList.add('card');
    container.classList.add('border-0');

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    const h2 = document.createElement('h2');
    h2.classList.add('card-title');
    h2.classList.add('h4');
    h2.textContent = newInstance.t('feeds');
    cardBody.append(h2);
    container.append(cardBody);

    const ulEl = document.createElement('ul');
    ulEl.classList.add('list-group');
    ulEl.classList.add('border-0');
    ulEl.classList.add('rounded-0');

    value.forEach((feed) => {
      const { titleFeeds, descriptionFeeds } = feed;
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item');
      liEl.classList.add('border-0');
      liEl.classList.add('border-end-0');

      const h3 = document.createElement('h3');
      h3.classList.add('h6');
      h3.classList.add('m-0');
      h3.textContent = titleFeeds;

      const pEl = document.createElement('p');
      pEl.classList.add('m-0');
      pEl.classList.add('small');
      pEl.classList.add('text-black-50');
      pEl.textContent = descriptionFeeds;

      liEl.append(h3);
      liEl.append(pEl);
      ulEl.append(liEl);
    });
    container.append(cardBody);
    container.append(ulEl);
    feedsContainer.append(container);
  }
  if (path === 'rssForm.rssData.posts') {
    const postsContainer = document.querySelector('.posts');
    postsContainer.innerHTML = '';
    const containerPosts = document.createElement('div');
    containerPosts.classList.add('card');
    containerPosts.classList.add('border-0');
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
    const h2 = document.createElement('h2');
    h2.classList.add('card-title');
    h2.classList.add('h4');
    h2.textContent = newInstance.t('posts');
    cardBody.append(h2);
    const ulEl = document.createElement('ul');
    ulEl.classList.add('list-group');
    ulEl.classList.add('rounded-0');
    value.forEach((post) => {
      const { title, link } = post;
      const liEl = document.createElement('li');
      liEl.classList.add('list-group-item');
      liEl.classList.add('justify-content-between');
      liEl.classList.add('align-items-start');
      liEl.classList.add('border-0');
      liEl.classList.add('border-end-0');
      const aEl = document.createElement('a');
      aEl.href = link;
      aEl.textContent = title;
      liEl.append(aEl);
      ulEl.append(aEl);
    });
    postsContainer.append(cardBody);
    containerPosts.append(ulEl);
    postsContainer.append(containerPosts);
  }
};

export default watchedState;
