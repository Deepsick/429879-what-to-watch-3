export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const isEmptyObject = (object) => {
  return !Object.keys(object).length;
};

export const movieAdapter = (movie) => {
  const {
    name,
    description,
    rating,
    id,
    genre,
    released,
    starring,
    director,
  } = movie;

  return {
    name,
    poster: movie[`poster_image`],
    preview: movie[`preview_image`],
    genre,
    id: +id,
    rating,
    scoresCount: movie[`scores_count`],
    isFavorite: movie[`is_favorite`],
    trailer: movie[`preview_video_link`],
    video: movie[`video_link`],
    duration: movie[`run_time`],
    year: released,
    cover: movie[`background_image`],
    bgColor: movie[`background_color`],
    director,
    starring,
    description,
  };
};

export const moviesAdapter = (movies) => {
  return movies.map((movie) => movieAdapter(movie));
};
