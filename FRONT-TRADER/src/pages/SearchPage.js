import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiTraderServices from '../services/ApiTraderServices';
import DateRangePicker from '../components/DateRangePicker';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LineElement, PointElement, LineController, LinearScale } from 'chart.js';
import '../css/SearchPage.css';

Chart.register(CategoryScale, LineElement, PointElement, LineController, LinearScale);

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [indicatorData, setIndicatorData] = useState({});
  const [selectedIndicators, setSelectedIndicators] = useState({
    macd: true,
    adx: true,
    aroon: true,
    awesome: true,
    kama: true,
    bollinger: true,
    tsi: true,
    rsi: true,
    stc: true,
  });

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

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
  
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;
  
    return [year, month, day].join('-');
  };
  
  const fetchData = async () => {
    try {
      const formattedStartDate = startDate ? formatDate(startDate) : '';
      const formattedEndDate = endDate ? formatDate(endDate) : '';
  
      const indicators = ['macd', 'adx', 'aroon', 'awesome', 'kama', 'bollinger', 'tsi', 'rsi', 'stc'];
      const data = await Promise.all(
        indicators.map(async (indicator) => {
          const result = await ApiTraderServices.fetchIndicator(indicator, query, formattedStartDate, formattedEndDate);
          return { [indicator]: result };
        })
      );
      setIndicatorData(Object.assign({}, ...data));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getSearch = (e) => {
    e.preventDefault();
    if (query && startDate && endDate) {
      setIsLoading(true);
      setError(null);
      fetchData();
    } else {
      setError('Please enter the stock ticker and the date range.');
    }
  };

  const handleCustomDate = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };


  const handleIndicatorChange = (indicator) => {
    setSelectedIndicators((prev) => ({ ...prev, [indicator]: !prev[indicator] }));
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
      },
    },
  };

  const renderChart = (title, data, labels, datasetOptions) => (
    <div className="chart">
      <h2>{title}</h2>
      <div className="chart-container">
        <Line
          data={{
            labels,
            datasets: datasetOptions.map((option, index) => ({
              ...option,
              data: data[index],
            })),
          }}
          options={chartOptions}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className="geometric-background"></div>
      <div className="search-page">
        <h1>Stock Ticker Search</h1>
        <img src="images/logo.jpg" alt="Logo" className="logo" />
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
        {isLoading && <p className="loading">Loading...</p>}
        {error && <p className="error">{error}</p>}
        {!isLoading && Object.keys(indicatorData).length > 0 && (
          <div className="results-container">
            <div className="indicators-selection">
              {Object.keys(selectedIndicators).map((indicator) => (
                <label key={indicator}>
                  <input
                    type="checkbox"
                    checked={selectedIndicators[indicator]}
                    onChange={() => handleIndicatorChange(indicator)}
                  />
                  {indicator.toUpperCase()}
                </label>
              ))}
            </div>
            {selectedIndicators.macd && indicatorData.macd && renderChart(
              'Gráfico do Indicador MACD',
              [indicatorData.macd.macd, indicatorData.macd.signal],
              indicatorData.macd.dates,
              [
                { label: 'MACD', borderColor: 'rgb(75, 192, 192)' },
                { label: 'Signal', borderColor: 'rgb(192, 75, 192)' },
              ]
            )}
            {selectedIndicators.adx && indicatorData.adx && renderChart(
              'Gráfico do Indicador ADX',
              [indicatorData.adx.pos, indicatorData.adx.neg],
              indicatorData.adx.dates,
              [
                { label: 'POS', borderColor: 'rgb(75, 192, 192)' },
                { label: 'NEG', borderColor: 'rgb(192, 75, 192)' },
              ]
            )}
            {selectedIndicators.aroon && indicatorData.aroon && renderChart(
              'Gráfico do Indicador AROON',
              [indicatorData.aroon.aroon_up, indicatorData.aroon.aroon_down],
              indicatorData.aroon.dates,
              [
                { label: 'UP', borderColor: 'rgb(75, 192, 192)' },
                { label: 'DOWN', borderColor: 'rgb(192, 75, 192)' },
              ]
            )}
            {selectedIndicators.awesome && indicatorData.awesome && renderChart(
              'Gráfico do Indicador AWESOME',
              [indicatorData.awesome.awesome],
              indicatorData.awesome.dates,
              [
                { label: 'AWESOME', borderColor: 'rgb(10, 192, 20)' },
              ]
            )}
            {selectedIndicators.kama && indicatorData.kama && renderChart(
              'Gráfico do Indicador KAMA',
              [indicatorData.kama.kama],
              indicatorData.kama.dates,
              [
                { label: 'KAMA', borderColor: 'rgb(10, 192, 20)' },
              ]
            )}
            {selectedIndicators.bollinger && indicatorData.bollinger && renderChart(
              'Gráfico do Indicador Bollinger',
              [indicatorData.bollinger.hband_struct, indicatorData.bollinger.hband_indicator, indicatorData.bollinger.lband_struct, indicatorData.bollinger.lband_indicator],
              indicatorData.bollinger.dates,
              [
                { label: 'HBAND_STRUCT', borderColor: 'rgb(10, 192, 20)' },
                { label: 'HBAND_INDICATOR', borderColor: 'rgb(192, 75, 192)' },
                { label: 'LBAND_INDICATOR', borderColor: 'rgb(892, 10, 400)' },
                { label: 'LBAND_STRUCT', borderColor: 'rgb(092, 400, 2)' },
              ]
            )}
            {selectedIndicators.tsi && indicatorData.tsi && renderChart(
              'Gráfico do Indicador TSI',
                [indicatorData.tsi.tsi],
                indicatorData.tsi.dates,
              [
                  { label: 'TSI', borderColor: 'rgb(10, 192, 20)' },
              ]
            )}
{selectedIndicators.rsi && indicatorData.rsi && renderChart(
'Gráfico do Indicador RSI',
[indicatorData.rsi.rsi],
indicatorData.rsi.dates,
[
{ label: 'RSI', borderColor: 'rgb(10, 192, 20)' },
]
)}
{selectedIndicators.stc && indicatorData.stc && renderChart(
'Gráfico do Indicador STC',
[indicatorData.stc.stc],
indicatorData.stc.dates,
[
{ label: 'STC', borderColor: 'rgb(10, 192, 20)' },
]
)}
</div>
)}
</div>
</>
);
};

export default SearchPage;
