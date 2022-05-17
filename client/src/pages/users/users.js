import { useState, useEffect, lazy, Suspense } from 'react';
import {
    Box,
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination,
    Skeleton
  } from '@mui/material';
import UserService from '../../services/user.service';
import eventBus from '../../common/EventBus';
import CreateUser from '../../components/actions/createUser';
import ApiMessage from '../../components/apiMessage/apiMessage';
const ListItemTable = lazy(() => import('../../components/cards/ListItemTable'));

const Users = () => {

    const [users, setUsers] = useState();

    const headers = [
        "Логин",
        "Имя пользователя",
        "E-Mail",
        "Активация",
        "Роли"
    ];

    useEffect(() => {
        UserService.getUsers().then(res => {
            setUsers(res);
        }, err => {
            if (err.response && err.response.status === 403) {
                eventBus.dispatch('logout');
            } else {
                return (<ApiMessage message={err.response} />)
            }
        });
    }, []);

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container 
                maxWidth="lg"
            >
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Пользователи
                    </Typography>
                    <CreateUser />
                </Stack>
                    <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
                        <ListItemTable props={{
                            title: "Пользователи",
                            body: users,
                            headers: headers
                        }
                        } />
                    </Suspense>
            </Container>
        </Box>
    )
}

export default Users;