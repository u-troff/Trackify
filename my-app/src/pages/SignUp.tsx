import React from "react";
import { Formik,Form,Field,ErrorMessage } from "formik";
import * as Yup from 'yup'
import { TextField,Button,Box,Typography } from "@mui/material";
import "../css/SignUp.css"

import {createUserWithEmailAndPassword} from 'firebase/auth'
import { auth } from "../services/firebase";

interface SignUpValues{
    name: string;
    email: string;
    password: string;
}


const SignUp: React.FC=()=>{
    const instialValues : SignUpValues = {
        name: '',
        email:'',
        password:'',
    }
    //Validation schema used is YUP
    //fix the schema for password error display
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required').min(2,'Name must be at least 2 characters'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(8,'Password must be atleast 8 characters long'),
    });
    const handleSubmit= async (values: SignUpValues,{setSubmitting}:{setSubmitting:(isSubmitting:boolean)=>void})=>{
        console.log("awe")
        try{
        console.log('testing')
            const userCredential = await createUserWithEmailAndPassword(auth,values.email,values.password);
            const user = userCredential.user;
            console.log('User signed up:',{uid:user.uid,email:user.email,name:values.name});
            console.log(user);
            alert('Sign-up successful! Check your email for verification');
            setSubmitting(false);

        }catch (error){
            //alert("sign-up failed" + error.message)
            setSubmitting(false);
        }

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
                Signup
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
                                 fullwidth
                                 helperText={<ErrorMessage name="email"/>}
                                 error = {Boolean(<ErrorMessage name="email"/>)}
                                 />
                                 
                            </Box>
                            <Box mb={2} sx={{textAlign: "center",}}>
                                <Field as={TextField}
                                 name="name" placeholder="Name"
                                 variant="outlined"
                                 fullwidth
                                 helperText={<ErrorMessage name="name"/>}
                                 error = {Boolean(<ErrorMessage name="name"/>)}
                                 
                                 />

                            </Box>
                            <Box mb={2} sx={{
                                textAlign: "center",
                            }}>
                                <Field as={TextField}// cannot use a normal input here as the Textfield component in MUI has extra features which couple with ErrorMessage
                                 name="password" placeholder="Password"
                                 variant="outlined"
                                 fullwidth
                                 helperText={<ErrorMessage name="password"/>}
                                 error = {Boolean(<ErrorMessage name="password"/>)}
                                 
                                 />

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


export default SignUp