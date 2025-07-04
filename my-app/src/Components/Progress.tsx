import React from 'react';
import { Box, Card, LinearProgress, Typography } from '@mui/material';
import { GettingProjects, GettingTimeEntries, PieGraphData } from './ReportingCards';


const ProgressBars: React.FC = () => {

  const [projects,isProjectsLoading] = GettingProjects();
  const [timeEntries,isTimeEntriesLoading] = GettingTimeEntries();

  const [totalPie,TimeData] = PieGraphData(projects,timeEntries);
  



  return (
    <Card sx={{ mt: 1 }}>
      <Box sx={{ display: "flex", p: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          Project Overview
        </Typography>
      </Box>

      {TimeData.map((entry) => (
        <Box
          sx={{ mb: 2, display: "flex", alignItems: "center", gap: 2, p: 2 }}
        >
          <LinearProgress
            variant="determinate"
            value={entry.value}
            sx={{ height: 10, borderRadius: 5, flexGrow: 1 }}
          />
          <Typography variant="body2" gutterBottom sx={{ minWidth: 200 }}>
            {`${entry.value.toFixed(1)}%`}{" "}
            <Box component="span" sx={{ mx: 4 }} /> {entry.name}
          </Typography>
        </Box>
      ))}

      {/* Progress Bar 1 */}
    </Card>
  );
};

export default ProgressBars;