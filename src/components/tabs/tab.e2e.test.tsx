import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import Tab from './tab';
import {TabName, mockBool, mockFunction} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on Tab click`, () => {
  const tabName = TabName.REVIEWS;
  const onClick = jest.fn((...args) => [...args]);

  const tab = Enzyme.shallow(
      <Tab
        isActive={mockBool}
        onClick={onClick}
        tabName={tabName}
      />
  );

  tab.simulate(`click`, {
    preventDefault: mockFunction,
  });

  expect(onClick.mock.calls.length).toBe(1);
});
