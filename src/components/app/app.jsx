import React, {PureComponent} from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';
import history from '../../history.js';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/state/state.js";
import {getMovies, getPromo} from '../../reducer/data/selectors.js';
import {getGenre, getShownMoviesCount} from '../../reducer/state/selectors.js';
import {getAuthStatus, getAvatar} from '../../reducer/user/selectors.js';
import Main from '../main/main.jsx';
import MoviePage from '../movie-page/movie-page.jsx';
import AddReview from '../add-review/add-review.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import VideoPlayer from '../video-player/video-player.jsx';
import MyList from '../my-list/my-list.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import {AppRoute, Auth, TabName} from '../../const.js';
import {Operation as UserOperation} from '../../reducer/user/user.js';
import withActiveItem from '../../hocs/with-active-item/with-active-item.jsx';

const MoviePageWrapped = withActiveItem(MoviePage);

class App extends PureComponent {
  render() {
    const {
      movies,
      login,
      genre: activeGenre,
      setGenre, addShownMovies,
      shownMoviesCount,
      authStatus,
      promo,
      avatar, 
    } = this.props;

    return (
      <Router history={history}>
        <Switch>
          <Route exact path={AppRoute.INDEX}>
            <Main
              movie={promo}
              isAuth={authStatus}
              avatar={avatar}
              movies={movies}
              setGenre={setGenre}
              activeGenre={activeGenre}
              addShownMovies={addShownMovies}
              shownMoviesCount={shownMoviesCount}
            />
          </Route>
          <Route exact path={AppRoute.LOGIN}>
            {authStatus === Auth.AUTH ?
              <Redirect to={AppRoute.INDEX} /> :
              <SignIn onSubmit={login} />
            }
          </Route>
          <Route exact path={`${AppRoute.PLAYER}/:id`} render={({match}) => (
            <VideoPlayer
              isControls={true}
              muted={false}
              isPlaying={true}
              films={movies}
              id={match.params.id}
            />
          )}>
          </Route>
          <Route exact path={`${AppRoute.FILMS}/:id${AppRoute.REVIEW}`} render={({match}) => {
            return authStatus === Auth.AUTH ?
              <AddReview id={match.params.id} /> :
              <Redirect to={AppRoute.LOGIN} />;
          }} />
          <Route exact path={`${AppRoute.FILMS}/:id`} render={() => <MoviePageWrapped activeTab={TabName.OVERVIEW} />} />
          <Route exact path={AppRoute.MY_LIST} >
            {authStatus === Auth.AUTH ?
              <MyList /> :
              <Redirect to={AppRoute.LOGIN} />
            }
          </Route>
        </Switch>
      </Router>
    );
  }
}

App.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    trailer: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
  })).isRequired,
  promo: PropTypes.shape({
    name: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    preview: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    scoresCount: PropTypes.number.isRequired,
    isFavorite: PropTypes.bool.isRequired,
    trailer: PropTypes.string.isRequired,
    video: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  genre: PropTypes.string.isRequired,
  shownMoviesCount: PropTypes.number.isRequired,
  setGenre: PropTypes.func.isRequired,
  addShownMovies: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  authStatus: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  promo: getPromo(state),
  genre: getGenre(state),
  shownMoviesCount: getShownMoviesCount(state),
  authStatus: getAuthStatus(state),
  avatar: getAvatar(state),
});

const mapDispatchToProps = (dispatch) => ({
  setGenre(genre) {
    dispatch(ActionCreator.setGenre(genre));
    dispatch(ActionCreator.resetShownMovies());
  },
  addShownMovies() {
    dispatch(ActionCreator.addShownMovies());
  },
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  loadMovies() {
    dispatch()
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
