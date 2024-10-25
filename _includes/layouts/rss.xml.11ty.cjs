module.exports = class RSS {
  async render({page, pagination, data, metadata, content, collections, base}) {
		let items = '';
		if (pagination && pagination.items) {
			items = pagination.items.reduce(async (prev, val) => {
				return (await prev) + (await this.rssItem(val));
			}, '');
		}
		return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="/assets/rss.xsl" type="text/xsl"?><rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
>
<channel>
	<title>${base?.title || metadata.title}</title>
	<atom:link href="${metadata.url}${page.url}" rel="self" type="application/rss+xml" />
	<atom:link href="${metadata.url}${base?.alternate || ''}" rel="alternate" type="text/html" />
	<link>${metadata.url}${page.url}</link>
	<description>${metadata.subtitle}</description>
	<lastBuildDate>${(new Date(this.getNewestCollectionItemDate(collections._posts))).toUTCString()}</lastBuildDate>
	<language>en-US</language>
	<sy:updatePeriod>${metadata.update.period}</sy:updatePeriod>
	<sy:updateFrequency>${metadata.update.frequency}</sy:updateFrequency>
	<generator>11ty</generator>
  ${await items}${content}
	</channel>
</rss>`;}
};
