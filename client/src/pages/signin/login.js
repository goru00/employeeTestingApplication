import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

import { useFormik } from 'formik';
import * as Yup from 'yup';

const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Это поле является обязательным
        </div>
      );
    }
};

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const { isLoggedIn } = props;

    const { message } = props;

    const validation = useFormik({
        initialValues: {
            login: username,
            password: password
        },
        validationSchema: Yup.object({
            login: Yup
                .string()
                .email('Введите корректный логин')
                .max(32)
                .required('Логин обязателен для ввода'),
            password: Yup
                .string()
                .max(16)
                .required('Пароль обязателен для ввода')
        }),
        onSubmit: (e) => {
            setLoading(true);
            const { dispatch, history } = props;
            dispatch(login(username, password))
            .then(() => {
                history.push("/profile");
                window.location.reload();
            })
            .catch(() => {
                setLoading(false);
            });
        },
        onChange: (e) => {
            if (e.target.name === "login") setUsername(e.target.data);
            else setPassword(e.target.data);
        }
    });  

    if (isLoggedIn) {
        return <Navigate to='/profile' />
    }

    return (
        <>
        <Box
        component="main"
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexGrow: 1,
          minHeight: '100%'
        }}
      >
        <Container maxWidth="sm">
            <Box sx={{ my: 3 }}>
                <Typography
                    color="textPrimary"
                    variant="h4"
                    align="center"
                >
                    Авторизация
                </Typography>
            </Box>
            <Box sx={{ my: 1}}>
            {
                    message && (
                        <Alert severity="error">
                            {message}
                        </Alert>
                    )
            }
            </Box>
            <form
                onSubmit={validation.handleSubmit}
            >
            <TextField
                error={Boolean(
                    validation.touched.login && 
                    validation.errors.login)}
                fullWidth
                helperText={
                    validation.touched.login && 
                    validation.errors.login}
                onBlur={validation.handleBlur}
                onChange={validation.handleChange}
                label="Логин"
                margin="normal"
                name="login"
                type="login"
                value={validation.values.login}
                variant="outlined"
                />
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
                <Box sx={{ py: 2 }}>
                    <Button
                        color="primary"
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                    >
                        Войти
                    </Button>
                </Box>
            </form>
            </Container>
      </Box>
        </>
    )
}

function mapStateToProps(state) {
    const { isLoggedIn } = state.auth;
    const { message } = state.message;
    return {
        isLoggedIn,
        message
    }
}

export default connect(mapStateToProps)(Login);

