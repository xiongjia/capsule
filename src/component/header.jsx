import React from 'react';

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='page-header'>
        <h1>Ingress bookmarks</h1>
        <p className='text-success'>My Ingress bookmarks</p>
      </div>
    );
  }
}

export default Header;
