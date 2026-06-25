import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import {
  AppBar, Toolbar, Typography, IconButton, Button,
  Box, Drawer, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider, Avatar, useMediaQuery, useTheme,
} from '@mui/material';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import useAuth from '@hooks/useAuth';
import styles from './Navbar.module.scss';

const NAV_ITEMS = [
  { label: 'Daily', path: '/app/daily', icon: <AutoAwesomeIcon /> },
  { label: 'Wardrobe', path: '/app/wardrobe', icon: <CheckroomIcon /> },
  { label: 'Buy Next', path: '/app/buy-next', icon: <ShoppingBagIcon /> },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/home'); };
  const handleNav = (path) => { navigate(path); setDrawerOpen(false); };

  const drawerContent = (
    <Box className={styles.drawer}>
      <Box className={styles.drawerHeader}>
        <Typography variant="h6" fontWeight={700} sx={{ color: '#1A1A1A' }}>Daily Look</Typography>
        <Typography variant="caption" color="text.secondary">{user?.city}</Typography>
      </Box>
      <Divider />
      <List>
        {NAV_ITEMS.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNav(item.path)}
              sx={{ borderRadius: 2, mx: 1, my: 0.5 }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout} sx={{ borderRadius: 2, mx: 1 }}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0} className={styles.appBar}>
        <Toolbar>
          {isMobile && (
            <IconButton edge="start" color="inherit" onClick={() => setDrawerOpen(true)} sx={{ mr: 1 }}>
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" fontWeight={700} sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/app/daily')}>
            Daily Look
          </Typography>
          {!isMobile && (
            <Box className={styles.navLinks}>
              {NAV_ITEMS.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  startIcon={item.icon}
                  onClick={() => navigate(item.path)}
                  sx={{
                    fontWeight: location.pathname === item.path ? 700 : 400,
                    borderBottom: location.pathname === item.path ? '2px solid white' : '2px solid transparent',
                    borderRadius: 0,
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}
          <Avatar
            sx={{ width: 34, height: 34, bgcolor: 'secondary.main', ml: 2, cursor: 'pointer', fontSize: 14 }}
            onClick={!isMobile ? handleLogout : undefined}
          >
            {user?.full_name?.[0]?.toUpperCase() || 'U'}
          </Avatar>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
    </>
  );
};

export default Navbar;
