import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Root from './containers/root.jsx';
import { configureStore } from './store';

import 'bootstrap';
import './main.scss';

const store = configureStore();

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
);
