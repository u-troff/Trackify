
import {Button,Typography,Container} from '@mui/material';
import './App.css'
import React from 'react'
import { Formik, Field, Form } from 'formik';
import type {FormikHelpers} from 'formik'
import {createBrowserRouter} from "react-router"


const App: React.FC = ()=> {
    const apiurl = import.meta.env.BASE_URL;
      
      return (
        <>
        <h1> </h1>{console.log(apiurl)}
        </>
  );
    
}

export default App





