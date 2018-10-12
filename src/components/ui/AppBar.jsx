import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import MenuAppBar from 'components/ui/MenuAppBar';

const getStyles = browser => {
  const style = {
    container: { 
      position: "absolute",
      right: 10
    },
    logo: {
      height: browser.lessThan.small ? 20 : 35,
      marginRight: browser.lessThan.small ? 0 : 12,
    },
    signUpButton: {
      height: 30,
      marginLeft: 15
    },
    title: {
      fontSize: browser.lessThan.small ? "0.8em" : "1.1em",
    },
  };

  return style;
}

export default class AppBar extends React.Component {

  static propTypes = {
    authed: PropTypes.bool,
    browser: PropTypes.object.isRequired,
    children: PropTypes.any,
    className: PropTypes.string,
    menu: PropTypes.func.isRequired,
    onMenuClick: PropTypes.func.isRequired,
    onLogInClick: PropTypes.func.isRequired,
    onSignUpClick: PropTypes.func.isRequired,
    transparent: PropTypes.bool,
    style: PropTypes.object,
  };

  static defaultProps = {
    authed: false,
    children: null,
    className: '',
    transparent: false,
    style: {},
  };

  state = {
    authed: false,
    anchorEl: null,
  };

  renderLogin = style => {
    console.log("RENDER LOGIN");
    const { authed, onLogInClick, onMenuClick, onSignUpClick, menu } = this.props;
    const { anchorEl, logInModalOpen, signUpModalOpen } = this.state;
    const open = Boolean(anchorEl);

    return (
      <div style={style.container}>
        {authed ?
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={onMenuClick}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            { menu() }
          </div> :
          <div>
            <Button
              style={{ color: "white" }}
              variant="outlined"
              color="secondary"
              onClick={onLogInClick}
            >
              Log In
            </Button>
            <Button 
              style={style.signUpButton}
              variant="raised"
              onClick={onSignUpClick}
              color="secondary"
            >
              Sign Up
            </Button>
          </div>
        }
      </div>
    );
  }

  render() {
    console.log("RENDER");
    const { browser, children, transparent } = this.props;
    const style = getStyles(browser);

    return (
      <MenuAppBar
        style={style}
        transparent={transparent}
        disableGutters={browser.lessThan.small}
      >
        {this.renderLogin(style)}
        <div>
          {children}
        </div>
      </MenuAppBar>
    );
  }
}
