import React from 'react';
import PropTypes from 'prop-types';

import { TextInput } from 'components/ui/form';

export default class ControlledTextInput extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    errorText: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    errorText: 'Enter a value',
    name: '',
    placeholder: 'Text',
    type: 'text',
    style: {},
  };

  state = {
    value: '',
    error: false,
  };

  validate = () => {
    const { value } = this.state;

    if (value.length === 0) {
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
    }
  }

  onChange = event => {
    this.setState({ value: event.target.value }, this.validate);
  }

  val = () => {
    const { error, value } = this.state;

    return {
      value,
      error
    };
  }

  render() {
    const { error, value } = this.state;

    return (
      <TextInput
        error={error}
        value={value}
        onChange={this.onChange}
        { ...this.props }
      />
    )
  }
}