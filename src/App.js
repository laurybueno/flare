import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WebcamTuner from './components/WebcamTuner'
import './App.css';

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#92374d",
    },
    primary: {
      main: "#C1B2AB",
    },
    secondary: {
      main: "#4A5899",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <WebcamTuner />
    </ThemeProvider>
  );
}

export default App;
