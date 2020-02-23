import React from 'react';
import renderer from 'react-test-renderer';
import MovieCard from './movie-card.jsx';
import {movies, onCardHover, onMovieTitleClick, onMouseOut, trailer, isVideo} from '../../mocks/test-data';

it(`Should render MovieCard component correctly`, () => {
  const {name, picture, id} = movies[0];
  const node = renderer.create(
      <MovieCard
        name={name}
        picture={picture}
        id={id}
        onHover={onCardHover}
        onMovieTitleClick={onMovieTitleClick}
        onMouseOut={onMouseOut}
        isVideo={isVideo}
        trailer={trailer}
      />
  ).toJSON();

  expect(node).toMatchSnapshot();
});
