module.exports = eleventyConfig =>
eleventyConfig.addShortcode('post', async function(item, index, includeComments) {
  let comments = '<div class="comments">' + (includeComments ? this.comments(item) : `<a href="${item.url}#comment">View or add comments (Disqus)</a>, or <a href="mailto:sacha@sachachua.com?subject=Comment on ${this.absoluteUrl(item.url, item.data.metadata.url)}&body=Name you want to be credited by (if any): %0D%0AMessage: %0D%0A">e-mail me at sacha@sachachua.com</a>`) + '</div>';
  let categories = item.categories || item.data && item.data.categories;
  if (categories && categories.length > 0) {
    categories = `| <span class="categories">${this.categoryList(categories)}</span>`;
  } else {
    categories = '';
  }
  return  `<article class="post" id="index${index}">
<header><h2><a href="${item.url || item.permalink || ''}">${item.title || item.data && item.data.title}</a></h2>
${this.timeInfo(item)}${categories}
</header>
<div class="entry">
${await (item.templateContent || item.layoutContent || item.data?.content || item.content || item.inputContent)}
</div>
${comments}
</article>`;
});
  
