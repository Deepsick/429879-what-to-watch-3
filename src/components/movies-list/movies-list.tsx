import * as React from 'react';

import MovieCard from '../movie-card/movie-card';
import withHover from '../../hocs/with-hover/with-hover';
import {Movie} from '../../types';

interface Props {
  movies: Movie[];
}

const MovieCardWrapped = withHover(MovieCard);

const MoviesList: React.FunctionComponent<Props> = ({movies}: Props) => (
  <div className="catalog__movies-list">
    {movies.map((movie) => {
      const {name, preview, id, trailer} = movie;
      return (
        <MovieCardWrapped
          key={id}
          picture={preview}
          id={id}
          name={name}
          trailer={trailer}
        />
      );
    })}
  </div>
);

export default React.memo(MoviesList);
