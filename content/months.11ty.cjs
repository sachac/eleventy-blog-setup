module.exports = class Months {
  data() {
    return {
      layout: 'layouts/base',
      pagination: {
        data: 'collections._months',
        size: 1,
      },
      eleventyComputed: {
        title: data => {
          return data.pagination.items[0].key;
        }
      },
      permalink: data => `blog/${data.pagination.items[0].key}/index.html`
    };
  }
	async render(data) {
		return `<article>
${this.pageNav(data)}
<h2>${data.title} (${data.pagination.items[0].list.length} post${data.pagination.items[0].list.length == 1 ? '' : 's'})</h2>
${await this.archive(data.pagination.items[0].list, 'table')}
</article>
`;
  }
};

