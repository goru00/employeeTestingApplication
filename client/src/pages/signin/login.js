import React, { useState } from "react";
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

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

    function handleSubmit(e) {
        e.preventDefault();

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
    }

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
            <Form
                onSubmit={handleSubmit}
            >
            <TextField
                fullWidth
                label="Логин"
                margin="normal"
                name="login"
                type="login"
                variant="outlined"
                />
            <TextField
                fullWidth
                label="Пароль"
                margin="normal"
                name="password"
                type="password"
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
            </Form>
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

