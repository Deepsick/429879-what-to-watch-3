import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import MovieCard from '../movie-card/movie-card.jsx';

class MoviesList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: null,
    };

    this._handleCardHover = this._handleCardHover.bind(this);
  }

  _handleCardHover(cardId) {
    this.setState({active: cardId});
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => {
          const {name, picture, id} = movie;
          return (
            <MovieCard
              key={id}
              picture={picture}
              id={id}
              name={name}
              onMovieTitleClick={onMovieTitleClick}
              onHover={this._handleCardHover}
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
    picture: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
