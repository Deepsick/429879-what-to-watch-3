import React from 'react';
import renderer from 'react-test-renderer';
import MoviePage from './movie-page.jsx';
import {detailedMovies, mockFunction} from '../../mocks/test-data';

it(`Should render MoviePage component correctly`, () => {
  const node = renderer.create(
      <MoviePage
        movie={detailedMovies[0]}
        similarMovies={detailedMovies.slice(4)}
        onPlayButtonClick={mockFunction}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
