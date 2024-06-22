import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import SearchPage from './pages/SearchPage';
import ResultsPage from './pages/ResultsPage';

import './css/App.css';

function App() {
  return (
    <div className="App">
      <Router> 
        <Routes> 
          <Route path="/" element={<SearchPage />} /> 
          <Route path="/results" element={<ResultsPage />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
