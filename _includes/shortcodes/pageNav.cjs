module.exports = (eleventyConfig) =>

eleventyConfig.addShortcode('pageNav', (data) => {
  /* Prev Page 1 Page 2 Page 3 Page 4 Page 5 All Next */
  let prev = data.pagination.pageNumber > 0 
      ? data.pagination.pages[data.pagination.pageNumber - 1] : null;
  let next = data.pagination.pageNumber < data.pagination.pages.length
      ? data.pagination.pages[data.pagination.pageNumber + 1] : null;
  let current = data.pagination.pages[data.pagination.pageNumber];
  if (prev && prev.type && (prev.type != current.type || prev.key != current.key)) {
    prev = null;
  }
  if (next && next.type && (next.type != current.type || next.key != current.key)) {
    next = null;
  }
  let all = '/blog/all/';
  if (current.type) {
    all = `/blog/${current.type}/${current.key}/all/`;
  }
  let pages = (data.includePages || data.pagination.includePages) ? data.pagination.pages.map(function(item, index) {
    if (item.type && !(item.type == current.type && item.key == current.key)) {
      return null;
    }
    let displayPageNum = ((typeof item.page !== 'undefined') ? item.page : index);
    let currentClass = index == data.pagination.pageNumber ? 'current' : '';
    return `<li class="${currentClass}"><a href="${data.pagination.hrefs[index]}" ${data.pagination.hrefs[index] ? 'aria-current="page"' : "" }>Page ${displayPageNum + 1}</a></li>`;
  }).join("") : '';
  // console.log(data.page.url, next && data.pagination.hrefs[data.pagination.pageNumber + 1]);
  let prevNav = prev ? `<li><a href="${data.pagination.hrefs[data.pagination.pageNumber - 1]}">&laquo; Previous page</a></li>`: '';
  let nextNav = next ? `<li><a href="${data.pagination.hrefs[data.pagination.pageNumber + 1]}">Next page &raquo;</a></li>`: '';
  let s = `<nav aria-labelledby="pagination" class="page-nav">
    <h2 id="pagination">Page navigation</h2>
    <ul>${prevNav}${pages}<li><a href="${all}">All</a></li>${nextNav}</ul>
  </nav>`;
  return s;
});
