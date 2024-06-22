import React from 'react';
import { useLocation } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { Macd } from '../models/graphycs/Macd'; // Importe a classe Macd corretamente
import '../css/ResultsPage.css';

const ResultsPage = () => {
  const location = useLocation();
  const results = location.state?.results;

  console.debug(results);

  if (!results || !results.macd || results.macd.length === 0) {
    return <p>Carregando...</p>;
  }

  // Aqui acessamos o primeiro elemento do array results.macd para obter os dados específicos
  const firstResult = results.macd[0];
  debugger;
  // Verifica se o objeto firstResult contém todos os dados necessários
  if (!firstResult || !firstResult.dates || !firstResult.macd || !firstResult.signal || !firstResult.diff) {

    return <p>Dados inválidos.</p>;
  }

  const chartData = {
    labels: firstResult.dates,
    datasets: [
      {
        label: 'MACD',
        data: firstResult.macd,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      {
        label: 'Signal',
        data: firstResult.signal,
        fill: false,
        borderColor: 'rgb(192, 75, 192)',
        tension: 0.1,
      },
      {
        label: 'Difference',
        data: firstResult.diff,
        fill: false,
        borderColor: 'rgb(192, 192, 75)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category', // Indica que os dados do eixo X são categorias
        labels: firstResult.dates, // Rótulos do eixo X
      },
    },
  };

  return (
    <div className="results-page">
      <div>
        <h1>Nome da Empresa</h1>
        <p>Descrição da Empresa</p>
        <div className="chart">
          <h2>Gráfico do Indicador MACD</h2>
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};



export default ResultsPage;
