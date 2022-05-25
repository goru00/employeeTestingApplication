import { Box, Divider, Drawer, useMediaQuery } from "@mui/material";
import DashboardIcon from '@mui/icons-material/Dashboard';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SafetyDividerIcon from '@mui/icons-material/SafetyDivider';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

import { Link } from "react-router-dom";

import Logo from '../../../assets/images/logoText.png';
import SidebarLink from "./sidebarLink";

const sidebarLinks = [
    {   
        href: '/',
        icon: (<DashboardIcon fontSize="small" />),
        title: "Главная"
    },
    {
        href: "/profile",
        icon: (<PersonIcon fontSize="small" />),
        title: "Профиль"
    },
    {
        href: "/users",
        icon: (<PeopleAltIcon fontSize="small" />),
        title: "Список пользователей"
    },
    {
        href: "/tests",
        icon: (<HomeWorkIcon fontSize="small" />),
        title: "Тесты"   
    },
    {
        href: "/results",
        icon: (<SafetyDividerIcon fontSize="small" />),
        title: "Рейтинг"
    },
    {
        href: "/university/cathedras",
        icon: (<SchoolIcon fontSize="small" />),
        title: "Университет"
    },
    {
        href: "/settings",
        icon: (<SettingsIcon fontSize="small" />),
        title: "Настройки"
    },
    {
        href: "/logout",
        icon: (<LogoutIcon fontSize="small" />),
        title: "Выход"
    }
]

const Sidebar = (props) => {
    const { open, onClose } = props;
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false
    });
    const contentSidebar = (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%"
                }}
            >
                <div>
                    <Box
                        sx={{ p: 3}}
                    >
                        <Link to="/">
                            <img 
                                src={Logo} 
                                width={42}
                                height={42}
                                alt="Филиал Котельники Университета Дубна Логотип"
                            />
                        </Link>
                    </Box>
                </div>
                <Divider 
                    sx={{
                        borderColor: "#2D3748",
                        my: 3
                    }}
                />
                <Box sx={{
                    flexGrow: 1
                }}
                >
                    {sidebarLinks.map((sidebarLink) => (
                        <SidebarLink 
                            key={sidebarLink.title}
                            icon={sidebarLink.icon}
                            href={sidebarLink.href}
                            title={sidebarLink.title}
                        />
                    ))}
                </Box>
                <Divider sx={{
                    borderColor: "#2D3748"
                }} />
            </Box>
        </>
    )
    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: "neutral.900",
                        color: "#fff",
                        width: 280
                    }
                }}
                variant="permanent"
            >
                { contentSidebar }
            </Drawer>
        )
    }
    return (
        <Drawer 
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: "neutral.900",
                    color: "#fff",
                    width: 280
                }
            }}
            sx={{
                zIndex: (theme) => theme.zIndex.appBar + 100
            }}
            variant="temporary"
        >
            { contentSidebar }
        </Drawer>
    );
}

export default Sidebar;