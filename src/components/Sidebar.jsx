import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>DevDash</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <a href="#projects">
              <span role="img" aria-label="projects">🗂️</span> Project Manager
            </a>
          </li>
          <li>
            <a href="#todo">
              <span role="img" aria-label="todo">✅</span> To-Do List
            </a>
          </li>
          <li>
            <a href="#calendar">
              <span role="img" aria-label="calendar">📅</span> Calendar View
            </a>
          </li>
          <li>
            <a href="#skills">
              <span role="img" aria-label="skills">🛠️</span> Skill Tracker
            </a>
          </li>
          <li>
            <a href="#notes">
              <span role="img" aria-label="notes">📋</span> Notes/Docs
            </a>
          </li>
          <li>
            <a href="#github">
              <span role="img" aria-label="github">🔗</span> GitHub Links
            </a>
          </li>
          <li>
            <a href="#productivity">
              <span role="img" aria-label="productivity">⏳</span> Productivity Tracker
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 