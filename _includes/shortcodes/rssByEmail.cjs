module.exports = eleventyConfig =>
eleventyConfig.addShortcode('rssByEmail', function(url) {
  return `<a href="mailto:add@rssby.email?subject=${url}&body=${url}">Subscribe via email</a>`;
});
