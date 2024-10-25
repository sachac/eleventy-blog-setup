module.exports = class Taxonomy {
  data() {
    return {
      layout: 'layouts/atom.xml',
      pagination: {
        data: 'collections._taxonomyFeed',
        size: 1
      },
      includePages: true,
      permalink: data => {
        let item = data.pagination.items[0];
        return `blog/${item.type}/${item.key}/feed/atom/index.xml`;
      } 
    };
  }
  render(data) {
    let ref = this;
    let item = data.pagination.items[0];
    let base = item.type == 'category' ? 'Categories' : 'Tags';
    let parentPath = '';
    if (item.type == 'category') {
      let cat = data.siteCategoriesWithParents.find(o => o.slug == item.key);
      if (cat && cat.parentPath) {
        parentPath = cat.parentPath.map((p) =>
          `<a href="/blog/category/${p.slug}">${p.slug}</a>`).join(' &raquo; ')
          + ' &raquo; ';
      }
    }
    data.base = item;
    data.pagination.items = item.list;
    return '';
  }
};

