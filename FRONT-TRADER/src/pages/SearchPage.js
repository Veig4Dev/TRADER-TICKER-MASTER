import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiTraderServices from '../services/ApiTraderServices';
import DateRangePicker from '../components/DateRangePicker'; 
import '../css/SearchPage.css';
import { transformData } from '../utils/transformData';
import ResultsPage from './ResultsPage';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getSearch = async (e) => {
    e.preventDefault();
    
    
    if (query && startDate && endDate) {
      
      setIsLoading(true);
      setError(null);
      try {
        

        const formatDate = (date) => {
          return date.toISOString().split('T')[0];
        };

        const formattedStartDate = formatDate(startDate);
        const formattedEndDate = formatDate(endDate);


        const apiData = await ApiTraderServices.searchStock(query, formattedStartDate, formattedEndDate);
        console.log('API Data:', apiData);

        const transformedResults = transformData(apiData);
        console.log('transformedResults:', transformedResults);

        // setResults(transformedResults);
        setIsLoading(false);
        navigate('/results', { state: { results: transformedResults } }); // Passa os resultados via state

        // ResultsPage(transformedResults);
        // navigate(`/results?query=${query}`, { state: { results: transformedResults } });
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
    console.log('Received Dates:', { startDate, endDate });
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
          onChange={(e) => {
            console.log('Ticker changed:', e.target.value);
            setQuery(e.target.value);
          }}
          disabled={isLoading}
        />
        <DateRangePicker onChange={handleCustomDate} />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </button>
      </form>
      {isLoading && <p>Carregando...</p>}
      {error && <p className="error">{error}</p>}
      
      {/* {results && (
        <div className="results">
          <h2>Resultados:</h2>
          {Object.keys(results).map((key) => (
            <div key={key}>
              <h3>{key.toUpperCase()}</h3>
              <pre>{JSON.stringify(results[key], null, 2)}</pre>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default SearchPage;
