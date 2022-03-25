import { Box, Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from 'react-redux';
import { Navigate } from "react-router-dom";
import CardResultGraphics from "../../components/cards/CardResultGraphics";

import CardTaskProgress from "../../components/cards/CardTaskProgress";
import CardItemsList from '../../components/cards/CardItemsList';
import CardDiagramProgress from "../../components/cards/CardDiagramProgress";

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
                        <CardItemsList />
                    </Grid>
                    <Grid 
                        item
                        lg={4}
                        sm={6}
                        xl={3}
                        xs={12}
                    >
                       <CardTaskProgress /> 
                    </Grid>
                    <Grid 
                        item
                        lg={12}
                        md={6}
                        xl={3}
                        xs={12}
                    >
                        <CardDiagramProgress />
                    </Grid>
                    <Grid 
                        item
                        lg={12}
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