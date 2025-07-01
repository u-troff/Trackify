import React from "react"

import {Link} from 'react-router-dom'
import { AppBar,Toolbar,Typography} from "@mui/material";
import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";
import { Navigate } from "react-router-dom";




const Reports: React.FC=()=>{
    
    return (
      <>
        <Sidebar id={3} />
        <main style={{ flexGrow: 1, padding: "16px", marginLeft: 200 }}>
          <Toolbar />
          <Typography>This is Reports Page</Typography>
        </main>
      </>
    );
}


export default Reports;