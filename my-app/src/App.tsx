
//import {Button,Typography,Container} from '@mui/material';
import './App.css'
import React, { useState } from 'react'
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
      //const [selectedProjectId, setSelectedProjectId] = useState<string>("1");
      const path:string = `/time-tracking/?projectId=<id>`
      const [Avg,setAvg] = useState<number>(0)

      return (
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<Dashboard setAverage={setAvg} />} />
              <Route
                path="/time-tracking"
                element={
                  <TimeTracking
                    path="/time-tracking"
                  />
                }
              />
              <Route path="/reports" element={<Reports Avg={Avg} setAverage={setAvg}/>} />
            </Route>
          </Routes>
        </AuthProvider>
      );
    
}

export default App





