import { DeepCopy } from "@11ty/eleventy-utils";

/**
	 I want to rewrite absolute links to my site to relative links when in development mode and handling HTML pages.
	 */

// pathprefix is only used when overrideBase is a full URL
function transformUrl(url, base, opts = {}) {

}

function RewriteLinksPlugin(eleventyConfig, defaultOptions = {}) {
	let opts = DeepCopy(
		{
			// eleventyConfig.pathPrefix is new in Eleventy 2.0.0-canary.15
			// `base` can be a directory (for path prefix transformations)
			//    OR a full URL with origin and pathname
			baseHref: eleventyConfig.pathPrefix,
			extensions: "html",
		},
		defaultOptions,
	);

	// `filters` option to rename filters was removed in 3.0.0-alpha.13
	// Renaming these would cause issues in other plugins (e.g. RSS)
	if (opts.filters !== undefined) {
		throw new Error(
			"The `filters` option in the HTML Base plugin was removed to prevent future cross-plugin compatibility issues.",
		);
	}

	if (opts.baseHref === undefined) {
		throw new Error("The `base` option is required in the HTML Base plugin.");
	}

	// Apply to all HTML output in your project
	eleventyConfig.htmlTransformer.addUrlTransform(
		opts.extensions,
		/** @this {object} */
		function (url) {
			if (url.startsWith(opts.baseHref)) {
				return url.substring(opts.baseHref.length);
			}
			else {
				return url;
			}
		},
		{
			priority: -2, // run last (especially after PathToUrl transform)
			enabled: function (context) {
				// Enabled when pathPrefix is non-default or via renderTransforms
				return context.baseHref || opts.baseHref !== "/";
			},
		},
	);
}

Object.defineProperty(RewriteLinksPlugin, "eleventyPluginOptions", {
	value: {
		unique: true,
	},
});

export default RewriteLinksPlugin;
