import * as React from 'react';
import * as renderer from 'react-test-renderer';

import ShowMoreButton from './show-more-button';
import {mockFunction, isShown} from '../../mocks/test-data';

it(`Should render ShowMoreButton component correctly`, () => {
  const node = renderer.create(
      <ShowMoreButton isShown={isShown} onClick={mockFunction} />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
