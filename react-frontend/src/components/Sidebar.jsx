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
    Tooltip,
} from "@mui/material";
import {
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Inventory as InventoryIcon,
    Settings as SettingsIcon,
    Logout as LogoutIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";
import { useLogoutMutation } from "../app/apiSlice";
import { useNavigate, useLocation } from "react-router-dom";

const drawerWidth = 260;
const drawerWidthCollapsed = 72;

const Sidebar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [logout, { isLoading }] = useLogoutMutation();
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(selectCurrentUser);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleCollapse = () => {
        setCollapsed(!collapsed);
    };

    const handleLogout = async () => {
        try {
            await logout().unwrap();
            navigate("/login");
        } catch (err) {
            console.error("Logout failed:", err);
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const menuItems = [
        { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
        { text: "Products", icon: <InventoryIcon />, path: "/products" },
    ];

    const drawerContent = (isCollapsed = false) => (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                background: "linear-gradient(180deg, #018790 0%, #005461 100%)",
                color: "white",
                position: "relative",
                overflow: "hidden",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "radial-gradient(circle at 20% 50%, rgba(0, 183, 181, 0.15) 0%, transparent 50%)",
                    pointerEvents: "none",
                },
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 2.5,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: isCollapsed ? "center" : "space-between",
                    minHeight: 72,
                    position: "relative",
                }}
            >
                {!isCollapsed && (
                    <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                            background: "linear-gradient(135deg, #ffffff 0%, #00b7b5 100%)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            letterSpacing: 1.5,
                        }}
                    >
                        CRUD
                    </Typography>
                )}
                {isMobile ? (
                    <IconButton
                        onClick={handleDrawerToggle}
                        sx={{
                            color: "white",
                            transition: "transform 0.2s",
                            "&:hover": { transform: "scale(1.1)" }
                        }}
                    >
                        <ChevronLeftIcon />
                    </IconButton>
                ) : (
                    <IconButton
                        onClick={handleCollapse}
                        sx={{
                            color: "white",
                            transition: "all 0.3s",
                            "&:hover": {
                                transform: "scale(1.1)",
                                bgcolor: "rgba(255, 255, 255, 0.1)",
                            }
                        }}
                    >
                        {isCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                )}
            </Box>

            <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />

            {/* User Section */}
            {!isCollapsed ? (
                <Box
                    sx={{
                        p: 2.5,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        position: "relative",
                    }}
                >
                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            background: "linear-gradient(135deg, #00b7b5 0%, #018790 100%)",
                            fontSize: "1.25rem",
                            fontWeight: "bold",
                            border: "2px solid rgba(255, 255, 255, 0.3)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                        }}
                    >
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                    <Box sx={{ overflow: "hidden", flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight="600" noWrap>
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
            ) : (
                <Box sx={{ p: 1.5, display: "flex", justifyContent: "center" }}>
                    <Tooltip title={user?.name || "User"} placement="right">
                        <Avatar
                            sx={{
                                width: 40,
                                height: 40,
                                background: "linear-gradient(135deg, #00b7b5 0%, #018790 100%)",
                                fontSize: "1.1rem",
                                fontWeight: "bold",
                                border: "2px solid rgba(255, 255, 255, 0.3)",
                                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                            }}
                        >
                            {user?.name?.charAt(0).toUpperCase() || "U"}
                        </Avatar>
                    </Tooltip>
                </Box>
            )}

            <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />

            {/* Menu Items */}
            <List sx={{ flexGrow: 1, pt: 2, px: isCollapsed ? 1 : 1.5 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    const button = (
                        <ListItemButton
                            sx={{
                                borderRadius: 2,
                                color: "white",
                                justifyContent: isCollapsed ? "center" : "flex-start",
                                px: isCollapsed ? 1.5 : 2,
                                py: 1.5,
                                mb: 0.5,
                                position: "relative",
                                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                                "&::before": isActive ? {
                                    content: '""',
                                    position: "absolute",
                                    left: 0,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    width: 4,
                                    height: "70%",
                                    bgcolor: "#00b7b5",
                                    borderRadius: "0 4px 4px 0",
                                    boxShadow: "0 0 10px rgba(0, 183, 181, 0.5)",
                                } : {},
                                "&:hover": {
                                    bgcolor: "rgba(255, 255, 255, 0.15)",
                                    transform: "translateX(4px)",
                                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                                },
                                ...(isActive && {
                                    bgcolor: "rgba(0, 183, 181, 0.25)",
                                    boxShadow: "0 4px 12px rgba(0, 183, 181, 0.2)",
                                    "&:hover": {
                                        bgcolor: "rgba(0, 183, 181, 0.35)",
                                    },
                                }),
                            }}
                            onClick={() => handleNavigate(item.path)}
                        >
                            <ListItemIcon
                                sx={{
                                    color: "white",
                                    minWidth: isCollapsed ? "auto" : 40,
                                    justifyContent: "center",
                                    transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: "scale(1.1)",
                                    }
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            {!isCollapsed && (
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                    }}
                                />
                            )}
                        </ListItemButton>
                    );

                    return (
                        <ListItem key={item.text} disablePadding>
                            {isCollapsed ? (
                                <Tooltip title={item.text} placement="right">
                                    {button}
                                </Tooltip>
                            ) : (
                                button
                            )}
                        </ListItem>
                    );
                })}
            </List>

            <Divider sx={{ bgcolor: "rgba(255, 255, 255, 0.1)" }} />

            {/* Logout Button */}
            <List sx={{ pb: 2, px: isCollapsed ? 1 : 1.5 }}>
                <ListItem disablePadding>
                    {isCollapsed ? (
                        <Tooltip title="Logout" placement="right">
                            <ListItemButton
                                onClick={handleLogout}
                                disabled={isLoading}
                                sx={{
                                    borderRadius: 2,
                                    color: "white",
                                    justifyContent: "center",
                                    px: 1.5,
                                    py: 1.5,
                                    transition: "all 0.3s",
                                    "&:hover": {
                                        bgcolor: "rgba(244, 67, 54, 0.2)",
                                        transform: "translateX(4px)",
                                    },
                                    "&.Mui-disabled": {
                                        color: "rgba(255, 255, 255, 0.5)",
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: "white", minWidth: "auto" }}>
                                    {isLoading ? <CircularProgress size={20} sx={{ color: "white" }} /> : <LogoutIcon />}
                                </ListItemIcon>
                            </ListItemButton>
                        </Tooltip>
                    ) : (
                        <ListItemButton
                            onClick={handleLogout}
                            disabled={isLoading}
                            sx={{
                                borderRadius: 2,
                                color: "white",
                                px: 2,
                                py: 1.5,
                                transition: "all 0.3s",
                                "&:hover": {
                                    bgcolor: "rgba(244, 67, 54, 0.2)",
                                    transform: "translateX(4px)",
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
                    )}
                </ListItem>
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: "flex" }}>
            {/* Mobile Menu Button */}
            {isMobile && !mobileOpen && (
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
                        background: "linear-gradient(135deg, #018790 0%, #005461 100%)",
                        color: "white",
                        boxShadow: "0 4px 12px rgba(1, 135, 144, 0.4)",
                        transition: "all 0.3s",
                        "&:hover": {
                            background: "linear-gradient(135deg, #005461 0%, #003940 100%)",
                            transform: "scale(1.05)",
                            boxShadow: "0 6px 16px rgba(1, 135, 144, 0.5)",
                        },
                    }}
                >
                    <MenuIcon />
                </IconButton>
            )}

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                disableEnforceFocus
                sx={{
                    display: { xs: "block", md: "none" },
                    "& .MuiDrawer-paper": {
                        boxSizing: "border-box",
                        width: drawerWidth,
                        border: "none",
                    },
                }}
            >
                {drawerContent(false)}
            </Drawer>

            {/* Desktop Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    display: { xs: "none", md: "block" },
                    width: collapsed ? drawerWidthCollapsed : drawerWidth,
                    flexShrink: 0,
                    transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    "& .MuiDrawer-paper": {
                        width: collapsed ? drawerWidthCollapsed : drawerWidth,
                        boxSizing: "border-box",
                        border: "none",
                        transition: "width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        overflowX: "hidden",
                    },
                }}
                open
            >
                {drawerContent(collapsed)}
            </Drawer>
        </Box>
    );
};

export default Sidebar;
