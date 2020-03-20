import * as React from 'react';

interface Props {
  trailer: string;
}

interface State {
  isLoading: boolean;
  muted: boolean;
}

class VideoPreview extends React.PureComponent<Props, State> {
  private _videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);
    this._videoRef = React.createRef();

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

export default VideoPreview;
