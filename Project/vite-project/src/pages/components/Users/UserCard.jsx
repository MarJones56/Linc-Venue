import React from 'react';
import './UserCard.css'; // Import the CSS file you created

const UserCard = ({ user }) => {
  const { fname, lname, email, gender, age } = user;
  const fullName = `${fname} ${lname}`;
  return (
    <div className="user-card">
      <div className="user-card-content">
        <h2 className="user-card-title">
          {fullName}
        </h2>
        <p className="user-card-info">
          Email: {email}
        </p>
        <p className="user-card-info">
          Gender: {gender}
        </p>
        <p className="user-card-info">
          Age: {age}
        </p>
      </div>
    </div>
  );
};

export default UserCard;
