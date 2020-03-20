import * as React from 'react';
import {connect} from 'react-redux';

import Controls from './controls';
import {getMovies} from '../../reducer/data/selectors';
import {Movie} from '../../types';

interface Props {
  films: Movie[];
  id: number;
  isControls: boolean;
}

interface State {
  isLoading: boolean;
  film: string;
  isPlaying: boolean;
  progress: number;
  duration: number;
}

class VideoPlayer extends React.PureComponent<Props, State> {
  private _videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);
    this._videoRef = React.createRef();

    this.state = {
      isLoading: true,
      film: props.src || this._getFilmById(),
      isPlaying: true,
      progress: 0,
      duration: 0,
    };

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
  }

  componentDidMount() {
    const {film, isPlaying} = this.state;

    const video = this._videoRef.current;

    video.src = film;

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

  render() {
    const {isControls} = this.props;
    const {isPlaying, progress, duration} = this.state;

    return (
      <React.Fragment>
        <video
          ref={this._videoRef}
          width='100%'
          // poster={poster || ``}
          className="player__video"
        ></video>
        {isControls &&
          <Controls
            onPlayButtonClick={this._handlePlayButtonClick}
            onFullScreenButtonClick={this._handleFullScreenButtonClick}
            isPlaying={isPlaying}
            duration={duration}
            progress={progress}
          />
        }

      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  films: getMovies(state),
});

export {VideoPlayer};
export default connect(mapStateToProps)(VideoPlayer);
