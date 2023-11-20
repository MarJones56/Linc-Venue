import React, { useEffect, useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from './components/UserContext';
import Header from './components/Header2';
import axios from 'axios';
import VenueCard from "./components/Venues/VenueCard";

export default function VenueDashboard() {
  //const { user, updateUser } = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem('user'));
  const [showVenues, setShowVenues] = useState(false);
  const [userVenues, setUserVenues] = useState([]);

  const handleShowVenues = () => {
    if (user) {
      axios
        .get(`http://localhost:5000/userVenues/${user._id}`)
        .then((response) => {
          setUserVenues(response.data);
        })
        .catch((error) => {
          console.error('Error fetching user venues:', error);
        });
    }

    setShowVenues(true);
  };

  //console.log(user);
  //console.log("working");

  if (!user) {
    return <Navigate to={'/dashboard'} />;
  }
  return (
    <div>
        
        <Header />
    <div>
    {/* <div className="padding">
            <div><br></br></div>
            <div>
                <div class="card">
                    <img class="card-img-top" src="./images/background.jpg" alt="Card image cap" height="200"/>
                    <div class="card-body little-profile text-center">
                        <div class="pro-img"><img src="./images/user.jpg" alt="user"/></div>
                            <h3 class="m-b-0">Blank User</h3>
                            <p>Artist</p>
                            <button class="button main-btn">Follow</button>
                            <div class="row text-center m-t-20">
                            </div>
                    </div>
                </div>
            </div>
        </div> */}


      <div className="padding">
        <div>
          <div className="card">
            {user.profileBanner && (
              <img
                className="card-img-top"
                src={user.profileBanner}
                alt="Profile Banner"
                height="200"
              />
            )}
            <div className="card-body">
              <img className="profilepic" src="./images/user.jpg" alt="user" />
              <div>
                <br />
              </div>
              <h3 className="profile">Signed in as {user.username}</h3>
              <p className="profile">Venue Owner</p>
            </div>
          </div>
        </div>
      </div>
        {/* <div className="padding">
            <div>
                <div class="card">
                    <div class="card-body">
                        <img className="profilepic" src="./images/user.jpg" alt="user"/><div><br></br></div>
                        <h3 className="profile">Signed in as {user.username}</h3>
                        <p className="profile">Venue Owner</p>
                    </div>
                </div>
            </div>
        </div> */}

        <div className="padding">
                <div className="card">
                    <div className="card-body little-profile">
                            <h3 className="m-b-0">Profile Information</h3>                                
                            {/* <button onClick={()=>{ alert('alert'); }}>edit</button> */}
                            {/* make it so when this button is clicked the user receives a pop up to insert whatever text to change the about section */}
                            <p>HI, I'm John Doe. Decisions: If you can't decide, the answer is no.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et 
                                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit 
                                in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est 
                                laborum.
                            </p>
                            <p><strong>Full name: </strong>{user.fname} {user.lname}</p>
                            <p><strong>Mobile phone: </strong>012 345 6789</p>
                            <p><strong>Email: </strong>{user.email}</p>
                            <p><strong>Location: </strong>{user?.location}</p>
                            <p><strong>Social: </strong>John Doe</p>  
                    </div>
                </div>
        </div>
        <div className="padding">
          <div className="card">
            <div className="card-body little-profile">
              <h3 className="m-b-0" title="All previous bookings come here">
                Current Venues
              </h3>
              <div className="profile-buttons">
                <button onClick={handleShowVenues}>My Venues</button>
                <Link to="/venuedashboard/addVenue">
                  <div className="add-venue-button" title="Add Venue">
                    <span>+</span>
                  </div>
                </Link>
              </div>
              {showVenues && (
                <>
                  {userVenues.length === 0 ? (
                    <p>No venues found</p>
                  ) : (
                    <div className="venue-cards">
                      {userVenues.map((venue) => (
                        <VenueCard key={venue._id} venue={venue} />
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
