import React, {PureComponent, createRef, Fragment} from 'react';
import PropTypes from 'prop-types';
import Controls from './controls.jsx';
class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying,
    };

    this._handlePlayButtonClick = this._handlePlayButtonClick.bind(this);
    this._handleFullScreenButtonClick = this._handleFullScreenButtonClick.bind(this);
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
    const {src, muted, isPlaying} = this.props;
    const video = this._videoRef.current;

    video.src = src;
    video.muted = muted;

    video.oncanplaythrough = () => {
      this.setState({
        isLoading: false,
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
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.src = ``;
  }

  render() {
    const {poster, isControls, onExitButtonClick} = this.props;
    const {isPlaying} = this.state;

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
          />
        }

      </Fragment>
    );
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  isControls: PropTypes.bool.isRequired,
  poster: PropTypes.string,
  onExitButtonClick: PropTypes.func,
};

export default VideoPlayer;
