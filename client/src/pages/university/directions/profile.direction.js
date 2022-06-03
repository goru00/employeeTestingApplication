import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Grid,
    Card,
    CardHeader,
    Divider,
    CardContent,
    Box,
    Stack
} from '@mui/material';
import directionServices from '../../../services/university.services/direction.services';
import GetGroups from '../../../components/actions/universityActions/getGroups';
import CreateGroup from '../../../components/actions/universityActions/createGroup';

function DirectionProfile() {
    let params = useParams();

    const [direction, setDirection] = useState();

    useEffect(() => {
        directionServices.getDirection(params.cathedraId, params.directionId).then(res => {
            setDirection(res.data);
        })
    }, [params.id]);

    return (
        <Card>
            {
                direction && (
                    <>
                        <CardHeader 
                            subheader="Раздел просмотра и редактирования направления"
                            title={`Направление: ${direction.name}`}
                        />
                        <Divider />
                        <CardContent>
                            <Box
                                sx={{
                                    flexGrow: 1
                                }}
                            >
                                <Grid
                                    container
                                    spacing={2}
                                >
                                    <Card>
                                        <Stack
                                            direction="row"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >
                                            <CardHeader 
                                                subheader="Список групп"
                                                title="Группы"
                                            />
                                            <CreateGroup props={{
                                                directionId: params.directionId
                                            }}/>
                                        </Stack>
                                        <Divider />
                                        <CardContent>
                                            <GetGroups />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Box>
                        </CardContent>
                    </>
                )
            }
        </Card>
    )
}

export default DirectionProfile;