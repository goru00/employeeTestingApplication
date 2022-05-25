import { useState } from 'react';
import {
    Modal,
    Box
} from '@mui/material';

import { useDispatch } from 'react-redux';

import useMessage from './useMessage';

import { clearMessage } from '../actions/message';

const style = {
    position: 'absolute',
    top: '50%',
    height: 820,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: 620,
    maxWidth: 460,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: 'scroll',
    pt: 2,
    px: 4,
    pb: 3
  };

const useModal = (children) => {
    const dispatch = useDispatch();
    const [message] = useMessage();

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        dispatch(clearMessage());
        setOpen(false);
    }

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