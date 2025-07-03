import React from "react";
import {
  Toolbar,
  Typography,
  Card,
  CardContent,
  Box,
  CardHeader,
} from "@mui/material";

import TotalHours from "../Components/TotalHours";
import { Statistics } from "../Components/BarChart";
import WeekToDay from "../Components/WeekToDay";
import ProgressBars from "../Components/Progress";
import Project from "../Components/Projects";

const projectData = [
  { name: "Project A", progress: 75 },
  { name: "Project B", progress: 40 },
  { name: "Project C", progress: 90 },
  { name: "Project D", progress: 25 },
];

const DashBoard: React.FC = () => {
  return (
    <>
  
      {/*Dashboard page*/}
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
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Dashboard
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
            <TotalHours />
            <WeekToDay />
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
              <Statistics />
            </CardContent>
          </Card>
          <Card sx={{ maxWidth: 1000 }}>
            <ProgressBars />
          </Card>
        </Box>
        {/*Project overview screen*/}
        <Card sx={{ bgcolor: "inherit", flex: 1, maxWidth: "100%", p: 2 }}>
          <Project />
        </Card>
      </Box>
    </>
  );
};

export default DashBoard;
