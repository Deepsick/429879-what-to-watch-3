import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {START_INDEX, REVIEW_COLS_COUNT} from '../../const.js';

const formatDate = (date) => {
  const jsDate = new Date(date);
  const month = jsDate.toLocaleString(`default`, { month: `long` });
  const year = jsDate.getFullYear();
  const day = jsDate.getDate();

  return `${month} ${day}, ${year}`;
};

const getCommentMarkup = (comment) => {
  const {id, rating, comment: text, user, date} = comment;
  return (
    <div className="review" key={id}>
      <blockquote className="review__quote">
        <p className="review__text">{text}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={date}>{formatDate(date)}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
};

const getCommentsMarkup = (comments) => {
  const reviewsInRow = Math.ceil(comments.length / REVIEW_COLS_COUNT);
  let start = START_INDEX;
  let finish = reviewsInRow;

  return new Array(REVIEW_COLS_COUNT).fill(`*`).map((col, index) => {
    const row = (
      <div key={index} className="movie-card__reviews-col">
        {comments.slice(start, finish).map((comment) => {
          return getCommentMarkup(comment);
        })}
      </div>
    );
    start += reviewsInRow;
    finish += reviewsInRow;
    return row;
  });
};

const Reviews = ({comments}) => (
  <div className="movie-card__reviews movie-card__row">
    {getCommentsMarkup(comments)}
  </div>
);

Reviews.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default memo(Reviews);
