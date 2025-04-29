import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import './Notes.css';

// Helper components
const NoteHeader = ({ addingNote, setAddingNote, searchTerm, setSearchTerm }) => (
  <header className="note-header">
    <div className="note-title-section">
      <h2>Notes / Docs</h2>
      <div className="note-actions">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search" onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>
        <button 
          onClick={() => setAddingNote(!addingNote)} 
          className="add-note-btn"
        >
          <i className={`fa ${addingNote ? 'fa-times' : 'fa-plus'}`}></i>
          {addingNote ? 'Cancel' : 'New Note'}
        </button>
      </div>
    </div>
  </header>
);

const TagSelector = ({ 
  tagInput, 
  setTagInput, 
  availableTags, 
  selectedTags, 
  handleTagAdd, 
  handleTagRemove 
}) => (
  <div className="tag-selector">
    <div className="tag-input-wrapper">
      <input
        type="text"
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        placeholder="Type a tag and press Enter"
        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
        className="dark-input tag-input"
      />
      <button type="button" onClick={handleTagAdd} className="add-tag-btn">
        <i className="fa fa-plus"></i>
      </button>
    </div>
    
    <div className="available-tags">
      {availableTags.map(tag => (
        <button
          key={tag}
          type="button"
          className={`tag-chip ${selectedTags.includes(tag) ? 'selected' : ''}`}
          onClick={() => {
            if (selectedTags.includes(tag)) {
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
    
    {selectedTags.length > 0 && (
      <div className="selected-tags">
        {selectedTags.map(tag => (
          <div key={tag} className="tag-chip selected">
            <span>{tag}</span>
            <button type="button" onClick={() => handleTagRemove(tag)}>×</button>
          </div>
        ))}
      </div>
    )}
  </div>
);

const NoteForm = ({ newNote, handleInputChange, handleSubmit, tagInput, setTagInput, handleTagAdd, handleTagRemove, availableTags }) => (
  <form onSubmit={handleSubmit} className="note-form dark-form">
    <div className="form-grid">
      <div className="form-group full-width">
        <label><i className="fas fa-heading"></i> Note Title</label>
        <input
          type="text"
          name="title"
          value={newNote.title}
          onChange={handleInputChange}
          placeholder="Enter note title"
          required
          className="dark-input"
        />
      </div>
      
      <div className="form-group full-width">
        <label><i className="fas fa-align-left"></i> Note Content</label>
        <textarea
          name="content"
          value={newNote.content}
          onChange={handleInputChange}
          placeholder={newNote.isMarkdown ? "Enter your content with Markdown support..." : "Enter your note content..."}
          required
          className="dark-input note-textarea"
          rows={8}
        />
      </div>

      <div className="form-group full-width">
        <label><i className="fas fa-tags"></i> Tags</label>
        <TagSelector 
          tagInput={tagInput}
          setTagInput={setTagInput}
          availableTags={availableTags}
          selectedTags={newNote.tags}
          handleTagAdd={handleTagAdd}
          handleTagRemove={handleTagRemove}
        />
      </div>

      <div className="form-group markdown-toggle">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={newNote.isMarkdown}
            onChange={(e) => handleInputChange({
              target: { name: 'isMarkdown', value: e.target.checked }
            })}
            className="toggle-checkbox"
          />
          <span className="toggle-text">Enable Markdown</span>
        </label>
      </div>
    </div>

    <div className="form-actions">
      <button type="submit" className="save-note-btn">
        <i className="fas fa-save"></i> Save Note
      </button>
    </div>
  </form>
);

const NoteCard = ({ note, deleteNote }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="note-card">
      <div className="note-card-header">
        <h3>{note.title}</h3>
        <div className="note-actions">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="expand-btn"
            aria-label={isExpanded ? "Collapse" : "Expand"}
          >
            <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="delete-btn"
            aria-label="Delete"
          >
            <i className="fas fa-trash"></i>
          </button>
        </div>
      </div>
      
      {note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map(tag => (
            <span key={tag} className="tag-chip">{tag}</span>
          ))}
        </div>
      )}
      
      <div className={`note-content ${isExpanded ? 'expanded' : 'collapsed'}`}>
        {note.isMarkdown ? (
          <ReactMarkdown>{note.content}</ReactMarkdown>
        ) : (
          <p>{note.content}</p>
        )}
      </div>
      
      {!isExpanded && note.content.length > 150 && (
        <button 
          className="show-more-btn" 
          onClick={() => setIsExpanded(true)}
        >
          Show more
        </button>
      )}
    </div>
  );
};

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: '',
    content: '',
    tags: [],
    isMarkdown: false,
    createdAt: null
  });
  const [tagInput, setTagInput] = useState('');
  const [addingNote, setAddingNote] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const availableTags = ['Documentation', 'Ideas', 'Bugfix', 'Research', 'Tutorial', 'Code Snippet'];

  // Load notes from localStorage
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);
  
  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

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
      setNotes(prev => [
        ...prev, 
        { 
          ...newNote, 
          id: Date.now(),
          createdAt: new Date().toISOString()
        }
      ]);
      setNewNote({
        title: '',
        content: '',
        tags: [],
        isMarkdown: false,
        createdAt: null
      });
      setTagInput('');
      setAddingNote(false);
    }
  };
  
  const deleteNote = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      setNotes(prev => prev.filter(note => note.id !== id));
    }
  };
  
  // Filter notes based on search term
  const filteredNotes = notes.filter(note => {
    if (!searchTerm) return true;
    
    const search = searchTerm.toLowerCase();
    return (
      note.title.toLowerCase().includes(search) ||
      note.content.toLowerCase().includes(search) ||
      note.tags.some(tag => tag.toLowerCase().includes(search))
    );
  });

  return (
    <div className="notes-container full-width">
      <NoteHeader 
        addingNote={addingNote} 
        setAddingNote={setAddingNote}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      
      {addingNote && (
        <NoteForm 
          newNote={newNote}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          tagInput={tagInput}
          setTagInput={setTagInput}
          handleTagAdd={handleTagAdd}
          handleTagRemove={handleTagRemove}
          availableTags={availableTags}
        />
      )}

      {notes.length === 0 ? (
        <div className="empty-notes">
          <i className="fas fa-sticky-note empty-icon"></i>
          <p>No notes yet. Click "New Note" to get started!</p>
        </div>
      ) : filteredNotes.length === 0 ? (
        <div className="empty-notes">
          <i className="fas fa-search empty-icon"></i>
          <p>No notes match your search.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {filteredNotes.map(note => (
            <NoteCard 
              key={note.id} 
              note={note}
              deleteNote={deleteNote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes; 