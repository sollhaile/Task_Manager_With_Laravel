// src/components/TaskList.jsx
import { useState, useEffect } from 'react';
import taskService from "../service/taskService";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await taskService.getAllTasks();
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        // Remove task from local state
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        setError('Failed to delete task');
        console.error('Error:', err);
      }
    }
  };

  const toggleComplete = async (task) => {
    try {
      const updatedTask = await taskService.updateTask(task.id, {
        ...task,
        is_completed: !task.is_completed
      });
      // Update task in local state
      setTasks(tasks.map(t => t.id === task.id ? updatedTask.data : t));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error:', err);
    }
  };

  if (loading) return <div className="loading">Loading tasks...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="task-list">
      <h2>Task Manager</h2>
      {tasks.length === 0 ? (
        <p>No tasks found. Create your first task!</p>
      ) : (
        <ul>
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.is_completed ? 'completed' : ''}`}>
              <div className="task-content">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <span className="status">
                  {task.is_completed ? 'Completed' : 'Pending'}
                </span>
              </div>
              <div className="task-actions">
                <button 
                  onClick={() => toggleComplete(task)}
                  className={`btn ${task.is_completed ? 'btn-warning' : 'btn-success'}`}
                >
                  {task.is_completed ? 'Mark Pending' : 'Mark Complete'}
                </button>
                <button 
                  onClick={() => handleDelete(task.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;