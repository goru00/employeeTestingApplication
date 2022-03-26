import { 
    Card, 
    CardContent, 
    CardHeader, 
    Divider, 
    Grid, 
    TextField,
    Box,
    Button
} from '@mui/material';
import { useState } from 'react';

const ProfileSettingsDetails = (props) => {
    const [info, setInfo] = useState({
        firstName: 'Третьяков',
        secondName: 'Дмитрий',
        lastName: 'Артемович',
        email: 'goru00@vk.com',
        oldPassword: '',
        newPassword: ''
    });

    const handleChange = (event) => {
        setInfo({
            ...info,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form 
            autoComplete='off'
            noValidate
            {...props}
        >
            <Card>
                <CardHeader 
                    subheader="Заполните поля для редактирования профиля"
                    title="Профиль"
                />
                    <Divider />
                    <CardContent>
                        <Grid 
                            container
                            spacing={3}
                        >
                            <Grid 
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    helperText="Введите фамилию"
                                    label="Фамилия"
                                    name="firstName"
                                    onChange={handleChange}
                                    value={info.firstName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid 
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    helperText="Введите имя"
                                    label="Имя"
                                    name="secondName"
                                    onChange={handleChange}
                                    value={info.secondName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid 
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    helperText="Введите отчество (если есть)"
                                    label="Отчество"
                                    name="lastName"
                                    onChange={handleChange}
                                    value={info.lastName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid 
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    helperText="Введите новый адрес почты"
                                    label="Email"
                                    name="email"
                                    onChange={handleChange}
                                    value={info.email}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Grid 
                            container
                            spacing={3}
                        >
                            <Grid 
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    helperText="Введите старый пароль"
                                    label="Старый пароль"
                                    name="oldPassword"
                                    onChange={handleChange}
                                    value={info.oldPassword}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid 
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField 
                                    fullWidth
                                    helperText="Введите новый пароль"
                                    label="Новый пароль"
                                    name="newPassword"
                                    onChange={handleChange}
                                    value={info.newPassword}
                                    variant="outlined"
                                />
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Box 
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            p: 2
                        }}
                    >
                        <Button 
                            color="primary"
                            variant="contained"
                        >
                            Сохранить изменения
                        </Button>
                    </Box>
            </Card>
        </form>
    )
}

export default ProfileSettingsDetails;