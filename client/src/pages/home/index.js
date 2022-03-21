import { Box, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import CardResultGraphics from "./CardResultGraphics";

import CardTaskProgress from "./CardTaskProgress";
import CardTestsList from './CardTestsList';

const Home = (props) => {
    const { user: currentUser } = props;

    useEffect(() => {
        return () => {};
    }, []);

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
                maxWidth={false}
            >
                <Grid 
                    container
                    spacing={3}
                >
                    <Grid 
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <CardTestsList />
                    </Grid>
                    <Grid 
                        item
                        lg={3}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                       <CardTaskProgress /> 
                    </Grid>
                    <Grid 
                        item
                        lg={8}
                        md={12}
                        xl={9}
                        xs={12}
                    >
                        <CardResultGraphics />
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
  
  export default connect(mapStateToProps)(Home);