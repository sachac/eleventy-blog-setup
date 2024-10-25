module.exports = class RSS {
  data() {
    return {
      permalink: 'blog/feed/index.xml'
    };
  }
  render({data, metadata, collections}) {
    let ref = this;
    const formatRssItem = function(item) {
      return `<item>
		<title>${item.data.title}</title>
		<link>${ref.absoluteUrl(item.url, metadata.url)}</link>
		<dc:creator><![CDATA[${metadata.author.name}]]></dc:creator>
		<pubDate>${item.date.toUTCString()}</pubDate>
    ${item.data.categories.map((cat) => `<category>${cat}</category>`).join("\n")}
		<guid isPermaLink="false">${ref.absoluteUrl(item.url, metadata.url)}</guid>
		<content:encoded><![CDATA[${item.templateContent}]]></content:encoded>
		</item>`;
    };
    return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"
	xmlns:content="http://purl.org/rss/1.0/modules/content/"
	xmlns:wfw="http://wellformedweb.org/CommentAPI/"
	xmlns:dc="http://purl.org/dc/elements/1.1/"
	xmlns:atom="http://www.w3.org/2005/Atom"
	xmlns:sy="http://purl.org/rss/1.0/modules/syndication/"
	xmlns:slash="http://purl.org/rss/1.0/modules/slash/"
	xmlns:series="http://organizeseries.com/"
	xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"
xmlns:rawvoice="http://www.rawvoice.com/rawvoiceRssModule/"
xmlns:googleplay="http://www.google.com/schemas/play-podcasts/1.0"
>
<channel>
	<title>${metadata.title}</title>
	<atom:link href="${metadata.feedUrl}" rel="self" type="application/rss+xml" />
	<link>${metadata.url}</link>
	<description>${metadata.subtitle}</description>
	<lastBuildDate>${(new Date(this.getNewestCollectionItemDate(collections._posts))).toUTCString()}</lastBuildDate>
	<language>en-US</language>
	<sy:updatePeriod>${metadata.update.period}</sy:updatePeriod>
	<sy:updateFrequency>${metadata.update.frequency}</sy:updateFrequency>
	<generator>11ty</generator>
	<itunes:summary>${metadata.subtitle}</itunes:summary>
	<itunes:author>${metadata.author.name}</itunes:author>
	<itunes:explicit>${metadata.explicit}</itunes:explicit>
	<itunes:image href="${metadata.iTunesImage}" />
	<itunes:subtitle>${metadata.subtitle}</itunes:subtitle>
	<image>
		<title>${metadata.title}</title>
		<url>${metadata.iTunesImage}</url>
		<link>${metadata.url}</link>
	</image>
${collections._posts.slice(0, 10).map(formatRssItem).join('')}
	</channel>
</rss>`;}
};
