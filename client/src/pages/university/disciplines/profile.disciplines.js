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
    Typography,
    Container
} from '@mui/material';

import disciplineServices from '../../../services/university.services/discipline.services';
import teacherServices from '../../../services/university.services/teacher.services';
import ListItemTable from '../../../components/cards/ListItemTable';
import CreateTeacherOfTheDiscipline from '../../../components/actions/universityActions/createTeacherOfTheDiscipline';

const headers = [
    "Имя, фамилия и отчество преподавателя"
];

function DisciplineProfile() {
    let params = useParams();
    const [discipline, setDiscipline] = useState(); 
    const [teachers, setTeachers] = useState([]);
    const { id } = params;

    useEffect(() => {
        disciplineServices.getDiscipline(id).then(res => {
            if (res.data) {
                console.log(res.data)
                setDiscipline(res.data);
            }
        });
        teacherServices.getTeachersOfTheDiscipline(id).then(res => {
            let newTeachers = [...teachers];
            if (res.data.teachers) {
                res.data.teachers.forEach((teacher) => {
                    newTeachers.push({
                        name: teacher.name
                    });
                });
                setTeachers(newTeachers);
            }
        });
    }, []);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            {
                discipline && (
                            <Container
                                maxWidth="lg"
                            >
                                <Card>
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <CardHeader 
                                            title={`Дисциплина: ${discipline.name}`}
                                            subheader={`Раздел просмотра и редактирования преподавательского состава`}
                                        />
                                    </Stack>
                                    <Divider />
                                    <CardContent>
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
                                                <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                    >
                                                        <CardHeader 
                                                            title="Краткая информация по дисциплине"
                                                        />
                                                </Stack>
                                                <Card>
                                                    <CardContent>
                                                        <Box
                                                            sx={{
                                                                alignItems: "left",
                                                                display: "flex",
                                                                flexDirection: "column"
                                                            }}
                                                        >
                                                            <Typography
                                                                variant="subtitle2"
                                                                color="text.secondary"
                                                            >
                                                                Индекс дисциплины: { discipline.id }
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle2"
                                                                color="text.secondary"
                                                            >
                                                                Количество преподавателей и методистов для ведения тестов: 5
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle2"
                                                                color="text.secondary"
                                                            >
                                                                Общее количество созданных разделов: 8
                                                            </Typography>
                                                            <Typography
                                                                variant="subtitle2"
                                                                color="text.secondary"
                                                            >
                                                                Общее количество созданных тестов: 5
                                                            </Typography>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                            <Grid
                                                item
                                                lg={8}
                                                md={6}
                                                xs={12}
                                            >
                                                <Stack
                                                        direction="row"
                                                        alignItems="center"
                                                        justifyContent="space-between"
                                                    >
                                                        <CardHeader 
                                                            title="Преподавательский состав и методисты"
                                                        />
                                                        {
                                                            discipline && (
                                                                <CreateTeacherOfTheDiscipline 
                                                                    props={{
                                                                        disciplineId: discipline.id
                                                                    }}
                                                                />
                                                            )
                                                        }
                                                </Stack>
                                                <Card>
                                                    <CardContent>
                                                        {
                                                            teachers.length ? (
                                                            <ListItemTable 
                                                                props={{
                                                                    body: teachers,
                                                                    headers: headers
                                                                }}                    
                                                            />
                                                            ) : (
                                                                <Typography
                                                                    gutterBottom
                                                                    variant="h6"
                                                                >
                                                                    Не было назначено ни одного преподавателя по данной дисциплине
                                                                </Typography>
                                                            )
                                                        }
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Container>
                )
            }
        </Box>
    )
}

export default DisciplineProfile;