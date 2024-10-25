const posthtml = require("posthtml");
const urls = require("posthtml-urls");

module.exports = (eleventyConfig) => {
  eleventyConfig.addAsyncShortcode('rssItem', async function(item) {
		let content = item.templateContent.replace(/--/g, '&#45;&#45;');
		if (this.transformWithHtmlBase) {
			content = await this.transformWithHtmlBase(content);
		}
		return `<item>
		<title>${item.data.title}</title>
		<link>${this.absoluteUrl(item.url, item.data.metadata.url)}</link>
		<dc:creator><![CDATA[${item.data.metadata.author.name}]]></dc:creator>
		<pubDate>${item.date.toUTCString()}</pubDate>
    ${item.data.categories?.map((cat) => `<category>${cat}</category>`).join("\n") || ''}
		<guid isPermaLink="false">${this.guid(item)}</guid>
		<description><![CDATA[${content}]]></description>
		</item>`;
  });
};
