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

import { useNavigate, Outlet, useLocation } from 'react-router-dom';

const CardTestsToolbar = (props) => {
    const location = useLocation();
    let navigate = useNavigate();
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
                        {
                            location.pathname === "/tests" && (
                                <Box sx={{
                                    m: 1
                                }} >
                                    <Button 
                                        color="primary"
                                        variant="contained"
                                        onClick={() => navigate('create') }
                                    >
                                        Добавить тест
                                    </Button>
                                </Box>
                            )
                        }
            </Box>
        </Box>
    )
}

export default CardTestsToolbar;