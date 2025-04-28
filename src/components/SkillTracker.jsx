import React, { useState } from 'react';
import './SkillTracker.css';

const SkillTracker = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({
    name: '',
    level: 'Beginner',
    resources: '',
    lastPracticed: '',
    targetGoals: ''
  });

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
    }
  };

  const getLevelClass = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'level-beginner';
      case 'intermediate':
        return 'level-intermediate';
      case 'expert':
        return 'level-expert';
      default:
        return '';
    }
  };

  return (
    <div className="skill-tracker">
      <h2>🛠️ Skill Tracker</h2>
      
      <form onSubmit={handleSubmit} className="skill-form">
        <div className="form-group">
          <label>Skill Name</label>
          <input
            type="text"
            name="name"
            value={newSkill.name}
            onChange={handleInputChange}
            placeholder="e.g., React, DSA, Communication"
            required
          />
        </div>

        <div className="form-group">
          <label>Level</label>
          <select
            name="level"
            value={newSkill.level}
            onChange={handleInputChange}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Expert">Expert</option>
          </select>
        </div>

        <div className="form-group">
          <label>Learning Resources</label>
          <input
            type="text"
            name="resources"
            value={newSkill.resources}
            onChange={handleInputChange}
            placeholder="Course links, book names"
          />
        </div>

        <div className="form-group">
          <label>Last Practiced Date</label>
          <input
            type="date"
            name="lastPracticed"
            value={newSkill.lastPracticed}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Target Goals</label>
          <input
            type="text"
            name="targetGoals"
            value={newSkill.targetGoals}
            onChange={handleInputChange}
            placeholder="Your skill goals"
          />
        </div>

        <button type="submit">Add Skill</button>
      </form>

      <div className="skills-list">
        {skills.map(skill => (
          <div key={skill.id} className="skill-card">
            <h3>{skill.name}</h3>
            <div className={`level ${getLevelClass(skill.level)}`}>
              {skill.level}
            </div>
            <p><strong>Resources:</strong> {skill.resources}</p>
            <p><strong>Last Practiced:</strong> {skill.lastPracticed}</p>
            <p><strong>Target Goals:</strong> {skill.targetGoals}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillTracker; 