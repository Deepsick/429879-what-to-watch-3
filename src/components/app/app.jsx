import React from 'react';
import PropTypes from 'prop-types';

import Main from '../main/main.jsx';

const App = ({movie, movies}) => {
  return <Main movie={movie} movies={movies} />;
};

App.propTypes = {
  movie: PropTypes.arrayOf(
      PropTypes.exact({
        name: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        year: PropTypes.number.isRequired,
      })
  ).isRequired,
  movies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
