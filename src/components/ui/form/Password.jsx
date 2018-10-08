import React from 'react';
import PropTypes from 'prop-types';

import { ControlledTextInput } from 'components/ui/form';

export default class Password extends React.Component {

   static propTypes = {
    className: PropTypes.string,
    errorText: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    errorText: 'Enter a password',
    name: '',
    placeholder: 'Password',
    style: {}
  };

  render() {
    return (
      <ControlledTextInput
        type="password"
        { ...this.props }
      />
    );
  }
}