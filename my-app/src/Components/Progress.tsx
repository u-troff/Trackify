import React from 'react';
import { Box, Card, LinearProgress, Typography } from '@mui/material';

const ProgressBars: React.FC = () => {
  return (
    <Card sx={{mt:1}}>
        <Box sx={{display:'flex', p:2}}>
            <Typography>Project Overview</Typography>
        </Box>
      {/* Progress Bar 1 */}
      <Box sx={{ mb: 2 ,display:'flex',alignItems:'center',gap:2}}>
      <LinearProgress variant="determinate" value={25} sx={{ height: 10, borderRadius: 5,flexGrow:1 }} />
        <Typography variant="body2" gutterBottom sx={{minWidth:200}}>25% <Box component= "span" sx={{mx: 4}}/>   Project A</Typography>
        
      </Box>

      {/* Progress Bar 2 */}
      <Box sx={{ mb: 2 ,display:'flex',alignItems:'center', gap:2}}>
      <LinearProgress variant="determinate" value={50} sx={{ height: 10, borderRadius: 5,flexGrow:1 }} />
      <Typography variant="body2" gutterBottom sx={{minWidth:200}}>50% <Box component= "span" sx={{mx: 4}}/>   Project B</Typography>
      </Box>

      {/* Progress Bar 3 */}
      <Box sx={{ mb: 2 ,display:'flex',alignItems:'center', gap:2}}>
      <LinearProgress variant="determinate" value={40} sx={{ height: 10, borderRadius: 5,flexGrow:1 }} />
      <Typography variant="body2" gutterBottom sx={{minWidth:200}}>40% <Box component= "span" sx={{mx: 4}}/>   Project C</Typography>
      </Box>

      {/* Progress Bar 4 */}
      <Box sx={{ mb: 2 ,display:'flex',alignItems:'center', gap:2}}>
      <LinearProgress variant="determinate" value={90} sx={{ height: 10, borderRadius: 5,flexGrow:1 }} />
      <Typography variant="body2" gutterBottom sx={{minWidth:200}}>90% <Box component= "span" sx={{mx: 4}}/>   Project D</Typography>
      </Box>
    </Card>
  );
};

export default ProgressBars;