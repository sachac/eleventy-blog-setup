export default class OnThisDay {
  data() {
    return {
      layout: 'layouts/base',
      permalink: '/blog/on-this-day/',
      title: 'On this day'
    };
  }

  async render(data) {
    const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'America/Toronto' }));
    const options = { month: 'long', day: 'numeric' };
    const date = today.toLocaleDateString('en-US', options);
    const currentMonthDay = today.toISOString().substring(5, 10);
    let list = data.collections._posts
				.filter(post => {
					const postDateTime = new Date(post.date).toLocaleString('en-US', { timeZone: 'America/Toronto' });
					const postMonthDay = (new Date(postDateTime)).toISOString().substring(5, 10);
					return postMonthDay === currentMonthDay;
				})
				.sort((a, b) => {
					if (a.date < b.date) return 1;
					if (a.date > b.date) return -1;
					return 0;
				})
				.map(post => {
					const postDateTime = new Date(post.date).toLocaleString('en-US', { timeZone: 'America/Toronto' });
					const postDate = new Date(postDateTime);
					const postYear = postDate.getFullYear();
					return `<li>${postYear}: <a href="${post.url}">${post.data.title}</a></li>`;
				})
				.join('\n');
    list = list.length > 0
      ? `<ul>${list}</ul>`
      : `<p>No posts were written on ${date} in previous years.</p>`;

    return `<section><h2>On this day</h2>
<p>This page lists posts written on this day throughout the years. If you've enabled Javascript, it will show the current day. If you don't, it'll show the posts from the day I last updated this blog. You might also like to explore <a href="/blog/all">all posts</a>, <a href="/topic">a topic-based outline</a> or <a href="/blog/category">categories</a>.</p>
<h3 class="date">${date}</h3>
<div id="posts-container">${list}</div>

<script>
  $(document).ready(function() { onThisDay(); });
</script>
</section>`;
  }
};
