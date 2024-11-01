import { getSketchInfo } from './sketch.js';
import { DateTime } from 'luxon';
import { parse } from "node-html-parser";

function readableDate(date) {
	return DateTime.fromJSDate(new Date(date)).toFormat('LLL d, yyyy');
}

export async function galleryWithSlideshow(list, ref) {
	return `<div class="buttons" style="display: none"><button class="view-slideshow">View slideshow</button><button class="shuffle-slideshow">Shuffle slideshow</button></div>
${await gallery(list, ref)}
<script>
$(document).ready(() => {
document.querySelector('.buttons').style.display = 'block';
document.querySelector('.view-slideshow').addEventListener('click', showGallery);
document.querySelector('.shuffle-slideshow').addEventListener('click', shuffleGallery);
});
</script>`;
}

export async function gallery(list, ref) {
	// look for the sketchFull in it
			let images = [];
			let noImage = [];
			await list.reduce(async (prev, item) => {
				await prev;
				const m = item.content?.match(/src="(.+?)"/);
				const title = item?.data?.title?.replace(/^(Visual book (notes?|review)|Sketched Book|Sketchnotes) *[:\-] /i, '');
				if (m && m[1]) {
					const { full, fullMetadata } = await getSketchInfo(m[1], title);
					images.push(`<figure>
<a href="${item.url}"><picture>
<img src="${m[1]}" title="${title}" data-src="${full || m[1]}" data-w="${fullMetadata?.width || ''}" data-h="${fullMetadata?.height || ''}" data-w="${fullMetadata?.width || ''}" loading="lazy" decoding="async" />
<figcaption>${title}</figcaption></a>
${readableDate(item.date)}
</picture></figure>`);
				} else {
					noImage.push(item);
				}
			}, null);
			let otherPosts = '';
			if (noImage.length > 0) {
				otherPosts = `Other posts: <ul>
    ${noImage.map(item => `<li><a href="${item.data.page.url}">${item.data.title}</a>${item.date ? ' - ' + readableDate(item.date) : ''}</li>`).join("")}
			</ul>`;
			}
	return `<section class="archive">
<div class="gallery">${images.join("\n")}</div>
${otherPosts}
    </section>`;
}

export async function galleryList(content, ref) {
	const allPosts = ref.ctx.environments.collections._posts;
	const root = parse(content);
	const posts = [...root.querySelectorAll('a')].map((link) => {
		const post = allPosts.find((post) => link.getAttribute('href')?.indexOf(post.url) >= 0);
		if (post) {
			return post;
		} else {
			return {
				url: link.getAttribute('href'),
				data: { title: link.textContent, page: {url: link.getAttribute('href')}}
			}
		}
	});
	const text = await gallery(posts, ref);
	return text;
}

export default (eleventyConfig) => {
	eleventyConfig.addPairedAsyncShortcode('gallerylist', async function (content) {
		return await galleryList(content, this);
	});
	eleventyConfig.addShortcode('archive', async function (list, type) {
		let ref = this;
		if (type == 'post') {
			return await list.reduce(async (prev, val, index) => { return await prev + await ref.post(val, index) + "\n"; }, "");
		} else if (type == 'table' || type == 'table-with-year') {
			return `<table>
<tr><th>Date</th><th>Title</th><th>Categories</th></tr>
${list.map(o => {
				return `<tr>
      <td>${(type == 'table-with-year') ? readableDate(o.date) : ref.readableMonthDay(o.date)}</td>
      <td><a href="${o.url}">${o.data.title}</a></td>
      <td>${ref.categoryList(o.data.categories)}</td>
      </tr>`
			}).join("\n")}
</table>`;
		} else if (type == 'gallery') {
			return galleryWithSlideshow(list, ref);
		} else {
			return `<section class="archive">
<ul>
    ${list.map(item => `<li><a href="${item.data.page.url}">${item.data.title}</a> - ${readableDate(item.date)}</li>`).join("")}
</ul>
    </section>`;
		}
	});
}
