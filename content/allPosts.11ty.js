export default class AllPosts {
  data() {
    return {
      layout: 'layouts/base',
      permalink: '/blog/all/',
			title: 'All posts'
    };
  }
  async render (data) {
    let list = data.collections._years.sort((a, b) => {
			if (a > b) return -1;
			if (a < b) return 1;
			return 0;
		});
    return `<section><h2>All ${data.collections._posts.length} posts</h2>
<p>This page lists posts by date. You might also like to explore <a href="/topic">a topic-based outline</a>, <a href="/blog/category">categories</a>, or <a href="/blog/on-this-day/">posts written on this day</a>. There's also <a href="/blog/all/graph/">a visualization</a> and a <a href="/blog/all/index.json">JSON file</a>.</p>
<ul class="inline-list">
${await list.reduce(async (prev, year) => {
return (await prev) +
`<li><a href="#year-${year.key}">${year.key}</a></li>`;
}, '')}
</ul>
${await list.reduce(async (prev, year) => {
return (await prev) +
`<details open><summary><h3 id="year-${year.key}">${year.key}</h3></summary>
					${await this.archive(year.list)}</details>`;
 }, '')}
</section>`;
  }
};
