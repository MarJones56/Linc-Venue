import React, { useState } from 'react';
import './VenuePopup.css'; 
import axios from 'axios';

function VenuePopup({ venue, onClose }) {
  const [bookingStatus, setBookingStatus] = useState(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleVenueBooking = async (e) => {
    e.preventDefault();

    if (!selectedTimeslot) {
      setBookingStatus('Please select a timeslot before booking.');
      return;
    }
    axios
      .post(`http://localhost:5001/bookVenue`, {
        venueId: venue._id,
        userId: user._id,
        timeslot: selectedTimeslot,
      })
      .then((res) => {
        if (res.data.success) {
          setBookingStatus(`Booking successful! ${res.data.message}`);
        } else {
          setBookingStatus(`Booking Failed! ${res.data.message}`);
        }
        // if (res.data.error) {
        //   alert(res.data.error);
        // } else {
        //   console.log("Sucess Registered for Venue");
        //   setBookingStatus('Booking successful! Sending Email Notification');
        // }
      })
      .catch((error) => {
        console.error('Error during booking:', error);
        setBookingStatus(`Booking Failed!`);
      });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Venue Details</h2>
        <p>Name: {venue.name}</p>
        <p>Info: {venue.info}</p>
        <p>Timeslots Available: {venue.timeslot.join(', ')}</p>
        <p>Address: {venue.address}</p>
        <p>City: {venue.location.city}</p>
        <p>State: {venue.location.state}</p>
        <p>Current Number of Attendees: {venue.num_of_users} / {venue.maxCap}</p>

        {/* Dropdown for timeslots */}
        <div className="dropdown">
          <label htmlFor="timeslot">Select Timeslot:</label>
          <select
            id="timeslot"
            value={selectedTimeslot}
            onChange={(e) => setSelectedTimeslot(e.target.value)}
          >
            <option value="">Select a timeslot</option>
            {venue.timeslot.map((timeslot) => (
              <option key={timeslot} value={timeslot}>
                {timeslot}
              </option>
            ))}
          </select>
        </div>

        {/* Display booking status */}
        {bookingStatus && <p>{bookingStatus}</p>}

        <button onClick={onClose}>Close</button>
        <button onClick={handleVenueBooking}>Book</button>
        <button>Save</button>
      </div>
    </div>
  );
}

export default VenuePopup