import { 
    Box, 
    Container, 
    Typography,
    Stack,
} from '@mui/material';
import { Outlet } from 'react-router-dom';

const University = (props) => {
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
                        Подразделения университета
                    </Typography>
                </Stack>
                <Outlet />
            </Container>
        </Box>
    )
}

export default University;