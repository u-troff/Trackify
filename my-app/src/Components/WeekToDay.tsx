import React ,{useState}from "react"
import { Card,CardContent,Typography,Box, IconButton } from "@mui/material";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {WeekToDayBarChart} from './BarChart'





const WeekToDay:React.FC=()=>{
    const [TotalWeek,setTotalWeek] = useState<number>(0);
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
            <Box sx={{p:0, bgcolor:"inherit" ,textAlign:'left'}}>
              <Box sx={{display:'flex',justifyContent:'space-between'}}>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1,fontWeight:'bold' }}>
                Week to Date
            </Typography>
            <IconButton>
              <CalendarTodayIcon/>
            </IconButton>
              </Box>
            
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              {`${TotalWeek.toFixed(2)}h`}
            </Typography>
            </Box>
          <Box sx={{flexGrow: 1,
          minHeight: 150,
          maxHeight: 300,
          maxWidth: 300,
          display: 'flex',}}>
            <WeekToDayBarChart TotalHours={TotalWeek} setTotalHour={setTotalWeek}/>

          </Box>
        </Card>
    );
}

export default WeekToDay