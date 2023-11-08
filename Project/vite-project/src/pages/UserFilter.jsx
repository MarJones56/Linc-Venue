import {Link, useNavigate} from 'react-router-dom'
import Header from "./components/Header";

function UserFilter(){

    return(

        <div>
            <Header />

            <div className="main">
                <div className="filterPages">   
                <Link to="/UserFilter" ><h2>User Filter</h2></Link>&emsp;
                        <h2>Activity Filter</h2>
                        <h2>Venue Filter</h2>
                </div>
                <div className="filters">    
                    <h1>Filters</h1>
                </div>
                <div className="searchResults">    
                    <h1> SEARCH RESULTS</h1>
                </div>   
            </div>
        </div>
    );
} export default UserFilter;