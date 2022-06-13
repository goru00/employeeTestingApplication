import { useState, useEffect } from 'react';

import {
    Container,
    Box,
    Card,
    CardHeader,
    Divider,
    Select,
    CardContent,
    Grid,
    TextField,
    Typography,
    FormControl,
    InputLabel,
    MenuItem,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    Checkbox,
    ListItemText,
    ListSubheader,
    Button,
    Collapse,
    Stack
} from '@mui/material';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import disciplineService from '../../../services/university.services/discipline.services';
import sectionService from '../../../services/university.services/section.services';
import studentServices from '../../../services/university.services/student.services';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { useSelector } from 'react-redux';

import { TransitionGroup } from 'react-transition-group';
import groupServices from '../../../services/university.services/group.services';

function CreateTest() {

    const [disciplines, setDisciplines] = useState([]);
    const [sections, setSections] = useState([]);
    const [groups, setGroups] = useState([]);
    const [students, setStudents] = useState([]);
    const [blocks, setBlocks] = useState([{
        num: 1,
        question: '',
        answer: '',
        tAnswer: ''
    }]);

    const [discipline, setDiscipline] = useState('');
    const [section, setSection] = useState('');
    const [checked, setChecked] = useState([0]);
    const [time, setTime] = useState(new Date('2018-01-01T00:00:00.000Z'));

    const { user: currentUser } = useSelector((state) => state.auth);

    const handleToggle = (number) => () => {
        const currentIndex = checked.indexOf(number);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(number);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleChange = (event) => {
        if (event.target.name === "discipline") {
            setDiscipline(event.target.value);
        }
        if (event.target.name === "section") {
            setSection(event.target.value)
        } 
    };

    const handleCreateBlock = () => {
        let newBlock = [...blocks];
        newBlock.push({
            num: blocks.length + 1,
            question: '',
            answer: '',
            tAnswer: ''
        });
        setBlocks(newBlock);
    }

    const handleClickOpen = (id) => {
        let newGroups = [...groups];
        let newStudents = [];

        students.forEach(student => {
            if (student.userId === id) {
                if (student.checked) {
                    student.checked = false;
                } student.checked = true;
            }
        });

        newGroups.forEach(group => {
            if (group.id === id) {
                studentServices.getStudentsOfTheGroup(id).then(res => {
                    if (res.data.students) {
                        res.data.students.forEach(student => {
                            newStudents.push({
                                userId: student.userId,
                                name: student.name,
                                checked: true
                            });
                        });
                        setStudents(newStudents);
                    }
                });
                if (group.open) {
                    group.open = false;
                    group.checked = false;
                } else {
                    group.open = true;
                    group.checked = true;
                }
            }
        });
        setGroups(newGroups);
    }

    const labelId = `checkbox-list-label-1`;

    useEffect(() => {
        if (discipline) {
            sectionService.getSectionsOfTheDiscipline(discipline).then(res => {
                let newSections = [...sections];
                if (res.data.sections) {
                    res.data.sections.forEach(section => {
                        newSections.push(section);
                    });
                    setSections(newSections);
                }
            });
            groupServices.getGroupsOfTheDiscipline(discipline).then(res => {
                let newGroups = [...groups];
                if (res.data.groups) {
                    res.data.groups.forEach(group => {
                        newGroups.push({
                            id: group.id,
                            open: false,
                            checked: false
                        });
                    });
                    setGroups(newGroups);
                }
            });
        }
        disciplineService.getDisciplinesOfTheTeacher(currentUser.userId).then(res => {
            let newDisciplines = [...disciplines];
            if (res.data.disciplines) {
                res.data.disciplines.forEach(discipline => {
                    newDisciplines.push(discipline);
                })
            }
            setDisciplines(newDisciplines);
        })
    }, [discipline]);

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
                    <Card>
                        <CardContent>
                        <Typography
                                variant="h6"
                                sx={{
                                    mb: 2
                                }}
                            >
                                Конфигурация теста
                            </Typography>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuitextField-root': {
                                        m: 1,
                                        width: '25ch'
                                    }
                                }}
                                noValidate
                                autoComplete='off'
                            >
                                <Grid
                                    item={true}
                                    container
                                    spacing={2}
                                >
                                    <Grid
                                        item={true}
                                    >
                                        <TextField 
                                            required
                                            id="outlined-name-test"
                                            label="Название теста"
                                            defaultValue=""
                                        />
                                    </Grid>
                                    <Grid
                                        item={true}
                                    >
                                        <Box sx={{ minWidth: 220 }}>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">Выбрать дисциплину</InputLabel>
                                                <Select
                                                    labelId="select-discipline"
                                                    id="discipline"
                                                    name="discipline"
                                                    value={discipline}
                                                    label="Выбрать секцию"
                                                    onChange={handleChange}
                                                >
                                                    {
                                                        disciplines.map((discipline, index) => {
                                                            return (
                                                                <MenuItem
                                                                    key={index}
                                                                    value={discipline.id}
                                                                >
                                                                    {discipline.name}
                                                                </MenuItem>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Box>
                                    </Grid>
                                    {
                                        discipline && (
                                            <Grid
                                                item={true}
                                            >
                                                <Box sx={{ minWidth: 220 }}>
                                                    <FormControl 
                                                        fullWidth
                                                    >
                                                        <InputLabel id="demo-simple-select-label">Выбрать секцию</InputLabel>
                                                        <Select
                                                            labelId="select-section"
                                                            id="section"
                                                            name="section"
                                                            value={section}
                                                            label="Выбрать секцию"
                                                            onChange={handleChange}
                                                        >
                                                            {
                                                                sections && sections.map((section, index) => {
                                                                    return (
                                                                        <MenuItem
                                                                            key={index}
                                                                            value={section.id}
                                                                        >
                                                                        {section.name}
                                                                        </MenuItem>
                                                                    )
                                                                })
                                                            }
                                                        </Select>
                                                    </FormControl>
                                                </Box>
                                            </Grid>
                                        )
                                    }
                                    <Grid
                                        item={true}
                                    >
                                        {
                                            discipline && (
                                                <List
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 360,
                                                        bgcolor: 'background.paper',
                                                        position: 'relative',
                                                        overflow: 'auto',
                                                        maxHeight: 240,
                                                        '& ul': {
                                                            padding: 0
                                                        }
                                                    }}
                                                    subheader={<ListSubheader>Группы и студенты</ListSubheader>}
                                                >
                                                        {
                                                            groups && groups.map((group, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <ListItemButton
                                                                            role={undefined}
                                                                            onClick={() => handleClickOpen(group.id)}
                                                                            dense
                                                                        >
                                                                            <ListItemIcon>
                                                                                <Checkbox 
                                                                                    edge="start"
                                                                                    checked={group.checked}
                                                                                    tabIndex={-1}
                                                                                    disableRipple
                                                                                    inputProps={{ 'aria-labelledby': labelId}}
                                                                                />
                                                                            </ListItemIcon>
                                                                            <ListItemText 
                                                                                id={labelId}
                                                                                primary={`${group.id}`}
                                                                            />
                                                                            { group.open ? <ExpandLess /> : <ExpandMore />}
                                                                        </ListItemButton>
                                                                        <Collapse
                                                                            in={group.open}
                                                                            timeout="auto"
                                                                            unmountOnExit
                                                                        >
                                                                            <List
                                                                                component="div"
                                                                                disablePadding
                                                                            >
                                                                                {
                                                                                    students && students.map((student, index) => {
                                                                                        return (
                                                                                            <ListItemButton
                                                                                                sx={{
                                                                                                    pl: 4
                                                                                                }}
                                                                                                key={index}
                                                                                                onClick={() => handleClickOpen(student.userId)}
                                                                                            >
                                                                                                <ListItemIcon>
                                                                                                    <Checkbox 
                                                                                                        edge="start"
                                                                                                        checked={student.checked}
                                                                                                        tabIndex={-1}
                                                                                                        disableRipple
                                                                                                        inputProps={{ 'aria-labelledby': labelId}}
                                                                                                    />
                                                                                                </ListItemIcon>
                                                                                                <ListItemText primary={`${student.name}`} />
                                                                                            </ListItemButton>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </List>
                                                                        </Collapse>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                </List>
                                            )
                                        }
                                    </Grid>
                                    <Grid
                                        item={true}
                                    >
                                        <TextField
                                            id="time"
                                            label="Время на прохождение"
                                            type="time"
                                            defaultValue="02:00"
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                            inputProps={{
                                            step: 300, // 5 min
                                            }}
                                            sx={{ width: 150, mr: 2 }}
                                        />
                                        <TextField
                                            id="date"
                                            label="Дата сдачи"
                                            type="date"
                                            defaultValue=""
                                            sx={{ width: 220 }}
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                    <CardContent>
                        <Grid
                            item={true}
                            lg={4}
                            md={4}
                            xl={4}
                            xs={4}
                        >
                            <List>
                                <TransitionGroup>
                                    <Collapse>
                                    {
                                        blocks && blocks.map((block, index) => {
                                            return (
                                                <ListItem
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'column',
                                                        alignItems: 'left',
                                                        textAlign: 'left'
                                                    }}
                                                    key={index}
                                                >
                                                    <Typography
                                                        variant="h6"
                                                        sx={{
                                                            mb: 2
                                                        }}
                                                    >
                                                        {`Вопрос №${block.num}`}
                                                    </Typography>
                                                    <TextField 
                                                        id="outlined-multiline-question-static"
                                                        label={`Текст вопроса №${block.num}`}
                                                        multiline
                                                        rows={4}
                                                        sx={{
                                                            width: "100%"
                                                        }}
                                                        defaultValue={`${block.question}`}
                                                    />
                                                    <TextField 
                                                        id="outlined-name-test"
                                                        label={`Ответ на вопрос №${block.num}`}
                                                        sx={{
                                                            width: '100%',
                                                            mt: 2
                                                        }}
                                                        defaultValue=""
                                                    />
                                                </ListItem>
                                            )
                                        })
                                    }
                                    </Collapse>
                                </TransitionGroup>
                            </List>
                            <Box
                                sx={{
                                    ml: 2,
                                    mt: 2
                                }}
                            >
                                <Button
                                    variant='outlined'
                                    onClick={() => handleCreateBlock()}
                                >
                                    Добавить вопрос
                                </Button>
                                <Button
                                    variant="contained"
                                    sx={{
                                        ml: 2
                                    }}
                                >
                                    Создать тест
                                </Button>
                            </Box>
                        </Grid>         
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default CreateTest;