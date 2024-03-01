import { createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    typography: {
      fontFamily: 'Padauk, Arial, sans-serif',
      engFont: 'Lato'
    },
    primary: {
      // main: '#2FBF71',
      main: '#54B435',
    },
    secondary: {
      main: '#BDBDBD'
    },
    warning: {
        main: '#ED7D3A'
    },
    success: {
        main: '#25a244'
    },
    danger: {
        main: '#EF4444'
    },
    common: {
        white: '#ffffff',
    },
    dark: {
      main: '#66666e',
      secondary: '#cccccc'
    }
  },
});

export default theme;
