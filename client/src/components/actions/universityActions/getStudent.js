import { useEffect, useState } from "react";
import studentServices from "../../../services/university.services/student.services";

import {
    Typography 
} from '@mui/material';
import useLoading from "../../../hooks/useLoading";
import ListItemTable from "../../cards/ListItemTable";

import { useParams } from "react-router-dom";

const headers = [
    "Имя, фамилия и отчество"
];

function GetStudent({props}) {
    const { targetGroup } = props;
    const [students, setStudents] = useState([]);
    const [linkDirections, setLinkDirections] = useState([]);
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    useEffect(() => {
        handleLoadingStart();
        if (targetGroup) {
            studentServices.getStudentsOfTheGroup(targetGroup).then(res => {
                let newStudents = [...students];
                if (res.data.students) {
                    res.data.students.forEach((value) => {
                        newStudents.push({
                            name: value.name
                        });
                    });
                    setStudents(newStudents);
                }
                handleLoadingStop();
            });
        }
    }, []);
    return (
        <div className="show_students_group">
            {
                !loading ? (
                    students.length ? (
                        <ListItemTable 
                            props={{
                                body: students,
                                headers: headers,
                                links: linkDirections
                            }}
                        />
                    ) : (
                        <Typography 
                            variant="subtitle1"
                            textAlign="center" 
                            gutterBottom
                            color="text.secondary"
                        >
                            По данной группе не было определено ни одного студента
                        </Typography>
                    ) 
                ) : LoadAnimation
            }
        </div>
    )
}

export default GetStudent;