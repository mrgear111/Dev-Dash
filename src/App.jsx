import { useState } from 'react'
import Sidebar from './components/Sidebar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app-container">
      <Sidebar />
      <main className="main-content">
        <div>
          <h1>Welcome to DevDash</h1>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
