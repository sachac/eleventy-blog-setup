module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter('escapeHTML', function(item) { 
    return item.replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  });
};
