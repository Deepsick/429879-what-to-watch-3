import React, {PureComponent} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state.js";
import {getMovies} from '../../reducer/data/selectors.js';
import {getGenre, getShownMoviesCount} from '../../reducer/state/selectors.js';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import {START_INDEX, MAX_SIMILAR_MOVIES_COUNT} from '../../const';

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
    return movies.filter((movie) => movie.genre === genre).slice(START_INDEX, MAX_SIMILAR_MOVIES_COUNT);
  }

  _handleMovieTitleClick(id) {
    this.setState(() => ({
      movieId: id,
    }));
  }

  _handleVideoPlayButtonClick(id) {
    this.setState({isVideo: id});
  }

  _handleVideoExitButtonClick() {
    this.setState({isVideo: null});
  }

  _renderFilmScreen(movies) {
    const {movieId, isVideo} = this.state;
    const {genre: activeGenre, setGenre, addShownMovies, shownMoviesCount} = this.props;

    if (isVideo) {
      const videoMovie = movies.find((film) => film.id === isVideo);
      const {video, poster, duration} = videoMovie;
      return <VideoPlayer
        onExitButtonClick={this._handleVideoExitButtonClick}
        src={video}
        poster={poster}
        isControls={true}
        muted={false}
        isPlaying={true}
        duration={duration}
      />;
    }

    if (movieId) {
      const movie = movies.find((film) => film.id === movieId);
      const {genre} = movie;
      console.log(movie, genre);
      return <MoviePage
        movie={movie}
        similarMovies={this._getSimilarMovies(genre, movies.filter((film) => film.id !== movieId))}
        onPlayButtonClick={this._handleVideoPlayButtonClick}
      />;
    }

    return (
      <Main
        movie={{}}
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
    return (
      <BrowserRouter>
        <Switch>
          {this._renderFilmScreen(movies)}
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
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
  genre: PropTypes.string.isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
  setGenre: PropTypes.func.isRequired,
  addShownMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  genre: getGenre(state),
  shownMoviesCount: getShownMoviesCount(state),
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
