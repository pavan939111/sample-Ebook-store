import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar'; // ✅ Import navbar
import './auth.css';

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    username: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    try {
     const res = await fetch('http://localhost:5000/api/auth/register', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate('/login');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
      console.error(err);
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Add Navbar */}
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Create Account</h1>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            name="email"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="auth-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="auth-input"
          />
          <button onClick={handleRegister} className="auth-button">Register</button>

          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

          <p className="auth-switch">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}>Login Here</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
