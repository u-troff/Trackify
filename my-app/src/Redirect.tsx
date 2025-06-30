import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Link,
  Toolbar,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { Link as Routelinker } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { Spinner } from "./Spinner/Spinner";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Sidebar from "./pages/SideBar";

const ProtectedRoute: React.FC = () => {
  const { currentUser, loading } = useAuth();
  if (loading) {
    return <Spinner />;
  }
  return currentUser ? (
    <>
      <NavBarInMainPage />
      <Sidebar id={1} />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

function Redirect() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login");
  }, [navigate]);

  return null;
}

function NavBar() {
  //Also includes my logging out functionality
  return (
    <>
      <AppBar
        position="static"
        sx={{ margin: 0, border: 0, color: "blue", backgroundColor: "grey" }}
        color="inherit"
      >
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              flexGrow: 5,
            }}
          >
            Trackify
          </Typography>
          <Link
            component={Routelinker}
            to={"/login"}
            color="inherit"
            sx={{ mx: 1, textDecoration: "none" }}
          >
            Login
          </Link>
          <Link
            component={Routelinker}
            to={"/sign-up"}
            color="inherit"
            sx={{ mx: 1, textDecoration: "none" }}
          >
            Sign Up
          </Link>
        </Toolbar>
        <ToastContainer />
      </AppBar>
    </>
  );
}

const NavBarInMainPage: React.FC = () => {
  return (
    <Box display="flex">
      <AppBar position="fixed" sx={{ zIndex: 1201 }}>
        <Toolbar>
          <IconButton>
            <MenuOutlinedIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Trackify
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Redirect, NavBar, ProtectedRoute, NavBarInMainPage };
