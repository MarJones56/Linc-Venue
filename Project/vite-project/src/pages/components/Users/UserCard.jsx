import React from 'react';
import './UserCard.css'; // Import the CSS file you created

const UserCard = ({ user }) => {
  const { fname, lname, email, gender, age } = user;
  const fullName = `${fname} ${lname}`;

  return (
    <div key={user._id} className="venue-card">
      <div className="venue-content">
        <div className="venue-info">
          <div className="venue-header">
            <h4>{fullName}</h4>
            <p>{gender}</p>
          </div>
          <div className="venue-details">
            <p>
              <strong>Age:</strong> {age}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>
        <div className="venue-image">
          <img src={user.profilePicture} alt={`Image for ${user.fname}`} />
        </div>
      </div>
    </div>
  );


  // return (
  //   <div className="user-card">
  //     <div className="user-card-content">
  //       <h2 className="user-card-title">
  //         {fullName}
  //       </h2>
  //       <p className="user-card-info">
  //         Email: {email}
  //       </p>
  //       <p className="user-card-info">
  //         Gender: {gender}
  //       </p>
  //       <p className="user-card-info">
  //         Age: {age}
  //       </p>
  //     </div>
  //   </div>
  // );
};

export default UserCard;
