import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Overview from './overview';
import {duration, mockString} from '../../mocks/test-data';

it(`Should render Overview component correctly`, () => {
  const node = renderer.create(
      <Overview
        director={mockString}
        starring={[]}
        rating={duration}
        scoresCount={duration}
        description={mockString}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
