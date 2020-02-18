import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movieId: null,
    };

    this._handleMovieTitleClick = this._handleMovieTitleClick.bind(this);
  }

  _handleMovieTitleClick(id) {
    this.setState(() => ({
      movieId: id,
    }));
  }

  _renderFilmScreen(movie, movies, detailedMovies) {
    const {movieId} = this.state;

    if (movieId) {
      const detailedFilm = detailedMovies.find((film) => film.id === movieId);
      detailedFilm.cover = `bg-${detailedFilm.poster}`;
      return <MoviePage movie={detailedFilm} />;
    }

    return (
      <Main
        movie={movie}
        movies={movies}
        onMovieTitleClick={this._handleMovieTitleClick}
      />
    );
  }

  render() {
    const {movie, movies, detailedMovies} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderFilmScreen(movie, movies, detailedMovies)}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage movie={detailedMovies[0]} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movie: PropTypes.exact({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
  }).isRequired,
  detailedMovies: PropTypes.arrayOf(PropTypes.exact({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};

export default App;
