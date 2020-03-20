import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import ShowMoreButton from './show-more-button';
import {isShown} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on button click`, () => {
  const onButtonClick = jest.fn((...args) => [...args]);

  const showMoreButton = Enzyme.shallow(
      <ShowMoreButton
        isShown={isShown}
        onClick={onButtonClick}
      />
  );

  const button = showMoreButton.find(`.catalog__button`);
  button.simulate(`click`);

  expect(onButtonClick.mock.calls.length).toBe(1);
});
