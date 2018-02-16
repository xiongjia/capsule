import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app.jsx';
import { Context } from './misc.js';

import 'bootstrap';
import 'font-awesome/css/font-awesome.css';
import './main.scss';

const context = new Context();

ReactDOM.render(
  <App
    context={context}
  />,
  document.getElementById('root')
);
