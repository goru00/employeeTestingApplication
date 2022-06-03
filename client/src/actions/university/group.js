import {
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAILED,
    SET_MESSAGE
} from '../types';

import groupServices from '../../services/university.services/group.services';

export const create = (id, directionId) => (dispatch) => {
    return groupServices.createGroup(id, directionId).then((response) => {
        dispatch({
            type: CREATE_GROUP_SUCCESS
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
            type: CREATE_GROUP_FAILED
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}