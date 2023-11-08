import "bootstrap/dist/css/bootstrap.min.css";
import {Link, useNavigate} from 'react-router-dom'
import React from 'react'
import Header from "../components/Header";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext"
import { useState } from "react";
import axios from 'axios'


function Login() {
    localStorage.setItem('test', 'test')
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
    const { isFetching, dispatch } = useContext(AuthContext);
    axios.defaults.withCredentials = true;
  const handleClick = (e) => {
    e.preventDefault()
    axios.post('https://new-server-cvbw.onrender.com/auth/login',{email,password},)
    .then(res=>{
        if(res.status === 200){
            localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/')
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


                    <Link to="/forgot" >
                        Forgot Password?
                    </Link>

                    <div><br></br></div>


                    <div className="button-center" type="submit">
                        <button className="button main-btn" type="submit" disabled={isFetching}>Log In</button>
                    </div>


                    <div><br></br></div>


                    <p>Don't have an account?</p>
                    <Link to="/register" >
                     <p>Sign Up</p>
                    </Link>
                    
                    
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;