import React from 'react';
import PropTypes from 'prop-types';

import 'static/link.css';
import { primary } from 'util/colors';

export default function Link({ children, to, ...otherProps }) {
  return (
    <div style={{ marginTop: 5, marginBottom: 5 }}>
      <a className="sm" href={to} {...otherProps}>{children}</a>
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