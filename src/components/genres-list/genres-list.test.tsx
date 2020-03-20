import * as React from 'react';
import * as renderer from 'react-test-renderer';

import GenresList from './genres-list';
import {movies, genre, mockFunction} from '../../mocks/test-data';

it(`Should render GenresList component correctly`, () => {
  const node = renderer.create(
      <GenresList
        movies={movies}
        activeGenre={genre}
        setGenre={mockFunction}
      />).toJSON();

  expect(node).toMatchSnapshot();
});
