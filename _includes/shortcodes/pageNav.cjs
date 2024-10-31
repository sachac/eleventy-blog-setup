module.exports = (eleventyConfig) =>

eleventyConfig.addShortcode('pageNav', (data, item) => {
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
  // console.log(data.page.url, next && data.pagination.hrefs[data.pagination.pageNumber + 1]);
  let prevNav = prev ? `<li><a href="${data.pagination.hrefs[data.pagination.pageNumber - 1]}">&laquo; Previous page</a></li>`: '';
  let nextNav = next ? `<li><a href="${data.pagination.hrefs[data.pagination.pageNumber + 1]}">Next page &raquo;</a></li>`: '';
	let allLink = '';
	if (typeof item?.numPages == 'undefined' || item.numPages > 1) {
		if (item && item.total) {
			let more = '';
			const numPages = 5;
			const perPage = 7;
			if (item.total > numPages + perPage) {
				more = '... ';
			}
			allLink += `<li><a href="${all}">${more}All ${item.total} posts</a></li>`;
		} else {
			allLink = `<li><a href="${all}">All posts</a></li>`;
		}
	}
  let s = `<nav aria-labelledby="pagination" class="page-nav">
    <h2 id="pagination">Page navigation</h2>
    <ul>${prevNav}${current}${nextNav}${allLink}</ul>
  </nav>`;
  return s;
});
