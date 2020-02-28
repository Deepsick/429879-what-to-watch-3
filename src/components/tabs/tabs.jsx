import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import Tab from './tab.jsx';

export const TabName = {
  OVERVIEW: `overview`,
  DETAILS: `details`,
  REVIEWS: `reviews`,
};


class Tabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: props.activeTab,
    };

    this._handleTabClick = this._handleTabClick.bind(this);
  }

  _handleTabClick(tab) {
    return (evt) => {
      evt.preventDefault();
      this.setState({active: tab});
    };
  }

  _getTabs() {
    return Object.values(TabName).map((tab, index) => {
      return (
        <Tab
          key={index}
          onClick={this._handleTabClick(tab)}
          isActive={tab === this.state.active}
          tabName={tab}
        />
      );
    });
  }

  render() {
    return (
      <nav className="movie-nav movie-card__nav">
        <ul className="movie-nav__list">
          {this._getTabs()}
        </ul>
      </nav>
    );
  }
}

Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
};

export default Tabs;
