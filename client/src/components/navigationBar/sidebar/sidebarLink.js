import { Box, Button, ListItem } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';

const SidebarLink = (props) => {
    const { href, icon, title, ...others } = props;
    const router = useLocation();
    const active = href ? (router.pathname === href) : false;
    return (
        <ListItem 
            disableGutters
            sx={{
                display: "flex",
                mb: 0.5,
                py: 0,
                px: 2
            }}
            {...others}
        >
            <NavLink 
                to={href}
                style={{
                    listStyle: "none",
                    textDecoration: "none"
                }}
            >
                <Button 
                    startIcon={icon}
                    disableRipple
                    sx={{
                        backgroundColor: active && "rgba(255,255,255, 0.08)",
                        borderRadius: 1,
                        color: active ? "secondary.main" : "neutral.300",
                        fontWeight: active && "fontWeightBold",
                        justifyContent: "flex-start",
                        px: 3,
                        textAlign: "left",
                        textTransform: "none",
                        width: "100%",
                        "& .MuiButton-startIcon": {
                            color: active ? "secondary.main" : "neutral.400",
                        },
                        "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.08)"
                        }
                    }}
                >
                    <Box 
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        {title}
                    </Box>
                </Button>
            </NavLink>
        </ListItem>
    )
}

export default SidebarLink;