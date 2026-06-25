import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Box, Card, CardContent, Typography, TextField,
  Button, Alert, Stack, MenuItem, IconButton,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { registerUser } from '@store/authSlice';
import useAuth from '@hooks/useAuth';
import styles from './RegisterPage.module.scss';

const INDIA_CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai',
  'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Surat', 'Kanpur', 'Nagpur', 'Indore', 'Bhopal',
];

const schema = yup.object({
  full_name: yup.string().min(2, 'Enter your name').required('Name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().min(6, 'Minimum 6 characters').required('Password is required'),
  city: yup.string().required('Select your city'),
});

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, clearError } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { city: 'Mumbai' },
  });

  useEffect(() => {
    if (user) navigate('/app/daily', { replace: true });
    return () => clearError();
  }, [user, navigate, clearError]);

  const onSubmit = (data) => dispatch(registerUser(data));

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
            Set up your AI wardrobe assistant
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }} onClose={clearError}>{error}</Alert>}

          <Stack component="form" onSubmit={handleSubmit(onSubmit)} spacing={2}>
            <TextField
              label="Full Name"
              fullWidth
              {...register('full_name')}
              error={!!errors.full_name}
              helperText={errors.full_name?.message}
            />
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
            <TextField
              select
              label="Your City"
              fullWidth
              defaultValue="Mumbai"
              {...register('city')}
              error={!!errors.city}
              helperText={errors.city?.message || 'Used for live weather suggestions'}
            >
              {INDIA_CITIES.map((city) => (
                <MenuItem key={city} value={city}>{city}</MenuItem>
              ))}
            </TextField>
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading}>
              {loading ? 'Creating account…' : 'Create Account'}
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary" textAlign="center" mt={2}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#D4A574', fontWeight: 600 }}>Sign in</Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RegisterPage;
