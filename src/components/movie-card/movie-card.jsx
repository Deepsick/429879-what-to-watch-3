import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

const MOVIE_DELAY = 1000;

class MovieCard extends PureComponent {
  constructor(props) {
    super(props);

    this._timerId = null;
  }

  _handleCardHover(cardId) {
    const {onHover} = this.props;

    return (evt) => {
      evt.preventDefault();
      this._timerId = setTimeout(()=> {
        onHover(cardId);
        clearTimeout(this._timerId);
      }, MOVIE_DELAY);
    };
  }

  _handleCardClick(cardId) {
    const {onMovieTitleClick} = this.props;

    return (evt) => {
      evt.preventDefault();
      onMovieTitleClick(cardId);
    };
  }

  render() {
    const {id, name, picture, trailer, isVideo, onMouseOut} = this.props;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onMouseEnter={this._handleCardHover(id)}
        onMouseOut={onMouseOut}
      >
        {isVideo ?
          <VideoPlayer src={trailer} isPlaying={true} muted={true} />
          : <Fragment>
            <div className="small-movie-card__image" onClick={this._handleCardClick(id)}>
              <img
                src={`img/${picture}`}
                alt={name}
                width="280"
                height="175"
              />
            </div>
            <h3 className="small-movie-card__title" onClick={this._handleCardClick(id)}>
              <a
                className="small-movie-card__link"
                href="#"
              >
                {name}
              </a>
            </h3>
          </Fragment>
        }
      </article>
    );
  }

  componentWillUnmount() {
    clearTimeout(this._timerId);
  }
}

MovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  trailer: PropTypes.string.isRequired,
  isVideo: PropTypes.bool.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
};

export default MovieCard;
