// client/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BugList from './pages/BugList';
import BugForm from './pages/BugForm';
import BugDetails from './pages/BugDetails';
import ErrorBoundary from './components/ErrorBoundary'; // This component must exist

function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{ padding: '20px', backgroundColor: '#f0f0f0' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Bug List</Link>
          <Link to="/add">Report New Bug</Link>
        </nav>
        <div style={{ padding: '20px' }}>
          <ErrorBoundary> {/* Wrap your routes with ErrorBoundary */}
            <Routes>
              <Route path="/" element={<BugList />} />
              <Route path="/add" element={<BugForm />} />
              <Route path="/edit/:id" element={<BugForm />} /> {/* For updating existing bugs */}
              <Route path="/bugs/:id" element={<BugDetails />} />
            </Routes>
          </ErrorBoundary>
        </div>
      </div>
    </Router>
  );
}

export default App;