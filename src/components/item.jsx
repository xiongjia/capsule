import React from 'react';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img 
          id='capItem' 
          src={this.props.src}
          width='200'
          height='300' />
      </div>
    );
  }
}

export default Item;
