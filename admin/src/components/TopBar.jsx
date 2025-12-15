import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../auth';

export default function TopBar({ title, search, onSearch }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className="top-bar">
      <h1>{title}</h1>
      {onSearch && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
      )}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}