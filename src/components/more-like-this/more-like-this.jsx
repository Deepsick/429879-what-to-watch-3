import React, {memo} from 'react';
import PropTypes from 'prop-types';
import SmallCard from './small-card.jsx';

const MoreLikeThis = ({movies}) => {
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <div className="catalog__movies-list">
        {movies.map((movie) => {
          const {id, poster, name} = movie;
          return (
            <SmallCard
              key={id}
              picture={poster}
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
};

export default memo(MoreLikeThis);
