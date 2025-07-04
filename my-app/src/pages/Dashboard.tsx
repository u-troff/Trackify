import React from "react"

import {Link} from 'react-router-dom'
import { Toolbar,Typography} from "@mui/material";
import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";
import { Navigate } from "react-router-dom";




const DashBoard: React.FC=()=>{
    
    return(
      <>
        <NavBarInMainPage/>
        <Sidebar page="Dashboard" id={1} />
<main style={{ flexGrow: 1, padding: "16px", marginLeft: 200 }}>
<Toolbar />
<Typography>
  Dashboard
</Typography>
</main>
      </>
      
    );
}


export default DashBoard;