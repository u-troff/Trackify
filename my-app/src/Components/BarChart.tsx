import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
import React, { useState } from 'react'
import { Typography,Select,Card,Box ,FormControl,MenuItem} from '@mui/material';
import { GettingProjects, GettingTimeEntries } from './ReportingCards';
import { Spinner } from '../Spinner/Spinner';
  //this is just dummy data at the moment


  interface Data{
    date:string;
    projectId:string;
    project:string;
    hours:number;

  }
  const data = [
    { name: 'Monday', uv: 2500 ,pv: 3000,hours:1},
    { name: 'Tuesday', uv: 3000 ,pv:2000,hours:2},
    { name: 'Wednesday', uv: 2000 ,pv:1500,hours:2},
    { name: 'Thursday', uv: 2780 ,pv:3500,hours:8},
    { name: 'Friday', uv: 2400 ,pv:350,hours:6},
    { name: 'Saturday', uv: 1200 ,pv:2900,hours:3},
    { name: 'Sunday', uv: 280 ,pv:500,hours:5},
  ];


const Statistics:React.FC =()=>{
    
    const [projectId,setProjectId] = useState<string>("1");
    const [projects,projectsLoading] = GettingProjects();
    const [timeEntries,timeEntriesLoading] =GettingTimeEntries();
    //console.log(timeEntries);
    const date = new Date();
   (date.setDate(date.getDate()-7))
    const oneWeekAgo = date.toISOString().split("T")[0];
    
    const filteredEntries = timeEntries.filter((entry)=>{
      const formattedDate = entry.date.split("T")[0];
      return (
        formattedDate > oneWeekAgo &&
        (projectId === "1" || entry.projectId === projectId)
      );
    });
    //try to get one decimal place when doing this
    
    const groupedData = filteredEntries.reduce(
      (acc: { [key: string]: Data }, entry) => {
        const dateKey = entry.date.split("T")[0];
        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dateKey,
            projectId: entry.projectId,
            project: entry.project,
            hours: 0,
          };
        }
        acc[dateKey].hours += (entry.hours + entry.minutes / 60);
        return acc;
      },
      {}
    );

    const BarGraphData = Object.values(groupedData) as Data[];


    const handleProject=(e)=>{
      setProjectId(e.target.value);
      
    }


    return (
      <Card>
        <Box sx={{ justifyContent: "space-between", display: "flex", mt: 1 }}>
          <Typography
            sx={{ textAlign: "left", p: 2, fontWeight: "bold" }}
            variant="h5"
          >
            Statistics
          </Typography>
          <Box sx={{ p: 2 }}>
            <Select
              labelId="dropdown-label"
              value={projectId}
              label="Projects"
              onChange={handleProject}
              renderValue={(selected) => {
                const item = projects.find((p) => p.ProjectId === selected);
                return item ? item.name : "All Projects";
              }}
            >
              <MenuItem value="1">All projects</MenuItem>
              {projects.map((p) => (
                <MenuItem value={p.ProjectId}>{p.name}</MenuItem>
              ))}
            </Select>
          </Box>
        </Box>
        <Box sx={{ whiteSpace: "nowrap", overflow: "auto" }}>
          {(projectsLoading||timeEntriesLoading)?(
                <Spinner/>
          ):(
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              layout="horizontal"
              data={BarGraphData}
              margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                domain={[0, "dataMax"]}
                tickFormatter={(value) => value.toFixed(2)}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="hours" fill="#8884d8" maxBarSize={80} />
            </BarChart>
          </ResponsiveContainer>

            )}
        </Box>
      </Card>
    );
  }




  interface prop {
    TotalHours: number;
    setTotalHour: React.Dispatch<React.SetStateAction<number>>;
  }
  const WeekToDayBarChart:React.FC<prop> =(prop)=>{
    
    const [timeEntries, timeEntriesLoading] = GettingTimeEntries();
    //console.log(timeEntries);
    const date = new Date();
    date.setDate(date.getDate() - 7);
    const oneWeekAgo = date.toISOString().split("T")[0];

    const filteredEntries = timeEntries.filter((entry) => {
      const formattedDate = entry.date.split("T")[0];
      return (
        formattedDate > oneWeekAgo
      );
    });

    const groupedData = filteredEntries.reduce(
      (acc: { [key: string]: Data }, entry) => {
        const dateKey = entry.date.split("T")[0];
        if (!acc[dateKey]) {
          acc[dateKey] = {
            date: dateKey,
            projectId: entry.projectId,
            project: entry.project,
            hours: 0,
          };
        }
        acc[dateKey].hours += entry.hours + entry.minutes / 60;
        return acc;
      },
      {}
    );

    const BarGraphData = Object.values(groupedData) as Data[];
    let Sum =0;
    for (let i = 0; i < BarGraphData.length; i++) {
             Sum += BarGraphData[i].hours;
      
    }

    prop.setTotalHour(Sum);
    if(timeEntriesLoading){
      return(<Spinner/>)
    }
    return(<>
    
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={BarGraphData}>
            <Tooltip />
            <Bar dataKey="hours" fill="#aaa" barSize={28} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
  
    
    </>);
  }
  export {Statistics,WeekToDayBarChart}