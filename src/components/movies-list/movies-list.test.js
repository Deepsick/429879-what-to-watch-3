import React from 'react';
import renderer from 'react-test-renderer';
import MoviesList from './movies-list.jsx';
import {detailedMovies, onMovieTitleClick, mockFunction} from '../../mocks/test-data';

it(`Should render MoviesList component correctly`, () => {
  const node = renderer.create(
      <MoviesList
        movies={detailedMovies}
        onMovieTitleClick={onMovieTitleClick}
        setActiveItem={mockFunction}
        resetActiveItem={mockFunction}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
