import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {detailedMovies, genre, mockFunction, moviesCount} from '../../mocks/test-data';
import Main from './main.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should call callback on movie title click`, () => {
  const onMovieTitleClick = jest.fn();

  const main = shallow(
      <Main
        movie={detailedMovies[0]}
        movies={detailedMovies}
        onMovieTitleClick={onMovieTitleClick}
        activeGenre={genre}
        setGenre={mockFunction}
        addShownMovies={mockFunction}
        shownMoviesCount={moviesCount}
      />
  );

  const movieTitles = main.find(`.small-movie-card__title`);
  const titleCount = movieTitles.length;

  movieTitles.forEach((title) => {
    title.props().onClick();
  });

  expect(onMovieTitleClick.mock.calls.length).toBe(titleCount);
});
