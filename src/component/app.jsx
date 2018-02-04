import React from 'react';
import Header from './header.jsx';
import Main from './main.jsx';

class App extends React.Component {
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
          <Main />
        </section>
      </div>
    );
  }
}

export default App;
