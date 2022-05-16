import { Box, Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";

import StudentDashboard from '../../components/dashboard/student/studentDashboard';
import TeacherDashboard from "../../components/dashboard/teacher/teacherDashboard";
import UserService from "../../services/user.service";
import eventBus from "../../common/EventBus";

const Home = (props) => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [tests, setTests] = useState(null);

    useEffect(() => {
        UserService.getTests()
            .then(res => {
                let data = [];
                res.forEach(item => {
                    data.push(item);
                });
                setTests(data);
            }, err => {
                if (err.res && err.res.status === 403) {
                    eventBus.dispatch("logout");
                }
            });
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
                    {
                        currentUser.roles.includes("Студент") ? (
                            <StudentDashboard />
                        ) : <TeacherDashboard />
                    }
                    
                </Grid>
            </Container>
        </Box>
    )
}

export default Home;