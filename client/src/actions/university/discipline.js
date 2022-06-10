import {
    CREATE_DISCIPLINE_SUCCESS,
    CREATE_DISCIPLINE_FAILED,
    SET_MESSAGE
} from '../types';

import disciplineServices from "../../services/university.services/discipline.services";

export const create = (id, name) => (dispatch) => {
    return disciplineServices.createDiscipline(id, name).then((response) => {
        dispatch({
            type: CREATE_DISCIPLINE_SUCCESS
        });

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: response.data.message,
                status: response.status
            }
        });

        return Promise.resolve();
    }, error => {
        const message = (
            error.response && 
            error.response.data &&
            error.response.data.messsage) ||
            error.message ||
            error.toString();

        dispatch({
            type: CREATE_DISCIPLINE_FAILED
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}

export const createDisciplineOfTheGroup = (disciplineId, groupId) => (dispatch) => {
    return disciplineServices.createDisciplineOfTheGroup(disciplineId, groupId).then((response) => {
        dispatch({
            type: CREATE_DISCIPLINE_SUCCESS
        });

        dispatch({
            type: SET_MESSAGE,
            payload: {
                message: response.data.message,
                status: response.status
            }
        });

        return Promise.resolve();
    }, error => {
        const message = (
            error.response && 
            error.response.data &&
            error.response.data.messsage) ||
            error.message ||
            error.toString();

        dispatch({
            type: CREATE_DISCIPLINE_FAILED
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}