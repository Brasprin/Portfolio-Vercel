// src/components/MobileSidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/MobileSidebar.css';


export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`mobile-sidebar ${open ? 'open' : ''}`}>
      <button id="mobile-sidebarToggle" onClick={() => setOpen(!open)}>☰</button>

      {open && (
        <div className="mobile-sidebar-container">
          <span className="mobile-name">Andrei Tamse</span>
            <ul className="sidebar-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/projects">Projects</Link></li>
            <li><Link to="/resume">Resume</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            </ul>
          <div className="mobile-social-icons">
            <a href="https://www.instagram.com/andrei_tamse" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram" aria-hidden="true"></i></a>
            <a href="https://github.com/Brasprin" target="_blank" rel="noreferrer" aria-label="GitHub"><i className="fab fa-github" aria-hidden="true"></i></a>
            <a href="https://www.linkedin.com/in/agtamse" target="_blank" rel="noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin" aria-hidden="true"></i></a>
          </div>
          <span className="mobile-copyright">
            ©2025 Andrei Tamse. All rights reserved.
          </span>
        </div>
      )}
    </nav>
  );
}