import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tab from './tab.jsx';
import {TabName} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on Tab click`, () => {
  const tabName = TabName.REVIEWS;
  const onClick = jest.fn((...args) => [...args]);

  const tab = shallow(
      <Tab
        isActive={true}
        onClick={onClick}
        tabName={tabName}
      />
  );

  tab.simulate(`click`, {
    preventDefault: () => {},
  });

  expect(onClick.mock.calls.length).toBe(1);
});
