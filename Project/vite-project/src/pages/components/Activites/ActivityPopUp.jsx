import React, { useState } from 'react';
import './ActivityPopup.css'; // Import the CSS file
import axios from 'axios';

function ActivityPopup({ activity, onClose }) {
  const [bookingStatus, setBookingStatus] = useState(null);
  const user = JSON.parse(localStorage.getItem('user'));
  const handleBooking = async (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:5001/bookActivity`, {
        activityId: activity._id,
        userId: user._id,
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          console.log("Sucess Booked Activity");
          setBookingStatus('Booking successful! Sending Email Notification');
        }
      })
      .catch((error) => {
        console.error('Error during booking:', error);
        setBookingStatus("Booking Failed! At Full Cap");
      });
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Activity Details</h2>
        <p>Name: {activity.name}</p>
        <p>Info: {activity.info}</p>
        <p>Time: {activity.timeslot}</p>
        <p>Address: {activity.venueAddress}</p>
        <p>City: {activity.venueLocation.city}</p>
        <p>State: {activity.venueLocation.state}</p>
        <p>Current Number of Attendees: {activity.num_of_users} / {activity.availability}</p>

        {/* Display booking status */}
        {bookingStatus && <p>{bookingStatus}</p>}

        <button onClick={onClose}>Close</button>
        <button onClick={handleBooking}>Book</button>
        <button>Save</button>
      </div>
    </div>
  );
}

export default ActivityPopup