import React from 'react';
import { useLocation } from 'react-router-dom';
import SideNav from './components/SideNav';
import Router from './router';

export default function App() {
  const location = useLocation();
  const showSideNav = location.pathname !== '/login';

  return (
    <div className={showSideNav ? 'app' : ''}>
      {showSideNav && <SideNav />}
      <main className={showSideNav ? 'content' : ''}>
        <Router />
      </main>
    </div>
  );
}