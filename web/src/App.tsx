import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { parseCookies } from "nookies";
import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { EventList } from "./components/EventList";
import Login from "./components/Login";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976d2",
    },
  },
});

const App: React.FC = () => {
  const isAuthenticated = !!parseCookies().token;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/events" /> : <Login />}
          />
          <Route
            path="/events"
            element={isAuthenticated ? <EventList /> : <Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
