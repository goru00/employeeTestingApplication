import { useEffect, useState } from "react";
import teacherServices from "../../../services/university.services/teacher.services";

import {
    Typography 
} from '@mui/material';
import useLoading from "../../../hooks/useLoading";
import ListItemTable from "../../cards/ListItemTable";

import { useParams } from "react-router-dom";

const headers = [
    "Фамилия, имя и отчество"
]

function GetTeachers(props) {
    let params = useParams();
    const [teachers, setTeachers] = useState([]);
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    useEffect(() => {
        handleLoadingStart();
        teacherServices.getTeachersOfTheCathedra(params.id).then(res => {
            let newTeachers = [...teachers];
            if (res.data.teachers) {
                res.data.teachers.forEach((value) => {
                    newTeachers.push({
                        name: value.name
                    });
                });
                setTeachers(newTeachers);
            }
            handleLoadingStop();
        });
    }, []);
    return (
        <div className="show_cathedras">
            {
                !loading ? (
                    teachers.length ? (
                        <ListItemTable 
                            props={{
                                body: teachers,
                                headers: headers,
                            }}
                        />
                    ) : (
                        <Typography variant="h6" gutterBottom>
                            По данной кафедре не было назначено ни одного преподавателя
                        </Typography>
                    ) 
                ) : LoadAnimation
            }
        </div>
    )
}

export default GetTeachers;