// Import modules to include

module.exports = async function (eleventyConfig) {
  await require('./shortcodes/index.cjs')(eleventyConfig);
  require('./filters/index.cjs')(eleventyConfig);
  return;
};
