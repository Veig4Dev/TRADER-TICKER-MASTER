import axios from 'axios';
import { transformData } from '../utils/transformData';

const BASE_URL = 'http://localhost:8000/api';  // Altere conforme a URL da sua API

const ApiTraderServices = {
  fetchIndicator: async (indicator, ticker, startDate, endDate) => {
    // const url = `${BASE_URL}/${indicator}/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`;
    const url = `${BASE_URL}/${indicator}/?ticker=PETR3.SA&datainicio=2024-01-01&datafim=2024-06-22`;

    console.log('Fetching data from URL:', url);
    try {
      const response = await axios.get(url);
      console.log('API Response:', response.data);
      debugger
      return transformData([response.data])[indicator][0];
    } catch (error) {
      throw new Error(`Erro ao buscar dados de ${indicator}: ${error.message}`);
    }
  }
};

export default ApiTraderServices;
