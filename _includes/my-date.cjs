const builtinFormats = {
  isoDate: 'yyyy-LL-dd',
}

function buildFilter(locale, format) {
  function toDateTime(dateObj) {
    return new Date(dateObj);
  }

  if (typeof format === 'string') {
    return (dateObj) => {
      return toDateTime(dateObj).toFormat(format);
    }
  } else if (typeof format === 'object') {
    return (dateObj) => {
      return toDateTime(dateObj).toLocaleString(locale, format);
    }
  }
}

module.exports = {
  initArguments: {},
  configFunction(eleventyConfig, options = {}) {
		const { locale = 'en-US', includeDefaults = true } = options;

    const formats = Object.assign({}, includeDefaults ? builtinFormats : {}, options.formats);

    for (const [name, format] of Object.entries(formats)) {
      eleventyConfig.addFilter(name, buildFilter(locale, format));
    }
  }
};
