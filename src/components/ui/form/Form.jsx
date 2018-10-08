import React from 'react';
import PropTypes from 'prop-types';

export default class Form extends React.Component {

  static propTypes = {
    children: PropTypes.any,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    children: null,
    onSubmit: () => {},
  };

  state = {
    displayErrors: false,
  };

  items = [];

  onSubmit = event => {
    const { children, onSubmit } = this.props;

    event.preventDefault();

    if (!event.target.checkValidity()) {
      this.setState({ displayErrors: true });
      return;
    }
    this.setState({ displayErrors: false });

    const data = new FormData(event.target);
    let values = {};
    for (let name of data.keys()) {
      values[name] = data.get(name);
    }

    onSubmit(values);
  }
  
  render() {
    const { children, ...otherProps } = this.props;
    const { displayErrors } = this.state;
    const enhancedChildren = React.Children.map(children, child => React.cloneElement(child, { ref: element => this.items.push(element) }));

    return(
      <form
        {...otherProps}
        onSubmit={this.onSubmit}
        className={displayErrors ? 'displayErrors' : ''}
        noValidate
      >
        {enhancedChildren}
      </form>
    );
  }
}