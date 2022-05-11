import {
    Box,
    Card,
    CardContent,
    CardActions,
    Button,
    Avatar,
    Typography,
    Divider
} from '@mui/material';

const user = {
    avatar: '',
    name: 'Третьяков Дмитрий Артемович',
    email: "goru00@vk.com"
}

const ProfileSettings = ({currentUser}) => {
    const { name, email } = currentUser;
    return (
        <Card
    >
        <CardContent>
            <Box
                sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <Avatar 
                    src={user.avatar}
                    sx={{
                        height: 64,
                        mb: 2,
                        width: 64
                    }}
                />
                <Typography 
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                    align="center"
                >
                    {name}
                </Typography>
                <Typography 
                    color="textSecondary"
                    variant="body2"
                >
                    {email}
                </Typography>
            </Box>
        </CardContent>
        <Divider />
        <CardActions>
            <Button 
                color="primary"
                fullWidth
                variant="text"
            >
                Загрузить изображение профиля
            </Button>
        </CardActions>
    </Card>
    )
}

export default ProfileSettings;