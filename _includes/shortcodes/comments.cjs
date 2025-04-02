function formatCommentEntry(comment) {
	return `<div class="static-comments-reply" id="comment-${comment.postId}">
    <div class="static-comments-hed">
        <h4 class="static-comments-title">${comment.author}</h4>
        <em class="static-comments-date"><a href="#comment-${comment.postId}">${comment.date}</a></em>
    </div>
    <div class="static-comments-msg">${comment.message}</div>
    ${comment.replies?.map((reply) => formatCommentEntry(reply)).join("\n") || ''}
    </div>`;
}

module.exports = function(eleventyConfig) {
	function formatDisqusComments(data) {
		const disqus = data?.disqus || data?.data?.disqus;
		const comments = disqus?.comments?.map(formatCommentEntry).join("\n") || '';
		if (disqus?.commentCount > 0) {
			const plural = disqus.commentCount == 1 ? '' : 's';
			return `<details open><summary><h3>${disqus.commentCount} comment${plural}</h3></summary>${comments}</details>`;
		} else {
			return '';
		}
	}

	function getCommentChoices(data, ref) {
		const mastodonUrl = data.mastodon || data.page?.mastodon || data.data?.mastodon;
		const mastodon = mastodonUrl && `<a href="${mastodonUrl}" target="_blank" rel="noopener noreferrer">comment on Mastodon</a>`;
		const url = ref.absoluteUrl(data.url || data.permalink || data.data?.url || data.data?.permalink, data.metadata?.url || data.data?.metadata?.url);
		const subject = encodeURIComponent('Comment on ' + url);
		const body = encodeURIComponent("Name you want to be credited by (if any): \nMessage: \nCan I share your comment so other people can learn from it? Yes/No\n");
		const email = `<a href="mailto:sacha@sachachua.com?subject=${subject}&body=${body}">e-mail me at sacha@sachachua.com</a>`;
		const disqus = data?.disqus || data?.data?.disqus;
		let commentLink = '';
		if (disqus?.commentCount > 0) {
			const plural = disqus.commentCount == 1 ? '' : 's';
			commentLink = `<a href="${url}#comment">view ${disqus.commentCount} comment${plural}</a>`;
		}
		return { mastodon, commentLink, email };
	}

	function formatChoices(list, conjunction) {
		const validChoices = list.filter(Boolean);
    if (validChoices.length === 0) {
			return "";
		}
    if (validChoices.length === 1) {
			return validChoices[0];
		}
		if (validChoices.length === 2) {
			return `${validChoices[0]} ${conjunction} ${validChoices[1]}`;
		}
		const lastItem = validChoices.pop();
		return `${validChoices.join(", ")}, ${conjunction} ${lastItem}`;
	}

  if (eleventyConfig) {
		eleventyConfig.addShortcode('comments', function(data, linksOnly=false) {
		const { mastodon, commentLink, email } = getCommentChoices(data, this);
		const comments = formatDisqusComments(data);
		const commentChoices = "You can " + formatChoices([mastodon, commentLink, email], "or") + ".";
		if (linksOnly) {
			return commentChoices;
		} else {
			return `<div id="comment"></div>
${commentChoices}

${comments}`;}
		});
	}
}
