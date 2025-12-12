import { useState } from "react";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    Typography,
    Divider,
    Avatar,
    useTheme,
    useMediaQuery,
    CircularProgress,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { useLogoutMutation } from "../app/apiSlice";
import { useNavigate } from "react-router-dom";

const drawerWidth = 260;

const Sidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [logout, { isLoading }] = useLogoutMutation();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Products", icon: <InventoryIcon />, path: "/products" },
        { text: "Profile", icon: <PersonIcon />, path: "/profile" },
        { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    ];

    const drawerContent = (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                bgcolor: "primary.main",
                color: "white",
            }}
        >

            <Box
                sx={{
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    CRUD
                </Typography>
                {isMobile && (
                    <IconButton onClick={handleDrawerToggle} sx={{ color: "white" }}>
                        <ChevronLeftIcon />
                    </IconButton>
                )}
            </Box>

            <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }} />


            <Box sx={{ p: 2.5, display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                    sx={{
                        width: 48,
                        height: 48,
                        bgcolor: "secondary.main",
                        fontSize: "1.25rem",
                    }}
                >
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <Box sx={{ overflow: "hidden" }}>
                    <Typography variant="subtitle1" fontWeight="medium" noWrap>
                        {user?.name || "User"}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{ opacity: 0.8, display: "block" }}
                        noWrap
                    >
                        {user?.email || "user@example.com"}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }} />


            <List sx={{ flexGrow: 1, pt: 2 }}>
                {menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ px: 1.5, mb: 0.5 }}>
                        <ListItemButton
                            sx={{
                                borderRadius: 2,
                                color: "white",
                                "&:hover": {
                                    bgcolor: "rgba(255, 255, 255, 0.1)",
                                },
                                "&.Mui-selected": {
                                    bgcolor: "rgba(255, 255, 255, 0.15)",
                                    "&:hover": {
                                        bgcolor: "rgba(255, 255, 255, 0.2)",
                                    },
                                },
                            }}
                            selected={window.location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.12)" }} />


            <List sx={{ pb: 2 }}>
                <ListItem disablePadding sx={{ px: 1.5 }}>
                    <ListItemButton
                        onClick={handleLogout}
                        disabled={isLoading}
                        sx={{
                            borderRadius: 2,
                            color: "white",
                            "&:hover": {
                                bgcolor: "rgba(255, 255, 255, 0.1)",
                            },
                            "&.Mui-disabled": {
                                color: "rgba(255, 255, 255, 0.5)",
                            },
                        }}
                    >
                        <ListItemIcon sx={{ color: "white", minWidth: 40 }}>
                            {isLoading ? <CircularProgress size={20} sx={{ color: "white" }} /> : <LogoutIcon />}
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>

            {isMobile && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{
                        position: "fixed",
                        top: 16,
                        left: 16,
                        zIndex: theme.zIndex.drawer + 1,
                        bgcolor: "primary.main",
                        color: "white",
                        "&:hover": {
                            bgcolor: "primary.dark",
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}


            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        border: "none",
                    },
                }}
            >
                {drawerContent}
            </Drawer>


            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    width: drawerWidth,
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: drawerWidth,
                        boxSizing: "border-box",
                        border: "none",
                    },
                }}
                open
            >
                {drawerContent}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
