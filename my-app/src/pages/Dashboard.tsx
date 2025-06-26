import React from "react"

import {Link} from 'react-router-dom'
import { Toolbar,Typography,Card,CardContent} from "@mui/material";
import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";
import { Navigate } from "react-router-dom";




const DashBoard: React.FC=()=>{
    
    return(
      <>
        <NavBarInMainPage/>
        <Sidebar page="Dashboard" id={1} />
        
          <Card sx ={{bgcolor:'black'}}>
            <CardContent>
            <Typography>
            Hello World 
            </Typography>
            </CardContent>
        </Card>
        
      </>
      
    );
}


export default DashBoard;