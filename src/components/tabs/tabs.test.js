import React from 'react';
import renderer from 'react-test-renderer';
import Tabs from './tabs.jsx';
import {TabName, mockFunction} from '../../mocks/test-data';

it(`Should render Tabs component correctly`, () => {
  const node = renderer.create(
      <Tabs
        activeTab={TabName.REVIEWS}
        setActiveItem={mockFunction}
        active={TabName.OVERVIEW}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
