module.exports = eleventyConfig =>
eleventyConfig.addShortcode('timeInfo', function(item) {
  let timeInfo = this.readableDate(new Date(item.date || item.data && item.data.date));
  if (item.modified || item.data && item.data.modified) {
    let modified = this.readableDate(new Date(item.modified || item.data && item.data.modified));
    if (modified != timeInfo) {
      timeInfo = `Posted: <time>${timeInfo}</time> - Modified: <time>${modified}</time>`;
    } else {
      timeInfo = `<time>${timeInfo}</time>`;
    }
  } else {
    timeInfo = `<time>${timeInfo}</time>`;
  }
  return timeInfo;
});
  
