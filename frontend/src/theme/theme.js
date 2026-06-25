import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1A1A1A',
      light: '#333333',
      dark: '#000000',
      contrastText: '#fff',
    },
    secondary: {
      main: '#D4A574',
      light: '#E8C9A8',
      dark: '#B8956A',
      contrastText: '#1A1A1A',
    },
    background: {
      default: '#FBF9F7',
      paper: '#FFFFFF',
      cream: '#F5F0EB',
      warm: '#EDE5DC',
    },
    success: { main: '#4CAF50' },
    error: { main: '#E53935' },
    text: {
      primary: '#1A1A1A',
      secondary: '#6B6B6B',
      muted: '#9B9B9B',
    },
    accent: {
      gold: '#D4A574',
      brown: '#8B7355',
      cream: '#F5F0EB',
      peach: '#FFEEE4',
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontWeight: 700, letterSpacing: '-0.01em' },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 600 },
    h6: { fontWeight: 600 },
    subtitle1: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 50,
          padding: '12px 28px',
          fontSize: '0.95rem',
        },
        containedPrimary: {
          background: '#1A1A1A',
          boxShadow: 'none',
          '&:hover': { 
            background: '#333333',
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)' 
          },
        },
        outlinedPrimary: {
          borderColor: '#1A1A1A',
          borderWidth: 2,
          '&:hover': { 
            borderWidth: 2,
            background: 'rgba(26,26,26,0.04)' 
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: { borderRadius: 50 },
      },
    },
  },
});

export default theme;
