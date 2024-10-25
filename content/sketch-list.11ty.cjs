module.exports = class SketchList {
  data() {
    return {
      permalink: 'blog/sketch-list.json',
    };
  }
  render(data) {
    return JSON.stringify(data.collections._posts.filter(async (o) => (await o.template.inputContent).match(/sketchFull/)).reverse()
      .reduce(async (prev, o) => {
        return (await prev).concat([...(await o.template.inputContent).matchAll(/{% sketchFull "(.*?)"/g)]
                           .map((match) => { return {url: o.url, title: o.data.title,
                                                     sketch: match[1]}; }));
      }, []));
  }
};
