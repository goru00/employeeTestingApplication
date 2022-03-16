import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import { logout } from '../actions/auth';
import { connect } from 'react-redux';
import EventBus from "../common/EventBus";

const Navbar = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const user = props.user;
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
        EventBus.on("logout", () => {
            props.dispatch(logout());
            setUser(null);
        });
    }, [props]);

    return (
      <Box sx={{ flexGrow: 1 }} color="dark">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user
    };
}
  
export default connect(mapStateToProps)(Navbar);