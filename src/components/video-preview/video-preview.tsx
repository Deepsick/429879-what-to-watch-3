import * as React from 'react';

interface Props {
  trailer: string;
  setLoading: (isLoading: boolean) => void;
  muted: boolean;
  isLoading: boolean;
}

class VideoPreview extends React.PureComponent<Props, {}> {
  private _videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props) {
    super(props);
    this._videoRef = React.createRef();
  }

  componentDidMount() {
    const {trailer, muted, setLoading} = this.props;
    const video = this._videoRef.current;

    video.src = trailer;
    video.muted = muted;

    video.oncanplaythrough = () => {
      setLoading(false);
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
