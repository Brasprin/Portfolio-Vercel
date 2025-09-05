// src/components/MainLayout.jsx
import { useState } from 'react';
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import BurgerButton from './BurgerButton'; // import the new component
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
          {/* Replace inline button with BurgerButton */}
          <div className="burger-header stickyutton">
            <BurgerButton 
              setMobileOpen={setMobileOpen} 
              sidebarOpen={mobileOpen} 
            />
          </div>

          <Outlet />
        </main>
      </div>
    </>
  );
}
