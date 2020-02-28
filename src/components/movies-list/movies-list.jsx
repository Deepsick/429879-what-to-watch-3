import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';
import {ALL_GENRES} from '../../const';

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
    };

    this._handleCardHover = this._handleCardHover.bind(this);
    this._handleCardMouseOut = this._handleCardMouseOut.bind(this);
  }

  _handleCardHover(cardId) {
    this.setState({active: cardId});
  }

  _handleCardMouseOut() {
    this.setState({active: null});
  }

  _filterMoviesByGenre(movies, genre) {
    if (genre === ALL_GENRES) {
      return movies;
    }

    return movies.filter((movie) => movie.genre === genre);
  }

  render() {
    const {movies, onMovieTitleClick, activeGenre} = this.props;
    const {active} = this.state;
    return (
      <div className="catalog__movies-list">
        {this._filterMoviesByGenre(movies, activeGenre).map((movie) => {
          const {name, poster, id, trailer} = movie;
          return (
            <MovieCard
              key={id}
              picture={poster}
              id={id}
              name={name}
              trailer={trailer}
              isVideo={active === id}
              onMovieTitleClick={onMovieTitleClick}
              onHover={this._handleCardHover}
              onMouseOut={this._handleCardMouseOut}
            />
          );
        })}
      </div>
    );
  }
}

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    description: PropTypes.string.isRequired,
    trailer: PropTypes.string.isRequired,
  })).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
  activeGenre: PropTypes.string.isRequired,
};

export default MoviesList;
