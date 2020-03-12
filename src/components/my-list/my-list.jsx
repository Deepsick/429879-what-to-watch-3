import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Footer from '../footer/footer.jsx';
import MoviesList from '../movies-list/movies-list.jsx';
import {getFavorites} from '../../reducer/data/selectors.js';
import Logo from '../logo/logo.jsx';
import Avatar from '../avatar/avatar.jsx';
import {getAuthStatus, getAvatar} from '../../reducer/user/selectors.js';

const MyList = ({favorites, isAuth, avatar}) => (
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

const mapStateToProps = (state) => ({
  favorites: getFavorites(state),
  isAuth: getAuthStatus(state),
  avatar: getAvatar(state),
});

export default connect(mapStateToProps)(memo(MyList));
