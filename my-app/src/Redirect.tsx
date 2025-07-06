import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate,useLocation } from "react-router-dom";
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
  const location = useLocation();
  const { currentUser, loading } = useAuth();
  const [menu, setMenu] = useState<boolean>(false);
  const [currentPage,setCurrentPage] = useState<string>("")

  useEffect(()=>{
      const path = location.pathname;
      setCurrentPage(path);
  },[location])
  if (loading) {
    return <Spinner />;
  }
  return currentUser ? (
    <>
      <NavBarInMainPage menu={menu} setMenu={setMenu}/>
      <Sidebar page={currentPage} menu={menu} setMenu={setMenu}/>
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
        position="fixed"
        sx={{
          margin: 0,
          border: 0,
          color: "white",
          backgroundColor: "#272B90",
          p: 0,
          zIndex: 1201,
        }}
        color="inherit"
      >
        <Toolbar>
          <Typography
            variant="h4"
            sx={{
              flexGrow: 5,
            }}
          >
            TU Track
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

interface Props {
  setMenu: React.Dispatch<React.SetStateAction<boolean>>;
  menu:boolean;
}
const NavBarInMainPage: React.FC<Props> = (props) => {
  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201, backgroundColor: "#272B90" }}
      >
        <Toolbar>
          <IconButton onClick={() => props.setMenu(!props.menu)} >
            <MenuOutlinedIcon sx={{fontSize:40}}/>
          </IconButton>
          <Typography variant="h4" noWrap>
            TU Track
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export { Redirect, NavBar, ProtectedRoute, NavBarInMainPage };
