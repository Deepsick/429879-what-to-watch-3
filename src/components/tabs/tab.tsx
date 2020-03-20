import * as React from 'react';

interface Props {
  isActive: boolean;
  onClick: (evt: React.MouseEvent<HTMLLIElement>) => void;
  tabName: string;
}

const ACTIVE_CLASS = `movie-nav__item--active`;

const addActiveClass = (isActive) => {
  return isActive ? ACTIVE_CLASS : ``;
};

const getSentencedCaseTabName = (tabName) => {
  const firstLetter = tabName[0].toUpperCase();
  return `${firstLetter}${tabName.slice(1)}`;
};

const Tab: React.FunctionComponent<Props> = ({isActive, onClick, tabName}: Props) => (
  <li
    className={`movie-nav__item ${addActiveClass(isActive)}`}
    onClick={onClick}
  >
    <a href="#" className="movie-nav__link">{getSentencedCaseTabName(tabName)}</a>
  </li>
);

export default React.memo(Tab);
