import { useState } from 'react';

import {
    Container,
    Box,
    Card,
    CardHeader,
    Divider,
    CardContent,
    Grid,
    TextField
} from '@mui/material';

function CreateTest() {
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
                <Card>
                    <CardHeader 
                        subheader="Раздел создания теста"
                        title="Создание теста"
                    />
                    <Divider />
                    <CardContent>
                        <Box
                            sx={{
                                flexGrow: 1
                            }}
                        >
                            <Grid
                                container
                            >
                                <Grid
                                    item={true}
                                    lg={12}
                                    md={12}
                                    xl={12}
                                    xs={12}
                                >
                                    <TextField 
                                        id="outlined-multiline-question-static"
                                        label="Вопрос 1"
                                        multiline
                                        rows={4}
                                        defaultValue=""
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default CreateTest;