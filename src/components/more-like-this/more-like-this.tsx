import * as React from 'react';

import MoviesList from '../movies-list/movies-list';
import {Movie} from '../../types';

interface Props {
  movies: Movie[];
}

const MoreLikeThis: React.FunctionComponent<Props> = ({movies}: Props) => {
  return (
    <section className="catalog catalog--like-this">
      <h2 className="catalog__title">More like this</h2>

      <MoviesList movies={movies} />
    </section>
  );
};

export default React.memo(MoreLikeThis);
