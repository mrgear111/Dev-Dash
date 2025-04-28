import { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'
import ProjectManager from './components/ProjectManager'
import TodoList from './components/TodoList'

function App() {
  const [selectedSection, setSelectedSection] = useState('projects');

  let MainSection;
  if (selectedSection === 'projects') {
    MainSection = <ProjectManager />;
  } else if (selectedSection === 'todo') {
    MainSection = <TodoList />;
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

