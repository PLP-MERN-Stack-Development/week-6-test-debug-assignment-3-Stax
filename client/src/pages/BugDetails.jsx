// client/src/pages/BugDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

const BugDetails = () => { // Make sure 'BugDetails' is defined as a function or class
  const [bug, setBug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get ID from URL

  useEffect(() => {
    const fetchBug = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/bugs/${id}`);
        setBug(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bug details:', err);
        setError('Failed to load bug details. Bug might not exist.');
        setLoading(false);
      }
    };
    fetchBug();
  }, [id]);

  if (loading) return <p>Loading bug details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!bug) return <p>Bug not found.</p>; // Should technically be caught by error, but good fallback

  return (
    <div>
      <h1>Bug Details: {bug.title}</h1>
      <p><strong>Description:</strong> {bug.description}</p>
      <p><strong>Status:</strong> {bug.status}</p>
      <p><strong>Priority:</strong> {bug.priority}</p>
      <p><strong>Created At:</strong> {new Date(bug.createdAt).toLocaleString()}</p>
      <p><strong>Last Updated:</strong> {new Date(bug.updatedAt).toLocaleString()}</p>
      <Link to="/">Back to Bug List</Link>
    </div>
  );
};

export default BugDetails; // <--- THIS IS THE ABSOLUTELY CRUCIAL LINE