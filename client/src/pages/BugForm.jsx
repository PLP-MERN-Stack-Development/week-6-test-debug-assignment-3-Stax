// client/src/pages/BugForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const BugForm = () => { // Make sure 'BugForm' is defined as a function or class
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Open');
  const [priority, setPriority] = useState('Low');
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL for edit mode

  useEffect(() => {
    if (id) {
      // Fetch bug details if in edit mode
      const fetchBug = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/bugs/${id}`);
          const bug = response.data;
          setTitle(bug.title);
          setDescription(bug.description);
          setStatus(bug.status);
          setPriority(bug.priority);
        } catch (error) {
          console.error('Error fetching bug for edit:', error);
          alert('Failed to load bug for editing.');
        }
      };
      fetchBug();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bugData = { title, description, status, priority };

    try {
      if (id) {
        // Update existing bug
        await axios.put(`http://localhost:5000/api/bugs/${id}`, bugData);
        alert('Bug updated successfully!');
      } else {
        // Create new bug
        await axios.post('http://localhost:5000/api/bugs', bugData);
        alert('Bug reported successfully!');
      }
      navigate('/'); // Redirect to bug list
    } catch (error) {
      console.error('Error submitting bug:', error);
      alert(`Failed to ${id ? 'update' : 'report'} bug.`);
    }
  };

  return (
    <div>
      <h1>{id ? 'Edit Bug' : 'Report New Bug'}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div>
          <label>Status:</label>
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
        <div>
          <label>Priority:</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">{id ? 'Update Bug' : 'Report Bug'}</button>
      </form>
    </div>
  );
};

export default BugForm; // <--- THIS IS THE ABSOLUTELY CRUCIAL LINE