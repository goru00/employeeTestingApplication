import { useSelector, useDispatch } from 'react-redux';

import { clearMessage } from '../actions/message';

import { Alert } from '@mui/material';

const useMessage = () => {
    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();
    const handleClearMessage = () => dispatch(clearMessage());

    const messageStatusStyle = (
        (message && message.status >= 400 && message.status <= 500) ? "error" : "success"
    );

    const request = message ? (
        <Alert severity={messageStatusStyle}>
            {message.message}
        </Alert>
    ) : "";

    return [request, handleClearMessage];
}

export default useMessage;