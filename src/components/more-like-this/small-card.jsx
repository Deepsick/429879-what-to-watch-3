import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const.js';

const SmallCard = ({picture, name, id}) => (
  <article className="small-movie-card catalog__movies-card">
    <div className="small-movie-card__image">
      <img src={picture} alt={name} width="280" height="175" />
    </div>
    <h3 className="small-movie-card__title">
      <Link className="small-movie-card__link" to={`${AppRoute.FILMS}/${id}`}>{name}</Link>
    </h3>
  </article>
);

SmallCard.propTypes = {
  picture: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(SmallCard);
