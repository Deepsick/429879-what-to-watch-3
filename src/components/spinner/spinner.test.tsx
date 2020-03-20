import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Spinner from './spinner';

it(`Should render Spinner component correctly`, () => {
  const node = renderer.create(
      <Spinner />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
