import React, {Fragment, memo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import {Operation} from '../../reducer/data/data.js';
import {ActionCreator} from '../../reducer/state/state.js';
import {getMovies, getPromo} from '../../reducer/data/selectors.js';
import {getGenre, getShownMoviesCount} from '../../reducer/state/selectors.js';
import {getAuthStatus, getAvatar} from '../../reducer/user/selectors.js';
import MoviesList from '../movies-list/movies-list.jsx';
import Footer from '../footer/footer.jsx';
import Avatar from '../avatar/avatar.jsx';
import Logo from '../logo/logo.jsx';
import Spinner from '../spinner/spinner.jsx';
import GenresList from '../genres-list/genres-list.jsx';
import ShowMoreButton from '../show-more-button/show-more-button.jsx';
import CardButtons from '../card-buttons/card-buttons.jsx';
import {ALL_GENRES, START_INDEX} from '../../const.js';
import {isEmptyObject} from '../../utils.js';


const filterMoviesByGenre = (movies, genre) => {
  if (genre === ALL_GENRES) {
    return movies;
  }

  return movies.filter((movie) => movie.genre === genre);
};

const Main = ({
  movie,
  movies,
  activeGenre,
  setGenre,
  shownMoviesCount,
  addShownMovies,
  postFavorite,
  isAuth,
  avatar,
}) => {
  if (movies.length === 0 || isEmptyObject(movie)) {
    return <Spinner />;
  }
  const {name, genre, year, id, poster, isFavorite, cover} = movie;
  const filteredMovies = filterMoviesByGenre(movies, activeGenre);
  const isShowMoreButtonShown = filteredMovies.length > shownMoviesCount;

  return (
    <Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={cover} alt={name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header movie-card__head">
          <Logo />
          <Avatar isAuth={isAuth} avatar={avatar} />
        </header>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img
                src={poster}
                alt={name}
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

              <CardButtons
                id={id}
                isAddReview={false}
                isFavorite={isFavorite}
                onClick={postFavorite}
              />
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
          <MoviesList
            movies={filteredMovies.slice(START_INDEX, shownMoviesCount)}
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
  movie: PropTypes.shape({
    name: PropTypes.string,
    poster: PropTypes.string,
    preview: PropTypes.string,
    genre: PropTypes.string,
    id: PropTypes.number,
    rating: PropTypes.number,
    scoresCount: PropTypes.number,
    isFavorite: PropTypes.bool,
    trailer: PropTypes.string,
    video: PropTypes.string,
    duration: PropTypes.number,
    year: PropTypes.number,
    cover: PropTypes.string,
    bgColor: PropTypes.string,
    director: PropTypes.string,
    starring: PropTypes.arrayOf(PropTypes.string),
    description: PropTypes.string,
  }).isRequired,
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
  isAuth: PropTypes.string,
  setGenre: PropTypes.func.isRequired,
  addShownMovies: PropTypes.func.isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  movie: getPromo(state),
  activeGenre: getGenre(state),
  shownMoviesCount: getShownMoviesCount(state),
  isAuth: getAuthStatus(state),
  avatar: getAvatar(state),
});

const mapDispatchToProps = (dispatch) => ({
  setGenre(genre) {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.resetShownMovies());
  },
  addShownMovies() {
    dispatch(ActionCreator.addShownMovies());
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  postFavorite(id, status) {
    dispatch(Operation.postFavorite(id, status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(memo(Main));
