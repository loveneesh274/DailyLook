import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { fetchMe } from '@store/authSlice';
import useAuth from '@hooks/useAuth';
import MainLayout from '@components/layout/MainLayout/MainLayout';
import LandingPage from '@pages/Landing/LandingPage';
import LoginPage from '@pages/Auth/LoginPage';
import RegisterPage from '@pages/Auth/RegisterPage';
import WardrobePage from '@pages/Wardrobe/WardrobePage';
import AddGarmentPage from '@pages/Wardrobe/AddGarmentPage';
import DailyPage from '@pages/Daily/DailyPage';
import BuyNextPage from '@pages/BuyNext/BuyNextPage';
import LoadingSpinner from '@components/common/LoadingSpinner/LoadingSpinner';

const ProtectedRoute = ({ children, isReady, user }) => {
  if (!isReady) return <LoadingSpinner fullScreen />;
  if (!user) return <Navigate to="/home" replace />;
  return children;
};

const PublicRoute = ({ children, isReady, user }) => {
  if (!isReady) return <LoadingSpinner fullScreen />;
  if (user) return <Navigate to="/app/daily" replace />;
  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('sm_token');
    if (token) {
      dispatch(fetchMe()).finally(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, [dispatch]);

  if (!isReady) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - Landing, Login, Register */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<PublicRoute isReady={isReady} user={user}><LandingPage /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute isReady={isReady} user={user}><LoginPage /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute isReady={isReady} user={user}><RegisterPage /></PublicRoute>} />
        
        {/* Protected routes - App */}
        <Route
          path="/app"
          element={
            <ProtectedRoute isReady={isReady} user={user}>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/daily" replace />} />
          <Route path="daily" element={<DailyPage />} />
          <Route path="wardrobe" element={<WardrobePage />} />
          <Route path="wardrobe/add" element={<AddGarmentPage />} />
          <Route path="buy-next" element={<BuyNextPage />} />
        </Route>
        
        {/* Legacy redirects */}
        <Route path="/daily" element={<Navigate to="/app/daily" replace />} />
        <Route path="/wardrobe" element={<Navigate to="/app/wardrobe" replace />} />
        <Route path="/buy-next" element={<Navigate to="/app/buy-next" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
