import React, {memo} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import withHover from '../../hocs/with-hover/with-hover.jsx';

const MovieCardWrapped = withHover(MovieCard);

const MoviesList = ({movies, onMovieTitleClick, setActiveItem, resetActiveItem, active}) => (
  <div className="catalog__movies-list">
    {movies.map((movie) => {
      const {name, poster, id, trailer} = movie;
      const isVideo = active === id;
      return (
        <MovieCardWrapped
          key={id}
          picture={poster}
          id={id}
          name={name}
          trailer={trailer}
          isVideo={isVideo}
          onMovieTitleClick={onMovieTitleClick}
          onHover={setActiveItem}
          onMouseOut={resetActiveItem}
        />
      );
    })}
  </div>
);

MoviesList.propTypes = {
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
  setActiveItem: PropTypes.func.isRequired,
  resetActiveItem: PropTypes.func.isRequired,
  active: PropTypes.string,
};

export default memo(MoviesList);
