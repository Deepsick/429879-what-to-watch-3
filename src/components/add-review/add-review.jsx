import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Operation} from '../../reducer/data/data.js';
import {CommentLength, AppRoute} from '../../const.js';
import history from '../../history.js';
import {getMovies} from '../../reducer/data/selectors.js';
import Logo from '../logo/logo.jsx';
import Avatar from '../avatar/avatar.jsx';
import {getAuthStatus, getAvatar} from '../../reducer/user/selectors.js';

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      comment: ``,
      rating: null,
    };

    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
    this._handleRadioFieldsChange = this._handleRadioFieldsChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this._handleTextFieldChange = this._handleTextFieldChange.bind(this);
  }

  _handleTextFieldChange(evt) {
    this.setState({comment: evt.target.value});
  }

  _handleRadioFieldsChange(evt) {
    const checked = evt.target.value;
    this.setState({rating: +checked});
  }

  _validateTextInput(comment) {
    return comment.length <= CommentLength.MAX && comment.length >= CommentLength.MIN;
  }

  _validateRating(rating) {
    return !!rating;
  }

  _isButtonDisabled() {
    const {comment, rating} = this.state;

    const isCommentValid = this._validateTextInput(comment);
    const isRatingValid = this._validateRating(rating);
    return !(isRatingValid && isCommentValid);
  }

  _handleSubmit() {
    const {postComment, id} = this.props;
    const {comment, rating} = this.state;

    postComment(id, {
      rating,
      comment,
    });
    history.push(`${AppRoute.FILMS}/${id}`);
  }

  render() {
    const {movies, id, avatar, isAuth} = this.props;
    const movie = movies.find((film) => film.id === +id);
    const {cover, name, poster} = movie;
    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={cover} alt={name} />
          </div>
    
          <h1 className="visually-hidden">WTW</h1>
    
          <header className="page-header">
            <Logo />

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <Link to={`${AppRoute.FILMS}/${id}`} className="breadcrumbs__link">{name}</Link>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <Avatar isAuth={isAuth} avatar={avatar} />
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={poster} alt={name} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={this._handleSubmit}>
            <div className="rating">
              <div className="rating__stars" onChange={this._handleRadioFieldsChange}>
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" />
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5"/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea onChange={this._handleTextFieldChange} className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"></textarea>
              <div className="add-review__submit">
                <button
                  className="add-review__btn"
                  type="submit"
                  disabled={this._isButtonDisabled()}
                  style={{opacity: `${this._isButtonDisabled() ? 0.3 : 1}`}}
                >Post
                </button>
              </div>

            </div>
          </form>
        </div>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: getMovies(state),
  isAuth: getAuthStatus(state),
  avatar: getAvatar(state),
});

const mapDispatchToProps = (dispatch) => ({
  postComment(id, comment) {
    dispatch(Operation.postComment(id, comment));
  },
});

export {AddReview};
export default connect(mapStateToProps, mapDispatchToProps)(AddReview);
