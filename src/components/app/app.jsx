import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
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

  _getSimilarMovies(genre, movies) {
    return movies.filter((movie) => movie.genre === genre).slice(4);
  }

  _handleMovieTitleClick(id) {
    this.setState(() => ({
      movieId: id,
    }));
  }

  _renderFilmScreen(movie, movies) {
    const {movieId} = this.state;
    const {genre: activeGenre, setGenre} = this.props;

    if (movieId) {
      const detailedFilm = movies.find((film) => film.id === movieId);
      const {genre} = detailedFilm;
      detailedFilm.cover = `bg-${detailedFilm.poster}`;
      return <MoviePage movie={detailedFilm} similarMovies={this._getSimilarMovies(genre, movies)} />;
    }

    return (
      <Main
        movie={movie}
        movies={movies}
        onMovieTitleClick={this._handleMovieTitleClick}
        setGenre={setGenre}
        activeGenre={activeGenre}
      />
    );
  }

  render() {
    const {movies} = this.props;
    const movie = movies[0];
    const {genre} = movies[0];
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderFilmScreen(movie, movies)}
          </Route>
          <Route exact path="/dev-film">
            <MoviePage movie={movie} similarMovies={this._getSimilarMovies(genre, movies)} />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
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
  genre: PropTypes.string.isRequired,
  setGenre: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  genre: state.genre,
});

const mapDispatchToProps = (dispatch) => ({
  setGenre(genre) {
    dispatch(ActionCreator.setGenre(genre));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
