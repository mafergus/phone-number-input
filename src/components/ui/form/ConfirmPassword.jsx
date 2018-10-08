import React from 'react';
import PropTypes from 'prop-types';

export default class ConfirmPassword extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    password: PropTypes.string.isRequired,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    style: {}
  };

  render() {
    return null;
  }
}