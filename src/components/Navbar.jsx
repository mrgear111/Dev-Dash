import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <div className="logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">DevDash</span>
        </div>
      </div>

      <div className="navbar-menu">
        <div className="nav-links">
          {/* <a href="#projects" className="nav-link">
            <span className="nav-icon">🗂️</span>
            Projects
          </a> */}
          {/* <a href="#tasks" className="nav-link">
            <span className="nav-icon">✅</span>
            Tasks
          </a> */}
          {/* <a href="#skills" className="nav-link">
            <span className="nav-icon">🛠️</span>
            Skills
          </a> */}
          {/* <a href="#notes" className="nav-link">
            <span className="nav-icon">📋</span>
            Notes
          </a> */}
        </div>

        <div className="navbar-end">
          <div className="theme-toggle">
            {/* <span className="nav-icon">🌙</span> */}
          </div>
          <div className="user-profile">
            {/* <div className="avatar">DS</div> */}
            <div className="user-info">
              {/* <span className="user-name">Dev User</span>
              <span className="user-status">Pro</span> */}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 