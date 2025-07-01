
//import {Button,Typography,Container} from '@mui/material';
import './App.css'
import React from 'react'
//import API from "./services/firebase"
import SignUp from './pages/SignUp'
import { Route,Routes } from 'react-router-dom'
import Login from "./pages/Login"
import Dashboard from './pages/Dashboard'
//import type {FormikHelpers} from 'formik'
//import {createBrowserRouter} from "react-router"
import { AuthProvider,useAuth } from './context/AuthContext'
import { ProtectedRoute } from './Redirect'
import TimeTracking from './pages/TimeTracking'
import Reports from './pages/Reports'


const App: React.FC = ()=> {
      
      return (
        <AuthProvider>
        <Routes>
            <Route path='/' element={<Login/>}/>
              <Route path='/login' element={<Login/>}/>
              <Route path='/sign-up' element={<SignUp/>}/>
              <Route element={<ProtectedRoute/>}>
                <Route path ='/dashboard' element={<Dashboard/>}/>
                <Route path ='/time-tracking' element={<TimeTracking/>}/>
                <Route path ='/reports' element={<Reports/>}/>
                
              </Route>
            
        </Routes>
        </AuthProvider>
          
        
  );
    
}

export default App





