module.exports = class Post {
  data() {
    return {
      layout: 'layouts/base'
    };
  }
  async render (data) {
    let sorted = data.collections._posts.slice().reverse();
    let index = sorted.findIndex((o) => o.data.permalink == data.permalink);
    let prevNext = '';
    if (index >= 0) {
      if (index > 0) {
        let x = sorted[index - 1];
        prevNext += `<a href="${x.url}">&laquo; ${x.data.title}</a>`;
      }
      if (index < sorted.length - 1) {
        let x = sorted[index + 1];
        prevNext += `<a href="${x.url}" class="right">${x.data.title} &raquo;</a>`;
      }
    }
//     let prevNext = `<nav>
// ${(index > 0) ? this.itemLink(sorted[index - 1]) : ''}
// ${(index >= 0 && index < sorted.length ? this.itemLink(sorted[index + 1]) : '')}
    // </nav>`;
    let nav = prevNext ? `<nav class="pages">${prevNext}</nav>` : '';
    return nav + '<div data-pagefind-body>' + (await this.post(data, 0, true)) + '</div>' + nav;
  }
};
