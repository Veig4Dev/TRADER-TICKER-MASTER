// src/pages/ResultsPage.js
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
  const [macdData, setMacdData] = useState(null);
  const [adxData, setAdxData] = useState(null);
  const [aroonData, setAroonData] = useState(null);
  const [awesomeData, setAwesomeData] = useState(null);
  const [kamaData, setKamaData] = useState(null);



  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const macdResult = await ApiTraderServices.fetchIndicator('macd', ticker, startDate, endDate);
        setMacdData(macdResult);

        const adxResult = await ApiTraderServices.fetchIndicator('adx', ticker, startDate, endDate);
        setAdxData(adxResult);

        const aroonResult = await ApiTraderServices.fetchIndicator('aroon', ticker, startDate, endDate);
        setAroonData(aroonResult)

        const awesomeResult = await ApiTraderServices.fetchIndicator('awesome', ticker, startDate, endDate);
        setAwesomeData(awesomeResult);
        
        const kamaResult = await ApiTraderServices.fetchIndicator('kama', ticker, startDate, endDate);
        setKamaData(kamaResult);

      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [ticker, startDate, endDate]);

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
        {macdData && renderChart(
          'Gráfico do Indicador MACD',
          [macdData.macd, macdData.signal],
          macdData.dates,
          [
            { label: 'MACD', borderColor: 'rgb(75, 192, 192)', fill: false, tension: 0.1 },
            { label: 'Signal', borderColor: 'rgb(192, 75, 192)', fill: false, tension: 0.1 },
          ]
        )}
        {adxData && renderChart(
          'Gráfico do Indicador ADX',
          [adxData.pos, adxData.neg],
          adxData.dates,
          [
            { label: 'POS', borderColor: 'rgb(75, 192, 192)', fill: false, tension: 0.1 },
            { label: 'NEG', borderColor: 'rgb(192, 75, 192)', fill: false, tension: 0.1 },
          ]
        )}
        {aroonData && renderChart(
          'Gráfico do Indicador AROON',
          [aroonData.aroon_up, aroonData.aroon_up],
          aroonData.dates,
          [
            { label: 'UP', borderColor: 'rgb(75, 192, 192)', fill: false, tension: 0.1 },
            { label: 'DOWN', borderColor: 'rgb(192, 75, 192)', fill: false, tension: 0.1 },
          ]
        )}
        {awesomeData && renderChart(
          'Gráfico do Indicador AWESOME',
          [awesomeData.awesome],
          awesomeData.dates,
          [
            { label: 'AWESOME', borderColor: 'rgb(10, 192, 20)', fill: false, tension: 0.1 },
          ]
        )}
         {kamaData && renderChart(
          'Gráfico do Indicador KAMA',
          [kamaData.kama],
          kamaData.dates,
          [
            { label: 'KAMA', borderColor: 'rgb(10, 192, 20)', fill: false, tension: 0.1 },
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
