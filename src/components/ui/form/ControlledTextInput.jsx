import React from 'react';
import PropTypes from 'prop-types';

import { TextInput } from 'components/ui/form';

const isValid = value => value.length !== 0;

export default class ControlledTextInput extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    errorText: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object,
    validate: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    errorText: 'Enter a value',
    name: '',
    placeholder: 'Text',
    type: 'text',
    style: {},
    validate: isValid,
  };

  state = {
    value: '',
    error: false,
  };

  onChange = event => {
    const { value } = event.target;
    const { validate } = this.props;

    this.setState({
      value,
      error: !validate(value),
    });
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