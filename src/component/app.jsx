import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Lightbox from './lightbox.jsx';
import { Items } from '../misc.js';
import content from '../content.json';

const Header = () => {
  return (
    <div className='page-header'>
      <h1>Ingress bookmarks</h1>
      <p className='text-success'>My Ingress bookmarks</p>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div>
      <div className='input-group input-group-sm'>
        <div className='input-group-text'>
          <i className='fa fa-search' />
        </div>
        <input
          type='text'
          className='form-control'
          placeholder='Search ... (To Be Implemented)'
        />
      </div>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);

    const { context } = props;
    this.dbg = context.mkDbgLog('app');
    this.dbg('content %j', content);
    this.srcItems = new Items({ context });
    this.srcItems.loadFromJson(content);
  }

  render() {
    const { value, onIncClick, onDecClick } = this.props;

    return (
      <div>
        <section className='container'>
          <Header />
          <br />
          <button onClick={onIncClick}>inc</button>
          <button onClick={onDecClick}>dec</button>
          <br />
          <span>{value}</span>
        </section>

        <hr />
        <section className='container'>
          <SearchBar />
          <br />
          <Lightbox
            context={this.props.context}
            srcItems={this.srcItems.items()}
          />
        </section>
      </div>
    );
  }
}

App.propTypes = {
  value: PropTypes.number.isRequired,
  onIncClick: PropTypes.func.isRequired,
  onDecClick: PropTypes.func.isRequired
};

export default connect(
  (state) => {
    return { value: state.count }; 
  },
  (dispatch) => {
    return {
      onIncClick: () => dispatch({ type: 'INCREMENT' }),
      onDecClick: () => dispatch({ type: 'DECREMENT' })
    };
  }
)(App);
