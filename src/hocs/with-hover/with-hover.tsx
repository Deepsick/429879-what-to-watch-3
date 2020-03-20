import * as React from 'react';

const MOVIE_DELAY = 1000;

interface Props {
  picture: string;
  id: number;
  name: string;
  trailer: string;
}

interface State {
  isVideo: boolean;
}

const withHover = (Component) => {
  class WithHover extends React.PureComponent<Props, State> {
    private _timerId: number | null;

    constructor(props) {
      super(props);

      this.state = {
        isVideo: false,
      };

      this._timerId = null;
      this._handleMouseOut = this._handleMouseOut.bind(this);
      this._handleCardHover = this._handleCardHover.bind(this);
    }

    componentWillUnmount() {
      clearTimeout(this._timerId);
    }

    _handleCardHover() {
      this._timerId = window.setTimeout(()=> {
        this.setState({isVideo: true});
        clearTimeout(this._timerId);
      }, MOVIE_DELAY);
    }

    _handleMouseOut() {
      clearTimeout(this._timerId);
      this.setState({isVideo: false});
    }

    render() {
      return (
        <Component
          {...this.props}
          onHover={this._handleCardHover}
          onMouseOut={this._handleMouseOut}
          isVideo={this.state.isVideo}
        />
      );
    }
  }

  return WithHover;
};

export default withHover;
