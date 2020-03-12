import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AppRoute} from '../../const';

const Avatar = ({isAuth, avatar}) => (
  <div className="user-block">
    {isAuth ?
      <div className="user-block__avatar">
        <Link to={AppRoute.MY_LIST}>
          <img src={avatar} alt="User avatar" width="63" height="63" />
        </Link>
      </div> :
      <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
    }
  </div>
);

Avatar.propTypes = {
  isAuth: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default memo(Avatar);
