import {
    CREATE_DIRECTION_SUCCESS,
    CREATE_DIRECTION_FAILED,
    SET_MESSAGE
} from '../types';

import sectionService from "../../services/university.services/section.services";

export const create = (name, description, disciplineId) => (dispatch) => {
    return sectionService.createSection(name, description, disciplineId).then((response) => {
        dispatch({
            type: CREATE_DIRECTION_SUCCESS
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
            type: CREATE_DIRECTION_FAILED
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}