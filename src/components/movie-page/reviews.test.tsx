import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Reviews from './reviews';
import {comments} from '../../mocks/test-data';

it(`Should render Reviews component correctly`, () => {
  const node = renderer.create(
      <Reviews
        comments={comments}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
