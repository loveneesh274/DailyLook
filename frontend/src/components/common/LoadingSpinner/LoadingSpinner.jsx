import React from 'react';
import PropTypes from 'prop-types';
import { Box, CircularProgress, Typography } from '@mui/material';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = ({ fullScreen, message }) => {
  if (fullScreen) {
    return (
      <Box className={styles.fullScreen}>
        <CircularProgress size={48} thickness={4} />
        {message && <Typography variant="body2" color="text.secondary" mt={2}>{message}</Typography>}
      </Box>
    );
  }

  return (
    <Box className={styles.inline}>
      <CircularProgress size={32} thickness={4} />
      {message && <Typography variant="body2" color="text.secondary" ml={1}>{message}</Typography>}
    </Box>
  );
};

LoadingSpinner.propTypes = {
  fullScreen: PropTypes.bool,
  message: PropTypes.string,
};

export default LoadingSpinner;
