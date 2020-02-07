import React from 'react';

import Main from '../main/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {movie} = props;
  return <Main movie={movie} />;
};

export default App;
