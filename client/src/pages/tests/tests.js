import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Box, Container, Divider, Typography, Card, Stack, CardHeader, CardContent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import CardTestsToolbar from '../../components/tests/cards/CardTestsToolbar';
import CreateTest from '../../components/actions/testActions/createTest';

import { useSelector } from 'react-redux';

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import disciplineServices from '../../services/university.services/discipline.services';
import CreateSection from '../../components/actions/testActions/createSection';
import sectionServices from '../../services/university.services/section.services';
import testServices from '../../services/test.services/test.services';
import ListItemTable from '../../components/cards/ListItemTable';


const Tests = (props) => {
    const [disciplines, setDisciplines] = useState([]);
    const [sections, setSections] = useState([]);
    const [tests, setTests] = useState([]);
    let location = useLocation();
    const { user: currentUser } = useSelector((state) => state.auth);

    const headerTest = currentUser.roles.includes("Студент") ? [
        "Наименование теста",
        "Время прохождения",
        "Время начала",
        "Время окончания",
        "Статус",
        "Результат"
    ] : currentUser.roles.includes("Методист") ? [
        "Наименование теста",
        "Время прохождения",
        "Группы",
        "Студенты",
        "Автор"
    ] : [
        "Наименование теста",
        "Время прохождения",
        "Группы",
        "Студенты"
    ];

    useEffect(() => {
        let newDisciplines = [...disciplines];
        if (currentUser.roles.includes("Студент")) {
            disciplineServices.getDisciplinesOfTheStudent(currentUser.userId).then(res => {
                if (res.data.disciplines) {
                    res.data.disciplines.forEach(discipline => {
                        newDisciplines.push(discipline);
                    })
                }
            });
        } else if (currentUser.roles.includes("Преподаватель")) {
            disciplineServices.getDisciplinesOfTheTeacher(currentUser.userId).then(res => {
                if (res.data.disciplines) {
                    res.data.disciplines.forEach(discipline => {
                        newDisciplines.push(discipline);
                    });
                }
            });
        }
        setDisciplines(newDisciplines);
    }, [currentUser]);

    const handleGetSectionsOfTheDiscipline = (disciplineId) => {
        sectionServices.getSectionsOfTheDiscipline(disciplineId).then(res => {
            let newSections = [];
            if (res.data.sections) {
                res.data.sections.forEach(section => {
                    newSections.push(section);
                });
            }
            setSections(newSections);
        });
    }

    const handleGetTestsOfTheSection = (disciplineId, sectionId) => {
        testServices.getTestsOfTheSection(disciplineId, sectionId).then(res => {
            let newTests = [];
            if (res.data.tests) {
                res.data.tests.forEach(test => {
                    newTests.push(test);
                });
            }
            setTests(newTests);
        });
    }

    return (
        <Box 
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
                {
                    location.pathname === "/tests" ? (
                        <Box 
                            sx={{
                                mt: 3
                            }}
                        >
                            <Container
                                maxWidth="lg"
                            >
                                <CardTestsToolbar />
                                <Card
                                    sx={{
                                        mt: 2
                                    }}
                                >
                                    <Stack
                                        direction="row"
                                        alignItems="center"
                                        justifyContent="space-between"
                                    >
                                        <CardHeader 
                                            title={`Ваши дисциплины`}
                                            subheader={`Выберите дисциплину для отображения подробной информации`}
                                        />
                                    </Stack>
                                </Card>
                                <Divider />
                                    {
                                        currentUser && currentUser.roles.includes("Преподаватель") && (
                                            <div>
                                                {
                                                    disciplines && disciplines.map((discipline, index) => {
                                                        return (
                                                                <Accordion key={index} onClick={() => handleGetSectionsOfTheDiscipline(discipline.id)}>
                                                                    <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                        aria-controls="disciplines-content"
                                                                        id="disciplines-header"
                                                                    >
                                                                        <Typography variant="subtitle1">
                                                                            {discipline.name}
                                                                        </Typography>
                                                                    </AccordionSummary>
                                                                    <Divider />
                                                                    <AccordionDetails
                                                                        sx={{
                                                                            pb: 2
                                                                        }}
                                                                    >
                                                                        <Stack
                                                                            direction="row"
                                                                            alignItems="center"
                                                                            justifyContent="space-between"
                                                                        >
                                                                            <CardHeader 
                                                                                title={`Разделы (учебные главы) дисциплины`}
                                                                                subheader={`Учебные разделы`}
                                                                            />
                                                                            <CreateSection 
                                                                                props={{
                                                                                    disciplineId: discipline.id
                                                                                }}
                                                                            />
                                                                        </Stack>
                                                                        {
                                                                            sections ? sections.map((section, index) => {
                                                                                return (
                                                                                    <Accordion 
                                                                                        key={index}
                                                                                        onClick={() => handleGetTestsOfTheSection(discipline.id, section.id)}
                                                                                    >
                                                                                        <AccordionSummary
                                                                                            expandIcon={<ExpandMoreIcon />}
                                                                                            aria-controls="sections-discipline-content"
                                                                                            id="sections-discipline-header"
                                                                                        >
                                                                                            <Typography
                                                                                                variant="subtitle2"
                                                                                            >
                                                                                                Глава {index + 1}: {section.name}
                                                                                            </Typography>
                                                                                        </AccordionSummary>
                                                                                        <Divider />
                                                                                        <AccordionDetails>
                                                                                            {
                                                                                                tests && <ListItemTable 
                                                                                                    props={{
                                                                                                        headers: headerTest,
                                                                                                        body: tests
                                                                                                    }}
                                                                                                />
                                                                                            }
                                                                                        </AccordionDetails>
                                                                                    </Accordion>
                                                                                )
                                                                            }) : (
                                                                                <Typography
                                                                                    variant="h6"
                                                                                    gutterBottom
                                                                                >
                                                                                    По данной дисциплины не было еще создано учебных разделов
                                                                                </Typography>
                                                                            )
                                                                        }
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                            </Container>
                        </Box>
                    ) : (
                        currentUser && currentUser.roles.includes("Преподаватель") && (
                            <CreateTest />
                        )
                    )
                }
        </Box>
    )
}

export default Tests;