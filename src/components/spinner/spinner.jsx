import React, {memo, Fragment} from 'react';

const Spinner = () => (
  <Fragment>
    <div className='loader'></div>
    <div style={{textAlign: `center`}}>Loading...</div>
  </Fragment>
);

export default memo(Spinner);
