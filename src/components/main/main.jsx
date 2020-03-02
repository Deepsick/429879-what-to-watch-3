import React, {Fragment, memo} from 'react';
import PropTypes from 'prop-types';
import MoviesList from '../movies-list/movies-list.jsx';
import Footer from '../footer/footer.jsx';
import Header from '../header/header.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMoreButton from '../show-more-button/show-more-button.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {ALL_GENRES, START_INDEX} from '../../const';

const MoviesListWrapped = withActiveItem(MoviesList);

const filterMoviesByGenre = (movies, genre) => {
  if (genre === ALL_GENRES) {
    return movies;
  }

  return movies.filter((movie) => movie.genre === genre);
};

const Main = ({
  movie,
  movies,
  onMovieTitleClick,
  activeGenre,
  setGenre,
  shownMoviesCount,
  addShownMovies,
}) => {
  const {name, genre, year} = movie;
  const filteredMovies = filterMoviesByGenre(movies, activeGenre);
  const isShowMoreButtonShown = filteredMovies.length > shownMoviesCount;

  return (
    <Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src="img/bg-the-grand-budapest-hotel.jpg" alt="The Grand Budapest Hotel" />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header />

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src="img/the-grand-budapest-hotel-poster.jpg"
                alt="The Grand Budapest Hotel poster"
                width="218"
                height="327"
              />
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button className="btn btn--play movie-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s" />
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add" />
                  </svg>
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenresList
            movies={movies}
            activeGenre={activeGenre}
            setGenre={setGenre}
          />
          <MoviesListWrapped
            movies={filteredMovies.slice(START_INDEX, shownMoviesCount)}
            onMovieTitleClick={onMovieTitleClick}
          />
          <ShowMoreButton
            onClick={addShownMovies}
            isShown={isShowMoreButtonShown}
          />
        </section>
        <Footer />
      </div>
    </Fragment>
  );
};

Main.propTypes = {
  movie: PropTypes.exact({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired,
  })).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
  addShownMovies: PropTypes.func.isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
};

export default memo(Main);
