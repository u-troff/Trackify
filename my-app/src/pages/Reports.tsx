import React from "react"

import {Link} from 'react-router-dom'
import { AppBar,Box,Toolbar,Typography,Card,CardContent,Button} from "@mui/material";
import Sidebar from "./SideBar";
import { NavBarInMainPage } from "../Redirect";
import { Navigate } from "react-router-dom";
import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import { TotalHoursReporting,TimeEntries ,DailyAvg, TopEntries} from "../Components/ReportingCards";
import { GetTimeEntry } from "../services/ApiCalls";
import { auth } from "../services/firebase";
import {ProjectPieChart}  from "../Components/ReportingCards";
import { GettingBarGraphData, Statistics } from "../Components/BarChart";
import { useState } from "react";
import { GettingProjects,GettingTimeEntries } from "../Components/ReportingCards";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export interface CurrentProject {
  projectId: string;
  setProjectId: React.Dispatch<React.SetStateAction<string>>;
}
const Reports: React.FC=()=>{
  const userId = auth.currentUser?.uid;
  
  const { data: rawTimeEntries = [], isLoading: isTimeEntriesLoading,isSuccess: succeffullyLoaded } =
    useQuery({
      queryKey: ["time-entries/user/", userId],
      queryFn: () => GetTimeEntry(userId!),
    });


    const [projectId,setProjectId] = useState<string>("1");
    const [projects,projectsLoading] = GettingProjects();
    const [timeEntries,timeEntriesLoading] =GettingTimeEntries();
    const [BarGraphData,newTimeEntries] = GettingBarGraphData(projects,timeEntries,projectId);
    const generatePDF =()=>{
      const doc = new jsPDF();
      const element = document.getElementById('report-content');
      console.log("PDF")
      if(element){
        html2canvas(element).then(canvas =>{
            const imgData = canvas.toDataURL('image/png');
            const imgProps = doc.getImageProperties(imgData);
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            doc.addImage(imgData,'PNG',0,0,pdfWidth,pdfHeight);
            doc.save('time_report.pdf');
        });
      }
    }

    return (
      <>
        <div id="report-content" >
          <Box
            sx={{
              display: "flex",
              mt: 8,
              mr: 2,
              gap: 2,
              flexDirection: "row",
              "@media (max-width:1700px)": {
                flexDirection: "column",
              },
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
              <Box
                sx={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  display: "flex",
                  alignContent: "center",
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                  Reporting
                </Typography>

                <Button
                  variant="contained"
                  sx={{ color: "white", bgcolor: "black", width: 200 }}
                  onClick={generatePDF}
                >
                  Export
                </Button>
              </Box>

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
                <TotalHoursReporting timeEntry={newTimeEntries} />
                <TimeEntries timeEntry={rawTimeEntries} />
                <DailyAvg BarGraphData={BarGraphData} />
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
                  <Statistics setProjectId={setProjectId} />
                </CardContent>
              </Card>
              <Card sx={{ maxWidth: 1000 }}></Card>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignContent: "center",
                alignItems: "center",
                gap: 4,
              }}
            >
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
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Project Overview
                  </Typography>
                  <ProjectPieChart />
                </Box>
              </Card>
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
                <Box sx={{ p: 2 }}>
                  <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Top Entries
                  </Typography>
                  <TopEntries />
                </Box>
              </Card>
            </Box>
          </Box>
        </div>
        {/* div used to create the PDF screenshot */}
       
      </>
    );
}


export default Reports;