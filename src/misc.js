'use strict';

import debug from 'debug';
import each from 'lodash/each';
import values from 'lodash/values';

const dbgLogPrefix = '_cap';

const appConf = {
  buildTS: APP_BUILD_TS,
  buildOS: APP_BUILD_OS,
  debug: APP_DEBUG,
  siteRoot: APP_SITE_ROOT || '/'
};

const initDbgLog = (opts) => {
  if (opts.debug) {
    debug.enable(`${dbgLogPrefix}:*`);
  } else {
    debug.disable();
  }
};

export class Context {
  constructor() {
    initDbgLog(appConf);
    this.dbg = this.mkDbgLog('misc');
    this.dbg('appConf = %j', appConf);
  }

  mkDbgLog(prefix) {
    return  debug(`${dbgLogPrefix}:${prefix}`);
  }

  getSitePath(src) {
    return `${appConf.siteRoot}${src}`;
  }
};

export class Items {
  constructor(opts) {
    this.context = opts.context;
    this.srcSet = {};
    this.add(opts);
  }

  add(item = {}) {
    const { src } = item;
    if (!src) {
      return;
    }

    this.srcSet[src] = {
      src: this.context.getSitePath(src),
      thumbnail: this.context.getSitePath(item.thumbnail || src),
      size: { width: 480, height: 480 },
      sizeThumbnail: { width: 220, height: 220 }      
    };
  }

  items() {
    return values(this.srcSet);
  }

  loadFromJson(content = []) {
    each(content, (item) => this.add(item));
  }
}
