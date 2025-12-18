import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './pages/Dashboard';
import OC200Sessions from './components/OC200Sessions';
import APInfo from './components/APInfo';
import APUserBreakdown from './APUserBreakdown';
import Plans from './pages/Plans';

export default function App() {
  const [logged, setLogged] = useState(false);
  const [page, setPage] = useState('dashboard');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      setLogged(true);
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem('admin_token');
    setLogged(false);
  }

  if (!logged) {
    return <Login setLogged={setLogged} />;
  }

  return (
    <div>
      <nav>
        <button onClick={() => setPage('dashboard')}>Dashboard</button>
        <button onClick={() => setPage('plans')}>Plans</button>
        <button onClick={handleLogout} style={{ float: 'right', margin: 10 }}>Logout</button>
      </nav>
      {page === 'dashboard' && (
        <>
          <Dashboard />
          <OC200Sessions />
          <APInfo />
          <APUserBreakdown />
        </>
      )}
      {page === 'plans' && <Plans />}
    </div>
  );
}
