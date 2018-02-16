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
          <Lightbox
            context={this.props.context}
            srcItems={this.srcItems.items()}
          />
        </section>
      </div>
    );
  }
}
