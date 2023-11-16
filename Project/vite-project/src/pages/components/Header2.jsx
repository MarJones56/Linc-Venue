import {Link, useNavigate} from 'react-router-dom'
import { useState, useContext } from "react";
import { UserContext } from '../components/UserContext';
function Header2() {
  const { user, updateUser } = useContext(UserContext);
  //const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  return (
      <div className='header'>
          <Link to="/"><img src='./images/logo.JPG'></img></Link>
          <div className="header-text">

          <Link to="/UserFilter" >Filter</Link>&emsp;

          {user ? (
              <>
          <Link to="/messenger" >Messenger</Link>&emsp;

          <Link to="/dashboard" >Profile</Link>&emsp;

          <Link to="/logout">Log Out</Link>
          </>) : (<>
          <Link to="/register" >Sign up</Link>&emsp;

          <Link to="/login" >Sign In</Link>&emsp;

          </>)}
          </div>
      </div>
  );
}
export default Header2;