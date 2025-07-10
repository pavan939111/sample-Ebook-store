import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar'; // ✅ Add this
import './auth.css';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
     const res = await fetch('https://sample-ebook-store.onrender.com/api/auth/login', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert(data.message);
        localStorage.setItem('username', form.username);
        localStorage.setItem('userId', data.userId);

        login();
        navigate('/home');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Server error, try again later.');
    }
  };

  return (
    <>
      <Navbar /> {/* ✅ Navbar added */}
      <div className="auth-container">
        <div className="auth-card">
          <h1 className="auth-title">Login</h1>
          <input
            type="text"
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
          <button onClick={handleLogin} className="auth-button">
            Login
          </button>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <p className="auth-switch">
            Don't have an account?{' '}
            <span onClick={() => navigate('/register')}>Create New Account</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
