import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
import React, { useEffect, useState } from 'react'
import { Typography,Select,Card,Box ,FormControl,MenuItem} from '@mui/material';
import { GettingProjects, GettingTimeEntries } from './ReportingCards';
import { Spinner } from '../Spinner/Spinner';
import type { CurrentProject } from '../pages/Reports';
  //this is just dummy data at the moment


export  interface Data{
    date:string;
    projectId:string;
    project:string;
    hours:number;

  }
  const CustomToolTip=({active,payload})=>{//these propetries as passed from the toolTip
    if(active&&payload&&payload.length){
        const item = payload[0].payload;
        return (
          <div
            style={{
              background: "#fff",
              border: "1px solid #ccc",
              padding: 10,
            }}
          >
            <p>
              <strong>{item.project}</strong>
            </p>
            <p>hours: {item.hours}</p>
          </div>
        );
    }
  }


export interface GettingData {
  setAverage: React.Dispatch<React.SetStateAction<number>>;
  Avg?:number;
}



export const GettingAvg=(prop:Data[])=>{
  const TotalWeeklyHours = prop.reduce((acc:number,curr:Data)=>{
        return acc+curr.hours;
  },0)

  return (TotalWeeklyHours/7);
}

export const GettingBarGraphData = (projects: any,timeEntries:any,projectId:string) => {

  const date = new Date();
  date.setDate(date.getDate() - 7);
  const oneWeekAgo = date.toISOString().split("T")[0];

  const filteredEntries = timeEntries.filter((entry) => {
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
      const dayOfWeek = new Date(dateKey).toLocaleDateString("en-US",{//change from the date to the actual day of the week
        weekday:"long"
      });
      const projectName = projects.filter(
        (p) => p.ProjectId === entry.projectId
      );

      if (!acc[dateKey]) {
        acc[dateKey] = {
          date: dayOfWeek,
          projectId: entry.projectId,
          project: projectName[0]?projectName[0].name:"",
          hours: 0,
        };
      }
      acc[dateKey].hours += entry.hours + entry.minutes / 60;
      return acc;
    },
    {}
  );
  return [Object.values(groupedData) as Data[],filteredEntries];

};

const Statistics:React.FC<CurrentProject> =(props)=>{
    
    const [projectId,setProjectId] = useState<string>("1");
    const [projects,projectsLoading] = GettingProjects();
    const [timeEntries,timeEntriesLoading] =GettingTimeEntries();
    //console.log(timeEntries);
    
    const [BarGraphData,newTimeEntries] = GettingBarGraphData(projects,timeEntries,projectId);
   
    //console.log(BarGraphData)
    const handleProject=(e)=>{
      setProjectId(e.target.value);
      props.setProjectId(e.target.value);
      
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
          
            <ResponsiveContainer width="100%" height={500}>
              {(projectsLoading || timeEntriesLoading)?(
                <Spinner />
              ):(
              <BarChart
                layout="horizontal"
                data={BarGraphData}
                margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" allowDataOverflow={true} reversed/>
                <YAxis
                  domain={[0, "dataMax"]}
                  tickFormatter={(value) => value.toFixed(2)}
                />
                <Tooltip content={<CustomToolTip/>}/>
                <Legend />
                <Bar dataKey="hours" fill="#8884d8" maxBarSize={80} />
              </BarChart>
)}
            </ResponsiveContainer>
          
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
    return (
      <>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={BarGraphData}>
            <Tooltip />
            <Bar
              dataKey="hours"
              fill="#aaa"
              barSize={28}
              radius={[4, 4, 0, 0]}
            />
            <Tooltip content={<CustomToolTip />} />
          </BarChart>
        </ResponsiveContainer>
      </>
    );
  }
  export {Statistics,WeekToDayBarChart}