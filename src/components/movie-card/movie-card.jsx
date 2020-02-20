import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import VideoPlayer from '../video-player/video-player.jsx';

const MovieCard = ({name, picture, id, trailer, isVideo, onMovieTitleClick, onHover}) => {
  const handleCardHover = (cardId) => (evt) => {
    evt.preventDefault();
    onHover(cardId);
  };

  const handleCardClick = (cardId) => (evt) => {
    evt.preventDefault();
    onMovieTitleClick(cardId);
  };
  console.log(id)
  return (
    <article className="small-movie-card catalog__movies-card" onMouseEnter={handleCardHover(id)}>
      {isVideo === id ?
        <VideoPlayer src={trailer} isPlaying={true}/>
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
};

MovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  onHover: PropTypes.func.isRequired,
};

export default MovieCard;
