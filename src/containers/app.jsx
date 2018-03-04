import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { appContext } from '../misc';
import PropTypes from 'prop-types';

import Header from '../components/header.jsx';
import Searcher from '../components/searcher.jsx';
import Lightbox from '../components/lightbox.jsx';

const dbg = appContext.mkDbgLog('app');

class App extends Component {
  constructor(props){
    super(props);
  }
 
  render() {
    const { content } = this.props;
    dbg('data: %j', content);
    /* TODO handle error */

    return (
      <div>
        <Header />
        <section className='container'>
          <Searcher />
          <br />
          <Lightbox srcItems={content.data} />
        </section>
      </div>
    );
  }
}

App.propTypes = {
  content: PropTypes.object.isRequired
};

const mapStateToProps = (state, ownProps) => {
  return state;
};

export default withRouter(connect(mapStateToProps)(App));
