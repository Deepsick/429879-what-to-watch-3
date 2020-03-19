import React, {PureComponent, createRef, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getMovies} from '../../reducer/data/selectors.js';
import Controls from './controls.jsx';

class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = createRef();

    this.state = {
      isLoading: true,
      film: props.src || this._getFilmById(),
      isPlaying: props.isPlaying,
      progress: 0,
      duration: 0,
    };

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
  }

  _getFilmById() {
    const {films, id} = this.props;
    return films.find((film) => film.id === +id).video;
  }

  _handlePlayButtonClick() {
    const video = this._videoRef.current;
    const {isPlaying} = this.state;
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
  }

  _handleFullScreenButtonClick() {
    const video = this._videoRef.current;
    video.requestFullscreen();
  }

  componentDidMount() {
    const {film, muted, isPlaying} = this.state;

    const video = this._videoRef.current;

    video.src = film;
    video.muted = muted;

    video.oncanplaythrough = () => {
      this.setState({
        isLoading: false,
        duration: video.duration,
      });

      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    };

    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    video.onpause = () => {
      this.setState({
        isPlaying: false,
      });
    };

    video.ontimeupdate = () => this.setState({
      progress: Math.floor(video.currentTime),
    });
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.ontimeupdate = null;
    video.src = ``;
  }

  render() {
    const {isControls, onExitButtonClick} = this.props;
    const {isPlaying, progress, duration, film} = this.state;
    const {poster} = film;

    return (
      <Fragment>
        <video
          ref={this._videoRef}
          width='100%'
          poster={poster || ``}
          className="player__video"
        ></video>
        {isControls &&
          <Controls
            onExitButtonClick={onExitButtonClick}
            onPlayButtonClick={this._handlePlayButtonClick}
            onFullScreenButtonClick={this._handleFullScreenButtonClick}
            isPlaying={isPlaying}
            duration={duration}
            progress={progress}
          />
        }

      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string,
  promo: PropTypes.shape({
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
  }),
  muted: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isControls: PropTypes.bool.isRequired,
  poster: PropTypes.string,
  onExitButtonClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  films: getMovies(state),
});

export default connect(mapStateToProps)(VideoPlayer);
