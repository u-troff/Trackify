import React from "react"

import {Link} from 'react-router-dom'
import { AppBar,Box,Toolbar,Typography,Card,CardContent} from "@mui/material";
import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";
import { Navigate } from "react-router-dom";




const Reports: React.FC=()=>{
    
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            flex: 1,
            maxWidth: { md: 500 },
            mt:8,
            mb:2,
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Reporting
          </Typography>
          <Card
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // Stack on small screens, row on medium/large
              gap: 2, // Space between cards
              p: 2, // Padding around the container
              maxWidth: 1000, // Ensure it respects parent width
              width: "auto", // Full width of parent
              boxSizing: "border-box",
            }}
          >
          </Card>

          <Box sx={{ height: 10 }}></Box>
          <Card
            sx={{
              width: "auto",
              height: "auto",
              maxWidth: 1000,
              maxHeight: 700,
              bgcolor: "#f5f5f5",
            }}
          >
            <CardContent>
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 1000 }}>
          </Card>
        </Box>
      </>
    );
}


export default Reports;