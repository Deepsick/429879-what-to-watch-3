import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import CardButtons from './card-buttons';
import {id, mockBool, mockFunction} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on form submit`, () => {
  const onAddToFavoriteClick = jest.fn((...args) => [...args]);

  const wrapper = Enzyme.shallow(
      <CardButtons
        id={id}
        isAddReview={mockBool}
        isFavorite={mockBool}
        onClick={onAddToFavoriteClick}
      />
  );

  const button = wrapper.find(`.btn.btn--list`);
  button.simulate(`click`, {
    preventDefault: mockFunction,
  });
  const status = +!mockBool;

  expect(onAddToFavoriteClick.mock.calls.length).toBe(1);
  expect(onAddToFavoriteClick.mock.calls[0][0]).toBe(id);
  expect(onAddToFavoriteClick.mock.calls[0][1]).toBe(status);
});
