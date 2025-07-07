// theme.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

let theme = createTheme({
  typography: {
    fontFamily: `'Roboto', 'Arial', sans-serif`,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
      p:2
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      lineHeight: 1.25,
      p:2
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.3,
      p:2
    },
    h4: {
      fontSize: '1.75rem',
      fontWeight: 500,
      p:2
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      p:2
    },
    h6: {
      fontSize: '1.25rem',
      fontWeight: 500,
      p:2
    },

    subtitle1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: grey[700],
      p:2
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
