import { useEffect, useState } from "react";
import directionServices from "../../../services/university.services/direction.services";

import {
    Typography 
} from '@mui/material';
import useLoading from "../../../hooks/useLoading";
import ListItemTable from "../../cards/ListItemTable";

import { useLocation, useParams } from "react-router-dom";

const headers = [
    "Код",
    "Наименование"
];

function GetDirections(props) {
    let params = useParams();
    const [directions, setDirections] = useState([]);
    const [linkDirections, setLinkDirections] = useState([]);
    const location = useLocation();
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    useEffect(() => {
        handleLoadingStart();
        directionServices.getDirections(params.id).then(res => {
            let newDirections = [...directions];
            let newLinkDirections = [...linkDirections];
            if (res.data.directions) {
                res.data.directions.forEach((value) => {
                    newDirections.push({
                        id: value.id,
                        name: value.name
                    });
                    newLinkDirections.push(`${location.pathname}/directions/${value.id}`);
                });
                setDirections(newDirections);
                setLinkDirections(newLinkDirections);
            }
            handleLoadingStop();
        });
    }, []);
    return (
        <div className="show_cathedras">
            {
                !loading ? (
                    linkDirections && directions !== [] ? (
                        <ListItemTable 
                            props={{
                                body: directions,
                                headers: headers,
                                links: linkDirections
                            }}
                        />
                    ) : (
                        <Typography variant="h6" gutterBottom>
                            По данной кафедре не было назначено ни одного направления
                        </Typography>
                    ) 
                ) : LoadAnimation
            }
        </div>
    )
}

export default GetDirections;