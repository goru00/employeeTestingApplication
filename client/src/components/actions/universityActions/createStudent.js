import { useEffect, useState, useRef } from 'react';
import { Button, 
    Container, 
    Tooltip, 
    Typography, 
    Grid, 
    FormControl, 
    InputLabel, 
    Select, 
    OutlinedInput,
    MenuItem,
    ListItem, 
    Avatar,
    ListItemText
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import useModal from '../../../hooks/useModal';
import useMessage from '../../../hooks/useMessage';
import useLoading from '../../../hooks/useLoading';
import { useFormik } from 'formik';

import studentServices from '../../../services/university.services/student.services';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { useParams } from 'react-router-dom';

import { create } from '../../../actions/university/student';
import { Box } from '@mui/system';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ModalCreateStudent = (props) => {
    const { students, validation, loading, LoadAnimation } = props;
    const [message] = useMessage();
    const form = useRef();

    return (
        loading ? LoadAnimation : (
            <Box
                component="main"
                sx={{
                    alignItemS: 'center',
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
                            Добавление студента ВУЗа в учебную группу
                        </Typography>
                        <Typography>
                            Для добавления студента в группу необходимо правильно заполнить поля ниже
                        </Typography>
                    </Box>
                    <form
                        onSubmit={validation.handleSubmit}
                        ref={form}
                    >
                        <Box
                            sx={{ flexGrow: 1 }}
                        >
                            <Grid
                                container
                                rowSpacing={{ xs: 2, md: 4 }}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid
                                    container
                                    item={true}
                                >
                                    <FormControl
                                        sx={{
                                            m: 1,
                                            width: '100%'
                                        }}
                                    >
                                        <InputLabel
                                            id="multiple-students-name"
                                        >
                                            Выбрать студента
                                        </InputLabel>
                                        <Select
                                            labelId="multiple-student-name"
                                            id="multiple-student"
                                            value={validation.values.name}
                                            name="name"
                                            onChange={validation.handleChange}
                                            input={<OutlinedInput label="userId" />}
                                            MenuProps={{
                                                PaperProps: {
                                                    style: {
                                                        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
                                                    }
                                                }
                                            }}
                                        >
                                            {
                                                students && students.map((student, index) => {
                                                    return (
                                                        <MenuItem
                                                            key={index}
                                                            value={student.userId}
                                                        >
                                                            <ListItem
                                                                key={student.userId}
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
                                                                >{student.name}</ListItemText>
                                                            </ListItem>
                                                        </MenuItem>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Box
                                    sx={{
                                        py: 2
                                    }}
                                >
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Добавить студента в группу
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

function CreateStudent({props}) {

    const [students, setStudents] = useState([]);
    const { targetGroup } = props;
    const { loading, handleLoadingStop, handleLoadingStart, LoadAnimation } = useLoading();
    const dispatch = useDispatch();

    const params = useParams();

    console.log(targetGroup)

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
            dispatch(create(userId, targetGroup)).then(() => {
                console.log('successfully');
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                handleLoadingStop();
                handleClose();
                window.location.reload();
            })
        }
    })

    useEffect(() => {
        studentServices.getStudents().then(res => {
            let newStudents = [];
            res.data.forEach(student => {
                newStudents.push({
                    avatar: '/',
                    userId: student.userId,
                    name: student.name
                });
            })
            setStudents(newStudents);
        })
    }, []);

    const { content, handleOpen, handleClose } = useModal(ModalCreateStudent({students, validation, loading, LoadAnimation}));

    return (
        <div className="createStudentOfTheGroup">
            <Tooltip title="Добавить студента в группу">
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

export default CreateStudent;