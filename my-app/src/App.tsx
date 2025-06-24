
//import {Button,Typography,Container} from '@mui/material';
import './App.css'
import React from 'react'
//import API from "./services/firebase"
import SignUp from './pages/SignUp'
import { Route,Routes } from 'react-router-dom'
import Login from "./pages/Login"
import Redirect from './Redirect'
//import type {FormikHelpers} from 'formik'
//import {createBrowserRouter} from "react-router"


const App: React.FC = ()=> {
    //const apiurl = import.meta.env;
    
      
      return (
        <Routes>
            <Route path='/' element={<Redirect/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/sign-up' element={<SignUp/>}/>
        </Routes>
          
        
  );
    
}

export default App





