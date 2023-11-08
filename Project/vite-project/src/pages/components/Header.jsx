import {Link, useNavigate} from 'react-router-dom'
function Header() {
    return (
        <div className='header'>
            <Link to="/"><img src='./images/logo.JPG'></img></Link>
            <div className="header-text">
            <Link to="/messenger" >Messenger</Link>&emsp;
            <Link to="/UserFilter" >Filter</Link>&emsp;
            <Link to="/register" >Sign up</Link>&emsp;
            <Link to="/login" >Sign In</Link>&emsp;
            <Link to="/dashboard" >Profile</Link>&emsp;

            
            </div>
        </div>
    );
}
export default Header;