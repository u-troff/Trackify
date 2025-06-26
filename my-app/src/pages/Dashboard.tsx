import React from "react"

import {Link} from 'react-router-dom'
import { AppBar,Toolbar,Typography} from "@mui/material";
import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";
import { Navigate } from "react-router-dom";




const DashBoard: React.FC=()=>{
    
    return(
      <>
        <NavBarInMainPage/>
        <Sidebar/>
        
        
      </>
      
    );
}


export default DashBoard;