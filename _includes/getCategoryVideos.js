import path from "path";
import fs from "fs";
export default function getCategoryVideos(data, category, posts) {
	const list = posts || data.collections._posts.filter((o) => o.data?.expandedCategories?.indexOf(category) >= 0);
	const videos = [];
	for (let item of list) {
		const dir = path.dirname(item.page.inputPath);
		const files = fs.readdirSync(dir);
		const video = files.find((o) => o.match(/webm/));
		if (video) {
			const title = item.data.title;
			videos.push({title,
									 url: item.data.metadata.url + item.data.permalink + video,
									 post: item.data.metadata.url + item.data.permalink,
									 size: fs.statSync(path.join(dir, video)).size,
									 date: item.data.date});
		}
	}
	return videos.reverse();
}
