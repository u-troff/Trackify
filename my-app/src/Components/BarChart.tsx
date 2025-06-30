import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
import React, { useState } from 'react'
import { Typography,Select,Card,Box ,FormControl,MenuItem} from '@mui/material';
  //this is just dummy data at the moment
  const data = [
    { name: 'Monday', uv: 2500 ,pv: 3000,hours:1},
    { name: 'Tuesday', uv: 3000 ,pv:2000,hours:2},
    { name: 'Wednesday', uv: 2000 ,pv:1500,hours:2},
    { name: 'Thursday', uv: 2780 ,pv:3500,hours:8},
    { name: 'Friday', uv: 2400 ,pv:350,hours:6},
    { name: 'Saturday', uv: 1200 ,pv:2900,hours:3},
    { name: 'Sunday', uv: 280 ,pv:500,hours:5},
  ];
const days = ["Monday","Tuesday","Wednesday"]
const Statistics:React.FC =()=>{
    const [selectedDay,setSelectedDay] = useState<string>("Monday");

    const handleDay=(e)=>{
      setSelectedDay(e.target.value);
    }
    return(
        <Card>
          <Box sx={{justifyContent:'space-between',display:'flex', mt: 1}}>
          <Typography sx={{textAlign:'left'}}>
          Statistics
          </Typography>
          <Typography sx={{textAlign:'center'}}>
            Project A 
          </Typography>
          <FormControl sx={{minWidth:120}}>
            <Select labelId='dropdown-label' value={selectedDay} label="Days" onChange={handleDay} >
            <MenuItem value={days[0]}>{days[0]}</MenuItem>
            <MenuItem value={days[1]}>{days[1]}</MenuItem>
            <MenuItem value={days[2]}>{days[2]}</MenuItem>
            </Select>
          </FormControl>
      
          </Box>
          
    <ResponsiveContainer width="100%" height={500} >
      
        <BarChart
          layout="horizontal"
          data={data}
          margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis  domain={[0,'dataMax']}/>
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" fill="#8884d8" maxBarSize={80}/>
          <Bar dataKey="pv" maxBarSize={80}/>
        </BarChart>
      </ResponsiveContainer>
      </Card>);
  }

  const WeekToDayBarChart:React.FC =()=>{
    return(<>
    
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <Tooltip />
            <Bar dataKey="hours" fill="#aaa" barSize={28} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
  
    
    </>);
  }
  export {Statistics,WeekToDayBarChart}