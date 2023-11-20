import {Link, useNavigate} from 'react-router-dom'
import React, { useState } from 'react';
import Header from "./components/Header";
import UserCard from './components/Users/UserCard';
import axios from 'axios';

function UserFilter(){

    const [filteredUsers, setFilteredUsers] = useState([]);
    const navigate = useNavigate();

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    const handleUserFilter = async (category, value) => {
        let filterCriteria = {};
        if (category === 'gender' || category === 'age') {
            filterCriteria = {
                [category]: value,
            };
        }
        console.log(filterCriteria);
        const queryString = new URLSearchParams(filterCriteria).toString();
        console.log(queryString);
        axios
            .get(`http://localhost:5000/api/userinfos?${queryString}`)
            .then((response) => {
                setFilteredUsers(response.data);
            })
            .catch((error) => {
                console.error('Error fetching users:', error);
            });
        // axios
        //     .get(`http://localhost:5000/api/userinfos?${queryString}`)
        //     .then((response) => {
        //         if (response.status != 200) {
        //             throw new Error(`Request failed: ${response.status} `);
        //         }
        //         return response.json();
        //     })
        //     .then((users) => {
        //         setFilteredUsers(users);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching users:', error);
        //     });
        
        setCurrentPage(1);
    };

    const handleShowAllUsers = async () => {
        handleUserFilter('gender', ''); // Example: Set to an empty value for all users
    };

    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    // Pagination
    const indexOfLastUser = currentPage * itemsPerPage;
    const indexOfFirstUser = indexOfLastUser - itemsPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        }
    };

    // JavaScript to toggle the visibility of the custom dropdown content
    const toggleDropdown = (id) => {
        const dropdownContent = document.getElementById(id);
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    };
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
                    <h1>Search Users</h1>
                    <div className="filter-buttons">
                        {/* Gender filter buttons */}
                        <div className="filter-category">
                        <h2>Gender</h2>
                        <div className="custom-dropdown">
                            <button className="dropdown-button" onClick={() => toggleDropdown('gender-dropdown')}>
                            Select Gender
                            </button>
                            <div className="dropdown-content" id="gender-dropdown">
                            <button
                                className="dropdown-button-option"
                                onClick={() => handleUserFilter('gender', 'Male')}
                            >
                                Male
                            </button>
                            <button
                                className="dropdown-button-option"
                                onClick={() => handleUserFilter('gender', 'Female')}
                            >
                                Female
                            </button>
                            <button
                                className="dropdown-button-option"
                                onClick={() => handleUserFilter('gender', 'Other')}
                            >
                                Other
                            </button>
                            </div>
                        </div>
                        </div>

                        {/* Age filter buttons */}
                        <div className="filter-category">
                        <h2>Age</h2>
                        <div className="custom-dropdown">
                            <button className="dropdown-button" onClick={() => toggleDropdown('age-dropdown')}>
                            Select Age
                            </button>
                            <div className="dropdown-content" id="age-dropdown">
                            <button
                                className="dropdown-button-option"
                                onClick={() => handleUserFilter('age', 'Younger')}
                            >
                                Younger
                            </button>
                            <button
                                className="dropdown-button-option"
                                onClick={() => handleUserFilter('age', 'Middle Age')}
                            >
                                Middle Age
                            </button>
                            <button
                                className="dropdown-button-option"
                                onClick={() => handleUserFilter('age', 'Old')}
                            >
                                Old
                            </button>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="searchResults">    
                    <h1> SEARCH RESULTS</h1>
                    <div className='stretch-out'>
                        <button onClick={handleShowAllUsers}>Show All Users</button>
                        {currentUsers.map((user) => (
                            <UserCard key={user._id} user={user} />
                        ))}
                    </div>
                    
                    {/* Pagination controls */}
                    <div>
                        <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        Previous Page
                        </button>
                        <span>
                        Page {currentPage} of {totalPages}
                        </span>
                        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next Page
                        </button>
                    </div>
                </div>   
            </div>
        </div>
    );
} export default UserFilter;