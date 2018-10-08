import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

import { primary } from 'util/colors';

const STYLE = {
  postFooter: {
    width: "100%",
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary[700],
    text: {
      color: primary[300],
    },
  },
}

const footerBp = {
  sm: 11,
  md: 10,
  lg: 8,
};

export default function PostFooter({ style }) {

  function Title({ style, children }) {
    return <p style={{ ...STYLE.postFooter.text, ...style }}>{children}</p>;
  };

  return (
    <Grid container style={style}>
      <Grid
        item
        sm={footerBp.sm}
        md={footerBp.md}
        lg={footerBp.lg}
      >
        <Title>Gears Guru © 2018. Made for the UAE, with love in Silicon Valley</Title>
      </Grid>
    </Grid>
  );
};

PostFooter.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
};

PostFooter.defaultProps = {
  children: null,
  style: {},
};