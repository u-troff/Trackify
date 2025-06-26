
import {Toolbar,Typography,Drawer,List,ListItem ,ListItemText, Box, Button, ListItemButton, ListItemIcon} from "@mui/material";
import React, { useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import AvTimerIcon from '@mui/icons-material/AvTimer';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import LogoutIcon from '@mui/icons-material/Logout';



const drawerWidth: number = 200;
interface Props{
    page?: string;
}

const Sidebar:React.FC<Props>=(page)=>{
    const pages = [
      {label: "Dashboard",icon: <HomeIcon/>},
      {label:"Time Tracking",icon: <AvTimerIcon/>}
      , {label:"Reports", icon: <ShowChartIcon/>}
    ];
    //set to open sidebar with a click of a button
    const [isOpen,setIsOpen] = useState<boolean>(true);

    return(<>
<Drawer
variant="permanent"

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
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>{page.icon}</ListItemIcon>
        <ListItemText primary={page.label}/>
      </ListItemButton>
    </ListItem>
  ))}
</List>
<Box >{
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon><LogoutIcon/></ListItemIcon>
        <ListItemText primary="Logout"/>
      </ListItemButton>
    </ListItem>}
</Box>
</Drawer>

{/* Main Content */}
<main style={{ flexGrow: 1, padding: "16px", marginLeft: drawerWidth }}>
<Toolbar />
<Typography>
  This is your main content area.
</Typography>
</main>
    </>

    );
}

export default Sidebar
