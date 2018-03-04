import debug from 'debug';

const dbgLogPrefix = '_cap';
const assetsContent = 'assets/data/content.json';

const appConf = {
  buildTS: APP_BUILD_TS,
  buildOS: APP_BUILD_OS,
  debug: APP_DEBUG,
  siteRoot: APP_SITE_ROOT || '/',
  defaultTimeout: 1000 * 15
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
    this.dataContent = this.mkSitePath(assetsContent);
    this.timeoutVal = appConf.defaultTimeout;
  }

  mkDbgLog(prefix) {
    return  debug(`${dbgLogPrefix}:${prefix}`);
  }

  mkSitePath(src) {
    return `${appConf.siteRoot}${src}`;
  }

  mkImgSitePath(src) {
    return `${appConf.siteRoot}assets/img/${src}`;
  }
};
