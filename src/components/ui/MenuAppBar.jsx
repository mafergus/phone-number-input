import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

import { Logo } from 'assets/Logo';

const STYLE = {
  link: { 
    display: "flex",
    position: "relative",
    alignItems: "center",
    textDecoration: "none",
    color: "white"
  },
  logo: {
    width: 31,
    height: 35,
  },
  title: {
    flex: 1,
    fontFamily: "Good-Times",
    textDecoration: "none",
    marginLeft: 10,
  },
  toolbar: {
    height: 64,
    zIndex: 9999,
    display: "flex",
    justifyContent: "space-between",
  },
}

export default class MenuAppBar extends React.Component {

  static propTypes = {
    style: PropTypes.object,
    title: PropTypes.string,
    transparent: PropTypes.bool,
  };

  static defaultProps = {
    style: {},
    title: "",
    transparent: false,
  };

  render() {
    const { children, disableGutters, transparent, style } = this.props;
    let appBarStyle = {};
    if (transparent) {
      appBarStyle.boxShadow = "none";
      appBarStyle.backgroundColor = "transparent";
    }

    return (
      <AppBar
        style={{ ...appBarStyle, ...style }}
      >
        <Toolbar
          style={STYLE.toolbar}
        >
          <Link
            to="/"
            style={STYLE.link}
          >
            <Logo
              style={{ ...STYLE.logo, ...style.logo }}
              fill="white"
              stroke="white"
            />
            <Typography
              variant="title"
              color="inherit"
              style={{ ...STYLE.title, ...style.title }}
            >
              Gears Guru
            </Typography>
          </Link>
          {children}
        </Toolbar>
      </AppBar>
    );
  }
}