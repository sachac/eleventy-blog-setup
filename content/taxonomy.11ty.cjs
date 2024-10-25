module.exports = class Taxonomy {
  data() {
    return {
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
      layout: 'layouts/base',
      pagination: {
        data: 'collections._taxonomyPages',
        size: 1,
      },
      includePages: true,
      permalink: data => {
        let item = data.pagination.items[0];
        if (item.page == 0) {
          return `blog/${item.type}/${item.key}/index.html`;
        } else {
          return `blog/${item.type}/${item.key}/page/${item.page + 1}/index.html`;
        }
      } 
    };
  }
  async render(data) {
    let ref = this;
    let item = data.pagination.items[0];
    let base = item.type == 'category' ? 'Categories' : 'Tags';
    let parentPath = '';
    let description = (item.page == 0) ? (data.termDescriptions[item.key] || '') : '';
		let topicLink = '';
		if (item.type == 'category') {
      let cat = data.siteCategoriesWithParents.find(o => o.slug == item.key);
      if (cat && cat.parentPath) {
        parentPath = cat.parentPath.map((p) =>
          `<a href="/blog/category/${p.slug}">${p.slug}</a>`).join(' &raquo; ')
          + ' &raquo; ';
      }
			let topic = data.collections._topics.find((o) => o.url == '/topic/' + item.key + '/');
			if (topic) {
				topicLink = `<span class="topic-link"><a href="${topic.url}">View topic page</a></span> - `;
			}
    }
    return `
<h2><a href="/blog/${item.type}">${base}:</a> ${parentPath}<a href="/blog/${item.type}/${item.key}">${item.key}</a></h2>
<div>${topicLink}<a href="${data.rss}">RSS</a> - <a href="${data.atom}">Atom</a> - ${this.rssByEmail(this.absoluteUrl(data.rss, data.metadata.url))}</div>
${description}
${this.pageNav(data)}
${this.onThisPage(item.list)}
${await this.archive(item.list, 'post')}
${this.pageNav(data)}
`;
  }
};

