module.exports = eleventyConfig =>
  eleventyConfig.addShortcode('siteFooter', function (data) {
    return `<footer class="footer" id="footer">
  <ul class="links">
    <li><a href="/blog">Home</a></li>
    <li><a href="/blog/about/">About</a></li>
    <li><a href="/topic/">Topics</a></li>
    <li><a href="/blog/all/">Archives</a></li>
    <li><a href="/blog/privacy">Privacy</a>
    <li><a href="/blog/contact">Contact</a>
    <li><a href="/blog/subscribe">Subscribe</a></li>
    <li><a href="/blog/feed">RSS feed</a></li>
    <li><a href="/topic/blogroll">Blogroll</a></li>
    <li><a href="/blog/random/#redirect">Random</a></li>
    <li><a href="https://sketches.sachachua.com">Sketches</a></li>
  </ul>
<p><a rel="me" href="mailto:sacha@sachachua.com">Email</a> - <a rel="me" href="https://social.sachachua.com/@sacha">Mastodon</a> - <a rel="me" href="https://github.com/sachac/">Github</a></p>
  <p>
    Copyright &#169; 2001-2024 Sacha Chua (<a href="mailto:sacha@sachachua.com">sacha@sachachua.com</a>). Emacs code snippets are generally under <a href="https://www.gnu.org/licenses/gpl-3.0.en.html">GPLv3+</a>; other snippets are dual-licensed under the <a href="https://opensource.org/licenses/MIT">MIT License</a> or GPLv3+ unless otherwise indicated. Please feel free to reuse or share stuff under a <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons Attribution</a> license unless otherwise noted. Thanks for reading!
  </p>
</footer>
<script src="/assets/js/bigger-picture.min.js"></script>
<script src="/assets/js/svg-pan-zoom.min.js"></script>
<script defer src="/assets/js/misc.js"></script>`;
  });
