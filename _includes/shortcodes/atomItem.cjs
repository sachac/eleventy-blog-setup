const moment = require('moment');
module.exports = (eleventyConfig) => {
  eleventyConfig.addAsyncShortcode('atomItem', async function(item) {
    let content = item.templateContent.replace(/--/g, '&#45;&#45;');
		if (this.transformWithHtmlBase) {
			content = await this.transformWithHtmlBase(item.templateContent.replace(/--/g, '&#45;&#45;'));
		}
		return `<entry>
		<title type="html">${item.data.title}</title>
		<link rel="alternate" type="text/html" href="${this.absoluteUrl(item.url, item.data.metadata.url)}"/>
		<author><name><![CDATA[${item.data.metadata.author.name}]]></name></author>
		<updated>${this.dateToRfc3339(new Date(item.modified || item.data.modified || item.date))}</updated>
    <published>${this.dateToRfc3339(item.date)}</published>
    ${(item.data?.categories || []).map((cat) => `<category term="${cat}" />`).join("\n")}
		<id>${this.guid(item)}</id>
		<content type="html"><![CDATA[${content}]]></content>
		</entry>`;
  });
};
  
