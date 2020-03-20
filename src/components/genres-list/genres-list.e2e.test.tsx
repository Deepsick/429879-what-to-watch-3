import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';

import GenresList from './genres-list';
import {movies, genre, mockFunction} from '../../mocks/test-data';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on genre click submit`, () => {
  const onGenreItemClick = jest.fn((...args) => [...args]);

  const wrapper = Enzyme.shallow(
      <GenresList
        movies={movies}
        activeGenre={genre}
        setGenre={onGenreItemClick}
      />
  );

  const liElement = wrapper.find(`.catalog__genres-item`).first();
  const link = liElement.find(`.catalog__genres-link`);
  const linkGenre = link.text();

  liElement.simulate(`click`, {
    preventDefault: mockFunction,
  });

  expect(onGenreItemClick.mock.calls.length).toBe(1);
  expect(onGenreItemClick.mock.calls[0][0]).toBe(linkGenre);
});
