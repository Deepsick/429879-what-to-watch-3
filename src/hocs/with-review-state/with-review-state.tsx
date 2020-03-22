import * as React from 'react';

interface State {
  comment: string;
  rating: number | null;
}

const withReviewState = (Component) => {
  class WithReviewState extends React.PureComponent<{}, State> {
    constructor(props) {
      super(props);

      this.state = {
        comment: ``,
        rating: null,
      };

      this._setRating = this._setRating.bind(this);
      this._setComment = this._setComment.bind(this);
    }

    _setRating(rating) {
      this.setState({rating});
    }

    _setComment(comment) {
      this.setState({comment});
    }

    render() {
      const {rating, comment} = this.state;

      return (
        <Component
          {...this.props}
          setRating={this._setRating}
          setComment={this._setComment}
          rating={rating}
          comment={comment}
        />
      );
    }
  }

  return WithReviewState;
};

export default withReviewState;

