import React from "react";
import { Formik,Form,Field,ErrorMessage } from "formik";
import * as Yup from 'yup'
import { TextField,Button,Box,Typography,Alert } from "@mui/material";
import "../css/Login.css"

import {signInWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../services/firebase";
import { useNavigate } from "react-router";

interface LoginValues{
    email: string;
    password: string;
}


const Login: React.FC=()=>{
    const instialValues : LoginValues = {
        email:'',
        password:'',
    }

    //Validation schema used is YUP
    //fix the schema for password error display
    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(8,'Password must be atleast 8 characters long'),
    });
    const navigate = useNavigate();


    const handleSubmit= async (values: LoginValues,{setSubmitting}:{setSubmitting:(isSubmitting:boolean)=>void})=>{
        
        

    }

    return(
    <Box sx={{
        maxWidth:400,
        boxShadow: 2,
        p: 3,
        margin: 0,
        border: '1px solid #ccc',
        borderRadius: 2,
        mt: 4,
        mx:'auto',
        my: 'auto',
        
    }} className=".style" >
            <Typography sx={{
                textAlign: "center",
            }} gutterBottom variant="h5" component="h1">
                Login
            </Typography>
            <Formik initialValues={instialValues} onSubmit={handleSubmit}
            validationSchema={validationSchema}> 
                {
                    ({isSubmitting})=>(
                        <Form>
                            <Box mb={2} sx={{textAlign: "center",}}>
                                <Field as={TextField}
                                 name="email" placeholder="Email"
                                 variant="outlined"
                                 fullwidth = "true"
                                 helperText={<ErrorMessage name="email"/>}
                                 error = {Boolean(<ErrorMessage name="email"/>)}
                                 />
                                 
                            </Box>
                            <Box mb={2} sx={{
                                textAlign: "center",
                            }}>
                                <Field as={TextField}// cannot use a normal input here as the Textfield component in MUI has extra features which couple with ErrorMessage
                                 name="password" placeholder="Password"
                                 variant="outlined"
                                 fullwidth = "true"
                                 helperText={<ErrorMessage name="password"/>}
                                 error = {Boolean(<ErrorMessage name="password"/>)}
                                 
                                 />
                                <Box >
                                    <p>forgot Password</p>
                                </Box>
                            </Box>
                            
                            <Box display='flex' justifyContent="center" alignItems="center">
                            <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{
                                alignContent:"center",
                                textAlign:"center"
                            }}
                            disabled={isSubmitting}>
                                {
                                    isSubmitting?'Submitting...':'Sign Up'
                                }
                            </Button>
                            </Box>
                            


                        </Form>
                    )
                }

            </Formik>

        
    </Box>
    
    );
}


export default Login;