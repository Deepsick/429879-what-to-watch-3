import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from './movies-list.jsx';
import {detailedMovies, onMovieTitleClick} from '../../mocks/test-data';

it(`Should render MoviesList component correctly`, () => {
  const node = renderer.create(
      <MoviesList
        movies={detailedMovies}
        onMovieTitleClick={onMovieTitleClick}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
