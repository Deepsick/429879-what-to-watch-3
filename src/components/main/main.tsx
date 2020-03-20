import * as React from 'react';
import {connect} from 'react-redux';

import MoviesList from '../movies-list/movies-list';
import Footer from '../footer/footer';
import Avatar from '../avatar/avatar';
import Logo from '../logo/logo';
import Spinner from '../spinner/spinner';
import GenresList from '../genres-list/genres-list';
import ShowMoreButton from '../show-more-button/show-more-button';
import CardButtons from '../card-buttons/card-buttons';
import {Operation as UserOperation} from '../../reducer/user/user';
import {getAuthStatus, getAvatar} from '../../reducer/user/selectors';
import {Operation} from '../../reducer/data/data';
import {getMovies, getPromo} from '../../reducer/data/selectors';
import {ActionCreator} from '../../reducer/state/state';
import {getGenre, getShownMoviesCount} from '../../reducer/state/selectors';
import {ALL_GENRES, START_INDEX} from '../../const';
import {isEmptyObject} from '../../utils';
import {Movie} from '../../types';

interface Props {
  movie: Movie;
  movies: Movie[];
  activeGenre: string;
  isAuth: string;
  avatar: string;
  shownMoviesCount: number;
  setGenre: (genre: string) => void;
  addShownMovies: () => void;
  postFavorite: (id: number, status: boolean) => void;
}

const filterMoviesByGenre = (movies, genre) => {
  if (genre === ALL_GENRES) {
    return movies;
  }

  return movies.filter((movie) => movie.genre === genre);
};

const Main: React.FunctionComponent<Props> = ({
  movie,
  movies,
  activeGenre,
  setGenre,
  shownMoviesCount,
  addShownMovies,
  postFavorite,
  isAuth,
  avatar,
}: Props) => {
  if (movies.length === 0 || isEmptyObject(movie)) {
    return <Spinner />;
  }
  const {name, genre, year, id, poster, isFavorite, cover} = movie;
  const filteredMovies = filterMoviesByGenre(movies, activeGenre);
  const isShowMoreButtonShown = filteredMovies.length > shownMoviesCount;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
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

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Main));
