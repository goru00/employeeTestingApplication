import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import logo from '../../assets/images/logoText.png';
import { Grid, ImageListItem, ImageList } from '@mui/material';

function Logo() {
    return (
        <Box 
            sx={{ my: 3}}
        >
                    <Typography
                        color="textPrimary"
                        variant="h5"
                        align='center'
                    >
                        Филиал
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                        align='center'
                    >
                        Котельники
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h5"
                        align='center'
                    >
                        Государственного Университета "Дубна"
                    </Typography>
        </Box>
    )
}

export default Logo;