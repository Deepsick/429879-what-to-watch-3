import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {ALL_GENRES, START_INDEX, MAX_GENRES_COUNT} from '../../const';

const ACTIVE_CLASS = `catalog__genres-item--active`;


const getGenresList = (movies) => {
  return [ALL_GENRES, ...new Set(movies.map((movie) => movie.genre))].slice(START_INDEX, MAX_GENRES_COUNT);
};

const handleGenreClick = (callback, genre) => (evt) => {
  evt.preventDefault();
  callback(genre);
};

const GenresList = ({movies, activeGenre, setGenre}) => (
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

GenresList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    trailer: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  activeGenre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
};

export default memo(GenresList);
