import React from 'react';

const KEYCODE_ESC = 27;

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    const { context } = this.props;
    this.dbg = context.mkDbgLog('ltbx');
    this.handleImgClick = this.handleImgClick.bind(this);
    this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleModalCloseClick() { this.closeModal(); }
  handleImgClick(item) { this.openModal(item); }

  openModal(item = {}) {
    this.dbg('open item: %s', item.src);
    const contentEl = document.getElementById('capModalContent');
    const modalEl = document.getElementById('capModal');
    const descEl = document.getElementById('capModalDesc');
    
    contentEl.src = item.src;    
    contentEl.width = item.size.width;
    contentEl.height =  item.size.height;

    this.dbg('caption: %s', item.caption);    
    const desc = (() => {
      if (!item.date) {
        return item.caption;
      }
      return `
        ${item.caption} <br />
        ${item.date.format('LL')} (${item.date.fromNow()})`;
    })();
    descEl.innerHTML = `<p>${desc}</p>`;
    modalEl.style.display = 'block';
  }

  closeModal() {
    const modalEl = document.getElementById('capModal');
    modalEl.style.display = 'none';
  }

  handleKeydown(evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      this.closeModal();
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown, false);
  }

  render() {
    const { srcItems } = this.props;

    return (
      <div className='row capLightbox'>
        {srcItems.map(item =>
          <img className='capLightboxItem'
            key={item.src}
            src={item.thumbnail}
            width={item.sizeThumbnail.width}
            height={item.sizeThumbnail.height}
            onClick={() => this.handleImgClick(item)}
          />
        )}

        <div className='capLightboxModal' id='capModal'>
          <div className='container'>
            <span
              className='close cursor' onClick={this.handleModalCloseClick}>
              <i className='fa fa-times' />
            </span>  
            <img id='capModalContent' />
            <div id='capModalDesc' />
          </div>
        </div>
      </div>
    );
  }
}
