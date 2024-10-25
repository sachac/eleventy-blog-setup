module.exports = function (eleventyConfig) {
  ['escapeHTML'].forEach((o) => require('./' + o + '.cjs')(eleventyConfig));
  return;
};
