import { useEffect, useState } from "react";
import useLoading from '../../../hooks/useLoading';
import { useParams } from "react-router-dom";

import disciplineServices from "../../../services/university.services/discipline.services";
import ListItemTable from "../../cards/ListItemTable";
import { Typography } from "@mui/material";

const headers = [
    "Код",
    "Наименование"
]

function GetDisciplinesOfTheGroup({props}) {
    const { targetGroup } = props;
    let params = useParams();
    const [disciplines, setDisciplines] = useState([]);
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();

    useEffect(() => {
        handleLoadingStart();
        disciplineServices.getDisciplinesOfTheGroup(targetGroup).then(res => {
            let newDisciplines = [...disciplines];
            if (res.data.disciplines) {
                res.data.disciplines.forEach((discipline) => {
                    newDisciplines.push({
                        id: discipline.id,
                        name: discipline.name
                    });
                });
                setDisciplines(newDisciplines);
            }
            handleLoadingStop();
        });
    }, []);

    return (
        <div className="show_disciplines">
            {
                !loading ? (
                    disciplines.length ? (
                        <ListItemTable 
                            props={{
                                body: disciplines, 
                                headers: headers
                            }}
                        />
                    ) : (
                        <Typography
                            variant="h6"
                            gutterBottom
                            textAlign="center"
                            color="text.secondary"
                        >
                            По данной группе не было определено ни одной дисциплины
                        </Typography>
                    )
                ) : LoadAnimation
            }
        </div>
    )
}

export default GetDisciplinesOfTheGroup;