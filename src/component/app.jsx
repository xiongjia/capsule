import React from 'react';
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
          <i className='fa fa-search'></i>
        </div>
        <input
          type='text'
          className='form-control'
          placeholder='Search ...'
        />
      </div>
    </div>
  );
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const { context } = props;
    this.dbg = context.mkDbgLog('app');
    this.dbg('content %j', content);
    this.srcItems = new Items({ context });
    this.srcItems.loadFromJson(content);
  }

  render() {
    return (
      <div>
        <section className='container'>
          <Header />
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
