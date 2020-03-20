import * as React from 'react';

import {ALL_GENRES, START_INDEX, MAX_GENRES_COUNT} from '../../const';
import {Movie} from '../../types';

interface Props {
  movies: Movie[];
  activeGenre: string;
  setGenre: (genre: string) => void;
}

const ACTIVE_CLASS = `catalog__genres-item--active`;

const getGenresList = (movies) => {
  return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))].slice(START_INDEX, MAX_GENRES_COUNT);
};

const handleGenreClick = (callback, genre) => (evt) => {
  evt.preventDefault();
  callback(genre);
};

const GenresList: React.FunctionComponent<Props> = ({movies, activeGenre, setGenre}: Props) => (
  <ul className="catalog__genres-list">
    {getGenresList(movies).map((availableGenre, index) => (
      <li
        key={index}
        className={
          `catalog__genres-item
          ${availableGenre === activeGenre ? ACTIVE_CLASS : ``}`
        }
        onClick={handleGenreClick(setGenre, availableGenre)}
      >
        <a href="#" className="catalog__genres-link">{availableGenre}</a>
      </li>
    ))}
  </ul>
);

export default React.memo(GenresList);
