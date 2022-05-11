import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';


import Sidebar from './sidebar/sidebar';
import Navbar from "./navbar/navbar";

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
    const { user: currentUser } = useSelector((state) => state.auth);
    const [isSidebarOpen, setSidebarOpen] = useState(false);

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
  
export default NavigationBar;