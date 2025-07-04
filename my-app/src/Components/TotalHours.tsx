import React from "react"
import { Card,CardContent,Typography,Box, IconButton } from "@mui/material";
import TimerIcon from '@mui/icons-material/Timer';

import { GettingTimeEntries,GettingProjects } from "./ReportingCards";
import { handleTotalTime } from "./ReportingCards";
import { Spinner } from "../Spinner/Spinner";
import type { GettingData } from "./BarChart";
import { GettingBarGraphData, GettingAvg } from "../Components/BarChart";
import { useNavigate } from "react-router";
const TotalHours:React.FC<GettingData>=(props)=>{
  
    const TimeEntry = GettingTimeEntries();
    const Totaltime = handleTotalTime(TimeEntry[0]);
    const Projects = GettingProjects();
    const TotalProjects = Projects[0].length;
    

    const projectId = "1";
    //const [projects,projectsLoading] = GettingProjects();
    const [BarGraphData,timeEntries] = GettingBarGraphData(Projects[0],TimeEntry[0],projectId);
    const Avg = GettingAvg(BarGraphData);
    const navigate = useNavigate();
    const handleNavigate = () =>{
      navigate("/reports");
    }
    return(
        <Card sx={{
          bgcolor: "#f5f5f5",
          borderRadius: 2,
          boxShadow: 1,
          padding: 2,
          height: "auto",
          width: "auto", // Grow to fill available space
          maxWidth: 420, // Respect parent bounds
          flexGrow: 1, // Grow within parent flex container
          display: "flex",
          flexDirection: "column",
        }}>
          <Box sx={{display:'flex',justifyContent:'space-between'}}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 ,fontWeight:'bold'}}>
              Total Hours
            </Typography>
            <IconButton onClick={handleNavigate}>
              <TimerIcon/>
            </IconButton>
          </Box>
            
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 6 }}>
              {`${Totaltime[0]}.${Totaltime[1]}h`}
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: 8, height: 8, bgcolor: "#000", borderRadius: "50%", mr: 1 }} />
                <Typography variant="subtitle1">All Projects</Typography>
              </Box>
              <Typography variant="subtitle1">{`${TotalProjects}`}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 ,gap:2}}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: 8, height: 8, bgcolor: "#000", borderRadius: "50%", mr: 1 }} />
                <Typography variant="subtitle1">Daily average</Typography>
              </Box>
              <Typography variant="subtitle1">{`${Avg.toFixed(2)}h`}</Typography>
            </Box>
          </CardContent>
        </Card>
    );
}

export default TotalHours