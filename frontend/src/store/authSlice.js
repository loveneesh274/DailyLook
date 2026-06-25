import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@services/api';
import { API_ENDPOINTS } from '@constants/API_ENDPOINTS';

export const registerUser = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
  try {
    const resp = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, data);
    localStorage.setItem('sm_token', resp.data.access_token);
    const me = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return me.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Registration failed');
  }
});

export const loginUser = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => {
  try {
    const resp = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, data);
    localStorage.setItem('sm_token', resp.data.access_token);
    const me = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return me.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Login failed');
  }
});

export const fetchMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
  try {
    const resp = await apiClient.get(API_ENDPOINTS.AUTH.ME);
    return resp.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Session expired');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, loading: false, error: null, initialized: false },
  reducers: {
    logout: (state) => {
      localStorage.removeItem('sm_token');
      state.user = null;
      state.error = null;
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    const pending = (state) => { state.loading = true; state.error = null; };
    const rejected = (state, action) => { state.loading = false; state.error = action.payload; };

    builder
      .addCase(registerUser.pending, pending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false; state.user = action.payload; state.initialized = true;
      })
      .addCase(registerUser.rejected, rejected)
      .addCase(loginUser.pending, pending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; state.user = action.payload; state.initialized = true;
      })
      .addCase(loginUser.rejected, rejected)
      .addCase(fetchMe.pending, (state) => { state.loading = true; })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loading = false; state.user = action.payload; state.initialized = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.loading = false; state.initialized = true; state.user = null;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
