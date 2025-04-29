import React, { useState, useEffect } from 'react';
import './TodoList.css';

// Helper components
const TodoHeader = ({ input, setInput, addTask, taskCounts }) => (
  <header className="todo-header">
    <div className="todo-title-section">
      <h2>To-Do List</h2>
      <div className="task-stats">
        <div className="stat-pill">
          <span className="stat-label">Total:</span>
          <span className="stat-count">{taskCounts.total}</span>
        </div>
        <div className="stat-pill completed">
          <span className="stat-label">Done:</span>
          <span className="stat-count">{taskCounts.completed}</span>
        </div>
        <div className="stat-pill pending">
          <span className="stat-label">Pending:</span>
          <span className="stat-count">{taskCounts.pending}</span>
        </div>
      </div>
    </div>
    
    <div className="todo-input-row">
      <input
        type="text"
        placeholder="Add a new task..."
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && addTask()}
        className="todo-input"
      />
      <button onClick={addTask} className="add-task-btn">
        <i className="fa fa-plus"></i> Add
      </button>
    </div>
  </header>
);

const TodoItem = ({ task, toggleTask, deleteTask, editTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(task.text);
  
  const handleEdit = () => {
    if (isEditing) {
      editTask(task.id, editedText);
    }
    setIsEditing(!isEditing);
  };
  
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <li className={`todo-item ${task.done ? 'done' : ''} ${task.category ? `category-${task.category}` : ''}`}>
      <div className="todo-content">
        <label className="todo-checkbox-label">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => toggleTask(task.id)}
            className="todo-checkbox"
          />
          <span className="checkbox-custom"></span>
        </label>
        
        {isEditing ? (
          <input
            type="text"
            value={editedText}
            onChange={e => setEditedText(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                editTask(task.id, editedText);
                setIsEditing(false);
              } else if (e.key === 'Escape') {
                setEditedText(task.text);
                setIsEditing(false);
              }
            }}
            className="edit-task-input"
            autoFocus
          />
        ) : (
          <span className="todo-text">{task.text}</span>
        )}
        
        {task.timestamp && (
          <span className="task-timestamp">{formatDate(task.timestamp)}</span>
        )}
      </div>
      
      <div className="todo-actions">
        <button 
          onClick={handleEdit} 
          className="edit-btn" 
          aria-label={isEditing ? "Save" : "Edit"}
        >
          <i className={`fa ${isEditing ? 'fa-check' : 'fa-pen'}`}></i>
        </button>
        <button 
          onClick={() => deleteTask(task.id)} 
          className="delete-btn" 
          aria-label="Delete"
        >
          <i className="fa fa-times"></i>
        </button>
      </div>
    </li>
  );
};

const TodoCategories = ({ setActiveCategory, activeCategory }) => {
  const categories = [
    { id: null, name: 'All', icon: 'fa-list' },
    { id: 'work', name: 'Work', icon: 'fa-briefcase' },
    { id: 'personal', name: 'Personal', icon: 'fa-user' },
    { id: 'shopping', name: 'Shopping', icon: 'fa-shopping-cart' },
    { id: 'urgent', name: 'Urgent', icon: 'fa-exclamation-circle' }
  ];
  
  return (
    <div className="todo-categories">
      {categories.map(category => (
        <button
          key={category.name}
          className={`category-btn ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => setActiveCategory(category.id)}
        >
          <i className={`fa ${category.icon}`}></i>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [activeCategory, setActiveCategory] = useState(null);
  
  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = localStorage.getItem('todos');
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);
  
  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = () => {
    if (input.trim()) {
      setTasks(prev => [
        ...prev,
        { 
          id: Date.now(), 
          text: input.trim(), 
          done: false,
          timestamp: new Date().toISOString(),
          category: activeCategory !== 'All' ? activeCategory : null
        }
      ]);
      setInput('');
    }
  };

  const toggleTask = (id) => {
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  
  const editTask = (id, newText) => {
    if (!newText.trim()) return;
    setTasks(prev => prev.map(task =>
      task.id === id ? { ...task, text: newText.trim() } : task
    ));
  };
  
  // Calculate task counts for stats
  const taskCounts = {
    total: tasks.length,
    completed: tasks.filter(t => t.done).length,
    pending: tasks.filter(t => !t.done).length
  };
  
  // Filter tasks by category
  const filteredTasks = activeCategory 
    ? tasks.filter(task => task.category === activeCategory)
    : tasks;

  return (
    <div className="todo-container full-width">
      <TodoHeader 
        input={input} 
        setInput={setInput} 
        addTask={addTask}
        taskCounts={taskCounts}
      />
      
      <TodoCategories 
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />
      
      <ul className="tasks">
        {filteredTasks.length === 0 && (
          <li className="empty-tasks">
            <i className="fa fa-check-circle empty-icon"></i>
            <p>No tasks here. Add your first one!</p>
          </li>
        )}
        
        {filteredTasks.map(task => (
          <TodoItem
            key={task.id}
            task={task}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
            editTask={editTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList; 