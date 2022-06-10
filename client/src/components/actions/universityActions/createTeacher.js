import { useRef, useEffect, useState } from 'react';
import {
    Box, 
    Button,
    Container,
    Typography,
    Grid,
    Tooltip,
    FormControl,
    InputLabel,
    Select,
    ListItem,
    Avatar,
    ListItemText,
    OutlinedInput,
    MenuItem
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import useMessage from '../../../hooks/useMessage';
import useLoading from '../../../hooks/useLoading';
import { useFormik } from 'formik';
import useModal from '../../../hooks/useModal';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { create } from '../../../actions/university/teacher';
import teacherServices from '../../../services/university.services/teacher.services';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ModalCreateTeacher = (props) => {
    const { teachers, validation, loading, LoadAnimation } = props;
    const [message] = useMessage();
    const form = useRef();

    return (
        loading ? LoadAnimation : (
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1
                }}
            >
                <Container>
                    {message}
                    <Box
                        sx={{ my: 3 }}
                    >
                        <Typography variant="h5">
                            Добавление преподавателя в кафедру
                        </Typography>
                        <Typography>
                            Для добавления преподавателя необходимо заполнить поля ниже
                        </Typography>
                    </Box>
                    <form
                        onSubmit={validation.handleSubmit}
                        ref={form}
                    >
                        <Box
                            sx={{ flexGrow: 1 }}
                        >   
                            <Grid container rowSpacing={{ xs: 2, md: 2, sm: 4}} direction="row" justifyContent="center" alignItems="center">
                                <Grid container item={true}>
                                    <FormControl 
                                        sx={{
                                            m: 1,
                                            width: '100%'
                                        }}
                                    >
                                        <InputLabel
                                            id="multiple-teachers-name"
                                        >
                                            Выбрать преподавателя
                                        </InputLabel>
                                        <Select 
                                            labelId="multiple-teacher-name-label"
                                            id='multiple-teacher'
                                            value={validation.values.name}
                                            name="name"
                                            onChange={validation.handleChange}
                                            input={<OutlinedInput label="userId" />}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                                                        width: 250
                                                    }
                                                }
                                            }}
                                        >
                                            {
                                                teachers && teachers.map((teacher, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            value={teacher.userId}
                                                        >
                                                            <ListItem
                                                                key={teacher.userId}
                                                                component="div"
                                                                disablePadding
                                                            >
                                                                <Avatar 
                                                                    alt="/"
                                                                />
                                                                <ListItemText
                                                                    sx={{
                                                                        marginLeft: 2
                                                                    }}
                                                                >{teacher.name}</ListItemText>
                                                            </ListItem>
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Добавить преподавателя кафедры
                                    </Button>
                                </Box>
                            </Grid>
                        </Box>
                    </form>
                </Container>
            </Box>
        )
    )
}

function CreateTeacher({props}) {
    const [teachers, setTeachers] = useState([]);
    const { cathedraId } = props;
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    const dispatch = useDispatch();

    const validation = useFormik({
        initialValues: {
            userId: '',
            name: ''
        },
        validationSchema: Yup.object({
            userId: Yup
                .string()
        }),
        onSubmit: (values) => {
            const { name } = values;
            const userId = name;
            handleLoadingStart();
            dispatch(create(userId, cathedraId)).then(() => {
                console.log('successfully');
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                handleLoadingStop();
                handleClose();
                window.location.reload();
            })
        }
    });

    useEffect(() => {
        teacherServices.getTeachers().then(res => {
            let newTeachers = [];
            res.data.forEach(teacher => {
                newTeachers.push({
                    avatar: '/',
                    userId: teacher.userId,
                    name: teacher.name
                });
            })
            setTeachers(newTeachers);
        })
    }, []);

    const {content, handleOpen, handleClose} = useModal(ModalCreateTeacher({teachers, validation, loading, LoadAnimation}));

    return (
        <div className='createDirection'>
            <Tooltip title="Добавить преподавателя кафедры">
                <Button
                    aria-label="reduce"
                    onClick={handleOpen}
                >
                    <AddIcon fontSize="small" />
                </Button>
            </Tooltip>
            {content}
        </div>
    )
}

export default CreateTeacher;