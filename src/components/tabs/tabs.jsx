import React, {memo} from 'react';
import PropTypes from 'prop-types';
import Tab from './tab.jsx';
import {TabName} from '../../const.js';

const handleTabClick = (tab, setActiveItem) => {
  return (evt) => {
    evt.preventDefault();
    setActiveItem(tab);
  };
};

const getTabs = (active, onClick) => {
  return Object.values(TabName).map((tab, index) => {
    return (
      <Tab
        key={index}
        onClick={handleTabClick(tab, onClick)}
        isActive={tab === active}
        tabName={tab}
      />
    );
  });
};

const Tabs = ({setActiveItem, active}) => (
  <nav className="movie-nav movie-card__nav">
    <ul className="movie-nav__list">
      {getTabs(active, setActiveItem)}
    </ul>
  </nav>
);

Tabs.propTypes = {
  setActiveItem: PropTypes.func.isRequired,
  active: PropTypes.string.isRequired,
};

export default memo(Tabs);
