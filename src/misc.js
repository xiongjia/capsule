'use strict';

import debug from 'debug';

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

export default class Misc {
  constructor() {
    initDbgLog({ debug: true });
    this.dbg = this.mkDbgLog('misc');
    this.dbg('appConf = %j', appConf);
  }

  mkDbgLog(prefix) {
    return  debug(`${dbgLogPrefix}:${prefix}`);
  }
};
