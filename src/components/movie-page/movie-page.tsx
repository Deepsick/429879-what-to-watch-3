import * as React from 'react';
import {connect} from 'react-redux';

import Tabs from '../tabs/tabs';
import MoreLikeThis from '../more-like-this/more-like-this';
import Details from './details';
import Overview from './overview';
import Reviews from './reviews';
import Footer from '../footer/footer';
import Logo from '../logo/logo';
import Spinner from '../spinner/spinner';
import Avatar from '../avatar/avatar';
import CardButtons from '../card-buttons/card-buttons';
import {Operation} from '../../reducer/data/data';
import {getMovies, getComments} from '../../reducer/data/selectors';
import {getAuthStatus, getAvatar} from '../../reducer/user/selectors';
import {START_INDEX, MAX_SIMILAR_MOVIES_COUNT, TabName} from '../../const';
import {Movie, CommentGet} from '../../types';

interface Props {
  movies: Movie[];
  id: number;
  active: string;
  isAuth: string;
  avatar: string;
  comments: CommentGet[];
  loadComments: (id: number) => void;
  postFavorite: (id: number, status: boolean) => void;
  setActiveItem: (item: string) => void;
}

class MoviePage extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {id, loadComments} = this.props;
    loadComments(id);
  }

  _getFilmById() {
    const {movies, id} = this.props;
    return movies.find((movie) => movie.id === +id);
  }

  _getSimilarMovies(genre) {
    const {movies, id} = this.props;
    return movies
      .filter((movie) => movie.genre === genre && movie.id !== +id)
      .slice(START_INDEX, MAX_SIMILAR_MOVIES_COUNT);
  }

  render() {
    const {postFavorite, comments, active, setActiveItem, isAuth, avatar, movies} = this.props;

    if (movies.length === 0) {
      return <Spinner />;
    }

    const movie = this._getFilmById();
    const {
      name,
      genre,
      year,
      poster,
      director,
      duration,
      bgColor,
      starring,
      description,
      id,
      isFavorite,
      rating,
      scoresCount,
      cover,
    } = movie;
    const similarMovies = this._getSimilarMovies(genre);

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full" style={{backgroundColor: bgColor}}>
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={cover} alt={name} />
            </div>

            <h1 className="visually-hidden">WTW</h1>
            <header className="page-header movie-card__head">
              <Logo />
              <Avatar isAuth={isAuth} avatar={avatar} />
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{name}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{year}</span>
                </p>
                <CardButtons
                  isAddReview={true}
                  onClick={postFavorite}
                  isFavorite={isFavorite}
                  id={id} />
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={poster} alt={name} width="218" height="327" />
              </div>

              <div className="movie-card__desc">
                <Tabs setActiveItem={setActiveItem} active={active} />

                {active === TabName.OVERVIEW &&
                  <Overview
                    rating={rating}
                    scoresCount={scoresCount}
                    director={director}
                    description={description}
                    starring={starring}
                  />
                }

                {active === TabName.DETAILS &&
                  <Details
                    director={director}
                    starring={starring}
                    genre={genre}
                    released={year}
                    runTime={duration}
                  />
                }

                {active === TabName.REVIEWS &&
                  <Reviews comments={comments}/>
                }
              </div>
            </div>
          </div>
        </section>
        <div className="page-content">
          <MoreLikeThis movies={similarMovies} />
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  comments: getComments(state),
  isAuth: getAuthStatus(state),
  avatar: getAvatar(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadComments(id) {
    dispatch(Operation.loadComments(id));
  },
  postFavorite(id, status) {
    dispatch(Operation.postFavorite(id, status));
  },
});

export {MoviePage};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

