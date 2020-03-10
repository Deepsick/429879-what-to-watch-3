import React, {memo} from 'react';
import PropTypes from 'prop-types';

const Header = ({isAuth}) => (
  <header className={`page-header ${isAuth && `movie-card__head`}`}>
    <div className="logo">
      <a className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>

    <div className="user-block">
      <div className="user-block__avatar">
        {isAuth ?
          <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /> :
          <a href="sign-in.html" className="user-block__link">Sign in</a>}
      </div>
    </div>
  </header>
);

Header.propTypes = {
  isAuth: PropTypes.string.isRequired,
};

export default memo(Header);
