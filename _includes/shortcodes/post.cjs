
module.exports = eleventyConfig =>
eleventyConfig.addShortcode('post', async function(item, index, includeComments) {
  let comments = '<div class="comments">' + (includeComments ? this.comments(item) : this.comments(item, true)) + '</div>';
  let categoryList = item.categories || item.data && item.data.categories;
	let categoriesFooter = '', categories = '';
  if (categoryList && categoryList.length > 0) {
    categoriesFooter = `<div class="footer-categories">More posts about ${this.categoryList(categories)}</div>`;
		categories = `| <span class="categories">${this.categoryList(categories)}</span>`;
  }

  return  `<article class="post" id="index${index}" data-url="${item.url || item.permalink || ''}">
<header><h2 data-pagefind-meta="title"><a href="${item.url || item.permalink || ''}">${item.title || item.data && item.data.title}</a></h2>
${this.timeInfo(item)}${categories}
</header>
<div class="entry">
${await (item.templateContent || item.layoutContent || item.data?.content || item.content || item.inputContent)}
</div>
${comments}
${categoriesFooter}
</article>`;
});
  
