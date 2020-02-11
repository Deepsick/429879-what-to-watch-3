import React from 'react';
import renderer from 'react-test-renderer';
import {movie, movies} from '../../mocks/test-data';
import App from './app.jsx';

it(`Should render App component correctly`, () => {
  const node = renderer.create(<App movie={movie} movies={movies} />).toJSON();

  expect(node).toMatchSnapshot();
});
