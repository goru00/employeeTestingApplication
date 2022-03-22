import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppBar, IconButton, Toolbar, Tooltip, Box, Avatar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import styled from '@emotion/styled';

const NavbarRoot = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[3]
}));

function Navbar(props) {
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
            <Typography 
              color="#000"
            >
              Третьяков Дмитрий Артемович
            </Typography>
              <Avatar
                sx={{
                  heigth: 40,
                  width: 40,
                  ml: 1
                }}
                src=""
              >
              </Avatar>
          </Toolbar>
        </NavbarRoot>
      </>
    )
}

export default Navbar;