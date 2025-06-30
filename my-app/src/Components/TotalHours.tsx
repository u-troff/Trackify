import React from "react"
import { Card,CardContent,Typography,Box, IconButton } from "@mui/material";
import TimerIcon from '@mui/icons-material/Timer';





const TotalHours:React.FC=()=>{

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
            <IconButton>
              <TimerIcon/>
            </IconButton>
          </Box>
            
          <CardContent sx={{ p: 3, textAlign: "center" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              0.0h
            </Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: 8, height: 8, bgcolor: "#000", borderRadius: "50%", mr: 1 }} />
                <Typography variant="body2">All Projects</Typography>
              </Box>
              <Typography variant="body2">2 Projects</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 1 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ width: 8, height: 8, bgcolor: "#000", borderRadius: "50%", mr: 1 }} />
                <Typography variant="body2">Daily average</Typography>
              </Box>
              <Typography variant="body2">0.0h</Typography>
            </Box>
          </CardContent>
        </Card>
    );
}

export default TotalHours