export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: '/api/v1/auth/register',
    LOGIN: '/api/v1/auth/login',
    ME: '/api/v1/auth/me',
  },
  GARMENTS: {
    BASE: '/api/v1/garments',
    BY_ID: (id) => `/api/v1/garments/${id}`,
  },
  RECOMMENDATIONS: {
    BASE: '/api/v1/recommendations',
  },
  FEEDBACK: {
    BASE: '/api/v1/feedback',
  },
  GAPS: {
    BASE: '/api/v1/gaps',
  },
  MEDIA: {
    UPLOAD: '/api/v1/media/upload',
  },
};
