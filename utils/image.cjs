const Image = require("@11ty/eleventy-img");
const path = require('path');


async function makeLocalThumbnail(filename) {
  let src = filename;
  let metadata = await Image(src, {
    widths: [1000, 300],
    formats: ["webp", "jpeg"],
    urlPath: '/thumbnails/',
    outputDir: './_site/thumbnails/',
    filenameFormat: function (id, src, width, format, options) {
      // Define custom filenames for generated images
      return path.basename(src).replace(/ *\.[^\.]+$/, '').replace(/#/g, '!') + `--${id}-${width}.${format}`;
    }
  });
  return { src: metadata.jpeg[0].url, 
           w: metadata.jpeg[0].width, 
           h: metadata.jpeg[0].height,
           title: filename.replace(/ *\.[^\.]+$/, ''),
           metadata: metadata};
};
module.exports = makeLocalThumbnail;
