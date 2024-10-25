module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode('listWithNav', async function(list, type) {
    return (type == 'post' ? this.onThisPage(list) : '') + await this.archive(list, type);
  });
};
