import {
    CREATE_CATHEDRA_SUCCESS,
    CREATE_CATHEDRA_FAILED,
    SET_MESSAGE
} from '../types';

import CathedraServices from "../../services/university.services/cathedra.services"

export const create = (name) => (dispatch) => {
    return CathedraServices.createCathedra(name).then((response) => {
        dispatch({
            type: CREATE_CATHEDRA_SUCCESS 
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
            type: CREATE_CATHEDRA_FAILED
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}