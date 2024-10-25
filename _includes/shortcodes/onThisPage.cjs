module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode('onThisPage', function (list) {
    return `<nav class="on-this-page">
On this page:
<ul>
${list.map((item, index) => {
return `<li><a class="toc-link" data-index="index${index}" href="${item.url}">${item.data.title}</a></li>`;
}).join("\n")}
</ul>
</nav>`;
  });
};
