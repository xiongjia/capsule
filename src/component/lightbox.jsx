import React from 'react';

export default class Lightbox extends React.Component {
  constructor(props) {
    super(props);
    this.idx = 0;
    const { context } = this.props;
    this.dbg = context.mkDbgLog('ltbx');
    this.handleImgClick = this.handleImgClick.bind(this);
    this.handleModalCloseClick = this.handleModalCloseClick.bind(this);
    this.handleKeydown = this.handleKeydown.bind(this);
  }

  handleModalCloseClick = () => this.closeModal();
  handleImgClick = (item) => this.openModal(item);

  openModal(item = {}) {
    this.dbg('open item: %s', item.src);
    const contentEl = document.getElementById('capModalContent');
    contentEl.src = item.src;
    contentEl.width = item.size.width;
    contentEl.height =  item.size.height;
    const modalEl = document.getElementById('capModal');
    modalEl.style.display = 'block';
  }

  closeModal() {
    const modalEl = document.getElementById('capModal');
    modalEl.style.display = 'none';
  }

  handleKeydown(evt) {
    if (evt.keyCode === 27) {
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
              className='close cursor'
              onClick={this.handleModalCloseClick}
            >&times;</span>

            <img id='capModalContent' />
          </div>
        </div>
      </div>
    );
  }
}
