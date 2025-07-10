import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Catalogue from './pages/Catalogue'; // ✅ Import Catalogue
import SearchPage from './pages/SearchPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/addbook" element={<AddBook />} />
      <Route path="/catalogue" element={<Catalogue />} /> {/* ✅ Add Catalogue route */}
      <Route path="/profile/:username" element={<Profile />} />
      <Route path="/search" element={<SearchPage />} />
    </Routes>
  );
}

export default App;
