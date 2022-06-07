import { useEffect, useState } from 'react';
import useLoading from '../../../hooks/useLoading';
import { useLocation, useParams } from 'react-router-dom';
import groupServices from '../../../services/university.services/group.services';
import ListItemTable from '../../cards/ListItemTable';

import {
    Typography
} from '@mui/material';

const headers = [
    "Код"
];

function GetGroups({props}) {
    let params = useParams();
    const [groups, setGroups] = useState([]);
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();

    useEffect(() => {
        handleLoadingStart();
        groupServices.getGroupsOfTheDirection(params.directionId).then(res => {
            let newGroups = [...groups];
            if (res.data.groups) {
                res.data.groups.forEach((group) => {
                    newGroups.push({
                        id: group.id
                    })
                })
                setGroups(newGroups);
            }
            handleLoadingStop();
        })
    }, []);

    return (
        <div className='show_groups'>
            {
                !loading ? (
                    groups.length ? (
                        <ListItemTable 
                            props={{
                                body: groups,
                                headers: headers,
                                select: props
                            }}
                        />
                    ) : (
                        <Typography variant="h6" gutterBottom>
                            По данному направлению не было назначено ни одной группы
                        </Typography>
                    )
                ) : LoadAnimation
            }
        </div>
    )
}

export default GetGroups;