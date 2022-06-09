import { useEffect, useState } from 'react';
import disciplineServices from '../../../services/university.services/discipline.services';

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

function GetDisciplines(props) {
    let params = useParams();
    const [disciplines, setDisciplines] = useState([]);
    const [linkDisciplines, setLinkDisciplines] = useState([]);
    const location = useLocation();
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    useEffect(() => {
        handleLoadingStart();
        disciplineServices.getDisciplines().then(res => {
            let newDisciplines = [...disciplines];
            let newLinkDisceplines = [...linkDisciplines];
            if (res.data.disciplines) {
                res.data.disciplines.forEach((value) => {
                    newDisciplines.push({
                        id: value.id,
                        name: value.name
                    });
                    newLinkDisceplines.push(`${location.pathname}/disciplines/${value.id}`);
                });
                setDisciplines(newDisciplines);
                setLinkDisciplines(newLinkDisceplines);
            }
            handleLoadingStop();
        });
    }, []);
    return (
        <div className="show_cathedras">
            {
                !loading ? (
                    disciplines.length ? (
                        <ListItemTable 
                            props={{
                                body: disciplines,
                                headers: headers,
                                links: linkDisciplines
                            }}
                        />
                    ) : (
                        <Typography variant="h6" gutterBottom>
                            Не было назначено ни одной дисциплины
                        </Typography>
                    ) 
                ) : LoadAnimation
            }
        </div>
    )
}

export default GetDisciplines;