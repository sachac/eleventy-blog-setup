export default class AllPosts {
  data() {
    return {
      layout: 'layouts/base',
      permalink: '/blog/all/graph/',
			title: 'All posts as a graph'
    };
  }
  render(data) {
		const ref = this;
    const list = data.collections._years.sort((a, b) => {
			if (a > b) return -1;
			if (a < b) return 1;
			return 0;
		});
		const years = list.map(function (o) { return '<div>' + ref.postGraph(o.list, {yearLink: '/blog/{{year}}'}) + '</div>'}).join("\n");
    return `<section><h2>All ${data.collections._posts.length} posts</h2>
<p>You might also like to explore <a href="/all/">a list of all posts</a>, <a href="/topic">a topic-based outline</a>, <a href="/blog/category">categories</a>, or <a href="/blog/on-this-day/">posts written on this day</a>.</p>

<p>Someday it would be nice to make this <a href="https://github.com/orgs/community/discussions/49015">more accessible</a> and also include the posts as links/tooltips!</p>

${years}
`;
  }
};
