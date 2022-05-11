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

const ProfileSettingsDetails = ({currentUser}) => {

    const { name, email } = currentUser;

    const [info, setInfo] = useState({
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
                                    value={name.split(/\s/)[0]}
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
                                    value={name.split(/\s/)[1]}
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
                                    value={name.split(/\s/)[2]}
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
                                    value={email}
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