import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs.jsx';
import {TabName} from '../../mocks/test-data';

it(`Should render Tabs component correctly`, () => {
  const node = renderer.create(
      <Tabs
        activeTab={TabName.REVIEWS}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
