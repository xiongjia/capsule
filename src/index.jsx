import React from 'react';
import ReactDOM from 'react-dom';
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

const App = () => {
  return (
    <p>test</p>
  );
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

