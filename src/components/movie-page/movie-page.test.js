import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page.jsx';
import {detailedMovies} from '../../mocks/test-data';

it(`Should render MoviePage component correctly`, () => {
  const node = renderer.create(
      <MoviePage movie={detailedMovies[0]} similarMovies={detailedMovies.slice(4)} />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
