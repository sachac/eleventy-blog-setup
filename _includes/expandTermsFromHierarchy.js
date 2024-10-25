import _ from 'lodash';

export default function(terms, hierarchy) {
    // Add each of the parents as well
    return _.uniq((terms || []).reduce((prev, cur) => {
      let cat = hierarchy.find((o) => o.name == cur || o.slug == cur);
      if (cat == null) {
        prev.push(cur);
        return prev;
      } else {
        while (cat != null) {
          prev.push(cat.slug);
          cat = hierarchy.find((o) => o.slug == cat.parent);
        }
        return prev;
      }
    }, []));
  };
