import * as React from 'react';

interface State {
  error: string | null;
}

const withError = (Component) => {
  class WithError extends React.PureComponent<{}, State> {
    constructor(props) {
      super(props);

      this.state = {
        error: null,
      };

      this._setError = this._setError.bind(this);
    }

    _setError(error) {
      this.setState({error});
    }

    render() {
      const {error} = this.state;

      return (
        <Component
          {...this.props}
          setError={this._setError}
          error={error}
        />
      );
    }
  }

  return WithError;
};

export default withError;

