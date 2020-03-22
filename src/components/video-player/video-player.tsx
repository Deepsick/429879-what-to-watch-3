import * as React from 'react';
import {connect} from 'react-redux';

import Controls from './controls';
import {getMovies} from '../../reducer/data/selectors';
import {Movie} from '../../types';

interface Props {
  films: Movie[];
  id: number;
  setLoading: (isLoading: boolean) => void;
  setPlaying: (isPlaying: boolean) => void;
  setProgress: (progress: number) => void;
  setDuration: (duration: number) => void;
  isLoading: boolean;
  isPlaying: boolean;
  duration: number;
  progress: number;
}

class VideoPlayer extends React.PureComponent<Props, {}> {
  private _videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);
    this._videoRef = React.createRef();

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
  }

  componentDidMount() {
    const {
      isPlaying,
      setLoading,
      setDuration,
      setPlaying,
      setProgress,
    } = this.props;

    const video = this._videoRef.current;

    video.src = this._getFilmById();

    video.oncanplaythrough = () => {
      setLoading(false);
      setDuration(video.duration);

      if (isPlaying) {
        video.play();
      } else {
        video.pause();
      }
    };

    video.onplay = () => {
      setPlaying(true);
    };

    video.onpause = () => {
      setPlaying(false);
    };

    video.ontimeupdate = () => setProgress(Math.floor(video.currentTime));
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
    const {isPlaying} = this.props;
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
    const {isPlaying, progress, duration} = this.props;

    return (
      <React.Fragment>
        <video
          ref={this._videoRef}
          width='100%'
          className="player__video"
        ></video>
        <Controls
          onPlayButtonClick={this._handlePlayButtonClick}
          onFullScreenButtonClick={this._handleFullScreenButtonClick}
          isPlaying={isPlaying}
          duration={duration}
          progress={progress}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  films: getMovies(state),
});

export {VideoPlayer};
export default connect(mapStateToProps)(VideoPlayer);
