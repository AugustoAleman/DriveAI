
import { createTheme } from '@mui/material';

// A custom theme for this app
const theme = createTheme({
  status: {
    wrong: '#e53e3e',
    correct: '#43AA8B',
  },
  palette: {
    primary: {
      main: '#111D4E',
    },
    secondary: {
      main: '#4251F5',
    },
    tertiary: {
      main: '#CBD0D0',
    },
    accent: {
      main: '#DE4D5A',
    },
    background: {
      default: '#FFFFFF',
    },
  },
});

export default theme;
