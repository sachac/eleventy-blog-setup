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
  let all = '/blog/all/';
  if (current.type) {
    all = `/blog/${current.type}/${current.key}/all/`;
  }
  // console.log(data.page.url, next && data.pagination.hrefs[data.pagination.pageNumber + 1]);
  let prevNav = prev ? `<li><a href="${data.pagination.hrefs[data.pagination.pageNumber - 1]}">&laquo; Newer posts</a></li>`: '';
	let allLink = '';
	if (typeof item?.numPages == 'undefined' || item.numPages > 1) {
		if (item && item.total) {
			allLink += `<li><a href="${all}">All ${item.total} posts</a></li>`;
		} else {
			allLink = `<li><a href="${all}">All posts</a></li>`;
		}

	}
	let nextNav = next ? `<li><a href="${data.pagination.hrefs[data.pagination.pageNumber + 1]}">Older posts &raquo;</a></li>`: '';
  if (next && next.type) {
		const numPages = 5;
		const perPage = 7;
		if (next.type != current.type || next.key != current.key) {
			if (item.total > numPages * perPage) {
				nextNav = `<li><a href="${all}">Older posts: see all ${item?.total || ''} posts for more</a></li>`;
				allLink = '';
			} else {
				nextNav = '';
			}
    } else {
			nextNav = `<li><a href="${data.pagination.hrefs[data.pagination.pageNumber + 1]}">Older posts &raquo;</a></li>`;
		}
  }
  let s = `<nav aria-labelledby="pagination" class="page-nav">
    <h2 id="pagination">Page navigation</h2>
    <ul>${prevNav}${nextNav}${allLink}</ul>
  </nav>`;
  return s;
});
