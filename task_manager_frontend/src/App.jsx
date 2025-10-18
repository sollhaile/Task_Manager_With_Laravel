// src/App.jsx
import { useState } from 'react';
import TaskList from './components/TaskList';
import CreateTask from './components/CreateTask';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  const handleTaskCreated = () => {
    // Trigger refresh of task list
    setRefresh(prev => !prev);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager App</h1>
        <p>React Frontend + Laravel Backend</p>
      </header>
      
      <main className="App-main">
        <div className="container">
          <div className="sidebar">
            <CreateTask onTaskCreated={handleTaskCreated} />
          </div>
          
          <div className="content">
            <TaskList key={refresh} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;