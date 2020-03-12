import React, {Fragment, memo} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import VideoPreview from '../video-preview/video-preview.jsx';
import {AppRoute} from '../../const.js';

const MovieCard = ({id, name, picture, trailer, isVideo, onHover, onMouseOut}) => (
  <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={onHover}
    onMouseOut={onMouseOut}
  >
    {isVideo ?
      <VideoPreview trailer={trailer} />
      : <Fragment>
        <Link to={`${AppRoute.FILMS}/${id}`}>
          <div className="small-movie-card__image">
            <img
              src={picture}
              alt={name}
              width="280"
              height="175"
            />
          </div>
        </Link>
        <h3 className="small-movie-card__title">
          <Link
            className="small-movie-card__link"
            to={`${AppRoute.FILMS}/${id}`}
          >
            {name}
          </Link>
        </h3>
      </Fragment>
    }
  </article>
);

MovieCard.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  trailer: PropTypes.string.isRequired,
  isVideo: PropTypes.bool.isRequired,
  onHover: PropTypes.func.isRequired,
  onMouseOut: PropTypes.func.isRequired,
};

export default memo(MovieCard);
