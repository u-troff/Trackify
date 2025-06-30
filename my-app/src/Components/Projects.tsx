import React, { useState } from 'react'
import { Box,Typography,Button ,Card, IconButton} from '@mui/material';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { PostProjects } from '../services/ApiCalls';
import { CreateProject } from './CreateProject';

const Projects=[{name: "Project 1",description: "This is a description",time_spent:1.5},
    {name: "Project 2",description: "This is a description",time_spent:2}
];

interface Props{
    name:string;
    description:string;
    time_spent:number;
}



const Project: React.FC<Props[]> =(project?)=>{
    const [open,setOpen] = useState<boolean>(false);
    const handleClickOpen =()=>{
        setOpen(true);
    }
    
    if (open){
        return(<CreateProject open={open} setOpen={setOpen}/>);
    }
    return(<>
    <Box sx={{mt:8,display:'flex',justifyContent:'space-between'}}>
        <Box sx={{display:'flex',flexDirection:'column'}}>
            <Typography variant='h3' sx={{fontWeight:'bold'}}>
                Projects
            </Typography>
            <Typography variant='h5' sx={{}}>
                overview of your projects
            </Typography>
            
        </Box>
        <Button sx={{
            bgcolor:'black',
            boxShadow:4,
            color:'white',
            width:'10vw',
            height:'auto',
            maxWidth:300,
            borderRadius:5
        }}
        onClick={handleClickOpen}
        >Add new</Button>
       </Box>
       <Box sx={{p:4}}/>
        {Projects.map((p)=>(
                <Card sx={{p:2,mb:1,boxShadow:3}}>
                    <Box sx={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                    <IconButton>
                        <EditNoteIcon  sx={{fontSize:60}}/>
                    </IconButton>
                    <Box sx={{display:'flex',flexDirection:'column',flexGrow:1}}>
                        <Typography>
                        {p.name}
                        </Typography>
                        <Typography>
                            {p.description}
                        </Typography>
                    </Box>
                    <Box sx={{textAlign:'right'}}>
                    <Typography variant='h6'>
                        {p.time_spent}h
                    </Typography>
                    
                    </Box>
                </Box>
                </Card>
        ))}

            


        
    </>);
}

export default Project