import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';

import Spinner from '../spinner/spinner';
import {getAuthStatus} from '../../reducer/user/selectors';
import {AppRoute, Auth} from "../../const";

interface Props {
  Component: React.ReactType | React.ElementType;
  path: string;
  exact: boolean;
  authStatus: string;
}

const PrivateRoute: React.FunctionComponent<Props> = ({
  Component,
  path,
  exact,
  authStatus,
}: Props) => {
  if (authStatus === null) {
    return <Spinner />;
  }

  return (
    <Route
      path={path}
      exact={exact}
      render={({match}) => {
        return authStatus === Auth.AUTH ?
          <Component {...match.params} /> :
          <Redirect to={AppRoute.LOGIN} />;
      }}
    />
  );
};


const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});

export {PrivateRoute};
export default connect(mapStateToProps)(React.memo(PrivateRoute));
