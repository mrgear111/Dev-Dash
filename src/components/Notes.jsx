 import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import './Notes.css';

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [],
    isMarkdown: false
  });
  const [tagInput, setTagInput] = useState('');

  const availableTags = ['Ideas', 'Bugfix', 'Research', 'Random Thought'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNote(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagAdd = () => {
    if (tagInput.trim() && !newNote.tags.includes(tagInput.trim())) {
      setNewNote(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleTagRemove = (tagToRemove) => {
    setNewNote(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.title.trim() && newNote.content.trim()) {
      setNotes(prev => [...prev, { ...newNote, id: Date.now() }]);
      setNewNote({
        title: '',
        content: '',
        tags: [],
        isMarkdown: false
      });
      setTagInput('');
    }
  };

  return (
    <div className="notes-container">
      <h2>📋 Notes / Docs</h2>
      
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label>Note Title</label>
          <input
            type="text"
            name="title"
            value={newNote.title}
            onChange={handleInputChange}
            placeholder="Enter note title"
            required
          />
        </div>

        <div className="form-group">
          <label>Note Content</label>
          <textarea
            name="content"
            value={newNote.content}
            onChange={handleInputChange}
            placeholder="Enter your note content"
            required
          />
        </div>

        <div className="form-group">
          <label>Tags</label>
          <div className="tags-input">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="Type a tag and press Enter"
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
            />
            <button type="button" onClick={handleTagAdd}>Add Tag</button>
          </div>
          <div className="available-tags">
            {availableTags.map(tag => (
              <button
                key={tag}
                type="button"
                className={`tag ${newNote.tags.includes(tag) ? 'selected' : ''}`}
                onClick={() => {
                  if (newNote.tags.includes(tag)) {
                    handleTagRemove(tag);
                  } else {
                    setTagInput(tag);
                    handleTagAdd();
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="selected-tags">
            {newNote.tags.map(tag => (
              <span key={tag} className="tag">
                {tag}
                <button type="button" onClick={() => handleTagRemove(tag)}>×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={newNote.isMarkdown}
              onChange={(e) => setNewNote(prev => ({ ...prev, isMarkdown: e.target.checked }))}
            />
            Enable Markdown
          </label>
        </div>

        <button type="submit">Save Note</button>
      </form>

      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <div className="note-content">
              {note.isMarkdown ? (
                <ReactMarkdown>{note.content}</ReactMarkdown>
              ) : (
                <p>{note.content}</p>
              )}
            </div>
            <div className="note-tags">
              {note.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes; 