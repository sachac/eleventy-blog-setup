import path from "path";
import fs from "fs";

import getCategoryVideos from "../_includes/getCategoryVideos.js";

export default class YayEmacs {
	data() {
		return {
			permalink: '/yay-emacs/',
			changefreq: "daily",
      layout: 'layouts/base',
			eleventyExcludeFromCollections: true,
			title: 'Yay Emacs!'
		}
	}
	render(data) {
		const category = 'yay-emacs';
		const posts = data.collections._posts.filter((o) => o.data?.expandedCategories?.indexOf(category) >= 0);
		const videos = getCategoryVideos(data, 'yay-emacs', posts);
		const videoList = videos.map((o) => {
			return {sources: [{src: o.url,
												 type: 'video/webm'}],
							title: o.title,
							post: o.post
						 };
		});
		const nonVideo = posts.filter((o) => !videos.find((v) => v.title == o.data.title));
		let nonVideoString = "";
		if (nonVideo.length > 0) {
			nonVideoString = '<div>Other posts<ul>' + nonVideo.map((o) => `<li><a href="${o.data.url}">${o.data.title}</a></li>`).join("\n") + '</ul></div>';
		}
		const postList = videos.map((v) => {
			return `
<li><a href="${v.post}" class="play-video" data-post="${v.post}">${v.title}</a></li>
`;
		}).join('');
		return `<link href="https://vjs.zencdn.net/8.16.1/video-js.css" rel="stylesheet" />
<div style="display: flex"><a style="display: block; flex-grow: 1" class="video-link"></a><button id="shuffle">Shuffle</button></div>
<div style="display: flex">
<video id="category-video" class="video-js" controls preload="auto"
data-setup="{}">
 <p class="vjs-no-js">
      To view this video please enable JavaScript, and consider upgrading to a
      web browser that
      <a href="https://videojs.com/html5-video-support/" target="_blank"
        >supports HTML5 video</a
      >.
    </p>
</video><ul id="post-list">
${postList}
</ul>
${nonVideoString}
</div>
<script>
window.videoList = ${JSON.stringify(videoList)};
</script>
<script src="https://vjs.zencdn.net/8.16.1/video.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/videojs-playlist@5.2.0/dist/videojs-playlist.js"></script>
<script type="module" src="/assets/js/media.js"></script>
<style>
li.current { background-color: lightyellow }
li.current a { background-color: unset }</style>
`;

	}
};
