/**
 * @file Defines a shortcode for the `<head>` markup
 * @author Sacha Chua <sacha@sachachua.com>
 */

/**
 * A JavaScript Template module for the `<head>`
 * @module _includes/shortcodes/head-tag
 * @param {Object} eleventyConfig 11ty’s Config API
 */
module.exports = eleventyConfig =>
  /**
   * HTML `<head>` markup
   * @method
   * @name headTag
   * @param {Object} data 11ty’s data object
   * @return {String} The rendered shortcode
   * @example `${this.headTag(data)}`
   * @see {@link https://www.11ty.dev/docs/data/ Using data in 11ty}
   */
eleventyConfig.addShortcode('headTag', function (data) {
  let title = ((data && data.title) || (data.page && data.page.title)) + ' :: ' + (data && data.metadata && data.metadata.title);
  let atom = data.atom ? `<link rel="alternate" type="application/atom+xml" title="${title} - ATOM" href="${data.atom}" />` : '';
  let rss = data.rss ? `<link rel="alternate" type="application/rss+xml" title="${title} - RSS" href="${data.rss}" />` : '';
return `<head profile="http://gmpg.org/xfn/11">
<script
  src="/assets/js/jquery-3.5.1.slim.min.js"
  integrity="sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs="
  crossorigin="anonymous"></script>
<script defer src="/assets/js/photoswipe.js"></script>
<script defer src="/assets/js/photoswipe-ui-default.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
<title>${title}</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />	
<meta name="generator" content="11ty" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=yes" />
<meta name="google-site-verification" content="ktFeZ-wntcsTZ0G2mnZF0uKejd6L9YKHrlyGOezAiQU" />
<link rel="preload" href="/assets/sachacHand-Regular.woff" as="font" />
<link rel="stylesheet" href="//www.google.com/cse/style/look/default.css" type="text/css" /> 
<link href='//fonts.googleapis.com/css?family=Open+Sans&display=swap' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="/assets/css/style.css?date=2024-01-05" type="text/css" />
<link rel="stylesheet" href="/assets/css/photoswipe.css" type="text/css" />
<link rel="stylesheet" href="/assets/css/default-skin/default-skin.css" type="text/css" />
${atom}
${rss}
<link rel="alternate" type="application/rss+xml" title="Feed (~daily)" href="/blog/feed" />
<link rel="alternate" type="application/rss+xml" title="Weekly reviews" href="/blog/category/weekly/feed" />
<link rel="alternate" type="application/rss+xml" title="Monthly reviews" href="/blog/category/monthly/feed" />
<link rel="alternate" type="application/rss+xml" title="Yearly reviews" href="/blog/category/yearly/feed" />
<link rel="alternate" type="application/rss+xml" title="Only Emacs posts" href="/blog/category/emacs/feed/" />
<link rel="alternate" type="text/xml" title="RSS .92" href="https://sachachua.com/blog/feed/rss/" />
<link rel="alternate" type="application/atom+xml" title="Atom 0.3" href="https://sachachua.com/blog/feed/atom/" />
<link rel="canonical" href="${ this.absoluteUrl(data.page.url, data.metadata.url) }" />
</head>`;
  });
