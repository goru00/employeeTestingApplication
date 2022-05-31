import { useEffect, useState } from 'react';
import { Outlet, useParams } from 'react-router-dom';

import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    Stack,
    Box,
    Divider
} from '@mui/material';

import cathedraServices from '../../../services/university.services/cathedra.services';

import CreateDirection from '../../../components/actions/universityActions/createDirection';
import CreateTeacher from '../../../components/actions/universityActions/createTeacher';

import GetDirections from '../../../components/actions/universityActions/getDirections';
import GetTeachers from '../../../components/actions/universityActions/getTeachers';

function CathedraProfile() {
    let params = useParams();

    const [cathedra, setCathedra] = useState();

    useEffect(() => {
        cathedraServices.getCathedras(params.id).then(res => {
            setCathedra(res.data.cathedra);
        });
    }, [params.id]);

    return (
        <Card>
        {
            cathedra && (
                <>
                    <CardHeader 
                        subheader="Раздел просмотра и редактирования кафедры"
                        title={"Кафедра: " + cathedra.name}
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
                                    spacing={2}
                                >
                                    <Grid
                                        item={true}
                                        lg={6}
                                        md={6}
                                        xl={6}
                                        xs={12}
                                    >
                                        <Card>
                                        <Stack direction="row" alignItems="center" justifyContent="space-between">
                                            <CardHeader 
                                                subheader="Список направлений кафедры"
                                                title="Направления"
                                            />
                                            <CreateDirection props={{
                                                cathedraId: params.id
                                            }} />
                                        </Stack>
                                            <Divider />
                                            <CardContent>
                                                <GetDirections />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid
                                        item={true}
                                        lg={6}
                                        md={6}
                                        xl={6}
                                        xs={12}
                                    >
                                        <Card>
                                            <Stack direction="row" alignItems="center" justifyContent="space-between">
                                                <CardHeader 
                                                    subheader="Список преподавателей кафедры"
                                                    title="Преподаватели"
                                                />
                                                <CreateTeacher props={{
                                                    cathedraId: params.id
                                                }}
                                                />
                                            </Stack>
                                            <Divider />
                                            <CardContent>
                                                <GetTeachers />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                </Grid>
                            </Box>
                    </CardContent>
                </>
            )
        }
        </Card>
    )
}

export default CathedraProfile;