import React from 'react';
import { Outlet } from 'react-router';
import { Box } from '@mui/material';
import Navbar from '@components/common/Navbar/Navbar';
import styles from './MainLayout.module.scss';

const MainLayout = () => (
  <Box className={styles.root}>
    <Navbar />
    <Box component="main" className={styles.content}>
      <Outlet />
    </Box>
  </Box>
);

export default MainLayout;
