import pluginRss from "@11ty/eleventy-plugin-rss";
import pluginDate from "./_includes/my-date.cjs";
import moment from "moment";
import * as momentTz from "moment-timezone";
import _ from 'lodash';
import includes from './_includes/index.cjs';
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight";
import makeLocalThumbnail from './utils/image.cjs'; // we need this line or things break
import pageAssetsPlugin from 'eleventy-plugin-page-assets';
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import RewriteLinksPlugin from './_includes/rewriteLinks.js';
import { groupByDateFormat } from './_includes/group.js';
import { taxonomyCollection, taxonomyPages, taxonomyFeed } from './_includes/taxonomyHierarchy.js';
import automaticNoopener from 'eleventy-plugin-automatic-noopener';
import postGraph from '@rknightuk/eleventy-plugin-post-graph';
// import futurePost from 'eleventy-plugin-future-post';

export default async function(eleventyConfig) {
  await includes(eleventyConfig);
  eleventyConfig.addPlugin(pageAssetsPlugin, {
    mode: "parse",
    postsMatching: "blog/**/*.11ty.js",
  });
  //  eleventyConfig.addTransform("handle-images", handleImages);
  eleventyConfig.setTemplateFormats(["html", "md", "liquid", "njk", "11ty.js"]);
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPlugin(pluginRss);
	eleventyConfig.addPlugin(automaticNoopener);
	eleventyConfig.addJavaScriptFunction("absoluteUrl", pluginRss.absoluteUrl);
  eleventyConfig.setDataDeepMerge(true);
	eleventyConfig.addFilter("justYear", (dateString) => {
    dateObj = new Date(dateString);
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy');
	});
  eleventyConfig.addNunjucksFilter("limit", (arr, limit) => arr.slice(0, limit));
	// https://github.com/11ty/eleventy/issues/580
  eleventyConfig.addShortcode("categoryList", (arr) => {
    if (typeof(arr) == 'string') {
      arr = arr.split(/ +/);
    }
    return (arr || []).map((o) => `<a href="/blog/category/${o}">${o}</a>`).join(', ');
  });
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy('.well-known');
	const copyOptions = {
		filter: path => {
			let include = !path.match(/\.(html|json)$/);
			return include;
		}};
  eleventyConfig.addPassthroughCopy('blog', copyOptions);
  eleventyConfig.addPassthroughCopy('topic', copyOptions);
  eleventyConfig.addPassthroughCopy("uploads");
  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy({"assets/icons": "/"});
  ['dateToRfc3339', 'getNewestCollectionItemDate', 'absoluteUrl', 'convertHtmlToAbsoluteUrls'].map((o) => eleventyConfig.addShortcode(o, pluginRss[o]));
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.addPlugin(pluginDate, {
    // Specify custom date formats
    formats: {
      // Change the readableDate filter to use abbreviated months.
      readableDate: { year: "numeric", month: "short", day: "numeric", timeZone: "America/Toronto" },
      // Add a new filter to format a Date to just the month and year.
      readableMonth: { year: "numeric", month: "long", timeZone: "America/Toronto" },
			monthYear: { year: 'numeric', month: 'numeric', timeZone: "America/Toronto"  },
      readableMonthDay: { month: 'short', day: 'numeric', timeZone: "America/Toronto"  },
      // Add a new filter using formatting tokens.
      timeZone: "America/Toronto",
    }});
	// eleventyConfig.addPlugin(futurePost, {debugMode: true});


  eleventyConfig.addCollection('_years', function(collectionApi) {
		return groupByDateFormat(collectionApi, 'YYYY');
  });
  eleventyConfig.addCollection('_months', function(collectionApi) {
		return groupByDateFormat(collectionApi, 'YYYY/MM');
  });

  eleventyConfig.addCollection('_taxonomy', taxonomyCollection);
  const numPages = 5;
  const perPage = 7;
  eleventyConfig.addCollection('_taxonomyPages', function(collectionApi) {
		return taxonomyPages(collectionApi, numPages, perPage, this);
	});
  eleventyConfig.addCollection('_taxonomyFeed', function(collectionApi) {
		return taxonomyFeed(collectionApi, perPage, this);
	});
	eleventyConfig.addPlugin(postGraph);
	eleventyConfig.addPlugin(EleventyHtmlBasePlugin, {
		baseHref: process.env.NODE_ENV == 'production' ? 'https://sachachua.com' : '',
	});

	if (process.env.NODE_ENV != 'production') {
		eleventyConfig.addPlugin(RewriteLinksPlugin, {
			baseHref: 'https://sachachua.com',
		});

		return {
			dir: {
				output: '_local'
			}
		};
	}
};
