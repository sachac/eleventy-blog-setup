/**
 * @file Defines a shortcode for the page header
 * @author Reuben L. Lillie <reubenlillie@gmail.com>
 * @see {@link https://www.11ty.dev/docs/languages/javascript/#javascript-template-functions JavaScript template functions in 11ty}
 */

/**
 * A JavaScript Template module for the page header
 * @module _includes/shortcodes/site-header
 * @param {Object} eleventyConfig 11ty’s Config API
 */
module.exports = eleventyConfig =>

  /**
   * The page header markup
   * @method
   * @name siteHeader
   * @param {Object} data 11ty’s data object
   * @return {String} The rendered shortcode
   * @example `${this.siteHeader(data)}`
   * @see {@link https://www.11ty.dev/docs/data/ Using data in 11ty}
   */
  eleventyConfig.addShortcode('siteHeader', function (data) {
    // Inform screen readers when the home page link is for the current page
    return `<header id="site_header">
      <a href="#main" class="screen-reader-text">Skip to content</a>
<div class="sticky contain-to-grid top-menu">
  <nav class="top-bar">
    <ul class="links">
      <li><a href="/topic">Topics</a></li>
      <li><a href="/blog/contact/">Contact</a></li>
      <li><a href="/blog/search/">Search</a></li>
      <li><a href="/blog/random/?redirect">Random</a></li>
      <li><a href="#footer">Footer</a></li>
    </ul>
  </nav>
</div>
  <h1>
    <a id="site-logo-link" href="/blog"><img id="site-logo" src="${ data.metadata.siteLogo }" width="640" height="116" alt="${ data.metadata.title }"></a>
  </h1>
</header>`;
  });
