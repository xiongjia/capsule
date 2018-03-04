import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchContent } from '../actions';
import App from './app.jsx';



const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <div>
        <Route path='/' component={App} 
          onEnter={store.dispatch(fetchContent())} />
      </div>
    </Provider>
  );
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default Root;
