const siteCategories = require('../_data/siteCategories.json');
const includeInCategory = require('../_includes/includeInCategory.cjs');
const makeTree = require('../_includes/makeTree.cjs');

module.exports = function(ref, data) {
  let categories = siteCategories.slice();
  let tree = makeTree(categories);
  categories.forEach((item) => {
		item.parentObj = siteCategories.find((o) => o.slug == item.parent);
    item.posts = data.collections._posts.filter(o => includeInCategory(o, item));
		if (item.posts && item.posts.length > 0) {
    	 item.lastPosted = ref.getNewestCollectionItemDate(item.posts);
	  }
    item.count = item.posts?.length;
  });
  return {list: categories, tree: tree};
};
