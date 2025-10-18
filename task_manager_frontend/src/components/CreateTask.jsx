// src/components/CreateTask.jsx
import { useState } from 'react';
import taskService from '../service/taskService';

const CreateTask = ({ onTaskCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    is_completed: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await taskService.createTask(formData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        is_completed: false
      });
      
      // Notify parent component
      if (onTaskCreated) {
        onTaskCreated();
      }
      
      alert('Task created successfully!');
    } catch (err) {
      setError(err.message || 'Failed to create task');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-task">
      <h3>Create New Task</h3>
      <form onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="is_completed"
              checked={formData.is_completed}
              onChange={handleChange}
            />
            Completed
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Task'}
        </button>
      </form>
    </div>
  );
};

export default CreateTask;