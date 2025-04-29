import React, { useState } from 'react';
import './ProjectManager.css';

const defaultProject = {
  title: '',
  description: '',
  status: 'Not started',
  technologies: [],
  startDate: '',
  deadline: '',
  githubLink: '',
  liveLink: '',
  completionPercentage: 0
};

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState(defaultProject);

  const updateNewProject = (field, value) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  const addProject = () => {
    setProjects(prev => [...prev, { ...newProject, id: Date.now() }]);
    setNewProject(defaultProject);
    setShowForm(false);
  };

  const deleteProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const updateProgress = (id, percentage) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, completionPercentage: percentage } : p));
  };

  return (
    <div className="project-manager">
      <div className="project-content">
        <header className="project-header">
          <h2>Project Manager</h2>
          <button onClick={() => setShowForm(true)}>Add New Project</button>
        </header>

        {showForm && (
          <form className="add-project-form">
            <h3>Add New Project</h3>
            <div className="form-grid">
              <div className="form-group full-width">
                <label>Title</label>
                <input
                  type="text"
                  value={newProject.title}
                  onChange={e => updateNewProject('title', e.target.value)}
                  placeholder="Enter project title"
                />
              </div>
              
              <div className="form-group full-width">
                <label>Description</label>
                <textarea
                  value={newProject.description}
                  onChange={e => updateNewProject('description', e.target.value)}
                  placeholder="Enter project description"
                  rows={4}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={newProject.startDate}
                  onChange={e => updateNewProject('startDate', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Deadline</label>
                <input
                  type="date"
                  value={newProject.deadline}
                  onChange={e => updateNewProject('deadline', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={newProject.status}
                  onChange={e => updateNewProject('status', e.target.value)}
                >
                  {['Not started', 'In Progress', 'Completed'].map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Technologies</label>
                <input
                  type="text"
                  value={newProject.technologies.join(', ')}
                  onChange={e => updateNewProject('technologies', e.target.value.split(',').map(t => t.trim()))}
                  placeholder="Enter technologies (comma separated)"
                />
              </div>

              <div className="form-group">
                <label>GitHub Link</label>
                <input
                  type="url"
                  value={newProject.githubLink}
                  onChange={e => updateNewProject('githubLink', e.target.value)}
                  placeholder="Enter GitHub repository URL"
                />
              </div>

              <div className="form-group">
                <label>Live Link</label>
                <input
                  type="url"
                  value={newProject.liveLink}
                  onChange={e => updateNewProject('liveLink', e.target.value)}
                  placeholder="Enter live site URL"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={addProject}>Add Project</button>
              <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
            </div>
          </form>
        )}

        {!showForm && projects.length === 0 && (
          <div className="empty-state">
            <p>No projects yet. Click <b>Add New Project</b> to get started!</p>
          </div>
        )}

        {projects.length > 0 && (
          <div className="projects-list">
            {projects.map(project => (
              <div key={project.id} className="project-card">
                <div className="project-header">
                  <h3>{project.title}</h3>
                  <button onClick={() => deleteProject(project.id)}>Delete</button>
                </div>

                <p>{project.description}</p>

                <div className="project-details">
                  <p><b>Status:</b> {project.status}</p>
                  <p><b>Technologies:</b> {project.technologies.join(', ')}</p>
                  <p><b>Start Date:</b> {project.startDate}</p>
                  <p><b>Deadline:</b> {project.deadline}</p>

                  <div className="progress-section">
                    <label>Progress: {project.completionPercentage}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={project.completionPercentage}
                      onChange={e => updateProgress(project.id, Number(e.target.value))}
                    />
                  </div>

                  <div className="project-links">
                    {project.githubLink && <a href={project.githubLink} target="_blank" rel="noopener noreferrer">GitHub</a>}
                    {project.liveLink && <a href={project.liveLink} target="_blank" rel="noopener noreferrer">Live Site</a>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;
