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
    return `<section><h2>All posts</h2>
${await list.reduce(async (prev, year) => {
return (await prev) +
`<details open><summary><h3>${year.key}</h3></summary>
					${await this.archive(year.list.reverse())}</details>`;
 }, '')}
</section>`;
  }
};
