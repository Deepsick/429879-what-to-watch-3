import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Details from './details';
import {genre, duration, mockString} from '../../mocks/test-data';

it(`Should render Details component correctly`, () => {
  const node = renderer.create(
      <Details
        director={mockString}
        starring={[]}
        runTime={duration}
        genre={genre}
        released={duration}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
