export default async function handleImages(rawContent, outputPath) {
  let selector = 'img';
  let content = rawContent;
  if (outputPath.endsWith('.html')) {
    const dom = new JSDOM(content);
    const remoteImages = [...dom.window.document.querySelectorAll(selector)].filter(img => img.getAttribute('src').match(/(https?|file):\/\//));
    if (remoteImages.length > 0) {

      await Promise.all(remoteImages.map(img => {

        let src = img.getAttribute('src');
        let matches = src.match(/https?:\/\/sachachua\.com\/blog\/wp-content\/uploads\/(.*)/);
        if (matches) {
          const UPLOAD_DIR = '/uploads/';
          src = path.join(UPLOAD_DIR, matches[1]);
          console.log('Rewriting upload', src);
        }
        // let data = makeLocalThumbnail(src);
        // img.setAttribute('data-w', data.w);
        // img.setAttribute('data-h', data.h);
        // img.setAttribute('data-src', data.src);
        // img.setAttribute('data-title', img.getAttribute('title') || data.title);
        // img.setAttribute('src', data.src);
        // if (!img.getAttribute('width')) {
        //   img.setAttribute('width', data.w);
        // }
        // if (!img.getAttribute('height')) {
        //   img.setAttribute('height', data.h);
        // }
      }));
      content = dom.serialize();
    }
  }
  return content;
};
