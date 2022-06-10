import { 
    Box, 
    Container, 
    Typography,
    Stack,
    Divider
} from '@mui/material';
import { Outlet, useLocation } from 'react-router-dom';

import CreateDiscipline from '../../components/actions/universityActions/createDiscipline';
import CreateCathedras from '../../components/actions/universityActions/createCathedras';
import GetCathedras from '../../components/actions/universityActions/getCathedras';
import GetDisciplines from '../../components/actions/universityActions/getDiscipline';

const University = (props) => {
    const location = useLocation();
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
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                >
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                    >
                    </Typography>
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Подразделения университета
                    </Typography>
                </Stack>
                {
                    location.pathname === "/university" ? (
                        <>
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                                <Typography variant="h5" gutterBottom>
                                    Кафедры
                                </Typography>
                                <CreateCathedras props={props} />
                            </Stack>
                            <Container>
                                <GetCathedras />
                            </Container>
                            <Stack
                                direction="row"
                                alignItems="center" 
                                justifyContent="space-between" 
                                mb={5}
                            >
                                <Typography variant="h5" gutterBottom>
                                    Список дисциплин
                                </Typography>
                                <CreateDiscipline props={props} />
                            </Stack>
                            <Container>
                                <GetDisciplines props={props} />
                            </Container>
                        </>
                    ) : <Outlet />
                }
            </Container>
        </Box>
    )
}

export default University;