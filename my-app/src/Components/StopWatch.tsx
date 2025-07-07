import React, { useState, useEffect, useRef } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
//intreeface for global states
export interface props {
  isRunning: boolean;
  elapsedTime: number;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

const StopWatch: React.FC<props> = (prop) => {

  const formatTime = (): string => {
    let seconds: number|string = Math.floor((prop.elapsedTime / 1000) % 60);
    let hours: number|string = Math.floor(prop.elapsedTime / (1000 * 60 * 60));
    let minutes: number|string = Math.floor((prop.elapsedTime / (1000 * 60)) % 60);
    let millisecs: number|string = Math.floor((prop.elapsedTime % 1000) / 10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    millisecs = String(millisecs).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
      <Card sx={{ minWidth: 275, textAlign: "center" }}>
        <CardContent>
          <Typography variant="h4" component="div" className="display">
            {formatTime()}
          </Typography>
          <Box
            sx={{ mt: 2, display: "flex", gap: 1, justifyContent: "center" }}
          >
            <Button variant="contained" color="primary" onClick={prop.start}>
              Start
            </Button>
            <Button variant="contained" color="secondary" onClick={prop.stop}>
              Pause
            </Button>
            <Button variant="outlined" onClick={prop.reset}>
              Reset
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default StopWatch;
