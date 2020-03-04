import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import VideoPlayer from '../video-player/video-player.jsx';

class App extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      movieId: null,
      isVideo: null,
    };

    this._handleMovieTitleClick = this._handleMovieTitleClick.bind(this);
    this._handleVideoPlayButtonClick = this._handleVideoPlayButtonClick.bind(this);
    this._handleVideoExitButtonClick = this._handleVideoExitButtonClick.bind(this);
  }

  _getSimilarMovies(genre, movies) {
    return movies.filter((movie) => movie.genre === genre).slice(4);
  }

  _handleMovieTitleClick(id) {
    this.setState(() => ({
      movieId: id,
    }));
  }

  _handleVideoPlayButtonClick(id) {
    this.setState(() => ({
      isVideo: id,
    }));
  }

  _handleVideoExitButtonClick() {
    this.setState(() => ({
      isVideo: null,
    }));
  }

  _renderFilmScreen(movie, movies) {
    const {movieId, isVideo} = this.state;
    const {genre: activeGenre, setGenre, addShownMovies, shownMoviesCount} = this.props;

    if (isVideo) {
      const videoMovie = movies.find((film) => film.id === isVideo);
      const {trailer, poster} = videoMovie;
      return <VideoPlayer
        onExitButtonClick={this._handleVideoExitButtonClick}
        src={trailer}
        poster={poster}
        isControls={true}
        muted={false}
        isPlaying={true}
        isFullScreen={false}
      />;
    }

    if (movieId) {
      const detailedFilm = movies.find((film) => film.id === movieId);
      const {genre} = detailedFilm;
      detailedFilm.cover = `bg-${detailedFilm.poster}`;
      return <MoviePage
        movie={detailedFilm}
        similarMovies={this._getSimilarMovies(genre, movies)}
        onPlayButtonClick={this._handleVideoPlayButtonClick}
      />;
    }

    return (
      <Main
        movie={movie}
        movies={movies}
        onMovieTitleClick={this._handleMovieTitleClick}
        setGenre={setGenre}
        activeGenre={activeGenre}
        addShownMovies={addShownMovies}
        shownMoviesCount={shownMoviesCount}
        onPlayButtonClick={this._handleVideoPlayButtonClick}
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
            <MoviePage
              movie={movie}
              similarMovies={this._getSimilarMovies(genre, movies)}
              onPlayButtonClick={this._handleVideoPlayButtonClick}
            />
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
  shownMoviesCount: PropTypes.number.isRequired,
  setGenre: PropTypes.func.isRequired,
  addShownMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: state.movies,
  genre: state.genre,
  shownMoviesCount: state.shownMoviesCount,
});

const mapDispatchToProps = (dispatch) => ({
  setGenre(genre) {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.resetShownMovies());
  },
  addShownMovies() {
    dispatch(ActionCreator.addShownMovies());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
