import {
    Card, CardContent, Container
} from '@mui/material';

function ListCards({props}) {
    return (
        <Container>
            {
                props && props.map((item, index) => {
                    return (
                        <Card
                            key={index}
                            variant="outlined"
                            sx={{
                                marginBottom: "1em"
                            }}
                        >
                            <CardContent sx={{
                                display: 'flex',
                                justifyContent: "space-between"
                            }}>
                                {
                                    Object.values(item).map((value, index) => {
                                        return (
                                            <div className='cathedra_item' key={index}>
                                                {value}
                                            </div>
                                        )
                                    })
                                }
                            </CardContent>
                        </Card>
                    )
                })
            }
        </Container>
    )
}

export default ListCards;