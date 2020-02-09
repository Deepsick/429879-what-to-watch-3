import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const onMovieTitleClick = () => {};

const App = ({movie, movies}) => {
  return (
    <Main
      movie={movie}
      movies={movies}
      onMovieTitleClick={onMovieTitleClick}
    />
  );
};

App.propTypes = {
  movie: PropTypes.exact({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
