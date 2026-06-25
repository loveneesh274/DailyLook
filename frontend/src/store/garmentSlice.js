import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@services/api';
import { API_ENDPOINTS } from '@constants/API_ENDPOINTS';

export const fetchGarments = createAsyncThunk('garments/fetch', async (params, { rejectWithValue }) => {
  try {
    const resp = await apiClient.get(API_ENDPOINTS.GARMENTS.BASE, { params });
    return resp.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to fetch wardrobe');
  }
});

export const addGarment = createAsyncThunk('garments/add', async (data, { rejectWithValue }) => {
  try {
    const resp = await apiClient.post(API_ENDPOINTS.GARMENTS.BASE, data);
    return resp.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to add garment');
  }
});

export const updateGarment = createAsyncThunk('garments/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const resp = await apiClient.patch(API_ENDPOINTS.GARMENTS.BY_ID(id), data);
    return resp.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to update garment');
  }
});

export const removeGarment = createAsyncThunk('garments/remove', async (id, { rejectWithValue }) => {
  try {
    await apiClient.delete(API_ENDPOINTS.GARMENTS.BY_ID(id));
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to remove garment');
  }
});

const garmentSlice = createSlice({
  name: 'garments',
  initialState: { items: [], loading: false, error: null },
  reducers: {
    clearGarmentError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGarments.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchGarments.fulfilled, (state, action) => {
        state.loading = false; state.items = action.payload;
      })
      .addCase(fetchGarments.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(addGarment.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(updateGarment.fulfilled, (state, action) => {
        const idx = state.items.findIndex((g) => g.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(removeGarment.fulfilled, (state, action) => {
        state.items = state.items.filter((g) => g.id !== action.payload);
      });
  },
});

export const { clearGarmentError } = garmentSlice.actions;
export default garmentSlice.reducer;
