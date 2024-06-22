// import { Macd } from '../models/graphycs/Macd';
import { Adx } from '../models/graphycs/Adx';
import { Bollinger } from '../models/graphycs/Bollinger';
import { Keltner } from '../models/graphycs/Keltner';
import { Aroon } from '../models/graphycs/Aroon';
import { Stc } from '../models/graphycs/Stc';
import { Awesome } from '../models/graphycs/Awesome';
import { Kama } from '../models/graphycs/Kama';
import { Tsi } from '../models/graphycs/Tsi';
import { Rsi } from '../models/graphycs/Rsi';


import { Macd } from '../models/graphycs/Macd';

export const transformData = (apiData) => {
  console.log('Dados da API antes da transformação:', apiData);
  
  // Mapear cada item de apiData para uma instância de Macd
  const transformedData = {
    macd: apiData.map(item => new Macd(item.diff, item.signal, item.macd, item.dates)),
  };
  
  console.log('Dados transformados:', transformedData);
  return transformedData;
};
