import React, { useEffect, useState, useRef } from 'react';
import {
    Button,
    Box,
    Typography,
    Grid,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    FormLabel,
    FormGroup,
    Container,
    Alert,
    FormControlLabel,
    Checkbox,
} from '@mui/material';

import useModal from '../../hooks/useModal';
import useLoading from '../../hooks/useLoading';
import useMessage from '../../hooks/useMessage';

import AuthService from '../../services/auth.services';

import { useDispatch } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../actions/auth';

const ModalCreateUser = (props) => {
    const { validation, roles, loading, LoadAnimation } = props;
    const [message] = useMessage(); 
    const form = useRef();

    return (
        loading ? LoadAnimation : (
            <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container>
            {message}
            <Box sx={{ my: 3 }}>
                <Typography variant="h5">
                    Создание пользователя
                </Typography>
                <Typography>
                    Для создания пользователя необходимо заполнить поля ниже
                </Typography>
            </Box>
                <form
                    onSubmit={validation.handleSubmit}
                    ref={form}
                >
                    <Box
                        sx={{ flexGrow: 1}}
                    >
                        <Grid container rowSpacing={{ xs: 2, md: 2, sm: 4}} direction="row" justifyContent="center" alignItems="center">
                            <Grid container item={true}>
                                <TextField
                                    error={Boolean(
                                        validation.touched.userId && 
                                        validation.errors.userId)}
                                    fullWidth
                                    helperText={
                                        validation.touched.userId && 
                                        validation.errors.userId}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    label="Логин"
                                    margin="normal"
                                    name="userId"
                                    type="login"
                                    value={validation.values.userId}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container item={true}>
                                <TextField
                                    error={Boolean(
                                        validation.touched.password && 
                                        validation.errors.password)}
                                    fullWidth
                                    helperText={
                                        validation.touched.password && 
                                        validation.errors.password}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    label="Пароль"
                                    margin="normal"
                                    name="password"
                                    type="password"
                                    value={validation.values.password}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container item={true}>
                                <TextField
                                    error={Boolean(
                                        validation.touched.email && 
                                        validation.errors.email)}
                                    fullWidth
                                    helperText={
                                        validation.touched.email && 
                                        validation.errors.email}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    label="E-Mail"
                                    margin="normal"
                                    name="email"
                                    type="email"
                                    value={validation.values.email}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container item={true}>
                                <TextField
                                    error={Boolean(
                                        validation.touched.fio && 
                                        validation.errors.fio)}
                                    fullWidth
                                    helperText={
                                        validation.touched.fio && 
                                        validation.errors.fio}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    label="Фамилия"
                                    margin="normal"
                                    name="fio"
                                    type="text"
                                    value={validation.values.fio}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container item={true}>
                                <TextField
                                    error={Boolean(
                                        validation.touched.fName && 
                                        validation.errors.fName)}
                                    fullWidth
                                    helperText={
                                        validation.touched.fName && 
                                        validation.errors.fName}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    label="Имя"
                                    margin="normal"
                                    name="fName"
                                    type="text"
                                    value={validation.values.fName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container item={true}>
                                <TextField
                                    error={Boolean(
                                        validation.touched.lName && 
                                        validation.errors.lName)}
                                    fullWidth
                                    helperText={
                                        validation.touched.lName && 
                                        validation.errors.lName}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    label="Отчество"
                                    margin="normal"
                                    name="lName"
                                    type="text"
                                    value={validation.values.lName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid container item={true}>
                                <FormControl
                                    component="fieldset"
                                    variant="standard"
                                >
                                    <FormLabel component="legend">
                                        Роли
                                    </FormLabel>
                                    <FormGroup>
                                        {
                                            roles && roles.rolesDto.map((role) => (
                                                <FormControlLabel 
                                                    control={
                                                        <Checkbox
                                                            onChange={validation.values.roles.rolesDto} 
                                                            name={role.name}
                                                        />
                                                    }
                                                    label={role.name}
                                                    key={role.id}
                                                />
                                            ))
                                        }
                                    </FormGroup>
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
                        Создать пользователя
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

function CreateUser({props}) {
    const [roles, setRoles] = useState();
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    const [message, clearMessage] = useMessage();

    const dispatch = useDispatch();

    const validation = useFormik({
        initialValues: {
            userId: '',
            password: '',
            fio: '',
            fName: '',
            lName: '',
            email: '',
            roles: []
        },
        validationSchema: Yup.object({
            userId: Yup
                .string()
                .min(6, 'Длина логина не может быть меньше 8 символов. Проверьте введенные данные')
                .max(32)
                .required('Логин обязателен для ввода'),
            fio: Yup
                .string()
                .min(2, 'Длина фамилии не может быть меньше 6 символов')
                .max(32, 'Длина фамилии не может быть больше 32 символов')
                .matches(/^[А-Яа-я]+$/, 'Фамилия может быть только из русских символов')
                .required('Необходимо ввести фамилию'),
            fName: Yup
                .string()
                .max(24, 'Длина имени не может быть больше 24 символов')
                .matches(/^[А-Яа-я]+$/, 'Имя может быть только из русских символов')
                .required('Необходимо ввести имя'),
            lName: Yup
                .string()
                .max(36, 'Отчество не может быть больше 36 символов')
                .matches(/^[А-Яа-я]+$/, 'Отчество может быть только из русских символов'),
            password: Yup
                .string()
                .min(8, 'Длина пароля не может быть меньше 8 символов. Проверьте введенные данные')
                .max(16)
                .required('Пароль обязателен для ввода'),
            email: Yup
                .string()
                .required('E-Mail обязателен для создания пользователя'),
            roles: Yup
                .lazy(val => (Array.isArray(val) ? Yup.array().of(Yup.string()) : Yup.string()))
        }), 
        onSubmit: (values) => {
            console.log('submit')
            const { userId, password, email, roles} = values;
            const name = `${values.fio} ${values.fName} ${values.lName}`;
            handleLoadingStart();
            dispatch(register(userId, password, name, email, roles)).then(() => {
                console.log('successfully')
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                handleLoadingStop();
                handleClose();
                window.location.reload();
            });
        }
    });

    const {content, open, handleOpen, handleClose} = useModal(ModalCreateUser({validation, roles, loading, LoadAnimation}));

    useEffect(() => {
        if (open && !!!roles) {
            AuthService.getRoles().then(res => {
                setRoles(res.data);
            });
        }
    }, [roles, open]);

    return (
        <div>
            <Box
                component="main"
            >
                {message}
                <Button 
                    onClick={handleOpen}
                    variant="contained"
                >Добавить пользователя</Button>
                    {content}
            </Box>
        </div>
    )
}

export default CreateUser;