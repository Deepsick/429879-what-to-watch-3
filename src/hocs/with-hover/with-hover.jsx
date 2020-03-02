import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const MOVIE_DELAY = 1000;

const withHover = (Component) => {
  class WithHover extends PureComponent {
    constructor(props) {
      super(props);

      this._timerId = null;

      this._handleMouseOut = this._handleMouseOut.bind(this);
      this._handleCardHover = this._handleCardHover.bind(this);
    }

    _handleCardHover(cardId) {
      const {onHover} = this.props;
      return (evt) => {
        evt.preventDefault();
        this._timerId = setTimeout(()=> {
          onHover(cardId);
          clearTimeout(this._timerId);
        }, MOVIE_DELAY);
      };
    }

    _handleMouseOut() {
      const {onMouseOut} = this.props;

      clearTimeout(this._timerId);
      onMouseOut();
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
        />
      );
    }
  }

  WithHover.propTypes = {
    onMouseOut: PropTypes.func.isRequired,
    onHover: PropTypes.func.isRequired,
  };

  return WithHover;
};

export default withHover;
