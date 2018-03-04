import React from 'react';
import { appContext } from '../misc';
const dbg = appContext.mkDbgLog('ltbx');

const KEYCODE_ESC      = 27;
const KEYCODE_LEFT     = 37;
const KEYCODE_UP       = 38;
const KEYCODE_RIGHT    = 39;
const KEYCODE_DOWN     = 40;
const KEYCODE_PG_UP    = 33;
const KEYCODE_PG_DOWN  = 34;

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);    

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
    dbg('open item: %s (%d)', item.src, idx);

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
    dbg('plus slides: %d', cnt);
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
    const { keyCode } = evt;
    if (keyCode === KEYCODE_ESC) {
      this.closeModal();
    } else if (keyCode === KEYCODE_LEFT || 
               keyCode === KEYCODE_UP ||
               keyCode === KEYCODE_PG_UP) {
      this.plusSlides(-1);
    } else if (keyCode === KEYCODE_RIGHT ||
               keyCode === KEYCODE_DOWN ||
               keyCode === KEYCODE_PG_DOWN) {
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
    dbg('srcItems: %j', srcItems);

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

            <div className='row'>
              <div className='col-1'>
                <a className='capModalPrev'
                  onClick={() => this.plusSlides(-1)}>&#10094;</a>
              </div>
              <div className='col-9'>
                <img id='capModalContent' />
              </div>
              <div className='col-1'>
                <a className='capModalNext'
                  onClick={() => this.plusSlides(1)}>&#10095;</a>
              </div>
            </div>
            <div id='capModalDesc' />
          </div>
        </div>
      </div>
    );
  }
}
