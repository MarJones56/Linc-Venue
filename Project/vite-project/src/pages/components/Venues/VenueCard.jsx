
// import React from 'react';
// import './VenueCard.css';

// const VenueCard = ({ venue }) => {
//   return (
//     <div key={venue._id} className="venue-card">
//       <div className="venue-header">
//         <h4>{venue.name}</h4>
//         <p>{venue.info}</p>
//       </div>
//       <div className="venue-details">
//         <p>
//           <strong>Address:</strong> {venue.address}
//         </p>
//         <p>
//           <strong>Location:</strong> {`${venue.location.city}, ${venue.location.state}`}
//         </p>
//         <p>
//           <strong>Type of Venue:</strong> {venue.type_of_venue}
//         </p>
//         <p>
//           <strong>Time Slot:</strong> {venue.timeslot.join(', ')}
//         </p>
//       </div>
//       <div className="venue-image">
//         <img
//           src={venue.image}
//           alt={`Image for ${venue.name}`}
//         />
//       </div>
//     </div>
//   );
// };

// export default VenueCard;

import React from 'react';
import './VenueCard.css';

const VenueCard = ({ venue, onClick }) => {
  const handleCardClick = () => {
    if (onClick){
      onClick(venue);
    }
  };

  return (
    <div key={venue._id} className="venue-card" onClick={handleCardClick}>
      <div className="venue-content">
        <div className="venue-info">
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
        </div>
        <div className="venue-image">
          <img src={venue.image} alt={`Image for ${venue.name}`} />
        </div>
      </div>
    </div>
  );
};

export default VenueCard;
