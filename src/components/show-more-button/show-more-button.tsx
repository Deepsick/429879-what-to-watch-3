import * as React from 'react';

interface Props {
  isShown: boolean;
  onClick: () => void;
}

const ShowMoreButton: React.FunctionComponent<Props> = ({onClick, isShown}: Props) => {
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

  return null;
};

export default React.memo(ShowMoreButton);
