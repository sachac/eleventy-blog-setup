module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode('itemLink', (item) => `<a href="${item.url}">${item.title}</a>`);
};
