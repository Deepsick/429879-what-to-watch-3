import React, {memo} from 'react';
import PropTypes from 'prop-types';

const ACTIVE_CLASS = `movie-nav__item--active`;

const addActiveClass = (isActive) => {
  return isActive ? ACTIVE_CLASS : ``;
};

const getSentencedCaseTabName = (tabName) => {
  const firstLetter = tabName[0].toUpperCase();
  return `${firstLetter}${tabName.slice(1)}`;
};

const Tab = ({isActive, onClick, tabName}) => (
  <li
    className={`movie-nav__item ${addActiveClass(isActive)}`}
    onClick={onClick}
  >
    <a href="#" className="movie-nav__link">{getSentencedCaseTabName(tabName)}</a>
  </li>
);

Tab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  tabName: PropTypes.string.isRequired,
};

export default memo(Tab);
