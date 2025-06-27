import React, { createContext ,useContext,useEffect,useState} from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import type {User,Auth} from 'firebase/auth'
import {auth} from "../services/firebase"

interface AuthContextType{
    currentUser: User|null;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType>({currentUser:null,loading:false});

export const AuthProvider: React.FC<{children: React.ReactNode}> = ({children})=>{
    const [currentUser,setCurrentUser] = useState<User|null>(null);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        const unsub = onAuthStateChanged(auth,(user)=>{
            setCurrentUser(user);
            setLoading(false);
            
        })
    return ()=> unsub();
    },[])
/// you can make current User and if the page is loading available to the rest of application
    return(<AuthContext.Provider value={{currentUser,loading}} >
            {children}
    </AuthContext.Provider>);
}
// we create the context and then export it to be used in the rest of the program
export const useAuth = () => useContext(AuthContext);


