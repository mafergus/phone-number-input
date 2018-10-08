import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

const STYLE = {
  footerContainer: {
    display: "flex",
    paddingBottom: 50,
  },
  footerInnerContainer: {
    display: "flex",
    justifyContent: "left",
  },
};

const footerBp = {
  sm: 11,
  md: 10,
  lg: 8,
};

export default function Footer({ style, children }) {
  return (
    <Grid
      item
      sm={footerBp.sm}
      md={footerBp.md}
      lg={footerBp.lg}
      style={{ ...style, ...STYLE.footerContainer }}
    >
      <Grid container style={STYLE.footerInnerContainer}>
        {children}
      </Grid>
    </Grid> 
  );
}

Footer.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

Footer.defaultProps = {
  children: null,
  style: {},
};