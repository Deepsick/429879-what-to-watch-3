import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';

const movie = {
  name: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014,
};

ReactDOM.render(
    <App movie={movie} />,
    document.querySelector(`#root`)
);
