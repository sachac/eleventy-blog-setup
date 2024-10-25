module.exports = function (eleventyConfig) {
  eleventyConfig.addShortcode('photoswipeLink',
                              function(img, index) {
                                return `<a class="photoswipe" data-index=${index} data-src=${img.src} data-width=${img.width} data-height=${img.height} href="${img.src}">${img.title}</a>`;
                              });
  eleventyConfig.addShortcode('', function () {
    return '';
  });
};
