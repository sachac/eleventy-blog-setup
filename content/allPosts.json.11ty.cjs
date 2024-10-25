module.exports = class AllPosts {
  data() {
    return {
      permalink: '/blog/all/index.json'
    };
  }
  render (data) {
    let list = data.collections._posts.concat(data.collections._topics);

    return JSON.stringify(list.map(o => {
			return {permalink: o.url,
							date: o.date,
							title: o.data.title,
							categories: o.data?.categories,
							postTags: o.data?.postTags}; }));
  }
};
