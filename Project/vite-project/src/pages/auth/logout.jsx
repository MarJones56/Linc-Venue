import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { UserContext } from '../components/UserContext';

function LogOut() {
    const {setUser}  = useContext(UserContext);

    const handleClick = async (e) => {
        //setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('user2');
        
        //localStorage.setItem('user', null)
    };

    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100" >
            <div className="bg-white p-3 rounded ">

                <h2>Logging Out?</h2>

                <div className="button-center">
                    <Link to="/">
                <button className="button main-btn" type="submit" onClick={handleClick}>Log Out</button>
                    </Link>
                </div>
                <div className="button-center">
                    <Link to="/">
                <button className="button secondary-btn" type="submit">Go Back</button>
                    </Link>
                </div>


            </div>
        </div>
    )

} export default LogOut;