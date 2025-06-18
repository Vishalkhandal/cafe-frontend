import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Profile() {
  const {user} = useAuth()
  
  return (
    <>
      {user ? (
        <>
          <h1>User Profile</h1>
          <h2>User Name: {user.name}</h2>
          <h2>User Id: {user.id || user._id}</h2>
          <h2>User Email: {user.email}</h2>
        </>
      ) : (
        <p>No user data found. Please log in.</p>
      )}
    </>
  );
}

export default Profile;
