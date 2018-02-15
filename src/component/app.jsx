import React from 'react';
import Lightbox from './lightbox.jsx';

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
  }

  render() {
    return (
      <div>
        <section className='container'>
          <Header />
        </section>

        <hr />
        <section className='container'>
          <Lightbox misc={this.props.misc} />
        </section>
      </div>
    );
  }
}
