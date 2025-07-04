import React, { useEffect,useState,PureComponent } from "react";
import { Card, CardContent, Typography, Box, IconButton, } from "@mui/material";
import MoreTimeIcon from "@mui/icons-material/MoreTime";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import ReplayIcon from "@mui/icons-material/Replay";
import { GetTimeEntry,GetProjects,GetSpecificTimeEntry } from "../services/ApiCalls";
import { useQuery } from "@tanstack/react-query";
import { auth } from "../services/firebase";
import type {Props} from "./Projects"
import { ResponsiveContainer,PieChart,Cell,Pie,Tooltip, Legend } from "recharts";
import { Spinner } from "../Spinner/Spinner";
import { GettingAvg, GettingBarGraphData, type Data, type GettingData } from "./BarChart";

export const GettingTimeEntries = () => {
    const UID = auth.currentUser?.uid;
  const {
    data: rawTimeEntries = [],
    isLoading: isTimeEntriesLoading,
    isSuccess: succeffullyLoaded,
  } = useQuery({
    queryKey: ["time-entries/user/", UID],
    queryFn: () => GetTimeEntry(UID!),
  });

  return [rawTimeEntries,isTimeEntriesLoading]
};

export const GettingProjects = ()=>{
    const UID = auth.currentUser?.uid;
    const {
      data: projects = [],
      isLoading,
      error,
      isSuccess: Successfullyloaded,
    } = useQuery<Props[], Error>({
      queryKey: ["projects", UID],
      queryFn: () => GetProjects(UID!),
      enabled: !!UID, 
    });

    return [projects,isLoading]
}

export const handleTotalTime = (timeEntry: TimeEntry[]) => {
  let hours: number = 0;
  let minutes: number = 0;
  for (let i = 0; i < timeEntry.length; i++) {
    hours += timeEntry[i].hours;
    minutes += timeEntry[i].minutes;
  }
  //convert extra mintues to hours
  hours += Math.floor(minutes / 60);
  minutes = minutes % 60;
  //console.log(`Total Time: ${hours}h ${minutes}m`);
  return [hours, minutes];
};



export interface TimeEntry {
  id: string;
  userId: string;
  projectId: string;
  notes: string;
  hours: number;
  minutes: number;
  date: string; // ISO string (e.g., "2025-06-30T14:12:27.257Z")
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

const TotalHoursReporting: React.FC<TimeEntry[]> = ({ timeEntry }) => {
  // desctructure the object
  const time = handleTotalTime(timeEntry);
  return (
    <>
      <Card
        sx={{
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
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleTotalTime}>
            <MoreTimeIcon sx={{ fontSize: 100 }} />
          </IconButton>
          <Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              Total Hours per Project
            </Typography>
            <Typography
              variant="h4"
              color="text"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              {`${time[0]}.${time[1]}h`}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

const TimeEntries: React.FC<TimeEntry[]> = ({ timeEntry }) => {

    let AllTimeEntries = GettingTimeEntries()[0].length;

    const handleAllEntries = ()=>{
        AllTimeEntries = GettingTimeEntries()[0].length;

    }
  return (
    <>
      <Card
        sx={{
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
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleAllEntries}>
            <PublishedWithChangesIcon sx={{ fontSize: 100 }} />
          </IconButton>
          <Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              Total Time Entries
            </Typography>
            <Typography
              variant="h4"
              color="text"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              {AllTimeEntries}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

interface DailyAvg{
  BarGraphData: Data[];
}

const DailyAvg: React.FC<DailyAvg> = (props) => {
  const projectId = "1";
  // const [projects,projectsLoading] = GettingProjects();
  // const [timeEntries,timeEntriesLoading] =GettingTimeEntries();
  // const [BarGraphData,_] = GettingBarGraphData(projects,timeEntries,projectId);
  // console.log(props.BarGraphData)
  const Avg = GettingAvg(props.BarGraphData);
  const handleDayAvg = () => {
    //logic to get total time
  };
  return (
    <>
      <Card
        sx={{
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
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleDayAvg}>
            <ReplayIcon sx={{ fontSize: 100 }} />
          </IconButton>
          <Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              Weekly Average per project
            </Typography>
            <Typography
              variant="h4"
              color="text"
              sx={{ mb: 1, fontWeight: "bold" }}
            >
              {`${Avg.toFixed(2)}h`}
            </Typography>
          </Box>
        </Box>
      </Card>
    </>
  );
};

const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28FE5",
  "#FF6384",
];



export const PieGraphData=(projects:any,timeEntries:any)=>{
  const projectTimeData = projects
    .map((project) => {
      const totalTime = timeEntries
        .filter((entry: TimeEntry) => project.ProjectId === entry.projectId)
        .reduce(
          (acc: number, curr: TimeEntry) =>
            acc + curr.hours + curr.minutes / 60,
          0
        );
      return { name: project.name, value: totalTime };
    })
    .filter((data) => data.value > 0); //filter out projects with zero time
  //console.log(projectTimeData);
    return [projectTimeData.reduce((total,index)=>total+index.value,0),projectTimeData];//quick way to sum totals


}



const ProjectPieChart=()=> {

    const [projects,isProjectsLoading] = GettingProjects();
    const [timeEntries,isTimeEntrieloading] = GettingTimeEntries();
   
    //console.log(projects);
    

    const totalPie = PieGraphData(projects,timeEntries);
    //Legend of the pie chart
    const renderLegend = (value:string,entry:any)=>{
        const {payload}= entry;
        const percent = totalPie[0]>0?((payload.value/totalPie[0])*100).toFixed(1):0;
        return `${value} (${percent}%)`;
    }
    
    return (
      <>
        <Card
          sx={{
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            boxShadow: 1,
            padding: 2,
            height: "auto",
            width: "auto",
            maxWidth: 1000,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ fontWeight: "bold" }}
            >
              Project Time Distribution
            </Typography>
          </Box>

          {isProjectsLoading || isTimeEntrieloading ? (
            <Spinner />
          ) : (
            <>
              <Box sx={{whiteSpace:"nowrap",overflow:"auto"}}>
                <ResponsiveContainer width={1000} height={300}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={totalPie[1]}
                      cx="50%"
                      cy="50%"
                      outerRadius="100%"
                      fill="#8884d8"
                      labelLine={true}
                    >
                      {totalPie[1].map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      formatter={renderLegend}
                      wrapperStyle={{ paddingLeft: 20 }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </>
          )}
        </Card>
      </>
    );
  
};
  

export { TotalHoursReporting, TimeEntries, DailyAvg,ProjectPieChart};
