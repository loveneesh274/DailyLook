import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@services/api';
import { API_ENDPOINTS } from '@constants/API_ENDPOINTS';

export const fetchRecommendations = createAsyncThunk(
  'recommendations/fetch',
  async ({ occasion }, { rejectWithValue }) => {
    try {
      const resp = await apiClient.post(API_ENDPOINTS.RECOMMENDATIONS.BASE, { occasion });
      return resp.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || 'Failed to get suggestions');
    }
  }
);

export const submitFeedback = createAsyncThunk(
  'recommendations/feedback',
  async ({ outfit_id, rating, worn_date }, { rejectWithValue }) => {
    try {
      await apiClient.post(API_ENDPOINTS.FEEDBACK.BASE, { outfit_id, rating, worn_date });
      return { outfit_id, rating };
    } catch (err) {
      return rejectWithValue(err.response?.data?.detail || 'Failed to submit feedback');
    }
  }
);

const recommendationSlice = createSlice({
  name: 'recommendations',
  initialState: { outfits: [], weather: null, loading: false, error: null, feedbackMap: {} },
  reducers: {
    clearRecommendations: (state) => { state.outfits = []; state.weather = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendations.pending, (state) => {
        state.loading = true; state.error = null; state.outfits = [];
      })
      .addCase(fetchRecommendations.fulfilled, (state, action) => {
        state.loading = false;
        state.outfits = action.payload.outfits || [];
        if (state.outfits.length > 0) {
          state.weather = state.outfits[0]?.weather_context || null;
        }
      })
      .addCase(fetchRecommendations.rejected, (state, action) => {
        state.loading = false; state.error = action.payload;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.feedbackMap[action.payload.outfit_id] = action.payload.rating;
      });
  },
});

export const { clearRecommendations } = recommendationSlice.actions;
export default recommendationSlice.reducer;
