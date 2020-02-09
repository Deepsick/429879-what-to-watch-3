import React from 'react';
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from './main.jsx';


Enzyme.configure({
  adapter: new Adapter(),
});

const movie = {
  name: `The Grand Budapest Hotel`,
  genre: `drama`,
  year: 2014,
};

const movies = [`Fantastic Beasts`, `Bohemian Rhapsody`, `Macbeth`];

it(`Should call callback on movie title click`, () => {
  const onMovieTitleClick = jest.fn();

  const main = shallow(
      <Main
        movie={movie}
        movies={movies}
        onMovieTitleClick={onMovieTitleClick}
      />
  );

  const movieTitles = main.find(`.small-movie-card__title`);
  const titleCount = movieTitles.length;

  movieTitles.forEach((title) => {
    title.props().onClick();
  });

  expect(onMovieTitleClick.mock.calls.length).toBe(titleCount);
});
