import React from 'react';

import { Grid } from "@mui/material";

import CardResultGraphics from "../../dashboard/cards/CardResultGraphics";
import CardTaskProgress from "../../dashboard/cards/CardTaskProgress";
import CardItemsList from '../../dashboard/cards/CardTestsList';
import CardDiagramProgress from "../../dashboard/cards/CardDiagramProgress";

const StudentDashboard = () => {
    return (
        <>
            <Grid 
                item={true}
                lg={8}
                md={12}
                xl={9}
                xs={12}
            >
                <CardItemsList />
            </Grid>
            <Grid 
                item={true}
                lg={4}
                sm={6}
                xl={3}
                xs={12}
            >
                <CardTaskProgress /> 
            </Grid>
            <Grid 
                item={true}
                lg={12}
                md={6}
                xl={3}
                xs={12}
            >
                <CardDiagramProgress />
            </Grid>
            <Grid 
                item={true}
                lg={12}
                md={12}
                xl={9}
                xs={12}
            >
                <CardResultGraphics />
            </Grid>
        </>
    )
}

export default StudentDashboard;