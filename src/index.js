'use strict';

import debug from 'debug';

const appConf = {
  buildTS: APP_BUILD_TS,
  buildOS: APP_BUILD_OS,
  debug: APP_DEBUG
};

debug.enable('_cap:*');
const dbg = debug('_cap:main');
dbg('appConf: %j', appConf);

const root = document.getElementById('root');
root.innerHTML = `
<strong>Webpack2</strong> tests <br>
<button id="testBtn" type="button" class="btn btn-primary">Primary</button>
`;


