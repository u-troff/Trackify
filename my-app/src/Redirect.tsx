import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppBar,Link,Toolbar,Typography,Button } from "@mui/material";
import {Link as Routelinker} from 'react-router-dom'
import { Outlet,Navigate } from "react-router-dom";
import{auth} from "./services/firebase"
import { signOut } from "firebase/auth";
import { useAuth } from "./context/AuthContext";
import {toast,ToastContainer,Bounce} from 'react-toastify'
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
    const [isLoggingOut,setIsLoggingOut] = useState<boolean>(false);
    const handleLogout= async ()=>{
        setIsLoggingOut(true);
        try{
            toast.success("Good Bye ;)",{position: "top-center",autoClose: 1000});
            await signOut(auth);
            
    }catch (error){
        console.error(error);
        toast.error("Error with logging out",{
            position: "top-center",
            transition: Bounce
        })

    }
    }

    if(isLoggingOut){
        return(<Spinner/>)
    }

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
           <Button color="inherit" onClick={handleLogout} >Log Out</Button>
        </Toolbar>
        <ToastContainer/>
   </AppBar>
   </>);
}




export {Redirect,NavBar,ProtectedRoute}