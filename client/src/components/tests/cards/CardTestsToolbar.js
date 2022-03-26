import {
    Box, 
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    Typography
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const CardTestsToolbar = (props) => {
    return (
        <Box 
            {...props}
        >
            <Box 
                sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    m: -1
                }}
            >
                <Typography 
                    sx={{
                        m: 1
                    }}
                    variant="h4"
                >
                    Тесты
                </Typography>
                <Box sx={{
                    m: 1
                }} >
                    <Button 
                        color="primary"
                        variant="contained"
                    >
                        Добавить тест
                    </Button>
                </Box>
            </Box>
            <Box 
                sx={{
                    mt: 3
                }}
            >
                <Card>
                    <CardContent>
                        <Box sx={{
                            maxWidth: 500
                        }}>
                            <TextField 
                                fullWidth
                                helperText='Поиск по названию'
                                label="Введите название теста"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position='start'>
                                            <SearchIcon />
                                        </InputAdornment>
                                    )
                                }}
                            >

                            </TextField>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    )
}

export default CardTestsToolbar;