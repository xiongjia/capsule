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

const Main = () => {
  return (
    <p> main test </p>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    
    dbg('props %j', props);
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
