import * as React from "react";
import {Route, Redirect} from "react-router-dom";
import {AppRoute, Auth} from "../../const";

const PrivateRoute = ({component, path, exact, authStatus}) => {
  console.log(authStatus);
  const renderedComponent = authStatus === Auth.AUTH ?
    component :
    <Redirect to={AppRoute.LOGIN} />;

  return <Route
    path={path}
    exact={exact}
    render={() => renderedComponent}
  />;
};

export default PrivateRoute;
