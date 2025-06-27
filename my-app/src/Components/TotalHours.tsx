import React from "react"
import { Card,CardContent,Typography,Box } from "@mui/material";





const TotalHours:React.FC=()=>{

    return(
        <Card sx={{ maxWidth: 300, bgcolor: "#f5f5f5", borderRadius: 2, boxShadow: 1,padding:2,height:'auto',width:'auto' }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              Total Hours
            </Typography>
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