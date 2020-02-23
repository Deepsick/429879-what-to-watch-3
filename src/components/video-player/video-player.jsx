import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
class VideoPlayer extends PureComponent {
  constructor(props) {
    super(props);

    this._videoRef = createRef();

    this.state = {
      isLoading: true,
      isPlaying: props.isPlaying,
    };
  }

  componentDidMount() {
    const {src, muted} = this.props;
    const video = this._videoRef.current;

    video.src = src;
    video.muted = muted;

    video.oncanplaythrough = () => this.setState({
      isLoading: false,
    });

    video.onplay = () => {
      this.setState({
        isPlaying: true,
      });
    };

    video.onpause = () => this.setState({
      isPlaying: false,
    });
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.onplay = null;
    video.onpause = null;
    video.src = ``;
  }

  render() {
    return (
      <video
        ref={this._videoRef}
        controls
        width='100%'
      ></video>
    );
  }

  componentDidUpdate() {
    const video = this._videoRef.current;

    if (this.props.isPlaying) {
      video.play();
    } else {
      video.pause();
    }
  }
}

VideoPlayer.propTypes = {
  src: PropTypes.string.isRequired,
  muted: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

export default VideoPlayer;
