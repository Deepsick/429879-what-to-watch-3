import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureStore from 'redux-mock-store';
import {detailedMovies, genre, mockFunction, moviesCount} from '../../mocks/test-data';
import {App} from './app.jsx';

const mockStore = configureStore([])({
  movies: detailedMovies,
  genre,
  shownMoviesCount: moviesCount,
});

it(`Should render App component correctly`, () => {
  const node = renderer.create(
      <Provider store={mockStore}>
        <App
          genre={genre}
          movies={detailedMovies}
          setGenre={mockFunction}
          shownMoviesCount={moviesCount}
          addShownMovies={mockFunction}
        />
      </Provider>
  ).toJSON();

  expect(node).toMatchSnapshot();
});
