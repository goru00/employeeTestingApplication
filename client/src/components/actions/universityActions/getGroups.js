import { useEffect, useState } from 'react';
import useLoading from '../../../hooks/useLoading';
import { useLocation, useParams } from 'react-router-dom';
import groupServices from '../../../services/university.services/group.services';
import ListItemTable from '../../cards/ListItemTable';

import {
    Typography
} from '@mui/material';

const headers = [
    "Код группы"
];

function GetGroups(props) {
    let params = useParams();
    const [groups, setGroups] = useState([]);
    const location = useLocation();
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();

    useEffect(() => {
        handleLoadingStart();
        groupServices.getGroupsOfTheDirection(params.cathedraId, params.directionId).then(res => {
            let newGroups = [...groups];
            if (res.data.groups) {
                res.data.groups.forEach((group) => {
                    newGroups.push({
                        id: group.id
                    })
                })
                console.log(res.data)
            }
            setGroups(newGroups);
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
                                headers: headers
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