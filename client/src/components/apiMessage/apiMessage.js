import { Snackbar, Alert } from "@mui/material";
import useModal from "../../hooks/useModal";

const ApiMessage = (message) => {
    const [open, handleOpen, handleClose] = useModal();
    console.log(message)
    return (
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity="error"
                sx={{ width: '100%' }}
            >
                {message.data.message}
            </Alert>
        </Snackbar>
    )
}

export default ApiMessage;