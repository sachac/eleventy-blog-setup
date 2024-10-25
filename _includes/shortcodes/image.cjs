const makeLocalThumbnail = require('../../utils/image.cjs');

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 1000],
    formats: ["webp", "jpeg"],
    urlPath: '/thumbnails/',
    outputDir: './_site/thumbnails/',
    // Define custom filenames for generated images
    filenameFormat: function (id, src, width, format, options) {
      return path.basename(src).replace(/#.*/, '') + ` -- ${width}.${format}`;
    }
  });
  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  let lowsrc = metadata.webp[0];
  return `<picture>
    ${Object.values(metadata).map(imageFormat => {
      return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
    }).join("\n")}
      <img
        src="${lowsrc.url}"
        width="${lowsrc.width}"
        height="${lowsrc.height}"
        alt="${alt}"
        loading="lazy"
        decoding="async">
    </picture>`;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);
  eleventyConfig.addLiquidShortcode("image", imageShortcode);
  eleventyConfig.addJavaScriptFunction("image", imageShortcode);
};
