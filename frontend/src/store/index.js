import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@store/authSlice';
import garmentReducer from '@store/garmentSlice';
import recommendationReducer from '@store/recommendationSlice';
import gapReducer from '@store/gapSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    garments: garmentReducer,
    recommendations: recommendationReducer,
    gaps: gapReducer,
  },
});

export default store;
