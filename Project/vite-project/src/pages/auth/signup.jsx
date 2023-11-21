import axios from "axios";
import { useRef } from "react";
import {Link, useNavigate} from 'react-router-dom'
import Header from "../components/Header";
import { useState } from "react";
import {  signInWithPopup, GoogleAuthProvider,FacebookAuthProvider, signInWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';


export default function SignUp() {
    const [username, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [fname, setFName] = useState()
    const [lname, setLName] = useState()
    const [role, setRole] = useState()
    const [gender, setGender] = useState()
    const [age, setAge] = useState()
    const [passAgain, setPA] = useState()
    const navigate = useNavigate();
    const googleprovider = new GoogleAuthProvider();

    const socialLogin = (email) =>{
        axios.post("http://localhost:5000/login",{email,password},)
    .then(res=>{
        if(res.status === 200){
            //localStorage.setItem('user', JSON.stringify(res.data))
            console.log(res.data.role);
                console.log(res.data);
                console.log(res.data._id);
                //setUser(res.data);
                console.log(res.data);
                localStorage.setItem('user', JSON.stringify(res.data))
                navigate('/Dashboard')
            
        }
    }).catch(err=>console.log(err))
    }

    const googleSignIn=()=>{
        signInWithPopup(auth, googleprovider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                socialLogin(user.email)
                
                localStorage.setItem('user', JSON.stringify(result.data))
                navigate("/Dashboard")
            }).catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);
            });
    }

  const handleClick = async (e) => {
    e.preventDefault();
    if (passAgain !== password) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      try {
        console.log(username,email)
        await axios.post("http://localhost:5000/register",{username, email, password, fname, lname, role, gender, age}, 
        {withCredentials: true,
        credentials: 'include',
      });
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

    return (
        <div><Header />
        <div className="d-flex justify-content-center align-items-center bg-secondary ">
            <div className="bg-white p-3 rounded ">
                <h2>Register</h2>
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
                        required
                        id="roundedTB"
                        className="form-control"
                        onChange={(e)=> setEmail(e.target.value)}
                        
                    />
                </div> 


                <div className="mb-3">
                    <label htmlFor="fname">
                        <strong>First Name</strong>
                    </label>
                    <input 
                        type="text"
                        placeholder="Enter First Name"
                        autoComplete="off"
                        name="fname"
                        required
                        id="roundedTB"
                        className="form-control"
                        onChange={(e)=> setFName(e.target.value)}
                       
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="lname">
                        <strong>Last Name</strong>
                    </label>
                    <input 
                        type="text"
                        placeholder="Enter Last Name"
                        autoComplete="off"
                        name="lname"
                        required
                        id="roundedTB"
                        className="form-control"
                        onChange={(e)=> setLName(e.target.value)}
                        
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="username">
                        <strong>Username</strong>
                    </label>
                    <input 
                        type="text"
                        placeholder="Enter Name"
                        autoComplete="off"
                        name="username"
                        required
                        id="roundedTB"
                        className="form-control"
                        onChange={(e)=> setName(e.target.value)}
                        
                    />
                </div>


                <div className="mb-3">
                    <label htmlFor="age">
                        <strong>Age</strong>
                    </label>
                    <input 
                        type="number"
                        placeholder="Enter age"
                        autoComplete="off"
                        name="age"
                        required
                        id="roundedTB"
                        className="form-control"
                        onChange={(e)=> setAge(e.target.value)}
                       
                    />
                    {/* do we need an age thing? */}

                <div><br></br></div>
                <div onChange={(e)=> setRole(e.target.value)}>
                    <div><strong>Role</strong></div>
                    <input type="radio" value="User" id="accent" name="role"/> 
                    <label htmlFor="User">User</label>
                    &emsp;
                    <input type="radio" value="Venue Owner" id="accent" name="role"/>
                    <label htmlFor="Venue Owner">Venue Owner</label>
                </div>


                <div onChange={(e)=> setGender(e.target.value)}>
                    <div><strong>Gender</strong></div>
                    <input type="radio" value="Male" id="accent" name="Gender"/> < label htmlFor="Male">Male</label>
                    &emsp;
                    <input type="radio" value="Female" id="accent" name="Gender"/> < label htmlFor="Female">Female</label>
                    &emsp;
                    <input type="radio" value="Other" id="accent" name="Gender"/> < label htmlFor="Other">Other</label>
                </div>



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
                        required
                        id="roundedTB"
                        className="form-control"
                        onChange={(e)=> setPassword(e.target.value)}
                        
                    />
                </div>  

                <div className="mb-3">
                    <label htmlFor="password">
                        <strong>Confirm Password</strong>
                    </label>
                    <input 
                        type="password"
                        placeholder="Enter Password Again"
                        autoComplete="off"
                        name="passwordAgain"
                        required
                        id="roundedTB"
                        className="form-control"
                        onChange={(e)=> setPA(e.target.value)}
                       
                    />
                </div>  
            
                    <div className="button-center">
                        <button className="button main-btn" type="submit">Register</button>
                    </div>


                <div className="mb-3">Already have an account?
                <Link to="/login">
                    <p>Login</p>
                </Link></div>
                </form>

                {/* <button
                        className='bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring focus:ring-red-400 focus:ring-opacity-50 mt-4'
                        onClick={googleSignIn}
                    >
                        <div className='flex'>
                            <text>Continue with Google</text>
                            <img src="https://img.icons8.com/material/24/ffffff/google-logo--v1.png"/>
                        </div>
                    </button> */}


            </div>
        </div>
    </div>
    );
}
