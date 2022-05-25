import { useSelector } from 'react-redux';

import { Alert } from '@mui/material';

const useMessage = () => {
    const { message } = useSelector(state => state.message);

    const messageStatusStyle = (
        (message && message.status >= 400 && message.status <= 500) ? "error" : "success"
    );

    const request = message ? (
        <Alert severity={messageStatusStyle}>
            {message.message}
        </Alert>
    ) : "";

    return [request];
}

export default useMessage;