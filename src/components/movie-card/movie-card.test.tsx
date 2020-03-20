import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {BrowserRouter} from 'react-router-dom';

import MovieCard from './movie-card';
import {mockFunction, mockString, id, trailer, mockBool} from '../../mocks/test-data';

it(`Should render MovieCard component correctly`, () => {
  const node = renderer.create(
      <BrowserRouter>
        <MovieCard
          name={mockString}
          picture={mockString}
          trailer={trailer}
          id={id}
          isVideo={!mockBool}
          onHover={mockFunction}
          onMouseOut={mockFunction}
        />
      </BrowserRouter>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
