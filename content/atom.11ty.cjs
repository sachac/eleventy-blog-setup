const moment = require('moment');
module.exports = class RSS {
  data() {
    return {
      permalink: '/blog/feed/atom/index.xml',
      layout: 'layouts/atom.xml',
      pagination: {
        size: 10,
        data: 'collections._posts',
        before: function(data) {
          return data.reverse().slice(0, 10);
        }
      },
    };
  }
};
