import { CssBaseline, ThemeProvider } from '@material-ui/core';
import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import AppBar from '../../components/App/AppBar';
import Routes from './routes';

const App = () => {
  const choosedTheme = useSelector(({ theme }) => theme);
  return (
    <BrowserRouter>
      <ThemeProvider theme={choosedTheme}>
        <CssBaseline />
        <AppBar />
        <Routes />
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
