import React from "react"

import {Link} from 'react-router-dom'
import { AppBar,Box,Toolbar,Typography,Card,CardContent} from "@mui/material";
import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";
import { Navigate } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { TotalHoursReporting,TimeEntries ,DailyAvg} from "../Components/ReportingCards";
import { GetTimeEntry } from "../services/ApiCalls";
import { auth } from "../services/firebase";
import {ProjectPieChart}  from "../Components/ReportingCards";
import { Statistics } from "../Components/BarChart";

const Reports: React.FC=()=>{
  const userId = auth.currentUser?.uid;
  
  const { data: rawTimeEntries = [], isLoading: isTimeEntriesLoading,isSuccess: succeffullyLoaded } =
    useQuery({
      queryKey: ["time-entries/user/", userId],
      queryFn: () => GetTimeEntry(userId!),
    });
    return (
      <>
        <Box
          sx={{
            display: "flex",
            mt: 8,
            mr: 2,
            gap: 2,
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 1,
              maxWidth: { md: 1000 },
              mt: 8,
              mb: 2,
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
              {" "}
              
              <TotalHoursReporting timeEntry={rawTimeEntries} />
              <TimeEntries timeEntry={rawTimeEntries} />
              <DailyAvg />
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
                <Statistics/>
              </CardContent>
            </Card>
            <Card sx={{ maxWidth: 1000 }}></Card>
          </Box>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row", // Stack on small screens, row on medium/large
              gap: 2, // Space between cards
              p: 2, // Padding around the container
              maxWidth: 2000, // Ensure it respects parent width
              width: "auto", // Full width of parent
              boxSizing: "border-box",
            }}
          >
            <Box sx={{p:2}}>
              <Typography variant="h5" sx={{fontWeight:'bold' ,mb:2}}>
                Project Overview
              </Typography>
              <ProjectPieChart/>
            </Box>
          
          </Card>
        </Box>
      </>
    );
}


export default Reports;