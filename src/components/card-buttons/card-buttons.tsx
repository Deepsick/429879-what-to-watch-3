import * as React from 'react';
import {Link} from 'react-router-dom';

import {AppRoute} from '../../const';

interface Props {
  id: number;
  isAddReview: boolean;
  isFavorite: boolean;
  onClick: (id: number, status: boolean) => void;
}

const handleMyListButtonClick = (callback, id, isFavorite) => (evt) => {
  evt.preventDefault();
  const status = +!isFavorite;
  callback(id, status);
};

const CardButtons: React.FunctionComponent<Props> = ({id, isAddReview, isFavorite, onClick}: Props) => (
  <div className="movie-card__buttons">
    <Link
      to={`${AppRoute.PLAYER}/${id}`}
      className="btn btn--play movie-card__button"
      type="button"
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </Link>
    <button
      className="btn btn--list movie-card__button"
      type="button"
      onClick={handleMyListButtonClick(onClick, id, isFavorite)}
    >
      <svg viewBox="0 0 18 14" width="18" height="14">
        {isFavorite ?
          <use xlinkHref="#in-list"></use> :
          <use xlinkHref="#add"></use>
        }
      </svg>
      <span>My list</span>
    </button>
    {isAddReview &&
      <Link to={`${AppRoute.FILMS}/${id}${AppRoute.REVIEW}`} className="btn movie-card__button">Add review</Link>
    }
  </div>
);

export default React.memo(CardButtons);
