module.exports = function (eleventyConfig) {
  eleventyConfig.addPairedShortcode(
    'details',
    function(content, title, open) {
      return `<details class="code-details"
                 style="padding: 1em;
                 border-radius: 15px;
                 font-size: 0.9em;
                 box-shadow: 0.05em 0.1em 5px 0.01em  #00000057;"${open ? " open" : ""}>
                  <summary><strong>${title}</strong></summary>${content}</details>`;
    });
};
