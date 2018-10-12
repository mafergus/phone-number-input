import React from 'react';
import PropTypes from 'prop-types';

import 'static/input.css';

export default function TextInput({ type, name, placeholder, style, value, onChange, error, errorText, required }) {

  return (
    <React.Fragment>
      <input
        placeholder={placeholder}
        className={error ? "input-error" : "input"}
        type={type}
        name={name}
        style={style}
        onChange={onChange}
        value={value}
        required={required}
      />
      <p className={ error ? "error-text" : "error-text-invisible" }>{errorText}</p>
    </React.Fragment>
  );
}

TextInput.propTypes = {
  error: PropTypes.bool.isRequired,
  errorText: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  style: PropTypes.object,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

TextInput.defaultProps = {
  placeholder: '',
  required: false,
  style: {},
};