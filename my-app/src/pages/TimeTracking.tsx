import React from "react"
import { AppBar,Toolbar,Typography} from "@mui/material";
import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";





const TimeTracking: React.FC=()=>{
    
    return(
      <>
        <NavBarInMainPage/>
        <Sidebar id={2}/>
<main style={{ flexGrow: 1, padding: "16px", marginLeft: 200 }}>
<Toolbar />
<Typography>
  This is time tracking page
</Typography>
</main>
      </>
      
    );
}


export default TimeTracking;