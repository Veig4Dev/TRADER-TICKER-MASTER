// src/pages/SearchPage.js
import React, { useState } from 'react';
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
  const navigate = useNavigate();

  const getSearch = async (e) => {
    e.preventDefault();
    
    if (query && startDate && endDate) {
      setIsLoading(true);
      setError(null);
      try {
        debugger
        const formatDate = (date) => date.toISOString().split('T')[0];
        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);
        
        navigate('/results', { state: { ticker: query, startDate: formattedStartDate, endDate: formattedEndDate } }); 
      } catch (error) {
        console.error('Erro ao pesquisar:', error);
        setError('Erro ao buscar dados. Por favor, tente novamente.');
        setIsLoading(false);
      }
    } else {
      setError('Por favor, insira o ticker da ação e o intervalo de datas.');
    }
  };

  const handleCustomDate = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className="search-page">
      <h1>Buscador de Ações</h1>
      <form onSubmit={getSearch}>
        <input
          type="text"
          placeholder="Digite o ticker da ação"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <DateRangePicker onChange={handleCustomDate} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {isLoading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default SearchPage;
