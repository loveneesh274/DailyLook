import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@services/api';
import { API_ENDPOINTS } from '@constants/API_ENDPOINTS';

export const fetchGaps = createAsyncThunk('gaps/fetch', async (_, { rejectWithValue }) => {
  try {
    const resp = await apiClient.get(API_ENDPOINTS.GAPS.BASE);
    return resp.data;
  } catch (err) {
    return rejectWithValue(err.response?.data?.detail || 'Failed to fetch gaps');
  }
});

const gapSlice = createSlice({
  name: 'gaps',
  initialState: { gaps: [], generatedAt: null, loading: false, error: null },
  reducers: {
    clearGaps: (state) => { state.gaps = []; state.generatedAt = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGaps.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchGaps.fulfilled, (state, action) => {
        state.loading = false;
        state.gaps = action.payload.gaps || [];
        state.generatedAt = action.payload.generated_at;
      })
      .addCase(fetchGaps.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      });
  },
});

export const { clearGaps } = gapSlice.actions;
export default gapSlice.reducer;
