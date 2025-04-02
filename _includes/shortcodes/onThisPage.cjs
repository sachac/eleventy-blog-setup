const { JSDOM } = require('jsdom');

module.exports = function (eleventyConfig) {
	function formatPostLine(item, index) {
		let subtoc = '';
		if (item.templateContent?.match(/sticky-toc/)) {
			const doc = new JSDOM(item.templateContent).window.document;
			const sub = doc.querySelector('.sticky-toc ul, .sticky-toc div, .sticky-toc-after-scrolling div');
			if (sub) {
				if (sub.querySelector('.panzoom')) {
					console.log('remove panzoom');
					sub.querySelector('.panzoom').classList.remove('panzoom');  // don't do panzoom for now
				}
				sub.classList.remove('panzoom');
				subtoc = sub.outerHTML;
			}
		}
		return `<li><a class="toc-link" data-index="index${index}" href="${item.url}">${item.data.title}</a>${subtoc}</li>`;
	}
  eleventyConfig.addShortcode('onThisPage', function (list) {
    return `<nav class="on-this-page">
On this page:
<ul>
${list.map(formatPostLine).join("\n")}
</ul>
</nav>`;
  });
};
