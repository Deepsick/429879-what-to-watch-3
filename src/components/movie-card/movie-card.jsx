import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

const MOVIE_DELAY = 1000;

const MovieCard = ({name, picture, id, trailer, isVideo, onMovieTitleClick, onHover, onMouseOut}) => {
  const handleCardHover = (cardId) => (evt) => {
    evt.preventDefault();
    const playerTimeoutId = setTimeout(()=> {
      onHover(cardId);
      clearTimeout(playerTimeoutId);
    }, MOVIE_DELAY);
  };

  const handleCardClick = (cardId) => (evt) => {
    evt.preventDefault();
    onMovieTitleClick(cardId);
  };

  return (
    <article
      className="small-movie-card catalog__movies-card"
      onMouseEnter={handleCardHover(id)}
      onMouseOut={onMouseOut}
    >
      {isVideo ?
        <VideoPlayer src={trailer} isPlaying={true} muted={true} />
        : <Fragment>
          <div className="small-movie-card__image" onClick={handleCardClick(id)}>
            <img
              src={`img/${picture}`}
              alt={name}
              width="280"
              height="175"
            />
          </div>
          <h3 className="small-movie-card__title" onClick={handleCardClick(id)}>
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

  componentWillUnmount() {
    window.removeEventListener('mouseout', this.onResize.bind(this))
  }
};

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
