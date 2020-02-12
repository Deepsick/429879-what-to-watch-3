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

  _handleCardHover(cardName) {
    this.setState({active: cardName});
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie, index) => {
          const {name, picture} = movie;
          return (
            <MovieCard
              key={index}
              picture={picture}
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
  })).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
