import React from 'react';
import renderer from 'react-test-renderer';
import GenresList from './genres-list.jsx';
import {detailedMovies, genre} from '../../mocks/test-data';

it(`Should render GenresList component correctly`, () => {
  const node = renderer.create(
      <GenresList
        movies={detailedMovies}
        activeGenre={genre}
        setGenre={() => {}}
      />).toJSON();

  expect(node).toMatchSnapshot();
});
