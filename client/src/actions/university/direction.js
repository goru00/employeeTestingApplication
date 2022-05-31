import {
    CREATE_DIRECTION_SUCCESS,
    CREATE_DIRECTION_FAILED,
    SET_MESSAGE
} from '../types';

import directionServices from "../../services/university.services/direction.services";

export const create = (id, name, cathedraId) => (dispatch) => {
    return directionServices.createDirection(id, name, cathedraId).then((response) => {
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