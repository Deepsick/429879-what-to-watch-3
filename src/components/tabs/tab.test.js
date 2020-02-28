import React from 'react';
import renderer from 'react-test-renderer';
import Tab from './tab.jsx';
import {TabName} from '../../mocks/test-data';

it(`Should render Tab component correctly`, () => {
  const node = renderer.create(
      <Tab
        isActive={true}
        onClick={() => {}}
        tabName={TabName.REVIEWS}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
