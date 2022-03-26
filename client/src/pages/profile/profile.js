import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import { 
    Box, 
    Container, 
    Typography, 
    Grid
} from '@mui/material';

import eventBus from "../../common/EventBus";
import ProfileSettings from "../../components/profile/profileSettings";
import ProfileSettingsDetails from "../../components/profile/profileSettingsDetails";

function Profile(props) {
    const { user: currentUser } = props;
    
    if (!currentUser) {
        return <Navigate to={"/signin"} />;
    }
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container 
                maxWidth="lg"
            >
                <Typography 
                    sx={{
                        mb: 3
                    }}
                    variant="h4"
                >
                    Профиль
                </Typography>
                <Grid 
                    container
                    spacing={3}
                >
                    <Grid 
                        item
                        lg={4}
                        md={6}
                        xs={12}
                    >
                        <ProfileSettings />
                    </Grid>
                    <Grid 
                        item
                        lg={8}
                        md={6}
                        xs={12}
                    >
                        <ProfileSettingsDetails />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);