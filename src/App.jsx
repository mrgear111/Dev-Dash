import { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'
import ProjectManager from './components/ProjectManager'
import TodoList from './components/TodoList'
import SkillTracker from './components/SkillTracker'
import Notes from './components/Notes'

function App() {
  const [selectedSection, setSelectedSection] = useState('projects');

  let MainSection;
  if (selectedSection === 'projects') {
    MainSection = <ProjectManager />;
  } else if (selectedSection === 'todo') {
    MainSection = <TodoList />;
  } else if (selectedSection === 'skills') {
    MainSection = <SkillTracker />;
  } else if (selectedSection === 'notes') {
    MainSection = <Notes />;
  } else {
    MainSection = <div style={{ color: '#fff', margin: 'auto' }}>Section coming soon!</div>;
  }

  return (
    <div className="app-container">
      <Sidebar onSectionSelect={setSelectedSection} selectedSection={selectedSection} />
      {MainSection}
    </div>
  )
}

export default App

