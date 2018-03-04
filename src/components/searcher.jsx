import React from 'react';

export default () => {
  return (
    <div>
      <div className='input-group input-group-sm'>
        <div className='input-group-text'>
          <i className='fa fa-search' />
        </div>
        <input
          type='text'
          className='form-control'
          placeholder='Search ... (To Be Implemented)'
        />
      </div>
    </div>
  );
};
