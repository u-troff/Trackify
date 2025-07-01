{
/*This form doesnt work for a dialog box */


}




import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Box,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
  Typography,
  InputLabel
} from "@mui/material";
import {auth} from "../services/firebase"
import { GetProjects } from "../services/ApiCalls";
import type {Props} from "../Components/Projects"
import { useQuery } from "@tanstack/react-query";
import { PostTimeEntry } from "../services/ApiCalls";
import type { TimeSchema } from "../services/ApiCalls";
interface FormValues {
  project: string;
  notes: string;
  hours: number;
  minutes: number;
}
//use react query to load in the projects
interface ManualTimeEntryFormProps {
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
}

const ManualTimeEntryForm: React.FC<ManualTimeEntryFormProps> = ({
  onSubmit,
  onCancel,
}) => {
  
  /*Start of function */
  //const [currentProject,setCurrentProject] = useState<string>("1");
  // const handleChange=(event:any)=>{
  //   setCurrentProject(event.target.value);
  // }
  //console.log(currentProject);
  const initialValues: FormValues = {
    project: "",
    notes: "",
    hours: 0,
    minutes: 0,
  };

  const validationSchema = Yup.object({
    project: Yup.string().required("Project is required"),
    description: Yup.string().required("Description is required"),
    hours: Yup.number()
      .min(0, "Hours must be at least 0")
      .max(23, "Hours cannot exceed 23")
      .required("Hours are required"),
    minutes: Yup.number()
      .min(0, "Minutes must be at least 0")
      .max(59, "Minutes cannot exceed 59")
      .required("Minutes are required"),
  });
  const userId = auth.currentUser?.uid;
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<Props[]>({
    queryKey: ["projects", userId],
    queryFn: () => GetProjects(userId!),
    enabled: !!userId,
    staleTime: 1 * 60 * 1000,
  });

  console.log(initialValues); 
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <DialogContent>
            <Typography variant="body2" sx={{ mb: 2 }}>
              Add time entries manually
            </Typography>
            <InputLabel id="project-label">Project Name</InputLabel>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Field
                as={Select}
                name="project"
                label="project-label"
                displayEmpty
                fullWidth
                //value={currentProjectId}
                //onChange={handleChange}
                renderValue={()=>"All projects"}
              >
                <MenuItem value='' disabled>
                  Select project
                </MenuItem>
                {projects.map((p) => (
                  <MenuItem value={p.ProjectId}>{p.name}</MenuItem>
                ))}
              </Field>
            </FormControl>
            <InputLabel id="notes">Notes</InputLabel>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <Field
                as={TextField}
                name="notes"
                label="Notes"
                fullWidth
                rows={3}
                multiline
              />
              {/*<ErrorMessage name="notes" component="div"/> */}
            </FormControl>
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  name="hours"
                  label="Hours"
                  type="number"
                  fullWidth
                />
                <ErrorMessage name="hours" component="div" />
              </FormControl>
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  name="minutes"
                  label="Minutes"
                  type="number"
                  fullWidth
                />
                <ErrorMessage name="minutes" component="div" />
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onCancel} variant="outlined">
              Cancel
            </Button>
            {/*
            <Button type="submit" disabled={isSubmitting} variant="contained">
              Add and Continue
            </Button>*/}
            <Button type="submit" disabled={isSubmitting} variant="contained">
              Add
            </Button>
          </DialogActions>
        </Form>
      )}
    </Formik>
  );
};

export default ManualTimeEntryForm;
