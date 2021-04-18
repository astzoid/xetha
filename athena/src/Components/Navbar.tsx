import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

import { userContext } from '../Contexts/userContext';
import logo from '../images/logo.webp';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxHeight: '32px',
    maxWidth: '32px',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
}));

export default function Navbar() {
  const { user, loaded } = useContext(userContext);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    window.location.href = '/api/logout';
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" color="secondary" component="nav">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <Avatar alt="Xetha Logo" src={logo} />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          Xetha
        </Typography>
        <div className={classes.container}>
          <Button component={Link} className={classes.menuButton} to="/">
            Home
          </Button>
          <Button
            component={Link}
            className={classes.menuButton}
            to="/commands"
          >
            Commands
          </Button>
          <Button component={Link} className={classes.menuButton} to="/status">
            Status
          </Button>
          {loaded && (
            <>
              {user ? (
                <div>
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    <Avatar
                      alt={user.tag}
                      src={`https://cdn.discordapp.com/avatars/${user.user_id}/${user.avatar}`}
                    />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem component={Link} to="/dashboard">
                      Manage
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </div>
              ) : (
                <Button variant="outlined" href="/api/login">
                  Login
                </Button>
              )}
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}
