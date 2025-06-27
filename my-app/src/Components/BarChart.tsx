import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
  } from 'recharts';
import React from 'react'
import { Card } from '@mui/material';
  
  const data = [
    { name: 'Page A', uv: 4000 },
    { name: 'Page B', uv: 3000 },
    { name: 'Page C', uv: 2000 },
    { name: 'Page D', uv: 2780 },
  ];
  const Statistics:React.FC =()=>{
    return(
        <Card>

        
    <ResponsiveContainer width="100%" height={500} >
        <BarChart
          layout="horizontal"
          data={data}
          margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis type="category" dataKey="name" />
          <Tooltip />
          <Legend />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
      </Card>);
  }
  export {Statistics}