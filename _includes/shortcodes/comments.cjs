const pluginRss = require('@11ty/eleventy-plugin-rss');
module.exports = function(eleventyConfig) {
	function getCommentChoices(data, ref) {
		const mastodonUrl = data.mastodon || data.page?.mastodon || data.data?.mastodon;
		const mastodon = mastodonUrl && `<a href="${mastodonUrl}" target="_blank" rel="noopener noreferrer">comment on Mastodon</a>`;
		const url = ref.absoluteUrl(data.url || data.permalink || data.data?.url || data.data?.permalink, data.metadata?.url || data.data?.metadata?.url);
		const subject = encodeURIComponent('Comment on ' + url);
		const body = encodeURIComponent("Name you want to be credited by (if any): \nMessage: \nCan I share your comment so other people can learn from it? Yes/No\n");
		const email = `<a href="mailto:sacha@sachachua.com?subject=${subject}&body=${body}">e-mail me at sacha@sachachua.com</a>`;
		const disqusLink = url + '#comment';
		const disqusForm = data.metadata?.disqusShortname && `<div id="disqus_thread"></div>
<script>
 var disqus_config = function () {
   this.page.url = "${url}";
   this.page.identifier = "${data.id || ''} ${data.metadata?.url || ''}?p=${ data.id || data.permalink || this.page?.url}";
   this.page.disqusTitle = "${ data.title }"
   this.page.postId = "${ data.id || data.permalink || this.page?.url }"
 };
 (function() { // DON'T EDIT BELOW THIS LINE
   var d = document, s = d.createElement('script');
   s.src = 'https://${ data.metadata?.disqusShortname }.disqus.com/embed.js';
   s.setAttribute('data-timestamp', +new Date());
   (d.head || d.body).appendChild(s);
 })();
</script>
<noscript>Disqus requires Javascript, but you can still e-mail me if you want!</noscript>`;
		return { mastodon, disqusLink, disqusForm, email };
	}
  eleventyConfig.addShortcode('comments', function(data, linksOnly=false) {
		const { mastodon, disqusForm, disqusLink, email } = getCommentChoices(data, this);
		if (linksOnly) {
			return `You can ${mastodon ? mastodon + ', ' : ''}<a href="${disqusLink}">comment with Disqus (JS required)</a>${mastodon ? ',' : ''} or ${email}.`;
		} else {
			return `<div id="comment"></div>
You can ${mastodon ? mastodon + ', ' : ''}comment with Disqus (JS required)${mastodon ? ', ' : ''} or you can ${email}.
${disqusForm || ''}`;}
	});
}
