import React from 'react';
import Lightbox from './lightbox.jsx';
import { Items } from '../misc.js';

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

    this.srcItems = new Items();
    this.srcItems.add({
      srcSet: [
        { src: '/assets/img/portal_000000.jpg' },
        { src: '/assets/img/portal_000001.jpg' }
      ]
    });
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
