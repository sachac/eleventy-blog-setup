const moment = require('moment');

module.exports = class Years {
  data() {
    return {
      layout: 'layouts/base',
      pagination: {
        data: 'collections._years',
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
<h2>${data.title}</h2>
${await this.archive(data.pagination.items[0].list, 'table')}
</article>
`;
  }
}

