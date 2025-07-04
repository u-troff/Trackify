import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar,Link,Toolbar,Typography,Button } from "@mui/material";
import {Link as Routelinker} from 'react-router-dom'
import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import {ToastContainer} from 'react-toastify'
import { Spinner } from "./Spinner/Spinner";


const ProtectedRoute: React.FC =()=>{
    const {currentUser,loading} =useAuth();
    if (loading){
        return <Spinner/>;
    }
    return currentUser? <Outlet/>:<Navigate to='/login'/>;
}


function Redirect(){
    const navigate = useNavigate();

    useEffect(()=>{
        navigate('/login')
    },[navigate]);

    return null;
}


function NavBar(){
    //Also includes my logging out functionality
    return(<>
    <AppBar position="static" sx={{margin: 0,border:0 ,color:"blue", backgroundColor:"grey"}} color="inherit" >
        <Toolbar>
           <Typography variant= "h4" sx={{
               flexGrow:5
           }}>
               Trackify
           </Typography>
           <Link component={Routelinker} to={'/login'} color="inherit" sx={{mx: 1, textDecoration:'none'}}>Login</Link>
           <Link component={Routelinker} to={'/sign-up'} color="inherit" sx={{mx: 1, textDecoration:'none'}}>Sign Up</Link>
        </Toolbar>
        <ToastContainer/>
   </AppBar>
   </>);
}

const NavBarInMainPage:React.FC=()=>{
    return(
        <div style={{ display: "flex" }}>
              {/* AppBar */}
              <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                <Toolbar>
                  <Typography variant="h6" noWrap>
                    Trackify
                  </Typography>
                </Toolbar>
              </AppBar>
        </div>
    );
}



export {Redirect,NavBar,ProtectedRoute,NavBarInMainPage}