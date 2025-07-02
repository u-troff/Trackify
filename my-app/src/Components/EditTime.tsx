import React, { useEffect, useState } from "react";
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
import { GetProjects ,GetTimeEntry} from "../services/ApiCalls";
import type { Props } from "../Components/Projects";
import { useQuery,useQueryClient } from "@tanstack/react-query";
import type { TimeEntry } from "../pages/TimeTracking";

interface FormValues {
  project: string;
  notes: string;
  hours: number;
  minutes: number;
}

interface ManualTimeEntryFormProps {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  TimeId:TimeEntry|undefined;
}

const EditEntry: React.FC<ManualTimeEntryFormProps> = ({
  onSubmit,
  onCancel,
  TimeId,
}) => {

    if(TimeId===undefined)return;

  const [project, setProject] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
    
  const userId = auth.currentUser?.uid;
  const queryClient= useQueryClient();
  //get all the time entries and find the specific one to edit
  const { data: rawTimeEntries = [], isLoading: isTimeEntriesLoading } =
    useQuery({
      queryKey: ["time-entries/user/", userId],
      queryFn: () => GetTimeEntry(userId!),
    });

    const {
        data: projects = [],
        isLoading,
        error,
        isSuccess:SuccessfullyCreated,
      } = useQuery<Props[]>({
        queryKey: ["projects", userId],
        queryFn: () => GetProjects(userId!),
        enabled: !!userId,
      });
  //add the patch query here
    const EditingThisProject = rawTimeEntries.find((item)=>item.id===TimeId.id);
    

    const ProjectName = projects.find((item)=>item.ProjectId===EditingThisProject.projectId);

    //console.log(ProjectName);

    useEffect(()=>{
        setNotes(TimeId.notes);
        setProject(EditingThisProject.projectId);
        setHours(EditingThisProject.hours);
        setMinutes(EditingThisProject.minutes);
    },[])

  const validateForm = () => {
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
    if (minutes < 0 || minutes > 59) {
      newErrors.minutes = "Minutes must be between 0 and 59";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
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
    }
  };
  
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
              Edit Time Entry
            </DialogTitle>
            <Typography sx={{ ml: 3, mb: 2 }}>
              Edit time entries manually
            </Typography>
          </Box>
          <IconButton onClick={onCancel}>
            <CloseIcon sx={{ fontSize: 60 }} />
          </IconButton>
        </Box>
        <DialogContent>
          <InputLabel id="project-label">Project Name</InputLabel>
          <TextField
            margin="dense"
            id={ProjectName?.ProjectId}
            label="Project Name"
            type="text"
            fullWidth
            value={ProjectName?.name}
            sx={{ mb: 2 }}
            disabled
          />
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
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <Box sx={{ flex: 1 }}>
              <TextField
                margin="dense"
                id="hours"
                label="Hours"
                type="number"
                fullWidth
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
              />
              {errors.hours && (
                <Typography color="error" variant="caption">
                  {errors.hours}
                </Typography>
              )}
            </Box>
            <Box sx={{ flex: 1 }}>
              <TextField
                margin="dense"
                id="minutes"
                label="Minutes"
                type="number"
                fullWidth
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
              />
              {errors.minutes && (
                <Typography color="error" variant="caption">
                  {errors.minutes}
                </Typography>
              )}
            </Box>
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

export default EditEntry;
