import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
} from '@mui/material';

import ListItemTable from '../../components/cards/ListItemTable';
import UserService from '../../services/user.service';
import eventBus from '../../common/EventBus';

const headers = [
    "Логин",
    "Имя, фамилия и отчество",
    "E-Mail",
    "Активация"
];

const Users = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    const [users, setUsers] = useState();

    useEffect(() => {
        UserService.getUsers().then(res => {
            let dataUsers = [];
            res.forEach(user => {
                dataUsers.push(user);
            });
            console.log(dataUsers);
            setUsers(dataUsers);
        }, err => {
            if (err.res && err.res.status === 403) {
                eventBus.dispatch('logout');
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
                    <Button variant="contained" to="#">
                        Добавить нового пользователя
                    </Button>
                </Stack>
                <ListItemTable props={{
                    body: users,
                    title: "Список пользователей",
                    headers
                }} />
            </Container>
        </Box>
    )
}

export default Users;