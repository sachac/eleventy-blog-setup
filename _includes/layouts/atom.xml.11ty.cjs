const moment = require('moment');
module.exports = class Atom {
  async render(data) {
    let ref = this;
		let items = '';
		if (data.pagination && data.pagination.items) {
			items = data.pagination.items.reduce(async (prev, val) => {
				return (await prev) + (await this.atomItem(val));
			}, '');
		}
    return `<?xml version="1.0" encoding="UTF-8"?><?xml-stylesheet href="/assets/atom.xsl" type="text/xsl"?><feed
	xmlns="http://www.w3.org/2005/Atom"
	xmlns:thr="http://purl.org/syndication/thread/1.0"
	xml:lang="en-US"
	><title>${data.base?.title || data.metadata.title}</title>
	<subtitle>${data.metadata.subtitle}</subtitle>
	<link rel="self" type="application/atom+xml" href="${data.metadata.url}${data.page.url}" />
  <link rel="alternate" type="text/html" href="${data.metadata.url}${data.base?.alternate || data.metadata.alternate}" />
  <id>${data.metadata.url}${data.page.url}</id>
  <generator uri="https://11ty.dev">11ty</generator>
	<updated>${this.dateToRfc3339(this.getNewestCollectionItemDate(data.pagination.items))}</updated>
${await items}${data.content}
</feed>`;}
};
