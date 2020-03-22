import * as React from 'react';

interface Props {
  id: number;
}

interface State {
  isLoading: boolean;
  isPlaying: boolean;
  progress: number;
  duration: number;
}

const withPreview = (Component) => {
  class WithPreview extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        isPlaying: true,
        progress: 0,
        duration: 0,
      };

      this._setLoading = this._setLoading.bind(this);
      this._setPlaying = this._setPlaying.bind(this);
      this._setProgress = this._setProgress.bind(this);
      this._setDuration = this._setDuration.bind(this);
    }

    _setLoading(isLoading) {
      this.setState({isLoading});
    }

    _setPlaying(isPlaying) {
      this.setState({isPlaying});
    }

    _setProgress(progress) {
      this.setState({progress});
    }

    _setDuration(duration) {
      this.setState({duration});
    }

    render() {
      const {isLoading, isPlaying, duration, progress} = this.state;

      return (
        <Component
          {...this.props}
          setLoading={this._setLoading}
          setPlaying={this._setPlaying}
          setProgress={this._setProgress}
          setDuration={this._setDuration}
          isLoading={isLoading}
          isPlaying={isPlaying}
          duration={duration}
          progress={progress}
        />
      );
    }
  }

  return WithPreview;
};

export default withPreview;

