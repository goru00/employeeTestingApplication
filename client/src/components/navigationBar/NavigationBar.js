import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';


import Sidebar from './sidebar/sidebar';
import Navbar from "./navbar/navbar";

import EventBus from "../../common/EventBus";
import { logout } from '../../actions/auth';

import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

const NavigationBarRoot = styled('div')(({ theme }) => ({
    display: "flex",
    flex: "1 1 auto",
    maxWidth: "100%",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
        paddingLeft: 280
    }
}));

const NavigationBar = (props) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const user = props.user;
        if (user) {
            setCurrentUser(user);
        } else {
            setCurrentUser(null);
        }
        EventBus.on("logout", () => {
            logOut();
        });
    }, [props]);

    function logOut() {
        props.dispatch(logout());
        setCurrentUser(undefined);
    }

    return (
        <>
            {
                currentUser && (
                    <>
                        <Navbar 
                            onSidebarOpen={() => setSidebarOpen(true)} 
                        />
                        <Sidebar 
                            onClose={() => setSidebarOpen(false) } 
                            open={isSidebarOpen}
                        />
                    </>
                )
            }
            <NavigationBarRoot>
                <Box 
                    sx={{
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column",
                        width: "100%"
                    }}
                >
                    <Outlet />
                </Box>
            </NavigationBarRoot>
        </>
    )
}

function mapStateToProps(state) {
    const { user } = state.auth;
    return {
      user
    };
}
  
export default connect(mapStateToProps)(NavigationBar);