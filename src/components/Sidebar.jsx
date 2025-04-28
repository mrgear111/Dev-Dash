import React from 'react';
import './Sidebar.css';

const sections = [
  { key: 'projects', label: 'Project Manager', icon: '🗂️' },
  { key: 'todo', label: 'To-Do List', icon: '✅' },
  { key: 'skills', label: 'Skill Tracker', icon: '🛠️' },
  { key: 'notes', label: 'Notes/Docs', icon: '📋' },
];

const Sidebar = ({ onSectionSelect, selectedSection }) => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>DevDash</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {sections.map((section) => (
            <li key={section.key}>
              <button
                className={`sidebar-link${selectedSection === section.key ? ' active' : ''}`}
                onClick={() => onSectionSelect(section.key)}
              >
                <span role="img" aria-label={section.key}>{section.icon}</span> {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar; 