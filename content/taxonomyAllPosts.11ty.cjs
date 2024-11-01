module.exports = class TaxonomyAllPosts {
  data() {
    return {
      layout: 'layouts/base',
      pagination: {
        data: 'collections._taxonomy',
        size: 1,
        alias: 'list'
      },
      includePages: true,
      permalink: data => `blog/${data.pagination.items[0].type}/${data.pagination.items[0].key}/all/index.html`,
      eleventyComputed: {
        title: data => {
          let item = data.pagination.items[0];
          return item.type + ' - ' + item.key;
        },
        rss: data => {
          let item = data.pagination.items[0];
          return `/blog/${item.type}/${item.key}/feed/`;
        },
        atom: data => {
          let item = data.pagination.items[0];
          return `/blog/${item.type}/${item.key}/feed/atom/`;
        }
      },
      
    };
  }
	async render(data) {
    let item = data.pagination.items[0];
    let base = item.type == 'category' ? 'Categories' : 'Tags';
		let archiveType = 'list';
		let topicLink = '';
		if (item.type == 'category') {
			if (item.key == 'visual-book-notes') {
				archiveType = 'gallery';
			}
			let topic = data.collections._topics.find((o) => o.url == '/topic/' + item.key + '/');
			if (topic) {
				topicLink = `<div class="topic-link"><a href="${topic.url}">View topic page</a></div>`;
			}
		}
    return `<article>
<h2><a href="/blog/${item.type}">${base}</a>: <a href="/blog/${item.type}/${item.key}">${item.key}</a>: <a href="${data.page.url}"/>All ${item.list.length} ${item.list.length == 1 ? 'post' : 'posts'}</h2>
${topicLink}
${await this.archive(item.list, archiveType)}
</article>
`;
  }
};

