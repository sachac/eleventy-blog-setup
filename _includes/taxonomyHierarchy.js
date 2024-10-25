import expandTermsFromHierarchy from './expandTermsFromHierarchy.js';

export function taxonomyCollection(collectionApi) {
	let list = {};
	let types = { 'categories': 'category', 'postTags': 'tag' };

	collectionApi.getFilteredByTag('_posts').forEach(o => {
		Object.keys(types).forEach(type => {
			list[type] = list[type] || {};
			let terms = o.data[type];
			if (typeof (terms) == 'string') {
				terms = terms.split(/ +/);
			}
			if (type == 'categories') {
				terms = expandTermsFromHierarchy(terms, o.data.siteCategories);
			}
			if (terms) {
				terms.map(key => {
					list[type][key] = list[type][key] || [];
					list[type][key].push(o);
				});
				o.data['expanded' + type.substring(0, 1).toUpperCase() + type.substring(1)] = terms;
			}
		});
	});

	let result = [];
	Object.keys(types).forEach(type => {
		if (list[type]) {
			Object.keys(list[type]).map((key) => {
				result.push({ type: types[type], key: key, list: list[type][key].reverse() });
			});
		}
	});
	return result;
}
export function taxonomyPages(collectionApi, numPages, perPage, ref) {
	if (!collectionApi.items[0]) return;
	let taxonomyCollection = collectionApi.items[0].data?.collections?._taxonomy || ref._taxonomy(collectionApi);
	let result = taxonomyCollection.reduce((prev, val) => {
		let pages = [];
		let n = Math.min(Math.floor((val.list.length + perPage - 1) / numPages),
			numPages);
		for (let i = 0; i < n; i++) {
			if (val.list.length > i * perPage) {
				pages.push({
					type: val.type,
					key: val.key,
					page: i,
					numPages: n,
					total: val.list.length,
					list: val.list.slice(i * perPage, (i + 1) * perPage)
				});
			}
		};
		return prev.concat(pages);
	}, []);
	return result;
}

export function taxonomyFeed(collectionApi, perPage, ref) {
	let taxonomyCollection = collectionApi.items[0].data.collections._taxonomy || ref._taxonomy(collectionApi);
	let result = taxonomyCollection.map((val) => {
		return {
			type: val.type,
			key: val.key,
			list: val.list.slice(0, perPage),
			title: 'Sacha Chua - ' + val.type + ' - ' + val.key,
			alternate: `/blog/${val.type}/${val.key}`
		};
	});
	return result;
}
