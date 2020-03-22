import * as React from 'react';

interface Props {
  trailer: string;
}

interface State {
  isLoading: boolean;
  muted: boolean;
}

const withPreview = (Component) => {
  class WithPreview extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        isLoading: true,
        muted: true,
      };

      this._setLoading = this._setLoading.bind(this);
    }

    _setLoading(isLoading) {
      this.setState({isLoading});
    }

    render() {
      const {isLoading, muted} = this.state;

      return (
        <Component
          {...this.props}
          setLoading={this._setLoading}
          muted={muted}
          isLoading={isLoading}
        />
      );
    }
  }

  return WithPreview;
};

export default withPreview;

