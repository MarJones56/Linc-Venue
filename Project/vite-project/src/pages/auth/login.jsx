import "bootstrap/dist/css/bootstrap.min.css";
import {Link, useNavigate} from 'react-router-dom'
import React from 'react'
import Header from "../components/Header";
import { useContext, useRef } from "react";
//import { AuthContext } from "../../context/AuthContext"
import { useState } from "react";
import axios from 'axios'
import { UserContext } from "../components/UserContext";
import {  signInWithPopup, GoogleAuthProvider,FacebookAuthProvider, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';


function Login() {
    localStorage.setItem('test', 'test')
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()
    //const { isFetching, dispatch } = useContext(AuthContext);
    axios.defaults.withCredentials = true;
    const {setUser} = useContext(UserContext);
    const googleprovider = new GoogleAuthProvider();

    const socialLogin = (email) =>{
        axios.post("http://localhost:5001/auth/login",{email,password},)
    .then(res=>{
        if(res.status === 200){
            //localStorage.setItem('user', JSON.stringify(res.data))
            console.log(res.data.role);
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify(res.data))
                navigate('/Dashboard')
            
        }
    }).catch(err=>console.log(err))
    }

    const googleSignIn=()=>{
        signInWithPopup(auth, googleprovider)
            .then(async (result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                const email=user.email; 
                console.log(result);
                console.log(email);
                try{
                    const userResult = await axios.post("http://localhost:5001/auth/Glogin/"+ email);
                    console.log(userResult);
                    if(res.status === 200){
                        console.log(res.data.role);
                        if(res.data.role==="Venue Owner"){
                            console.log(res.data);
                            console.log(res.data._id);
                            localStorage.setItem('user', JSON.stringify(res.data))
                            navigate('/venuedashboard')
                        }else if (res.data.role==="User"){
                            console.log(res.data);
                            console.log(res.data._id);
                            console.log(res.data);
                            localStorage.setItem('user', JSON.stringify(res.data))
                            navigate('/Dashboard')
                        } else{
                            setErrorMessage('Password Incorrect');
                            // Clear the error message after a certain time if needed
                            setTimeout(() => {
                                setErrorMessage('');
                            }, 1000);
                            console.log("incorrect password Ben");
                            navigate('/login');
                        }
                    }
                    
                }catch(err){
                    console.log(err);
                }
                // console.log(user.email);
                // socialLogin(user.email)
                
                // localStorage.setItem('user', JSON.stringify(result.data))
                // console.log(user.data)
                // navigate("/Dashboard")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

  const handleClick = (e) => {
    e.preventDefault()
    axios.post("http://localhost:5001/auth/login",{email,password},)

    .then(res=>{
        if(res.status === 200){
            console.log(res.data.role);
            if(res.data.role==="Venue Owner"){
                console.log(res.data);
                console.log(res.data._id);
                localStorage.setItem('user', JSON.stringify(res.data))
                navigate('/venuedashboard')
            }else if (res.data.role==="User"){
                console.log(res.data);
                console.log(res.data._id);
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify(res.data))
                navigate('/Dashboard')
            } else{
                setErrorMessage('Password Incorrect');
                // Clear the error message after a certain time if needed
                setTimeout(() => {
                    setErrorMessage('');
                }, 1000);
                console.log("incorrect password Ben");
                navigate('/login');
            }
        }
    }).catch(err=>console.log(err))
  };
    return (
        <div>
        <Header />

        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100" >
                <div className="bg-white p-3 rounded ">
                    <h2>Welcome Back!</h2>
                    <p>Enter your email and password to sign in.</p>
                    <form onSubmit={handleClick}> 

                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input 
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            id="roundedTB"
                            className="form-control"
                            onChange={(e)=> setEmail(e.target.value)}
                        />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input 
                            type="password"
                            placeholder="Enter Password"
                            autoComplete="off"
                            name="password"
                            id="roundedTB"
                            className="form-control"
                            onChange={(e)=> setPassword(e.target.value)}
                        /> 
                    </div>
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}


                    <Link to="/forgot" >
                        Forgot Password?
                    </Link>

                    <div><br></br></div>


                    <div className="button-center" type="submit">
                        <button className="button main-btn" type="submit">Log In</button>
                        {/* <button className="button main-btn" type="submit">Log In</button> </div> disabled={isFetching}>Log In</button> */}
                    </div>


                    <div><br></br></div>


                    <p>Don't have an account?</p>
                    <Link to="/register" >
                     <p>Sign Up</p>
                    </Link>
                    
                    
                    </form>
                    <button
                        className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50 mt-4'
                        onClick={googleSignIn}
                    >
                        <div className='flex'>
                            <text>Continue with Google</text>
                            <img src="https://img.icons8.com/material/24/ffffff/google-logo--v1.png"/>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;