import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import React from "react";
import { EventList } from "./components/EventList";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <EventList />
    </ThemeProvider>
  );
};

export default App;
