import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  InputLabel,
  IconButton,
  Card,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { auth } from "../services/firebase";
import { GetProjects, PostTimeEntry } from "../services/ApiCalls";
import type { Props } from "../Components/Projects";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import StopWatch from "./StopWatch";
import { useTimerStore } from "./TimerState";
interface FormValues {
  project: string;
  notes: string;
  hours: number;
  minutes: number;
}

interface ManualTimeEntryFormProps {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

const ContinualTimeEntry: React.FC<ManualTimeEntryFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  const [project, setProject] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { isRunning, elapsedTime, start, stop, reset } = useTimerStore();
  //console.log(elapsedTime);
  const userId = auth.currentUser?.uid;

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<Props[]>({
    queryKey: ["projects", userId],
    queryFn: () => GetProjects(userId!),
    enabled: !!userId,
    staleTime:60*1000,
  });
  const HoursAndMinutes=()=>{
      const hours = Math.floor(elapsedTime / (60*1000*60));
      const minutes = Math.floor(elapsedTime/60000);
      setHours(hours);
      setMinutes(minutes);
      return [hours,minutes];
  }
  const validateForm = () => {
    const CurrentTime = HoursAndMinutes();
    setHours(CurrentTime[0]);
    setMinutes(CurrentTime[1]);
    const newErrors: { [key: string]: string } = {};
    if (!project) {
      newErrors.project = "Project is required";
    }
    if (!notes.trim()) {
      newErrors.notes = "Notes are required";
    }
    if (hours < 0 || hours > 23) {
      newErrors.hours = "Hours must be between 0 and 23";
    }
    if (minutes <= 0 || minutes > 59) {
      newErrors.minutes = "Minutes must be between 0 and 59";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = () => {
    if (validateForm()&&isRunning===false&&(elapsedTime>60000)) {
      onSubmit({
        project,
        notes,
        hours,
        minutes,
      });
      setProject("");
      setNotes("");
      setHours(0);
      setMinutes(0);
      reset();
    }else if(elapsedTime<60000){
      console.log("Please wait for 1 minute before submitting");
    }else if(isRunning){
      console.log("Please pause current project time");
    }
  };
  //console.log("ProjectId",project,"Notes",notes);
  return (
    <Dialog open={true} onClose={onCancel}>
      <Card>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "start",
          }}
        >
          <Box>
            <DialogTitle
              id="form-dialog-title"
              variant="h5"
              sx={{ fontWeight: "bold" }}
            >
              Continue Time Entry
            </DialogTitle>
            <Typography sx={{ ml: 3, mb: 2 }}>
              Click Start to start tracking time.
            </Typography>
          </Box>
          <IconButton onClick={onCancel}>
            <CloseIcon sx={{ fontSize: 60 }} />
          </IconButton>
        </Box>
        <DialogContent>
          <InputLabel id="project-label">Project Name</InputLabel>
          <Select
            labelId="project-label"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            fullWidth
            displayEmpty
            renderValue={(selected) => {
              if (!selected) return "Select project";
              const item = projects.find((p) => p.ProjectId === selected);
              return item ? item.name : "Select project";
            }}
            sx={{ mb: 2 }}
          >
            <MenuItem value="" disabled>
              Select project
            </MenuItem>
            {projects.map((p) => (
              <MenuItem key={p.ProjectId} value={p.ProjectId}>
                {p.name}
              </MenuItem>
            ))}
          </Select>
          {errors.project && (
            <Typography color="error" variant="caption">
              {errors.project}
            </Typography>
          )}
          <InputLabel id="notes">Notes</InputLabel>
          <TextField
            margin="dense"
            id="notes"
            label="Notes"
            type="text"
            fullWidth
            multiline
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            sx={{ mb: 2 }}
          />
          {errors.notes && (
            <Typography color="error" variant="caption">
              {errors.notes}
            </Typography>
          )}
          <Box>
            <StopWatch isRunning={isRunning} 
            elapsedTime={elapsedTime}
            start={start}
            stop={stop}
            reset={reset} 
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCancel} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            Add
          </Button>
        </DialogActions>
      </Card>
    </Dialog>
  );
};

export default ContinualTimeEntry;