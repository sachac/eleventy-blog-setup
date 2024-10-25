import moment from 'moment';
export default async function(data) {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html lang="en-US" xmlns="http://www.w3.org/1999/xhtml">
${this.headTag(data)}
<body class="${data.bodyClasses || ''}" style="zoom: 1">
${this.siteHeader(data)}
      <div class="body" id="main">
    ${await data.content}
</div>
${this.siteFooter(data)}
</body>
</html>`;};
