import React, {memo} from 'react';
import PropTypes from 'prop-types';
import SmallCard from './small-card.jsx';

const MoreLikeThis = ({movies}) => {
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__movies-list">
        {movies.map((movie) => {
          const {id, preview, name} = movie;
          return (
            <SmallCard
              key={id}
              picture={preview}
              name={name}
            />
          );
        })}
      </div>
    </section>
  );
};

MoreLikeThis.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    scorescount: PropTypes.number.isRequired,
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

export default memo(MoreLikeThis);
