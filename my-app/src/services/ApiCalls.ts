import {auth} from "./firebase"
import axios from 'axios'


const api_url = import.meta.env.VITE_BASE_API_URL;

const api = axios.create({
    baseURL: api_url,
    headers:{
        'Media-Type': 'application/json',
    }
})

//add this as a function and call it in each request so that it gets the latests token each time.
api.interceptors.request.use(async (config)=>{
    if(auth){
        const user = auth.currentUser;
        if(user){
            const token = await user.getIdToken();
            //console.log(token)
            config.headers.Authorization = `Bearer ${token}`;
            //console.log(config);

        }
    }
    return config;
})


//Add interceptor to accept tokens

interface Post{
    userId: string,
    name: string,
    email: string,
}
const getUsers = async ()=>{
    try{
        
        const response = await api.get('users');
        console.log("Data:",response.data, "Status",response.status);
    }catch (error){
        console.log("Error:",error.message,error.code,"URL",api.getUri());
    }
}

const POST= async (userId:string,name:string|null,email:string| null)=>{
    try{
        const response = await api.post('users',{"userId": userId,
            "name": name,
            "email": email,
        });
        console.log(response.data);
    }catch (err){
        console.log(err);
    }
}

const GetSpecificUsers = async (userId:string)=>{
    const path:string = `users/${userId}`
    try{
        const response = await api.get(path);
        //console.log("User",response.data,"Status",response.status);
    }catch (error){
        console.log(error);
    }

}

const PostProjects = async(userId:string,name:string,description:string)=>{
    const path:string = `projects`
    try{
        const response = await api.post(path,{
            "name": name,
            "userId": userId,
            "description": description
        });
        //console.log(response.data);
        return response.data;
    }catch (err){
        console.log(err);
    }
}


interface Props{
    name:string;
    description:string;
    time_spent?:number;
    ProjectId?:string;
}

const GetProjects = async (userId:string)=>{
    const path:string = `projects/user/${userId}`
    try{
        const response = await api.get(path);
        //console.log("Data",response.data,"Status",response.status);
        const SchemaDataArray = response.data;
        const Projects:Props[] = SchemaDataArray.map(item =>({
                name: item.name,
                description: item.description,
                time_spent:0.0,
                ProjectId:item.id,
        }
        ))
        //console.log(Projects);
        return Projects;
    }catch (err){
        console.log(err);
        throw err;
    }
}


const GetTimeEntry = async (userId:string)=>{
    const path:string = `time-entries/user/${userId}`
    try{
        const response = await api.get(path);
        //console.log("Data",response.data,"Status",response.status);
        return response.data;
    }catch (err){
        console.log(err);
        throw err;
    }
}

const GetSpecificTimeEntry = async(projectId:string)=>{
    const path:string = `time-entries/project/${projectId}`
    try{
        const response = await api.get(path);
        console.log("Data",response.data,"Status",response.status);
        return response.data;
    }catch (err){
        throw err;
    }
}



export interface TimeSchema{
    id?: string;
    projectId: string;
    userId: string;
    date:string;
    hours:number;
    minutes:number;
    notes:string;
}

const PostTimeEntry = async(props:TimeSchema)=>{
    const path:string = `time-entries/`
    try{
        const response = await api.post(path,{
            "projectId": props.projectId,
            "userId": props.userId,
            "date":props.date,
            "hours": props.hours,
            "minutes":props.minutes,
            "notes":props.notes,
        });
        console.log("Data",response.data,"Status",response.status);
        return response.data;
    }catch (err){
        throw err;
        
    }
}

const DeleteTimeEntry = async(id:string)=>{
    const path:string = `time-entries/${id}`;
    try{
        const response = await api.delete(path);
        console.log("Data",response.data,"Status",response.status);
    }catch (err){
        throw err;
    }

}


export {getUsers,POST,GetSpecificUsers,PostProjects,GetProjects,GetTimeEntry,PostTimeEntry,GetSpecificTimeEntry,DeleteTimeEntry}