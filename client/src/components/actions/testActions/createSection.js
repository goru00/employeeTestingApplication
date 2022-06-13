import { useRef, useState, useEffect } from 'react';
import {
    Box, 
    Button,
    Container,
    Typography,
    Grid,
    Tooltip,
    TextField
} from '@mui/material';

import AddIcon from '@mui/icons-material/Add';

import useMessage from '../../../hooks/useMessage';
import useLoading from '../../../hooks/useLoading';
import { useFormik } from 'formik';
import useModal from '../../../hooks/useModal';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { create } from '../../../actions/test/section';

const ModalCreateSection = (props) => {
    const { groups, validation, loading, LoadAnimation } = props;
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
                            Создание раздела (учебной главы) дисциплины
                        </Typography>
                        <Typography>
                            Для создания раздела необходимо заполнить поля ниже
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
                                            validation.touched.name && 
                                            validation.errors.name)}
                                        fullWidth
                                        helperText={
                                            validation.touched.name && 
                                            validation.errors.name}
                                        onBlur={validation.handleBlur}
                                        onChange={validation.handleChange}
                                        label="Наименование раздела"
                                        margin="normal"
                                        name="name"
                                        type="text"
                                        value={validation.values.id}
                                        variant="outlined"
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        name="description"
                                        type="text"
                                        label="Описание"
                                        multiline
                                        rows={4}
                                        error={Boolean(
                                            validation.touched.description &&
                                            validation.errors.description
                                        )}
                                        helperText={
                                            validation.touched.description &&
                                            validation.errors.description
                                        }
                                        onBlur={validation.handleBlur}
                                        onChange={validation.handleChange}
                                        value={validation.values.description}
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
                                        Добавить раздел
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

function CreateSection({props}) {
    const { disciplineId } = props;
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    const dispatch = useDispatch();

    const validation = useFormik({
        initialValues: {
            name: '',
            description: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .required(),
            description: Yup
                .string()
                .required()
        }),
        onSubmit: (values) => {
            const { name, description } = values;
            handleLoadingStart();
            dispatch(create(name, description, disciplineId)).then(() => {
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

    const {content, handleOpen, handleClose} = useModal(ModalCreateSection({validation, loading, LoadAnimation}));

    return (
        <div className='createDirection'>
            <Tooltip title="Добавить учебный раздел">
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

export default CreateSection;