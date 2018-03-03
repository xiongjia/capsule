import debug from 'debug';

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

export default class Context {
  constructor() {
    initDbgLog(appConf);
    this.dbg = this.mkDbgLog('misc');
    this.dbg('appConf = %j', appConf);
  }

  mkDbgLog(prefix) {
    return  debug(`${dbgLogPrefix}:${prefix}`);
  }

  mkSitePath(src) {
    return `${appConf.siteRoot}${src}`;
  }
};
