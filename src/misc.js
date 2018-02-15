'use strict';

import debug from 'debug';
import each from 'lodash/each';
import values from 'lodash/values';

const dbgLogPrefix = '_cap';

const appConf = {
  buildTS: APP_BUILD_TS,
  buildOS: APP_BUILD_OS,
  debug: APP_DEBUG
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
    initDbgLog({ debug: true });
    this.dbg = this.mkDbgLog('misc');
    this.dbg('appConf = %j', appConf);
  }

  mkDbgLog(prefix) {
    return  debug(`${dbgLogPrefix}:${prefix}`);
  }
};

export class Items {
  constructor(opts) {
    this.srcSet = {};
    this.add(opts);
  }

  add(opts = {}) {
    each(opts.srcSet || [], (item) => {
      const { src } = item;
      this.srcSet[src] = {
        src: src,
        thumbnail: item.thumbnail || src,
        size: { width: 480, height: 480 },
        sizeThumbnail: { width: 220, height: 220 }
      };
    });
  }

  items = () => values(this.srcSet);
}
