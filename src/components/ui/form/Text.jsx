import React from 'react';
import PropTypes from 'prop-types';

import { ControlledTextInput } from 'components/ui/form';

export default class Text extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    errorText: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object,
  };

  static defaultProps = {
    className: '',
    errorText: 'Enter a value',
    name: '',
    placeholder: 'Text',
    style: {}
  };

  render() {
    return <ControlledTextInput { ...this.props } />;
  }
}