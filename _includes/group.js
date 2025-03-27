import _ from 'lodash';
import moment from "moment";

export function makeArrayOfObjectEntries(o) {
	return Object.entries(o).map((row) => {
    return {key: row[0], list: row[1]};
  });
}

export function groupByDateFormat(collectionApi, format) {
	return makeArrayOfObjectEntries(
    _.groupBy(collectionApi.getFilteredByTag('_posts').sort((a, b) => {
			if (a.date > b.date) return -1;
			if (a.date < b.date) return 1;
			return 0;
		}).map((o) => {
			return {date: o.date, url: o.url, data: { title: o.data.title,
																								categories: o.data.categories,
																								page: { url: o.data.page.url }
																							}
						 };
		}), o => moment(o.date).tz('America/Toronto').format(format))).sort((a, b) => {
			if (a.key < b.key) return 1;
			if (a.key > b.key) return -1;
			return 0;
		});
};
