import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import MainRoutes from './routes.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      paper: '#002E20'
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider theme={darkTheme}>
      <MainRoutes/>
      <CssBaseline enableColorScheme/>
    </ThemeProvider>
  </BrowserRouter>
)
