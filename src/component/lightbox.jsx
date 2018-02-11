import React from 'react';

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='row capLightbox'>
        <img
          src='/assets/img/portal_000000.jpg'
          width='300'
          height='200'
        />
      </div>
    );
  }
}
