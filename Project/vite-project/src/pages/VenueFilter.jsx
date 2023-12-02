import React, { useState } from 'react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header"; 
import ActivityCard from "./components/Activites/ActivityCard";
import SearchIcon from '@mui/icons-material/Search';

function VenueFilter() {
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [activityName, setActivityName] = useState('');
  const [cost, setCost] = useState('');
  const [location, setLocation] = useState('');
  const [timeslot, setTimeslot] = useState('');
  const routelocation = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleActivityFilter = async () => {
    let filterCriteria = {};

    // Add criteria to the filter object based on selected values
    if (activityName) {
      filterCriteria.name = activityName;
    }

    if (cost) {
      filterCriteria.chargeable = cost === 'Free';
    }

    if (location) {
      filterCriteria['venueLocation.city'] = location;
    }

    if (timeslot) {
      filterCriteria.timeslot = timeslot;
    }

    console.log(filterCriteria);
    try {
      const queryString = new URLSearchParams(filterCriteria).toString();
      const response = await axios.get(`http://localhost:5001/api/activityFilter?${queryString}`);
      setFilteredActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }

    setCurrentPage(1);
  };

  const handleShowAllAcivities = async () => {
    handleUserFilter('chargeable', ''); // Example: Set to an empty value for all users
  };

  // Pagination
  const indexOfLastActivity = currentPage * itemsPerPage;
  const indexOfFirstAcitivity = indexOfLastActivity - itemsPerPage;
  const currentActivites = filteredActivities.slice(indexOfFirstAcitivity, indexOfLastActivity);

  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);

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

  const toggleDropdown = (id) => {
    const dropdownContent = document.getElementById(id);

    // Check if dropdownContent is not null before accessing the style property
    if (dropdownContent) {
      dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    }
  };

  return (
    <div>
      <Header />
      <div className="main">
        <div className="filterPages">
          <NavLink to="/UserFilter" style={{ textDecoration: routelocation.pathname === '/UserFilter' ? 'underline' : 'none' }}>
            <h2>User Filter</h2>
          </NavLink>
          &emsp;
          <NavLink to="/ActivityFilter" style={{ textDecoration: routelocation.pathname === '/ActivityFilter' ? 'underline' : 'none' }}>
            <h2>Activity Filter</h2>
          </NavLink>
          &emsp;
          <NavLink to="/VenueFilter" style={{ textDecoration: routelocation.pathname === '/VenueFilter' ? 'underline' : 'none' }}>
            <h2>Venue Filter</h2>
          </NavLink>
          &emsp;
        </div>

        <div className="filters">
          <h2>Filters</h2>
          <div className="filter-buttons">

            {/* Venue Name input */}

            <div className="filter-category">
              <div className="search-bar">
                <input
                  type="text"
                  placeholder="Venue Name"
                  value={activityName}
                  onChange={(e) => setActivityName(e.target.value)}
                />
                <button onClick={handleActivityFilter}>
                  <SearchIcon />
                </button>
              </div>
            </div>

            {/* Cost dropdown */}
            <div className="filter-category">
            <h2>Venue Type</h2>
            <div className="custom-dropdown">
                <button className="dropdown-button" onClick={() => toggleDropdown('type-dropdown')}>
                Select Type
                </button>
                <div className="dropdown-content" id="type-dropdown">
                <button
                    className="dropdown-button-option"
                    onClick={() => handleActivityFilter('type_of_venue', 'Art Gallery')}
                >
                    Art Gallery
                </button>
                <button
                    className="dropdown-button-option"
                    onClick={() => handleActivityFilter('type_of_venue', 'Museum')}
                >
                    Museum
                </button>
                <button
                    className="dropdown-button-option"
                    onClick={() => handleActivityFilter('type_of_venue', 'Theater')}
                >
                    Theater
                </button>
                <button
                    className="dropdown-button-option"
                    onClick={() => handleActivityFilter('type_of_venue', 'Cultural Center')}
                >
                    Cultural Center
                </button>
                <button
                    className="dropdown-button-option"
                    onClick={() => handleActivityFilter('type_of_venue', 'Auction')}
                >
                    Auction
                </button>
                </div>
            </div>
            </div>

            <div className="filter-category">
            <h2>Location</h2>
            <div className="custom-dropdown">
                <button className="dropdown-button" onClick={() => toggleDropdown('location-dropdown')}>
                Select Location
                </button>
                <div className="dropdown-content" id="location-dropdown">
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'AL')}>
                    AL
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'AK')}>
                    AK
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'AZ')}>
                    AZ
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'AR')}>
                    AR
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'CA')}>
                    CA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'CO')}>
                    CO
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'CT')}>
                    CT
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'DE')}>
                    DE
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'FL')}>
                    FL
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'GA')}>
                    GA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'HI')}>
                    HI
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'ID')}>
                    ID
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'IL')}>
                    IL
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'IN')}>
                    IN
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'IA')}>
                    IA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'KS')}>
                    KS
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'KY')}>
                    KY
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'LA')}>
                    LA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'ME')}>
                    ME
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'MD')}>
                    MD
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'MA')}>
                    MA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'MI')}>
                    MI
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'MN')}>
                    MN
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'MS')}>
                    MS
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'MO')}>
                    MO
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'MT')}>
                    MT
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'NE')}>
                    NE
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'NV')}>
                    NV
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'NH')}>
                    NH
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'NJ')}>
                    NJ
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'NM')}>
                    NM
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'NY')}>
                    NY
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'NC')}>
                    NC
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'ND')}>
                    ND
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'OH')}>
                    OH
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'OK')}>
                    OK
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'OR')}>
                    OR
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'PA')}>
                    PA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'RI')}>
                    RI
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'SC')}>
                    SC
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'SD')}>
                    SD
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'TN')}>
                    TN
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'TX')}>
                    TX
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'UT')}>
                    UT
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'VT')}>
                    VT
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'VA')}>
                    VA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'WA')}>
                    WA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'WV')}>
                    WV
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'WI')}>
                    WI
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleActivityFilter('venueLocation', 'WY')}>
                    WY
                  </button>
                </div>
            </div>
            </div>
          </div>
        </div>



        <div className="searchResults">
          <h2>Search Results</h2>
          <div className='stretch-out'>
          <button onClick={handleShowAllAcivities}>Show All Activites</button>
            {filteredActivities.length === 0 ? (
              <p>No activities found</p>
            ) : (
              filteredActivities.map((activity) => (
                <ActivityCard key={activity._id} activity={activity} />
              ))
            )}
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
}

export default VenueFilter;
