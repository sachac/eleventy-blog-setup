export default class  {
  data() {
    return {
      layout: 'layouts/base'
    };
  }
  async render (page) {
		let categoryLink = '';
		let slug = page.page.url.replace(/^\/topic\/|\/$/g, '');
		let cat = page.collections._taxonomy.find((o) => o.type == 'category' && o.key == slug);
		if (cat) {
			categoryLink = `<div class="category-link"><a href="/blog/category/${slug}">List all posts in chronological order instead</a></div>`;
		}
    return `<article><h1 data-pagefind-meta="title"><a href="/topic">Topic</a> - <a href="${page.permalink}">${page.title}</a></h1>${categoryLink}${await page.content}</article>${categoryLink}`;
  };
}
