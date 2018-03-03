
import Context from './context.js';
import each from 'lodash/each';
import values from 'lodash/values';
import moment from 'moment';

export const appContext = new Context();

export class Items {
  constructor(opts) {
    this.srcSet = {};
    this.add(opts);
  }

  add(item = {}) {
    const { src } = item;
    if (!src) {
      return;
    }

    this.srcSet[src] = {
      src: appContext.mkSitePath(src),
      thumbnail: appContext.mkSitePath(item.thumbnail || src),
      size: { width: 480, height: 480 },
      sizeThumbnail: { width: 220, height: 220 },
      tags: item.tags || [],
      caption: item.caption || '',
      date: item.date ? moment(item.date, 'YYYY-MM-DD') : undefined
    };
  }

  items() {
    return values(this.srcSet);
  }

  loadFromJson(content = []) {
    each(content, (item) => this.add(item));
  }
}
