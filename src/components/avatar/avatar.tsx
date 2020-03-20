import * as React from 'react';
import {Link} from 'react-router-dom';

import {AppRoute, Auth} from '../../const';

interface Props {
  isAuth: string;
  avatar: string;
}

const API_URL = `https://htmlacademy-react-3.appspot.com/`;

const Avatar: React.FunctionComponent<Props> = ({isAuth, avatar}: Props) => (
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

export default React.memo(Avatar);
