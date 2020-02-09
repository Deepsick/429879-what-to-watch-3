import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const movie = {
  name: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014,
};
const onMovieTitleClick = () => {};
const movies = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

it(`Should render Main component correctly`, () => {
  const node = renderer.create(
      <Main
        movie={movie}
        movies={movies}
        onMovieTitleClick={onMovieTitleClick}
      />
  );

  expect(node).toMatchSnapshot();
});
