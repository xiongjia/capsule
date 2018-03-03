import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './reducers';
import App from './container/app.jsx';

import 'bootstrap';
import './main.scss';

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>  
    <App />
  </Provider>,
  document.getElementById('root')
);
