import React, { useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import reminio from '../../images/Reminio.png';
import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <img component={Link} to="/" src={reminio} alt="icon" height="45px" />
      </Link>
      <Toolbar className={classes.toolbar}>
        {user?.result ? (
          <div className={classes.profile}>
            <Avatar style={{border:'2px solid white'}} className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
            <Typography style={{color:'white',fontWeight:'bolder'}} className={classes.userName} variant="h6">{user?.result.name}</Typography>
            <Button style={{backgroundColor:'#FF3B57',border:'4px solid transparent',color:'white',fontWeight:'bolder'}} variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
          </div>
        ) : (
          <Button style={{backgroundColor:'#FF3B57',border:'2px solid transparent',color:'white',fontWeight:'bolder'}} component={Link} to="/auth" variant="contained" color=''>Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
