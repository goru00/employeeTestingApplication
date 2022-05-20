import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const useLoading = () => {
    const [loading, setLoading] = useState(false);
    const handleLoadingStop = () => setLoading(false);
    const handleLoadingStart = () => setLoading(true);

    const LoadAnimation = (
        <Box 
            sx={{
                display: 'flex'
            }}
        >
            <CircularProgress />
        </Box>
    )

    return {
        loading, 
        handleLoadingStop,
        handleLoadingStart,
        LoadAnimation
    };
}

export default useLoading;