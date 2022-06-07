import {
    CREATE_STUDENT_SUCCESS,
    CREATE_STUDENT_FAILED,
    SET_MESSAGE
} from '../types';

import studentServices from '../../services/university.services/student.services';

export const create = (userId, groupId) => (dispatch) => {
    return studentServices.createStudent(userId, groupId).then((response) => {
        dispatch({
            type: CREATE_STUDENT_SUCCESS
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
            type: CREATE_STUDENT_FAILED
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}