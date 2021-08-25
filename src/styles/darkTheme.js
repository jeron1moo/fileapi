import { createTheme } from '@material-ui/core/styles';

export default createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#26292C',
      light: 'rgb(81, 91, 95)',
      dark: '#3B4045',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#FFB74D',
      light: 'rgb(255, 197, 112)',
      dark: 'rgb(200, 147, 89)',
      contrastText: 'rgba(0, 0, 0, 0.87)',
    },
    background: {
      default: '#303030',
      paper: '#424242',
    },
    error: {
      main: '#e57373',
      light: '#f6a5c0',
    },
  },
});
