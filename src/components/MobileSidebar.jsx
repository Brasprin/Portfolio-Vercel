// src/components/MobileSidebar.jsx
import { Link } from 'react-router-dom';
import '../styles/MobileSidebar.css';

export default function MobileSidebar({ open, onClose }) {
  return (
    <nav 
    className={`mobile-sidebar ${open ? 'show' : ''}`} 
    onClick={onClose} role="dialog" aria-modal="true" aria-hidden={!open}
    >
      <div className="mobile-sidebar-container">
        <span className="mobile-name">Andrei Tamse</span>

        <ul className="mobile-sidebar-menu">
          <li><Link to="/" onClick={onClose}>Home</Link></li>
          <li><Link to="/projects" onClick={onClose}>Projects</Link></li>
          <li><Link to="/resume" onClick={onClose}>Resume</Link></li>
          <li><Link to="/contact" onClick={onClose}>Contact</Link></li>
        </ul>

        <div className="mobile-social-icons">
          <a href="https://www.instagram.com/andrei_tamse" target="_blank" rel="noreferrer"> 
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://github.com/Brasprin" target="_blank" rel="noreferrer">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/agtamse" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
        </div>

        <span className="mobile-copyright">
          ©2025 Andrei Tamse. All rights reserved.
        </span>
      </div>
    </nav>
  );
}
