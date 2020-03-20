import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import MovieCard from './movie-card';
import {mockFunction, mockString, id, trailer, mockBool} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on movie card mouseenter`, () => {
  const onCardHover = jest.fn((...args) => [...args]);

  const wrapper = Enzyme.shallow(
      <MovieCard
        name={mockString}
        picture={mockString}
        trailer={trailer}
        id={id}
        isVideo={!mockBool}
        onHover={onCardHover}
        onMouseOut={mockFunction}
      />
  );

  wrapper.simulate(`mouseenter`, {
    preventDefault: mockFunction,
  });

  expect(onCardHover.mock.calls.length).toBe(1);
});

it(`Should call callback on movie card mouseleave`, () => {
  const onMouseLeave = jest.fn((...args) => [...args]);

  const movieCard = Enzyme.shallow(
      <MovieCard
        name={mockString}
        picture={mockString}
        trailer={trailer}
        id={id}
        isVideo={mockBool}
        onHover={mockFunction}
        onMouseOut={onMouseLeave}
      />
  );

  movieCard.simulate(`mouseout`);

  expect(onMouseLeave.mock.calls.length).toBe(1);
});
