module.exports = (list, matchFunc) => {
		const seen = {};
    return list.filter((item) => {
      let parent = list.find((o) => o.slug == item.parent);
      if (parent) {
        item.parentObj = parent;
        parent.children = parent.children || [];
				if (!parent.children.find((o) => o.slug == item.slug)) {
          parent.children.push(item);
			  }
        return null;
      } else {
        return item;
      }
    });
};
