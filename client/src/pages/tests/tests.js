import {
    Box, Container, Typography
} from '@mui/material';
import CardItemsList from '../../components/tests/cards/CardTestsList';
import CardTestsToolbar from '../../components/tests/cards/CardTestsToolbar';
import CreateTest from '../../components/actions/testActions/createTest';

import { useLocation } from 'react-router-dom';

const Tests = (props) => {
    let location = useLocation();
    console.log(location.pathname)
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
                {
                    location.pathname === "/tests" ? (
                        <Box 
                            sx={{
                                mt: 3
                            }}
                        >
                            <CardTestsToolbar />
                            <CardItemsList />
                        </Box>
                    ) : (
                        <CreateTest />
                    )
                }
            </Container>
        </Box>
    )
}

export default Tests;