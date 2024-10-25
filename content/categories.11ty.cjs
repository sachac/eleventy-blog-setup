/** 
 * List of all terms in this taxonomy
 */
const siteCategoryData = require('../_includes/siteCategoryData.cjs');
const moment = require('moment');

module.exports = class TaxonomyAll {
  data() {
    return {
      layout: 'layouts/base',
      permalink: `blog/category/index.html`,
      title: 'All categories'
    };
  }
  render(data) {
    let categories = siteCategoryData(this, data);
		let maxCount = categories.list.map((o) => o.count || 0).reduce((a, b) => Math.max(a, b), 0);
		const threshold = new moment().subtract(24, 'months').toDate();

		const recentCategories = categories.list.filter((o) => o.count && o.lastPosted && new Date(o.lastPosted) >= threshold).sort((a, b) => {
			if (a.count > b.count) return -1;
			if (a.count < b.count) return 1;
			if (a.slug < b.slug) return -1;
			if (a.slug > b.slug) return 1;
			return 0; });

		const th = '<tr><th style="text-align: right">Posts</th><th>Category</th><th>Last posted</th></tr>';
    const listFunc = (list, indent) =>
          list.map(item => {
            let count = item.count;
let indentSpacing = "&nbsp;".repeat(indent * 4);
return item.count > 0 ? `<tr>
        <td class="num-posts">${count}<span class="data-background-bar" style="width: ${count * 100.0 / maxCount}%;">&nbsp;</span></td>
<td>${indentSpacing}<a href="/blog/category/${item.slug}/">${item.name}</a></td>
        <td class="last-posted">${count > 0 ? this.readableDate(item.lastPosted) : ''}</td></tr>
        ${item.children ? listFunc(item.children, (indent || 0) + 1) : ''}` : '';}).join("\n");
//		console.debug(Object.keys(categories.tree.find((o) => o.slug == 'business')));
		// console.debug(categories.tree.find((o) => o.slug == 'business').children.map((o) => o.slug));

    return `
<table>
<tr><td colspan="3"><h2>Recent categories</h2></td></tr>
${th}
${recentCategories.map((item) => `
		<tr><td class="num-posts">${item.count}<span class="data-background-bar" style="width: ${item.count * 100.0 / maxCount}%;">&nbsp;</span></td>
			<td><a href="/blog/category/${item.slug}/">${item.name}</a></td>
<td class="last-posted">${item.count > 0 ? this.readableDate(item.lastPosted) : ''}</td>
		</tr>
`).join("\n")}
<tr><td colspan="3"><h2>All categories</h2></td></tr>
${th}${listFunc(categories.tree)}</table>`;
  };
};

