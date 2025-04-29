import React, { useState, useEffect } from 'react';
import './ProjectManager.css';

// Default state objects
const defaultProject = {
  title: '',
  description: '',
  status: 'Not started',
  technologies: [],
  startDate: '',
  deadline: '',
  githubLink: '',
  liveLink: '',
  completionPercentage: 0,
  tasks: [],
  priority: 'Medium'
};

const defaultTask = {
  title: '',
  completed: false,
  dueDate: '',
};

// Helper components
const ProjectHeader = ({ activeProject, setShowForm, setActiveProject }) => (
  <header className="project-header">
    <h2>Project Manager</h2>
    {!activeProject ? (
      <button onClick={() => setShowForm(true)} className="add-btn">
        <i className="fa fa-plus"></i> Add New Project
      </button>
    ) : (
      <button onClick={() => setActiveProject(null)} className="back-btn">
        <i className="fa fa-arrow-left"></i> Back to Projects
      </button>
    )}
  </header>
);

const ProjectToolbar = ({ searchTerm, setSearchTerm, statusFilter, setStatusFilter, sortBy, setSortBy, sortDirection, setSortDirection, projects }) => (
  <div className="project-tools">
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search projects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        {searchTerm && (
          <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
        )}
      </div>
      
      <div className="filter-box">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-select"
        >
          <option value="All">All Statuses</option>
          <option value="Not started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        
        <div className="sort-container">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sort-select"
          >
            <option value="dateCreated">Date Created</option>
            <option value="title">Title</option>
            <option value="deadline">Deadline</option>
            <option value="progress">Progress</option>
          </select>
          
          <button 
            className="sort-direction" 
            onClick={() => setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')}
          >
            {sortDirection === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>
    </div>
    
    <div className="projects-stats">
      <div className="stat-item">
        <span className="stat-label">Total:</span>
        <span className="stat-value">{projects.length}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Not Started:</span>
        <span className="stat-value">{projects.filter(p => p.status === 'Not started').length}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">In Progress:</span>
        <span className="stat-value">{projects.filter(p => p.status === 'In Progress').length}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Completed:</span>
        <span className="stat-value">{projects.filter(p => p.status === 'Completed').length}</span>
      </div>
    </div>
  </div>
);

const AddProjectForm = ({ newProject, updateNewProject, addProject, setShowForm }) => (
  <form className="add-project-form dark-form" onSubmit={(e) => { e.preventDefault(); addProject(); }}>
    <h3>Add New Project</h3>
    <div className="form-grid">
      <div className="form-group full-width">
        <label><i className="fas fa-heading"></i> Title</label>
        <input
          type="text"
          value={newProject.title}
          onChange={e => updateNewProject('title', e.target.value)}
          placeholder="Enter project title"
          required
          className="dark-input"
        />
      </div>
      
      <div className="form-group full-width">
        <label><i className="fas fa-align-left"></i> Description</label>
        <textarea
          value={newProject.description}
          onChange={e => updateNewProject('description', e.target.value)}
          placeholder="Enter project description"
          rows={4}
          className="dark-input"
        ></textarea>
      </div>

      <div className="form-group">
        <label><i className="far fa-calendar"></i> Start Date</label>
        <input
          type="date"
          value={newProject.startDate}
          onChange={e => updateNewProject('startDate', e.target.value)}
          className="dark-input"
        />
      </div>

      <div className="form-group">
        <label><i className="far fa-calendar-check"></i> Deadline</label>
        <input
          type="date"
          value={newProject.deadline}
          onChange={e => updateNewProject('deadline', e.target.value)}
          className="dark-input"
        />
      </div>

      <div className="form-group">
        <label><i className="fas fa-tasks"></i> Status</label>
        <select
          value={newProject.status}
          onChange={e => updateNewProject('status', e.target.value)}
          className="dark-input"
        >
          <option value="Not started">Not started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      
      <div className="form-group">
        <label><i className="fas fa-flag"></i> Priority</label>
        <select
          value={newProject.priority}
          onChange={e => updateNewProject('priority', e.target.value)}
          className="dark-input"
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="form-group">
        <label><i className="fas fa-tags"></i> Technologies</label>
        <input
          type="text"
          value={newProject.technologies.join(', ')}
          onChange={e => updateNewProject('technologies', e.target.value.split(',').map(t => t.trim()))}
          placeholder="Enter technologies (comma separated)"
          className="dark-input"
        />
      </div>

      <div className="form-group">
        <label><i className="fab fa-github"></i> GitHub Link</label>
        <input
          type="url"
          value={newProject.githubLink}
          onChange={e => updateNewProject('githubLink', e.target.value)}
          placeholder="Enter GitHub repository URL"
          className="dark-input"
        />
      </div>

      <div className="form-group">
        <label><i className="fas fa-globe"></i> Live Link</label>
        <input
          type="url"
          value={newProject.liveLink}
          onChange={e => updateNewProject('liveLink', e.target.value)}
          placeholder="Enter live site URL"
          className="dark-input"
        />
      </div>
    </div>

    <div className="form-actions">
      <button type="submit"><i className="fas fa-plus-circle"></i> Add Project</button>
      <button type="button" onClick={() => setShowForm(false)}><i className="fas fa-times-circle"></i> Cancel</button>
    </div>
  </form>
);

const ProjectCard = ({ project, setActiveProject, deleteProject, formatDate, getTimeRemaining, calculateCompletionFromTasks, getStatusClass, getPriorityClass }) => (
  <div key={project.id} className="project-card">
    <div className="project-card-header">
      <div className="project-title-status">
        <h3>{project.title}</h3>
        <span className={`status-badge ${getStatusClass(project.status)}`}>{project.status}</span>
        <span className={`priority-badge ${getPriorityClass(project.priority)}`}>{project.priority}</span>
      </div>
      <div className="project-actions">
        <button className="view-btn" onClick={() => setActiveProject(project)} title="View Details">
          <i className="fa fa-eye"></i>
        </button>
        <button className="delete-btn" onClick={() => deleteProject(project.id)} title="Delete Project">
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </div>
    
    <div className="project-dates">
      {project.startDate && <span className="date-label">Started: {formatDate(project.startDate)}</span>}
      {project.deadline && (
        <span className={`date-label ${getTimeRemaining(project.deadline) < 0 ? 'overdue' : ''}`}>
          Due: {formatDate(project.deadline)}
          {getTimeRemaining(project.deadline) !== null && (
            <span className="time-remaining">
              {getTimeRemaining(project.deadline) > 0 
                ? `(${getTimeRemaining(project.deadline)} days left)` 
                : getTimeRemaining(project.deadline) === 0 
                  ? '(Due today)' 
                  : `(${Math.abs(getTimeRemaining(project.deadline))} days overdue)`
              }
            </span>
          )}
        </span>
      )}
    </div>

    <p className="project-description">{project.description}</p>

    <div className="progress-container">
      <div className="progress-header">
        <label>Progress: {calculateCompletionFromTasks(project)}%</label>
        <span className="task-count">
          {project.tasks?.filter(t => t.completed).length || 0}/{project.tasks?.length || 0} tasks
        </span>
      </div>
      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${calculateCompletionFromTasks(project)}%` }}></div>
      </div>
    </div>

    {project.technologies?.length > 0 && (
      <div className="tech-tags">
        {project.technologies.map((tech, index) => (
          <span key={index} className="tech-tag">{tech}</span>
        ))}
      </div>
    )}

    <div className="project-links">
      {project.githubLink && (
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="project-link">
          <i className="fab fa-github"></i> GitHub
        </a>
      )}
      {project.liveLink && (
        <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="project-link">
          <i className="fa fa-globe"></i> Live Site
        </a>
      )}
    </div>
  </div>
);

// Main component
const ProjectManager = () => {
  // State
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState(defaultProject);
  const [newTask, setNewTask] = useState(defaultTask);
  const [activeProject, setActiveProject] = useState(null);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('dateCreated');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Load projects from localStorage
  useEffect(() => {
    const savedProjects = localStorage.getItem('projects');
    if (savedProjects) setProjects(JSON.parse(savedProjects));
  }, []);
  
  // Save projects to localStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  // Helper functions
  const updateNewProject = (field, value) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  const addProject = () => {
    const projectWithId = { 
      ...newProject, 
      id: Date.now(),
      dateCreated: new Date().toISOString(),
      lastUpdated: new Date().toISOString()
    };
    setProjects(prev => [...prev, projectWithId]);
    setNewProject(defaultProject);
    setShowForm(false);
  };

  const updateProject = (id, updates) => {
    setProjects(prev => 
      prev.map(p => p.id === id 
        ? { ...p, ...updates, lastUpdated: new Date().toISOString() } 
        : p
      )
    );
  };

  const deleteProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      setProjects(prev => prev.filter(p => p.id !== id));
      if (activeProject?.id === id) setActiveProject(null);
    }
  };

  const updateProgress = (id, percentage) => {
    updateProject(id, { completionPercentage: percentage });
  };

  const addTaskToProject = (projectId) => {
    if (!newTask.title.trim()) return;
    
    const taskWithId = {
      ...newTask,
      id: Date.now(),
      dateCreated: new Date().toISOString()
    };
    
    setProjects(prev => 
      prev.map(p => p.id === projectId 
        ? { 
            ...p, 
            tasks: [...p.tasks, taskWithId],
            lastUpdated: new Date().toISOString()
          } 
        : p
      )
    );
    
    setNewTask(defaultTask);
    setShowTaskForm(false);
  };

  const toggleTaskCompletion = (projectId, taskId) => {
    setProjects(prev => 
      prev.map(p => p.id === projectId 
        ? { 
            ...p, 
            tasks: p.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t),
            lastUpdated: new Date().toISOString()
          } 
        : p
      )
    );
  };

  const deleteTask = (projectId, taskId) => {
    setProjects(prev => 
      prev.map(p => p.id === projectId 
        ? { 
            ...p, 
            tasks: p.tasks.filter(t => t.id !== taskId),
            lastUpdated: new Date().toISOString()
          } 
        : p
      )
    );
  };

  const calculateCompletionFromTasks = (project) => {
    if (!project.tasks?.length) return project.completionPercentage;
    
    const completedTasks = project.tasks.filter(t => t.completed).length;
    const completionPercentage = Math.round((completedTasks / project.tasks.length) * 100);
    
    if (completionPercentage !== project.completionPercentage) {
      updateProject(project.id, { completionPercentage });
    }
    
    return completionPercentage;
  };
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Not set';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric'
    });
  };
  
  const getTimeRemaining = (deadline) => {
    if (!deadline) return null;
    
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusClass = (status) => {
    switch(status) {
      case 'Completed': return 'status-completed';
      case 'In Progress': return 'status-in-progress';
      case 'Not started': return 'status-not-started';
      default: return '';
    }
  };
  
  const getPriorityClass = (priority) => {
    switch(priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };
  
  // Filter and sort projects
  const filteredAndSortedProjects = projects
    .filter(project => {
      // Status filter
      if (statusFilter !== 'All' && project.status !== statusFilter) return false;
      
      // Search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          project.title.toLowerCase().includes(searchLower) ||
          project.description.toLowerCase().includes(searchLower) ||
          project.technologies.some(tech => tech.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    })
    .sort((a, b) => {
      // Sort based on selected criteria
      switch (sortBy) {
        case 'title':
          return sortDirection === 'asc' 
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
        case 'deadline':
          if (!a.deadline) return sortDirection === 'asc' ? 1 : -1;
          if (!b.deadline) return sortDirection === 'asc' ? -1 : 1;
          return sortDirection === 'asc' 
            ? new Date(a.deadline) - new Date(b.deadline)
            : new Date(b.deadline) - new Date(a.deadline);
        case 'progress':
          return sortDirection === 'asc'
            ? a.completionPercentage - b.completionPercentage
            : b.completionPercentage - a.completionPercentage;
        case 'dateCreated':
        default:
          return sortDirection === 'asc'
            ? new Date(a.dateCreated) - new Date(b.dateCreated)
            : new Date(b.dateCreated) - new Date(a.dateCreated);
      }
    });

  const renderTaskList = () => (
    <div className="task-list">
      {activeProject.tasks?.length > 0 ? (
        activeProject.tasks.map(task => (
          <div key={task.id} className={`task-item ${task.completed ? 'task-completed' : ''}`}>
            <div className="task-content">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => {
                  toggleTaskCompletion(activeProject.id, task.id);
                  setActiveProject(prev => ({
                    ...prev,
                    tasks: prev.tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t)
                  }));
                }}
                className="task-checkbox"
              />
              <span className="task-title">{task.title}</span>
              {task.dueDate && (
                <span className="task-due-date">Due: {formatDate(task.dueDate)}</span>
              )}
            </div>
            <button 
              onClick={() => {
                deleteTask(activeProject.id, task.id);
                setActiveProject(prev => ({
                  ...prev,
                  tasks: prev.tasks.filter(t => t.id !== task.id)
                }));
              }}
              className="delete-task"
            >
              <i className="fa fa-times"></i>
            </button>
          </div>
        ))
      ) : (
        <div className="no-tasks">No tasks added yet.</div>
      )}
    </div>
  );

  const renderTaskForm = () => (
    <div className="task-form">
      <input
        type="text"
        placeholder="Enter task title"
        value={newTask.title}
        onChange={e => setNewTask(prev => ({ ...prev, title: e.target.value }))}
        className="task-input"
      />
      <input
        type="date"
        value={newTask.dueDate}
        onChange={e => setNewTask(prev => ({ ...prev, dueDate: e.target.value }))}
        className="task-date"
      />
      <div className="task-form-actions">
        <button onClick={() => addTaskToProject(activeProject.id)} className="save-task" disabled={!newTask.title.trim()}>
          Save
        </button>
        <button onClick={() => { setShowTaskForm(false); setNewTask(defaultTask); }} className="cancel-task">
          Cancel
        </button>
      </div>
    </div>
  );

  const renderProjectDetail = () => (
    <div className="project-detail">
      {/* Project Header */}
      <div className="project-detail-header">
        <div className="detail-title-section">
          <h3>{activeProject.title}</h3>
          <div className="detail-badges">
            <span className={`status-badge ${getStatusClass(activeProject.status)}`}>{activeProject.status}</span>
            <span className={`priority-badge ${getPriorityClass(activeProject.priority)}`}>{activeProject.priority}</span>
          </div>
        </div>
        
        <div className="project-quick-actions">
          <button 
            onClick={() => {
              const newStatus = activeProject.status === 'Not started' 
                ? 'In Progress' 
                : activeProject.status === 'In Progress' 
                  ? 'Completed' 
                  : 'Not started';
              updateProject(activeProject.id, { status: newStatus });
              setActiveProject(prev => ({ ...prev, status: newStatus }));
            }}
            className="status-toggle-btn"
          >
            Change Status
          </button>
        </div>
      </div>
      
      {/* Dates Section */}
      <div className="detail-dates">
        <div className="date-item">
          <span className="date-key">Created:</span>
          <span className="date-value">{formatDate(activeProject.dateCreated)}</span>
        </div>
        {activeProject.startDate && (
          <div className="date-item">
            <span className="date-key">Started:</span>
            <span className="date-value">{formatDate(activeProject.startDate)}</span>
          </div>
        )}
        {activeProject.deadline && (
          <div className="date-item">
            <span className="date-key">Deadline:</span>
            <span className={`date-value ${getTimeRemaining(activeProject.deadline) < 0 ? 'overdue' : ''}`}>
              {formatDate(activeProject.deadline)}
              {getTimeRemaining(activeProject.deadline) !== null && (
                <span className="time-remaining">
                  {getTimeRemaining(activeProject.deadline) > 0 
                    ? `(${getTimeRemaining(activeProject.deadline)} days left)` 
                    : getTimeRemaining(activeProject.deadline) === 0 
                      ? '(Due today)' 
                      : `(${Math.abs(getTimeRemaining(activeProject.deadline))} days overdue)`
                  }
                </span>
              )}
            </span>
          </div>
        )}
        <div className="date-item">
          <span className="date-key">Last Updated:</span>
          <span className="date-value">{formatDate(activeProject.lastUpdated)}</span>
        </div>
      </div>
      
      {/* Description */}
      {activeProject.description && (
        <div className="detail-section">
          <h4 className="section-title">Description</h4>
          <p className="detail-description">{activeProject.description}</p>
        </div>
      )}
      
      {/* Progress Section */}
      <div className="detail-section">
        <h4 className="section-title">Progress</h4>
        <div className="progress-container">
          <div className="progress-header">
            <label>Completion: {calculateCompletionFromTasks(activeProject)}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={activeProject.completionPercentage}
              onChange={e => {
                const newValue = Number(e.target.value);
                updateProgress(activeProject.id, newValue);
                setActiveProject(prev => ({ ...prev, completionPercentage: newValue }));
              }}
              className="progress-slider"
            />
          </div>
          <div className="progress-bar-container detail-progress">
            <div 
              className="progress-bar" 
              style={{ width: `${calculateCompletionFromTasks(activeProject)}%` }}
            ></div>
          </div>
        </div>
      </div>
      
      {/* Tasks Section */}
      <div className="detail-section">
        <div className="tasks-header">
          <h4 className="section-title">Tasks</h4>
          {!showTaskForm && (
            <button onClick={() => setShowTaskForm(true)} className="add-task-btn">
              <i className="fa fa-plus"></i> Add Task
            </button>
          )}
        </div>
        
        {showTaskForm && renderTaskForm()}
        {renderTaskList()}
      </div>
      
      {/* Technologies Section */}
      {activeProject.technologies?.length > 0 && (
        <div className="detail-section">
          <h4 className="section-title">Technologies</h4>
          <div className="tech-tags detail-tech">
            {activeProject.technologies.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      )}
      
      {/* Links Section */}
      <div className="detail-section">
        <h4 className="section-title">Links</h4>
        <div className="detail-links">
          {activeProject.githubLink ? (
            <a href={activeProject.githubLink} target="_blank" rel="noopener noreferrer" className="detail-link">
              <i className="fab fa-github"></i> GitHub Repository
            </a>
          ) : (
            <span className="no-link">No GitHub repository link added</span>
          )}
          
          {activeProject.liveLink ? (
            <a href={activeProject.liveLink} target="_blank" rel="noopener noreferrer" className="detail-link">
              <i className="fa fa-globe"></i> Live Site
            </a>
          ) : (
            <span className="no-link">No live site link added</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="project-manager">
      <div className="project-content">
        {/* Header section with add/back buttons */}
        <ProjectHeader 
          activeProject={activeProject} 
          setShowForm={setShowForm} 
          setActiveProject={setActiveProject} 
        />

        {/* Search, filter and stats bar */}
        {!activeProject && !showForm && (
          <ProjectToolbar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortDirection={sortDirection}
            setSortDirection={setSortDirection}
            projects={projects}
          />
        )}

        {/* Project Form */}
        {showForm && (
          <AddProjectForm 
            newProject={newProject}
            updateNewProject={updateNewProject}
            addProject={addProject}
            setShowForm={setShowForm}
          />
        )}

        {/* Empty state */}
        {!showForm && !activeProject && projects.length === 0 && (
          <div className="empty-state">
            <p>No projects yet. Click <b>Add New Project</b> to get started!</p>
          </div>
        )}

        {/* Projects List */}
        {!showForm && !activeProject && filteredAndSortedProjects.length > 0 && (
          <div className="projects-list">
            {filteredAndSortedProjects.map(project => (
              <ProjectCard 
                key={project.id}
                project={project}
                setActiveProject={setActiveProject}
                deleteProject={deleteProject}
                formatDate={formatDate}
                getTimeRemaining={getTimeRemaining}
                calculateCompletionFromTasks={calculateCompletionFromTasks}
                getStatusClass={getStatusClass}
                getPriorityClass={getPriorityClass}
              />
            ))}
          </div>
        )}
        
        {/* Project Details */}
        {activeProject && renderProjectDetail()}
      </div>
    </div>
  );
};

export default ProjectManager;
