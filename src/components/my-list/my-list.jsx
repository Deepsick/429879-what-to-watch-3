import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Footer from '../footer/footer.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import {getFavorites} from '../../reducer/data/selectors.js';
import {Operation} from '../../reducer/data/data.js';
import Logo from '../logo/logo.jsx';
import Avatar from '../avatar/avatar.jsx';
import {getAuthStatus, getAvatar} from '../../reducer/user/selectors.js';

class MyList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {loadFavorites} = this.props;
    loadFavorites();
  }

  render() {
    const {favorites, isAuth, avatar} = this.props;
    console.log(favorites);
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

export default connect(mapStateToProps, mapDispatchToProps)(MyList);
