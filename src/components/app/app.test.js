import React from 'react';
import renderer from 'react-test-renderer';
import {movie, movies, detailedMovies} from '../../mocks/test-data';
import App from './app.jsx';

it(`Should render App component correctly`, () => {
  const node = renderer.create(<App movie={movie} movies={movies} detailedMovies={detailedMovies} />).toJSON();

  expect(node).toMatchSnapshot();
});
