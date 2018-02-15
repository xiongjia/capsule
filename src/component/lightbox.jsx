import React from 'react';

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    const { misc } = this.props;
    this.dbg = misc.mkDbgLog('ltbx');
    this.handleImgClick = this.handleImgClick.bind(this);
    this.handleModalCloseClick = this.handleModalCloseClick.bind(this);

    this.srcItems = [
      { src: '/assets/img/portal_000000.jpg' },
      { src: '/assets/img/portal_000000.jpg' },
      { src: '/assets/img/portal_000000.jpg' },
      { src: '/assets/img/portal_000000.jpg' },
      { src: '/assets/img/portal_000000.jpg' },
      { src: '/assets/img/portal_000000.jpg' }
    ];
  }

  handleModalCloseClick() {
    this.dbg('modal close click');
    const modalEl = document.getElementById('capModal');
    modalEl.style.display = 'none';
  }

  handleImgClick() {
    this.dbg('img click');
    const modalEl = document.getElementById('capModal');
    modalEl.style.display = 'block';
  }

  render() {
    return (
      <div className='row capLightbox'>
        {this.srcItems.map(item => 
          <img className='capLightboxItem'
            src={item.src}
            width='300'
            height='200'
            onClick={this.handleImgClick}
          />            
        )}

        <div className='capLightboxModal' id='capModal'>
          <div className='container'>
            <span
              className='close cursor'
              onClick={this.handleModalCloseClick}
            >&times;</span>

            <img 
              width='300'
              height='200'
              src='/assets/img/portal_000000.jpg'
            />
          </div>
        </div>
      </div>
    );
  }
}
