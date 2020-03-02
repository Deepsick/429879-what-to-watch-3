import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        active: props.activeTab || null,
      };

      this._setActiveItem = this._setActiveItem.bind(this);
      this._resetActiveItem = this._resetActiveItem.bind(this);
    }

    _setActiveItem(item) {
      this.setState({active: item});
    }

    _resetActiveItem() {
      this.setState({active: null});
    }

    render() {
      const {active} = this.state;

      return (
        <Component
          {...this.props}
          setActiveItem={this._setActiveItem}
          resetActiveItem={this._resetActiveItem}
          active={active}
        />
      );
    }
  }

  WithActiveItem.propTypes = {
    activeTab: PropTypes.string,
  };

  return WithActiveItem;
};

export default withActiveItem;

