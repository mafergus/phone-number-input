import React from 'react';
import PropTypes from 'prop-types';
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

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
    errorText: 'Enter a valid phone number',
    name: '',
    placeholder: 'Phone number',
    style: {}
  };

  isValid = value => {
    function safeFunc(func) {
      let ret;
      try {
        ret = func();
      } catch (err) {
        ret = 'ERROR';
      } finally {
        return ret;
      }
    }

    const retVal = safeFunc(() => phoneUtil.parse(value));
    return retVal !== "ERROR" ? phoneUtil.isValidNumber(retVal) : false;
  };

  render() {
    return (
      <ControlledTextInput
        type="tel"
        validate={this.isValid}
        { ...this.props }
      />
    );
  }
}