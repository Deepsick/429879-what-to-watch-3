import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const MOVIE_DELAY = 1000;

const withHover = (Component) => {
  class WithHover extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isVideo: false,
      };

      this._timerId = null;
      this._handleMouseOut = this._handleMouseOut.bind(this);
      this._handleCardHover = this._handleCardHover.bind(this);
    }

    _handleCardHover() {
      this._timerId = setTimeout(()=> {
        this.setState({isVideo: true});
        clearTimeout(this._timerId);
      }, MOVIE_DELAY);
    }

    _handleMouseOut() {
      clearTimeout(this._timerId);
      this.setState({isVideo: false});
    }

    componentWillUnmount() {
      clearTimeout(this._timerId);
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
