import React, { useState } from 'react';
import { Link, useNavigate, NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from "./components/Header"; 
import VenueCard from "./components/Venues/VenueCard";
import SearchIcon from '@mui/icons-material/Search';

function VenueFilter() {
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [venueName, setVenueName] = useState('');
  const [cost, setCost] = useState('');
  const [location, setLocation] = useState('');
  const [timeslot, setTimeslot] = useState('');
  const routelocation = useLocation();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleVenueFilter = async (category, value) => {
    let filterCriteria = {};
    if (category === 'type_of_venue' || category === 'venueLocation') {
        filterCriteria = {
            [category]: value,
        };
    }
    else{
      filterCriteria.venueName = venueName;
    }
    console.log(filterCriteria);
    console.log("before is filtercriteria");
    const queryString = new URLSearchParams(filterCriteria).toString();
    console.log(queryString);
    axios
        .get(`http://localhost:5001/api/venuefilter?${queryString}`)
        .then((response) => {
          setFilteredVenues(response.data);
        })
        .catch((error) => {
            console.error('Error fetching users:', error);
        });
    
    setCurrentPage(1);
  };

  const handleShowAllVenues = async () => {
    handleVenueFilter('timeslot', ''); // Example: Set to an empty value for all users
  };

  // Pagination
  const indexOfLastActivity = currentPage * itemsPerPage;
  const indexOfFirstAcitivity = indexOfLastActivity - itemsPerPage;
  const currentActivites = filteredVenues.slice(indexOfFirstAcitivity, indexOfLastActivity);

  const totalPages = Math.ceil(filteredVenues.length / itemsPerPage);

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
                  value={venueName}
                  onChange={(e) => setVenueName(e.target.value)}
                />
                <button onClick={handleVenueFilter}>
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
                    onClick={() => handleVenueFilter('type_of_venue', 'Art Gallery')}
                >
                    Art Gallery
                </button>
                <button
                    className="dropdown-button-option"
                    onClick={() => handleVenueFilter('type_of_venue', 'Museum')}
                >
                    Museum
                </button>
                <button
                    className="dropdown-button-option"
                    onClick={() => handleVenueFilter('type_of_venue', 'Theater')}
                >
                    Theater
                </button>
                <button
                    className="dropdown-button-option"
                    onClick={() => handleVenueFilter('type_of_venue', 'Cultural Center')}
                >
                    Cultural Center
                </button>
                <button
                    className="dropdown-button-option"
                    onClick={() => handleVenueFilter('type_of_venue', 'Auction')}
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
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'AL')}>
                    AL
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'AK')}>
                    AK
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'AZ')}>
                    AZ
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'AR')}>
                    AR
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'CA')}>
                    CA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'CO')}>
                    CO
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'CT')}>
                    CT
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'DE')}>
                    DE
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'FL')}>
                    FL
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'GA')}>
                    GA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'HI')}>
                    HI
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'ID')}>
                    ID
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'IL')}>
                    IL
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'IN')}>
                    IN
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'IA')}>
                    IA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'KS')}>
                    KS
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'KY')}>
                    KY
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'LA')}>
                    LA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'ME')}>
                    ME
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'MD')}>
                    MD
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'MA')}>
                    MA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'MI')}>
                    MI
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'MN')}>
                    MN
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'MS')}>
                    MS
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'MO')}>
                    MO
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'MT')}>
                    MT
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'NE')}>
                    NE
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'NV')}>
                    NV
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'NH')}>
                    NH
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'NJ')}>
                    NJ
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'NM')}>
                    NM
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'NY')}>
                    NY
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'NC')}>
                    NC
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'ND')}>
                    ND
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'OH')}>
                    OH
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'OK')}>
                    OK
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'OR')}>
                    OR
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'PA')}>
                    PA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'RI')}>
                    RI
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'SC')}>
                    SC
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'SD')}>
                    SD
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'TN')}>
                    TN
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'TX')}>
                    TX
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'UT')}>
                    UT
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'VT')}>
                    VT
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'VA')}>
                    VA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'WA')}>
                    WA
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'WV')}>
                    WV
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'WI')}>
                    WI
                  </button>
                  <button className="dropdown-button-option" onClick={() => handleVenueFilter('venueLocation', 'WY')}>
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
          <button onClick={handleShowAllVenues}>Show All Venues</button>
            {filteredVenues.length === 0 ? (
              <p>No venues found</p>
            ) : (
              filteredVenues.map((venue) => (
                <VenueCard key={venue._id} venue={venue} />
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
