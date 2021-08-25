import { createTheme } from '@material-ui/core/styles';

export default createTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    background: {
      default: '#8290CE',
      paper: '#fff',
    },
    error: {
      main: '#e57373',
      light: '#f6a5c0',
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        '&$focused': {},
      },
    },
    MuiLink: {
      root: {
        cursor: 'pointer',
      },
    },
    MuiInput: {
      underline: {
        '&:after': {
          'border-bottom-color': '#1473e6',
        },
      },
    },
    MuiFormHelperText: {
      root: {
        position: 'absolute',
        bottom: '-1.2em',
      },
    },
    MuiButton: {
      root: {
        textTransform: 'none',
      },
      containedPrimary: {
        boxShadow: 'none',
        backgroundColor: '#ffc617',
        '&:focus': {
          boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
      },
    },
  },
});
