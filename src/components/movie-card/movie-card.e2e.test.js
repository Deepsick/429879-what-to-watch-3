import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {movies, onMovieTitleClick, isVideo, trailer, mockFunction} from '../../mocks/test-data';
import MovieCard from './movie-card.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on movie card mouseenter`, () => {
  const {name, picture, id} = movies[0];
  const onCardHover = jest.fn((...args) => [...args]);

  const movieCard = shallow(
      <MovieCard
        name={name}
        picture={picture}
        id={id}
        trailer={trailer}
        isVideo={isVideo}
        onHover={onCardHover}
        onMouseOut={mockFunction}
        onMovieTitleClick={onMovieTitleClick}
      />
  );

  movieCard.simulate(`mouseover`, {
    preventDefault: () => {},
  });

  expect(onCardHover.mock.calls.length).toBe(1);
  expect(onCardHover.mock.calls[0][0]).toBe(id);
});

it(`Should call callback on movie card mouseleave`, () => {
  const {name, picture, id} = movies[0];
  const onMouseLeave = jest.fn((...args) => [...args]);

  const movieCard = shallow(
      <MovieCard
        name={name}
        picture={picture}
        id={id}
        trailer={trailer}
        isVideo={isVideo}
        onHover={mockFunction}
        onMouseOut={onMouseLeave}
        onMovieTitleClick={onMovieTitleClick}
      />
  );

  movieCard.simulate(`mouseout`);

  expect(onMouseLeave.mock.calls.length).toBe(1);
});

it(`Should call callback on movie img or title click`, () => {
  const {name, picture, id} = movies[0];
  const onCardClick = jest.fn((...args) => [...args]);

  const movieCard = shallow(
      <MovieCard
        name={name}
        picture={picture}
        id={id}
        onHover={() => {}}
        trailer={trailer}
        isVideo={isVideo}
        onMouseOut={() => {}}
        onMovieTitleClick={onCardClick}
      />
  );

  movieCard.find(`.small-movie-card__image`).simulate(`click`, {
    preventDefault: () => {},
  });
  movieCard.find(`.small-movie-card__title`).simulate(`click`, {
    preventDefault: () => {},
  });

  expect(onCardClick.mock.calls.length).toBe(2);
  expect(onCardClick.mock.calls[0][0]).toBe(id);
  expect(onCardClick.mock.calls[1][0]).toBe(id);
});
