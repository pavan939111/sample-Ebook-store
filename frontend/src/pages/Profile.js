import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar'; // ✅ Import the Navbar
import './Profile.css';

function Profile() {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/user/${username}`); // ✅ Updated route
        setUser(res.data);
      } catch (err) {
        console.error(err);
        setError('User not found or server error');
      }
    };
    fetchUser();
  }, [username]);

  if (error) return <div className="profile-error">{error}</div>;

  return (
    <>
      <Navbar /> {/* ✅ Fixed Navbar */}
      <div className="profile-container">
        <h2 className="profile-header">👤 Profile Details</h2>
        {user ? (
          <div className="profile-info">
            <p><strong>Full Name:</strong> {user.fullName}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default Profile;
