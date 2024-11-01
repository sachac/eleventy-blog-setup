const numPages = 5;
const perPage = 7;
const _ = require('lodash');
module.exports = class Home {
  data() {
    return {
      layout: 'layouts/base',
      title: 'Home',
			changefreq: "daily",
      includePages: true,
      pagination: {
        data: 'collections._posts',
        size: 1,
        before: function(data) {
          let metadata = data && (data.metadata || data[0] && data[0].data && data[0].data.metadata);
          if (!metadata) return data;
          let result = _.chunk(data.sort((a, b) => b.date - a.date).slice(0, metadata.itemsPerPage * metadata.numPages), metadata.itemsPerPage);
          return result;
        },
      },
      permalink: (data) => {
        if (data.pagination.pageNumber == 0) {
          return 'blog/index.html';
        } else { 
          return `blog/page/${data.pagination.pageNumber + 1}/index.html`;
        }
      }
    };
  }
  async render(data) {
    let ref = this;
    let nav = this.pageNav(data, {total: data.collections._posts.length});
    return `
<div class="sticky-toc">
${nav}
${await this.onThisPage(data.pagination.items[0], 'post')}
</div>
${await this.archive(data.pagination.items[0], 'post')}
${nav}`;
  }
};
