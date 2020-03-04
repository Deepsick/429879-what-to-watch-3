import React, {Fragment, memo} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

const handleCardClick = (cardId, onMovieTitleClick) => {
  return (evt) => {
    evt.preventDefault();
    onMovieTitleClick(cardId);
  };
};

const MovieCard = ({id, name, picture, trailer, isVideo, onMovieTitleClick, onHover, onMouseOut}) => (
  <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={onHover(id)}
    onMouseOut={onMouseOut}
  >
    {isVideo ?
      <VideoPlayer src={trailer} isPlaying={true} muted={true} isControls={false} isFullScreen={false} />
      : <Fragment>
        <div className="small-movie-card__image" onClick={handleCardClick(id, onMovieTitleClick)}>
          <img
            src={`img/${picture}`}
            alt={name}
            width="280"
            height="175"
          />
        </div>
        <h3 className="small-movie-card__title" onClick={handleCardClick(id, onMovieTitleClick)}>
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

export default memo(MovieCard);
