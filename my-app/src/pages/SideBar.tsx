
import {Toolbar,Typography,Drawer,List,ListItem ,ListItemText, Box, Button, ListItemButton, ListItemIcon} from "@mui/material";
import React, { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LogoutIcon from '@mui/icons-material/Logout';
import {toast,Bounce,ToastContainer} from 'react-toastify'
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { Spinner } from "../Spinner/Spinner";
import { useNavigate } from "react-router-dom";
import type {NavigateFunction} from 'react-router-dom'
import ContrastIcon from '@mui/icons-material/Contrast';


const drawerWidth: number = 300;
interface Props {
  page?: string;
  icon?: string;
  id?: number;
  route?: string;
  style?: boolean;
  menu?: boolean;
  setMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}
//dynamic sidebar

const Sidebar:React.FC<Props>=(page)=>{
    let pages = [
      {id:1,label: "Dashboard",icon: <HomeIcon/>, route:"/dashboard" ,style:false},
      {id:2,label:"Time Tracking",icon: <AvTimerIcon/>, route: "/time-tracking",style:false}
      , {id:3,label:"Reports", icon: <ShowChartIcon/>,route:"/reports",style:false}
    ];
    //set to open sidebar with a click of a button
    
    

    const navigate:NavigateFunction = useNavigate();
    const [isLoggingOut,setIsLoggingOut] = useState<boolean>(false);
    const handleLogout= async ()=>{
      setIsLoggingOut(true);
      try{
          await signOut(auth);
          
  }catch (error){
      console.error(error);
      toast.error("Error with logging out",{
          position: "top-center",
          transition: Bounce
      })

  }
  }
  for (let i = 0; i < pages.length; i++) {
    if(pages[i].route==page.page){
      pages[i].style=true;
    }
  }

  const handleNav=(route:string)=>{
    navigate(route);
    page.setMenu(false);

  }
  const switchTheme=()=>{

  }

  if(isLoggingOut){
    return(<>
    <ToastContainer/>
    <Spinner/>
    </>
    );
  }

    return(<>
<Drawer
variant="temporary"
open={page.menu}
onClose={()=>page.setMenu(false)}
sx={{
  width: drawerWidth,
  flexShrink: 0,
  [`& .MuiDrawer-paper`]: {
    width: drawerWidth,
    boxSizing: "border-box",
    display:"flex",
    flexDirection:"column",
  },
  "&:hover":{
    cursor:"pointer",
    width:150,
  }
}}
>
<Toolbar />
<List>
  {pages.map((page) => (
    page.style?(
      <Box sx={{
        bgcolor: 'grey',
        transform: 'scale(1.1)',
        fontWeight:'bold'
      }} >
        <ListItem disablePadding key={page.id}>
      <ListItemButton onClick={()=>handleNav(page.route)}>
        <ListItemIcon>{page.icon}</ListItemIcon>
        <ListItemText primary={page.label}/>
      </ListItemButton>
    </ListItem>
      </Box>
      
    ):(<Box>
      <ListItem disablePadding key={page.id}>
      <ListItemButton onClick={()=>handleNav(page.route)}>
        <ListItemIcon>{page.icon}</ListItemIcon>
        <ListItemText primary={page.label}/>
      </ListItemButton>
    </ListItem>
    </Box>
      
    )
    
  ))}
</List>
<Box sx={{mt:'auto'}}>
    <ListItem disablePadding>
      <ListItemButton onClick={switchTheme}>
        <ListItemIcon><ContrastIcon/></ListItemIcon>
        <ListItemText primary="theme"/>
      </ListItemButton>
    </ListItem>

{
    <ListItem disablePadding>
      <ListItemButton onClick={handleLogout}>
        <ListItemIcon><LogoutIcon/></ListItemIcon>
        <ListItemText primary="Logout"/>
      </ListItemButton>
    </ListItem>}
</Box>
</Drawer>
    </>

    );
}

export default Sidebar
