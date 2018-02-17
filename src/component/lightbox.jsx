import React from 'react';

const KEYCODE_ESC = 27;
const KEYCODE_LEFT = 37;
const KEYCODE_RIGHT = 39;

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    const { context } = this.props;
    this.dbg = context.mkDbgLog('ltbx');
    this.handleImgClick = this.handleImgClick.bind(this);
    this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
    this.plusSlides = this.plusSlides.bind(this);

    this.currentIdx = 0;
    this.modalOpened = false;
  }

  handleModalCloseClick() { this.closeModal(); }
  handleImgClick(item, idx) { this.openModal(item, idx); }

  showItem(item) {
    const contentEl = document.getElementById('capModalContent');
    const descEl = document.getElementById('capModalDesc');

    contentEl.src = item.src;
    contentEl.width = item.size.width;
    contentEl.height =  item.size.height;
    const desc = (() => {
      if (!item.date) {
        return item.caption;
      }
      return `
        ${item.caption} <br />
        ${item.date.format('LL')} (${item.date.fromNow()})`;
    })();
    descEl.innerHTML = `<p>${desc}</p>`;    
  }

  openModal(item = {}, idx) {
    this.dbg('open item: %s (%d)', item.src, idx);

    this.currentIdx = idx;
    this.modalOpened = true;
    this.showItem(item);
    const modalEl = document.getElementById('capModal');
    modalEl.style.display = 'block';
  }

  closeModal() {
    this.modalOpened = false;
    const modalEl = document.getElementById('capModal');
    modalEl.style.display = 'none';
  }

  plusSlides(cnt) {
    this.dbg('plus slides: %d', cnt);
    if (!this.modalOpened) {
      return;
    }
    
    const { srcItems } = this.props;
    let idx = this.currentIdx + cnt;
    if (idx < 0) {
      idx = srcItems.length - 1;
    } else if (idx >= srcItems.length) {
      idx = 0;
    }
    this.currentIdx = idx;
    this.showItem(srcItems[this.currentIdx]);
  }

  handleKeydown(evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      this.closeModal();
    } else if (evt.keyCode === KEYCODE_LEFT) {
      this.plusSlides(-1);
    } else if (evt.keyCode === KEYCODE_RIGHT) {
      this.plusSlides(1);
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
        {srcItems.map((item, idx) =>
          <img className='capLightboxItem'
            key={idx}
            src={item.thumbnail}
            width={item.sizeThumbnail.width}
            height={item.sizeThumbnail.height}
            onClick={() => this.handleImgClick(item, idx)}
          />
        )}

        <div className='capLightboxModal' id='capModal'>
          <div className='container'>
            <span
              className='close cursor' onClick={this.handleModalCloseClick}>
              &times;
            </span>

            <a 
              className='capModalPrev'
              onClick={() => this.plusSlides(-1)}>&#10094;</a>
            <a 
              className='capModalNext'
              onClick={() => this.plusSlides(1)}>&#10095;</a>

            <img id='capModalContent' />
            <div id='capModalDesc' />
          </div>
        </div>
      </div>
    );
  }
}
