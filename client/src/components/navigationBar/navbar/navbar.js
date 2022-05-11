import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AppBar, IconButton, Toolbar, Tooltip, Box, Avatar, Typography, Button, Grid } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

function Navbar(props) {
  const { user: currentUser } = useSelector((state) => state.auth);
  const { onSidebarOpen, ...other} = props;

    return (
      <>
        <NavbarRoot 
          sx={{
            left: {
              lg: 280
            },
            width: {
              lg: 'calc(100% - 280px)'
            }
          }}
          {...other}>
          <Toolbar 
            disableGutters
            sx={{
              minHeight: 64,
              left: 0,
              px: 2
            }}
          >
            <IconButton
              onClick={onSidebarOpen}
              sx={{
                display: {
                  xs: "inline-flex",
                  lg: "none"
                }
              }} 
            >
              <MenuIcon 
                fontSize="small"
              />
            </IconButton>
            <Tooltip 
              title="Search"
            >
              <IconButton 
                sx={{
                  ml: 1
                }}
              >
                <SearchIcon 
                  fontSize="small"
                />
              </IconButton>
            </Tooltip>
            <Box sx={{ flexGrow: 1 }} />
            <Link 
              to="/profile"
              style={{
                listStyle: "none",
                textDecoration: "none"
              }}
            >
            <Tooltip 
                  title="Профиль"
                >
                  <Button 
                    sx={{
                      ml: 5
                    }}
                  >
                    <Grid 
                      item={true}
                      container 
                      xs={8} 
                      md={8}
                      lg={8}
                      justifyContent="flex-end" 
                      alignItems="flex-end"
                      columnSpacing={0}
                    >
                      <Typography 
                        color="#000"
                        variant="body1"
                      >
                        {currentUser.user.name}
                      </Typography>
                      <Typography 
                        color="#a2a2a2"
                        variant="caption"
                      >
                        преподаватель кафедры ИТВУ
                      </Typography>
                    </Grid>
                    <Avatar
                      sx={{
                        heigth: 40,
                        width: 40,
                        ml: 2
                      }}
                      src=""
                    >
                    </Avatar>
                  </Button>
                </Tooltip>
            </Link>
          </Toolbar>
        </NavbarRoot>
      </>
    )
}

export default Navbar;