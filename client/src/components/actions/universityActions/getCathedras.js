import { useEffect, useState } from "react";
import cathedraServices from "../../../services/university.services/cathedra.services";

import {
    Card,
    CardContent,
    Typography 
} from '@mui/material';
import useLoading from "../../../hooks/useLoading";
import ListCards from "../../cards/ListCards";

import { Link, useLocation } from "react-router-dom";

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

function GetCathedras(props) {
    const [cathedras, setCathedras] = useState(null);
    const location = useLocation();
    const {loading, handleLoadingStop, handleLoadingStart, LoadAnimation} = useLoading();
    useEffect(() => {
        handleLoadingStart();
        cathedraServices.getCathedras().then(res => {
            if (res.data) {
                let data = [];
                res.data.cathedras.forEach(cathedra => {
                    data.push({
                        id: (
                            <Typography
                                sx={{
                                    marginTop: "0.5em"
                                }}
                            >
                                {cathedra.id}
                            </Typography>
                        ),
                        name: (
                            <Typography
                                sx={{
                                    marginTop: "0.5em"
                                }}
                            >
                                {cathedra.name}
                            </Typography>
                        ),
                        link: (
                            <Link to={`${cathedra.id}`}>
                                <Tooltip title="Перейти">
                                    <IconButton>
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </Tooltip>
                            </Link>
                        )
                    });
                });
                setCathedras(data);  
            }
            handleLoadingStop();
        });
    }, []);
    return (
        <div className="show_cathedras">
            {
                !loading ? (
                    cathedras != null ? (
                        <ListCards props={cathedras} />
                    ) : (
                        <Typography
                            variant="h5"
                            textAlign="center"
                        >
                            В данный момент в университете не утверждена структура
                        </Typography>
                    ) 
                ) : LoadAnimation
            }
        </div>
    )
}

export default GetCathedras;