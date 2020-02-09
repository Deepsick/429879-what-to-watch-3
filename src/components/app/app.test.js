import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const movie = {
  name: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014,
};

const movies = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

it(`Should render App component correctly`, () => {
  const node = renderer.create(<App movie={movie} movies={movies} />).toJSON();

  expect(node).toMatchSnapshot();
});
