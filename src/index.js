import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const movie = {
  name: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014,
};

const movies = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

ReactDOM.render(
    <App movie={movie} movies={movies} />,
    document.querySelector(`#root`)
);
