import { useEffect, useState } from 'react';

export default function BurgerButton({ setMobileOpen, sidebarOpen }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const btn = document.getElementById('mobile-sidebarToggle');
    if (!btn) return;

    let scrollTimeout;

    const handleScroll = () => {
      if (hidden) return; // skip if hidden

      btn.style.opacity = 0.5; // fade out while scrolling

      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        btn.style.opacity = 1; // fade back after scrolling stops
      }, 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [hidden]);

  // Hide instantly when sidebar opens, show when it closes
  useEffect(() => {
    setHidden(sidebarOpen);
  }, [sidebarOpen]);

  const handleClick = () => {
    setMobileOpen(true);
    setHidden(true); // hide instantly on click
  };

  return (
    <button
      id="mobile-sidebarToggle"
      className="sidebar-toggle-btn"
      onClick={handleClick}
      style={{
        opacity: hidden ? 0 : 1,
        pointerEvents: hidden ? 'none' : 'auto',
      }}
    >
      ☰
    </button>
  );
}
