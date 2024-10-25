module.exports = (eleventyConfig) => {
  eleventyConfig.addShortcode('guid', function(item) {
    if (item.data.id) {
      return this.absoluteUrl('/blog/', item.data.metadata.url) + '?p=' + item.data.id;
    } else {
      return this.absoluteUrl(item.url, item.data.metadata.url);
    }
  });
};
