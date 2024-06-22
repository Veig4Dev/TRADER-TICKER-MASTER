// src/services/ApiTraderServices.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api';  // Altere conforme a URL da sua API


//http://localhost:8000/api/aroon/?ticker=PETR3.SA&datainicio=2024-06-10&datafim=2024-06-30


const ApiTraderServices = {
  searchStock: async (ticker, startDate, endDate) => {

    console.log('Form submitted');
    console.log('Query:', ticker);
    console.log('StartDate:', startDate);
    console.log('EndDate:', endDate);
    
    

    const urls = [
      // `${BASE_URL}/macd/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
      // `${BASE_URL}/adx/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
      `${BASE_URL}/macd/?ticker=PETR3.SA&datainicio=2024-01-01&datafim=2024-06-22`,

      // `${BASE_URL}/bollinger/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
      // `${BASE_URL}/keltner/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
      // `${BASE_URL}/aroon/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
      // `${BASE_URL}/stc/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
      // `${BASE_URL}/awesome/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
      // `${BASE_URL}/kama/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
      // `${BASE_URL}/tsi/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
      // `${BASE_URL}/rsi/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`,
    ];

    try {
    
    const responses = await Promise.all(urls.map(url => axios.get(url)));
    
    
      const data = responses.map(response => response.data);
      console.log('Respostas da API:', data);
      return data;
    } catch (error) {
      console.error('Erro ao buscar dados de estoque:', error.message);
      throw Error(`Erro ao buscar dados de estoque para ${ticker}: ${error.message}`);
    }
  },
};

export default ApiTraderServices;
