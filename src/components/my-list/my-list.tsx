import * as React from 'react';
import {connect} from 'react-redux';

import Footer from '../footer/footer';
import MoviesList from '../movies-list/movies-list';
import Logo from '../logo/logo';
import Avatar from '../avatar/avatar';
import {Operation} from '../../reducer/data/data';
import {getFavorites} from '../../reducer/data/selectors';
import {getAuthStatus, getAvatar} from '../../reducer/user/selectors';
import {Movie} from '../../types';

interface Props {
  favorites: Movie[];
  isAuth: string;
  avatar: string;
  loadFavorites: () => void;
}

class MyList extends React.PureComponent<Props, {}> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavorites} = this.props;
    loadFavorites();
  }

  render() {
    const {favorites, isAuth, avatar} = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">My list</h1>

          <Avatar isAuth={isAuth} avatar={avatar} />
        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>
          <MoviesList movies={favorites} />
        </section>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
  isAuth: getAuthStatus(state),
  avatar: getAvatar(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadFavorites() {
    dispatch(Operation.loadFavorites());
  },
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
