import {
    Box, Container
} from '@mui/material';
import CardItemsList from '../../components/cards/CardItemsList';
import CardListToolbar from '../../components/cards/CardListToolbar';

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
                <CardListToolbar />
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