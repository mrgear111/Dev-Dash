import React, { useState, useEffect } from 'react';
import './SkillTracker.css';

// Helper components
const SkillHeader = ({ addingSkill, setAddingSkill }) => (
  <header className="skill-header">
    <div className="skill-title-section">
      <h2>Skill Tracker</h2>
      <button 
        onClick={() => setAddingSkill(!addingSkill)} 
        className="add-skill-btn"
      >
        <i className={`fa ${addingSkill ? 'fa-chevron-up' : 'fa-plus'}`}></i>
        {addingSkill ? 'Hide Form' : 'Add Skill'}
      </button>
    </div>
  </header>
);

const SkillForm = ({ newSkill, handleInputChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} className="skill-form dark-form">
    <div className="form-grid">
      <div className="form-group full-width">
        <label><i className="fas fa-code"></i> Skill Name</label>
        <input
          type="text"
          name="name"
          value={newSkill.name}
          onChange={handleInputChange}
          placeholder="e.g., React, DSA, Communication"
          required
          className="dark-input"
        />
      </div>

      <div className="form-group">
        <label><i className="fas fa-chart-line"></i> Level</label>
        <select
          name="level"
          value={newSkill.level}
          onChange={handleInputChange}
          className="dark-input"
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Expert">Expert</option>
        </select>
      </div>

      <div className="form-group">
        <label><i className="fas fa-calendar-check"></i> Last Practiced</label>
        <input
          type="date"
          name="lastPracticed"
          value={newSkill.lastPracticed}
          onChange={handleInputChange}
          className="dark-input"
        />
      </div>

      <div className="form-group full-width">
        <label><i className="fas fa-book"></i> Learning Resources</label>
        <input
          type="text"
          name="resources"
          value={newSkill.resources}
          onChange={handleInputChange}
          placeholder="Course links, book names"
          className="dark-input"
        />
      </div>

      <div className="form-group full-width">
        <label><i className="fas fa-bullseye"></i> Target Goals</label>
        <input
          type="text"
          name="targetGoals"
          value={newSkill.targetGoals}
          onChange={handleInputChange}
          placeholder="Your skill goals"
          className="dark-input"
        />
      </div>
    </div>

    <div className="form-actions">
      <button type="submit"><i className="fas fa-plus-circle"></i> Add Skill</button>
    </div>
  </form>
);

const SkillFilters = ({ activeFilter, setActiveFilter }) => {
  const filters = [
    { id: 'all', name: 'All Skills', icon: 'fa-layer-group' },
    { id: 'beginner', name: 'Beginner', icon: 'fa-seedling' },
    { id: 'intermediate', name: 'Intermediate', icon: 'fa-star-half-alt' },
    { id: 'expert', name: 'Expert', icon: 'fa-star' },
  ];
  
  return (
    <div className="skill-filters">
      {filters.map(filter => (
        <button
          key={filter.id}
          className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
          onClick={() => setActiveFilter(filter.id)}
        >
          <i className={`fas ${filter.icon}`}></i>
          <span>{filter.name}</span>
        </button>
      ))}
    </div>
  );
};

const SkillCard = ({ skill, deleteSkill, calculateDaysSinceLastPractice }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getLevelIcon = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'fa-seedling';
      case 'intermediate': return 'fa-star-half-alt';
      case 'expert': return 'fa-star';
      default: return 'fa-question-circle';
    }
  };
  
  const getLevelClass = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner': return 'level-beginner';
      case 'intermediate': return 'level-intermediate';
      case 'expert': return 'level-expert';
      default: return '';
    }
  };
  
  return (
    <div className={`skill-card ${getLevelClass(skill.level)}`}>
      <div className="skill-card-header">
        <h3>{skill.name}</h3>
        <div className="skill-actions">
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="expand-btn"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          <button 
            onClick={() => deleteSkill(skill.id)} 
            className="delete-btn"
            aria-label="Delete"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      <div className="skill-level">
        <i className={`fas ${getLevelIcon(skill.level)}`}></i>
        <span>{skill.level}</span>
      </div>
      
      {skill.lastPracticed && (
        <div className="skill-practice-info">
          <span className="practice-date">Last practiced: {new Date(skill.lastPracticed).toLocaleDateString()}</span>
          <span className="days-since">
            ({calculateDaysSinceLastPractice(skill.lastPracticed)} days ago)
          </span>
        </div>
      )}
      
      {isExpanded && (
        <div className="skill-details">
          {skill.resources && (
            <div className="detail-item">
              <h4><i className="fas fa-book"></i> Resources</h4>
              <p>{skill.resources}</p>
            </div>
          )}
          
          {skill.targetGoals && (
            <div className="detail-item">
              <h4><i className="fas fa-bullseye"></i> Goals</h4>
              <p>{skill.targetGoals}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const SkillTracker = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'Beginner',
    resources: '',
    lastPracticed: '',
    targetGoals: ''
  });
  const [addingSkill, setAddingSkill] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');

  // Load skills from localStorage
  useEffect(() => {
    const savedSkills = localStorage.getItem('skills');
    if (savedSkills) setSkills(JSON.parse(savedSkills));
  }, []);
  
  // Save skills to localStorage
  useEffect(() => {
    localStorage.setItem('skills', JSON.stringify(skills));
  }, [skills]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSkill(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSkill.name.trim()) {
      setSkills(prev => [...prev, { ...newSkill, id: Date.now() }]);
      setNewSkill({
        name: '',
        level: 'Beginner',
        resources: '',
        lastPracticed: '',
        targetGoals: ''
      });
      setAddingSkill(false);
    }
  };

  const deleteSkill = (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      setSkills(prev => prev.filter(skill => skill.id !== id));
    }
  };

  const calculateDaysSinceLastPractice = (lastPracticed) => {
    if (!lastPracticed) return 'N/A';
    
    const today = new Date();
    const practiced = new Date(lastPracticed);
    const diffTime = Math.abs(today - practiced);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Filter skills based on active filter
  const filteredSkills = activeFilter === 'all' 
    ? skills
    : skills.filter(skill => skill.level.toLowerCase() === activeFilter);

  return (
    <div className="skill-tracker full-width">
      <SkillHeader 
        addingSkill={addingSkill} 
        setAddingSkill={setAddingSkill}
      />
      
      {addingSkill && (
        <SkillForm 
          newSkill={newSkill}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      )}
      
      <SkillFilters 
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {skills.length === 0 ? (
        <div className="empty-skills">
          <i className="fas fa-laptop-code empty-icon"></i>
          <p>No skills added yet. Click "Add Skill" to get started!</p>
        </div>
      ) : filteredSkills.length === 0 ? (
        <div className="empty-skills">
          <i className="fas fa-filter empty-icon"></i>
          <p>No {activeFilter} skills found.</p>
        </div>
      ) : (
        <div className="skills-grid">
          {filteredSkills.map(skill => (
            <SkillCard 
              key={skill.id} 
              skill={skill} 
              deleteSkill={deleteSkill}
              calculateDaysSinceLastPractice={calculateDaysSinceLastPractice}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SkillTracker; 