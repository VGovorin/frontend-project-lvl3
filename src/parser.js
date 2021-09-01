export default (response) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(response, 'text/xml');

  const channel = html.querySelector('channel');
  const titleFeeds = channel.querySelector('title').textContent;
  const descriptionFeeds = channel.querySelector('description').textContent;

  const items = html.querySelectorAll('item');
  const posts = Array.from(items).map((item) => {
    const link = item.querySelector('link').textContent;
    const title = item.querySelector('title').textContent;
    const description = item.querySelector('description').textContent;
    return { title, link, description };
  });
  return { titleFeeds, descriptionFeeds, posts };
};
