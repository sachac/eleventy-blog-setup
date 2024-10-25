module.exports = class {
  data() {
    return {
			layout: 'layouts/base',
      permalink: '/blog/random/',
			title: 'Random'
    };
  }
  async render (data) {
    const list = data.collections._posts.filter((o) => !o.data.title.match(/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] Emacs news/));
		const count = list.length;
		const limit = Math.min(5, count);
		let posts = null;
		if (count == limit) {
			posts = list;
		} else {
			const selected = {};
			let found = 0;
			while (found < limit) {
				const i = Math.floor(Math.random() * count);
				if (!selected[i]) { selected[i] = list[i]; found++; }
			}
			posts = Object.values(selected);
		}
		return `<div class="random-posts" data-count="${limit}">
<div><button class="refresh" style="display: none">Get more random posts</button></div>
<div class="redirect-note" style="display: none">
To redirect to the first random post automatically, go to <a href="/blog/random?redirect" class="redirect">/blog/random?redirect</a>.</div>
<noscript>
This list is refreshed whenever I publish a blog post. If you enable Javascript, you can reload the page to get a new list.
</noscript>
${await this.archive(posts, 'table-with-year')}</div>
<script>
document.querySelector('.redirect-note').style.display = 'block';
async function handleRandom() {
document.querySelector('.refresh').style.display = "block";
window.posts = await fetch('/blog/all/index.json').then((res) => res.json())
    .then((list) => list.filter((o) => !o.title.match(/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9] Emacs news/)))
    .then((list) => list.map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value));
let start = 0;
const count = parseInt(document.querySelector('.random-posts').getAttribute('data-count'));
async function showRandomPosts() {
     if (window.location.search?.indexOf('redirect') >= 0) {
         window.location.href = window.location.origin + window.posts[0].permalink;
         return;
     }
     const table = document.querySelector('.random-posts table tbody');
     if (start + count > posts.length) {
        // reshuffle
        posts = await posts.map(value => ({ value, sort: Math.random() }))
                     .sort((a, b) => a.sort - b.sort)
                     .map(({ value }) => value);
        start = 0;
     }
     const formatter = new Intl.DateTimeFormat('en', {month: 'short',
day: 'numeric',
year: 'numeric'});
     const list = posts.slice(start, start + count).map((o) => {
   const row = document.createElement('tr');
   const date = document.createElement('td');
   date.textContent = formatter.format(new Date(o.date));
   const title = document.createElement('td');
   const link = document.createElement('a');
   link.href = o.permalink;
   link.innerHTML = o.title;
   title.appendChild(link);
   const categories = document.createElement('td');
   o.categories.forEach((cat, i) => {
if (i > 0) { categories.appendChild(document.createTextNode(', ')); }
const catLink = document.createElement('a');
catLink.href = '/category/' + cat;
catLink.textContent = cat;
categories.appendChild(catLink);
});
   row.replaceChildren(date, title, categories);
   return row;
});
     start = start + count;
     table.replaceChildren(...list);
}
document.querySelector('.refresh').addEventListener('click', showRandomPosts);
document.querySelector('.redirect').addEventListener('click', function() {
   window.location.href = window.location.origin + posts[start].permalink;
});
await showRandomPosts();
}
handleRandom();
</script>
`;
  }
};
