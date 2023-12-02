import React from 'react';
import './ActivityCard.css';

const ActivityCard = ({ venue }) => {
  return (
    <div key={venue._id} className="venue-card">
      <div className="venue-header">
        <h4>{venue.name}</h4>
        <p>{venue.info}</p>
      </div>
      <div className="venue-details">
        <p>
          <strong>Address:</strong> {venue.venueAddress}
        </p>
        <p>
          <strong>Location:</strong> {`${venue.venueLocation.city}, ${venue.venueLocation.state}`}
        </p>
        <p>
          <strong>Time Slot:</strong> {Array.isArray(venue.timeslot) ? venue.timeslot.join(', ') : venue.timeslot}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;


