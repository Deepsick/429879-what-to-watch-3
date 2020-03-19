import React, {memo} from 'react';
import {Router, Switch, Route} from 'react-router-dom';
import history from '../../history.js';

import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import AddReview from '../add-review/add-review.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import MyList from '../my-list/my-list.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';
import {AppRoute, TabName} from '../../const.js';

const MoviePageWrapped = withActiveItem(MoviePage);

const App = () => (
  <Router history={history}>
    <Switch>
      <Route
        exact
        path={AppRoute.INDEX}
        component={Main}
      />
      <Route
        exact={true}
        path={AppRoute.LOGIN}
        component={SignIn}
      />
      <PrivateRoute
        exact={true}
        path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
        Component={AddReview}
      />
      <PrivateRoute
        exact={true}
        path={AppRoute.MY_LIST}
        Component={MyList}
      />
      <Route exact path={`${AppRoute.PLAYER}/:id`} render={({match}) => (
        <VideoPlayer
          isControls={true}
          muted={false}
          isPlaying={true}
          id={match.params.id}
        />
      )} />
      <Route exact path={`${AppRoute.FILMS}/:id`} render={({match}) => {
        return <MoviePageWrapped activeTab={TabName.OVERVIEW} id={match.params.id} />;
      }}
      />
    </Switch>
  </Router>
);

App.propTypes = {};

export default memo(App);
