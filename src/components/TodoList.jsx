import React, { useState } from 'react';
import './TodoList.css';

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = () => {
    if (input.trim()) {
      setTasks(prev => [
        ...prev,
        { id: Date.now(), text: input.trim(), done: false }
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

  return (
    <div className="todo-list">
      <header className="todo-header">
        <h2>To-Do List</h2>
        <div className="todo-input-row">
          <input
            type="text"
            placeholder="Add a new task..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTask()}
          />
          <button onClick={addTask}>Add</button>
        </div>
      </header>
      <ul className="tasks">
        {tasks.length === 0 && (
          <li className="empty-tasks">No tasks yet. Add your first one!</li>
        )}
        {tasks.map(task => (
          <li key={task.id} className={task.done ? 'done' : ''}>
            <label>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.text}</span>
            </label>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>&times;</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList; 