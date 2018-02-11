import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app.jsx';
import Misc from './misc.js';

import 'bootstrap';
import './main.scss';

const misc = new Misc();

ReactDOM.render(
  <App
    misc={misc}
  />,
  document.getElementById('root')
);
