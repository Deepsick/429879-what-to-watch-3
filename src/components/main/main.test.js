import React from 'react';
import renderer from 'react-test-renderer';
import {movie, movies} from '../../mocks/test-data';
import Main from './main.jsx';

const onMovieTitleClick = () => {};

it(`Should render Main component correctly`, () => {
  const node = renderer.create(
      <Main
        movie={movie}
        movies={movies}
        onMovieTitleClick={onMovieTitleClick}
      />
  );

  expect(node).toMatchSnapshot();
});
