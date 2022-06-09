import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
    Grid,
    Card,
    CardHeader,
    Divider,
    CardContent,
    Box,
    Stack,
    Typography
} from '@mui/material';

import directionServices from '../../../services/university.services/direction.services';
import groupServices from '../../../services/university.services/group.services';

import GetGroups from '../../../components/actions/universityActions/getGroups';
import CreateGroup from '../../../components/actions/universityActions/createGroup';
import CreateStudent from '../../../components/actions/universityActions/createStudent';
import GetStudent from '../../../components/actions/universityActions/getStudent';
import GetDisciplinesOfTheGroup from '../../../components/actions/universityActions/getDisciplinesOfTheGroup';
import CreateDisciplineOfTheGroup from '../../../components/actions/universityActions/createDisciplineOfTheGroup';

function DirectionProfile() {
    let params = useParams();

    const { directionId, cathedraId } = params;

    const [direction, setDirection] = useState();
    const [targetGroup, setTargetGroup] = useState('');

    useEffect(() => {
        directionServices.getDirection(params.directionId).then(res => {
            setDirection(res.data);
        })
    }, [cathedraId, directionId]);

    const handleSelectStudent = (e) => {
        if (targetGroup !== e.target.innerHTML) setTargetGroup(e.target.innerHTML)
    }

    return (
        <Card>
            {
                direction && (
                    <>
                        <CardHeader 
                            subheader="Раздел просмотра и редактирования направления"
                            title={`Направление: ${direction.name}`}
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
                                        xs={6}
                                    >
                                        <Card>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <CardHeader 
                                                    subheader="Список групп"
                                                    title="Группы"
                                                />
                                                <CreateGroup props={{
                                                    directionId: params.directionId
                                                }}/>
                                            </Stack>
                                            <Divider />
                                            <CardContent>
                                                <GetGroups props={handleSelectStudent} />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid
                                        item={true}
                                        lg={6}
                                        md={6}
                                        xl={6}
                                        xs={6}
                                    >
                                        <Card>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <CardHeader 
                                                    subheader="Студенты выбранной группы"
                                                    title={`Студенты группы ${targetGroup}`}
                                                />
                                                {
                                                    targetGroup && (
                                                        <CreateStudent 
                                                            props={{
                                                                targetGroup: targetGroup
                                                            }}
                                                        />
                                                    )
                                                }
                                            </Stack>
                                            <Divider />
                                            <CardContent>
                                                    {
                                                        targetGroup ? (
                                                            <GetStudent props={{
                                                               targetGroup 
                                                            }}/>
                                                        ) : (
                                                            <Typography
                                                                variant="subtitle1"
                                                                color="text.secondary"
                                                                textAlign="center"
                                                            >
                                                                Выберите группу для отображения списка студентов
                                                            </Typography>
                                                        )
                                                    }
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                    <Grid
                                        item={true}
                                        lg={12}
                                        md={12}
                                        xl={12}
                                        xs={12}
                                    >
                                        <Card>
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                            >
                                                <CardHeader 
                                                    subheader="Дисциплины выбранной группы"
                                                    title="Дисциплины"
                                                />
                                                {
                                                    targetGroup && (
                                                        <CreateDisciplineOfTheGroup 
                                                            props={{
                                                                targetGroup
                                                            }}
                                                        />
                                                    ) 
                                                }
                                            </Stack>
                                            <Divider />
                                            <CardContent>
                                                {
                                                    targetGroup ? (
                                                        <GetDisciplinesOfTheGroup props={{
                                                            targetGroup
                                                        }}/>
                                                    ) : (
                                                        <Typography
                                                            variant="subtitle1"
                                                            color="text.secondary"
                                                            textAlign="center"
                                                        >
                                                            Выберите группу для отображения списка её дисциплин
                                                        </Typography>
                                                    )
                                                }
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

export default DirectionProfile;