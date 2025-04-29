import { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'
import ProjectManager from './components/ProjectManager'
import TodoList from './components/TodoList'
import SkillTracker from './components/SkillTracker'
import Notes from './components/Notes'
import Navbar from './components/Navbar'

function App() {
  const [selectedSection, setSelectedSection] = useState('projects');

  const renderMainContent = () => {
    switch (selectedSection) {
      case 'projects':
        return <ProjectManager />;
      case 'todo':
        return <TodoList />;
      case 'skills':
        return <SkillTracker />;
      case 'notes':
        return <Notes />;
      default:
        return <div className="empty-state">Section coming soon!</div>;
    }
  };

  return (
    <div className="app-container">
      <Navbar />
      <div className="app-content">
        <Sidebar onSectionSelect={setSelectedSection} selectedSection={selectedSection} />
        <main className="main-content">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

export default App

