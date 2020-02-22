import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from './movies-list.jsx';
import {movies, onMovieTitleClick} from '../../mocks/test-data';

it(`Should render MoviesList component correctly`, () => {
  const node = renderer.create(
      <MoviesList movies={movies} onMovieTitleClick={onMovieTitleClick} />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
