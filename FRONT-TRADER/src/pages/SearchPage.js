import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiTraderServices from '../services/ApiTraderServices';
import DateRangePicker from '../components/DateRangePicker'; 
import '../css/SearchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query) {
      const result = ApiTraderServices.getSuggestions(query);
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  }, [query]);

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
  };

  const getSearch = async (e) => {
    e.preventDefault();
    
    if (query && startDate && endDate) {
      setIsLoading(true);
      setError(null);
      try {
        const formatDate = (date) => date.toISOString().split('T')[0];
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        
        navigate('/results', { state: { ticker: query, startDate: formattedStartDate, endDate: formattedEndDate } }); 
      } catch (error) {
        console.error('Error while searching:', error);
        setError('Error fetching data. Please try again.');
        setIsLoading(false);
      }
    } else {
      setError('Please enter the stock ticker and the date range.');
    }
  };

  const handleCustomDate = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <>
      <div className="geometric-background"></div>
      <div className="search-page">
        <h1>Stock Ticker Search</h1>
        <p className="slogan">Find Your Next Investment</p>
        <form onSubmit={getSearch}>
          <div className="search-input-container">
            <input
              type="text"
              placeholder="Enter stock ticker"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
              className="search-input"
            />
            {/* <span className="dropdown-icon">&#9662;</span> */}
            {suggestions.length > 0 && (
              <ul className="suggestions-list">
                {suggestions.map((suggestion, index) => (
                  <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="date-picker-container">
            <DateRangePicker onChange={handleCustomDate} />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
        {isLoading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </>
  );
};

export default SearchPage;
