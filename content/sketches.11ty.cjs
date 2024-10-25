const path = require('path');
const makeLocalThumbnail = require('../utils/image.cjs');
const SKETCH_DIR = '/home/sacha/sync/sketches';

module.exports = class Home {
  data() {
    return {
      layout: 'layouts/base',
      title: 'Sketches',
      permalink: false,
    };
  }
  async render(data) {
    const images =
          await Promise.all(data.sketches.slice(0, 5).map((img) => makeLocalThumbnail(path.join(SKETCH_DIR, img.filename))));
    const photoswipeLink = function(img, index) {
      return `<a class="photoswipe" data-index=${index} data-src=${img.src} data-width=${img.width} data-height=${img.height} href="${img.src}">${img.title}</a>`;
    };
    
    return `<ul class="images">
${images.map((img, index) => `<li>${photoswipeLink(img, index)}</li>`).join("\n")}
</ul>
<script>
</script>`;
  }
};
