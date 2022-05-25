import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
    Card,
    CardHeader,
    CardContent,
    Grid,
    Container,
    Stack,
    Typography,
    Box,
    Divider,
    ListItem,
    ListItemButton,
    ListItemText
} from '@mui/material';
import cathedraServices from '../../../services/university.services/cathedra.services';
import directionServices from '../../../services/university.services/direction.services';


function CathedraProfile() {
    let params = useParams();
    const [cathedra, setCathedra] = useState();
    const [directions, setDirections] = useState();

    useEffect(() => {
        cathedraServices.getCathedras(params.id).then(res => {
            setCathedra(res.data.cathedra);
        });
        if (cathedra) {
            directionServices.getDirections(cathedra.id).then(res => {
                setDirections(res.data); 
                console.log(directions)       
            })
        }
    }, [params.id]);

    useEffect(() => {
        directionServices.getDirections(params.id).then(res => {
            setDirections(res.data.directions);
            console.log(directions)
        });
    }, []);

    return (
        <Card>
        {
            cathedra && (
                <>
                    <CardHeader 
                        subheader="Раздел просмотра и редактирования кафедры"
                        title={"Кафедра: " + cathedra.name}
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item={true}
                                lg={8}
                                md={8}
                                xl={9}
                                xs={12}
                            >
                                <Card>
                                    <CardHeader 
                                        subheader="Список направлений"
                                        title="Направления"
                                    />
                                    <Divider />
                                    <CardContent>
                                        <Box
                                            sx={{
                                                width: "100%",
                                                maxWidth: 360,
                                                bgColor: 'background.paper'
                                            }}
                                        >
                                            {
                                                !directions ? (
                                                    <ListItem
                                                        component="div"
                                                        disablePadding
                                                    >
                                                        <ListItemButton>
                                                            <ListItemText>

                                                            </ListItemText>
                                                        </ListItemButton>
                                                    </ListItem>
                                                    ) : (
                                                        <Typography variant="h6" gutterBottom>
                                                            По данной кафедре не было назначено ни одного направления
                                                        </Typography>
                                                    )
                                            }
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </CardContent>
                </>
            )
        }
        </Card>
    )
}

export default CathedraProfile;