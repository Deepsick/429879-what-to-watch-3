import * as React from 'react';

interface Props {
  activeTab: string;
  id: number;
}

interface State {
  active: string | null;
}

const withActiveItem = (Component) => {
  class WithActiveItem extends React.PureComponent<Props, State> {
    constructor(props) {
      super(props);

      this.state = {
        active: props.activeTab || null,
      };

      this._setActiveItem = this._setActiveItem.bind(this);
      this._resetActiveItem = this._resetActiveItem.bind(this);
    }

    _setActiveItem(item) {
      this.setState({active: item});
    }

    _resetActiveItem() {
      this.setState({active: null});
    }

    render() {
      const {active} = this.state;

      return (
        <Component
          {...this.props}
          setActiveItem={this._setActiveItem}
          resetActiveItem={this._resetActiveItem}
          active={active}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;

