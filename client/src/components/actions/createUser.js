import React, { useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';

import {
    Modal,
    Button,
    Box,
    Typography,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText,
    TextField,
    Select,
    InputLabel,
    MenuItem,
    FormControl,
    Container
} from '@mui/material';
import useModal from '../../hooks/useModal';
import AuthService from '../../services/auth.services';

import { useDispatch, useSelector } from 'react-redux';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../actions/auth';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

function CreateUser() {
    const [open, handleOpen, handleClose] = useModal();
    const [roles, setRoles] = useState();
    const [selectRole, setSelectRole] = useState('');

    const dispatch = useDispatch();
    const form = useRef();


    const validation = useFormik({
        initialValues: {
            userId: '',
            password: '',
            fio: '',
            fname: '',
            lname: '',
            email: ''
        },
        validationSchema: Yup.object({
            userId: Yup
                .string()
                .min(6, 'Длина логина не может быть меньше 8 символов. Проверьте введенные данные')
                .max(32)
                .required('Логин обязателен для ввода'),
            fio: Yup
                .string()
                .min(6, 'Длина фамилии не может быть меньше 6 символов')
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
            passwordConfirm: Yup
                .string(),
            email: Yup
                .string()
                .required('E-Mail обязателен для создания пользователя')
        }), 
        onSubmit: (values) => {
            const { userId, password, email, roles} = values;
            const name = `${values.fio} ${values.fName} ${values.lName}`;
            dispatch(register(userId, email, name, password, roles)).then(() => {
                window.location.reload();
            });
        }
    });

    useEffect(() => {
        if (open && !!!roles) {
            AuthService.getRoles().then(res => {
                setRoles(res.data);
            });
        }
    }, [roles, open]);

    const handleSelectRole = (event) => {
        setSelectRole(event.target.value)
    }

    return (
        <div>
            <Box
                component="main"
            >
                <Button 
                    onClick={handleOpen}
                    variant="contained"
                >Добавить пользователя</Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <Container maxWidth="sm">
                        <DialogTitle>
                            Создание пользователя
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Введите необходимые данные для создания пользователя
                            </DialogContentText>
                            <form
                                onSubmit={validation.handleSubmit}
                                ref={form}
                            >
                                <TextField
                                    autoFocus
                                    error={Boolean(
                                        validation.touched.userId && 
                                        validation.errors.userId)}
                                    value={validation.values.userId}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    margin="normal"
                                    id="userId"
                                    label="Логин"
                                    type="username"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    error={Boolean(
                                        validation.touched.fio && 
                                        validation.errors.fio)}
                                    value={validation.values.fio}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    margin="normal"
                                    id="fio"
                                    label="Фамилия"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    error={Boolean(
                                        validation.touched.fname && 
                                        validation.errors.fname)}
                                    value={validation.values.fname}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    margin="normal"
                                    id="fname"
                                    label="Имя"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    error={Boolean(
                                        validation.touched.lname && 
                                        validation.errors.lname)}
                                    value={validation.values.lname}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    margin="normal"
                                    id="lname"
                                    label="Отчетство"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    error={Boolean(
                                        validation.touched.email && 
                                        validation.errors.email)}
                                    value={validation.values.email}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    margin="normal"
                                    id="email"
                                    label="E-Mail"
                                    type="email"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    error={Boolean(
                                        validation.touched.password && 
                                        validation.errors.password)}
                                    value={validation.values.password}
                                    onBlur={validation.handleBlur}
                                    onChange={validation.handleChange}
                                    margin="normal"
                                    id="password"
                                    label="Пароль"
                                    type="password"
                                    fullWidth
                                    variant="standard"
                                />
                                <FormControl
                                    sx={{
                                        m: 1,
                                        minWidth: 80
                                    }}
                                >
                                    <InputLabel
                                        id="roles-label"
                                    >Роль</InputLabel>
                                    <Select
                                        labelId="roles-label"
                                        id="roles-select"
                                        value={selectRole}
                                        onChange={handleSelectRole}
                                        autoWidth
                                        label="Age"
                                    >
                                        <MenuItem value="">
                                            <em>Не выбрано</em>
                                        </MenuItem>
                                        {
                                            roles && roles.rolesDto.map((role, index) => {
                                                return (
                                                    <MenuItem key={index} value={role.id}>
                                                        {role.name}
                                                    </MenuItem>
                                                )
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </form>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Закрыть</Button>
                            <Button
                                color="primary"
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                            >
                                Принять
                            </Button>
                        </DialogActions>
                    </Container>
                </Dialog>
            </Box>
        </div>
    )
}

export default CreateUser;