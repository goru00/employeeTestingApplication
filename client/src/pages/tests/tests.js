import {
    Box, Container
} from '@mui/material';
import CardItemsList from '../../components/tests/cards/CardTestsList';
import CardTestsToolbar from '../../components/tests/cards/CardTestsToolbar';

const Tests = (props) => {
    return (
        <Box 
            component="main"
            sx={{
                flexGrow: 1,
                py: 8
            }}
        >
            <Container 
                maxWidth={false}
            >
                <CardTestsToolbar />
                <Box 
                    sx={{
                        mt: 3
                    }}
                >
                    <CardItemsList />
                </Box>
            </Container>
        </Box>
    )
}

export default Tests;