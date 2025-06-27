import {auth} from "./firebase"
import axios from 'axios'
import { useAuth } from "../context/AuthContext"


const api_url = import.meta.env.VITE_BASE_API_URL;

const api = axios.create({
    baseURL: api_url,
    headers:{
        'Media-Type': 'application/json',
    }
})
api.interceptors.request.use(async (config)=>{
    if(auth){
        const user = auth.currentUser;
        if(user){
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
            console.log(config);

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
    const path:string = `users/{${userId}}`
    try{
        const response = await api.get(path);
        console.log("User",response.data,"Status",response.status);
    }catch (error){
        console.log(error);
    }

}


export {getUsers,POST,GetSpecificUsers}