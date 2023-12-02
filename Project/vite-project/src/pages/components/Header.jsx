import {Link, useNavigate} from 'react-router-dom'
import { useState } from "react";
function Header() {

    if (localStorage.getItem('user') == undefined){
        localStorage.setItem('user', null)
        console.log("user is undefined")
    }
    
    const user = JSON.parse(localStorage.getItem('user')) || null;

    return (
        <div className='header'>
            <Link to="/"><img src='./images/logo.JPG'></img></Link>
            <div className="header-text">

            <Link to="/UserFilter" >Search</Link>&emsp;

            {user ? (
                <>
                    <Link to="/messenger">Messenger</Link>&emsp;

                    {/* Conditionally set the link based on user's role */}
                    <Link to={user.role === 'Venue Owner' ? '/venuedashboard' : '/dashboard'}>
                    Profile
                    </Link>
                    &emsp;

                    <Link to="/logout">Log Out</Link>
                </>
                ) : (
                <>
                    <Link to="/register">Sign up</Link>&emsp;
                    <Link to="/login">Sign In</Link>&emsp;
                </>
                )}
            {/* {user ? (
                <>
            <Link to="/messenger" >Messenger</Link>&emsp;

            <Link to="/dashboard" >Profile</Link>&emsp;

            <Link to="/logout">Log Out</Link>
            </>) : (<>
            <Link to="/register" >Sign up</Link>&emsp;

            <Link to="/login" >Sign In</Link>&emsp;

            </>)} */}
            </div>
        </div>
    );
}
export default Header;