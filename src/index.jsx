import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app.jsx';


import 'bootstrap';
import './main.scss';

import debug from 'debug';

const appConf = {
  buildTS: APP_BUILD_TS,
  buildOS: APP_BUILD_OS,
  debug: APP_DEBUG
};

debug.enable('_cap:*');
const dbg = debug('_cap:main');
dbg('appConf: %j', appConf);

ReactDOM.render(
  <App 
    conf={appConf}
  />,
  document.getElementById('root')
);
