// src/components/MainLayout.jsx
import Sidebar from './Sidebar';
import MobileSidebar from './MobileSidebar';
import { Outlet } from 'react-router-dom';

export default function MainLayout() {
  return (
    <>
      <Sidebar />
      <MobileSidebar />

      <div className="container">
        <main className="main-content">
          <Outlet /> {/* Dynamically renders Home, Resume, etc. */}
        </main>
      </div>
    </>
  );
}
