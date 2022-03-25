import {
    Box, 
    Button,
    Card,
    CardContent,
    TextField,
    InputAdornment,
    Typography
} from '@mui/material';

const CardListToolbar = (props) => {
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
        </Box>
    )
}

export default CardListToolbar;