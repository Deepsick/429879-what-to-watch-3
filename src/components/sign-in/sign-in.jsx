import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {Operation} from '../../reducer/user/user';
import {getAuthStatus} from '../../reducer/user/selectors.js';
import Logo from '../logo/logo.jsx';
import Spinner from '../spinner/spinner.jsx';
import {Auth, AppRoute} from '../../const';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();

    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleSubmit(evt) {
    const {login} = this.props;
    evt.preventDefault();

    const email = this.emailRef.current.value;
    const password = this.passwordRef.current.value;

    if (!email) {
      return this.setState({error: `Введите email`});
    }

    if (!password) {
      return this.setState({error: `Введите пароль`});
    }
    this.setState({error: null});
    return login({
      email,
      password,
    });
  }

  render() {
    const {authStatus} = this.props;
    const {error} = this.state;

    if (authStatus === null) {
      return <Spinner />;
    }

    if (authStatus === Auth.AUTH) {
      return <Redirect to={AppRoute.INDEX} />;
    }

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />
          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form" onSubmit={this._handleSubmit}>
            {error &&
              <div className="sign-in__message">
                {error}
              </div>
            }
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="email"
                  placeholder="Email address"
                  name="user-email"
                  id="user-email"
                  ref={this.emailRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input
                  className="sign-in__input"
                  type="password"
                  placeholder="Password"
                  name="user-password"
                  id="user-password"
                  ref={this.passwordRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
          </div>

          <div className="copyright">
            <p>© 2019 What to watch Ltd.</p>
          </div>
        </footer>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  authStatus: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(Operation.login(authData));
  },
});

SignIn.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
