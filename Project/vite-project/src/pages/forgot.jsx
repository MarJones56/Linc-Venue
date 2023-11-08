import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import React from 'react'
import Header from "./components/Header";


function Forgot() {
 
    const [email, setEmail] = useState()
    const navigate = useNavigate()
    axios.defaults.withCredentials = true;
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('https://working-art-gallery-server.onrender.com/forgot',{email})
        .then(res=>{
            if(res.data.Status==="Success"){
                if(res.data.role==="user"){
                    navigate('/')
                }else{
                    navigate('/Dashboard')
                }
            }
        }).catch(err=>console.log(err))
    }
    return (
        <div>
            <Header />

            <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
                <div className="bg-white p-3 rounded">
                    <h2>Forgot Password</h2>
                    <form onSubmit={handleSubmit}> 

                    <div className="mb-3">Enter the email address associated with your account<br></br>and we'll send you a link to reset your password.</div>
                    
                    
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


                    <div className="button-center">
                        <button className="button main-btn">Register</button>
                    </div>


                    </form>
                </div>
            </div>

        </div>
    );
}

export default Forgot;