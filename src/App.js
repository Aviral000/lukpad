import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HeartfeltStory from './HeartFeltStory';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeartfeltStory />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
