import React from 'react';
import PropTypes from 'prop-types';

export default function Link({ children, to }) {
  return (
    <div style={{ marginTop: 5, marginBottom: 5 }}>
      <a className="sm" style={{ fontWeight: 300 }} href={to}>{children}</a>
    </div>
  );
};

Link.propTypes = {
  children: PropTypes.any,
  to: PropTypes.string.isRequired,
};

Link.defaultProps = {
  children: null,
};