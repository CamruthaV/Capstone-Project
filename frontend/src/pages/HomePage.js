import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import '../App.css';

function HomePage() {
  const [key, setKey] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/validate-key', { key });
      if (response.data.role) {
        localStorage.setItem("apiKey", key);
        if (response.data.role === 'faculty') {
          navigate('/faculty');
        } else if (response.data.role === 'admin') {
          navigate('/admin');
        }
      } else {
        alert('Invalid key! Please try again.');
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert('Invalid key! Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
      {/* Logo Section */}
      <div className="absolute top-0 left-0 m-4">
        <img src="/GITAM-logo.png" alt="Logo" className="h-20" />
      </div>
      
      <div className="absolute top-5 center-0 m-4 text-4xl font-bold">
        <h1>Welcome to GITAM Examination Cell</h1>
      </div>

      <h1 className="text-3xl font-regular text-black-500 mb-8">Automated Test Paper Generator</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          placeholder="Enter key" 
          value={key} 
          onChange={(e) => setKey(e.target.value)} 
          className="px-4 py-2 w-80 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        /><br />
        <button type="submit" className="px-6 py-2 w-80 text-lg text-white bg-green-500 rounded-lg hover:bg-green-600 transition">Enter</button>
      </form>
    </div>
  );
}

export default HomePage;