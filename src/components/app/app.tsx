import * as React from 'react';
import {Router, Switch, Route} from 'react-router-dom';

import history from '../../history';
import Main from '../main/main';
import MoviePage from '../movie-page/movie-page';
import AddReview from '../add-review/add-review';
import SignIn from '../sign-in/sign-in';
import VideoPlayer from '../video-player/video-player';
import MyList from '../my-list/my-list';
import PrivateRoute from '../private-route/private-route';
import withActiveItem from '../../hocs/with-active-item/with-active-item';
import withError from '../../hocs/with-error/with-error';
import withReviewState from '../../hocs/with-review-state/with-review-state';
import withVideo from '../../hocs/with-video/with-video';
import {AppRoute, TabName} from '../../const';

const MoviePageWrapped = withActiveItem(MoviePage);
const SignInWrapped = withError(SignIn);
const AddReviewWrapped = withReviewState(AddReview);
const VideoPlayerWrapped = withVideo(VideoPlayer);

const App: React.FunctionComponent<{}> = () => (
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
        component={SignInWrapped}
      />
      <PrivateRoute
        exact={true}
        path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`}
        Component={AddReviewWrapped}
      />
      <PrivateRoute
        exact={true}
        path={AppRoute.MY_LIST}
        Component={MyList}
      />
      <Route exact path={`${AppRoute.PLAYER}/:id`} render={({match}) => (
        <VideoPlayerWrapped
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

export default React.memo(App);
