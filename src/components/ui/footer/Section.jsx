import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

export default function Section({ style, children }) {
  return (
    <Grid
      item
      xs={6}
      md={3}
      lg={2}
      style={style}
    >
      {children}
    </Grid>
  );
};

Section.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

Section.defaultProps = {
  children: null,
  style: {},
};