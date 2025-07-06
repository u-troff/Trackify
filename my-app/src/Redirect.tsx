import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import {
  AppBar,
  styled,
  Link,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar
} from "@mui/material";
import { Link as Routelinker } from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import { Spinner } from "./Spinner/Spinner";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Sidebar from "./pages/SideBar";
import Logo from "./assets/Logo.png";
import { Footer } from "./Components/Footer";
import { deepOrange } from "@mui/material/colors";
import { useQuery } from "@tanstack/react-query";
import { auth } from "./services/firebase";
import { GetSpecificUsers,getUsers } from "./services/ApiCalls";
import Stack from "@mui/material/Stack";
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
      <NavBarInMainPage menu={menu} setMenu={setMenu} />
      <Sidebar page={currentPage} menu={menu} setMenu={setMenu} />
      <Outlet />
      <Footer />
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
const LogoImage = styled("img")({
  width: 30,
  height: "auto",
  maxWidth: "100%",
  borderRadius: 10,
});
const handleLogoClick=()=>{
  window.location.reload();
}

const NavBarInMainPage: React.FC<Props> = (props) => {  
  const email = auth.currentUser?.email;
  const {data:users}= useQuery({
    queryKey:['users'],
    queryFn: ()=>getUsers(),
  });


  const name = users.filter((user)=> {
    const cleanEmail = user.email.replace(/(\+[^@]+)/,'');
    return cleanEmail === email;

  });
  console.log(name[0].name);
  
  return (
    <Box display="flex">
      <AppBar
        position="fixed"
        sx={{ zIndex: 1201, backgroundColor: "#272B90" }}
      > 
        <Toolbar sx={{justifyContent:'space-between'}}>
         <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton onClick={() => props.setMenu(!props.menu)}>
              <MenuOutlinedIcon sx={{ fontSize: 40 }} />
            </IconButton>
            <IconButton onClick={handleLogoClick}>
              <LogoImage src={Logo} alt="" />
            </IconButton>

            <Typography variant="h4" noWrap>
              TU Track
            </Typography>
            </Box>
            <Box sx={{display:'flex',alignItems:'center',gap:2}}>
              <Typography>
                Welcome: {name[0].name}!!
              </Typography>
              <Avatar sx={{bgcolor: deepOrange[500]}}>{name[0].name[0]}
              </Avatar>
            </Box>
         
        </Toolbar> 
        
      </AppBar>
    </Box>
  );
};

export { Redirect, NavBar, ProtectedRoute, NavBarInMainPage };
