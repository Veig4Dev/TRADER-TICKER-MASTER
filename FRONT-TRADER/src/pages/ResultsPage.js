import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LineElement, PointElement, LineController, LinearScale } from 'chart.js';
import ApiTraderServices from '../services/ApiTraderServices';
import '../css/ResultsPage.css';

Chart.register(CategoryScale, LineElement, PointElement, LineController, LinearScale);

const ResultsPage = () => {
  const location = useLocation();
  const { ticker, startDate, endDate } = location.state;
  const [indicatorData, setIndicatorData] = useState({});
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const indicators = ['macd', 'adx', 'aroon', 'awesome', 'kama', 'bollinger', 'tsi', 'rsi', 'stc'];
        const data = await Promise.all(
          indicators.map(async (indicator) => {
            const result = await ApiTraderServices.fetchIndicator(indicator, ticker, startDate, endDate);
            return { [indicator]: result };
          })
        );
        setIndicatorData(Object.assign({}, ...data));
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [ticker, startDate, endDate]);

  const handleIndicatorChange = (indicator) => {
    setSelectedIndicators((prev) => ({ ...prev, [indicator]: !prev[indicator] }));
  };

  if (error) {
    return <p>{error}</p>;
  }

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
    <div className="results-page">
      <div className="ads">
        <div className="ad">Anúncio 1</div>
        <div className="ad">Anúncio 2</div>
      </div>
      <div className="main-content">
        <h1>{ticker}</h1>
        <p>Período: {startDate} a {endDate}</p>
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
      <div className="ads">
        <div className="ad">Anúncio 3</div>
        <div className="ad">Anúncio 4</div>
      </div>
    </div>
  );
};

export default ResultsPage;
