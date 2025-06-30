import React from "react"
import { Toolbar,Typography,Card,CardContent,Box,CardHeader} from "@mui/material";
import {ResponsiveContainer,BarChart,XAxis,YAxis,Tooltip,Bar} from 'recharts'
import TotalHours from "../Components/TotalHours"
import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";
import { Statistics } from "../Components/BarChart"; 

const projectData = [
        {name: "Project A", progress:75},
        {name: "Project B", progress:40},
      {name: "Project C", progress: 90},
        {name:"Project D",progress:25}
      ]


const DashBoard: React.FC=()=>{
    
    return(
      <>
        <NavBarInMainPage/>
        <Sidebar page="Dashboard" id={1} />
        {/*Dashboard page*/}
        <Box sx={{ mt: 8, ml: "200px", mr: 2 }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Dashboard
          </Typography>
          <TotalHours/>
          <Card sx={{
            width: 'auto',
            height: 'auto',
            maxWidth:800,
          }}>
            <CardContent>
              <Statistics/>
            </CardContent>
          </Card>
          
      </Box>
        
      </>
      
    );
}


export default DashBoard;