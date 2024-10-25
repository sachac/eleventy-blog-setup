module.exports = class AllPosts {
  data() {
    return {
      permalink: '/conf/nginx.map',
			eleventyExcludeFromCollections: true
    };
  }
  async render (data) {
    let list = data.collections._posts;
    let cats = data.siteCategoriesWithParents;
    let nested = cats.filter(o => o.parent);
    let hash = {};
    await list.reduce(async (prev, o) => {
			await prev;
      if (o.data?.zid) {
				hash[o.data.zid] = o.url;
			}
			let matches = (await o.template.inputContent).matchAll(/{% +sketchFull +\"([0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9](-[0-9][0-9]|[a-z]))?/g);
      for (const m of matches) {
        if (m[1] && !hash[m[1]]) {
          hash[m[1]] = o.url;
        }
      }
    });
    let byZIDs = Object.entries(hash).map((o) => `/${o[0]} ${o[1]};\n`).join('');
    let byBlogID = list.filter(o => o.data.id).map((o) => `/blog/p/${o.data.id} ${o.url};`).join("\n") + "\n";
    let nestedCategories = nested.map((o) => {
      let slugPath = o.parentPath.map((p) => p.slug).join('/') + '/' + o.slug;
      let catPage = `/blog/category/${slugPath} /blog/category/${o.slug};\n`;
      let catFeed = `/blog/category/${slugPath}/feed/ /blog/category/${o.slug}/feed/;\n`;
      let catAtom = `/blog/category/${slugPath}/feed/atom/ /blog/category/${o.slug}/feed/atom/;\n`;
      return catAtom + catFeed + catPage;
    }).join('');
		const result = byBlogID + nestedCategories + byZIDs;
    return result;
  }
};
