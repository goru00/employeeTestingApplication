import { useState, useEffect, useRef } from 'react';
import {
    Box, 
    Button,
    Container,
    Typography,
    Grid,
    TextField
} from '@mui/material';

import useMessage from '../../../hooks/useMessage';
import useLoading from '../../../hooks/useLoading';
import { useFormik } from 'formik';
import useModal from '../../../hooks/useModal';

import * as Yup from 'yup';

import { useDispatch } from 'react-redux';

import { create } from '../../../actions/university/cathedra';
import cathedraServices from '../../../services/university.services/cathedra.services';

const ModalCreateCathedra = (props) => {
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
                            Создание кафедры
                        </Typography>
                        <Typography>
                            Для создания кафедры необходимо заполнить поля ниже
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
                                        label="Полное наименование кафедры"
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
                                        Создать кафедру
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

function CreateCathedras() {
    const [cathedras, setCathedras] = useState();
    const [message, clearMessage] = useMessage();
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    const dispatch = useDispatch();

    const validation = useFormik({
        initialValues: {
            name: ''
        },
        validationSchema: Yup.object({
            name: Yup
                .string()
                .min(6)
                .required('Имя обязательно для создания кафедры')
        }),
        onSubmit: (values) => {
            console.log('submit')
            const { name } = values;
            handleLoadingStart();
            dispatch(create(name)).then(() => {
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

    const {content, handleOpen, handleClose} = useModal(ModalCreateCathedra({validation, loading, LoadAnimation}));
    return (
        <div>
            <Box
                component="main"
            >
                {message}
                <Button 
                    onClick={handleOpen}
                    variant="contained"
                >Добавить кафедру</Button>
                    {content}
            </Box>
        </div>
    )
}

export default CreateCathedras;