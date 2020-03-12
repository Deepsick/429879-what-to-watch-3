import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';

const withVideo = (Component) => {
  class WithVideo extends PureComponent {
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
      const {isVideo} = this.props;
      const component = isVideo ?
        <video ref={this._videoRef} width='100%' /> :
        <Component
          {...this.props}
        />;

      return {component};
    }
  }

  WithVideo.propTypes = {
    isVideo: PropTypes.bool.isRequired,
    trailer: PropTypes.string.isRequired,
  };

  return WithVideo;
};

export default withVideo;
