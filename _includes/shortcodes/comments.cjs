module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode('comments', function(data) {
		return `<div id="comment"></div>
You can comment with Disqus or you can <a href="mailto:sacha@sachachua.com?subject=Comment on ${this.absoluteUrl(data.permalink, data.metadata.url)}&body=Name you want to be credited by (if any): %0D%0AMessage: %0D%0A">e-mail me at sacha@sachachua.com</a>.
<div id="disqus_thread"></div>
<script>
 var disqus_config = function () {
   this.page.url = "${this.absoluteUrl(data.permalink, data.metadata.url)}";
   this.page.identifier = "${data.id || ''} ${data.metadata.url}?p=${ data.id || data.permalink || this.page.url}";
   this.page.disqusTitle = "${ data.title }"
   this.page.postId = "${ data.id || data.permalink || this.page.url }"
 };
 (function() { // DON'T EDIT BELOW THIS LINE
   var d = document, s = d.createElement('script');
   s.src = 'https://${ data.metadata.disqusShortname }.disqus.com/embed.js';
   s.setAttribute('data-timestamp', +new Date());
   (d.head || d.body).appendChild(s);
 })();
</script>
<noscript>Disqus requires Javascript, but you can still e-mail me if you want!</noscript>`;});
};
