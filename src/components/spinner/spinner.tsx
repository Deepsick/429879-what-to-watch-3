import * as React from 'react';

const Spinner: React.FunctionComponent<{}> = () => (
  <React.Fragment>
    <div className='loader'></div>
    <div style={{textAlign: `center`}}>Loading...</div>
  </React.Fragment>
);

export default React.memo(Spinner);
