import axios from 'axios';
import React, { useState} from 'react';
import './VenueCard2.css';

const VenueCard = ({ venue }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deletionStatus, setDeletionStatus] = useState(null);


  const handleDeleteVenue = async () => {
    try {
      setShowConfirmation(true);
    } catch (error) {
      console.error('Error deleting venue:', error);
    }
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/deleteVenue/${venue._id}`);
      setDeletionStatus('Venue deleted successfully!');
    } catch (error) {
      console.error('Error deleting venue:', error);
      setDeletionStatus('Error deleting venue');
    } finally {
      setShowConfirmation(false);
    }
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  return (
    <div key={venue._id} className="venue-card">
      <div className="venue-header">
        <h4>{venue.name}</h4>
        <p>{venue.info}</p>
      </div>
      <div className="venue-details">
        <p>
          <strong>Address:</strong> {venue.address}
        </p>
        <p>
          <strong>Location:</strong> {`${venue.location.city}, ${venue.location.state}`}
        </p>
        <p>
          <strong>Type of Venue:</strong> {venue.type_of_venue}
        </p>
        <p>
          <strong>Time Slot:</strong> {venue.timeslot.join(', ')}
        </p>
      </div>
      <div className="venue-image">
        <img
          src={venue.image}
          alt={`Image for ${venue.name}`}
        />
      </div>
      
      <button onClick={handleDeleteVenue}>Close</button>
      {showConfirmation && (
        <div className="confirmation-modal">
          <p>Are you sure you want to close this venue?</p>
          <button onClick={confirmDelete}>Yes</button>
          <button onClick={cancelDelete}>No</button>
        </div>
      )}

      {deletionStatus && (
        <div className={`deletion-status ${deletionStatus.includes('successfully') ? 'success' : 'error'}`}>
          {deletionStatus}
        </div>
      )}
    </div>
  );
};

export default VenueCard;