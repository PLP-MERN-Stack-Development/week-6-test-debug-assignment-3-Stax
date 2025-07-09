// client/src/pages/BugList.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BugList = () => { // It MUST be a functional or class component
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBugs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/bugs');
        setBugs(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bugs:', err);
        setError('Failed to fetch bugs. Please try again later.');
        setLoading(false);
      }
    };
    fetchBugs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bug?')) {
      try {
        await axios.delete(`http://localhost:5000/api/bugs/${id}`);
        setBugs(bugs.filter((bug) => bug._id !== id));
      } catch (err) {
        console.error('Error deleting bug:', err);
        alert('Failed to delete bug.');
      }
    }
  };

  if (loading) return <p>Loading bugs...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Bug List</h1>
      {bugs.length === 0 ? (
        <p>No bugs reported yet. Report one!</p>
      ) : (
        <ul>
          {bugs.map((bug) => (
            <li key={bug._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
              <h3><Link to={`/bugs/${bug._id}`}>{bug.title}</Link></h3>
              <p>Description: {bug.description}</p>
              <p>Status: {bug.status}</p>
              <p>Priority: {bug.priority}</p>
              <button onClick={() => handleDelete(bug._id)} style={{ marginRight: '10px' }}>Delete</button>
              <Link to={`/edit/${bug._id}`}>
                <button>Edit</button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BugList; // <--- THIS LINE IS CRUCIAL