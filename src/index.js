import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {movies, movie} from './mocks/films';

ReactDOM.render(
    <App movie={movie} movies={movies} />,
    document.querySelector(`#root`)
);
