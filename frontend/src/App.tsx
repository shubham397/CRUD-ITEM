import React, { useEffect, useState } from "react";
import { Typography, AppBar, Toolbar, Button } from "@mui/material";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./components/Protected";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { logout, getToken } from "./api/authAPI";

const App: React.FC = () => {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (getToken()) {
      setIsLogin(true);
      // window.location.href = "/dashboard";
    }
  }, []);

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography
            onClick={() => {
              window.location.href = "/";
              logout();
            }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: "pointer" }}
          >
            My App
          </Typography>
          {isLogin ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  window.location.href = "/";
                  logout();
                }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Login
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  window.location.href = "/register";
                }}
              >
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />} />
      </Routes>
    </Router>
  );
};

export default App;
