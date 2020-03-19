import React, {memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {AppRoute, Auth} from '../../const';

const API_URL = `https://htmlacademy-react-3.appspot.com/`;

const Avatar = ({isAuth, avatar}) => (
  <div className="user-block">
    {isAuth === Auth.AUTH ?
      <div className="user-block__avatar">
        <Link to={AppRoute.MY_LIST}>
          <img src={`${API_URL}${avatar}`} alt="User avatar" width="63" height="63" />
        </Link>
      </div> :
      <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
    }
  </div>
);

Avatar.propTypes = {
  isAuth: PropTypes.string,
  avatar: PropTypes.string,
};

export default memo(Avatar);
