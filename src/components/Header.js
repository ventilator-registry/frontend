import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import { withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from "react-router-dom";

const lightColor = 'rgba(255, 255, 255, 0.7)';

const styles = (theme) => ({
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
});

function Header(props) {
  const { classes } = props;

  const [value, setValue] = useState(0)

  const handleValue = (val) => {
    setValue(val)
  }

  let history = useHistory();

  const logout = (() => {
    localStorage.removeItem('token');
    history.push('/')
  });
  const name = localStorage.getItem("name").charAt(0)

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs />
            <Grid item>
              <Link className={classes.link} href="https://1mventilators.com/" target="-blank" variant="body2">
                1mventilators.com
              </Link>
            </Grid>
            <Grid item>
              <IconButton color="inherit" className={classes.iconButtonAvatar} onClick={() => { handleValue(1); props.dashboard() }}>
                <Avatar alt="My Avatar">{name}</Avatar>
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                Ventilator Registry
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Logout">
                <IconButton color="inherit">
                  <ExitToAppIcon onClick={logout} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AppBar
        component="div"
        className={classes.secondaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Tabs value={value} textColor="inherit" >
          <Tab textColor="inherit" label="Registry" onClick={() => { handleValue(0); props.registry() }} />
          <Tab textColor="inherit" label="My Dashboard" onClick={() => { handleValue(1); props.dashboard() }} />
        </Tabs>
      </AppBar>
    </React.Fragment>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);
