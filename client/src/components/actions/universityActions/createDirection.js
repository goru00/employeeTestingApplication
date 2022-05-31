import { useRef } from 'react';
import {
    Box, 
    Button,
    Container,
    Typography,
    Grid,
    TextField,
    Tooltip
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import useMessage from '../../../hooks/useMessage';
import useLoading from '../../../hooks/useLoading';
import { useFormik } from 'formik';
import useModal from '../../../hooks/useModal';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { create } from '../../../actions/university/direction';

const ModalCreateDirection = (props) => {
    const { validation, loading, LoadAnimation } = props;
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
                            Создание направления кафедры
                        </Typography>
                        <Typography>
                            Для создания навправления необходимо заполнить поля ниже
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
                                    <TextField
                                        error={Boolean(
                                            validation.touched.id && 
                                            validation.errors.id)}
                                        fullWidth
                                        helperText={
                                            validation.touched.id && 
                                            validation.errors.id}
                                        onBlur={validation.handleBlur}
                                        onChange={validation.handleChange}
                                        label="Код направления"
                                        margin="normal"
                                        name="id"
                                        type="text"
                                        value={validation.values.id}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Grid container item={true}>
                                    <TextField
                                        error={Boolean(
                                            validation.touched.name && 
                                            validation.errors.name)}
                                        fullWidth
                                        helperText={
                                            validation.touched.name && 
                                            validation.errors.name}
                                        onBlur={validation.handleBlur}
                                        onChange={validation.handleChange}
                                        label="Полное наименование направления"
                                        margin="normal"
                                        name="name"
                                        type="text"
                                        value={validation.values.name}
                                        variant="outlined"
                                    />
                                </Grid>
                                <Box sx={{ py: 2 }}>
                                    <Button
                                        color="primary"
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                    >
                                        Создать направление
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

function CreateDirection({props}) {
    const { cathedraId } = props;
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    const dispatch = useDispatch();

    const validation = useFormik({
        initialValues: {
            id: '',
            name: ''
        },
        validationSchema: Yup.object({
            id: Yup
                .string()
                .min(6)
                .matches(/[0-9]{2}.[0-9]{2}.[0-9]{2}$/, 'Код направления должен быть формата 00.00.00')
                .required('Код обязателен для создания направления'),
            name: Yup
                .string()
                .min(6)
                .required('Наименование обязательно для создания направления')
        }),
        onSubmit: (values) => {
            const { id, name } = values;
            handleLoadingStart();
            dispatch(create(id, name, cathedraId)).then(() => {
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

    const {content, handleOpen, handleClose} = useModal(ModalCreateDirection({validation, loading, LoadAnimation}));

    return (
        <div className='createDirection'>
            <Tooltip title="Добавить направление">
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

export default CreateDirection;