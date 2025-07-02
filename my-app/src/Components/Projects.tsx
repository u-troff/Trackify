import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Card, IconButton } from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { GetProjects } from "../services/ApiCalls";
import { CreateProject } from "./CreateProject";
import { auth } from "../services/firebase";
import { Spinner } from "../Spinner/Spinner";
import { QueryClient, useQuery,useQueryClient } from "@tanstack/react-query";

export interface Props {
  name: string;
  description: string;
  time_spent?: number;
  ProjectId?:string;
}

const Project: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const userId = auth.currentUser?.uid;
  const {data:projects=[],isLoading,error}=useQuery<Props[],Error>({
    queryKey: ['projects',userId],
    queryFn:()=>GetProjects(userId!),
    enabled:!!userId,//only run query if userId exists
    //staleTime:5*60*1000,// data considered fresh for 5 min
  })
  const handleClickOpen = () => {
    setOpen(true);
  };

  //handles the refresh after creating a project
  //check it again
  const queryClient = useQueryClient();
  const handleCreateSuccess=()=>{
    queryClient.invalidateQueries({queryKey:['projects',userId]});
  }

  const handleNavigation: React.FC = () => {
    
    return <></>;
  };

  if (open) {
    //setReload(true);
    return <CreateProject open={open} setOpen={setOpen} handleSuccess={handleCreateSuccess}/>;
  }
  //Figure out how to load when in the card

  if(error){
    return(<>
      <Box sx={{mt:8,ml:"200px"}}>
        <Typography color="error">
          Error loading projecs: {error.message}
        </Typography>
      </Box>
    </>);
  }

  return (
    <>
      <Box>
        <Box sx={{ mt: 8, display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
              Projects
            </Typography>
            <Typography variant="h5" sx={{}}>
              overview of your projects
            </Typography>
          </Box>
          <Button
            sx={{
              bgcolor: "black",
              boxShadow: 4,
              color: "white",
              width: "10vw",
              height: "auto",
              maxWidth: 300,
              borderRadius: 5,
            }}
            onClick={handleClickOpen}
          >
            Add new
          </Button>
        </Box>
        <Box sx={{ p: 4 }} />

        {isLoading ? (
            <Spinner />
        ) : (
          <>
            {projects.map((p) => (
              <Card sx={{ p: 2, mb: 1, boxShadow: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <IconButton onClick={handleNavigation}>
                    <EditNoteIcon sx={{ fontSize: 60 }} />
                  </IconButton>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                    }}
                  >
                    <Typography>{p.name}</Typography>
                    <Typography>{p.description}</Typography>
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography variant="h6">{p.time_spent}h</Typography>
                  </Box>
                </Box>
              </Card>
            ))}
          </>
        )}
      </Box>
    </>
  );
};

export default Project;
