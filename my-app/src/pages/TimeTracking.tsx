import React from "react"
import { Typography,Grid2,Button,TextField,MenuItem,Table,Checkbox,Select,Box} from "@mui/material";

import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";




const TimeTracking: React.FC=()=>{
    
    return(
      <>
        <NavBarInMainPage/>
        <Sidebar id={2}/>
        <Box
        sx={{
          display: "flex",
          width:'100%',
          mt: 8,
          ml: "200px",
          gap: 2,
        }}
      >
      <Box sx={{display:'flex',justifyContent:'space-between'}}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Time Entry
        </Typography>
        <Button sx={{color:'white',bgcolor:'black'}} variant="contained" >Track Time</Button>
        </Box>
        <Grid2 container spacing={2} style={{padding:16}}>
          <Grid2 item xs={4}>
            <TextField fullWidth label="Search" variant="outlined"/>
          </Grid2>
          <Grid2 item xs={4}>
            <Select fullWidth variant="outlined" value="all" displayEmpty>
              <MenuItem value='all'>All projects</MenuItem>

            </Select>
          </Grid2>

        </Grid2>
      </Box>
        
      </>
      
    );
}


export default TimeTracking;