import {
    Container,
    Stack
} from '@mui/material';

import CreateCathedras from '../../../components/actions/universityActions/createCathedras';
import GetCathedras from '../../../components/actions/universityActions/getCathedras';

function Cathedras(props) {
    return (
        <>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <CreateCathedras props={props} />
            </Stack>
            <Container>
                <GetCathedras />
            </Container>
        </>
    )
}

export default Cathedras;