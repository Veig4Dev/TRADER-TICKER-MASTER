import axios from 'axios';
import { transformData } from '../utils/transformData';

// const BASE_URL = 'http://localhost:8000/api';  
const BASE_URL = 'http://18.230.226.80/api';

const staticTickers = ['PETR3.SA', 'VALE3.SA', 'ITUB4.SA', 'BBAS3.SA', 'BBDC4.SA', 'ABEV3.SA', 'BRFS3.SA', 'ELET3.SA', 'MGLU3.SA', 'WEGE3.SA'];

const ApiTraderServices = {
  fetchIndicator: async (indicator, ticker, startDate, endDate) => {
    const url = `${BASE_URL}/${indicator}/?ticker=${ticker}&datainicio=${startDate}&datafim=${endDate}`;
    // const url = `${BASE_URL}/${indicator}/?ticker=PETR3.SA&datainicio=2024-01-01&datafim=2024-06-22`;

    console.log('Buscando dados:', url , startDate ,endDate);
    try {
      const response = await axios.get(url);
      console.log('API Response:', response.data);
      debugger
      return transformData([response.data])[indicator][0];
    } catch (error) {
      throw new Error(`Erro ao buscar dados de ${indicator}: ${error.message}`);
    }
  },

 getSuggestions: (query) => {
    return staticTickers.filter(ticker => ticker.toLowerCase().includes(query.toLowerCase()));
  }
};

export default ApiTraderServices;
