import axios from 'axios';

const proxy = (url) => {
  const href = new URL('https://hexlet-allorigins.herokuapp.com/get?disableCache=true');
  href.searchParams.set('url', url);
  return href.toString();
};

export default (url) => axios.get(proxy(url))
  .catch((e) => {
    throw new Error(e);
  });
