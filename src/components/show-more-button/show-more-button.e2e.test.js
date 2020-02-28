import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ShowMoreButton from './show-more-button.jsx';
import {isShown} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on button click`, () => {
  const onButtonClick = jest.fn((...args) => [...args]);

  const showMoreButton = shallow(
      <ShowMoreButton
        isShown={isShown}
        onClick={onButtonClick}
      />
  );

  const button = showMoreButton.find(`.catalog__button`);
  button.simulate(`click`);

  expect(onButtonClick.mock.calls.length).toBe(1);
});
