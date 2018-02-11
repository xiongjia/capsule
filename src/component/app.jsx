import React from 'react';

import debug from 'debug';
const dbg = debug('_cap:app');

const Header = () => {
  return (
    <div className='page-header'>
      <h1>Ingress bookmarks</h1>
      <p className='text-success'>My Ingress bookmarks</p>
    </div>
  );
};

// const photoSet = [{
//   src: '/assets/img/portal_000000.jpg',
//   sizes: ['(min-width: 480px) 50vw,(min-width: 1024px) 33.3vw,100vw'],
//   width: 1,
//   height: 1
// }];

const closeClick = () => {
  const imgEl = document.getElementById('img01');
  imgEl.style.display = 'none';
};

const imgClick = () => {
  dbg('clicked');
  const imgEl = document.getElementById('img01');
  imgEl.style.display = 'block';
};

const Main = () => {
  return (
    <div className='row'>
      <img
        src='/assets/img/portal_000000.jpg'
        width='300'
        height='200'
        onClick={imgClick}
      />

      <div className='modal' id='img01'>
        <span
          className='close'
          onClick={closeClick}
        >&times;</span>

      </div>
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    dbg('props %j', props);
  }

  componentDidMount() {
    dbg('did mount');
  }

  render() {
    return (
      <div>
        <section className='container'>
          <Header />
        </section>

        <hr />
        <section className='container'>
          <Main />
        </section>
      </div>
    );
  }
}

export default App;
