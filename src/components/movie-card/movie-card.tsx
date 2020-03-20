import * as React from 'react';
import {Link} from 'react-router-dom';

import VideoPreview from '../video-preview/video-preview';
import {AppRoute} from '../../const';

interface Props {
  name: string;
  picture: string;
  trailer: string;
  id: number;
  isVideo: boolean;
  onHover: () => void;
  onMouseOut: () => void;
}

const MovieCard: React.FunctionComponent<Props> = ({
  id,
  name,
  picture,
  trailer,
  isVideo,
  onHover,
  onMouseOut
}: Props) => (
  <article
    className="small-movie-card catalog__movies-card"
    onMouseEnter={onHover}
    onMouseOut={onMouseOut}
  >
    {isVideo ?
      <VideoPreview trailer={trailer} />
      : <React.Fragment>
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
      </React.Fragment>
    }
  </article>
);

export default React.memo(MovieCard);
