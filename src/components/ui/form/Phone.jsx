import React from 'react';
import PropTypes from 'prop-types';

import { ControlledTextInput } from 'components/ui/form';

export default class Phone extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    errorText: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    errorText: 'Enter a phone number',
    name: '',
    placeholder: 'Phone number',
    style: {}
  };

  render() {
    return (
      <ControlledTextInput
        type="tel"
        { ...this.props }
      />
    );
  }
}