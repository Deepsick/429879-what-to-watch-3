import React from 'react';
import renderer from 'react-test-renderer';
import {detailedMovies, genre} from '../../mocks/test-data';
import Main from './main.jsx';

const onMovieTitleClick = () => {};

it(`Should render Main component correctly`, () => {
  const node = renderer.create(
      <Main
        movie={detailedMovies[0]}
        movies={detailedMovies}
        onMovieTitleClick={onMovieTitleClick}
        activeGenre={genre}
        setGenre={() => {}}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
