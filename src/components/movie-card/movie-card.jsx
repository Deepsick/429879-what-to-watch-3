import React from 'react';
import PropTypes from 'prop-types';

const MovieCard = ({name, picture, id, onMovieTitleClick, onHover}) => {
  const handleCardHover = (cardId) => (evt) => {
    evt.preventDefault();
    onHover(cardId);
  };

  const handleCardClick = (cardId) => (evt) => {
    evt.preventDefault();
    onMovieTitleClick(cardId);
  };

  return (
    <article className="small-movie-card catalog__movies-card" onMouseEnter={handleCardHover(id)}>
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
