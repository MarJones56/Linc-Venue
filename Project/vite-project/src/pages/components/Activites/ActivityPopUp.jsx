import React from 'react';
import './ActivityPopup.css'; // Import the CSS file

function ActivityPopup({ activity, onClose }) {
  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Activity Details</h2>
        <p>Name: {activity.name}</p>
        <p>Info: {activity.info}</p>
        {/* Add more details as needed */}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default ActivityPopup;