const fs = require('fs');
const path = require('path');
module.exports = async function (eleventyConfig) {
  // Function calls to shortcodes to include
  ['photoswipe', 'details', 'image', 'rssByEmail', 'site-footer', 'site-header', 'timeInfo', 'head-tag', 'itemLink', 'guid', 'pageNav', 'post', 'onThisPage', 'rssItem', 'atomItem', 'listWithNav', 'comments'].map((file) => {
		require('./' + file + '.cjs')(eleventyConfig);
  });
	await Promise.all([ 'archive', 'sketch' ].map(async (file) => {
		return await import('./' + file + '.js').then((mod) => {
			mod.default(eleventyConfig);
		});
	}));
	return
};
