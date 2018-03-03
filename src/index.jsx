import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import App from './component/app.jsx';
import { Context } from './misc.js';

import 'bootstrap';
import './main.scss';

const store = createStore(reducers);
const context = new Context();

ReactDOM.render(
  <Provider store={store}>  
    <App context={context} />
  </Provider>,
  document.getElementById('root')
);
