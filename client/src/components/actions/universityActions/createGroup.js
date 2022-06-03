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

import { create } from '../../../actions/university/group';

const ModalCreateGroup = (props) => {
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
                            Создание учебной группы
                        </Typography>
                        <Typography>
                            Для создания группы необходимо заполнить поля ниже
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
                                        label="Наименование группы"
                                        margin="normal"
                                        name="id"
                                        type="text"
                                        value={validation.values.id}
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
                                        Добавить учебную группу
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

function CreateGroup({props}) {
    const [groups, setGroups] = useState([]);
    const { directionId } = props;
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    const dispatch = useDispatch();

    const validation = useFormik({
        initialValues: {
            id: ''
        },
        validationSchema: Yup.object({
            id: Yup
                .string()
                .required()
        }),
        onSubmit: (values) => {
            const { id } = values;
            handleLoadingStart();
            dispatch(create(id, directionId)).then(() => {
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

    const {content, handleOpen, handleClose} = useModal(ModalCreateGroup({groups, validation, loading, LoadAnimation}));

    return (
        <div className='createDirection'>
            <Tooltip title="Добавить группу">
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

export default CreateGroup;