import React, {Fragment, memo} from 'react';
import PropTypes from 'prop-types';
import Tabs, {TabName} from '../tabs/tabs.jsx';
import MoreLikeThis from '../more-like-this/more-like-this.jsx';
import Footer from '../footer/footer.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const TabsWrapped = withActiveItem(Tabs);

const handlePlayButtonClick = (id, callback) => () => {
  callback(id);
};

const MoviePage = ({movie, similarMovies, onPlayButtonClick}) => {
  const {
    name,
    genre,
    year,
    poster,
    preview,
    director,
    bgColor,
    starring,
    description,
    id,
    rating,
    scoresCount,
  } = movie;
  return (
    <Fragment>
      <section className="movie-card movie-card--full" style={{backgroundColor: bgColor}}>
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={poster} alt={name} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
              </div>
            </div>
          </header>

          <div className="movie-card__wrap">
            <div className="movie-card__desc">
              <h2 className="movie-card__title">{name}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{genre}</span>
                <span className="movie-card__year">{year}</span>
              </p>

              <div className="movie-card__buttons">
                <button
                  className="btn btn--play movie-card__button"
                  type="button"
                  onClick={handlePlayButtonClick(id, onPlayButtonClick)}
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list movie-card__button" type="button">
                  <svg viewBox="0 0 18 14" width="18" height="14">
                    <use xlinkHref="#in-list"></use>
                  </svg>
                  <span>My list</span>
                </button>
                <a href="add-review.html" className="btn movie-card__button">Add review</a>
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={preview} alt={name} width="218" height="327" />
            </div>

            <div className="movie-card__desc">
              <TabsWrapped activeTab={TabName.OVERVIEW} />

              <div className="movie-rating">
                <div className="movie-rating__score">{rating}</div>
                <p className="movie-rating__meta">
                  <span className="movie-rating__level">Very good</span>
                  <span className="movie-rating__count">{scoresCount} ratings</span>
                </p>
              </div>

              <div className="movie-card__text">
                <p>{description}</p>
                <p className="movie-card__director"><strong>Director: {director}</strong></p>

                <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)} and other</strong></p>
              </div>
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
};

MoviePage.propTypes = {
  movie: PropTypes.exact({
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
  }).isRequired,
  similarMovies: PropTypes.arrayOf(PropTypes.exact({
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
  onPlayButtonClick: PropTypes.func.isRequired,
};

export default memo(MoviePage);
