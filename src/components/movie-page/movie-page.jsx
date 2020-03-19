import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Tabs from '../tabs/tabs.jsx';
import MoreLikeThis from '../more-like-this/more-like-this.jsx';
import Details from './details.jsx';
import Overview from './overview.jsx';
import Reviews from './reviews.jsx';
import Footer from '../footer/footer.jsx';
import Logo from '../logo/logo.jsx';
import Spinner from '../spinner/spinner.jsx';
import Avatar from '../avatar/avatar.jsx';
import CardButtons from '../card-buttons/card-buttons.jsx';
import {START_INDEX, MAX_SIMILAR_MOVIES_COUNT, TabName} from '../../const.js';
import {Operation} from '../../reducer/data/data.js';
import {getMovies, getComments} from '../../reducer/data/selectors.js';
import {getAuthStatus, getAvatar} from '../../reducer/user/selectors.js';

class MoviePage extends PureComponent {
  constructor(props) {
    super(props);
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

  componentDidMount() {
    const {id, loadComments} = this.props;
    loadComments(id);
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
      <Fragment>
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
      </Fragment>
    );
  }
}

MoviePage.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.exact({
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
};

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

export default connect(mapStateToProps, mapDispatchToProps)(MoviePage);

