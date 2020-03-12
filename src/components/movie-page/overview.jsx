import React, {Fragment, memo} from 'react';

const RatingLimits = {
  BAD: 0,
  NORMAL: 3,
  GOOD: 5,
  VERY_GOOD: 8,
  AWESOME: 10,
};

const RatingLevel = {
  BAD: `Bad`,
  NORMAL: `Normal`,
  GOOD: `Good`,
  VERY_GOOD: `Very good`,
  AWESOME: `Awesome`,
};

const getRatingLevel = (rating) => {
  const roundedRating = Math.floor(rating);

  if (roundedRating < RatingLimits.NORMAL) {
    return RatingLevel.BAD;
  }

  if (roundedRating < RatingLimits.GOOD) {
    return RatingLevel.NORMAL;
  }

  if (roundedRating < RatingLimits.VERY_GOOD) {
    return RatingLevel.GOOD;
  }

  return RatingLevel.AWESOME;
};

const Overview = ({rating, scoresCount, director, description, starring}) => (
  <Fragment>
    <div className="movie-rating">
      <div className="movie-rating__score">{rating}</div>
      <p className="movie-rating__meta">
        <span className="movie-rating__level">{getRatingLevel(rating)}</span>
        <span className="movie-rating__count">{scoresCount} ratings</span>
      </p>
    </div>

    <div className="movie-card__text">
      <p>{description}</p>
      <p className="movie-card__director"><strong>Director: {director}</strong></p>

      <p className="movie-card__starring"><strong>Starring: {starring.join(`, `)} and other</strong></p>
    </div>
  </Fragment>
);

export default memo(Overview);
