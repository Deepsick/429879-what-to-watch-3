import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Tabs from './tabs';
import {TabName, mockFunction} from '../../mocks/test-data';

it(`Should render Tabs component correctly`, () => {
  const node = renderer.create(
      <Tabs
        setActiveItem={mockFunction}
        active={TabName.OVERVIEW}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
