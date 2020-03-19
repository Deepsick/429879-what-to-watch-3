import React, {memo} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import {getAuthStatus} from '../../reducer/user/selectors.js';
import Spinner from '../spinner/spinner.jsx';
import {AppRoute, Auth} from "../../const";

const PrivateRoute = ({Component, path, exact, authStatus}) => {
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
export default connect(mapStateToProps)(memo(PrivateRoute));
