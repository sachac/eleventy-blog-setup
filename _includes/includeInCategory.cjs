module.exports = function(post, catObj) {
	return post.data?.expandedCategories?.indexOf(catObj.slug) >= 0;
};
