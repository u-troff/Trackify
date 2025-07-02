import React, { useState } from 'react'

import { Dialog,DialogTitle,DialogContent,DialogContentText,TextField,Button,DialogActions ,Card,Box,IconButton, Typography,InputLabel} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { PostProjects } from '../services/ApiCalls';
import { auth } from '../services/firebase';

interface Props{
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    handleSuccess:any

}

const CreateProject:React.FC<Props>=(Props)=>{
    const [projectName,setProjectName] = useState<string>('');
    const [projectDescription,setProjectDescription] = useState<string>('');
    const userId = auth.currentUser?.uid;
    const API_response = null;

    const handleSubmit=()=>{
      if(!projectName.trim()){
      alert("Project Name is required");
      return;
      }
      if(!projectDescription.trim()){
        alert("Project Description is required");
        return;
      }
      Props.setOpen(false);
      
      
      try{
        const API_response = PostProjects(userId,projectName,projectDescription);
        console.log(API_response);
        alert("You have created a Project!!")
        Props.handleSuccess();
      }catch (err){
        console.log(err);
      }finally{
        //setLoading(false);
      }

    }


    
    return(<>
        <Dialog open={Props.open} onClose={()=>Props.setOpen(false)} aria-labelledby="form-dialog-title" >
            <Card>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'start'}}>
        <Box>
        <DialogTitle id="form-dialog-title" variant='h4'>Create New Project</DialogTitle>
        <Typography sx={{ml:3}}>
            Add a new project to start tracking time
          </Typography>
        </Box>
        <IconButton onClick={()=>Props.setOpen(false)}>
            <CloseIcon sx={{fontSize:60}}/>
        </IconButton>
        </Box>
        
        <DialogContent>
        <InputLabel id="project-label" >Project Name</InputLabel>
          <TextField
            autoFocus
            margin="dense"
            id="project-label"
            label="Project Name"
            type="text"
            fullWidth
            required
            onChange={(e)=>setProjectName(e.target.value)}
          />
          <InputLabel id="description" >Description</InputLabel>
            <TextField
            autoFocus
            margin="dense"
            id="description"
            multiline
            rows={6}
            label="description"
            type="description"
            fullWidth
            required
            onChange={(e)=>setProjectDescription(e.target.value)}

          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>{Props.setOpen(false)
            
          }} color="primary" variant='outlined'>
            Cancel
          </Button>
          <Button onClick={handleSubmit
          } color="primary" variant='contained'>
            Create Project
          </Button>
        </DialogActions>

        </Card>
      </Dialog>
    </>);
}

export {CreateProject}