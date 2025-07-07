import { Formik,Form,Field,ErrorMessage } from "formik";
import * as Yup from 'yup'
import { TextField,Button,Box,Typography ,styled,InputLabel} from "@mui/material";
import "../css/SignUp.css"
import {createUserWithEmailAndPassword,sendEmailVerification} from 'firebase/auth'
import { auth, db } from "../services/firebase";
//import { getDocs, collection } from "firebase/firestore";
import { useNavigate } from "react-router";
import { NavBar } from "../Redirect";
import { Spinner } from "../Spinner/Spinner";
import { useState } from "react";
import { POST } from "../services/ApiCalls";
import Logo from "../assets/Logo.png";

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
    const navigate = useNavigate();
    
    const [isSigningUp,setIsSigningUp] = useState(false);
    //Validation schema used is YUP
    //fix the schema for password error display
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required').min(2,'Name must be at least 2 characters'),
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string().required('Password is required').min(8,'Password must be atleast 8 characters long'),
    });
    const handleSubmit= async (values: SignUpValues,{setSubmitting}:{setSubmitting:(isSubmitting:boolean)=>void})=>{
        setIsSigningUp(true);
        console.log("awe");
        
        
        try{
        console.log('testing')
            const userCredential = await createUserWithEmailAndPassword(auth,values.email,values.password);
            const user = userCredential.user;
            console.log('User signed up:',{uid:user.uid,email:user.email,name:values.name});
            console.log(user);
            await sendEmailVerification(user);
            POST(user.uid,values.name,user.email);
            //alert('Sign-up successful! Check your email for verification');
            setSubmitting(false);
            setTimeout(
                ()=>{
                    navigate('/dashboard');
                },1000);
        }catch (error){
            //alert("sign-up failed" + error.message)
            console.log("error");
            setSubmitting(false);
            setIsSigningUp(false);
        }
        
        //clear values after you have signed up a user


    }

    const LogoImage = styled("img")({
      width: 150,
      height: "auto",
      maxWidth: "100%",
      borderRadius: 10,
    });


    return (
      <>
        <Box sx={{ backgroundColor: "#2f2f2f", minHeight: "100vh" }}>
          <NavBar />
          {isSigningUp ? (
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
                  height: 650,
                  gap: 2,
                }}
                className=".style"
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
                  Signup
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
                          fullwidth
                          helperText={<ErrorMessage name="email" />}
                          error={Boolean(<ErrorMessage name="email" />)}
                        />
                      </Box>
                      <InputLabel id="name">Name</InputLabel>
                      <Box mb={2} sx={{ textAlign: "center" }}>
                        <Field
                          as={TextField}
                          name="name"
                          placeholder="Name"
                          variant="outlined"
                          fullwidth
                          helperText={<ErrorMessage name="name" />}
                          error={Boolean(<ErrorMessage name="name" />)}
                        />
                      </Box>
                      <InputLabel id="password">Password</InputLabel>
                      <Box
                        mb={2}
                        sx={{
                          textAlign: "center",
                        }}
                      >
                        <Field
                          as={TextField} // cannot use a normal input here as the Textfield component in MUI has extra features which couple with ErrorMessage
                          name="password"
                          placeholder="Password"
                          type="password"
                          variant="outlined"
                          fullwidth
                          helperText={<ErrorMessage name="password" />}
                          error={Boolean(<ErrorMessage name="password" />)}
                        />
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        sx={{p:2,mb:3}}
                      >
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{
                            alignContent: "center",
                            textAlign: "center",
                            fontSize:20,
                          }}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Submitting..." : "Sign Up"}
                        </Button>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          )}
        </Box>
      </>
    );
}


export default SignUp