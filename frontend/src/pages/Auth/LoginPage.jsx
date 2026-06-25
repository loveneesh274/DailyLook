import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Box, Card, CardContent, Typography, TextField, Button, Alert, Stack, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { loginUser } from '@store/authSlice';
import useAuth from '@hooks/useAuth';
import styles from './LoginPage.module.scss';

const schema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, clearError } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (user) navigate('/app/daily', { replace: true });
    return () => clearError();
  }, [user, navigate, clearError]);

  const onSubmit = (data) => dispatch(loginUser(data));

  return (
    <Box className={styles.root}>
      <IconButton 
        className={styles.backBtn} 
        onClick={() => navigate('/home')}
        sx={{ position: 'absolute', top: 24, left: 24, color: 'white' }}
      >
        <ArrowBack />
      </IconButton>
      <Card className={styles.card} elevation={0}>
        <CardContent className={styles.content}>
          <Typography variant="h4" fontWeight={700} mb={0.5} sx={{ color: '#1A1A1A' }}>Daily Look</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>
            From closet chaos to calm.
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>{error}</Alert>}

          <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register('email')}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register('password')}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
              {loading ? 'Signing in…' : 'Sign In'}
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#D4A574', fontWeight: 600 }}>Register</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
