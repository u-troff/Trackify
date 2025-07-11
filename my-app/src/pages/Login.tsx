import React, { useState } from "react";
import { Formik,Form,Field,ErrorMessage,useFormikContext } from "formik";
import * as Yup from 'yup'
import { TextField,Button,Box,Typography ,Link,InputLabel,styled} from "@mui/material";
import "../css/Login.css"
import Logo from  "../assets/Logo.png"
import {signInWithEmailAndPassword,sendPasswordResetEmail} from 'firebase/auth'
import { auth } from "../services/firebase";
import { useNavigate,Navigate } from "react-router-dom";
import { NavBar } from "../Redirect";
import { Bounce, ToastContainer,toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../Spinner/Spinner";
import { getUsers,GetSpecificUsers } from "../services/ApiCalls";


interface LoginValues{
    email: string;
    password: string;
}

const ForgotPasswordLink: React.FC=()=>{
    const {values} = useFormikContext<LoginValues>();

    const forgotPassword = async ()=>{
        if(!values.email){
            toast.error('Please enter your email address',{position: "top-center",autoClose: 3000, theme: "light", transition: Bounce});
        
            return;   
        }
        try{
            await sendPasswordResetEmail(auth,values.email);
            toast.success(`Password Reset link sent to ${values.email}`,{
                position: "top-center",
                autoClose: 3000,
                transition: Bounce,
            })
        }catch (error:any){
            console.error(error);
            toast.error('Error Occurred!');
        }
    
    }

    return(
    <Link onClick={forgotPassword} color="inherit" sx={{cursor: "pointer", '&:hover':{
        color: 'primary.main',
        transform: 'scale(1.10)',

    }}}>
        Forgot Password
    </Link>);
}



const Login: React.FC=()=>{
    const {currentUser,loading} = useAuth();//use to check if used is already authenticated
    const navigate = useNavigate();
    const [loginError,setLoginError] = useState<string |null>(null);
    const [isLoggingIn,setisLoggingIn] = useState<boolean>(false);
    const instialValues : LoginValues = {
        email:'',
        password:'',
    }
    
    //Validation schema used is YUP

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(7,'Password must be atleast 8 characters long'),
    });
    

    //Navigate Already Authenticated used to the login page
    if(!loading && currentUser){
        return<Navigate to="/dashboard"/>
    }



    const handleSubmit= async (values: LoginValues,{setSubmitting}:{setSubmitting:(isSubmitting:boolean)=>void})=>{
    setLoginError(null);
    setisLoggingIn(true);
    try{
        const userCredential = await signInWithEmailAndPassword(auth,values.email,values.password);
        const user = userCredential.user;
        if(user && user.uid){
            console.log("Login successful:" ,{uid: user.uid,email: user.email })
            console.log("uid", user.uid);
            setTimeout(()=>{
                navigate('/dashboard');
            },1000);
            setLoginError(null);
            //getUsers();
            GetSpecificUsers(user.uid);
        }
    }catch (error){
        console.log('Login error',error);
        setLoginError("Invalid email or password");
        setSubmitting(false);
        setisLoggingIn(false);
        navigate('/');
    }
    }

    const LogoImage = styled('img')({
        width:150,
        height:'auto',
        maxWidth:'100%',
        borderRadius:10,
    })

    

    return (
      <>
        <Box sx={{ backgroundColor: "#2f2f2f" ,minHeight:'100vh'}}>
          <NavBar />
          {isLoggingIn || loading ? (
            <Spinner />
          ) : (
            <Box
              sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 3,
              }}
            >
              <Box
                sx={{
                  maxWidth: 400,
                  width: "100%",
                  boxShadow: 3,
                  p: 4,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  backgroundColor: "#d9d9d9",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mx: "auto",
                  height: 600,
                  gap: 2,
                }}
              >
                <LogoImage src={Logo} alt="Tu Track" />

                <Typography
                  sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                  gutterBottom
                  variant="h5"
                  component="h1"
                >
                  Login
                </Typography>
                <Formik
                  initialValues={instialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ isSubmitting }) => (
                    <Form>
                      <InputLabel id="email">Email</InputLabel>
                      <Box mb={2} sx={{ textAlign: "center" }}>
                        <Field
                          as={TextField}
                          name="email"
                          placeholder="Email"
                          variant="outlined"
                          fullwidth="true"
                          helperText={<ErrorMessage name="email" />}
                          error={Boolean(<ErrorMessage name="email" />)}
                        />
                      </Box>
                      <Box
                        mb={2}
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <InputLabel id="email" sx={{ textAlign: "left" }}>
                          Password
                        </InputLabel>
                        <Field
                          as={TextField} // cannot use a normal input here as the Textfield component in MUI has extra features which couple with ErrorMessage
                          name="password"
                          type='password'
                          placeholder="Password"
                          variant="outlined"
                          fullwidth="true"
                          helperText={<ErrorMessage name="password" />}
                          error={Boolean(<ErrorMessage name="password" 
                          />)}
                        />
                        <Box sx={{ mt: 2 }}>
                          {loginError && (
                            <Typography color="error">{loginError}</Typography>
                          )}
                          <ForgotPasswordLink />
                        </Box>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{
                            alignContent: "center",
                            textAlign: "center",
                            fontSize: 20,
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Login"}
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>

                <ToastContainer />
              </Box>
            </Box>
          )}
        </Box>
      </>
    );
}


export default Login;