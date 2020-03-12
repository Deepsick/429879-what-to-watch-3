import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';


class VideoPreview extends PureComponent {
  constructor(props) {
    super(props);
    this._videoRef = createRef();

    this.state = {
      isLoading: true,
      muted: true,
    };
  }

  componentDidMount() {
    const {muted} = this.state;
    const {trailer} = this.props;
    const video = this._videoRef.current;

    video.src = trailer;
    video.muted = muted;

    video.oncanplaythrough = () => {
      this.setState({
        isLoading: false,
      });
      video.play();
    };
  }

  componentWillUnmount() {
    const video = this._videoRef.current;

    video.oncanplaythrough = null;
    video.src = ``;
  }

  render() {
    return <video ref={this._videoRef} width='100%' />;
  }
}

VideoPreview.propTypes = {
  trailer: PropTypes.string.isRequired,
};


export default VideoPreview;
