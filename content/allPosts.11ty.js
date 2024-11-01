export default class AllPosts {
  data() {
    return {
      layout: 'layouts/base',
      permalink: '/blog/all/',
			title: 'All posts'
    };
  }
  async render (data) {
    let list = data.collections._years.reverse();
    return `<section><h2>All ${data.collections._posts.length} posts</h2>
<p>This page lists posts by date. You might also like to explore <a href="/topic">a topic-based outline</a> or <a href="/blog/category">categories</a>.</p>
<ul>
${await list.reduce(async (prev, year) => {
return (await prev) +
`<li><a href="#year-${year.key}">${year.key}</a>: ${year.list.length} posts</li>`;
}, '')}
</ul>
${await list.reduce(async (prev, year) => {
return (await prev) +
`<details open><summary><h3 id="year-${year.key}">${year.key}</h3></summary>
					${await this.archive(year.list.reverse())}</details>`;
 }, '')}
</section>`;
  }
};
