import * as React from 'react';

import Tab from './tab';
import {TabName} from '../../const';

interface Props {
  setActiveItem: (item: string) => void;
  active: string;
}

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

const Tabs: React.FunctionComponent<Props> = ({setActiveItem, active}: Props) => (
  <nav className="movie-nav movie-card__nav">
    <ul className="movie-nav__list">
      {getTabs(active, setActiveItem)}
    </ul>
  </nav>
);

export default React.memo(Tabs);
