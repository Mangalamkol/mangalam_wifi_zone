import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
import PlanList from './components/PlanList';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h3" component="h1" gutterBottom>
          Mangalam Wi-Fi Zone
        </Typography>
        <PlanList />
      </Container>
    </ThemeProvider>
  );
}

export default App;
