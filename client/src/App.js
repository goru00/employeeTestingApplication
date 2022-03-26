import "./App.css";

import AppRouter from './routes/AppRouter';
import { theme } from './components/theme/index';

import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

function App() {

  return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRouter />
      </ThemeProvider>
  )
}

export default App;
