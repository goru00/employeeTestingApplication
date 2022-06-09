import { useRef } from 'react';

import useMessage from '../../../hooks/useMessage';
import useLoading from '../../../hooks/useLoading';
import { useFormik } from 'formik';
import useModal from '../../../hooks/useModal';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { create } from '../../../actions/university/discipline';
import { 
    Box, 
    Container,
    Typography,
    Grid,
    TextField,
    Button 
} from '@mui/material';

const ModalCreateDiscipline = (props) => {
    const { validation, loading, LoadAnimation } = props;
    const [message] = useMessage();
    const form = useRef();

    return (
        loading ? LoadAnimation : (
            <Box
                component="main"
                sx={{
                    alignItem: 'center',
                    display: 'flex',
                    flexGrow: 1
                }}
            >
                <Container>
                    {message}
                    <Box
                        sx={{
                            my: 3
                        }}
                    >
                        <Typography variant="h5">
                            Создание дисциплины
                        </Typography>
                        <Typography>
                        Для создания дисциплины необходимо заполнить поля ниже
                        </Typography>
                    </Box>
                    <form
                        onSubmit={validation.handleSubmit}
                        ref={form}
                    >
                        <Box
                            sx={{
                                flexGrow: 1
                            }}
                        >
                            <Grid
                                container
                                rowSpacing={{
                                    xs: 2,
                                    md: 2,
                                    sm: 4
                                }}
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Grid
                                    container
                                    item={true}
                                >
                                    <TextField
                                        error={Boolean(
                                            validation.touched.id &&
                                            validation.errors.id
                                        )}
                                        fullWidth
                                        helperText={
                                            validation.touched.id &&
                                            validation.errors.id
                                        }
                                        onBlur={validation.handleBlur}
                                        onChange={validation.handleChange}
                                        label="Код дисциплины"
                                        margin="normal"
                                        name="id"
                                        type="text"
                                        value={validation.values.id}
                                        variant="outlined"
                                    >
                                    </TextField>
                                </Grid>
                                <Grid
                                    container
                                    item={true}
                                >
                                    <TextField
                                        error={Boolean(
                                            validation.touched.name &&
                                            validation.errors.name
                                        )}
                                        fullWidth
                                        helperText={
                                            validation.touched.name &&
                                            validation.errors.name
                                        }
                                        onBlur={validation.handleBlur}
                                        onChange={validation.handleChange}
                                        label="Полное название дисциплины"
                                        margin="normal"
                                        name="name"
                                        type="text"
                                        value={validation.values.name}
                                        variant="outlined"
                                    >
                                    </TextField>
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
                                        Создать дисциплину
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

function CreateDiscipline() {
    const [message] = useMessage();
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
                .required('Код дисциплины обязателен для создания дисциплины'),
            name: Yup
                .string()
                .min(6)
                .required('Имя обязательно для создания дисциплины') 
        }),
        onSubmit: (values) => {
            const { id, name } = values;
            handleLoadingStart();
            dispatch(create(id, name)).then(() => {
                console.log(`${id} ${name}`)
                console.log('successfully')
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                handleLoadingStop();
                handleClose();
                window.location.reload();
            })
        }
    })

    const { content, handleOpen, handleClose } = useModal(ModalCreateDiscipline({validation, loading, LoadAnimation}));
    return (
        <div>
            <Box
                component="div"
            >
                {message}
                <Button
                    onClick={handleOpen}
                    variant="contained"
                >
                    Добавить дисциплину
                </Button>
                {content}
            </Box>
        </div>
    )
}

export default CreateDiscipline;