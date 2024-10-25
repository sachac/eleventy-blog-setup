
module.exports = class RSS {
  data() {
    return {
      layout: 'layouts/rss.xml',
      permalink: '/blog/feed/index.xml',
      title: 'Recent posts',
      pagination: {
        size: 10,
        data: 'collections._posts',
        before: function(data) {
          return data.reverse().slice(0, 10);
        }
      }
    };
  }
};
