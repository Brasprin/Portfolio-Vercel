// src/components/MainLayout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <Sidebar />

      {/* Mobile sidebar */}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="pageContainer">
        <main className="main-content">
          {/* Burger button */}
          <button id="mobile-sidebarToggle"  class="sidebar-toggle-btn" onClick={() => setMobileOpen(o => !o)} > ☰ </button>
          <Outlet />
        </main>
      </div>
    </>
  );
}
