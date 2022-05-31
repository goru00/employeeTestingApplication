import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Container,
    Card,
    CardHeader
} from '@mui/material';

function DirectionProfile() {
    let params = useParams();

    const [groups, setGroups] = useState([]);


    console.log(params)

    return (
        <Card>
            
        </Card>
    )
}

export default DirectionProfile;