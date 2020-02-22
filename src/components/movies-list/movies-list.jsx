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
    this._handleCardMouseOut = this._handleCardMouseOut.bind(this);
  }

  _handleCardHover(cardId) {
    this.setState({active: cardId});
  }

  _handleCardMouseOut() {
    this.setState({active: null});
  }

  render() {
    const {movies, onMovieTitleClick} = this.props;
    const {active} = this.state;
    return (
      <div className="catalog__movies-list">
        {movies.map((movie) => {
          const {name, picture, id, trailer} = movie;
          return (
            <MovieCard
              key={id}
              picture={picture}
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
    picture: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  onMovieTitleClick: PropTypes.func.isRequired,
};

export default MoviesList;
