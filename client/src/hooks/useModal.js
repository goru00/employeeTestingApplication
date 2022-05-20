import { useState } from 'react';
import {
    Modal,
    Box
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 4,
  };

const useModal = (children) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const content = (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={style}
            >
                {children}
            </Box>
        </Modal>
    )
    return {
        content,
        open,
        handleOpen,
        handleClose
    }
}

export default useModal;