import React, {memo} from 'react';
import PropTypes from 'prop-types';

const ShowMoreButton = ({onClick, isShown}) => {
  if (isShown) {
    return (
      <div className="catalog__more">
        <button
          className="catalog__button"
          type="button"
          onClick={onClick}
        >
          Show more
        </button>
      </div>
    );
  }

  return ``;
};

ShowMoreButton.propTypes = {
  isShown: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default memo(ShowMoreButton);
