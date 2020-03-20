import * as React from 'react';
import * as renderer from 'react-test-renderer';

import Tab from './tab';
import {TabName, mockBool, mockFunction} from '../../mocks/test-data';

it(`Should render Tab component with active class correctly`, () => {
  const node = renderer.create(
      <Tab
        isActive={mockBool}
        onClick={mockFunction}
        tabName={TabName.REVIEWS}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});


it(`Should render Tab component without active class correctly`, () => {
  const node = renderer.create(
      <Tab
        isActive={!mockBool}
        onClick={mockFunction}
        tabName={TabName.REVIEWS}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
