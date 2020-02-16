import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import {movies, movie, detailedMovies} from './mocks/films';

ReactDOM.render(
    <App movie={movie} movies={movies} detailedMovies={detailedMovies} />,
    document.querySelector(`#root`)
);
