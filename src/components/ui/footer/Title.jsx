import React from 'react';
import PropTypes from 'prop-types';

export default function Title({ style, children }) {
  return <h4 style={{ fontWeight: 400, marginBottom: 20, color: "white", ...style }}>{children}</h4>;
};

Title.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

Title.defaultProps = {
  children: null,
  style: {},
};