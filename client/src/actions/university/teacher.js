import {
    CREATE_TEACHER_SUCCESS,
    CREATE_TEACHER_FAILED,
    SET_MESSAGE
} from '../types';

import teacherServices from "../../services/university.services/teacher.services";

export const create = (userId, cathedraId) => (dispatch) => {
    return teacherServices.createTeacherOfTheCathedra(userId, cathedraId).then((response) => {
        dispatch({
            type: CREATE_TEACHER_SUCCESS
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
            type: CREATE_TEACHER_FAILED
        });

        dispatch({
            type: SET_MESSAGE,
            payload: message
        });
        return Promise.reject();
    });
}