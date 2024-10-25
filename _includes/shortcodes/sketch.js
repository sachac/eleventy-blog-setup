import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
const DATA_DIR = '/home/sacha/sync/sketches';
const THUMBNAIL_DIR = '/home/sacha/sync/sketches/thumbnails/300x300';

async function findImageByFilename(filename) {
  let sketches = await fs.promises.readdir(DATA_DIR);
	sketches = sketches.filter((f) => f.match(/\.(jpe?g|png|svg)$/));
  if (filename.match(/%/)) { filename = decodeURIComponent(filename); }
  if (filename.match(/%/)) { filename = decodeURIComponent(filename); }
  if (filename.match('/')) { filename = path.basename(filename); }
  let id = filename.match(/^[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]([a-z]|-[0-9][0-9])?/);
  let f = filename.replace(/\.(jpe?g|png|svg)$/i, '').replace('&amp;', '&');
  let m = f.match(/^[^#]+/);
  let file = sketches.find((x) => path.parse(x).name == filename);
	if (!file) {
		file = sketches.find((x) => path.parse(x).name.replace(' #.*') == filename);
	}
  if (!file) {
		file = sketches.find((x) => x.startsWith(filename));
	}
  if (!file) {
    file = sketches.find((x) => x.startsWith(m[0]));
  }
  if (!file) {
    file = sketches.find((x) => x.startsWith(id[0]));
  }
  return file;
}

async function sketchThumbnailShortcode(filename, cap) {
  const { page, full, caption, fullMetadata, thumbnail, thumbMetadata } = await getSketchInfo(filename, cap);
  return `<div class="sketch-thumbnail"><a class="photoswipe" href="${page}" data-src="${full}" data-title="${caption}" data-w="${fullMetadata?.width}" data-h="${fullMetadata?.height}"><picture>
      <img
        src="${thumbnail}"
        width="${thumbMetadata?.width}"
        height="${thumbMetadata?.height}"
        alt="${caption}"
        loading="lazy"
        decoding="async">
      <figcaption>${caption}</figcaption>
    </picture></a></div>`;
}

export async function getSketchInfo(filename, cap) {
  let actualFilename = await findImageByFilename(filename);
  let encoded = encodeURIComponent(actualFilename);
  let page = 'https://sketches.sachachua.com/filename/' + encoded;
  let thumbnail = 'https://sketches.sachachua.com/thumbnails/' + encoded;
  let full = 'https://sketches.sachachua.com/static/' + encoded;
  if (!actualFilename) {
    console.log(filename, actualFilename);
  }
  let thumbFile = path.join(THUMBNAIL_DIR, actualFilename);
  let fullFile = path.join(DATA_DIR, actualFilename);
  let thumbMetadata, fullMetadata;
  try {
    fs.accessSync(thumbFile);
    thumbMetadata = await sharp(thumbFile).metadata();
  } catch (err) {
    thumbMetadata = null;
  }
  
  try {
    fullMetadata = await sharp(fullFile).metadata();
  } catch (err) {
    console.log(filename, actualFilename);
  }
  let caption = cap || path.parse(actualFilename).name;
  return { actualFilename, encoded, page, thumbnail, full, thumbFile, fullFile, thumbMetadata, fullMetadata, caption };
}

async function sketchFullShortcode(filename, cap) {
  const { actualFilename, page, full, caption, fullMetadata } = await getSketchInfo(filename, cap);
  return `<div class="sketch-full"><a class="photoswipe" href="${page}" data-src="${full}" data-title="${caption}" data-w="${fullMetadata?.width}" data-h="${fullMetadata?.height}"><picture>
      <img
        src="${full}"
        width="${fullMetadata?.width}"
        height="${fullMetadata?.height}"
        alt="${caption}"
        loading="lazy"
        style="max-height: 90vw; height: auto; width: auto"
        decoding="async">
      <figcaption>${caption}</figcaption>
    </picture></a></div>`;
}

async function sketchLinkShortcode(filename, cap) {
  const { page, full, caption, fullMetadata } = await getSketchInfo(filename, cap);
  return `<a class="photoswipe sketch-link" href="${page}" data-src="${full}" data-title="${caption}" data-w="${fullMetadata?.width}" data-h="${fullMetadata?.height}">${caption}</a>`;
}

export default function(eleventyConfig) {
  eleventyConfig.addAsyncShortcode("sketch", sketchThumbnailShortcode);
  eleventyConfig.addAsyncShortcode("sketchThumb", sketchThumbnailShortcode);
  eleventyConfig.addAsyncShortcode("sketchFull", sketchFullShortcode);
  eleventyConfig.addAsyncShortcode("sketchLink", sketchLinkShortcode);
};
